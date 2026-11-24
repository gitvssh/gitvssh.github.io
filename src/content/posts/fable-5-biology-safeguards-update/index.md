---
title: "Fable 5 생물학 질문이 덜 막힌다: 안전 분류기의 경계를 좁힌 업데이트"
description: "Anthropic이 Fable 5의 생물학 안전 분류기 오탐을 줄인 방법과 계속 제한되는 전문 연구 범위를 구분합니다."
slug: "fable-5-biology-safeguards-update"
publishedAt: 2026-08-08
updatedAt: "2026-11-23"
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

AI 서비스에 안전 필터를 얹다 보면 위험한 요청을 막으려다 일상적인 질문까지 함께 걸러지는 일이 자주 벌어집니다. 증상이나 검사 결과를 묻고 기초 생물학을 공부하려는 질문이 넓은 차단망에 걸려 제한 모델로 우회되곤 했거든요. Anthropic이 2026년 8월 7일 발표한 Fable 5 생물학 안전 업데이트는 바로 이 **분류 경계를 정밀하게 좁혀** 오탐을 줄이는 데 초점을 맞췄습니다.

글·해설: 다메카솔

## 핵심 내용

- **안전 분류기 재학습**: 분류 규칙 모음(constitution)을 다시 쓰고 허용 사례를 세분화한 뒤, 새 학습 데이터와 내·외부 전문가 검토를 거쳐 Fable 5 앞단의 생물학 안전 분류기를 재학습했습니다.
- **일상 질문과 이중용도 연구 분리**: 증상 이해, 검사 결과 해석, 기초 생물학 학습, 일부 임상 업무는 Fable 5 직접 응답이 늘어나고, 바이러스학·독성학·분자 설계 등 이중용도 전문 연구 요청은 계속 Opus 5로 우회(fallback)됩니다.
- **자체 측정 fallback 감소**: Anthropic 내부 테스트에서 생물학 관련 fallback이 약 85% 줄었으며, 전체 fallback 감소 예상치는 Claude.ai 약 67%, Cowork 55%, Claude Code 17%, Claude Platform 7%입니다.

## 넓게 막던 경계를 다시 그렸습니다

![넓은 안전 여백에서 무해한 질문도 우회되던 이전 상태와 경계를 좁혀 유익한 질문을 통과시키는 업데이트를 비교한 만화](./page-01.webp)

Fable 5가 처음 공개됐을 때 Anthropic은 위험한 생물학 요청을 놓치지 않으려 매우 넓은 안전 여백을 두었습니다. 그러다 보니 위험성과 거리가 먼 증상 이해나 검사 결과 해석 질문까지 Opus 5로 우회되는 오탐이 잦았죠.

이번 업데이트에서 Anthropic은 위험 범주를 없애는 대신 constitution을 다시 쓰고 허용 사례를 촘촘하게 나눴습니다. 새 학습 데이터 구축과 내·외부 전문가 의견 반영으로 분류기를 재학습해 경계선의 정밀도를 높였습니다.

## 작은 분류기가 두 모델 사이를 가릅니다

![질문이 작은 안전 분류기를 지난 뒤 허용 경로의 Fable 5와 보호 대상 fallback 경로의 Opus 5로 갈라지는 만화](./page-02.webp)

Fable 5 앞단에는 별도의 작은 안전 분류기가 동작합니다. 보호 대상 생물학 요청이나 유해한 출력을 감지하면 Fable 5 대신 생물학 역량이 더 낮은 Opus 5 경로로 요청을 돌리는 구조입니다.

| 요청 구분 | 주요 예시 | 라우팅 경로 | 비고 |
| --- | --- | --- | --- |
| **일상 건강·교육·일부 임상** | 증상 이해, 검사 결과 해석, 생물학 학습, 일부 임상 업무 | **Fable 5 직접 응답 확대** | 과도하게 발생하던 오탐(fallback) 축소 |
| **이중용도(Dual-use) 전문 연구** | 바이러스학, 독성학, 분자 설계 등 위험도가 높은 전문 생물학 요청 | **Opus 5로 우회 (유지)** | 검증된 연구자용 `trusted access`는 계획 단계(공개 일정 미정) |

