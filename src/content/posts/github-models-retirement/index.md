---
title: "GitHub Models 종료: 2026년 7월 30일 완전 셧다운 대비 가이드"
description: "GitHub의 무료 모델 추론 서비스인 GitHub Models가 2026년 7월 30일부로 전면 종료됩니다. Playground, Inference API, BYOK 엔드포인트 중단 일정과 Brownout 테스트 대응법을 정리합니다."
slug: "github-models-retirement"
publishedAt: 2026-07-11
updatedAt: 2026-07-23
track: news
subtype: fact_brief
tags:
  - "AI 모델"
  - "AI 활용"
cover: "./cover.webp"
coverAlt: "카솔이 GitHub Models의 2026년 7월 30일 종료 일정을 가리키는 표지"
sourceUrl: "https://github.blog/changelog/2026-07-01-github-models-is-being-fully-retired-on-july-30-2026/"
officialResources:
  - kind: official_announcement
    title: "GitHub Models is being fully retired on July 30, 2026"
    siteName: "GitHub Changelog"
    summary: "종료 대상, 전체 고객 적용 범위, 두 차례 brownout 일정을 확인하는 공식 1차 출처입니다."
    url: "https://github.blog/changelog/2026-07-01-github-models-is-being-fully-retired-on-july-30-2026/"
    publishedAt: 2026-07-01
    image: "./github-lockup-black-clearspace.png"
    imageAlt: "GitHub 공식 로고"
    imageRights:
      owner: "GitHub, Inc."
      basis: brand_policy
      evidenceUrl: "https://brand.github.com/foundations/logo"
      attribution: "GitHub and the GitHub logo are trademarks of GitHub, Inc."
      modifications: resize_only
featured: true
draft: false
---
글·해설: 다메카솔

개발자들에게 Llama, Mistral, GPT-4o 등 다양한 오픈/상용 AI 모델을 무료로 테스트할 수 있게 해주던 **GitHub Models가 2026년 7월 30일을 기점으로 완전히 종료(Retire)**됩니다.

단순히 웹 Playground UI만 닫히는 것이 아닙니다. 개발자들이 CI 파이프라인이나 토이 프로젝트 백엔드에서 호출하던 **Inference API 엔드포인트와 BYOK(Bring Your Own Key) 연결까지 전면 셧다운**됩니다.

이번 글에서는 서비스 종료 일정과 사전에 진행되는 Brownout(의도적 일시 중단) 일정, 그리고 대체 마이그레이션 방안을 정리합니다.

## 완전 종료 일정 및 대상 범위

- **최종 서비스 셧다운 일시**: **2026년 7월 30일**
- **종료 대상 리소스**:
  1. GitHub Models 웹 Playground
  2. 모델 카탈로그(Model Catalog) UI
  3. REST Inference API 엔드포인트 (`models.inference.ai.azure.com`)
  4. BYOK(Bring Your Own Key) 프록시 라우팅
- **적용 대상**: 기존 활성 사용자를 포함한 모든 개인 및 엔터프라이즈 계정

## 서비스 셧다운 전 'Brownout(의도적 장애)' 일정

![GitHub Models의 정상 작동, brownout, 완전 종료와 점검 행동을 시간 순서로 정리한 4패널 만화](./page-01-v3.webp)

GitHub는 완전 셧다운에 앞서 개발자들이 잔여 의존성을 사전에 파악할 수 있도록 **두 차례의 의도적 일시 중단(Brownout)**을 실시합니다:

- **1차 Brownout**: 2026년 7월 16일
- **2차 Brownout**: 2026년 7월 23일

이 시간대에는 GitHub Models API로 들어오는 모든 요청이 강제로 HTTP 5xx 에러를 반환합니다. 만약 운영 중인 봇이나 자동화 스크립트가 있다면 이 날짜 전까지 반드시 엔드포인트를 교체해야 합니다.

## 추천 마이그레이션 경로

1. **프로덕션 API 마이그레이션**:
   - Azure AI Foundry(구 Azure AI Studio) 또는 모델 공급사(OpenAI, Anthropic, Groq)의 직접 API 엔드포인트로 Base URL을 변경하세요.
2. **사내 GitHub 자동화 및 에이전트**:
   - GitHub Copilot Extensions나 Copilot Workspace 환경으로 전환을 검토할 수 있습니다.

## 다메카솔의 해석: 서드파티 무료 API 의존성 제거

토이 프로젝트나 사내 PoC 개발 시 편리하다고 무료 베타 API에 시스템을 하드코딩해 두면, 서비스 일몰 시점에 예기치 못한 장애를 겪게 됩니다.

백엔드 코드베이스에서 LLM 클라이언트를 호출할 때는 반드시 **환경 변수(`LLM_BASE_URL`, `LLM_API_KEY`) 기반으로 엔드포인트를 분리**하여, 특정 제공자가 일몰되더라도 설정 변경만으로 즉시 전환(Failover)할 수 있도록 설계해야 합니다.

## 출처

- [GitHub Changelog — GitHub Models is being fully retired on July 30, 2026](https://github.blog/changelog/2026-07-01-github-models-is-being-fully-retired-on-july-30-2026/)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
