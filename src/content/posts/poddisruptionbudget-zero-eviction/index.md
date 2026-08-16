---
title: "PodDisruptionBudget는 무엇을 보장하나: maxUnavailable 0의 의미"
description: "PDB가 자발적 eviction의 중단 예산을 어떻게 제한하는지, disruptionsAllowed 0과 비자발적 장애의 경계를 설명합니다."
searchTitle: "PDB maxUnavailable 0이 drain을 막는 이유"
slug: "poddisruptionbudget-zero-eviction"
publishedAt: 2026-08-25
updatedAt: 2026-08-25
track: tech_column
subtype: concept
category: infrastructure
tags:
  - "Kubernetes"
  - "고가용성"
  - "운영 자동화 안전"
audience: developer
readerOutcome: "PDB를 상시 가동 보증이 아닌 자발적 중단 예산으로 이해하고 disruptionsAllowed를 읽는다."
contentFormats:
  - article
  - comic
  - diagram
  - table
freshnessStatus: current
reviewedAt: 2026-08-09
reviewAfter: 2027-02-09
cover: "./cover.webp"
coverAlt: "남성 카솔이 자발적 중단 경로 앞의 중단 예산 계기를 읽는 표지"
sourceUrl: "https://kubernetes.io/docs/tasks/run-application/configure-pdb/"
featured: false
draft: true
---

글·해설: 다메카솔

PodDisruptionBudget, 줄여서 PDB는 파드가 항상 살아 있다는 보증서가 아닙니다. 운영자가 노드를 비우거나 롤링 업데이트처럼 자발적 중단을 일으킬 때, 동시에 unavailable 상태가 되어도 되는 애플리케이션 파드 수를 제한하는 정책입니다.

![남성 카솔이 자발적 중단 경로 앞의 중단 예산 계기를 읽는 표지](./cover.webp)

## PDB가 세는 것은 현재의 중단 여유입니다

PDB에는 `minAvailable` 또는 `maxUnavailable` 중 하나를 적습니다. 둘 가운데 하나만 지정합니다.

- `minAvailable`은 중단 중에도 최소 몇 개가 available이어야 하는지 정합니다.
- `maxUnavailable`은 동시에 몇 개까지 unavailable이어도 되는지 정합니다.

컨트롤러가 원하는 replica 수와 현재 건강한 파드 수를 함께 계산하면 PDB 상태에 `disruptionsAllowed`가 나옵니다. 운영자는 선언문과 이 현재값을 함께 봐야 합니다.

```bash
kubectl get pdb -A
kubectl describe pdb <name> -n <namespace>
```

예를 들어 원하는 파드가 하나이고 `maxUnavailable: 0`이면 허용 중단 수는 0입니다. eviction API는 그 자리에서 기다립니다. Kubernetes 문서도 이 구성을 zero voluntary evictions로 설명하며, 그 파드가 있는 노드의 drain이 끝나지 않을 수 있다고 경고합니다.

![원하는 파드와 건강한 파드와 허용 중단 수가 차례로 계산되는 장면](./page-01.webp)

퍼센트를 쓸 때는 반올림도 봐야 합니다. `maxUnavailable` 백분율은 허용 수를 올림합니다. replica가 적은 집합에서는 한 파드가 전체에서 차지하는 비율이 크기 때문에, 퍼센트로 읽은 직감과 실제 허용 수가 달라질 수 있습니다. 소규모 워크로드라면 렌더된 정책과 `disruptionsAllowed`를 함께 확인하는 편이 안전합니다.

## 자발적 중단에만 관여합니다

PDB가 다루는 것은 eviction API를 거치는 자발적 중단입니다. 노드 drain, 클러스터 오토스케일러의 축소, 일부 관리 작업이 여기에 들어갑니다. 노드 전원 장애, 하드웨어 고장, 커널 장애는 PDB의 보호 범위 밖입니다.

![자발적 중단 경로에는 방패가 작동하고 갑작스러운 노드 장애 경로에는 닿지 않는 장면](./page-02.webp)

고가용성은 대체 파드, 볼륨, 네트워크, 애플리케이션 역할 승계가 함께 준비돼야 생깁니다. PDB는 그 준비가 된 파드를 운영자가 한꺼번에 너무 많이 내리지 않도록 속도를 제한합니다.

반대로 replica가 하나인 서비스를 계속 유지하고 싶다면 `maxUnavailable: 0`은 정확한 표현입니다. 문제는 그 정책을 둔 채 노드를 꼭 비워야 할 때입니다. 안전성과 점검 가능성이 서로 충돌하므로 다운타임 수용, replica 증설, 점검 연기 중 하나를 사람이 선택해야 합니다.

## 0은 운영 결정입니다

제 홈랩에서는 2026년 7월 단일 Vault를 선택하는 PDB의 허용 중단 수가 0이었고, drain이 해당 파드 eviction에서 기다렸습니다. 당시에는 처음부터 잘못된 정책이라고 생각했습니다. 기록을 다시 보니 정책은 선언한 그대로 행동했습니다. 단일 멤버 유지와 노드 점검 사이의 결정을 미뤄 둔 것이 문제였습니다.

PDB를 볼 때는 다음 네 가지를 한 화면에 놓습니다.

1. PDB가 실제 대상 파드를 선택하는가.
2. 원하는 replica와 현재 healthy 파드는 몇 개인가.
3. `disruptionsAllowed`는 몇 개인가.
4. 대체 파드가 다른 실패 도메인에서 Ready가 될 수 있는가.

![남성 카솔이 대상 파드와 건강 상태와 허용 중단 수와 대체 자리의 네 항목을 확인하는 장면](./page-03.webp)

PDB는 계획된 중단을 지금 얼마나 받아 낼 수 있는지 숫자로 드러냅니다. `disruptionsAllowed: 0`을 발견하면 정책부터 지우기보다, 왜 0이어야 했는지와 어떤 중단을 승인할지 먼저 정하는 편이 맞습니다.

## 함께 읽을 글

- [replica 1은 같은 뜻이 아니었습니다: Vault PDB 앞에서 멈춘 drain](/posts/replica-layer-pdb-drain/): 단일 Vault에서 0 예산이 실제로 드러난 사건입니다.
- [kubectl drain이 멈췄을 때 PDB를 우회하기 전에 확인할 것](/posts/kubectl-drain-pdb-checklist/): PDB 밖의 정체 원인과 우회 옵션을 구분합니다.

## 출처

- [Kubernetes: Specifying a Disruption Budget for your Application](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
- [Kubernetes: Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)
- 개인 인프라 실패 패턴 원장 H-05, 2026-07-14

공식 문서는 2026년 8월 9일 다시 확인했습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다. 만화 이미지는 텍스트 없는 원화에 결정적 레터링을 합성해 만들었습니다. 공식 로고·UI·문서 도표 등 외부 이미지 자산 사용은 0건입니다.

