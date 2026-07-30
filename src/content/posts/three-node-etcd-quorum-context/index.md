---
title: "3노드여야 하는 이유, 그리고 빈 결과의 함정"
description: "미니PC 세 대로 k3s embedded etcd 구성을 세운 뒤 빈 kubectl 출력을 만났습니다. 쿼럼 계산의 범위와, 자동화가 엉뚱한 클러스터에서 자격을 꺼내기 직전에 멈춘 사건을 다룬 홈랩 구축기 2편입니다."
slug: "three-node-etcd-quorum-context"
publishedAt: 2026-07-25
updatedAt: 2026-07-28
track: tech_column
subtype: case_study
category: development_episode
series:
  slug: homelab-k8s
  title: "홈랩 쿠버네티스 구축기"
  order: 2
tags:
  - "홈랩"
  - "K3s"
  - "etcd"
  - "고가용성"
  - "운영 자동화 안전"
audience: developer
readerOutcome: "etcd 멤버 수에 따른 과반과 장애 허용 수를 계산하고, kubectl 조회 결과를 자동화 입력으로 쓰기 전에 컨텍스트·API 서버·예상 노드 지문으로 대상 클러스터를 확인한다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-28
reviewAfter: 2027-01-25
cover: "./cover.webp"
coverAlt: "세 대의 미니PC 클러스터 옆에서 남성 카솔이 빈 터미널과 잘못 연결된 작은 로컬 클러스터를 발견하는 표지"
sourceUrl: "urn:internal:paravault:homelab-blog-2"
featured: false
draft: false
---
글·해설: 다메카솔

저는 미니PC 세 대를 마련하면 가장 큰 위험이 줄었다고 생각했습니다. 그런데 클러스터를 세운 뒤 실행한 첫 `kubectl get svc -A`는 아무것도 보여 주지 않았습니다. 오류도, 권한 거부도 없어서 “아직 서비스가 없구나” 하고 넘어가기 쉬운 화면이었습니다.

그 화면은 새 홈랩 클러스터의 상태가 아니었습니다. WSL의 기본 kubectl 컨텍스트가 다른 프로젝트의 로컬 kind 클러스터를 가리키고 있었습니다. 자동화는 곧 그 클러스터의 ServiceAccount JWT를 꺼내 홈랩 Vault 인증 설정에 넣을 참이었습니다.

세 대를 준비한 이유는 한 대가 멈춰도 etcd 과반을 남기기 위해서였습니다. 하지만 첫 점검에서 드러난 위험은 장비 수가 아니라 대상 확인이었습니다.

> 이 글은 `~/dev/infra`에서 PARA Vault로 자동 수집된 2026년 7월 20일 초안을 바탕으로 합니다. 84GB 복원에 걸린 88분은 당시 측정값이고, 유선 전환 뒤 35~55분은 계획에 사용한 추산값입니다. 원 ADR·인벤토리·명령 로그에는 현재 직접 접근하지 못하므로 실제로 시험하지 않은 장애 조치를 결과처럼 쓰지 않습니다.

## 1편에서 남은 두 제약

시놀로지 NAS에서는 이미 학습용 k3s를 운영하고 있었습니다. RAM은 32GB로 충분했지만 CPU 코어가 부족했고, 소음 때문에 밤에 NAS를 끄면 Airflow의 메타데이터 DB와 오브젝트 스토리지도 함께 사라졌습니다. 계산 병목과 가동시간 문제가 한 장비에 묶여 있었습니다.

그래서 24시간 켜 둘 수 있는 미니PC로 실행 계층을 옮기기로 했습니다. 선택한 장비는 GMKtec M5 Ultra 세 대였고, 당시 기록의 각 구성은 Ryzen 7 7730U 8코어 16스레드, RAM 32GB, NVMe 512GB입니다. 이번에는 RAM 총량보다 한 대가 빠진 뒤의 제어면, 복원 데이터가 흐를 경로, 저장장치 확장 여지를 함께 봤습니다.

![동일한 미니PC 세 대가 성능 합계가 아니라 한 대 장애 뒤의 제어면 운영과 저장장치 확장성을 위해 선택된 장면](./page-01.webp)

