---
title: "Grok 4.6가 GitHub Copilot에 합류했습니다: 모델 선택과 조직 설정 경계"
description: "Grok 4.6의 GitHub Copilot 합류 소식과 모델 선택기, 조직 권한, Chat과 인라인 제안의 설정 경계를 구분합니다."
slug: "grok-4-6-github-copilot-availability"
publishedAt: 2026-08-15
updatedAt: 2026-08-15
track: news
subtype: announcement_analysis
tags:
  - GitHub Copilot
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

SpaceXAI는 2026년 8월 14일 Grok 4.6이 GitHub Copilot에서 제공된다고 발표했습니다. 모델 선택기에서 바로 고르는 흐름을 소개했지만, 실제 목록과 권한은 구독 플랜·사용하는 Copilot 표면·조직 정책에 따라 달라질 수 있습니다.

글·해설: 다메카솔

## 발표에서 확정된 변화

SpaceXAI가 확인한 변화는 Grok 4.6의 Copilot 모델 선택기 합류입니다. 공식 발표는 VS Code와 GitHub에서 일하는 개발자가 모델 선택기를 열고 `Grok 4.6`을 고를 수 있다고 설명합니다. Copilot cloud agent와 CLI, VS Code를 제품 범위의 예로 들었지만, 모든 계정과 클라이언트에 같은 목록이 보인다고 단정하지는 않았습니다.

Grok 4.6 자체는 이틀 앞선 8월 12일 공개됐습니다. SpaceXAI는 긴 에이전트 작업과 시각·대화형 결과물에 초점을 맞춘 모델이라고 소개했습니다. 이 설명과 벤치마크는 공급사 자료이며, Copilot 환경에서 모든 코드베이스와 작업에 같은 이점이 난다는 독립 검증은 아닙니다.

## 모델 목록과 사용 권한은 한 단계가 아닙니다

![추상 모델 코어가 모델 목록과 개인 선택 다이얼, 조직 정책 게이트를 차례로 통과하는 흐름](./page-01.webp)

모델 선택기에 이름이 보이는 것과 조직 전체가 쓸 수 있는 것은 같은 조건이 아닙니다. SpaceXAI는 일부 Business와 Enterprise 조직에서 관리자가 Copilot 설정으로 모델을 먼저 켜야 할 수 있다고 밝혔습니다. GitHub 공식 문서도 Business 구독 사용자가 다른 Chat 모델로 전환하려면 조직이 그 권한을 허용해야 한다고 설명합니다.

개인 계정에서도 플랜과 클라이언트를 먼저 확인해야 합니다. GitHub는 지원 모델 목록이 Copilot 플랜과 GitHub.com·IDE 같은 사용 위치에 따라 달라지고 이후 바뀔 수 있다고 안내합니다. 발표를 봤는데 선택기에 모델이 없다면 재설치부터 하기보다 계정 플랜, 조직 정책, 현재 클라이언트의 지원 여부를 차례로 보는 편이 빠릅니다.

## Chat 모델과 인라인 제안은 같은 스위치가 아닙니다

![카솔이 하나의 작업대에서 갈라지는 Copilot Chat과 인라인 제안 경로, 대화 경로에만 연결된 선택 레버를 확인하는 장면](./page-02.webp)

Copilot Chat에서 모델을 바꿔도 인라인 제안 모델까지 함께 바뀌지는 않습니다. GitHub 공식 문서는 Chat의 모델 선택이 입력 중에 나타나는 코드 제안 모델에 영향을 주지 않는다고 명시합니다. 따라서 “Grok 4.6으로 바꿨다”는 말은 어느 Copilot 기능을 가리키는지 함께 적어야 정확합니다.

모델 선택 절차는 표면별로 조금 다르지만 공통 흐름은 단순합니다. GitHub.com이나 VS Code의 Copilot Chat에서 현재 모델 드롭다운을 열고 사용 가능한 모델을 고릅니다. Business 계정이라면 이 단계 앞에 조직 정책 승인이 붙을 수 있습니다.

## API 가격을 Copilot 비용으로 옮겨 읽지 마세요

SpaceXAI는 자사 API에서 Grok 4.6 가격을 입력 100만 토큰당 2달러, 출력 100만 토큰당 6달러부터라고 제시했습니다. 이 값은 SpaceXAI API 가격입니다. GitHub Copilot은 모델별 AI 크레딧 배수를 별도 체계로 안내하므로 두 가격표를 같은 비용으로 계산하면 안 됩니다.

성능 비교도 같은 원칙을 따릅니다. 공급사 벤치마크보다 현재 코드베이스의 성공률, 수정 횟수, 도구 호출 안정성, 완료 시간을 같은 작업 세트에서 비교해야 합니다. 특히 조직 계정에서는 모델을 켤 수 있는지와 실제 작업에 맞는지를 별도 질문으로 남겨야 합니다.

## 다메카솔의 해석

저라면 벤치마크 순위보다 먼저 세 가지를 확인하겠습니다. 첫째, GitHub.com·VS Code·CLI 가운데 어느 표면에서 쓸 것인지 정합니다. 둘째, 개인 플랜과 조직의 모델 전환 정책을 확인합니다. 셋째, 바꾸려는 것이 Chat 응답인지 인라인 코드 제안인지 구분합니다.

이 세 조건이 맞아야 모델 비교가 시작됩니다. 선택기가 보이는지만 확인하고 도입을 끝내면 조직 구성원마다 다른 경험을 보고할 수 있습니다. 반대로 권한과 기능 경계를 먼저 맞추면 Grok 4.6의 장기 작업 강점이라는 공급사 주장을 실제 팀 작업으로 검증할 수 있습니다.

## 출처

- [SpaceXAI — Grok 4.6 in GitHub Copilot](https://x.ai/news/grok-4-6-github-copilot)
- [SpaceXAI — Introducing Grok 4.6](https://x.ai/news/grok-4-6)
- [GitHub Docs — Changing the AI model for GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model)
- [GitHub Docs — Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
