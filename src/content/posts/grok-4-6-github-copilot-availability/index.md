---
title: "Grok 4.6가 GitHub Copilot에 합류했습니다: 모델 선택과 조직 설정 경계"
description: "Grok 4.6의 GitHub Copilot 합류 소식과 모델 선택기, 조직 권한, Chat과 인라인 제안의 설정 경계를 구분합니다."
slug: "grok-4-6-github-copilot-availability"
publishedAt: 2026-08-15
updatedAt: "2026-10-18"
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

SpaceXAI는 2026년 8월 14일 `Grok 4.6`이 GitHub Copilot에서 제공된다고 발표했습니다. 모델 선택기에서 바로 고르는 흐름을 소개했지만, 실제로 선택기에 나타나는 모델 목록과 사용 권한은 구독 플랜·사용하는 Copilot 표면·조직 정책에 따라 달라집니다.

글·해설: 다메카솔


## 핵심 내용

- **Copilot 모델 선택기 합류**: VS Code, GitHub.com, Copilot cloud agent, CLI 등에서 `Grok 4.6`을 선택할 수 있게 됐으나 계정 플랜과 클라이언트별로 가용 목록은 다를 수 있습니다.
- **조직 정책과 인라인 제안 분리**: Business·Enterprise 조직에서는 관리자가 모델 전환 권한을 먼저 허용해야 할 수 있으며, Copilot Chat 모델 변경은 입력 중 인라인 코드 제안 모델에 영향을 주지 않습니다.
- **비용 체계 구분**: SpaceXAI 자사 API 가격(입력 100만 토큰당 2달러, 출력 100만 토큰당 6달러부터)과 GitHub Copilot의 모델별 AI 크레딧 배수는 별도 체계입니다.

## 발표에서 확정된 변화와 권한 경계

![추상 모델 코어가 모델 목록과 개인 선택 다이얼, 조직 정책 게이트를 차례로 통과하는 흐름](./page-01.webp)

SpaceXAI가 확인한 변화는 이틀 앞선 8월 12일 공개된 `Grok 4.6`(긴 에이전트 작업과 시각·대화형 결과물에 초점을 맞춘 모델)이 GitHub Copilot 모델 선택기에 합류했다는 점입니다. 공식 발표는 VS Code, GitHub.com, Copilot cloud agent, CLI를 예로 들었지만, 모델 선택기에 이름이 보이는 것과 조직 전체가 즉시 쓸 수 있는 것은 같은 조건이 아닙니다.

일부 Business와 Enterprise 조직에서는 관리자가 Copilot 설정에서 모델을 먼저 켜야 하며, GitHub 공식 문서 역시 Business 구독 사용자가 다른 Chat 모델로 전환하려면 조직 정책이 이를 허용해야 한다고 설명합니다. 개인 계정에서도 지원 모델 목록은 구독 플랜과 사용 위치(GitHub.com·IDE 등)에 따라 달라지므로, 선택기에 모델이 보이지 않는다면 재설치에 앞서 계정 플랜과 조직 정책, 클라이언트 지원 여부부터 확인하는 편이 빠릅니다.

## Chat 모델과 인라인 제안은 같은 스위치가 아닙니다

![카솔이 하나의 작업대에서 갈라지는 Copilot Chat과 인라인 제안 경로, 대화 경로에만 연결된 선택 레버를 확인하는 장면](./page-02.webp)

Copilot Chat에서 모델을 바꿔도 코드를 입력할 때 나타나는 인라인 제안(inline suggestion) 모델까지 함께 바뀌지는 않습니다. GitHub 공식 문서는 Chat의 모델 선택이 인라인 코드 제안 모델에 영향을 주지 않는다고 명시하고 있으므로, “Grok 4.6으로 바꿨다”고 말할 때는 어느 Copilot 기능을 가리키는지 구분해야 합니다.

또한 SpaceXAI가 제시한 자사 API 가격(입력 100만 토큰당 2달러, 출력 100만 토큰당 6달러부터)을 GitHub Copilot 비용으로 그대로 대입해서도 안 됩니다. GitHub Copilot은 모델별 AI 크레딧 배수를 별도 체계로 운영하기 때문입니다.

## 다메카솔의 해석

팀에 새 모델을 도입할 때는 공급사 벤치마크 순위보다 세 가지 전제를 먼저 확인해야 합니다.

1. GitHub.com·VS Code·CLI 가운데 어느 표면에서 사용할 것인가?
2. 개인 플랜과 조직의 모델 전환 정책이 열려 있는가?
3. 바꾸려는 대상이 Chat 응답인가, 인라인 코드 제안인가?

이 세 가지 경계를 먼저 맞춘 뒤에야 현재 코드베이스의 성공률, 수정 횟수, 도구 호출 안정성, 완료 시간을 같은 작업 세트에서 공정하게 비교할 수 있습니다.

## 출처

- [SpaceXAI — Grok 4.6 in GitHub Copilot](https://x.ai/news/grok-4-6-github-copilot)
- [SpaceXAI — Introducing Grok 4.6](https://x.ai/news/grok-4-6)
- [GitHub Docs — Changing the AI model for GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model)
- [GitHub Docs — Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
