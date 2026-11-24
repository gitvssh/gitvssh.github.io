---
title: "PodDisruptionBudget는 무엇을 보장하나: maxUnavailable 0의 의미"
description: "PDB가 자발적 eviction의 중단 예산을 어떻게 제한하는지, disruptionsAllowed 0과 비자발적 장애의 경계를 설명합니다."
searchTitle: "PDB maxUnavailable 0이 drain을 막는 이유"
slug: "poddisruptionbudget-zero-eviction"
publishedAt: 2026-08-25
updatedAt: "2026-11-23"
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
draft: false
---

노드를 안전하게 비우려고 `kubectl drain`을 실행했는데, 커맨드가 한참을 멈춘 채 넘어가지 않을 때가 있습니다. 클러스터 어딘가에 PodDisruptionBudget(PDB)이 걸려 있고 허용 중단 수가 0으로 잡혀 있으면, 쿠버네티스는 파드를 내보내는 대신 작업을 계속 대기시키거든요. 반대로 PDB를 설정했다고 해서 노드 전원 장애까지 막아 주는 것은 아니므로, 이 정책이 어느 경로에서 무엇을 제한하는지 정확히 짚어 볼 필요가 있습니다.

글·해설: 다메카솔

## 핵심 내용

- **현재 중단 여유(`disruptionsAllowed`) 계산**: `minAvailable`과 `maxUnavailable` 중 하나를 지정하면 컨트롤러가 원하는 replica 수와 현재 건강한 파드 수를 비교해 허용 중단 수를 산출합니다.
- **eviction API를 거치는 자발적 중단만 제어**: 노드 `drain`이나 클러스터 오토스케일러 축소 같은 계획된 작업의 속도는 제한하지만, 하드웨어 고장이나 커널 패닉 같은 비자발적 장애는 PDB 보호 경계 바깥에서 벌어집니다.
- **`maxUnavailable: 0`은 오류가 아닌 운영 결정**: 단일 파드 워크로드에 0 예산을 두면 자발적 축출이 허용되지 않으므로, 점검 시 다운타임 감수·replica 증설·점검 연기 중 어떤 선택을 내릴지 운영자가 정해야 합니다.

## PDB는 가동 보증서가 아니라 중단 예산입니다

현업에서 PDB를 처음 접하면 "파드가 언제든 살아 있도록 보장해 주는 장치"로 받아들이기 쉽습니다. 하지만 쿠버네티스 공식 문서가 정의하는 PDB의 역할은 상시 가동 보증이 아니라 유지보수 시점의 **중단 예산(disruption budget)**에 가깝습니다. 운영자가 노드를 비우거나 오토스케일러가 노드를 축소하는 것처럼 계획된 작업이 진행될 때, 동시에 사용 불가(unavailable) 상태에 빠져도 괜찮은 파드 수의 상한을 정해 두는 정책입니다.

하나의 PDB 리소스에는 `minAvailable`(중단 중에도 최소 몇 개가 가용해야 하는지)과 `maxUnavailable`(동시에 몇 개까지 비가용이어도 되는지) 중 하나만 지정할 수 있습니다. 컨트롤러는 이 선언문과 현재 클러스터 상태를 대조해 `status.disruptionsAllowed` 필드를 실시간으로 갱신하는데요. 따라서 매니페스트의 선언문만 읽어서는 지금 노드를 비울 수 있는지 판단하기 어렵고, 실제 계산 결과를 함께 확인해야 합니다.

| 구분 | 지정 방식과 의미 | 운영 시 함께 볼 지점 |
| --- | --- | --- |
| `minAvailable` | 중단 중에도 유지할 최소 가용 파드 수 또는 비율 | 건강한 파드 수가 이 기준 이하이면 허용 여유가 `0`으로 떨어집니다 |
| `maxUnavailable` | 동시에 비가용 상태가 되어도 되는 최대 파드 수 또는 비율 | `0`으로 두면 자발적 축출을 한 건도 허용하지 않습니다 |
| `disruptionsAllowed` | 컨트롤러가 계산해 `status`에 기록하는 현재 허용 중단 수 | 선언값과 파드 건강 상태를 합친 결과이므로 가장 먼저 읽어야 합니다 |

## disruptionsAllowed와 백분율 올림 규칙 읽기

클러스터에 걸린 PDB 상태와 현재 허용 여유를 살피려면 아래 두 명령으로 선언값과 `status`를 나란히 확인하면 됩니다.

```bash
kubectl get pdb -A
kubectl describe pdb <name> -n <namespace>
```

가령 단일 replica 워크로드에 `maxUnavailable: 0`이나 `minAvailable: 100%`를 설정한 경우를 떠올려 볼까요? 컨트롤러가 산출하는 `disruptionsAllowed` 값은 `0`이 되고, 노드 `drain`이 호출하는 eviction API는 해당 파드를 내보내지 못한 채 그 자리에서 대기하게 됩니다. Kubernetes 공식 문서 역시 이 구성을 자발적 축출이 허용되지 않는 상태(zero voluntary evictions)로 설명하며, 해당 파드가 올라간 노드의 `drain`이 완료되지 않을 수 있다고 안내합니다.

