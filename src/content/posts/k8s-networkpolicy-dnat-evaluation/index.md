---
title: "Kubernetes NetworkPolicy 간헐적 connection refused: DNAT 뒤 목적지를 확인한 기록"
description: "독자는 Service 경로의 간헐적 connection refused에서 DNAT 뒤 실제 목적지를 확인하고 대상 종류에 맞는 정책 표현을 선택할 수 있다."
slug: "k8s-networkpolicy-dnat-evaluation"
publishedAt: 2026-07-20
updatedAt: 2026-07-20
track: tech_column
subtype: case_study
category: network
tags:
  - "kubernetes networkpolicy"
  - "dnat"
  - "kube router"
  - "service clusterip"
  - "intermittent failure debugging"
audience: developer
readerOutcome: "독자는 Service 경로의 간헐적 connection refused에서 DNAT 뒤 실제 목적지를 확인하고 대상 종류에 맞는 정책 표현을 선택할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-21
reviewAfter: 2027-07-20
cover: "./cover.webp"
coverAlt: "카솔이 12회 연결 결과판과 Service VIP가 Endpoint로 갈라지는 경로를 비교하는 표지"
sourceUrl: "urn:internal:infra:failure-pattern:i-39"
featured: false
draft: false
---
같은 파드에서 같은 Service 주소를 호출했는데, 한 번은 붙고 다음 번에는 `connection refused`가 났습니다. 이런 패턴에서는 NetworkPolicy YAML의 Service VIP만 다시 읽기보다, DNAT 뒤 실제 목적지와 노드의 정책 규칙을 같은 시점에 확인해야 합니다. 다만 이 순서는 CNI와 Service 구현에 따라 달라질 수 있습니다.

글·해설: 다메카솔

## 핵심 내용

- 2026년 7월의 한 k3s v1.36·kube-router 환경에서는 같은 출발점의 12회 연결 중 6회가 거부됐습니다. 50%라는 보편 확률이 아니라, 단발 성공이 정상 증거가 아니었다는 관찰입니다.
- iptables 모드의 Service는 ClusterIP를 선택된 Endpoint로 DNAT합니다.
- Kubernetes는 주소 재작성과 NetworkPolicy 처리의 선후를 규정하지 않습니다. 실제 순서는 네트워크 플러그인과 Service 구현 조합에서 확인해야 합니다.
- Pod를 허용할 때는 바뀌는 Pod IP를 직접 나열하기보다 `namespaceSelector`와 `podSelector`를 우선 검토합니다. 실제 목적지가 노드나 클러스터 외부 주소라면 필요한 CIDR만 좁게 허용합니다.

## 두 사고가 남긴 같은 지문

첫 사고에서는 API 서버의 Service 주소가 허용돼 있었지만 CI 러너가 기동 직후 `connection refused`를 남기고 재시작했습니다. 내부 기록에 남은 DNAT 뒤 목적지는 노드의 API 엔드포인트와 6443 포트였습니다.

같은 날 이미지 push 경로에서도 비슷한 일이 벌어졌습니다. 로드밸런서 VIP는 허용돼 있었지만 실제 목적지는 프록시 Pod와 `targetPort`였습니다. 두 사고 모두 사용자가 허용한 가상 주소와 정책 경로가 본 실제 목적지가 달랐다는 공통점이 있습니다.

외부 공개 API로 나가는 연결은 같은 출발 Pod에서 성공했습니다. 이 대조는 단순한 링크 불안정 가설을 약화했지만, 그 자체만으로 DNAT을 증명하지는 않습니다. Service와 Endpoint, 노드 규칙을 함께 확인한 뒤에야 원인 가설이 닫힙니다.

## 한 번 성공했는데도 정책을 의심한 이유

![첫 연결 성공 뒤 정상이라고 판단했지만 12회 반복에서 성공과 거부가 반반으로 갈린 사고 장면](./page-01.webp)

