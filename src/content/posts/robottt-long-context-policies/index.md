---
title: "로봇이 긴 작업 기록을 가중치에 기억하는 법: RoboTTT 분석"
description: "로봇이 복잡한 부품 조립을 할 때 왜 과거에 했던 단계를 잊어버리고 엉뚱한 행동을 반복할까요? 긴 영상 이력을 무한정 쌓지 않고, 추론 시점의 고속 가중치(Fast Weights)로 압축하는 RoboTTT 아키텍처를 분석합니다."
slug: "robottt-long-context-policies"
publishedAt: 2026-07-19
updatedAt: 2026-07-21
track: paper
subtype: systems
tags:
  - "로보틱스"
  - "LLM"
audience: developer
readerOutcome: "Vision-Language-Action(VLA) 로봇 정책에서 상태 앨리어싱(State Aliasing) 문제를 이해하고, Test-Time Training(TTT)과 Fast Weights를 활용한 장기 컨텍스트 확장 메커니즘을 배운다."
contentFormats:
  - article
  - comic
  - table
  - diagram
freshnessStatus: current
reviewedAt: 2026-07-21
reviewAfter: 2026-10-19
cover: "./cover.webp"
coverAlt: "카솔이 로봇의 긴 조립 관찰 기록을 빠른 가중치 코어와 현재 행동에 연결해 설명하는 표지"
sourceUrl: "https://arxiv.org/abs/2607.15275"
featured: false
draft: false
---
글·해설: 다메카솔

로봇 팔에게 자동차 모형이나 복잡한 전자 회로 기판을 조립하라는 지시를 내렸을 때, 초반 2~3단계는 잘 진행하다가 **"내가 방금 지붕을 끼운 상태인지, 아니면 이제 지붕을 집어야 하는 상태인지"** 헷갈려하며 허공에서 멈칫거리는 모습을 보게 됩니다.

이 문제의 본질은 **상태 앨리어싱(State Aliasing)**에 있습니다. 카메라 화면으로 들어오는 현재 1장의 프레임만 보면, '조립 완료 직전'과 '조립 시작 전'의 시각적 형태가 거의 비슷해 보이기 때문입니다.

그렇다고 지난 5분간의 모든 카메라 프레임을 트랜스포머 KV 캐시에 무작정 밀어 넣으면, GPU 메모리가 터지고 추론 지연 시간(Latency)이 감당할 수 없을 만큼 늘어납니다.

최근 발표된 논문 **RoboTTT: Context Scaling for Robot Policies**는 이 문제를 해결하기 위해 **"긴 시각 이력을 KV 캐시에 쌓지 않고, 추론 시점에 실시간으로 갱신되는 '고속 가중치(Fast Weights)'로 압축하는 Test-Time Training 기법"**을 제안했습니다.

## 상태 앨리어싱(State Aliasing): 로봇이 기억을 잃는 이유

![비슷하게 보이는 조립 단계 때문에 로봇이 이미 끝낸 순서를 다시 고르는 장면](./page-00.webp)

인간은 복잡한 레고를 조립할 때 "내가 3분 전에 빨간색 블록을 어디에 끼웠는지" 작업 흐름의 맥락을 머릿속에 기억합니다.

반면 기존 로봇 정책(VLA 모델)은:
- **현재 시점(Single Frame)**만 보거나 고작 과거 1~2프레임만 참조합니다.
- 조립 과정에서 부품이 로봇 팔에 살짝 가려지면, 이전 단계의 완료 여부를 판단하지 못하고 영구적인 루프에 빠집니다.
- 과거 프레임을 억지로 100장씩 붙여주면(Naive History Concat), 연산량이 폭증할 뿐만 아니라 우연한 상관관계(Spurious Correlation)로 인해 엉뚱한 행동을 유발합니다.

## 해결책: Test-Time Training(TTT)과 고속 가중치(Fast Weights)