![원하는 파드와 건강한 파드와 허용 중단 수가 차례로 계산되는 장면](./page-01.webp)

백분율(`%`)로 예산을 적을 때는 반올림 규칙도 함께 살펴야 합니다. `maxUnavailable`에 백분율을 지정하면 쿠버네티스는 허용 가능한 파드 수를 올림 처리해 계산하거든요. 예를 들어 파드가 세 개뿐인 소규모 워크로드에 `maxUnavailable: 10%`를 적용하면 소수점 올림 규칙 때문에 한 개까지 비가용을 허용해 전체의 삼분의 일이 한꺼번에 중단될 수 있습니다. 파드 수가 적은 워크로드일수록 파드 한 개가 차지하는 비중이 커져서 직관과 실제 허용치가 어긋나기 쉬우니, 매니페스트의 비율만 믿기보다 `kubectl get pdb`가 보여 주는 허용 중단 수를 직접 대조해 두는 편이 안전합니다.

## 자발적 중단과 비자발적 장애의 경계

![자발적 중단 경로에는 방패가 작동하고 갑작스러운 노드 장애 경로에는 닿지 않는 장면](./page-02.webp)

PDB가 관여하는 범위는 노드 `drain`이나 클러스터 오토스케일러의 노드 축소처럼 eviction API를 경유하는 **자발적 중단**으로 한정됩니다. 갑작스러운 노드 전원 차단, 물리 하드웨어 고장, 커널 패닉 같은 비자발적 장애는 eviction API를 거치지 않고 곧바로 발생하므로 PDB 방패 바깥에서 일어나는 사건입니다. 진정한 의미의 고가용성을 만들려면 PDB 하나에 의존하기보다 다른 실패 도메인에 띄울 대체 파드 여유분, 볼륨 복제, 네트워크 경로, 상태 저장 워크로드의 리더 승계 절차까지 함께 갖추어야 합니다.

## 0 예산을 만났을 때 확인하는 네 가지

그렇다고 단일 replica 서비스에 `maxUnavailable: 0`을 두는 구성이 언제나 잘못된 설정인 것은 아닙니다. 오직 한 개뿐인 핵심 파드를 실수로 내리지 않게 지켜야 한다면 의도에 맞는 정확한 선언인 셈이죠. 실제 제 홈랩에서도 2026년 7월 단일 Vault 파드를 가리키는 PDB의 `disruptionsAllowed`가 `0`이어서 노드 `drain`이 eviction 단계에서 멈춘 적이 있었습니다. 돌이켜 보면 정책이 망가진 것이 아니라, 단일 멤버를 그대로 유지할지 잠시 내리고 노드를 점검할지 운영 결정을 미룬 채 점검부터 시작한 결과였습니다.

`disruptionsAllowed: 0` 앞에서 작업이 멈췄다면 정책부터 성급히 지우기 전에 아래 네 가지 항목을 한 화면에서 차례로 점검해 보시기 바랍니다.

1. **셀렉터 대상 일치 여부**: PDB의 `selector`가 멈춰 선 파드 집합을 의도대로 선택하고 있는지 확인합니다.
2. **원하는 수와 건강한 수 비교**: 워크로드가 요구하는 replica 수와 현재 `Ready` 상태인 파드 수 사이에 이미 결손이 생긴 것은 아닌지 살펴봅니다.
3. **계산된 `disruptionsAllowed` 원인**: 선언한 `minAvailable`·`maxUnavailable`과 파드 건강 상태가 결합해 왜 `0`이 산출되었는지 `describe` 출력으로 짚어 봅니다.
4. **대체 파드의 수용 가능성**: 기존 파드를 내보냈을 때 다른 노드나 실패 도메인에서 새 파드가 정상적으로 스케줄링되고 `Ready`까지 올라올 수 있는지 따져 봅니다.

![남성 카솔이 대상 파드와 건강 상태와 허용 중단 수와 대체 자리의 네 항목을 확인하는 장면](./page-03.webp)

결국 `disruptionsAllowed`가 `0`으로 보인다는 것은 오류가 아니라 지금 내려야 할 운영 판단이 앞에 놓였다는 신호에 가깝습니다. 짧은 다운타임을 수용하고 수동으로 내릴지, replica를 늘려 중단 여유를 확보한 뒤 노드를 비울지, 아니면 점검 시점을 뒤로 미룰지 먼저 결정하는 편이 바람직합니다.

## 함께 읽을 글

- [replica 1은 같은 뜻이 아니었습니다: Vault PDB 앞에서 멈춘 drain](/posts/replica-layer-pdb-drain/): 단일 Vault에서 0 예산이 실제로 드러난 사건입니다.
- [kubectl drain이 멈췄을 때 PDB를 우회하기 전에 확인할 것](/posts/kubectl-drain-pdb-checklist/): PDB 밖의 정체 원인과 우회 옵션을 구분합니다.

## 출처

- [Kubernetes: Specifying a Disruption Budget for your Application](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
- [Kubernetes: Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)
- 개인 인프라 실패 패턴 원장 H-05, 2026-07-14

공식 문서는 2026년 8월 9일 다시 확인했습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