제조사 사양에는 듀얼 2.5G Ethernet과 M.2 2280 슬롯 두 개가 명시돼 있습니다. 세부 비교 기준은 [홈랩 미니PC 고르는 법: CPU·RAM보다 NIC와 M.2 슬롯을 먼저 볼 때](/posts/homelab-mini-pc-nic-m2-selection/)에 따로 정리했습니다.

## 복원 리허설에서 WiFi가 걸렸습니다

처음에는 세 노드를 WiFi로 연결했습니다. 구성은 됐지만 84GB 데이터베이스 복원에 88분이 걸렸습니다. 당시 기록에는 유선 2.5GbE로 바꾸면 35~55분이 걸릴 것으로 추산돼 있습니다. 같은 조건에서 끝까지 다시 잰 유선 실측값은 아닙니다.

![무선 경로의 좁은 복원 통로를 지나던 데이터가 유선 2.5GbE 경로로 전환되고 세 노드의 주소가 고정되는 장면](./page-02.webp)

리허설 뒤에는 세 노드를 유선으로 옮기고 주소도 고정했습니다. CPU와 RAM 표만 비교할 때는 보이지 않던 백업 원본, 네트워크, 대상 디스크의 경로가 실제 복구 시간을 정하고 있었습니다.

## 세 대는 과반을 남기기 위한 수였습니다

embedded etcd는 멤버 과반이 동의해야 새 상태를 확정합니다. 2멤버의 과반은 2라 한 대가 빠지면 결정을 이어 갈 수 없습니다. 3멤버의 과반은 2이므로 한 대가 빠져도 남은 두 대가 과반을 이룹니다. K3s가 embedded etcd HA 구성에 세 대 이상의 홀수 server node를 요구하는 이유입니다.

![두 멤버는 둘 모두가 필요하지만 세 멤버는 한 대가 멈춰도 두 대가 과반을 유지하는 etcd 쿼럼 비교](./page-03.webp)

여기까지 확인한 것은 구성 조건과 쿼럼 계산입니다. 노드 한 대를 실제로 정지한 뒤 API 응답, 워크로드 지속, 복구 시간을 잰 장애 조치 시험 기록은 이번 원자료에 없습니다. 세 대를 마련했다는 사실과 홈랩 전체의 HA를 검증했다는 주장은 구분합니다.

같은 멀티탭이나 스위치, 단일 스토리지는 여전히 공통 장애 지점입니다. 멤버 수별 계산과 확장·교체 순서는 [etcd 쿼럼은 왜 홀수 노드가 필요한가](/posts/etcd-quorum-odd-members/)에서 더 자세히 다룹니다.

## 빈 결과는 새 클러스터의 상태가 아니었습니다

클러스터를 만든 뒤 다음 명령을 실행했습니다.

```bash
kubectl get svc -A
```

출력은 비어 있었지만 명령은 성공했습니다. 실제 요청은 홈랩이 아니라 다른 프로젝트의 로컬 kind 클러스터로 향하고 있었습니다. kubeconfig의 context는 cluster, user, namespace 참조를 묶고, `current-context`가 kubectl의 기본 대상을 정합니다.

![빈 서비스 목록을 보고 새 홈랩이 비었다고 착각했지만 실제 요청은 작은 로컬 kind 클러스터로 향한 장면](./page-04.webp)

빈 목록은 조회한 클러스터에 결과가 없다는 뜻일 수는 있어도, 그 클러스터가 내가 의도한 대상이라는 증거는 아닙니다. 오히려 정상 종료가 의심을 늦췄습니다.

## 더 아찔했던 건 그다음이었습니다

다음 자동화 단계는 조회한 클러스터에서 ServiceAccount JWT를 추출해 홈랩 Vault의 Kubernetes 인증 설정에 넣는 일이었습니다. 실제 반영 전에 잘못된 대상을 알아차려 인증 장애는 발생하지 않았습니다. 읽기 대상의 착오가 곧바로 다음 쓰기의 잘못된 입력이 될 뻔했습니다.

![남성 카솔이 컨텍스트, API 서버, 예상 노드의 세 지문을 확인한 뒤에만 자격 추출과 쓰기 관문을 여는 장면](./page-05.webp)

그날 이후 저는 JWT를 꺼내기 전에 context, API 서버, 노드 집합을 확인하는 규칙을 남겼습니다.

```bash
kubectl config current-context
kubectl cluster-info
kubectl get nodes -o name
```