첫 요청이 성공하면 애플리케이션과 정책이 모두 정상이라고 결론 내리기 쉽습니다. 저도 처음에는 그렇게 봤습니다. 그러나 이 홈랩에서는 같은 파드가 같은 주소를 12번 호출했을 때 6번이 거부됐습니다.

이 수치는 작은 표본의 현장 기록입니다. 실패율을 50%로 일반화할 근거는 없습니다. 중요한 단서는 요청 문자열이 같아도 뒤에서 선택된 Endpoint와 실제 패킷 경로는 같지 않을 수 있다는 점입니다.

내부 사고 분석은 통과한 연결이 같은 노드의 백엔드 경로였을 가능성을 제시했습니다. 이 부분은 실측값이 아니라 추론입니다. 재현할 때는 성공·실패와 선택 Endpoint를 함께 남겨 자기 환경에서 확인해야 합니다.

반복 테스트는 결과만 세면 부족합니다. 요청 시각, 출발 Pod, Service, 선택된 Endpoint, 성공 여부를 한 줄에 묶어야 경로와 실패를 대조할 수 있습니다.

```text
attempt  source_pod  service  selected_endpoint  result
01       test-pod    api      endpoint-a         OK
02       test-pod    api      endpoint-b         REFUSED
...      ...         ...      ...                ...
```

위 표는 기록 형식의 예시이며, 실제 내부 주소와 이름은 공개하지 않았습니다.

## Service VIP는 최종 목적지가 아닙니다

![Service VIP로 들어온 패킷이 DNAT로 Endpoint 주소로 바뀐 뒤 kube-router 정책 체인을 지나는 세로 단면도](./page-02.webp)

Kubernetes 공식 문서는 iptables 모드의 Service가 ClusterIP로 온 트래픽을 백엔드 Endpoint로 destination NAT한다고 설명합니다. 사용자가 입력한 주소는 Service VIP지만, 뒤의 규칙은 이미 바뀐 목적지를 볼 수 있습니다.

kube-router의 NetworkPolicy 컨트롤러는 filter 테이블의 `FORWARD` 체인에서 출발지 또는 목적지 Pod IP에 맞는 Pod별 방화벽 체인으로 패킷을 보냅니다. Service DNAT 설명과 이 구조를 함께 보면, 이 사건에서 정책이 VIP가 아니라 DNAT 뒤 목적지를 기준으로 갈렸다는 내부 기록과 맞아떨어집니다.

여기서 표현을 조심해야 합니다. “Kubernetes NetworkPolicy는 항상 DNAT 뒤에 평가된다”가 아닙니다. Kubernetes 문서도 주소 재작성과 정책 처리의 선후를 규정하지 않으며, 플러그인·클라우드 공급자·Service 구현 조합에 따라 달라질 수 있다고 명시합니다.

## connection refused 하나로 원인을 확정하지 마세요

![같은 connection refused를 정책 경로, Endpoint와 앱 상태, 초기 정책 프로그래밍 지연로 나누는 감별 도식](./page-03.webp)

`connection refused`는 출발점이지 판결문이 아닙니다. NetworkPolicy의 REJECT일 수도 있지만, Service에 준비된 Endpoint가 없거나, 대상 프로세스가 포트를 열지 않았거나, 새 Pod와 정책 규칙의 반영 시점이 엇갈린 경우도 따로 확인해야 합니다.

먼저 Service와 EndpointSlice가 가리키는 주소를 확인합니다.

```bash
kubectl get svc -n <namespace> <service> -o wide
kubectl get endpointslice -n <namespace> -l kubernetes.io/service-name=<service> -o wide
```

그다음 같은 출발 Pod에서 Service 주소와 각 Endpoint를 구분해 시험합니다. 운영 트래픽에 부담을 주지 않는 횟수와 간격을 정하고, 환경에 맞는 도구를 사용해야 합니다.

```bash
kubectl exec -n <namespace> <source-pod> -- sh -c \
  'for i in $(seq 1 12); do date -Iseconds; <connection-command>; done'
```

