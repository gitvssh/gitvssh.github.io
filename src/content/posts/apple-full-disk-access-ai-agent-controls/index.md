---
title: "Apple, AI 에이전트 시대의 전체 디스크 접근 통제 강화 예고"
description: "Apple이 AI 에이전트의 데이터 접근 위험을 언급하며 macOS 전체 디스크 접근 통제 강화를 예고했습니다. 현재 권한 범위와 향후 계획을 구분합니다."
slug: "apple-full-disk-access-ai-agent-controls"
publishedAt: "2026-10-04"
updatedAt: "2026-10-04"
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

**AI 에이전트에게 파일 작업을 맡길 때는 접근을 허용하는 범위부터 살펴봐야 합니다.** Apple은 2026년 10월 2일 macOS의 전체 디스크 접근(Full Disk Access)에 추가 통제를 도입하겠다고 발표했습니다. 사용자가 그 영향을 이해하고 더 명시적으로 권한을 부여하게 하겠다는 계획입니다. 적용 날짜와 대상 버전은 발표문에 제시되지 않았습니다. [Apple 공식 발표](https://developer.apple.com/news/?id=p6zjojqw)

## 폴더 하나를 여는 권한보다 넓습니다

![위치별 폴더 접근과 메일·메시지 등 다른 앱 데이터까지 포함하는 전체 디스크 접근의 범위 비교](./page-01.webp)

전체 디스크 접근에는 다른 앱의 데이터도 들어갑니다. Apple 지원 문서는 메일·메시지·Safari 데이터, Time Machine 백업, 일부 관리 설정을 그 예로 듭니다. 작업 폴더를 읽는 데 필요한 범위와 앱이 요청한 권한을 비교해야 하는 이유입니다. [현재 권한 범위](https://support.apple.com/en-mt/guide/mac-help/-mchl211c911f/mac)

Apple은 백업 앱이 동작하도록 이 권한이 기존 개인정보 보호 통제를 크게 우회한다고 설명합니다. 일부 개발자의 사용 방식 때문에 이용자가 충분히 이해하지 못한 데이터 노출이 생길 수 있으며, 메시지 상대의 개인정보에도 영향이 갈 수 있다는 경고입니다. 구체적인 앱이나 확인된 유출 사건은 이번 발표에서 지목하지 않았습니다. [발표의 위험 설명](https://developer.apple.com/news/?id=p6zjojqw)

범위가 핵심입니다. 그림의 열쇠와 보관함은 접근 범위를 설명하는 비유이며, 실제 설정 화면이나 데이터 유출을 재현한 장면은 아닙니다.

## 지금 확인할 설정, 앞으로 바뀔 승인 방식

![현재 앱 권한 점검과 향후 명시적 승인 강화 계획을 분리한 개념 장면](./page-02.webp)

현재도 Mac의 시스템 설정에서 개인정보 보호 및 보안 항목을 살펴볼 수 있습니다. Apple의 파일 및 폴더 안내는 데스크탑·다운로드·문서 등 위치별 접근을 앱마다 켜거나 끄도록 설명합니다. 전체 디스크 접근은 같은 설정 영역의 별도 항목입니다. 운영체제 버전과 언어에 따라 표기는 달라질 수 있습니다. [파일 및 폴더 접근 안내](https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac)

이번 발표에서 추가한 것은 앞으로의 통제 방향입니다. Apple은 AI 에이전트의 능력과 자율성이 커질수록 광범위한 접근 권한의 위험도 커진다고 보고, 매우 명시적인 사용자 행동을 거쳐 이 권한을 부여하게 하겠다고 밝혔습니다. 새 승인 화면과 기존 권한의 처리 방식은 아직 확인할 수 없습니다. [추가 통제 계획](https://developer.apple.com/news/?id=p6zjojqw)

| 구분 | 확인한 내용 |
| --- | --- |
| 현재 문서 | 위치별 파일 접근과 전체 디스크 접근을 구분 |
| 발표한 계획 | 전체 디스크 접근 승인에 더 명시적인 사용자 행동 요구 |
| 후속 확인 | 적용 시점, 대상 버전, 기존 권한 처리 방식 |

## 다메카솔의 해석: 필요한 데이터부터 좁혀 봅니다

저는 에이전트의 작업 설명과 실제 데이터 접근 범위를 나란히 놓고 검토하겠습니다. 예를 들어 문서 폴더를 정리하는 작업이라면, 메일이나 백업 데이터까지 읽어야 하는 이유가 있는지부터 묻는 방식입니다. 이는 Apple이 제시한 구현 절차가 아니라 공개 자료에서 도출한 설계 관점입니다.

거절 이후도 중요합니다. 앱을 만드는 입장에서는 접근을 거절하거나 철회했을 때 작업이 어디서 멈추고 어떤 복구 안내를 보여 주는지 확인해야 합니다. 권한을 넓히는 안내만 있으면 사용자는 실제로 필요한 범위를 판단하기 어렵습니다. 이 글에서 macOS 앱을 직접 시험한 것은 아니므로, 이 부분은 검증을 마친 결과가 아닌 테스트 제안입니다.

서버로 보낸 데이터의 처리 조건을 다룬 [Gboard 연합학습 이야기](/posts/google-gboard-verifiable-federated-learning/)와도 맞닿는 질문이 있습니다. 데이터가 어느 컴퓨터에 있느냐와 별개로, 누가 어떤 작업에 접근을 허용받았는지 드러나야 한다는 점입니다. Apple의 다음 발표에서는 이 범위를 사용자가 승인 순간에 얼마나 구체적으로 확인하게 될까요?

## 출처

- [Apple Developer 발표, 2026-10-02](https://developer.apple.com/news/?id=p6zjojqw)
- [Apple Support: 파일 및 폴더 접근](https://support.apple.com/guide/mac-help/control-access-to-files-and-folders-on-mac-mchld5a35146/mac)
- [Apple Support: 개인정보 보호 및 보안 설정](https://support.apple.com/en-mt/guide/mac-help/-mchl211c911f/mac)

모두 Apple의 1차 자료이며, 새 통제를 직접 사용하거나 독립 보안 감사를 수행한 결과는 포함하지 않습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
