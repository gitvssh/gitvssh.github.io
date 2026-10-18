---
title: "Apple, AI 에이전트 시대의 전체 디스크 접근 통제 강화 예고"
description: "Apple이 AI 에이전트의 데이터 접근 위험을 언급하며 macOS 전체 디스크 접근 통제 강화를 예고했습니다. 현재 권한 범위와 향후 계획을 구분합니다."
slug: "apple-full-disk-access-ai-agent-controls"
publishedAt: "2026-10-04"
updatedAt: "2026-10-18"
track: "news"
subtype: "announcement_analysis"
tags: ["AI 에이전트", "AI 보안"]
audience: "developer"
readerOutcome: "폴더별 접근과 전체 디스크 접근의 범위를 구별하고 Apple이 발표한 계획과 현재 설정을 나누어 설명한다."
contentFormats: ["article", "comic", "table"]
freshnessStatus: "current"
reviewedAt: "2026-10-04"
reviewAfter: "2026-10-11"
cover: "./cover.webp"
coverAlt: "전체 디스크 접근 열쇠 앞에서 데이터 범위를 살펴보는 카솔"
sourceUrl: "https://developer.apple.com/news/?id=p6zjojqw"
featured: false
draft: false
officialResources: [{"kind": "official_announcement", "title": "전체 디스크 접근 통제 강화 계획", "siteName": "Apple Developer", "summary": "추가 통제의 방향과 AI 에이전트 위험에 관한 공식 발표입니다.", "url": "https://developer.apple.com/news/?id=p6zjojqw", "publishedAt": "2026-10-02"}, {"kind": "documentation", "title": "현재 파일 및 폴더 접근 설정", "siteName": "Apple Support", "summary": "위치별 접근을 앱마다 조절하는 방법을 확인합니다.", "url": "https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac"}]
---

글·해설: 다메카솔

발행·확인: 2026-10-04

**AI 에이전트에게 로컬 파일 작업을 맡길 때는 앱이 요청하는 접근 권한의 범위부터 따져봐야 합니다.** Apple은 2026년 10월 2일 macOS의 전체 디스크 접근(Full Disk Access) 권한에 추가 통제를 도입하겠다고 발표했습니다. 사용자가 권한 부여의 파급 효과를 명확히 이해하고 훨씬 명시적인 절차를 거쳐 승인하도록 바꾸겠다는 계획입니다(구체적인 적용 날짜와 대상 macOS 버전은 발표문에 명시되지 않았습니다). ([Apple 공식 발표](https://developer.apple.com/news/?id=p6zjojqw))

## 작업 폴더 하나를 여는 권한보다 훨씬 넓습니다

![위치별 폴더 접근과 메일·메시지 등 다른 앱 데이터까지 포함하는 전체 디스크 접근의 범위 비교](./page-01.webp)

macOS의 전체 디스크 접근 권한에는 사용자가 작업 중인 폴더뿐 아니라 다른 앱이 보관하는 민감한 데이터까지 포함됩니다. Apple 지원 문서는 메일·메시지·Safari 데이터, Time Machine 백업, 일부 시스템 관리 설정을 그 예로 들며, 원래 백업 유틸리티처럼 시스템 전체를 읽어야 하는 앱을 위해 기존 개인정보 보호 통제를 폭넓게 우회하도록 만든 권한이라고 설명합니다. ([현재 권한 범위](https://support.apple.com/en-mt/guide/mac-help/-mchl211c911f/mac))

Apple은 최근 일부 개발자의 권한 요청 방식 때문에 이용자가 위험을 충분히 인지하지 못한 채 민감한 데이터를 노출할 수 있고, 메시지 대화 상대방의 개인정보까지 영향을 받을 수 있다고 경고했습니다(특정 앱 이름이나 실제 유출 사건을 직접 지목하지는 않았습니다). ([발표의 위험 설명](https://developer.apple.com/news/?id=p6zjojqw))

## 지금 확인할 설정과 앞으로 바뀔 승인 방식

![현재 앱 권한 점검과 향후 명시적 승인 강화 계획을 분리한 개념 장면](./page-02.webp)

현재 macOS에서도 시스템 설정의 ‘개인정보 보호 및 보안’ 메뉴에 들어가면 데스크탑·다운로드·문서 폴더 등 **위치별 파일 및 폴더 접근**과 **전체 디스크 접근**을 각각 앱 단위로 켜거나 끌 수 있습니다(OS 버전과 언어 설정에 따라 메뉴 표기는 조금씩 다를 수 있습니다). ([파일 및 폴더 접근 안내](https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac))

이번 발표는 AI 에이전트의 자율성과 실행 능력이 커질수록 광범위한 디스크 접근 권한의 위험도 함께 커진다는 판단 아래, 앞으로 이 권한을 부여할 때 **매우 명시적인 사용자 행동(very explicit user action)**을 요구하겠다는 예고입니다. ([추가 통제 계획](https://developer.apple.com/news/?id=p6zjojqw))

| 구분 | 현재 확인된 내용 |
| --- | --- |
| 현재 macOS 설정 | 데스크탑·문서 등 위치별 폴더 접근과 전체 디스크 접근을 별도 항목으로 구분 |
| 발표한 통제 계획 | 전체 디스크 접근 승인 시 위험 안내 강화 및 매우 명시적인 사용자 행동 요구 |
| 후속 확인 필요 항목 | 적용 시점, 대상 macOS 버전, 새 승인 UI 및 기존 부여 권한의 처리 방식 |

## 다메카솔의 해석: 필요한 데이터부터 좁혀 봅니다

로컬에서 동작하는 AI 에이전트 도구를 쓰거나 개발할 때는 **에이전트가 수행할 작업 범위와 실제로 요청하는 파일 권한을 나란히 대조**해 봐야 합니다. 예를 들어 특정 프로젝트 폴더 안의 문서나 코드만 정리하는 에이전트가 편의를 이유로 전체 디스크 접근을 요구한다면, 왜 메일함이나 브라우저 기록까지 열람할 수 있는 권한이 필요한지부터 의심해 보는 식입니다.

앱을 개발하는 쪽에서도 권한 거절 이후의 경로를 세심하게 설계해야 합니다. 사용자가 전체 디스크 접근을 거절하거나 나중에 철회했을 때 앱이 단순히 멈추며 전체 권한만 다시 요구하기보다, 필요한 폴더만 선택해 작업을 이어 갈 수 있는 대안 경로를 안내해야 사용자가 최소 권한 원칙을 지킬 수 있습니다. 서버로 넘어간 데이터의 처리 조건을 검증하는 [Gboard 연합학습 이야기](/posts/google-gboard-verifiable-federated-learning/)와 마찬가지로, 로컬 기기에서도 누가 어디까지 읽을 수 있는지 경계를 좁히는 일이 에이전트 보안의 출발점입니다.

## 출처

- [Apple Developer 발표, 2026-10-02](https://developer.apple.com/news/?id=p6zjojqw)
- [Apple Support: 파일 및 폴더 접근](https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac)
- [Apple Support: 개인정보 보호 및 보안 설정](https://support.apple.com/en-mt/guide/mac-help/-mchl211c911f/mac)

모두 Apple의 공식 1차 자료이며, 향후 도입될 새 통제 화면을 직접 시험하거나 별도 보안 감사를 수행한 결과는 포함하지 않습니다. 이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
