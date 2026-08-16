---
title: "Kubernetes는 무엇을 해결하나: 홈랩에서 k3s로 시작하기 전에 알아둘 것"
description: "단순히 Docker 컨테이너를 띄우는 것과 쿠버네티스 클러스터를 운영하는 것은 무엇이 다를까요? k3s의 경량화 아키텍처와 홈랩 환경에서의 도입 기준을 명확히 정리합니다."
slug: "kubernetes-k3s-homelab"
publishedAt: 2026-07-20
updatedAt: 2026-07-28
track: tech_column
subtype: concept
category: infrastructure
tags:
  - "Kubernetes"
  - "K3s"
  - "홈랩"
audience: builder
readerOutcome: "컨테이너 런타임과 쿠버네티스 오케스트레이션의 차이를 이해하고, k3s 아키텍처의 장단점을 바탕으로 홈랩 인프라 도입 타당성을 판단할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-23
reviewAfter: 2027-01-23
cover: "./cover.webp"
coverAlt: "카솔이 컨테이너 실행 층과 여러 노드의 상태를 조정하는 Kubernetes 제어 층을 비교하는 표지"
sourceUrl: "https://kubernetes.io/docs/concepts/overview/"
featured: false
draft: false
---
글·해설: 다메카솔

"Docker Compose로도 서비스 잘 돌아가는데, 굳이 홈랩에 쿠버네티스(k3s)까지 올려야 할까?"

홈랩을 구축할 때 가장 많이 부딪히는 질문입니다. 저 역시 시놀로지 NAS 위에 k3s를 처음 띄워보며 배포, 네트워크, 스토리지 볼륨을 만져보았습니다. 단일 노드 학습용으로는 훌륭했지만, Airflow 파이프라인이 돌며 CPU가 바닥나고 야간에 NAS가 꺼지면 클러스터 전체가 뻗는 문제를 겪으면서 질문이 바뀌었습니다.

"단순히 쿠버네티스를 띄울 수 있는가?"가 아니라, **"쿠버네티스가 해결해 주는 진짜 문제는 무엇이고, 내가 감당해야 할 운영 비용(Tax)은 어디까지인가?"**였습니다.

이번 글에서는 컨테이너 런타임과 쿠버네티스의 본질적인 차이, 그리고 경량 배포판인 **k3s의 아키텍처적 장단점**을 정리해 보았습니다.

## 컨테이너 실행(Docker)과 클러스터 운영(k8s)의 차이

![컨테이너가 실행된 뒤에도 여러 노드의 배치와 장애 복구를 누가 맡는지 묻는 카솔](./page-01.webp)

많은 분들이 Docker와 쿠버네티스를 동급의 기술로 오해하곤 합니다. 하지만 두 기술은 시스템 계층 구조에서 담당하는 역할이 완전히 다릅니다:

| 계층 | 핵심 질문 | 대표 컴포넌트 |
| :--- | :--- | :--- |
| **컨테이너 런타임** | "이 컨테이너 프로세스를 어떻게 격리하고 실행할까?" | containerd, CRI-O, Docker Engine |
| **클러스터 오케스트레이션** | "수십 대의 노드 중 어디에 파드를 띄우고, 노드가 죽었을 때 어떻게 자가 치유(Self-healing)할까?" | Kubernetes (API Server, Scheduler, Controller) |
| **애플리케이션 계층** | "비즈니스 로직을 어떻게 처리하고 데이터 무결성을 지킬까?" | 백엔드 API, 마이크로서비스, DB |

Docker나 containerd가 '개별 엔진'이라면, 쿠버네티스는 '수많은 엔진을 묶어 하나의 거대한 가상 컴퓨터처럼 조율하는 관제탑'입니다.

## 쿠버네티스의 핵심 원리: '선언형 제어 루프(Reconciliation Loop)'

![원하는 Pod 상태와 현재 상태의 차이를 컨트롤러가 감지하고 대체 Pod로 줄이는 흐름](./page-02.webp)

쿠버네티스를 지탱하는 가장 우아한 아키텍처 철학은 **선언적 모델(Declarative Model)**입니다.

1. **`spec` (내가 바라는 상태)**: "웹서버 파드 3개를 항상 유지해 줘."라고 매니페스트에 선언합니다.
2. **`status` (현재 실제 상태)**: 컨트롤 플레인이 노드들을 지속적으로 헬스체크합니다.
3. **제어 루프 (Reconciliation)**: 만약 노드 하나가 죽어 실제 파드가 2개로 줄어들면, 컨트롤러가 둘 사이의 차이를 감지하고 즉시 다른 건강한 노드에 새 파드를 생성하여 3개를 다시 맞춥니다.

이 '자가 치유(Self-healing)'와 '자동 스케줄링' 덕분에, 우리는 서버 1대가 새벽에 불시에 죽더라도 직접 일어나서 재시작 스크립트를 칠 필요가 없어집니다.

## k3s는 무엇을 가볍게 만들었나?

