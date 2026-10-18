---
title: "애플리케이션 복제와 스토리지 복제는 무엇이 다른가"
description: "서비스 인스턴스 복제와 볼륨 블록 복제의 복구 주체를 나누고, 두 replica 수가 곱해질 때의 비용과 결정 순서를 설명합니다."
searchTitle: "애플리케이션 복제와 스토리지 복제 차이"
slug: "application-storage-replication-layers"
publishedAt: 2026-08-24
updatedAt: "2026-10-18"
track: tech_column
subtype: concept
category: infrastructure
tags:
  - "Kubernetes"
  - "스토리지"
  - "고가용성"
audience: developer
readerOutcome: "복구 주체와 실패 범위를 먼저 적은 뒤 애플리케이션 replica와 볼륨 replica 수를 별도로 결정한다."
contentFormats:
  - article
  - comic
  - diagram
  - table
freshnessStatus: current
reviewedAt: 2026-08-09
reviewAfter: 2027-02-09
cover: "./cover.webp"
coverAlt: "남성 카솔이 애플리케이션 복제 층과 스토리지 복제 층을 살피는 표지"
sourceUrl: "https://cloudnative-pg.io/docs/current/replication/"
featured: false
draft: false
---

글·해설: 다메카솔

결론부터 말하면 애플리케이션 복제와 스토리지 복제는 같은 데이터를 여러 곳에 둔다는 점만 닮았을 뿐, 복구 주체와 단위가 전혀 다릅니다. 애플리케이션 복제는 서비스 인스턴스가 데이터의 상태와 역할을 나누어 맡고, 스토리지 복제는 한 볼륨의 블록 사본을 여러 디스크나 노드에 둡니다. 따라서 두 계층의 replica 수를 하나의 숫자로 뭉뚱그리면 설계 판단이 흐려집니다.


## 핵심 내용

- **복구 주체의 차이**: CloudNativePG 같은 애플리케이션 계층 복제는 WAL 스트리밍과 리더 승격을 직접 제어하는 반면, Longhorn 같은 스토리지 계층 복제는 PVC가 마운트할 블록 장치 사본을 동기 유지합니다.
- **곱해지는 복제 비용**: 애플리케이션 인스턴스 3개에 각각 볼륨 replica 3개를 붙이면 물리 데이터 경로가 최대 9개로 늘어나 네트워크·디스크 대역폭과 용량 비용이 겹칩니다.
- **워크로드별 분리 설계**: 자체 복제 엔진이 있는 워크로드(CloudNativePG, 3멤버 Raft Vault)는 볼륨 replica를 줄이고, 자체 복제가 없는 단일 인스턴스 워크로드(SeaweedFS 등)는 볼륨 계층이 노드 실패를 받아 내도록 구성합니다.

## 위층은 서비스를, 아래층은 볼륨을 복제합니다

CloudNativePG를 예로 들면 PostgreSQL 인스턴스가 여러 개 뜨고 기본(primary) 인스턴스에서 대기(standby) 인스턴스로 WAL이 전달됩니다. 어느 인스턴스가 쓰기를 받을지와 장애 시 누구를 승격할지는 PostgreSQL과 오퍼레이터가 결정하며, 공식 문서도 이를 애플리케이션 계층 복제로 설명합니다.

반면 Longhorn의 복제 단위는 블록 볼륨입니다. 각 볼륨 엔진이 여러 노드의 replica에 쓰기를 동기 반영하고 건강한 replica 수가 줄어들면 다시 채워 넣지만, 그 위에서 돌아가는 PostgreSQL의 리더가 누구인지는 알지 못합니다.

![서비스 인스턴스가 복제되는 위층과 볼륨 블록이 복제되는 아래층을 나눈 장면](./page-01.webp)

장애 유형에 따라 먼저 반응하는 계층을 나누어 보면 차이가 한눈에 드러납니다.

