---
title: "CoreDNS를 두 대 띄우고도 재구축이 위험했던 이유"
description: "CoreDNS를 2대 띄워 완벽히 이중화했다고 안심했는데, 노드 부팅 시 인클러스터 VIP를 바라보며 닭과 달걀의 순환에 빠진 아찔한 DNS 부트스트랩 트러블슈팅기입니다."
slug: "dns-bootstrap-loop"
publishedAt: 2026-07-31
updatedAt: 2026-07-31
track: tech_column
subtype: case_study
category: development_episode
series:
  slug: homelab-k8s
  title: "홈랩 쿠버네티스 구축기"
  order: 3
tags:
  - "홈랩"
  - "K3s"
  - "Kubernetes"
  - "네트워킹"
audience: developer
readerOutcome: "평시의 클러스터 DNS 가용성과 노드 콜드 부트스트랩 경로를 분리하고, 순환 의존성을 끊어 안전한 베어메탈/홈랩 DNS 아키텍처를 구축할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-31
reviewAfter: 2027-01-31
cover: "./cover.webp"
coverAlt: "남성 카솔이 두 CoreDNS 인스턴스가 정상인 홈랩 아래에서 노드 resolver가 같은 클러스터로 되돌아가는 순환을 발견하는 표지"
sourceUrl: "urn:internal:paravault:homelab-blog-3"
featured: false
draft: false
---
글·해설: 다메카솔

쿠버네티스 클러스터 안에서 CoreDNS 파드를 2개 띄우고, 서로 다른 노드에 분산 배치(Anti-affinity)한 뒤 고정 가상 IP(VIP)까지 붙여두면 내부 DNS는 영원히 안전할까요?

평상시에는 완벽하게 동작합니다. 하지만 **전원이 완전히 꺼졌다가 다시 켜지는 '콜드 부트스트랩(Cold Bootstrap)' 상황**에서는 치명적인 닭과 달걀의 순환(Deadlock)에 빠질 수 있습니다.

"노드가 CoreDNS 컨테이너 이미지를 다운로드받으려면 DNS 조회가 필요한데, 노드의 DNS 설정이 아직 뜨지도 않은 인클러스터 CoreDNS 파드 VIP를 바라보고 있다면?"

이번 글에서는 홈랩 쿠버네티스를 운영하며 발견했던 **DNS 순환 의존성 버그와, 이를 호스트 레벨의 로컬 리졸버(`dnsmasq`)로 깔끔하게 끊어낸 아키텍처 개선기**를 공유합니다.

## 평상시의 고가용성(HA)이 가린 함정

기존 홈랩의 내부 도메인은 시놀로지 NAS 위의 가상머신(VM)에 묶여 있었습니다. 야간에 NAS가 꺼지며 IP가 바뀌는 순간 모든 도메인 라우팅이 깨지는 문제가 있었습니다.

이를 해결하기 위해 24시간 켜져 있는 3노드 k3s 클러스터 내부로 CoreDNS를 옮겼습니다. 2개의 레플리카, 노드 간 분산 배치, PodDisruptionBudget(PDB), 그리고 로드밸런서 VIP까지 꼼꼼하게 붙였습니다. 외부에서 질의 테스트를 돌려봐도 아주 잘 동작했습니다. 완벽한 개선처럼 보였습니다.

![주소가 바뀐 NAS DNS 한 대에서 두 CoreDNS 인스턴스와 하나의 VIP로 옮겨 간 뒤, 노드 resolver 선이 다시 VIP로 연결된 장면](./page-01.webp)

하지만 노드 터미널에서 `resolvectl status` 명령어를 실행해 본 순간 등골이 서늘해졌습니다:

```bash
resolvectl status
# Current DNS Server: 10.43.0.10 (쿠버네티스 CoreDNS Service VIP)
```

쿠버네티스 파드를 띄워야 할 **리눅스 호스트 노드 자체의 기본 DNS 서버**가, 방금 만든 쿠버네티스 내부 Service VIP를 가리키고 있었던 것입니다.

## 시작 순서를 그려보니 드러난 '순환 고리(Loop)'

클러스터가 이미 정상 동작 중일 때는 아무 문제가 없습니다. 하지만 전체 노드가 재부팅되거나 새 노드를 프로비저닝하는 콜드 스타트 상황을 가정해 보겠습니다:

![노드에서 레지스트리 조회와 CoreDNS 이미지, 클러스터 DNS를 거쳐 다시 노드로 돌아오는 콜드 부트스트랩 순환 도식](./page-02.webp)

1. 호스트 노드의 kubelet이 기동되어 CoreDNS 파드를 띄우려 함
2. 컨테이너 런타임(containerd)이 `registry.k8s.io`에서 도커 이미지를 다운로드받기 위해 호스트 DNS에 IP 질의
3. 호스트의 DNS 요청이 `10.43.0.10` (인클러스터 VIP)으로 전송됨
4. **하지만 CoreDNS 파드가 아직 안 떴으므로 응답 불가 ➡️ DNS 타임아웃**
5. 이미지 다운로드 실패로 CoreDNS 파드 생성 영구 실패

