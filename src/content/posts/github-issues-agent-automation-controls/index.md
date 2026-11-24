---
title: "GitHub Issues, AI 자동화에 승인·신뢰도·근거를 붙였다"
description: "GitHub Issues에 AI 에이전트 자동화 통제 기능이 도입되었습니다. 라벨링 및 담당자 지정 시 신뢰도 점수와 변경 근거(Rationale)를 남기는 메커니즘과, UI 승인 창 뒤에 숨겨진 실제 API 권한 경계를 분석합니다."
slug: "github-issues-agent-automation-controls"
publishedAt: 2026-07-24
updatedAt: "2026-11-23"
track: news
subtype: announcement_analysis
tags:
  - "AI 에이전트"
  - "AI 코딩 도구"
  - "운영 자동화 안전"
audience: developer
readerOutcome: "GitHub Issues의 AI 에이전트 승인 흐름과 신뢰도 모델을 이해하고, 단순 UI 승인 창과 실제 저장소/API 권한(RBAC) 통제를 분리하여 안전한 자동화 가드레일을 구축할 수 있다."
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

GitHub Issues에서 AI 에이전트가 버그를 분류하고 담당자를 배정해 주면 반복 업무는 줄지만, 진행 중인 장애 이슈를 엉뚱하게 닫거나 잘못된 팀에 넘길 위험도 따릅니다. 이런 오작동을 줄이기 위해 GitHub가 2026년 7월 23일 Issues 에이전트 자동화에 변경 근거, 신뢰도, 사람 승인 흐름을 붙이는 기능을 공개 프리뷰로 선보였거든요. 이번 글에서는 새 통제 모델의 작동 방식과 함께 승인 패널만으로 보안 경계를 대신할 수 없는 이유를 살펴보겠습니다.

글·해설: 다메카솔

## 신뢰도에 따라 자동 적용과 검토 대기로 갈린다

![이슈 변경 토큰이 신뢰도에 따라 자동 적용과 사람 검토 대기 경로로 나뉘는 만화](./page-01.webp)

새 시스템에서 에이전트는 지원하는 다섯 가지 이슈 속성(라벨, 필드, 이슈 유형, 이슈 닫기, 담당자 지정)을 바꿀 때마다 자체 신뢰도(`high`, `medium`, `low`)를 매깁니다. 저장소의 자동화 수준이 정한 임계값 이상이면 바로 반영하고, 그 아래 변경은 제안으로 멈춰 사람 검토를 기다리게 되죠. 기본 설정인 `Cautious` 수준에서는 `high` 신뢰도만 자동 적용하고 `medium`과 `low`는 검토 대기열로 보냅니다.

| 자동화 수준 | 동작 기준 | 사람 검토 대상 |
| --- | --- | --- |
| **Full control** | 모든 AI 변경을 보류 | 지원 이슈 변경 전체 |
| **Cautious** (기본값) | `high`만 자동 적용 | `medium`, `low` 변경 |
| **Balanced** | 모호한 판단만 보류 | 경계선의 불명확한 변경 |
| **Full automation** | 극히 불확실한 경우만 보류 | 불확실 표시가 붙은 예외 변경 |

여기서 신뢰도는 성공 확률을 보증하는 통계 수치가 아니라 자동화가 붙인 분류 기준입니다. 임계값이 낮춰 주는 것은 잘못된 자동 적용의 빈도일 뿐, 오판 가능성 자체를 없애 주지는 못하거든요.

## 왜 바꿨는지 추론 근거(Rationale)를 남긴다

![자동 적용과 검토 대기 행동이 모두 이유의 궤적을 남기고 사람이 제안을 살펴보는 만화](./page-02.webp)

단순히 "라벨이 `bug`로 변경됨"이라고만 남으면 동료는 에이전트의 판단 맥락을 알기 어렵습니다. 이제는 자동 적용된 변경과 승인 대기 제안 모두에 변경 이유(Rationale)가 기록됩니다. 예를 들어 이슈 본문에 스택트레이스 로그가 있을 때, 에이전트가 "본문 세 번째 단락의 에러 로그를 근거로 `backend-error` 라벨을 제안함"처럼 판단 근거를 타임라인에 남기는 셈이죠.

