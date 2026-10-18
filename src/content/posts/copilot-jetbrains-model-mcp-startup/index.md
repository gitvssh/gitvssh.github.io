---
title: "JetBrains Copilot 업데이트: 기본 모델과 도구 시작을 따로 고릅니다"
description: "JetBrains용 Copilot의 새 기본 모델 설정과 MCP 자동 시작 제어를 살펴봅니다. 사용자의 모델 선택은 어떻게 유지되는지, 업데이트 전 확인할 IDE 버전은 무엇인지 정리합니다."
slug: "copilot-jetbrains-model-mcp-startup"
publishedAt: "2026-10-11"
updatedAt: "2026-10-18"
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

팀에서 쓰는 AI 모델을 맞추려다 보면, 매번 같은 모델만 쓰도록 고정해야 하는지 고민하게 됩니다. **JetBrains용 Copilot의 이번 변경은 새 대화의 출발점을 기업이 정하면서도 사용자의 명시적 선택을 유지합니다.** GitHub은 2026년 10월 10일 이 기능과 MCP 서버 자동 시작을 끄는 설정을 함께 발표했습니다. ([공식 발표](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/))

## 기본 모델을 정해도 대화별 선택은 남습니다

![초록 기어로 출발한 장치에 사용자가 주황 기어를 골라 끼우는 기본 모델과 명시적 선택의 비유](./page-01.webp)

관리자가 지정하는 기본 모델은 **새로 여는 대화**의 출발점입니다. 사용 가능한 Copilot 에이전트 모델 중에서 기본값을 고르더라도 사용자가 모델 선택기에서 직접 고른 값은 그대로 존중되며, 관리 설정 문서 역시 `model` 항목을 대화의 기본값으로 설명하면서 대화별 변경을 허용하고 있습니다. ([관리 설정의 model 항목](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#model))

팀의 공통 출발점과 작업별 판단을 함께 두는 방식이라, 평소에는 팀 기본 모델로 새 대화를 열고 까다로운 작업에서만 다른 모델을 직접 고르는 식으로 활용할 수 있습니다.

## 도구 연결에는 시작 시점이라는 선택이 더 있습니다

![자동 시작을 끈 뒤 다음 시작에 모터가 켜지지 않는 모습을 설명하는 카솔, MCP 시작 설정의 개념 비유](./page-02.webp)

모델 선택과 별개로 외부 도구 연결을 언제 켤지도 제어할 수 있습니다. 새로 추가된 MCP 설정은 JetBrains의 Copilot과 Claude에서 MCP 서버 자동 시작을 끌 수 있게 해 주며, 발표문은 이 옵션을 통해 기동 시점의 자동 실행 여부를 제어한다는 점을 안내하고 있습니다. ([MCP 시작 설정 발표](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/))

MCP는 AI 앱을 외부 도구와 데이터에 연결하는 표준으로, 서버가 기능을 제공하고 AI 앱이 그 연결을 사용합니다. 그림에서 모델을 바꾸는 기어와 도구를 켜는 모터를 나란히 구분해 그린 것도 기본 모델 지정과 도구 서버 기동이 서로 다른 설정 축임을 보여 주기 위해서입니다. ([GitHub의 MCP 설명](https://docs.github.com/en/copilot/concepts/context/mcp))

## 업데이트 전에는 IDE 버전과 변경 사항을 확인합니다

업데이트 전에 함께 확인할 요구 사항과 기능 변경은 세 가지입니다. ([지원 조건과 변경 목록](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/))

- **IDE 지원 버전**: JetBrains IDE **2025.2 이상**이 필요하며, 2025.1 지원은 종료됐습니다.
- **진단 메뉴 `Fix` 동작**: 인라인 채팅을 열어 수정을 요청할 때 agent mode를 쓸 수 있으면 그 모드로, 그렇지 않으면 ask mode로 동작합니다.
- **안정성 개선**: 세션·설정·worktree 관련 안정성 개선이 함께 반영됐습니다.

## 다메카솔의 해석: 설정마다 확인할 결과가 다릅니다

업데이트를 적용할 때는 새 대화의 기본 모델과 MCP 서버의 기동 상태를 각각 나누어 점검하는 편이 좋습니다. 모델 설정이 의도대로 적용됐더라도 외부 도구 서버가 예상과 다르게 시작되면 개발 환경의 실제 동작이 달라질 수 있고, 자동 시작 해제는 읽기·쓰기 권한이나 격리 수준 자체를 바꾸는 보안 장치가 아니라 기동 시점을 조절하는 옵션이기 때문입니다.

앞서 다룬 [Copilot 코드 리뷰의 요청별 설정](/posts/github-copilot-review-api-balanced/)에서도 설정이 적용되는 단위를 구분하는 일이 중요했듯, 이번 업데이트 역시 **새 대화의 기본값, 사용자의 명시적 모델 선택, 도구 서버의 자동 시작 여부**라는 세 가지 단위를 나누어 확인하면 설정이 의도대로 반영됐는지 분명하게 점검할 수 있습니다.

## 출처

- [GitHub Changelog: New controls and chat improvements in Copilot for JetBrains](https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains/) — 2026-10-10
- [GitHub Docs: Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings)
- [GitHub Docs: About Model Context Protocol](https://docs.github.com/en/copilot/concepts/context/mcp)

공식 발표와 관리 설정 문서를 바탕으로 작성했으며, 플러그인을 직접 실행해 응답 품질이나 안정성 개선 폭을 별도로 측정하지는 않았습니다. 이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
