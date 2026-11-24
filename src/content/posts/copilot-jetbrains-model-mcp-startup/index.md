---
title: "JetBrains Copilot 업데이트: 기본 모델과 도구 시작을 따로 고릅니다"
description: "JetBrains용 Copilot의 새 기본 모델 설정과 MCP 자동 시작 제어를 살펴봅니다. 사용자의 모델 선택은 어떻게 유지되는지, 업데이트 전 확인할 IDE 버전은 무엇인지 정리합니다."
slug: "copilot-jetbrains-model-mcp-startup"
publishedAt: "2026-10-11"
updatedAt: "2026-11-23"
track: "news"
subtype: "release_announcement"
tags: ["AI 코딩 도구", "AI 에이전트"]
audience: "developer"
readerOutcome: "기업이 정한 기본 모델과 사용자의 모델 선택, MCP 서버 자동 시작 설정의 역할을 구분하고 업데이트 조건을 확인한다."
contentFormats: ["article", "comic"]
freshnessStatus: "current"
reviewedAt: "2026-10-11"
reviewAfter: "2026-10-18"
cover: "./cover.webp"
coverAlt: "새 대화의 모델과 도구 시작을 각각 살펴보는 카솔"
sourceUrl: "https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/"
featured: false
draft: false
---

팀에서 쓰는 코딩 에이전트의 기본 모델을 하나로 맞추고 싶을 때도 있지만, 작업 성격에 따라 다른 모델을 고르는 개발자의 유연성까지 막아야 할지 고민될 때가 있습니다. GitHub이 **2026년 10월 10일** 발표한 JetBrains용 Copilot 업데이트는 새 대화의 출발점만 기업이 정하고 사용자의 명시적 선택은 그대로 존중하는 방식을 택했죠. 여기에 외부 도구를 연결하는 MCP 서버의 자동 시작 제어와 IDE 지원 버전 기준 변경까지 함께 포함되어 있어, 업데이트 전에 팀 설정과 개발 환경을 함께 점검할 필요가 있습니다([공식 발표](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/)).

글·해설: 다메카솔

## 기본 모델을 정해도 대화별 선택은 남습니다

![초록 기어로 출발한 장치에 사용자가 주황 기어를 골라 끼우는 기본 모델과 명시적 선택의 비유](./page-01.webp)

