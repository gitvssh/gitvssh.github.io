---
title: "EU AI 투명성 규칙, 챗봇과 생성 콘텐츠에 무엇을 요구하나"
description: "EU AI Act 제50조 투명성 의무 분석: AI 시스템 개발사(Provider)와 서비스 운영사(Deployer)가 각각 준수해야 할 상호작용 사전 고지, 기계 판독 워터마크, 그리고 UI 라벨링 엔지니어링 가이드라인을 정리합니다."
slug: "eu-ai-act-transparency-guidelines"
publishedAt: 2026-07-21
updatedAt: "2026-11-23"
track: news
subtype: announcement_analysis
tags:
  - "AI 규제"
  - "AI 윤리"
audience: builder
readerOutcome: "EU AI Act 제50조의 개발사(Provider) 및 운영사(Deployer)별 투명성 법적 의무를 이해하고, 생성형 AI 서비스에 필요한 기계 판독 메타데이터와 UI 고지 가드레일을 구축할 수 있다."
contentFormats:
  - article
  - comic
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-21
reviewAfter: 2026-08-02
cover: "./cover.webp"
coverAlt: "카솔이 AI 생성물에 기계 판독 신호와 사람에게 보이는 고지가 모두 있는지 점검하는 표지"
sourceUrl: "https://digital-strategy.ec.europa.eu/en/news/commission-publishes-guidelines-transparency-obligations-providers-and-deployers-certain-ai-systems"
featured: true
draft: false
---

유럽 이용자를 대상으로 챗봇이나 생성형 AI 기능을 제공하고 있다면, 화면에 "AI가 작성했습니다"라는 문구 하나만 띄워 두고 넘기기 어려워졌습니다. 2026년 7월 20일 유럽연합 집행위원회가 공개한 AI Act 제50조 투명성 가이드라인은 모델을 공급하는 **provider**와 서비스에 붙이는 **deployer**의 책임을 뚜렷하게 나누고 있거든요. 파일 속 기계 판독 표식과 사람이 보는 화면 고지를 별개의 의무로 요구합니다.

글·해설: 다메카솔

이 규칙은 회사 규모나 본사 위치가 아니라 기능별 역할에 따라 적용됩니다. 같은 회사라도 사내 모델로 기능을 만들어 공급하면 provider가 되고, 외부 API를 가져와 자사 서비스에 붙이면 deployer가 되는 셈이죠. 공식 FAQ는 유럽연합 밖의 provider라도 출력이 유럽연합에서 쓰이면 적용 대상이 될 수 있다고 설명합니다.

## Provider는 시스템 설계 단계에서 두 갈래를 챙겨야 합니다

![provider가 사람과 AI의 첫 상호작용 고지와 합성 출력의 기계 판독 표식을 서로 다른 설계 의무로 구현하는 과정](./page-01.webp)

가령 유럽 이용자도 쓰는 고객 지원 챗봇과 음성 안내 생성 도구를 함께 공급하는 팀을 떠올려 볼까요? 이 팀은 대화창의 상호작용 고지와 출력 파일의 기계 판독 표식을 따로 구현해야 합니다. 대화창에 "AI 챗봇입니다"라고 적어 두었다고 해서 생성 파일의 탐지 표식까지 해결되지는 않거든요.

챗봇·AI 에이전트·아바타처럼 사람과 직접 대화하는 시스템은 AI라는 점이 명백한 경우를 제외하면 첫 대화 시작부터 명확하고 구분되는 방식으로 고지하고 접근성 요건도 맞춰야 합니다. 한편 합성 음성·이미지·영상·텍스트 생성 시스템에는 기술적으로 가능한 범위에서 효과적이고 신뢰할 수 있으며 견고하고 상호운용 가능한 기계 판독 표식을 넣어 AI 생성·조작 여부를 탐지할 수 있게 해야 합니다.

## Deployer는 사람이 노출되는 순간을 기준으로 표시합니다

![deployer가 감정·생체 분류, 딥페이크, 공익 텍스트에 사람이 노출될 때 서로 다른 투명성 표시를 더하는 과정](./page-02.webp)

모델이나 API를 가져와 서비스를 운영하는 deployer는 이용자가 결과물에 노출되는 순간을 관리합니다. 감정 인식(emotion recognition)이나 생체 분류(biometric categorisation) 시스템을 업무에 쓴다면 실시간 분석뿐 아니라 사후 처리까지 포함해 노출 대상자에게 작동 사실을 알려야 합니다.