![k3s가 Kubernetes 구성요소를 server와 agent로 묶지만 데이터스토어 운영은 남는다고 설명하는 구조도](./page-04.webp)

오리지널 쿠버네티스(k8s)는 엔터프라이즈 환경을 타깃으로 하여 etcd, kube-apiserver, controller-manager, scheduler 등이 수많은 개별 바이너리와 무거운 메모리(노드당 수 GB)를 요구합니다.

Rancher가 만든 **k3s**는 이 무거운 구조를 홈랩과 엣지(Edge) 환경에 맞게 극한으로 경량화했습니다:
- **단일 바이너리 패키징**: 복잡한 컴포넌트들을 단 하나의 실행 파일로 통합
- **가벼운 스토리지 백엔드**: etcd 외에도 경량 SQLite(기본) 및 외부 RDBMS(PostgreSQL/MySQL) 지원
- **필수 애드온 내장**: containerd, Flannel(CNI), CoreDNS, Traefik(Ingress Controller)을 기본 번들링하여 설치 1줄로 클러스터 구축 완료

| k3s 데이터스토어 구성 | 장점 | 운영 시 주의점 |
| :--- | :--- | :--- |
| **단일 Server (SQLite)** | 메모리 소모 극최소화, 세팅이 가장 쉬움 | Server 노드가 죽으면 컨트롤 플레인이 전면 중단됨 |
| **3-Server HA (Embedded etcd)** | 노드 1대 장애 시에도 클러스터 무중단 유지 | etcd 쿼럼 유지 및 고속 디스크(NVMe) 필수 |
| **외부 DB 백엔드** | 기존 PostgreSQL/MySQL 인프라 활용 가능 | 외부 DB 서버의 가용성이 클러스터 전체 가용성을 좌우함 |

## 홈랩에 k3s가 진짜 필요한 시점은 언제인가?

![카솔이 Kubernetes 학습과 다중 노드 운영 목적을 스토리지 DNS 백업 책임과 함께 비교하는 판단표](./page-05.webp)

단순히 집에서 토이 프로젝트 몇 개 띄우는 것이 목적이라면 Docker Compose만으로도 충분히 훌륭합니다. k3s가 아무리 가벼워졌더라도 **네트워크 CNI, 인그레스 라우팅, PVC 스토리지 바인딩, 인증서 갱신**이라는 쿠버네티스 특유의 운영 복잡도는 여전히 존재하기 때문입니다.

하지만 다음과 같은 목표가 있다면 홈랩 k3s는 최고의 실전 훈련장이 됩니다:

1. **실무 환경의 쿠버네티스 API/오브젝트(Deployment, Service, Ingress, HPA)를 온몸으로 체득하고 싶을 때**
2. **미니 PC 여러 대를 묶어 실제 다중 노드 분산 환경과 장애 복구(Self-healing)를 경험하고 싶을 때**
3. **ArgoCD, Prometheus, Grafana, Vault 같은 클라우드 네이티브 GitOps/모니터링 스택을 프로덕션과 동일하게 구축해보고 싶을 때**

## 다메카솔의 해석: 툴 도입보다 중요한 것은 운영 책임의 범위

시니어 엔지니어로서 새로운 기술 스택을 선택할 때 가장 경계해야 할 것은 "남들이 다 쓰니까 멋있어 보여서 도입하는 것"입니다.

홈랩에 k3s를 올리기로 결정했다면 다음 3가지를 명확히 준비해야 합니다:

1. **학습용과 프로덕션용의 분리**: 단일 노드 k3s로 가볍게 실험하며 감을 익힌 뒤, 24시간 가용성이 필요한 서비스는 3노드 HA 클러스터로 단계적으로 마이그레이션하세요.
2. **영구 스토리지(Persistent Volume) 전략 수립**: 파드는 죽어도 다시 뜨지만, 로컬 디스크에만 저장된 데이터는 노드 장애 시 유실됩니다. Longhorn이나 NFS 스토리지 클래스를 반드시 초기에 설계해야 합니다.
3. **백업과 복구 리허설**: etcd 스냅샷 백업과 볼륨 백업을 정기적으로 수행하고, 빈 머신에서 클러스터를 처음부터 다시 복원하는 훈련을 거쳐야 진짜 내 인프라가 됩니다.

## 함께 읽을 인프라 글

- [홈랩 쿠버네티스 구축기: 32GB RAM 뒤에 숨겨진 CPU 병목](/posts/why-homelab-kubernetes/)
- [K3s etcd 쿼럼 원리와 3노드 HA 아키텍처](/posts/three-node-etcd-quorum-context/)

## 출처

- [Kubernetes Documentation — Concepts & Architecture Overview](https://kubernetes.io/docs/concepts/overview/)
- [K3s Documentation — Lightweight Kubernetes Architecture](https://docs.k3s.io/architecture)
- [K3s Documentation — Cluster Datastore Options](https://docs.k3s.io/datastore)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
