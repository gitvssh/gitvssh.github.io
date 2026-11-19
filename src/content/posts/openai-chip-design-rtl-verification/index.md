---
title: "OpenAI의 칩 설계 AI: 회로를 바꾸고 동작은 검증한다"
description: "AI의 회로 수정과 설계 도구 검증, 실제 제품 반영의 차이를 설명합니다."
slug: "openai-chip-design-rtl-verification"
publishedAt: "2026-11-19T00:15:46.307595+00:00"
track: "news"
subtype: "research_news"
tags: ["AI 하드웨어", "OpenAI", "반도체"]
audience: "builder"
readerOutcome: "AI의 회로 수정, 설계 도구 검증, 실제 제품 반영을 구분한다."
contentFormats: ["comic", "article"]
freshnessStatus: "current"
reviewedAt: "2026-11-19"
reviewAfter: "2026-11-26"
cover: "./cover.webp"
coverAlt: "카솔이 회로 경로를 살펴보는 칩 설계 해설 표지. 실제 칩 도면이 아닌 개념도"
sourceUrl: "https://openai.com/index/advancing-chip-design-with-our-models/"
featured: false
draft: false
---

글·해설: 다메카솔

OpenAI는 2026년 11월 18일 AI로 칩 회로를 개선한 사례를 공개했습니다. 핵심은 회로를 표현하는 코드(RTL)를 고치고, Synopsys 설계 도구로 원래 동작이 유지되는지와 전력·성능·면적(PPA)을 확인했다는 설명입니다. 아래 결과는 회사 발표 기준입니다.

## 수정안과 검증을 함께 보는 이유

RTL은 칩 내부의 계산과 데이터 이동을 기술합니다. OpenAI는 연산 회로와 처리 단계를 다시 구성해 하드웨어를 공유하고 중간 저장을 줄였다고 설명합니다. Jalapeño의 개선은 실제 실리콘 초기 구동에서도 확인했다고 밝혔습니다.

![복잡한 회로 경로를 고친 뒤 입력과 출력을 비교하는 카솔. AI 수정안과 검증 단계를 구분한 개념도](./page-01.webp)

이 그림은 수정과 검증을 구분하는 개념도입니다. 실제 설계 도면이나 도구 화면을 재현하지 않았습니다. 이전 [Jalapeño 추론 실측 기사](/posts/openai-jalapeno-inference-results/)가 실행 성능을 다뤘다면, 이번 발표는 회로를 어떻게 바꿨는지에 초점을 둡니다.

## 회로 개선을 제품 전체 성능으로 읽지 않기

OpenAI는 AMD GPU 설계 일부 변경이 제조에 보낸 설계에 들어갔고, 다른 변경은 향후 버전용 설계 파일에 반영됐다고 밝혔습니다. 이것만으로 소비자 제품의 출시나 전체 처리속도 향상을 확정할 수는 없습니다.

별도 RISC-V 실험은 시뮬레이션 검사와 면적 제한을 둔 처리량 평가였습니다. 요구사항에서 새로 설계할 때 일부 기능을 생략할 수 있었고, 회사도 더 엄격한 면적·물리 구현 검증이 필요하다고 적었습니다. 실험 점수를 완성된 상용 칩 성능으로 옮겨 읽으면 조건이 사라집니다.

## GPT-Synopsys는 별도의 개발 계획입니다

Synopsys가 9월 30일 발표한 협력은 전문 모델 GPT-Synopsys를 공동 개발하는 다년 계약입니다. 엔지니어가 목표를 맡기면 에이전트가 설계 도구를 실행하고 결과를 해석해 수정안을 반복하며, 엔지니어가 검토하는 흐름을 제시했습니다. 당시 발표는 초기 고객 협업이 진행 중이라고 설명했고, 일반 고객의 이용 시점은 확정하지 않았습니다.

다메카솔의 해석: 이 소식에서 주목할 부분은 수정안을 많이 만드는 능력과 그 수정안을 믿을 근거가 함께 다뤄졌다는 점입니다. 코드가 짧아지거나 도식이 단순해 보여도 같은 동작을 하는지, 다른 조건에서도 이득이 남는지는 따로 확인해야 합니다.

## 출처

- [OpenAI 칩 설계 발표](https://openai.com/index/advancing-chip-design-with-our-models/) — 2026년 11월 18일. 회로 개선과 검증 결과의 출처이며 독립 재현 자료는 아닙니다.
- [Synopsys의 GPT-Synopsys 협력 발표](https://investor.synopsys.com/news/news-details/2026/OpenAI-and-Synopsys-Announce-GPT-Synopsys-Frontier-Intelligence-to-Revolutionize-Chip-Design/default.aspx) — 2026년 9월 30일. 협력과 개발 계획의 배경 자료입니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
