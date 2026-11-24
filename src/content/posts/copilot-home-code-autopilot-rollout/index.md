---
title: "Copilot Home·Code·Autopilot 발표: 사용 시점과 운영 조건"
description: "Copilot Home·Code·Autopilot의 제공 계획, Managed Runtime 공개 프리뷰와 사내 앱 운영 조건을 공식 발표로 확인했습니다."
slug: "copilot-home-code-autopilot-rollout"
publishedAt: "2026-09-26"
updatedAt: "2026-11-23"
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

Microsoft가 새 Copilot 기능을 발표했다는 소식을 듣고 사내 계정에서 바로 메뉴를 찾아봤는데 보이지 않아 당황하셨나요? 2026년 9월 25일 공개된 [Copilot Home·Code·Autopilot](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/)은 기능마다 제공 시점과 접근 조건이 제각각이거든요. 26일 확인한 공식 자료를 바탕으로 각 기능이 맡는 역할과 배포 일정, 사내 도입 전에 짚어야 할 운영 조건을 정리해 드립니다.

글·해설: 다메카솔

## Home·Code·Autopilot이 맡는 일과 제공 일정

![사람의 단발 요청에서 클라우드의 지속 업무로 달라지는 작업 흐름](./page-01.webp)

이번 개편의 핵심은 AI를 부르는 방식이 단발성 질의에서 지속적인 작업 흐름으로 넓어졌다는 점입니다. Microsoft는 세 가지 기능을 역할별로 구분했습니다. **Home**은 Chat·Cowork와 Office 문서 편집을 한 화면에 모으는 출발점이고, **Code**는 자연어로 업무용 앱을 만드는 개발 공간이며, **Autopilot**(기존 명칭 Scout)은 클라우드에서 반복 업무를 이어 가는 에이전트입니다.

발표 시점과 실제 사내 적용 시점은 따로 떼어 봐야 합니다. 기능과 호스팅 도구마다 프리뷰 단계와 공개 일정이 다르기 때문에 아래 표처럼 구분해 두면 도입 시점을 가늠하기 수월하죠.

| 기능 및 구성 요소 | 9월 25일 발표 기준 제공 상태 | 비고 |
| --- | --- | --- |
| **Home** | 향후 몇 주 동안 Frontier 프로그램에서 순차 제공 예정 | Chat·Cowork·Office 통합 진입점 |
| **Code** | 월말 Frontier 제공 후, 향후 몇 주 동안 폭넓은 제공 예정 | 자연어 기반 업무용 앱 제작 |
| **Autopilot** | 월말 비공개 프리뷰 확대 예정 | 기존 명칭 Scout, 지속 실행 에이전트 |
| **Managed Runtime 호스트·SDK** | 공개 프리뷰 | 사내 앱 호스팅 및 거버넌스 기반 |

기능 일정 못지않게 과금 구조도 함께 살펴봐야 합니다. 발표문에 따르면 Cowork·Code·Autopilot처럼 에이전트가 작업을 대신 수행하는 영역에는 사용량 기반 과금(metered usage)이 적용됩니다. 가령 회의록 요약만 쓰던 조직이 Autopilot으로 주간 보고서 생성을 자동화하면 호출 빈도에 따라 비용 구조가 달라지는 셈이죠. 다만 구체적인 요율이나 기본 포함 크레딧, 무료 범위는 이번 발표문에 명시되지 않아 활성화 전 라이선스 정책을 별도로 확인해야 합니다.

## 만든 앱을 사내에서 계속 운영하려면: Managed Runtime과 Frontier 조건

![사내 앱 실행 환경의 권한과 중단 조건을 살펴보는 카솔](./page-02.webp)

개발자가 Code로 사내 경비 조회나 승인 보조 앱을 만들었다고 가정해 보겠습니다. 개인 테스트 단계를 넘어 팀 전체가 쓰는 도구로 배포하려면 호스팅 위치와 사내 계정 인증, 접근 통제를 함께 갖춰야 합니다. Microsoft가 함께 공개한 운영 기준은 크게 두 가지입니다.