관리자가 지정하는 기본 모델은 말 그대로 **새로 여는 대화의 출발점**입니다. 사용 가능한 Copilot 에이전트 모델 가운데 하나를 팀 기본값으로 잡아 두더라도, 개발자가 대화창의 모델 선택기에서 다른 모델을 직접 고르면 그 선택이 그대로 유지되거든요. [기업 관리 설정 문서](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#model) 역시 `model` 항목을 새 대화의 기본값으로 설명하면서 대화별 변경을 허용하고 있습니다.

예를 들어 평소 간단한 보일러플레이트 코드나 단위 테스트 초안은 팀이 정한 기본 모델로 바로 시작하고, 구조가 복잡한 레거시 모듈을 다룰 때만 개발자가 목록에서 다른 에이전트 모델을 골라 대화를 이어 갈 수 있습니다. 조직의 기본 기준을 세우면서도 작업별 판단 여지를 남기는 셈이죠.

## 도구 연결에는 시작 시점이라는 설정 축이 따로 있습니다

![자동 시작을 끈 뒤 다음 시작에 모터가 켜지지 않는 모습을 설명하는 카솔, MCP 시작 설정의 개념 비유](./page-02.webp)

모델 선택과 별개로, 외부 도구 연결을 언제 켤지도 따로 다룰 수 있게 됐습니다. [MCP 시작 설정 발표](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/)에 따르면 새 MCP 설정은 JetBrains 환경의 Copilot과 Claude에서 MCP 서버가 자동으로 시작되지 않도록 끌 수 있게 해 줍니다.

[GitHub의 MCP 안내](https://docs.github.com/en/copilot/concepts/context/mcp)에서 설명하듯 MCP(Model Context Protocol)는 AI 앱을 외부 도구·서비스·데이터에 연결하는 표준으로, 서버가 기능을 제공하고 AI 앱이 그 연결을 사용합니다. 가령 이슈 트래커나 사내 문서 저장소용 MCP 서버를 여러 개 연동해 둔 개발자라면, 단순 코드 편집만 할 때 모든 서버가 함께 켜지지 않도록 자동 시작을 꺼 두고 필요한 시점에만 기동 여부를 관리할 수 있습니다. 다만 이 옵션은 기동 시점의 자동 실행을 제어할 뿐, 서버의 읽기·쓰기 권한이나 격리 수준 자체를 바꾸는 보안 경계와는 역할이 다릅니다.

## 업데이트 전 확인할 IDE 버전과 기능 변경

이번 업데이트를 적용하기 전에 팀과 개인 개발자가 함께 점검할 요구 사항과 주요 변경 사항을 항목별로 정리했습니다([지원 조건과 변경 목록](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/)).

| 구분 | 확인된 변경 내용 | 실무 점검 포인트 |
| --- | --- | --- |
| **IDE 지원 버전** | JetBrains IDE 2025.2 이상 필요 (2025.1 지원 종료) | 구버전 IDE를 쓰는 팀원의 업그레이드 일정 확인 |
| **기업 기본 모델** | 사용 가능한 에이전트 모델 중 새 대화 기본값 지정 | 모델 선택기의 명시적 사용자 선택 유지 여부 확인 |
| **MCP 자동 시작** | JetBrains의 Copilot·Claude에서 MCP 서버 자동 시작 해제 가능 | 외부 도구 서버의 기동 시점과 작업 환경 분리 관리 |
| **진단 메뉴 `Fix`** | 인라인 채팅을 열며 가능하면 agent mode, 불가 시 ask mode 사용 | 오류 수정 요청 시 전환되는 채팅 모드 동작 파악 |
| **안정성 개선** | 세션·설정·worktree 관련 안정성 개선 포함 | 기존 worktree 및 세션 작업 흐름의 체감 점검 |

진단 메뉴에서 `Fix`를 실행하면 인라인 채팅이 열리면서 agent mode를 쓸 수 있는 환경에서는 그 모드로 동작하고, 그렇지 않은 조건에서는 ask mode로 전환됩니다. GitHub은 이번 릴리스에 세션·설정·worktree 관련 안정성 개선도 함께 반영했다고 설명하고 있어, 여러 브랜치를 넘나들며 작업하는 환경이라면 업데이트 뒤 실제 흐름에서 변화를 확인해 둘 필요가 있습니다.

## 다메카솔의 해석: 설정 단위를 나누어 점검하세요

업데이트를 적용할 때는 **팀 시작 모델, 사용자의 대화별 모델 선택, MCP 서버의 기동 여부**를 한 덩어리로 묶지 말고 각각 나누어 확인하는 것이 좋습니다. 앞서 살펴본 [Copilot 코드 리뷰의 요청별 설정](/posts/github-copilot-review-api-balanced/)에서도 설정이 적용되는 단위를 구분하는 일이 중요했듯, 모델 기본값이 의도대로 적용되더라도 외부 도구 서버가 예상과 다르게 올라오면 실제 개발 환경의 동작이 달라질 수 있거든요.

도입 전후에 아래 세 가지 순서대로 점검해 두면 설정 혼선을 줄이는 데 도움이 됩니다.

- **IDE 버전 먼저 맞추기**: JetBrains IDE 2025.1 지원이 종료됐으므로 2025.2 이상으로 올라갔는지부터 확인합니다.
- **새 대화와 명시적 선택 분리 점검**: 새 대화창이 팀 기본 모델로 열리는지 본 뒤, 모델 선택기에서 다른 모델을 골랐을 때 그 선택이 유지되는지 살핍니다.
- **MCP 기동과 권한 분리 관리**: 자동 시작 해제는 기동 시점만 다루므로, 외부 도구 접근 권한이나 저장소 범위는 별도 정책으로 관리합니다.

## 출처

- [GitHub Changelog: New controls and chat improvements in Copilot for JetBrains](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/) — 2026-10-10
- [GitHub Docs: Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings)
- [GitHub Docs: About Model Context Protocol](https://docs.github.com/en/copilot/concepts/context/mcp)

공식 발표와 관리 설정 문서를 바탕으로 작성했으며, 플러그인을 직접 실행해 응답 품질이나 안정성 개선 폭을 별도로 측정하지는 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