예를 들어 사용자가 병원 검사 결과의 의미를 묻거나 기초 생물학 개념을 정리해 달라고 요청하면 이제 Fable 5가 직접 답할 가능성이 높아집니다. 반대로 바이러스학이나 독성학, 분자 설계 같은 이중용도 전문 연구는 기존처럼 Opus 5 우회 경로로 넘어가죠. 이번 조치는 일상 질문의 오탐을 줄인 개선으로 보고, 전문 생물학 연구나 신약 개발용 개방과는 구분해 이해해야 합니다.

## 일상 질문은 더 열리고 전문 연구는 남아 있습니다

![일상 건강과 교육 질문은 열린 쪽에, 이중용도 전문 연구는 잠긴 쪽에 남고 카솔이 그 경계를 설명하는 만화](./page-03.webp)

일반 사용자와 빌더가 체감하는 변화는 건강과 교육 영역에 집중됩니다. 불필요한 우회가 줄어들면 대화 흐름이 끊기거나 답변 깊이가 떨어지는 불편이 완화되거든요. 다만 이번 조정은 앞단 분류기의 라우팅 기준을 손본 것이므로, 의료 답변의 임상적 정확성이나 안전성은 별도 독립 평가로 확인해야 할 영역으로 남습니다.

한편 frontier 생물학 역량이 필요한 전문 연구자를 위해 Anthropic은 별도의 신뢰 경로(`trusted access`)를 마련할 계획이라고 밝혔습니다. 구체적인 일반 공개 일정은 이번 발표에 포함되지 않았습니다.

## 85% 감소 수치와 위험 판단을 읽는 기준

Anthropic은 자체 테스트에서 제품 전반의 생물학 관련 fallback이 약 85% 줄었다고 보고했습니다. 생물학 외 사유까지 포함한 전체 fallback 감소 예상치는 제품 표면별로 차이가 있습니다.

- **Claude.ai**: 약 67% 감소
- **Cowork**: 약 55% 감소
- **Claude Code**: 약 17% 감소
- **Claude Platform**: 약 7% 감소

발표문에는 테스트 표본 크기나 외부 독립 검증 결과가 공개되지 않았으므로, 이 수치는 회사의 내부 테스트 및 예상치로 읽는 편이 맞습니다. Fable 5가 일부 복잡한 생물학 과제에서 전문가를 능가하고 악의적 행위자에게 공개 정보만으로 얻기 어려운 역량 상승을 줄 수 있다는 평가 역시 Anthropic의 시스템 카드와 내부 위협 모델에 근거한 판단입니다.

## 다메카솔의 해석

안전 업데이트의 성패는 “얼마나 많이 막았는가”보다 **얼마나 정확히 나눴는가**에 달려 있습니다. 경계가 너무 넓으면 유익한 질문까지 제한 모델로 보내 사용성을 해치고, 너무 좁으면 위험 요청이 통과할 수 있거든요. 이번 조정은 후자의 방어선을 유지하면서 전자의 오탐 비용을 줄이려는 작업입니다.

실무에서 AI 제품 가드레일을 운영할 때도 유익한 요청의 **오탐률**, 위험 요청의 **미탐률**, 그리고 우회된 뒤 사용자가 받는 **도움의 질**을 함께 살펴야 합니다. 이번 발표는 첫 번째 지표인 오탐률 개선을 수치로 제시한 셈이죠. 미탐률 방어와 우회 응답의 품질이 현장에서 어떻게 유지되는지는 후속 운영 데이터로 확인할 부분입니다.

## 출처

- [Anthropic — Improving Fable 5's biology safeguards](https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards)
- [Anthropic — Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
- [Anthropic — Claude Fable 5 & Claude Mythos 5 System Card](https://www-cdn.anthropic.com/2f9323abbcc4abe219577539efe19a623c9ca2bd/Claude%20Fable%205%20%26%20Claude%20Mythos%205%20System%20Card.pdf)
- [Anthropic — Responsible Scaling Policy Version 3.4](https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf)

Anthropic 공식 발표와 공개 문서를 바탕으로 정리했으며, 별도 실행 측정은 포함하지 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
