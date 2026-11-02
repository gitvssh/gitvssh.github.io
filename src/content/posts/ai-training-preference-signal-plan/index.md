---
title: "AI 학습 선호 공통 신호, OpenAI 도입은 아직 예정"
description: "OpenAI의 AI 학습 선호 공통 신호 도입 계획과 기존 크롤러 제어, IETF 개인 초안 상태를 구분합니다."
slug: "ai-training-preference-signal-plan"
publishedAt: "2026-11-02T00:23:35Z"
track: "news"
subtype: "release_announcement"
tags: ["OpenAI", "robots.txt", "AI 학습"]
audience: "developer"
readerOutcome: "공통 학습 선호 신호의 도입 계획과 현재 크롤러 제어, 표준화 상태를 구분한다."
contentFormats: ["comic", "article"]
freshnessStatus: "current"
reviewedAt: "2026-11-02"
reviewAfter: "2026-11-09"
cover: "./cover.webp"
coverAlt: "도입 예정인 공통 학습 선호 신호를 살피는 카솔"
sourceUrl: "https://openai.com/index/helping-websites-express-ai-training-preferences/"
featured: false
draft: false
---

글·해설: 다메카솔

OpenAI는 2026년 10월 30일, 웹사이트가 robots.txt로 AI 학습 선호를 여러 참여 업체에 함께 알리는 공통 신호를 존중하겠다고 발표했습니다. 구현은 **향후 몇 달** 안에 진행할 계획입니다. 11월 2일 확인한 발표문은 적용 완료를 알리는 문서가 아닙니다. [OpenAI 공식 발표](https://openai.com/index/helping-websites-express-ai-training-preferences/)

## 기존 설정은 계속 유효합니다

OpenAI는 공통 신호가 기존 크롤러 제어를 대체하지 않으며, 기존 robots.txt 제어를 계속 존중한다고 설명합니다. 사이트 운영자가 발표만 보고 현재 규칙을 지울 근거는 없습니다. 회사는 구현할 때 세부 사항을 다시 알리겠다고 했습니다.

## 하나의 신호가 전달하려는 것

연결된 제안은 개별 크롤러의 접근 규칙과 별도로 콘텐츠의 **학습 용도**에 대한 선호를 표현합니다. 크롤러마다 같은 의사를 반복해서 적는 부담을 줄이려는 취지입니다. 접근 허용과 학습 선호는 구분해서 읽어야 합니다.

![기존 제어 유지와 공통 신호의 초안 상태를 구분하는 만화](./page-01.webp)

## 표준화가 끝난 상태도 아닙니다

발표가 연결한 문서는 10월 30일 갱신된 개인 초안(Internet-Draft)입니다. IETF Datatracker는 이 문서가 IETF의 승인을 받거나 표준 절차에서 공식 지위를 얻은 문서가 아니라고 명시합니다. 제목에 표준화 관련 용어가 있다고 해서 확정 표준으로 소개하면 안 됩니다. [초안 상태와 본문](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)

다메카솔의 해석: 이번 발표의 실무적 의미는 공통 의사 표시를 지원하겠다는 방향이 생겼다는 데 있습니다. 기존 제어를 유지하면서 후속 구현 공지를 확인할 시점입니다. 이 글은 실제 크롤러의 준수 동작을 시험하거나 법적 효력을 판단하지 않았습니다.

출처 확인일: 2026년 11월 2일. 발표일과 실제 적용일은 다릅니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