| 실패 유형 | 먼저 반응하는 계층 | 확인할 것 |
| --- | --- | --- |
| 프로세스 종료 | 워크로드 컨트롤러·애플리케이션 | 새 Pod 생성과 역할 승계 |
| 데이터베이스 기본 인스턴스 장애 | 데이터베이스 복제 계층 | 대기 인스턴스의 일관성과 승격 |
| 볼륨 replica 또는 디스크 장애 | 스토리지 계층 | 남은 건강한 replica와 rebuild |
| 노드 전체 장애 | 두 계층 모두 관여 가능 | 파드 재배치, 볼륨 접근성, 실패 도메인 |

## 3 곱하기 3은 비용도 늘립니다

애플리케이션 인스턴스가 3개이고 각 인스턴스의 볼륨 replica가 3개라면 물리적인 데이터 쓰기 경로는 최대 9개가 됩니다. 복제된 쓰기는 네트워크와 디스크 대역폭·용량을 소모하고 장애 뒤에는 리빌드(rebuild) 트래픽을 만드는데, 소규모 클러스터에서는 이 부하가 같은 몇 대의 노드에 고스란히 겹칩니다.

![세 애플리케이션 사본이 각자 세 볼륨 사본으로 갈라져 아홉 경로가 되는 장면](./page-02.webp)

Longhorn 문서의 $N-1$ 표현도 정확한 범위를 붙여 읽어야 합니다. 볼륨 replica가 $N$개이고 최소 한 개가 건강하다면 최대 $N-1$개의 replica 실패를 견딜 수 있다는 뜻이지, 서비스의 쓰기 리더 승계나 데이터베이스 일관성, 백업 복원까지 보장한다는 뜻은 아닙니다.

## 워크로드마다 답이 달라집니다

제 홈랩에서는 2026년 7월 클러스터 재구축 당시 복제 정책을 네 갈래로 나누었습니다. 자체 물리 복제를 수행하는 CloudNativePG와 3멤버 Raft로 전환한 Vault는 애플리케이션 인스턴스 3개에 Longhorn 볼륨 replica 1을 택했고, 단일 인스턴스로 운용한 SeaweedFS 데이터는 볼륨 계층이 노드 실패를 받아 내도록 Longhorn replica 3을 두었으며, 일부 재수집이 가능한 관측 데이터(Prometheus·Loki·Tempo)는 절충안으로 2를 골랐습니다.

장비 수와 디스크 배치, 백업 경로가 달라지면 구체적인 숫자는 달라지겠지만 질문 순서는 그대로 재사용할 수 있습니다.

1. 이 애플리케이션은 스스로 데이터를 복제하는가?
2. 장애 시 어느 사본을 정본(primary)으로 승격하는가?
3. 노드와 디스크 중 어느 범위의 실패를 견뎌야 하는가?
4. 온라인 복제가 모두 실패했을 때 어디에서 백업을 복원하는가?
5. 쓰기 지연과 네트워크·용량 비용을 감당할 수 있는가?

![남성 카솔이 복구 주체와 실패 도메인과 복원 경로의 세 점검판을 확인하는 장면](./page-03.webp)

replica 수는 막연한 안전 점수가 아니라, 어느 계층이 어떤 실패를 받아 낼지 적어 놓은 설계 값입니다.

## 함께 읽을 글

- [replica 1은 같은 뜻이 아니었습니다: Vault PDB 앞에서 멈춘 drain](/posts/replica-layer-pdb-drain/): 이 구분이 홈랩 점검 사건에서 필요했던 이유를 다룹니다.
- [PodDisruptionBudget는 무엇을 보장하나: maxUnavailable 0의 의미](/posts/poddisruptionbudget-zero-eviction/): 데이터 복제와 별개인 계획 중단 예산을 설명합니다.

## 출처

- [CloudNativePG: Replication](https://cloudnative-pg.io/docs/current/replication/)
- [Longhorn 1.12: Architecture and Concepts](https://longhorn.io/docs/1.12.0/concepts/)
- 개인 인프라 ADR-033·ADR-034, 2026-07-13~16

공식 문서는 2026년 8월 9일 다시 확인했습니다. 홈랩 수치는 한 사례이며 보편 권장값이 아닙니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다. 만화 이미지는 텍스트 없는 원화에 결정적 레터링을 합성해 만들었습니다. 공식 로고·UI·문서 도표 등 외부 이미지 자산 사용은 0건입니다.
