---
title: "ModHarness-RL: 모델 곁의 도구도 학습할 수 있을까?"
description: "ModHarness-RL의 고정 압축 규칙과 학습 중 갱신하는 개입 규칙을 구분하고, CodeSearch 결과의 범위를 살펴봅니다."
slug: "modharness-learned-agent-scaffold"
publishedAt: "2026-11-16T06:28:19Z"
track: "paper"
subtype: "systems"
tags: ["AI 에이전트", "강화학습", "평가"]
audience: "developer"
readerOutcome: "고정 압축 규칙과 학습 중 갱신하는 개입 규칙을 구분한다."
contentFormats: ["comic", "article"]
freshnessStatus: "current"
reviewedAt: "2026-11-16"
reviewAfter: "2027-02-16"
cover: "./cover.webp"
coverAlt: "기록 정리와 개입을 분리하는 하네스를 살피는 카솔"
sourceUrl: "https://arxiv.org/abs/2611.18533v1"
featured: false
draft: false
---

글·해설: 다메카솔

ModHarness-RL은 에이전트가 읽는 기록과 실패 때 받는 안내를 프로그램으로 학습하는 방법입니다. Zelin He 등의 2026년 11월 13일 논문은 모델 가중치를 훈련하면서 주변 하네스도 조정할 수 있는지 묻습니다. 하네스는 도구와 모델 사이에서 입력과 안내를 구성하는 층입니다. 



## 기록 정리와 개입은 다르게 배웁니다

실행 기록을 추론·도구 호출·결과 블록으로 저장합니다. Compression은 필요한 기록을 골라 문맥을 구성하고, 원래 기록은 보존합니다. 이 프로그램은 훈련 전에 학습한 뒤 고정합니다. Steering은 반복되는 실패를 감지해 짧은 안내를 넣으며 훈련 중 갱신합니다. 실행 때마다 별도 모델을 불러 요약하는 방식과 다릅니다. 

후보 규칙은 실행 검사와 과거 기록 재검토를 거칩니다. 이미 줄어드는 실패에는 개입을 보류하고, 따로 떼어 둔 훈련 과제에서 기존 규칙보다 나아야 교체합니다. 

![고정된 기록 정리 장치와 조절되는 개입 장치를 비교하는 카솔](./page-01.webp)

## 결과는 수정 위치를 찾는 점수입니다

표 1의 Qwen3-8B·문맥 제한 조건에서 CodeSearch 전체 F1은 기본 하네스 0.333, ModHarness-RL 0.412입니다. SWE-Bench Lite·Verified·Pro에서 파일·모듈·엔티티 위치를 찾는 평가이며, 버그 수정 성공률이 아닙니다. 같은 훈련 설정의 최종 체크포인트 비교로, 독립 재현값은 아닙니다. 

## 어디까지 적용할 수 있을까요

전체 방법과 타 방법 비교는 CodeSearch에 집중됐습니다. ALFWorld·BIRD SQL은 구성요소별 확장 평가입니다. 작은 검증 집합은 나쁜 규칙도 채택할 수 있고, 명시적 규칙으로 포착하기 어려운 자유 대화에는 한계가 있습니다. 프로그램 생성에는 GPT-5-mini가 쓰였습니다. 

## 다메카솔의 해석

제 해석은 기록 정리와 행동 개입을 별도 변경으로 관리하자는 것입니다. 규칙을 늘리기 전에 실패가 지속되는지, 바꾼 뒤 평가가 나아지는지 확인해야 합니다. [실행 지식을 보존하는 ReproBridge](/posts/reprobridge-execution-knowledge/)와 함께 보면 기록 보관과 규칙 학습의 차이가 선명해집니다. 

자료 확인: 2026-11-16. [논문 원문](https://arxiv.org/abs/2611.18533v1), [저자 프로젝트](https://zlhe0.github.io/ModHarness-RL/). 만화는 개념을 재작화한 비유이며 논문 그림이나 실제 화면을 복제하지 않았습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