딥페이크 콘텐츠를 배포할 때는 늦어도 처음 노출되는 시점에 AI 생성·조작 사실을 명확하고 구분되게 표시해야 합니다. Provider가 원본 파일에 기계 판독 표식을 넣었더라도 deployer가 사람이 볼 수 있는 표시를 별도로 제공해야 한다는 점이 중요합니다.

공익 사안을 알리는 AI 생성·조작 텍스트도 게시·대중 정보 제공·공적 논의 관련 요건에 해당하면 표시 대상입니다. 다만 관련 지식과 전문 판단을 가진 사람이 내용을 실질 검토하거나, 책임 있는 편집 주체가 승인·수정·거부 권한과 최종 책임을 지면 예외가 적용될 수 있습니다. 실제로 뉴스룸 에디터가 AI 초안의 사실관계와 맥락을 검증해 최종 승인하는 경우와 달리, 맞춤법·문법만 다듬는 피상적 점검은 편집 통제로 인정받기 어렵습니다.

## 예외 범위와 적용 일정은 따로 떼어 읽어야 합니다

![카솔이 소스 코드·기계 간 출력·표준 편집의 조건부 예외와 8월 2일 적용, 기존 시스템 표식의 제한적 유예를 구분하는 만화](./page-03.webp)

모든 출력에 같은 표식을 붙이는 구조는 아니므로 예외 조건과 날짜별 유예를 구분해 읽어야 합니다. 가이드라인과 공식 FAQ의 핵심 기준을 정리하면 다음과 같은 구도로 나뉩니다.

| 구분 | 적용 기준·핵심 의무 | 예외·유예 조건 |
| --- | --- | --- |
| **Provider** | 첫 상호작용 고지(접근성 포함) · 합성물 기계 판독 표식 | 짧은 숫자·기호·문자열, 소스 코드, 기계 간 비노출 출력, 폐쇄형 제작 환경, 의미 불변경 표준 편집 보조는 범위 밖 예시 |
| **Deployer** | 감정·생체 분류 고지 · 딥페이크 가시 표시 · 공익 텍스트 표시 | 공익 텍스트는 전문 인력의 실질 검토 또는 편집 주체의 승인·수정·거부 및 최종 책임 시 예외(단순 맞춤법 교정 제외) |
| **적용 일정** | 제50조 의무: **2026년 8월 2일** 적용 | 8월 2일 이전 출시 시스템의 생성물 표식·탐지 의무만 **2026년 12월 2일**까지 제한적 유예 · 이전 제작물 소급 표시 의무 제외(표시 권장) |

가장 흔한 오해는 연말 유예를 전체 의무 연기로 받아들이는 경우입니다. 12월 2일까지의 유예는 기존 시스템의 표식·탐지 의무에만 한정되며, 상호작용 고지와 deployer의 가시적 라벨링은 8월 2일부터 바로 적용되거든요. 집행위원회의 Code of Practice는 자발적 준수 입증 도구이므로, 미참여 팀도 다른 충분한 방법으로 준수를 설명할 수 있어야 합니다.

## 다메카솔의 해석: 제품 흐름을 네 칸으로 나눠 점검하세요

실무에서 이 규칙을 반영할 때는 안내 배너 하나로 뭉뚱그리지 말고 역할과 출력 경로를 네 가지 점검 항목으로 나눠 관리하는 편이 안전합니다.

- **역할 정의**: 기능별로 우리 팀이 provider인지 deployer인지 먼저 구분해 둡니다.
- **상호작용 고지**: 챗봇·에이전트 진입 시 첫 대화부터 AI임을 알아볼 수 있는지와 접근성 요건을 확인합니다.
- **표식·표시 분리 검증**: 파일의 기계 판독 표식과 화면·음성의 사람용 표시를 각각 따로 시험합니다.
- **편집 통제 증빙**: 공익 텍스트 예외를 쓴다면 실질 검토와 승인·최종 책임 주체를 기록으로 남깁니다.

## 출처

- [유럽연합 집행위원회 보도자료 — Commission publishes guidelines on transparency obligations](https://digital-strategy.ec.europa.eu/en/news/commission-publishes-guidelines-transparency-obligations-providers-and-deployers-certain-ai-systems)
- [집행위원회 가이드라인 개요 — Guidelines on Transparency of AI-Generated Content](https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content)
- [집행위원회 공식 FAQ — Transparency obligations under Article 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [AI Act Service Desk — Article 50 조문](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50)

이 글은 유럽연합 집행위원회의 공식 가이드라인·FAQ·조문을 개발 및 서비스 운영 관점에서 정리한 해설이며 개별 서비스에 대한 법률 자문이 아닙니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
