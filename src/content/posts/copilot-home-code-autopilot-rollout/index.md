---
title: "Copilot Home·Code·Autopilot 발표: 사용 시점과 운영 조건"
description: "Copilot Home·Code·Autopilot의 제공 계획, Managed Runtime 공개 프리뷰와 사내 앱 운영 조건을 공식 발표로 확인했습니다."
slug: "copilot-home-code-autopilot-rollout"
publishedAt: "2026-09-26"
updatedAt: "2026-09-26"
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

새 Copilot의 이용 시점은 기능마다 다릅니다. Microsoft는 2026년 9월 25일 [Home·Code·Autopilot을 발표](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/)하며 Home·Code의 Frontier 순차 제공과 Autopilot의 월말 비공개 프리뷰 확대를 예고했습니다. 9월 26일 공개 자료를 기준으로, 개발자가 확인할 배포 상태와 운영 조건을 나눠 봅니다.

글·해설: 다메카솔

Updated: 2026-09-26

## Home·Code·Autopilot이 맡는 일

![사람의 단발 요청에서 클라우드의 지속 업무로 달라지는 작업 흐름](./page-01.webp)

Microsoft는 Home을 Chat·Cowork와 Office 편집을 모으는 출발점, Code를 자연어로 업무용 앱을 만드는 공간으로 소개합니다. Autopilot은 이전 Scout의 새 이름으로, 클라우드에서 반복 업무를 이어 가는 에이전트라는 설명입니다. 제품 역할에 관한 공급사의 발표입니다.

일정부터 나눠 봅시다. 아래 표는 발표 당시의 계획이며, 제가 조직 계정으로 접근 여부를 시험한 결과는 없습니다.

| 기능 | 발표에 적힌 제공 상태 |
| --- | --- |
| Home | 향후 몇 주 동안 Frontier에서 순차 제공 예정 |
| Code | 월말 Frontier 제공, 이후 몇 주 동안 폭넓은 제공 예정 |
| Autopilot | 월말 비공개 프리뷰 확대 예정 |
| Managed Runtime 호스트·SDK | 공개 프리뷰 |

Cowork·Code·Autopilot 같은 에이전트 작업에는 사용량 기반 과금이 적용된다는 설명도 함께 나왔습니다. 구체 요율과 포함량은 이번 글에서 확정하지 않았습니다. 기능 이름과 함께 비용 조건을 읽어야 하는 이유입니다.

## 만든 앱을 사내에서 계속 운영하려면

![사내 앱 실행 환경의 권한과 중단 조건을 살펴보는 카솔](./page-02.webp)

[Managed Runtime 발표](https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/)에서 Microsoft는 호스팅, Entra 인증, 데이터 연결 정책과 버전 관리를 같은 운영 기반에 모은다고 설명합니다. 관리자는 Microsoft 365 관리 센터에서 앱 목록과 접근 권한, 사용량·상태를 살펴보게 됩니다. 책임을 나누는 구조입니다.

개발자에게는 편집 가능한 Git 기반 코드와 SDK·CLI 경로를 제시했습니다. 앱을 만드는 도구가 달라도 실행 이후의 관리 방식은 맞추겠다는 구상인데요. 공개 프리뷰라는 현재 단계와 회사가 설명한 운영 모델을 함께 읽으면, 도입 검토에서 확인할 질문이 구체적입니다. 기존 인증·데이터 정책을 어디서 설정하고 누가 변경하는지부터 대조할 수 있습니다.

이 부분은 [관리형 에이전트 실행 환경을 다룬 글](/posts/openai-agents-api-managed-harness/)과 연결됩니다. 그 글은 다른 공급사의 API를 다루므로, 권한이나 네트워크 설정이 서로 같다고 전제하지 않고 운영 책임을 비교하는 데 참고하면 좋겠습니다.

## Frontier 참여와 개별 기능 접근은 따로 확인합니다

조직이 Frontier를 켰는지부터 확인해야 합니다. [공식 프로그램 안내](https://www.microsoft.com/en-us/copilot/resources/frontier-program)는 업무용 사용자에게 적격 Copilot 라이선스와 조직의 프로그램 참여, 업무 계정 로그인을 안내하며, 관리자가 기능과 에이전트 권한을 정한다고 설명합니다. 기능·역할·구독에 따라 접근과 사용량 비용도 달라집니다.

여기서 확인 범위가 갈립니다. 프로그램 참여 조건은 안내 페이지에서, 이번에 발표한 기능의 배포 일정은 날짜가 명시된 발표에서 확인했습니다. 해당 안내 페이지에는 아직 Scout 명칭도 보여, 메뉴가 언제 바뀌는지까지 단정할 근거는 부족합니다. 실제 계정에 기능이 표시되는지는 조직 관리자가 별도로 확인할 사항입니다.

## 다메카솔의 해석: 반복 실행에는 중지 경로도 필요합니다

저는 도입 검토에서 에이전트가 실패한 뒤 다시 실행되는 상황을 먼저 살펴보겠습니다. 한 번의 요청이라면 사람이 결과를 보고 다음 행동을 정할 여지가 크지만, 반복 작업은 이전 실행의 잘못된 상태를 다음 실행으로 넘길 수 있기 때문입니다. 가령 고객에게 안내를 보내는 업무를 맡긴다고 가정해 보죠. 중간에 멈춘 실행을 재시도할 때 같은 안내를 다시 보내는지, 이미 사용한 비용이 재실행 한도에 반영되는지 확인해야 합니다.

권한도 같은 원리로 읽습니다. 조회 작업에는 조회 권한만 주고, 외부 발송이나 데이터 변경은 승인·감사 기록을 남기는 식으로 실패 범위를 줄이는 접근을 제안합니다. 이는 다메카솔의 운영 설계 판단이며, 이번 제품에 그런 통제가 자동으로 완성돼 있다는 뜻은 아닙니다. 저는 실제 테넌트에서 실행하거나 안전성을 검증하지 않았습니다.

최종적으로 남는 질문은 하나입니다. **업무를 며칠씩 맡겼을 때, 잘못된 실행을 알아차리고 멈출 사람과 경로가 정해져 있을까요?**

## 확인한 공식 자료

- [Microsoft 새 Copilot 발표](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) — 2026-09-25, 기능 역할·배포 계획·과금 구분.
- [Managed Runtime 공개 프리뷰](https://www.microsoft.com/en-us/copilot/blog/copilot-studio/build-where-you-want-run-with-confidence-now-microsoft-hosts-and-manages-the-code-created-by-copilot/) — 2026-09-25, 실행 환경과 관리 책임.
- [Frontier 프로그램 안내](https://www.microsoft.com/en-us/copilot/resources/frontier-program) — 2026-09-26 확인, 참여·접근 조건. 모두 Microsoft 자료입니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
