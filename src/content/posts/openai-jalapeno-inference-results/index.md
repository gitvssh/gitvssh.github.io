---
title: "OpenAI Jalapeño 첫 실측: 추론 칩은 왜 데이터 이동을 줄였나"
searchTitle: "OpenAI Jalapeño 추론 칩 첫 실측 결과"
description: "OpenAI Jalapeño의 첫 추론 성능 결과를 벤치마크 조건, 데이터 이동 설계, 생산 검증과 연말 배포 경계로 나눠 분석합니다."
slug: "openai-jalapeno-inference-results"
publishedAt: 2026-08-26
updatedAt: 2026-08-26
track: news
subtype: announcement_analysis
tags:
  - "AI 하드웨어"
  - "AI 인프라"
  - "벤치마크"
audience: developer
readerOutcome: "Jalapeño의 첫 실측에서 회사가 주장한 성능, 데이터 이동을 줄인 설계, 아직 남은 생산 검증과 배포 계획을 구분한다."
contentFormats:
  - article
  - comic
  - diagram
freshnessStatus: current
reviewedAt: 2026-08-26
reviewAfter: 2026-09-26
cover: "./cover.webp"
coverAlt: "성인형 카솔이 길게 늘어진 AI 요청 흐름이 하나의 연결된 추론 엔진에서 정돈되는 장면을 소개하는 표지"
sourceUrl: "https://openai.com/index/jalapeno-first-results/"
featured: false
draft: false
---

글·해설: 다메카솔

AI 칩 성능은 계산 장치가 얼마나 빠른지로 결정된다고 보기 쉽습니다. OpenAI가 2026년 8월 25일 공개한 첫 자체 추론 칩 `Jalapeño`의 실측 설명은 다른 병목을 앞에 둡니다. 프리필, 디코드, 코어·칩 사이 통신에서 데이터가 기다리고 이동하는 시간을 함께 줄여야 처리량·지연·전력 효율이 동시에 좋아진다는 주장입니다.

## 첫 측정은 세 공개 모델에서 진행됐습니다

OpenAI가 이번에 공개한 것은 새 칩의 존재보다 그 칩에서 얻은 첫 측정 결과입니다. 회사는 공개 추론 벤치마크 `InferenceX`로 GPT-OSS 120B, DeepSeek R1 670B, Kimi K2.5 1T를 시험하고, 상용 비교 시스템과 처리량·전력·지연을 맞춰 봤다고 밝혔습니다.

OpenAI의 집계에서 Jalapeño는 세 모델의 최고 처리량 구간에서 전력당 AI 작업이 1.5~1.9배 많았고 종단 간 지연은 1.7~3.6배 낮았습니다. 고상호작용 구간 성능은 2.1~4.1배 높았다는 결과도 제시했습니다. 모두 OpenAI가 공개한 비교 수치이며, 칩의 공시 전력과 특정 입력·출력 길이, 해당 시점 소프트웨어 설정을 포함한 조건부 결과입니다.

## 한 요청 안에서도 병목의 위치는 바뀝니다

![뜨거운 프리필 계산 블록과 디코드 메모리 흐름이 로컬 상태 허브와 짧은 연결 경로로 이어지는 구조](./page-01.webp)

프리필에서는 입력 토큰을 한꺼번에 처리하므로 계산 자원이 바빠집니다. 답을 한 토큰씩 만드는 디코드로 넘어가면 모델 가중치와 KV cache를 읽는 메모리 대역폭의 영향이 커집니다. 코어와 칩 사이에서 모델 상태를 옮기는 동안 처리 장치가 기다리는 시간도 전체 응답을 늦춥니다.

OpenAI는 Jalapeño가 모델 상태와 KV cache를 필요한 위치에 명시적으로 두고, 추론 단계마다 계산·메모리·네트워크 조합을 바꾸도록 설계됐다고 설명합니다. 핵심은 어느 한 장치의 최고치보다 전체 요청이 연결된 시스템 안에 머무르게 하는 데 있습니다. 데이터 이동이 짧아지면 프리필과 디코드 사이에서 한쪽 자원이 놀 가능성도 줄어듭니다.

