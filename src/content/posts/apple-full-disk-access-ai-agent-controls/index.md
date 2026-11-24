---
title: "Apple, AI 에이전트 시대의 전체 디스크 접근 통제 강화 예고"
description: "Apple이 AI 에이전트의 데이터 접근 위험을 언급하며 macOS 전체 디스크 접근 통제 강화를 예고했습니다. 현재 권한 범위와 향후 계획을 구분합니다."
slug: "apple-full-disk-access-ai-agent-controls"
publishedAt: "2026-10-04"
updatedAt: "2026-11-23"
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

로컬 파일이나 코드를 정리하는 AI 에이전트를 설치하다 보면, macOS 설정에서 ‘전체 디스크 접근(Full Disk Access)’ 권한을 켜 달라는 요청을 종종 만나게 됩니다. 작업 폴더 하나만 맡기려다 메일함과 메시지 기록까지 여는 셈이라 부담스러웠을 텐데요. 이 문제를 두고 Apple이 **2026년 10월 2일**, macOS의 전체 디스크 접근 권한에 추가 통제를 도입해 사용자가 파급 효과를 이해한 뒤 훨씬 명시적으로 승인하도록 바꾸겠다고 예고했습니다([Apple 공식 발표](https://developer.apple.com/news/?id=p6zjojqw)).

글·해설: 다메카솔

## 작업 폴더 하나를 여는 권한과는 범위가 다릅니다

![위치별 폴더 접근과 메일·메시지 등 다른 앱 데이터까지 포함하는 전체 디스크 접근의 범위 비교](./page-01.webp)

macOS의 전체 디스크 접근 권한은 사용자가 열어 준 작업 폴더만 읽고 쓰는 수준을 크게 넘어섭니다. [Apple 지원 문서](https://support.apple.com/en-mt/guide/mac-help/-mchl211c911f/mac)를 보면 메일·메시지·Safari 데이터와 Time Machine 백업, 일부 시스템 관리 설정까지 이 권한 범위에 포함되거든요. 원래 백업 유틸리티처럼 시스템 전체를 읽어야 하는 앱을 위해 기존 개인정보 보호 통제를 폭넓게 우회하도록 만든 권한입니다.

예를 들어 특정 프로젝트 폴더 안의 문서와 코드만 정리하는 로컬 코딩 에이전트를 생각해 볼까요? 실제 작업에는 지정된 저장소 디렉터리만 읽고 쓰면 충분하지만, 초기 설정 절차를 줄인다는 이유로 전체 디스크 접근을 요구하는 사례가 있습니다. 권한을 허용한다고 해서 데이터가 즉시 외부로 전송된다는 의미는 아니지만, 메일함이나 메시지 기록까지 읽을 수 있는 열쇠가 앱 프로세스에 그대로 주어집니다.

Apple 역시 최근 일부 개발자의 권한 요청 방식 때문에 이용자가 위험을 충분히 인지하지 못한 채 민감한 데이터를 노출할 수 있다고 경고했습니다. 특히 메시지 데이터가 접근 범위에 들어가면 본인뿐 아니라 대화 상대방의 개인정보까지 함께 영향을 받을 수 있다는 점도 짚었죠. 이번 발표문은 특정 앱 이름이나 실제 유출 사건을 직접 지목하기보다, AI 에이전트의 자율성과 실행 능력이 커질수록 광범위한 디스크 권한의 위험도 함께 커진다는 배경을 강조했습니다.

## 지금 점검할 설정과 앞으로 바뀔 승인 방식

![현재 앱 권한 점검과 향후 명시적 승인 강화 계획을 분리한 개념 장면](./page-02.webp)

현재 macOS에서도 폴더 단위 접근과 전체 디스크 접근은 별도 설정으로 분리되어 있습니다. 시스템 설정의 ‘개인정보 보호 및 보안’ 메뉴에서 **파일 및 폴더** 항목을 열면 데스크탑·다운로드·문서 폴더 등 위치별 접근을 앱마다 켜거나 끌 수 있습니다([파일 및 폴더 접근 안내](https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac)). 메뉴 표기는 OS 버전과 언어 설정에 따라 조금씩 다를 수 있지만, 작업 폴더만 열어 주는 통로와 시스템 전체를 여는 통로는 이미 구분된 상태입니다.

이번에 Apple이 예고한 계획은 앞으로 전체 디스크 접근을 부여할 때 **매우 명시적인 사용자 행동(very explicit user action)**을 요구하겠다는 점입니다. 이용자가 권한의 파급 효과를 분명히 확인한 뒤 승인하도록 문턱을 한층 높이겠다는 방향이죠. 구체적인 적용 날짜와 대상 macOS 버전, 새 승인 UI 형태, 기존에 부여된 권한의 처리 방식은 발표문에 명시되지 않아 후속 공지를 지켜보아야 합니다.

| 구분 | 현재 확인된 내용 |
| --- | --- |
| **파일 및 폴더 (현재)** | 데스크탑·다운로드·문서 등 위치별 접근을 앱마다 켜고 끔 |
| **전체 디스크 접근 (현재)** | 기존 통제를 우회해 메일·메시지·Safari 데이터, Time Machine 백업, 일부 관리 설정까지 포함 |
| **추가 통제 계획 (향후)** | 파급 효과 안내와 매우 명시적인 사용자 행동을 거쳐 승인하도록 강화 |
| **미공개 후속 항목** | 적용 날짜, 대상 macOS 버전, 새 승인 UI, 기존 부여 권한 처리 방식 |

## 다메카솔의 해석: 필요한 데이터 경계부터 좁혀 보세요

로컬 AI 에이전트를 쓰거나 개발할 때는 에이전트가 실제로 다룰 데이터 범위와 앱이 요청하는 권한을 나란히 대조해야 합니다. 특정 프로젝트 폴더만 정리하는 도구가 메일이나 브라우저 데이터까지 여는 전체 디스크 접근을 요구한다면 도입 전에 권한 범위를 다시 점검할 필요가 있습니다. 서버로 넘어간 데이터 처리 조건을 검증하는 [Gboard 연합학습 이야기](/posts/google-gboard-verifiable-federated-learning/)처럼, 로컬 기기에서도 누가 어디까지 읽을 수 있는지 경계를 좁히는 일이 보안의 출발점이거든요.

개발자 입장에서는 권한이 거절되거나 철회되는 상황까지 정상 흐름으로 설계하는 것이 중요합니다. 가령 사용자가 전체 디스크 접근을 거절했을 때 앱이 오류만 띄우고 전체 권한을 다시 요구하기보다, 필요한 폴더만 선택해 작업을 이어 갈 대안 경로와 복구 안내를 제공해야 합니다. 거절과 철회 뒤의 중단·안내 경로를 미리 테스트해 두면, 앞으로 Apple의 승인 절차가 까다로워져도 제품 경험을 안정적으로 유지할 수 있습니다.

- **권한과 작업 범위 대조**: 특정 폴더만 다루는 에이전트라면 전체 디스크 접근 대신 위치별 파일·폴더 권한으로 제한합니다.
- **거절·철회 시 대안 경로 설계**: 전체 권한이 거절되거나 철회되어도 폴더 재선택 안내를 통해 최소 권한 상태로 동작하게 만듭니다.
- **현재 설정 점검과 후속 공지 확인**: ‘개인정보 보호 및 보안’에서 과도한 권한을 받은 앱을 정리하고, 추후 공개될 적용 시점·대상 버전과 새 승인 방식을 확인합니다.

## 출처

- [Apple Developer 발표, 2026-10-02](https://developer.apple.com/news/?id=p6zjojqw)
- [Apple Support: 파일 및 폴더 접근](https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac)
- [Apple Support: 개인정보 보호 및 보안 설정](https://support.apple.com/en-mt/guide/mac-help/-mchl211c911f/mac)

이 글은 Apple의 공식 1차 발표와 지원 문서를 바탕으로 정리했으며, 향후 도입될 새 통제 화면을 직접 시험하거나 별도 보안 감사를 수행한 결과는 포함하지 않습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