대기 중인 제안은 클릭 한 번으로 개별 수락·거절하거나 여러 건을 일괄 처리할 수 있습니다. 근거·신뢰도·승인 정보는 Copilot cloud agent뿐 아니라 GitHub Agentic Workflows와 REST·GraphQL API에서도 다룰 수 있습니다. 현재 공개 프리뷰는 지원 Copilot 요금제의 `private`·`internal` 저장소에서 제공되며, 관리자가 기능을 껐거나 Copilot cloud agent가 꺼진 환경에서는 지원 대상에서 빠집니다. 적용 범위 역시 지원 이슈 속성 변경으로 한정되므로, PR 생성이나 코드 푸시는 별도 통제가 필요합니다.

## UI 승인 패널은 보안 경계와 다른 층이다

![사람 검토 데스크 옆을 지나는 경로와 실제 권한을 제한하는 좁은 문을 카솔이 구분해 가리키는 만화](./page-03.webp)

실무에서 조심할 점은 승인 패널을 보안 샌드박스로 오해하는 것입니다. GitHub 공식 문서도 이 기능을 서버에서 강제하는 보안 경계가 아닌 **'워크플로 편의 기능(Workflow Convenience)'**으로 규정하고 있습니다.

가령 이슈 라벨링용 에이전트 토큰(PAT·GitHub App)에 `issues: write` 권한이 열려 있다고 가정해 볼까요? 웹 UI에서 `Full control`을 켜 두었더라도, 오작동하거나 탈취된 스크립트는 REST·GraphQL API를 직접 호출해 승인 단계를 건너뛰고 이슈를 바꿀 수 있습니다. 결국 실제 행동 범위는 UI 버튼이 아니라 최소 권한 토큰과 허용 도구 목록(Tool Allowlist)이 결정합니다.

## 다메카솔의 해석: 검토 창보다 권한 표를 먼저 본다

이번 발표에서 가장 무거운 대목은 승인 흐름을 우회할 수 있는 API 경로가 존재한다는 공식 경고입니다. 새 기능은 AI 판단을 투명하게 검토하는 데 유용하지만, `Full control` 설정만으로 과도한 토큰 권한까지 안전해지지는 않거든요.

실무 가드레일은 네 계층으로 나누어 점검하는 편이 깔끔합니다.

- **관측·승인 계층 (UI)**: 낮은 신뢰도 변경을 검토 대기열로 보내고 추론 근거 기록을 확인합니다.
- **토큰 권한 계층 (API)**: 필요한 최소 스코프만 부여하고, 코드 푸시(`contents: write`) 권한은 이슈 토큰과 분리합니다.
- **영역별 격리 계층 (Domain)**: 이슈 분류 에이전트와 PR 머지 에이전트의 허용 도구와 실행 환경을 분리합니다.
- **감사 추적 계층 (Audit)**: 사람 승인 변경과 API 직접 변경을 구분해 사후 추적할 수 있게 로그를 남깁니다.

승인 화면은 판단을 돕는 관찰 층이고, 토큰·도구 제한은 사고 반경을 줄이는 보안 층에 해당합니다. 자동화 수준을 고르기 전에 에이전트가 승인 창 바깥에서 호출할 수 있는 권한부터 닫아 두는 순서가 안전합니다.

## 함께 읽을 AI 시스템 글

- [AI 코딩 에이전트 작업 공간 격리(Orca)와 권한 제어](/posts/orca-ai-coding-agent-workspaces/)
- [Copilot 보안 API 실증 연구와 검증 가드레일](/posts/copilot-security-api-study/)

## 출처

- [GitHub Changelog — Agent automation controls in GitHub Issues in public preview](https://github.blog/changelog/2026-07-23-agent-automation-controls-in-github-issues-in-public-preview/)
- [GitHub Docs — About rationale, confidence, and approvals for issues](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automation-rationale-and-approvals)
- [GitHub Docs — About Copilot automations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations)

발표 자료와 GitHub 공식 문서를 바탕으로 정리했으며, 별도 실행 측정은 포함하지 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
