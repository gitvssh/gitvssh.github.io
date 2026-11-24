---
title: "Grok 4.6가 GitHub Copilot에 합류했습니다: 모델 선택과 조직 설정 경계"
description: "Grok 4.6의 GitHub Copilot 합류 소식과 모델 선택기, 조직 권한, Chat과 인라인 제안의 설정 경계를 구분합니다."
slug: "grok-4-6-github-copilot-availability"
publishedAt: 2026-08-15
updatedAt: "2026-11-23"
track: news
subtype: announcement_analysis
tags:
  - AI 코딩 도구
  - AI 활용
  - AI 모델
audience: developer
readerOutcome: "Grok 4.6의 Copilot 제공 범위를 확인하고, 모델 선택기 노출·조직 권한·Chat과 인라인 제안의 설정 경계를 구분합니다."
contentFormats:
  - article
  - comic
  - diagram
freshnessStatus: current
reviewedAt: 2026-08-15
reviewAfter: 2026-09-15
cover: "./cover.webp"
coverAlt: "성인형 카솔이 여러 추상 AI 모델 코어 사이로 새로 합류하는 보랏빛 코어와 개발 작업 흐름을 안내하는 표지"
sourceUrl: "https://x.ai/news/grok-4-6-github-copilot"
featured: false
draft: false
---

GitHub Copilot 모델 선택기에서 새 모델을 고를 수 있다는 소식을 보고 에디터를 열었는데, 막상 목록에 모델이 보이지 않거나 Chat 설정을 바꾼 뒤에도 코드 자동완성 체감이 그대로인 경우가 있습니다. SpaceXAI가 2026년 8월 14일 `Grok 4.6`의 GitHub Copilot 합류를 발표했지만, 실제 화면에서 바로 쓰려면 구독 플랜과 조직 정책, 기능별 설정 경계를 먼저 살펴야 하거든요. 어디서 무엇이 갈리는지 핵심부터 짚어 볼까요?

글·해설: 다메카솔

## 핵심 내용

- **선택기 합류와 가용 조건**: VS Code, GitHub.com, Copilot cloud agent, CLI 등에서 `Grok 4.6`을 고를 수 있으나, 실제 노출 목록은 구독 플랜과 클라이언트별로 다릅니다.
- **조직 정책과 인라인 제안 분리**: Business·Enterprise 조직은 관리자가 모델을 먼저 허용해야 쓸 수 있으며, Chat 모델 변경은 입력 중 인라인 코드 제안에 영향을 주지 않습니다.
- **자사 API와 Copilot 과금 구분**: SpaceXAI API 시작 가격(입력 100만 토큰당 2달러, 출력 100만 토큰당 6달러)과 Copilot의 모델별 AI 크레딧 배수는 별도 체계입니다.

## 모델 선택기 합류와 조직 권한 경계

![추상 모델 코어가 모델 목록과 개인 선택 다이얼, 조직 정책 게이트를 차례로 통과하는 흐름](./page-01.webp)

SpaceXAI의 제품 설명에 따르면, 이틀 앞선 8월 12일 공개된 `Grok 4.6`은 장기 실행 에이전트와 시각·대화형 작업에 초점을 맞춘 모델입니다. 이어진 Copilot 합류 발표에서는 VS Code와 GitHub.com, Copilot cloud agent, CLI 환경에서 `Grok 4.6`을 선택할 수 있다고 소개했죠. 다만 이는 공급사가 제품 특징과 제공 시작을 알린 내용인 만큼, 실제 팀 도입에서는 GitHub 측 공식 지원 조건을 함께 확인해야 합니다.

현업에서 자주 부딪히는 혼선은 '모델 공개'와 '조직 내 사용 허용'이 따로 움직인다는 점입니다. 예를 들어 Copilot Business 계정을 쓰는 개발자가 VS Code를 업데이트했는데도 선택기에 모델이 뜨지 않는다면, 클라이언트 오류보다 조직 관리자 설정을 먼저 확인하는 편입니다. 일부 Business와 Enterprise 조직에서는 관리자가 Copilot 설정에서 모델을 켜야 하며, GitHub 공식 문서도 Business 사용자가 다른 Chat 모델로 전환하려면 조직 정책의 허용이 필요하다고 설명합니다.

