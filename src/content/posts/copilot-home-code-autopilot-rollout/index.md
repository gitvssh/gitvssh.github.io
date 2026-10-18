---
title: "Copilot Home·Code·Autopilot 발표: 사용 시점과 운영 조건"
description: "Copilot Home·Code·Autopilot의 제공 계획, Managed Runtime 공개 프리뷰와 사내 앱 운영 조건을 공식 발표로 확인했습니다."
slug: "copilot-home-code-autopilot-rollout"
publishedAt: "2026-09-26"
updatedAt: "2026-10-18"
track: "news"
subtype: "release_announcement"
tags: ["AI 에이전트", "AI 코딩 도구", "AI 안전"]
audience: "developer"
readerOutcome: "Copilot 신기능의 프리뷰·예정 상태를 구분하고, 사내 앱과 자율 에이전트에 필요한 권한·비용 통제를 설명한다."
contentFormats: ["article", "comic", "table"]
freshnessStatus: "current"
reviewedAt: "2026-09-26"
reviewAfter: "2026-10-03"
cover: "./cover.webp"
coverAlt: "새 Copilot 발표를 살펴보며 실제 이용 조건을 확인하는 카솔"
sourceUrl: "https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/"
featured: false
draft: false
officialResources: [{"kind": "official_announcement", "title": "새 Copilot 발표", "siteName": "Microsoft", "summary": "기능별 제공 계획과 에이전트 작업 과금 구분을 확인합니다.", "url": "https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/", "publishedAt": "2026-09-25"}, {"kind": "official_announcement", "title": "Managed Runtime 공개 프리뷰", "siteName": "Microsoft", "summary": "호스팅과 사내 접근 정책을 나누는 운영 모델을 확인합니다.", "url": "https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/", "publishedAt": "2026-09-25"}, {"kind": "documentation", "title": "Frontier 참여 조건", "siteName": "Microsoft", "summary": "조직 활성화와 사용자 라이선스 등 프로그램 참여 조건을 확인합니다.", "url": "https://www.microsoft.com/en-us/copilot/resources/frontier-program"}]
---

새 Copilot 기능들의 실제 이용 시점은 기능과 조직 설정마다 다릅니다. Microsoft는 2026년 9월 25일 [Home·Code·Autopilot을 발표](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/)하며 Home·Code의 Frontier 프로그램 순차 제공과 Autopilot의 월말 비공개 프리뷰 확대를 예고했습니다. 9월 26일 확인한 공식 자료를 기준으로 각 기능의 역할과 배포 일정, 사내 운영 조건을 정리합니다.

글·해설: 다메카솔

Updated: 2026-09-26

## Home·Code·Autopilot이 맡는 일과 제공 일정

![사람의 단발 요청에서 클라우드의 지속 업무로 달라지는 작업 흐름](./page-01.webp)

Microsoft는 세 기능의 역할을 단계별로 구분합니다. **Home**은 Chat·Cowork와 Office 문서 편집을 한곳에 모으는 출발점이고, **Code**는 자연어로 업무용 앱을 만드는 개발 공간이며, **Autopilot**(기존 명칭 Scout)은 클라우드에서 반복 업무를 지속적으로 이어 가는 에이전트입니다.

발표문에 안내된 각 기능의 제공 일정은 아래와 같습니다.

| 기능 및 구성 요소 | 9월 25일 발표 기준 제공 상태 |
| --- | --- |
| **Home** | 향후 몇 주 동안 Frontier 프로그램에서 순차 제공 예정 |
| **Code** | 월말 Frontier 제공 후, 향후 몇 주 동안 폭넓은 제공 예정 |
| **Autopilot** | 월말 비공개 프리뷰 확대 예정 |
| **Managed Runtime 호스트·SDK** | 공개 프리뷰 |

아울러 Cowork·Code·Autopilot 같은 에이전트 작업에는 사용량 기반 과금(metered usage)이 적용된다고 안내됐으므로(구체적인 단가표나 기본 포함량은 이번 발표문에 명시되지 않음), 기능 활성화 시점과 함께 과금 조건을 함께 확인해야 합니다.

## 만든 앱을 사내에서 계속 운영하려면: Managed Runtime과 Frontier 조건

![사내 앱 실행 환경의 권한과 중단 조건을 살펴보는 카솔](./page-02.webp)

Copilot으로 만든 업무용 앱을 개인 실험에 그치지 않고 사내에 배포하려면 실행 환경과 권한 관리가 뒤따라야 합니다. 함께 공개된 두 가지 운영 기준은 다음과 같습니다.

- **Managed Runtime의 호스팅·거버넌스 통합**: [Managed Runtime 발표](https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/)에 따르면 Microsoft는 앱 호스팅, Entra 인증, 데이터 연결 정책, 버전 관리를 하나의 운영 기반에 모으고, 관리자가 Microsoft 365 관리 센터에서 앱 목록·접근 권한·사용량·상태를 관리하도록 설계했습니다. 개발자에게는 편집 가능한 Git 기반 코드와 SDK·CLI 경로를 함께 제공합니다([OpenAI의 관리형 에이전트 실행 환경](/posts/openai-agents-api-managed-harness/)과 비교해 볼 때 각 공급사가 인증과 호스팅 책임을 어디까지 묶는지 대조해 볼 만합니다).
- **Frontier 프로그램 참여 및 테넌트 권한 확인**: [공식 프로그램 안내](https://www.microsoft.com/en-us/copilot/resources/frontier-program)에 따르면 업무용 사용자는 적격 Copilot 라이선스, 조직의 Frontier 프로그램 참여, 업무 계정 로그인이 필요하며 관리자가 개별 기능과 에이전트 권한을 제어합니다(확인 시점 기준 안내 페이지 일부에는 이전 명칭인 Scout 표기가 남아 있어, 실제 테넌트 메뉴 반영 시점은 관리자 콘솔에서 직접 확인해야 합니다).

## 다메카솔의 해석: 반복 실행에는 중지 경로도 필요합니다

단발성 채팅 요청과 달리 클라우드에서 며칠씩 반복 실행되는 에이전트(Autopilot 등)를 도입할 때는 **실패 후 재시도 동작과 강제 중지(kill switch) 경로**부터 점검해야 합니다. 예를 들어 고객 안내 발송이나 사내 티켓 갱신을 맡긴 에이전트가 중간에 오류로 멈췄다가 재실행될 때, 이미 보낸 안내를 중복 발송하지 않는지(멱등성)와 재시도로 인한 사용량 과금 상한이 걸려 있는지 확인하는 식입니다.

권한 역시 처음부터 넓게 열어 두기보다 조회 작업에는 읽기 권한만 부여하고, 외부 발송이나 데이터 수정 단계에는 명시적인 승인·감사 로그를 남기는 구조가 안전합니다. **업무를 며칠씩 맡겨 두었을 때 잘못된 실행을 누가 어떤 알림으로 알아차리고 즉시 멈출 수 있는지**, 그 운영 절차부터 정해 두기를 권합니다.

## 확인한 공식 자료

- [Microsoft 새 Copilot 발표](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) — 2026-09-25, 기능 역할·배포 계획·과금 구분.
- [Managed Runtime 공개 프리뷰](https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/) — 2026-09-25, 실행 환경과 관리 책임.
- [Frontier 프로그램 안내](https://www.microsoft.com/en-us/copilot/resources/frontier-program) — 2026-09-26 확인, 참여·접근 조건 (모두 Microsoft 공식 자료이며 실제 기업 테넌트에서의 실행 시험은 포함하지 않습니다).

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
