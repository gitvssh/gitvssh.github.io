---
title: "JetBrains Copilot 업데이트: 기본 모델과 도구 시작을 따로 고릅니다"
description: "JetBrains용 Copilot의 새 기본 모델 설정과 MCP 자동 시작 제어를 살펴봅니다. 사용자의 모델 선택은 어떻게 유지되는지, 업데이트 전 확인할 IDE 버전은 무엇인지 정리합니다."
slug: "copilot-jetbrains-model-mcp-startup"
publishedAt: "2026-10-11"
updatedAt: "2026-10-11"
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

글·해설: 다메카솔

발행·확인: 2026-10-11

팀에서 쓰는 AI 모델을 맞추려다 보면, 매번 같은 모델만 쓰도록 고정해야 하는지 고민하게 됩니다. **JetBrains용 Copilot의 이번 변경은 새 대화의 출발점을 기업이 정하면서도 사용자의 명시적 선택을 유지합니다.** GitHub은 2026년 10월 10일 이 기능과 MCP 서버 자동 시작을 끄는 설정을 발표했습니다. [공식 발표](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/)

## 기본 모델을 정해도 대화별 선택은 남습니다

![초록 기어로 출발한 장치에 사용자가 주황 기어를 골라 끼우는 기본 모델과 명시적 선택의 비유](./page-01.webp)

관리자가 정하는 대상은 새 대화입니다. 사용 가능한 Copilot 에이전트 모델에서 기본값을 고르며, 사용자가 모델 선택기에서 직접 고른 값은 존중됩니다. 관리 설정 문서도 `model`을 대화의 기본값으로 설명하고 대화별 변경을 허용합니다. [관리 설정의 model 항목](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#model)

제 관점에서는 팀의 공통 출발점과 작업별 판단을 함께 두는 방식입니다. 예를 들어 평소 쓰는 모델로 새 대화를 열고 어려운 작업에서 다른 모델을 고르는 흐름을 생각해 볼 수 있습니다. 이는 활용 예시이며, 기존 대화가 자동으로 바뀐다는 뜻까지 확장하지 않았습니다.

## 도구 연결에는 시작 시점이라는 선택이 더 있습니다

![자동 시작을 끈 뒤 다음 시작에 모터가 켜지지 않는 모습을 설명하는 카솔, MCP 시작 설정의 개념 비유](./page-02.webp)

그렇다면 연결해 둔 도구는 언제 켤까요? 새 MCP 설정은 JetBrains의 Copilot과 Claude에서 서버 자동 시작을 끄도록 합니다. 발표가 설명한 범위는 여기까지이며, 정확한 메뉴 경로나 이미 실행 중인 서버의 처리 방식은 이 글에서 단정하지 않습니다. [MCP 시작 설정 발표](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/)

MCP는 AI 앱을 외부 도구와 데이터에 연결하는 표준입니다. 서버는 필요한 기능을 제공하고 AI 앱은 그 연결을 사용합니다. 그래서 그림에서는 모델을 바꾸는 기어와 도구를 켜는 모터를 따로 그렸습니다. 실제 설정 화면을 재현한 그림은 아닙니다. [GitHub의 MCP 설명](https://docs.github.com/en/copilot/concepts/context/mcp)

## 업데이트 전에는 IDE 버전부터 확인합니다

이번 안내부터 필요한 JetBrains IDE 버전은 **2025.2 이상**이며, 2025.1 지원은 종료됐습니다. 진단 메뉴의 `Fix`는 인라인 채팅을 열어 수정을 요청하고, agent mode를 쓸 수 있으면 그 모드로, 그렇지 않으면 ask mode로 동작합니다. GitHub은 세션·설정·worktree 안정성 개선도 함께 알렸습니다. [지원 조건과 변경 목록](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/)

제가 확인한 것은 공식 발표와 문서입니다. 플러그인을 직접 실행해 응답 품질이나 안정성 개선 폭을 측정한 결과는 포함하지 않았습니다.

## 다메카솔의 해석: 설정마다 확인할 결과가 다릅니다

저라면 업데이트 후 새 대화의 모델과 MCP 서버 상태를 각각 확인하겠습니다. 모델 설정이 의도대로 적용돼도 도구가 예상과 다르게 시작하면 개발 환경의 동작은 달라지기 때문입니다. 자동 시작을 끄는 기능을 읽기·쓰기 권한이나 격리 수준의 보장으로 받아들이기보다, 기동 시점을 조절하는 수단으로 다루는 편이 정확하다고 봅니다.

앞서 다룬 [Copilot 코드 리뷰의 요청별 설정](/posts/github-copilot-review-api-balanced/)도 설정이 적용되는 단위를 구분해야 이해하기 쉽습니다. 이번에는 새 대화, 명시적 모델 선택, 도구 서버 시작이라는 단위가 핵심입니다. 팀에서 업데이트할 때 이 세 가지를 나눠 확인하면 어느 설정이 기대와 달랐는지 좁혀 볼 수 있습니다.

## 출처

- [GitHub Changelog: New controls and chat improvements in Copilot for JetBrains](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/) — 2026-10-10
- [GitHub Docs: Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings)
- [GitHub Docs: About Model Context Protocol](https://docs.github.com/en/copilot/concepts/context/mcp)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