즉, **"CoreDNS를 띄우려면 CoreDNS가 이미 떠 있어야 하는"** 황당한 교착 상태에 빠지게 되는 구조였습니다. 로컬 이미지 캐시 덕분에 당장 장애가 안 났을 뿐, 캐시가 없는 신규 노드를 추가하거나 이미지가 삭제되는 순간 전체 클러스터가 뻗을 시한폭탄이었습니다.

## 쿠버네티스 수명주기 밖으로 DNS 바닥(Base) 내리기

이 순환을 끊으려면 **호스트의 DNS 리졸버를 쿠버네티스 파드 생명주기 밑단(OS 레벨)으로 완전히 분리**해야 했습니다.

![Kubernetes 경계 아래의 각 호스트에서 dnsmasq가 먼저 떠 있고, 노드들이 로컬과 피어 DNS로 연결된 장면](./page-03.webp)

1. **호스트 레벨 `dnsmasq` 데몬 기동**: 각 미니 PC 노드의 systemd 서비스로 경량 `dnsmasq`를 직접 실행합니다.
2. **로컬 ➡️ 피어 노드 리졸빙 구성**: 각 노드는 먼저 자기 자신의 `127.0.0.1`(로컬 dnsmasq)을 바라보고, 실패 시 다른 미니 PC 노드의 dnsmasq를 보조로 바라보도록 설정합니다.
3. **DHCP 오염 차단**: 공유기 DHCP가 멋대로 DNS 설정을 덮어쓰지 못하도록 systemd-networkd에 `UseDNS=false`를 명시합니다.

```bash
# 호스트 DNS가 로컬 dnsmasq로 고정되었는지 검증
resolvectl status

# 로컬 데몬을 통한 외부 레지스트리 도메인 해석 확인
dig @127.0.0.1 +short registry.k8s.io
```

이제 쿠버네티스 컨트롤 플레인이 완전히 죽어 있거나 CoreDNS 이미지가 전혀 없는 백지상태에서도, 호스트 노드는 OS 레벨의 dnsmasq를 통해 외부 컨테이너 레지스트리 도메인을 막힘없이 해석할 수 있게 되었습니다.

## 공용 DNS(8.8.8.8)를 보조 DNS로 넣으면 안 되는 이유

여기서 흔히 하는 실수가 "불안하니까 `/etc/resolv.conf` 보조 DNS에 구글 Public DNS(`8.8.8.8`)를 같이 적어두는 것"입니다.

하지만 이는 심각한 간헐적 장애를 부릅니다. 사설 도메인(`*.internal`)을 조회할 때 공용 DNS로 쿼리가 넘어가면, 공용 DNS는 "모르는 도메인"이라며 즉시 **`NXDOMAIN` (존재하지 않는 도메인)** 응답을 돌려줍니다.

리눅스 리졸버(systemd-resolved)는 `NXDOMAIN`을 정상 응답으로 간주하고 캐싱(Negative Caching)해 버리기 때문에, 사설 DNS가 멀쩡히 살아 있어도 내부 서비스 연결이 간헐적으로 끊기는 악성 버그를 유발합니다. 따라서 **사설 존(Zone)을 아는 서버와 모르는 공용 서버를 하나의 리졸버 목록에 단순 병렬로 섞어서는 안 됩니다.**

## 다메카솔의 해석: 시스템의 '기동 순서(Dependency Order)'를 설계하라

시니어 인프라 엔지니어로서 아키텍처를 검토할 때 가장 중요한 것은 **"시스템이 완전히 멈췄을 때 0번부터 N번까지 어떤 순서로 살아나는가"**를 검증하는 것입니다.

콜드 부트스트랩을 점검할 때 다음 3가지를 반드시 확인해야 합니다:

1. **클러스터 외부 의존성의 독립성**: 쿠버네티스 클러스터를 띄우는 데 필요한 핵심 컴포넌트(DNS, 이미지 레지스트리, NTP 시간 동기화)가 클러스터 내부 파드에 의존하고 있지 않은가?
2. **OS 레벨 서비스 기동 순서**: 호스트의 `dnsmasq`나 도커 데몬이 네트워크 인터페이스가 활성화되기 전에 떠서 죽지 않도록 `network-online.target` 의존성을 systemd에 명시했는가?
3. **캐시 제로(Zero-cache) 복원 시험**: 기존 노드의 도커 이미지 캐시를 모두 날린 상태에서 클러스터가 바닥부터 정상 프로비저닝되는지 주기적으로 검증해야 합니다.

**"클러스터를 시작하는 데 필요한 인프라 기반은, 아직 시작되지 않은 클러스터에 기대서는 안 된다."**

## 함께 읽을 인프라 글

- [홈랩 쿠버네티스 구축기: 32GB RAM 뒤에 숨겨진 CPU 병목](/posts/why-homelab-kubernetes/)
- [K3s etcd 쿼럼 원리와 3노드 HA 아키텍처](/posts/three-node-etcd-quorum-context/)

## 출처

- [K3s Documentation — Networking Services & CoreDNS](https://docs.k3s.io/networking/networking-services)
- [systemd-resolved.service Manual](https://www.freedesktop.org/software/systemd/man/latest/systemd-resolved.service.html)
- [RFC 2308: Negative Caching of DNS Queries (DNS NCACHE)](https://datatracker.ietf.org/doc/html/rfc2308)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