![과거 관찰과 행동이 fast-weight 코어를 갱신하고 다음 행동으로 이어지는 도식](./page-01.webp)

RoboTTT는 트랜스포머의 액션 헤드(Action Head) 내부에 **작은 TTT 레이어**를 배치했습니다:

1. **상태를 가중치로 압축**: 카메라 영상 토큰이 실시간으로 들어올 때마다, 자기지도 학습 손실(Self-supervised loss)을 통해 작은 내부 모델의 가중치(Fast Weights)를 즉석에서 1회 역전파 갱신합니다.
2. **상수(O(1)) 추론 비용**: 아무리 4분 이상(8,000 타임스텝)의 긴 작업이 이어져도, 다음 시점으로 넘어가는 데이터는 **'항상 동일한 크기의 고정 가중치 행렬'**뿐입니다.
3. **선택적 기억 메커니즘**: 단순한 비디오 녹화가 아니라, "다음 조립 행동을 결정하는 데 가장 중요한 시각적 단서"만을 가중치 공간에 누적 압축합니다.

## 긴 시퀀스 학습을 위한 엔지니어링 기법

![긴 로봇 궤적을 구간으로 나누고 fast-weight 상태는 경계를 넘어 전달하는 훈련 도식](./page-03.webp)

8,000 스텝에 달하는 초장기 궤적을 GPU 메모리 오버플로우 없이 훈련하기 위해 2가지 기법이 도입되었습니다:
- **Sequence Action Forcing**: 액션 청크마다 서로 다른 노이즈 레벨을 주입하여 장기 궤적의 훈련 안정성을 확보
- **Truncated BPTT**: 역전파 그래디언트는 작은 시간 구간으로 끊어서 계산하되, 고속 가중치 상태(Fast Weights)는 구간 경계를 넘어 끝까지 전파

## 실제 양팔 로봇 조립 벤치마크 결과

![차 조립, 회로 조립, 긴 기어 조립의 세 실제 로봇 평가 조건을 나란히 보여 주는 장면](./page-04.webp)

NVIDIA YAM 양팔 로봇을 이용해 자동차 모형, 전자 회로, 기어 조립 등 3가지 고난도 과제를 실험한 결과:
- **평균 과제 완료율**: 기존 GR00T(42%) 대비 **RoboTTT 79%로 비약적 상승** (약 87% 상대 개선)
- **외부 교란 복원력**: 사람이 조립 도중에 지붕 부품을 억지로 떼어내도, 과거 이력을 기억하고 스스로 부품을 다시 집어와 끼우는 자가 복구 행동 성공

## 다메카솔의 해석: 임베디드 AI와 엣지 컴퓨팅을 향한 이정표

RoboTTT가 주는 핵심 엔지니어링 교훈은 **"컨텍스트 확장이 꼭 무거운 KV 캐시의 확장을 의미하는 것은 아니다"**라는 점입니다.

1. **고정 메모리 footprint**: 추론 시간이 길어져도 메모리 점유율이 일정하므로, 연산 자원이 제한된 임베디드 로봇 엣지 디바이스에 매우 적합합니다.
2. **로봇의 장기 기억 아키텍처**: LLM에서 대두되는 TTT-Linear 모델의 구조가 피지컬 AI(Robotics) 영역에서도 장기 조작(Long-horizon Manipulation)의 돌파구가 될 수 있음을 증명했습니다.

## 함께 읽을 AI 시스템 글

- [컴퓨터 사용 AI 에이전트의 GUI 제어 아키텍처(Tactile)](/posts/tactile-computer-use-agents/)
- [VLM 기하학적 토큰과 공간 추론(IE3D)](/posts/vlm-ie3d-geometry-tokens/)

## 출처

- [RoboTTT: Context Scaling for Robot Policies, arXiv:2607.15275](https://arxiv.org/abs/2607.15275)
- [NVIDIA GEAR Lab — RoboTTT Official Project Page & Demo Videos](https://research.nvidia.com/labs/gear/robottt/)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