## 배수보다 비교 조건을 먼저 읽어야 합니다

숫자만 떼어 보면 의미가 과장됩니다. 이번 그래프는 `InferenceX`의 특정 입력·출력 길이와 모델 정밀도, 비교 시스템, 전력 정규화 방식을 사용했습니다. OpenAI는 Jalapeño의 공시 전력을 700W로 두었고 시험 중 지속 전력이 550W 이하였다고 적었지만, 독립 운영자가 같은 하드웨어와 소프트웨어로 재현한 결과는 이번 발표에 포함되지 않았습니다.

개발 과정의 AI 활용도 범위를 좁혀 읽어야 합니다. OpenAI는 초기 설계부터 tapeout까지 9개월이 걸렸고, 선택한 GPT-OSS attention·mixture-of-experts 블록에서는 AI 생성 구현이 기존 전문가 구현보다 1.5~1.8배 빨랐다고 보고했습니다. 이 배수는 전체 모델 속도가 아니라 선택된 블록의 구현 비교입니다.

## 실제 배포는 생산 검증 뒤에 남아 있습니다

![성인형 카솔이 공개 벤치마크 관측창, 점검 중인 생산 게이트, 아직 닫힌 미래 운영문을 구분하는 장면](./page-02.webp)

회사 발표는 실제 배포를 2026년 말 시작 계획으로 두었습니다. 8월 26일 현재 OpenAI는 생산 적격성 평가, 소프트웨어 성숙화, 대규모 운영 준비, 더 많은 모델 검증을 진행 중이라고 밝혔습니다. 작동하는 첫 자체 실리콘과 측정 결과는 존재하지만, 일반 고객이 지금 구매하거나 API에서 하드웨어를 선택하는 제품 상태는 아닙니다.

Jalapeño가 기존 가속기를 모두 대체한다는 설명도 없습니다. OpenAI는 NVIDIA 등 파트너 가속기를 훈련과 추론에 계속 폭넓게 쓰면서, 자체 실리콘을 워크로드와 경제성에 따라 고를 수 있는 추가 경로로 제시합니다. 실제 판단에는 가격, 가동률, 장애 복구, 모델 업데이트 속도까지 운영 자료가 더 필요합니다.

## 다메카솔의 해석

제가 보는 핵심은 ‘더 빠른 칩’보다 병목의 소유 범위가 넓어진 데 있습니다. 모델, 커널, 메모리 배치, 네트워크, 랙 운영을 함께 바꿀 수 있으면 한 단계의 개선이 다른 단계의 대기를 줄일 수 있습니다. 반대로 특정 회사 워크로드에 맞춘 수직 통합은 다른 모델·도구 체인으로 옮길 때 새로운 커널과 최적화를 계속 요구합니다.

인프라 팀이 다음 자료에서 확인할 순서도 분명합니다. 같은 벤치마크 조건의 외부 결과, 실제 전력과 가동률, 장애 때의 성능 저하, 여러 모델을 올리는 데 걸린 시간, 그리고 비용입니다. 첫 실측은 출발점입니다. 생산 환경에서 이 조건들이 공개될 때 Jalapeño의 운영 가치를 판단할 수 있습니다.

## 출처

- [OpenAI, Jalapeño’s first results show industry-leading speed and efficiency in AI inference (2026-08-25)](https://openai.com/index/jalapeno-first-results/)
- [OpenAI, The full stack behind abundant intelligence (2026-08-25)](https://openai.com/index/the-full-stack-behind-abundant-intelligence/)
- [OpenAI, OpenAI and Broadcom unveil LLM-optimized inference chip (2026-06-24)](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)
- [SemiAnalysisAI, InferenceX open-source continuous inference benchmark (2026-08-26 확인)](https://github.com/SemiAnalysisAI/InferenceX)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
