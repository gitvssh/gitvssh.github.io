---
title: "GitHub Issues, AI 자동화에 승인·신뢰도·근거를 붙였다"
description: "GitHub Issues 에이전트 자동화의 변경 근거, 신뢰도, 승인 흐름과 실제 보안 경계인 저장소·에이전트 권한을 구분해 설명합니다."
slug: "github-issues-agent-automation-controls"
publishedAt: 2026-07-24
updatedAt: 2026-07-24
track: news
subtype: announcement_analysis
tags:
  - GitHub Copilot
  - AI 에이전트
  - 이슈 자동화
  - AI 거버넌스
audience: developer
readerOutcome: "GitHub Issues 자동화의 근거·신뢰도·승인 기능이 하는 일과 적용 범위를 설명하고, 승인 UI와 실제 권한 통제를 구분할 수 있습니다."
contentFormats:
  - article
  - comic
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-24
reviewAfter: 2026-10-24
cover: "./cover.webp"
coverAlt: "카솔이 GitHub Issues 에이전트 자동화의 검토 경로와 실제 권한 문을 구분하는 표지"
sourceUrl: "https://github.blog/changelog/2026-07-23-agent-automation-controls-in-github-issues-in-public-preview/"
featured: true
draft: false
---

GitHub는 2026년 7월 23일 Issues의 에이전트 자동화에 **변경 근거, 신뢰도, 승인 흐름**을 추가했습니다. 라벨·필드·이슈 유형·닫기·담당자 변경을 바로 적용할지 사람에게 제안할지 나누고, 무엇을 왜 바꿨는지도 남기는 공개 프리뷰입니다. 다만 승인 패널은 보안 장치가 아닙니다. 에이전트가 실제로 할 수 있는 일은 저장소·에이전트 권한과 허용된 도구가 정합니다.

글·해설: 다메카솔

## 신뢰도가 낮으면 변경을 제안으로 멈춥니다

![이슈 변경 토큰이 신뢰도에 따라 자동 적용과 사람 검토 대기 경로로 나뉘는 만화](./page-01.webp)

자동화는 지원되는 각 이슈 변경에 `high`, `medium`, `low` 신뢰도를 매깁니다. 저장소의 자동화 수준이 임계값을 정하고, 그보다 낮은 변경은 바로 적용하지 않고 제안으로 보류합니다. 기본 `Cautious` 수준에서는 `high`만 자동 적용하고 나머지는 사람이 검토합니다.

관리자는 네 수준 가운데 하나를 고를 수 있습니다. `Full control`은 모든 변경을 검토 대기로 보내고, `Cautious`는 높은 신뢰도만 자동 적용합니다. `Balanced`는 모호한 변경을 보류하며, `Full automation`은 불확실하다고 표시된 변경만 멈춥니다.

현재 이 흐름이 다루는 이슈 속성은 라벨, 필드, 이슈 유형, 이슈 닫기, 담당자 지정입니다. 신뢰도는 성공 확률을 보증하는 객관적 점수가 아니라 자동화가 해당 행동에 붙인 분류입니다. 어떤 임계값을 쓰든 잘못된 자동 적용이 불가능해지는 것은 아닙니다.

## 적용된 변경도 이유를 따라갈 수 있습니다

![자동 적용과 검토 대기 행동이 모두 이유의 궤적을 남기고 사람이 제안을 살펴보는 만화](./page-02.webp)

GitHub는 지원되는 행동마다 변경 이유를 기록합니다. 자동 적용된 변경도, 제안으로 남았다가 승인된 변경도 이슈에서 근거를 확인할 수 있습니다. 검토 대기 제안은 하나씩 수락·거절하거나 여러 건을 한꺼번에 처리할 수 있습니다.

근거·신뢰도·승인은 Copilot cloud agent 자동화에만 묶인 UI가 아닙니다. GitHub Agentic Workflows와 REST·GraphQL API도 같은 정보를 다룹니다. 에이전트가 어디서 실행됐는지보다 어떤 이슈 변경 의도를 남겼는지가 공통 계약에 가깝습니다.

범위는 좁게 읽어야 합니다. 이 기능은 자동화가 수행하는 지원 이슈 속성 변경에만 적용됩니다. 풀 리퀘스트를 열거나 코드를 푸시하는 다른 행동까지 같은 승인 흐름이 보호하지는 않습니다.

## 승인 패널과 권한 경계는 다른 층입니다

![사람 검토 데스크 옆을 지나는 경로와 실제 권한을 제한하는 좁은 문을 카솔이 구분해 가리키는 만화](./page-03.webp)

GitHub 문서는 승인 기능을 “워크플로 편의 기능”으로 설명합니다. 서버에서 강제하는 보안 경계가 아니기 때문입니다. 이슈를 바꿀 권한이 있는 에이전트는 REST나 GraphQL API로 제안 단계를 거치지 않고 변경을 바로 적용할 수도 있습니다.

실제 통제는 더 아래에 있습니다. 자동화에 필요한 도구만 허용하고, 저장소와 에이전트 권한으로 행동 범위를 좁혀야 합니다. 검토 패널은 사람이 판단하기 쉽게 만드는 관찰·승인 층이고, 권한은 애초에 할 수 있는 일을 제한하는 보안 층입니다.

이번 기능은 공개 프리뷰라 바뀔 수 있습니다. GitHub 문서 기준으로 지원 Copilot 요금제의 private 및 internal 저장소에서 제공되며, 관리자가 기능을 비활성화했거나 Copilot cloud agent가 켜지지 않은 환경에서는 사용할 수 없습니다.

## 다메카솔의 해석: 자동화 수준보다 먼저 권한 표를 봅니다

새 검토 기능은 “에이전트가 왜 이 라벨을 붙였나”를 추적하고 애매한 변경을 사람에게 돌려보내는 데 유용합니다. 그러나 `Full control`을 선택했다고 해서 과도한 권한이 안전해지는 것은 아닙니다. 승인 흐름을 우회할 수 있는 API 경로가 존재한다는 공식 경고가 그 차이를 보여 줍니다.

운영 점검은 두 층으로 나누면 선명합니다.

- 검토 층: 어떤 변경에 근거와 신뢰도가 남고, 무엇이 제안으로 멈추는가?
- 권한 층: 에이전트가 어떤 저장소·도구·행동에 접근할 수 있는가?
- 범위 층: 이슈 속성 밖의 PR 생성·코드 푸시는 어떤 별도 통제를 거치는가?
- 기록 층: 직접 적용과 승인 적용을 나중에 구분하고 감사할 수 있는가?

GitHub Issues의 새 기능은 사람을 자동화 흐름에 끼워 넣는 방법을 정교하게 만들었습니다. 다음 단계는 승인 화면을 믿는 것이 아니라, 에이전트가 승인 화면 바깥에서 할 수 있는 일까지 권한으로 닫는 것입니다.

## 출처

- [GitHub Changelog — Agent automation controls in GitHub Issues in public preview](https://github.blog/changelog/2026-07-23-agent-automation-controls-in-github-issues-in-public-preview/)
- [GitHub Docs — About rationale, confidence, and approvals for issues](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automation-rationale-and-approvals)
- [GitHub Docs — About Copilot automations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations)

이 글의 만화 이미지는 AI로 생성했습니다.