- **Managed Runtime의 호스팅·거버넌스 통합**: [Managed Runtime 발표](https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/)에 따르면 Microsoft는 앱 호스팅, Entra 인증, 데이터·연결 대상 정책, 배포와 버전 관리를 한곳에 모았습니다. 관리자는 Microsoft 365 관리 센터에서 사내 앱 목록과 접근 권한, 사용량, 상태를 제어할 수 있고, 개발자는 편집 가능한 Git 기반 코드와 SDK·CLI 경로를 쓸 수 있습니다. [OpenAI의 관리형 에이전트 실행 환경](/posts/openai-agents-api-managed-harness/)과 나란히 놓고 보면, 각 공급사가 인증과 실행 환경 관리 책임을 어디까지 묶어서 제공하는지 대조해 볼 만합니다.
- **Frontier 프로그램 참여 및 테넌트 권한 확인**: [공식 프로그램 안내](https://www.microsoft.com/en-us/copilot/resources/frontier-program)에 따르면 일반 제공 전 AI 기능을 시험하려는 조직이 Frontier에 참여해야 하며, 업무용 사용자는 적격 Copilot 라이선스와 업무 계정 로그인 조건을 충족해야 합니다. 개별 기능과 에이전트 접근 권한은 관리자가 테넌트 단위로 제어하는데요. 확인 시점(9월 26일) 기준으로 안내 페이지 일부에 이전 명칭인 Scout 표기가 남아 있어, 실제 메뉴 반영 여부는 관리자 콘솔에서 직접 확인해야 합니다.

## 다메카솔의 해석: 반복 실행에는 중지 경로도 필요합니다

단발성 채팅 질의와 달리 Autopilot처럼 클라우드에서 며칠씩 이어지는 작업은 장애가 났을 때의 파급 범위가 넓습니다. 예를 들어 고객 안내 메일을 발송하거나 사내 티켓 상태를 갱신하는 에이전트가 외부 API 오류로 멈췄다가 자동 재시도에 들어갔다고 생각해 볼까요? 멱등성(idempotency) 검증이 빠져 있다면 이미 나간 안내를 중복 발송하거나, 재시도 루프를 돌며 사용량 과금을 빠르게 소진할 위험이 큽니다.

따라서 파일럿 단계에서부터 아래 세 가지 운영 장치를 먼저 점검해 두는 편이 좋습니다.

- **권한 분리와 승인 게이트**: 데이터 조회 작업에는 읽기 권한만 열어 두고, 외부 발송이나 레코드 수정 단계에는 명시적인 승인과 감사 로그를 남기는 구조가 안전합니다.
- **중복 실행 방지와 과금 상한**: 작업 단위 고유 키로 재실행 시 중복 처리를 막고, 재시도 횟수나 사용량 상한선을 걸어 예상 밖의 비용 급증을 차단해야 합니다.
- **즉시 멈출 수 있는 강제 중지(kill switch) 경로**: 며칠씩 백그라운드에서 도는 작업이 잘못된 방향으로 흘러갈 때, 누가 어떤 알림을 받아 즉시 중단할 수 있는지 담당자와 절차를 정해 두기를 권합니다.

## 출처

- [Microsoft 새 Copilot 발표](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) — 2026-09-25, 기능 역할·배포 계획·과금 구분.
- [Managed Runtime 공개 프리뷰](https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/) — 2026-09-25, 실행 환경과 관리 책임.
- [Frontier 프로그램 안내](https://www.microsoft.com/en-us/copilot/resources/frontier-program) — 2026-09-26 확인, 참여·접근 조건.

모두 Microsoft 공식 자료를 바탕으로 정리했으며, 실제 기업 테넌트에서의 실행 시험이나 별도 측정은 포함하지 않았습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
