---
title: "LLM은 믿을 만한 출처를 더 믿을까: Learn2Discern이 밝힌 RAG의 빈틈"
description: "RAG 검색으로 정보를 주입했을 때 LLM은 진짜 신뢰할 수 있는 출처를 더 믿을까요? 미시간대 연구진의 Learn2Discern 실험을 통해 모델이 사실의 정확성보다 '인기도(Popularity)'에 휘둘리는 메커니즘과 RAG 가드레일 설계법을 분석합니다."
slug: "information-discernment-llm-sources"
publishedAt: 2026-07-23
updatedAt: 2026-07-23
track: paper
subtype: empirical
tags:
  - "LLM"
  - "RAG"
  - "벤치마크"
audience: developer
readerOutcome: "RAG 시스템에서 LLM이 외부 검색 정보를 수용할 때 발생하는 출처 신뢰도 왜곡 문제를 이해하고, 출처 평가와 정답 방어(Correct Answer Defense)를 위한 검증 파이프라인을 구축할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
freshnessStatus: current
reviewedAt: 2026-07-23
reviewAfter: 2026-10-23
cover: "./cover.webp"
coverAlt: "카솔이 인기 높은 출처와 신뢰도 높은 출처 사이에서 LLM의 정보 갱신 경로를 점검하는 표지"
sourceUrl: "https://arxiv.org/abs/2607.19355"
featured: false
draft: false
---
글·해설: 다메카솔

LLM에게 최신 정보나 사내 데이터를 가르치기 위해 검색 증강 생성(RAG)이나 웹 브라우징 기능을 붙여줍니다.

그런데 검색 결과로 들어온 문서 중에 **신뢰도가 떨어지는 블로그 글이나 잘못된 루머**가 섞여 있다면, LLM은 이를 스스로 분별하여 걸러낼 수 있을까요?

최근 미시간대 연구진이 발표한 논문 **Information Discernment in Large Language Models (Learn2Discern)**은 13개 최신 LLM을 대상으로 67만 회의 실험을 진행했습니다.

연구 결과는 충격적입니다: **"LLM은 출처의 '전문성이나 신뢰도'보다 웹상의 '인기도(트래픽/노출량)'에 훨씬 더 민감하게 반응하여 신념을 왜곡했으며, 심지어 이미 맞게 알고 있던 정답마저 잘못된 외부 주장에 휘둘려 오답으로 바꾸어 버렸다."**

이번 글에서는 RAG 파이프라인의 맹점과, 실무 엔지니어가 구축해야 할 **'정보 판별(Discernment) 가드레일'**을 정리합니다.

## 외부 정보 수용의 3대 핵심 축

![출처 신뢰도 나침반, 진실 방향 화살표, 맞는 답을 지키는 방패가 각각 분리된 장면](./page-02.webp)

RAG 시스템이 제대로 작동하려면 LLM은 다음 3가지 판단을 정확히 해내야 합니다:

1. **출처 판별 (Source Discernment)**: 권위 있는 학술 기관이나 공식 문서의 주장을 개인 SNS 루머보다 더 무겁게 신뢰
2. **진실 판별 (Truth Discernment)**: 외부 정보를 받아들였을 때 최종 답변이 진짜 사실(Truth)에 가까워지는 방향으로 수정
3. **정답 방어 (Correct Answer Defense)**: 모델이 이미 올바른 지식을 갖고 있을 때, 오염된 외부 문서가 주입되더라도 기존 정답을 굳건히 수호

## 13개 모델, 67만 회 실험 결과

![큰 군중의 관심을 받는 인기 출처 쪽으로 LLM 저울이 더 기울고 신뢰도 높은 출처의 힘은 약하게 표현된 장면](./page-04.webp)

연구진은 4,248개의 숫자형 팩트 질문에 대해 조작된 출처 데이터를 주입하며 모델들의 반응을 측정했습니다:

- **신뢰도보다 '인기도'에 반응**: 출처 신뢰도와의 상관계수는 `0.03`에 불과했던 반면, 대중적 인기도와의 상관계수는 `0.07`로 2배 이상 높았습니다. 즉, 모델은 내용의 팩트 여부보다 **"인터넷에서 흔히 돌아다니는 유명 사이트의 주장"을 무비판적으로 추종**하는 편향을 보였습니다.
- **오답으로 전락하는 비율**: 잘못된 사전 지식을 외부 문서를 통해 정답으로 교정한 비율(21.3%)과, **멀쩡한 정답을 외부 오정보에 낚여 오답으로 망가뜨린 비율(22.1%)**이 거의 대등했습니다.

단순히 검색 문서를 프롬프트 컨텍스트에 냅다 이어 붙이는 방식(Naive RAG)이 얼마나 취약한지 적나라하게 드러난 셈입니다.

## 프롬프트 엔지니어링을 통한 조기 완화 실험

![성인형 카솔이 출처 평가, 기존 답 점검, 사람 검토 단계를 분리하고 실험 경계 밖의 전체 RAG 파이프라인을 가리키는 장면](./page-05.webp)

연구진이 모델에게 "출처의 신뢰성을 먼저 비판적으로 평가한 뒤 답하라"는 지침(Chain-of-Thought)을 주었을 때 출처 판별 능력이 일부 향상되었습니다. 

하지만 프롬프트만으로는 도메인별 전문성(예: 의학, 법률)을 완벽히 분별하지 못했습니다.

## 다메카솔의 해석: 1단계 RAG를 넘어선 '2단계 검증 아키텍처'

이 연구는 RAG를 포기하라는 뜻이 아니라, **"검색 결과를 그대로 프롬프트에 넣고 즉시 답변을 뽑는 1단계 구조를 탈피해야 한다"**는 것을 보여줍니다.

프로덕션 RAG를 구축하는 백엔드 아키텍트에게 다음 파이프라인을 권장합니다:

1. **문서 인덱싱 시점의 신뢰도 가중치(Metadata Weighting)**: 모든 문서를 동일하게 취급하지 말고, 공식 기술 문서, 승인된 사내 위키 등에 명시적인 신뢰도 가중치(Priority Rank)를 부여하세요.
2. **2단계 Fact-Checking 레이어**: LLM이 답변을 생성한 직후, 검색된 원본 문서의 직접 인용구와 생성된 문장을 1:1로 대조하여 환각이나 왜곡이 없는지 검증하는 사후 평가기(Critic LLM)를 배치해야 합니다.
3. **불확실성 임계치 기반의 거부(Abstention)**: 검색된 문서들 간에 내용이 충돌할 경우, 억지로 그럴듯한 답변을 지어내지 않고 "출처 간 정보가 상충하여 확인이 필요합니다"라고 응답을 보류하는 가드레일을 두어야 합니다.

## 함께 읽을 AI/RAG 글

- [Gemini 에이전트의 Parallel 웹 검색 그라운딩 아키텍처](/posts/google-gemini-parallel-web-search/)
- [워크플로우를 지식으로 자산화하는 엔지니어링 방법론](/posts/workflow-as-knowledge/)

## 출처

- [Information Discernment in Large Language Models, arXiv:2607.19355](https://arxiv.org/abs/2607.19355)
- [Learn2Discern Official Research Repository](https://github.com/josh-ashkinaze/l2d-public)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
