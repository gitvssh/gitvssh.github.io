---
title: "Claude Opus 5, GitHub Copilot에서 누가 쓸 수 있나"
description: "Claude Opus 5의 GitHub Copilot 지원 요금제, 관리자 정책, 점진 배포, 토큰 비용과 보안 작업 경계를 정리합니다."
slug: claude-opus-5-github-copilot
publishedAt: 2026-07-25
updatedAt: 2026-07-25
track: news
subtype: release_announcement
tags:
  - "AI 코딩 도구"
  - "AI 모델"
  - "AI 활용"
audience: developer
readerOutcome: "Claude Opus 5를 GitHub Copilot에서 선택할 수 있는 조건과 사용 전 확인할 비용·보호 장치를 판단합니다."
contentFormats:
  - article
  - comic
  - checklist
  - table
freshnessStatus: current
reviewedAt: 2026-07-25
reviewAfter: 2026-08-25
cover: "./cover.webp"
coverAlt: "카솔이 Claude Opus 5의 GitHub Copilot 이용 조건을 차례로 확인하는 표지"
sourceUrl: "https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot/"
featured: true
draft: false
---

GitHub는 2026년 7월 24일 **Claude Opus 5를 GitHub Copilot에 추가했습니다.** 직접 선택할 수 있다고 발표한 대상은 Copilot Pro+, Max, Business, Enterprise 사용자입니다. Business와 Enterprise에서는 관리자가 모델 정책을 켜야 하며, 배포도 점진적이라 조건을 충족해도 모델 선택기에 바로 보이지 않을 수 있습니다.

글·해설: 다메카솔

## 먼저 요금제와 관리자 정책을 확인합니다

![여러 Copilot 이용 토큰이 지원 요금제 문과 조직 관리자 활성화 문을 차례로 통과하는 만화](./page-01.webp)

이번 발표가 직접 이름을 올린 요금제는 `Pro+`, `Max`, `Business`, `Enterprise`입니다. 일반 `Pro`, `Free`, `Student`는 이 발표의 직접 선택 대상 목록에 없습니다. Free와 Student는 공식 모델 문서 기준으로 자동 모델 선택을 통해서만 모델에 접근하므로, “Copilot에서 제공”과 “내 모델 선택기에 나타남”을 같은 뜻으로 읽으면 안 됩니다.

조직 사용자는 문을 하나 더 거칩니다. Business와 Enterprise 관리자가 Copilot 설정에서 Claude Opus 5 정책을 활성화해야 구성원이 선택할 수 있습니다. 개인 요금제 조건을 충족했는지, 조직 정책이 열려 있는지를 먼저 나눠 확인해야 합니다.

## 지원 표면은 넓고 배포는 점진적입니다

![중앙 모델 코어에서 IDE와 CLI, 에이전트, 웹과 모바일을 상징하는 도구로 빛이 점진적으로 퍼지는 만화](./page-02.webp)

GitHub는 열 곳의 모델 선택기를 발표에 적었습니다. Visual Studio Code, Visual Studio, Copilot CLI, Copilot cloud agent, GitHub Copilot 앱, github.com, GitHub Mobile, JetBrains, Xcode, Eclipse입니다. 한 IDE에만 묶인 추가가 아니라 로컬 도구, 웹, 모바일, 클라우드 에이전트까지 범위가 넓습니다.

그러나 모든 표면에 동시에 나타난다는 뜻은 아닙니다. GitHub는 배포가 점진적이라고 밝혔습니다. 지원 요금제와 정책을 확인했는데도 보이지 않으면, 계정 문제로 단정하기 전에 해당 클라이언트를 최신 상태로 만들고 배포가 도달했는지 다시 확인할 필요가 있습니다.

모델 가용성은 고정 계약도 아닙니다. GitHub의 지원 모델 문서는 요금제, 사용하는 표면, 모델 정책에 따라 선택지가 달라지고 시간이 지나며 모델이 교체되거나 업데이트될 수 있다고 안내합니다.

## 강점 설명과 사용 경계는 따로 읽습니다

![복잡한 장기 작업 기어와 사용량 토큰 저울, 사이버 보호 방패를 카솔이 따로 점검하는 만화](./page-03.webp)

GitHub는 Claude Opus 5를 복잡하고 오래 실행되는 코딩 작업을 위한 모델로 소개했습니다. 회사의 초기 테스트에서는 자율 코드 변경, 회귀 검증, 여러 도구를 조정하는 작업에서 강했다고 설명합니다. 다만 발표에는 비교 수치나 평가 방법이 없습니다. 이 대목은 독립 벤치마크 결과가 아니라 GitHub의 제품 평가로 읽어야 합니다.

보안 작업에서는 동작 경계가 달라질 수 있습니다. GitHub는 고위험 사이버 콘텐츠를 위한 강화된 보호 장치 때문에 일부 사이버 또는 보안 인접 요청이 차단될 수 있다고 알렸습니다. 차단이 곧 작업 자체가 악성이라는 판정은 아니며, GitHub는 선의의 맥락을 더 분명히 쓰거나 다른 지원 모델을 선택하라고 안내합니다.

## 비용은 토큰 사용량으로 계산됩니다

GitHub Copilot은 입력, 출력, 캐시 입력, 캐시 쓰기 토큰을 모델별 단가로 계산한 뒤 AI 크레딧으로 환산합니다. 2026년 7월 25일 공식 가격표에서 Claude Opus 5 단가는 다음과 같습니다.

| 항목 | 100만 토큰당 가격 |
| --- | ---: |
| 입력 | $5.00 |
| 캐시 입력 | $0.50 |
| 캐시 쓰기 | $6.25 |
| 출력 | $25.00 |

포함된 AI 크레딧을 넘기면 추가 사용량이 이 단가를 바탕으로 청구됩니다. 긴 코드베이스와 장시간 작업은 입력과 출력만이 아니라 캐시 쓰기까지 함께 소비할 수 있으므로, 모델 이름보다 실제 세션의 토큰 구성과 예산을 봐야 합니다. 가격은 바뀔 수 있어 사용 전 [GitHub의 현재 가격표](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)를 다시 확인하는 편이 안전합니다.

## 다메카솔의 사용 전 체크

저라면 이 가운데 비용부터 확인하겠습니다. 요금제와 정책은 막히면 바로 알 수 있지만, 캐시 쓰기까지 얹히는 장기 작업의 비용은 청구서가 와야 보이기 때문입니다. 새 모델을 선택하기 전에는 다섯 질문이면 충분합니다.

- 내 요금제가 Pro+, Max, Business, Enterprise 가운데 하나인가?
- 조직 계정이라면 관리자가 Claude Opus 5 정책을 켰는가?
- 내가 쓰는 IDE·CLI·웹 표면까지 점진 배포가 도달했는가?
- 장기 작업에서 예상되는 입력·출력·캐시 비용을 감당할 수 있는가?
- 보안 인접 작업에서 강화된 보호 장치가 흐름을 막을 수 있는가?

Claude Opus 5가 Copilot에 들어왔다는 사실은 출발점입니다. 실제 선택 가능 여부와 운영 적합성은 계정 조건, 조직 정책, 배포 상태, 비용, 보호 장치를 차례로 확인해야 판단할 수 있습니다. 다른 모델의 공개 조건과 비용을 비교하려면 [GPT-5.6 출시 정리](/posts/gpt-5-6-launch/)도 함께 볼 수 있습니다.

## 출처

- [GitHub Changelog — Claude Opus 5 is now available in GitHub Copilot](https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot/)
- [GitHub Docs — Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [GitHub Docs — Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