| 확인 대상 | 불일치할 때 |
| --- | --- |
| context 이름 | 다음 단계로 가지 않음 |
| API 서버 또는 인증서 지문 | 자격 추출과 쓰기 중단 |
| 예상 노드 집합 | 대상 클러스터를 다시 확인 |
| namespace와 0건 허용 조건 | 기본값으로 판정하지 않음 |

이 홈랩에서는 운영 클러스터의 kubeconfig를 로컬 설정에 합치지 않고, SSH로 노드에 들어가 `sudo k3s kubectl`을 쓰는 정책을 택했습니다. 다른 환경에서는 별도 kubeconfig, 명시적인 `--context`, 권한이 제한된 계정, CI 환경 분리가 같은 역할을 할 수 있습니다. 중요한 것은 어느 방법을 쓰든 기본 컨텍스트 하나를 증거로 삼지 않는 것입니다.

미니PC는 세 대 그대로지만, 기본 컨텍스트를 믿는 절차는 버렸습니다. 지금은 쿼럼을 계산할 때 허용 장애 수를 함께 적고, 복원 시간을 볼 때 데이터 경로를 그리며, 자격이나 쓰기 작업 앞에서는 대상 지문부터 확인합니다.

## 자주 묻는 질문

### k3s embedded etcd 구성은 반드시 세 대가 필요한가요?

HA server cluster라면 K3s 공식 문서는 세 대 이상의 홀수 server node를 요구합니다. 단일 server, 외부 datastore, agent만 추가한 구성은 조건이 다릅니다.

### `--context`만 붙이면 충분한가요?

실수를 크게 줄이지만 context 이름이 잘못 매핑됐거나 kubeconfig가 바뀔 수 있습니다. 자격 추출이나 쓰기 전에는 API 서버와 예상 노드처럼 독립적인 지문도 함께 확인합니다.

## 함께 읽을 개념 글

- [etcd 쿼럼은 왜 홀수 멤버가 유리한가](/posts/etcd-quorum-odd-members/): 2멤버와 3멤버의 장애 허용 차이를 계산합니다.
- [kubectl context만 믿지 않고 클러스터 지문 확인하기](/posts/kubectl-context-cluster-fingerprint/): 위험한 쓰기 전에 kubeconfig, API server와 노드를 검증합니다.
- [홈랩 미니 PC를 고를 때 NIC와 M.2 슬롯을 먼저 보는 이유](/posts/homelab-mini-pc-nic-m2-selection/): 복원 경로와 확장성을 장비 선택 기준으로 바꿉니다.

> **정정 (2026-07-28)**: 이전 본문은 미니PC 세 대의 embedded etcd 구성을 설명하면서 실제 장애 조치 시험까지 마친 것처럼 읽힐 수 있었습니다. 이번 수정에서 3서버 구성 조건과 쿼럼 계산만 확인했으며, 노드 중단 뒤 API·워크로드 지속과 복구 시간을 측정한 기록은 없다고 범위를 명시했습니다.

## 출처

- [K3s: High Availability Embedded etcd](https://docs.k3s.io/datastore/ha-embedded)
- [etcd FAQ: failure tolerance](https://etcd.io/docs/v3.2/faq/)
- [Kubernetes: The kubectl command-line tool](https://kubernetes.io/docs/concepts/overview/kubectl/)
- [Kubernetes: Kubeconfig v1 API](https://kubernetes.io/docs/reference/config-api/kubeconfig.v1/)
- [Kubernetes: kubectl cluster-info](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cluster-info/)
- [GMKtec: NucBox M5 Ultra](https://www.gmktec.com/products/gmktec-nucbox-m5-ultra-amd-ryzen-7-7730u-mini-pc)

홈랩 사건과 수치는 PARA Vault에 보존된 `~/dev/infra` 자동 수집본을 기준으로 작성했습니다. 2026년 7월 25일 공식 문서와 제조사 사양을 다시 확인했습니다. 내부 JWT, kubeconfig, 사설 주소와 호스트명은 공개하지 않았습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다. 만화 이미지는 텍스트 없는 원화에 결정적 레터링을 합성해 만들었습니다. 공식 로고·UI·제품 화면·문서 도표 등 외부 이미지 자산은 사용하지 않았습니다.