마지막으로 문제가 발생한 노드의 정책 체인과 ipset을 확인합니다. 명령은 배포판과 iptables 백엔드에 따라 달라질 수 있으므로, 아래 이름을 그대로 복사하기보다 현재 노드가 실제로 쓰는 체인을 먼저 찾습니다.

```bash
sudo iptables-save -t filter | grep -E 'KUBE-ROUTER|KUBE-POD-FW|KUBE-NWPLCY'
sudo ipset list | grep -E 'KUBE-(SRC|DST)'
```

## 허용 규칙은 실제 대상의 종류에 맞춥니다

![카솔이 반복 연결, Endpoint 기록, 노드 규칙 확인, 대상별 허용의 네 단계 카드를 정리하는 마지막 페이지](./page-04.webp)

정책 수정은 “실제 목적지 IP를 찾았다”에서 끝나지 않습니다. 그 주소가 무엇을 나타내는지 확인한 뒤에야 안전한 표현을 고를 수 있습니다.

| 실제 평가 대상 | 먼저 검토할 표현 | 피할 실수 |
| --- | --- | --- |
| 같은 클러스터의 Pod | `namespaceSelector` + `podSelector` | 바뀌는 Pod IP를 장기 allowlist로 고정 |
| 노드 주소 또는 클러스터 외부 IP | 필요한 범위만 좁힌 `ipBlock.cidr` | 전체 사설망이나 `0.0.0.0/0` 허용 |
| 포트가 다른 Endpoint | 정확한 protocol과 port | Service port와 target port를 혼동 |

Kubernetes 문서는 `ipBlock`을 주로 클러스터 외부 IP 범위를 선택하는 기능으로 설명합니다. Pod IP는 일시적이므로, Pod를 가리킬 수 있다면 selector가 변경에 더 잘 견딥니다.

수정 뒤에는 같은 조건으로 반복 테스트를 다시 실행합니다. 성공 횟수만 늘었다고 끝내지 말고, 모든 의도한 Endpoint가 허용되고 의도하지 않은 대상은 여전히 차단되는지 확인해야 합니다.

## 재현 조건과 남은 한계

이 기록의 환경은 2026년 7월, k3s v1.36 server 3노드와 내장 kube-router입니다. 다른 CNI, kube-proxy 모드, Service 종류, hostNetwork 사용 여부에서는 패킷이 다른 체인을 지날 수 있습니다.

사고의 12회 결과와 조치 순서는 공개하지 않은 내부 운영 기록을 바탕으로 했습니다. 특정 IP, namespace, 사설 호스트명은 설명에 필요하지 않아 제외했습니다.

## 점검 순서

1. 같은 출발점에서 연결을 반복해 시간과 결과를 남깁니다.
2. 그 시점의 Service와 EndpointSlice를 함께 저장합니다.
3. 실패가 난 노드의 filter 체인과 ipset에서 실제 목적지를 찾습니다.
4. Endpoint 부재와 애플리케이션 리슨 상태, 초기 반영 지연을 분리합니다.
5. 대상이 Pod면 selector를, 외부·노드 주소면 제한된 CIDR을 검토합니다.
6. 수정 전과 같은 조건으로 허용과 차단을 모두 재검증합니다.

## 출처

- Kubernetes, [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- Kubernetes, [Virtual IPs and Service Proxies](https://kubernetes.io/docs/reference/networking/virtual-ips/)
- kube-router, [Network Policy Controller source](https://github.com/cloudnativelabs/kube-router/blob/master/pkg/controllers/netpol/network_policy_controller.go)
- 내부 운영 기록: 실패 패턴 I-39, 인프라 CHANGELOG 2026-07-17. 공개 글에는 인프라 식별자와 원문 경로를 노출하지 않았습니다.

이 글의 만화 이미지는 AI로 생성했습니다.

Updated: 2026-07-21
