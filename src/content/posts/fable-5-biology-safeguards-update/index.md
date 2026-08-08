---
title: "Fable 5 생물학 질문이 덜 막힌다: 안전 분류기의 경계를 좁힌 업데이트"
description: "Anthropic이 Fable 5의 생물학 안전 분류기 오탐을 줄인 방법과 계속 제한되는 전문 연구 범위를 구분합니다."
slug: "fable-5-biology-safeguards-update"
publishedAt: 2026-08-08
updatedAt: 2026-08-08
track: news
subtype: announcement_analysis
tags:
  - "AI 모델"
  - "AI 안전"
  - "LLM"
audience: developer
readerOutcome: "Fable 5의 이번 변경이 안전장치 제거가 아니라 생물학 분류기의 오탐을 줄인 업데이트임을 설명하고, 허용 범위와 계속 제한되는 이중용도 연구를 구분한다."
contentFormats:
  - article
  - comic
  - diagram
freshnessStatus: current
reviewedAt: 2026-08-08
reviewAfter: 2026-09-08
cover: "./cover.webp"
coverAlt: "성인형 카솔이 생물학 질문 토큰을 나누는 안전 필터의 경계를 조정하는 표지"
sourceUrl: "https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards"
featured: false
draft: false
---

이번 업데이트의 핵심은 차단을 풀었다는 데 있지 않습니다. Anthropic은 2026년 8월 7일 Fable 5의 생물학 안전 분류기를 다시 학습해, 일상적인 건강·교육 질문까지 다른 모델로 우회시키던 오탐을 줄였다고 발표했습니다. 바이러스학·독성학·분자 설계처럼 회사가 이중용도로 분류한 전문 연구 요청은 계속 더 제한된 모델로 보냅니다.

글·해설: 다메카솔

## 넓게 막던 경계를 다시 그렸습니다

Fable 5가 처음 공개됐을 때 Anthropic은 생물학 질문 대부분에 매우 넓은 안전 여백을 적용했습니다. 위험한 요청을 놓치지 않기 위한 선택이었지만, 증상 이해나 검사 결과 해석처럼 일상적인 질문도 Opus 5로 fallback되는 오탐이 많이 생겼습니다.

![넓은 안전 여백에서 무해한 질문도 우회되던 이전 상태와 경계를 좁혀 유익한 질문을 통과시키는 업데이트를 비교한 만화](./page-01.webp)

Anthropic은 분류기의 규칙 모음인 constitution을 다시 쓰고, 허용할 사례를 더 자세히 나눴다고 밝혔습니다. 새 학습 데이터를 만들고 내부·외부 전문가 의견을 받은 뒤 분류기를 재학습했습니다. 회사 설명대로라면 바뀐 것은 위험 범주 자체보다 경계를 가르는 정밀도입니다.

## 작은 분류기가 두 모델 사이를 가릅니다

![질문이 작은 안전 분류기를 지난 뒤 허용 경로의 Fable 5와 보호 대상 fallback 경로의 Opus 5로 갈라지는 만화](./page-02.webp)

Fable 5 앞에는 별도의 작은 안전 분류기가 있습니다. 이 시스템이 보호 대상 생물학 요청이나 유해한 출력을 감지하면 Fable 5가 그대로 답하지 않고 Opus 5 경로로 요청을 돌립니다. Anthropic은 Opus 5가 Fable 5보다 생물학 능력이 낮아 악의적 사용을 덜 돕는다고 설명합니다.

이번 변경 뒤에도 이 분기는 남습니다. Anthropic이 이중용도로 분류한 바이러스학, 독성학, 분자 설계 요청은 계속 fallback 대상입니다. 따라서 Fable 5를 전문 생물학 연구나 신약 개발에 일반 공개했다는 뜻으로 읽을 수는 없습니다.

## 일상 질문은 더 열리고 전문 연구는 남아 있습니다

![일상 건강과 교육 질문은 열린 쪽에, 이중용도 전문 연구는 잠긴 쪽에 남고 카솔이 그 경계를 설명하는 만화](./page-03.webp)

사용자가 바로 느끼는 변화는 일상 건강·교육 질문에서 나타납니다. Anthropic은 증상 이해, 검사 결과 해석, 생물학 학습과 일부 임상 업무에서 fallback이 줄어들 것이라고 밝혔습니다. 의료 답변의 정확성이나 안전성이 높아졌다는 독립 평가를 공개한 것은 아니므로, 이 변화는 우선 모델 선택 경로의 업데이트로 봐야 합니다.

전문 연구 접근은 별도의 신뢰 경로가 필요합니다. Anthropic은 frontier biology 능력을 연구자에게 제공할 trusted access를 만들겠다는 계획을 밝혔지만, 이번 발표에는 일반 공개 일정이 없습니다. 현재 상태와 미래 계획의 경계가 여기 있습니다.

## 85% 감소는 회사 내부 측정입니다

Anthropic은 자체 테스트에서 제품 표면 전반의 생물학 관련 fallback이 약 85% 줄었다고 보고했습니다. 생물학 외 이유까지 합친 전체 fallback 감소 예상치는 Claude.ai 약 67%, Cowork 55%, Claude Code 17%, Claude Platform 7%입니다. 표본 크기와 독립 검증 결과는 공개 글에 없어 이 숫자는 회사 내부 테스트·예상 범위로 읽어야 합니다.

위험 판단도 같은 원칙으로 봅니다. Anthropic은 Fable 5가 일부 복잡한 생물학 과제에서 전문가를 능가하고, 악의적 행위자에게 공개 정보만으로 얻기 어려운 능력 상승을 줄 수 있다고 평가했습니다. 이는 Anthropic 시스템 카드와 위협 모델에 근거한 회사 판단입니다. 실제 위험의 크기와 모든 사용 상황을 독립적으로 확정한 결과는 아닙니다.

## 다메카솔의 해석

저는 좋은 안전 업데이트를 “얼마나 많이 막았는가”보다 **얼마나 정확히 나눴는가**로 봅니다. 경계가 너무 넓으면 유익한 질문까지 값비싼 우회로로 보내고, 너무 좁으면 위험한 요청이 통과합니다. 이번 변화는 앞의 비용을 줄이면서 뒤의 경계를 유지하려는 조정입니다.

제품을 운영한다면 세 지표를 함께 보겠습니다. 유익한 요청의 오탐률, 위험 요청의 미탐률, fallback 뒤에도 사용자가 받는 도움의 질입니다. Anthropic이 이번에 공개한 것은 주로 첫 번째 변화입니다. 나머지 두 지표가 함께 유지됐는지는 후속 평가와 운영 증거가 더 필요합니다.

## 출처

- [Anthropic — Improving Fable 5's biology safeguards](https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards)
- [Anthropic — Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
- [Anthropic — Claude Fable 5 & Claude Mythos 5 System Card](https://www-cdn.anthropic.com/2f9323abbcc4abe219577539efe19a623c9ca2bd/Claude%20Fable%205%20%26%20Claude%20Mythos%205%20System%20Card.pdf)
- [Anthropic — Responsible Scaling Policy Version 3.4](https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