개인 계정 역시 구독 플랜과 사용 위치(GitHub.com·IDE 등)에 따라 지원 모델 목록이 달라지고 이후 변경될 수도 있습니다. 선택기에 모델이 보이지 않을 때는 도구를 재설치하기 전에 계정 플랜, 조직 정책, 사용 중인 Copilot 표면의 지원 여부부터 점검하는 게 빠릅니다.

## Chat 모델 전환과 인라인 제안, 과금 체계

![카솔이 하나의 작업대에서 갈라지는 Copilot Chat과 인라인 제안 경로, 대화 경로에만 연결된 선택 레버를 확인하는 장면](./page-02.webp)

목록에서 모델을 고른 뒤에도 Copilot의 모든 기능이 한꺼번에 바뀌지는 않습니다. 가령 Copilot Chat 창에서 `Grok 4.6`으로 리팩터링 방향을 묻다가 에디터로 돌아와 코드를 입력할 때, 인라인 코드 제안(inline suggestion)까지 같은 모델이 처리할 거라 기대하기 쉽죠. 하지만 GitHub 공식 문서에 따르면 Chat에서 고른 모델은 인라인 제안 모델에 영향을 주지 않고 별도 경로로 동작합니다.

비용을 계산할 때도 두 체계를 분리해 봐야 합니다. SpaceXAI는 자체 API 시작 가격을 입력 100만 토큰당 2달러, 출력 100만 토큰당 6달러로 제시했지만, GitHub Copilot 안에서는 모델별 AI 크레딧 배수 체계가 적용되거든요. 팀 예산을 가늠할 때는 API 토큰 단가를 그대로 옮기기보다 GitHub의 크레딧 소모 기준을 확인해야 합니다.

| 구분 | 적용 범위 및 기준 | 확인 주체 | 실무 점검 포인트 |
| --- | --- | --- | --- |
| **모델 노출 범위** | 구독 플랜·클라이언트별 목록 변동 | GitHub 플랜·표면 | VS Code, GitHub.com, CLI 지원 확인 |
| **조직 전환 권한** | Business·Enterprise 내 사용 여부 | 조직 관리자 | Copilot 설정에서 모델 활성화 허용 |
| **Chat vs 인라인** | Chat 선택은 인라인 제안과 분리 | 개인 설정 | 기능별 적용 대상이 달라 기대 동작 구분 |
| **과금 체계** | 자사 API 단가 vs AI 크레딧 배수 | SpaceXAI / GitHub | API($2/$6)와 크레딧 배수 별도 산정 |

## 다메카솔의 해석

팀에 새 모델을 시험 도입할 때는 공급사 벤치마크 순위보다 세 가지 전제를 먼저 맞추는 편이 낫습니다.

1. **사용 표면 확정**: GitHub.com, VS Code, CLI 가운데 실제로 활용할 표면을 하나로 정합니다.
2. **플랜·정책 점검**: 개인 구독 플랜과 조직의 모델 전환 정책이 열려 있는지 확인합니다.
3. **평가 대상 분리**: 바꾸려는 기능이 Chat 응답인지, 인라인 코드 제안인지 명확히 나눕니다.

이 세 가지 경계를 맞춘 뒤에야 현재 코드베이스에서 작업 성공률, 수정 횟수, 도구 호출 안정성, 완료 시간을 같은 작업 세트로 공정하게 비교할 수 있습니다.

## 출처

- [SpaceXAI — Grok 4.6 in GitHub Copilot](https://x.ai/news/grok-4-6-github-copilot)
- [SpaceXAI — Introducing Grok 4.6](https://x.ai/news/grok-4-6)
- [GitHub Docs — Changing the AI model for GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model)
- [GitHub Docs — Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models)

발표 자료와 공식 문서를 바탕으로 정리했으며, 별도 실행 측정은 포함하지 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
