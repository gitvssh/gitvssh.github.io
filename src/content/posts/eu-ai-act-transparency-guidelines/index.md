---
title: "EU AI 투명성 규칙, 챗봇과 생성 콘텐츠에 무엇을 요구하나"
description: "EU AI Act 제50조 가이드라인이 provider와 deployer에게 요구하는 상호작용 고지, 기계 판독 표식, 사람용 표시와 사람 검토 조건을 설명합니다."
slug: "eu-ai-act-transparency-guidelines"
publishedAt: 2026-07-21
updatedAt: 2026-07-21
track: news
subtype: announcement_analysis
tags:
  - EU AI Act
  - AI 투명성
  - 생성 콘텐츠
  - 딥페이크
audience: builder
readerOutcome: "AI Act 제50조의 provider·deployer 의무를 구분하고 제품별 투명성 점검 항목을 만들 수 있습니다."
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

유럽연합 집행위원회는 2026년 7월 20일 AI Act 제50조 투명성 가이드라인을 공개했습니다. 관련 의무는 8월 2일부터 적용됩니다. 핵심은 ‘AI를 썼다’는 문구 하나가 아닙니다. 시스템을 만드는 **provider**는 상호작용 고지와 생성물의 기계 판독 표식을 설계하고, 시스템을 업무에 사용하는 **deployer**는 감정·생체 분석, 딥페이크, 특정 공익 텍스트를 접하는 사람에게 필요한 표시를 해야 합니다.

글·해설: 다메카솔

이 글은 집행위원회의 공식 가이드라인과 FAQ를 개발·운영 관점에서 정리한 자료이며 법률 자문이 아닙니다. 실제 적용 여부는 서비스 역할, 이용자 위치와 사용 방식에 따라 별도로 검토해야 합니다.

## 먼저 provider와 deployer를 나눠야 합니다

같은 회사도 기능에 따라 두 역할을 모두 맡을 수 있습니다. Provider는 AI 시스템을 개발하거나 개발하게 한 뒤 자기 이름으로 유럽연합 시장에 내놓거나 사용을 시작하는 주체입니다. Deployer는 개인적·비업무 목적을 제외하고 자기 권한 아래 AI 시스템을 사용하는 주체입니다.

유럽연합 밖의 provider도 출력이 유럽연합에서 쓰이면 적용 대상이 될 수 있다고 공식 FAQ는 설명합니다. 회사가 어디에 있는지만 보고 판단하기 어려운 이유입니다. 제품 기능별로 누가 시스템을 제공하고 누가 운영하는지 먼저 적어 두어야 뒤의 의무를 배치할 수 있습니다.

## Provider는 두 가지를 시스템에 넣어야 합니다

![provider가 사람과 AI의 첫 상호작용 고지와 합성 출력의 기계 판독 표식을 서로 다른 설계 의무로 구현하는 과정](./page-01.webp)

사람과 직접 대화하는 챗봇·AI 에이전트·아바타라면 이용자가 AI와 상호작용한다는 사실을 알 수 있게 설계해야 합니다. 상호작용이 AI라는 점이 명백하지 않다면 첫 상호작용이 시작될 때부터 명확하고 구분되는 방식으로 알려야 합니다. 접근성 요건도 따라야 합니다.

합성 음성·이미지·영상·텍스트를 만드는 시스템에는 별도의 의무가 붙습니다. Provider는 출력에 기계가 읽을 수 있는 표식을 넣어 AI 생성 또는 조작 여부를 탐지할 수 있게 해야 합니다. 조문은 기술적으로 가능한 범위에서 그 방법이 효과적이고 신뢰할 수 있으며 견고하고 상호운용 가능해야 한다고 요구합니다.

두 의무는 서로 바꿀 수 없습니다. 대화창의 “AI입니다” 고지는 생성 파일의 기계 표식이 아니고, 파일 속 메타데이터는 사람에게 첫 대화를 알리는 고지가 아닙니다.

## Deployer는 사람이 노출되는 순간을 봅니다

![deployer가 감정·생체 분류, 딥페이크, 공익 텍스트에 사람이 노출될 때 서로 다른 투명성 표시를 더하는 과정](./page-02.webp)

감정 인식이나 생체 분류 시스템을 업무에 쓰는 deployer는 그 시스템에 노출되는 사람에게 작동 사실을 알려야 합니다. 실시간 분석뿐 아니라 사후 처리에도 해당할 수 있습니다.

딥페이크에는 사람이 이해할 수 있는 표시가 필요합니다. 늦어도 처음 노출될 때 AI가 생성하거나 조작한 콘텐츠라는 사실을 명확하고 구분되게 밝혀야 합니다. Provider가 파일에 기계 판독 표식을 넣었다고 해서 deployer의 눈에 보이는 표시 의무가 끝나는 것은 아닙니다.

공익 사안을 알리려는 AI 생성·조작 텍스트도 deployer 표시 대상이 될 수 있습니다. 공식 FAQ는 텍스트가 게시되고, 대중에게 정보를 제공하며, 공적 논의와 관련된 사안을 다루는지를 봅니다. 다만 관련 지식과 전문적 판단을 가진 사람이 내용을 실질적으로 검토하거나, 책임 있는 편집 주체가 내용을 승인·수정·거부하고 최종 책임을 지면 예외가 적용될 수 있습니다. 맞춤법이나 문법만 고치는 형식적 점검은 충분하지 않습니다.

## 예외와 유예는 의무별로 읽어야 합니다

![카솔이 소스 코드·기계 간 출력·표준 편집의 조건부 예외와 8월 2일 적용, 기존 시스템 표식의 제한적 유예를 구분하는 만화](./page-03.webp)

모든 생성 출력에 같은 표식을 붙이는 구조는 아닙니다. 집행위원회 FAQ가 범위 밖의 예로 든 항목에는 짧은 숫자·기호·문자열, 소스 코드, 사람에게 노출되지 않는 기계 간 출력, 최종 결과가 되기 전 폐쇄형 제작 환경의 출력 등이 있습니다. 표준 편집을 돕거나 입력 의미를 실질적으로 바꾸지 않는 기능에도 예외가 있을 수 있습니다. 실제 예외는 가이드라인의 세부 조건을 확인해야 합니다.

날짜도 한 줄로 뭉치면 안 됩니다. 제50조 의무는 2026년 8월 2일부터 적용됩니다. 그 전에 시장에 나온 시스템은 생성 콘텐츠의 표식·탐지 의무에 한해서만 12월 2일까지 제한적 유예가 있습니다. 다른 투명성 의무를 모두 늦추는 일반 유예가 아닙니다. 8월 2일 전에 만들어진 콘텐츠를 소급 표시할 의무는 없지만, 집행위원회는 가능하면 표시할 것을 권장합니다.

## 다메카솔의 해석: 투명성 기능을 네 칸으로 관리하세요

이번 가이드라인을 제품 요구사항으로 옮기려면 역할과 출력 경로를 함께 기록해야 합니다.

- 역할: 기능별 provider와 deployer가 누구인지 정합니다.
- 상호작용 고지: 첫 대화나 노출 시점에 사람이 AI임을 알 수 있는지 확인합니다.
- 두 종류의 표시: 파일의 기계 판독 표식과 화면·음성의 사람용 표시를 따로 시험합니다.
- 사람 검토: 공익 텍스트에 실질 검토, 편집 권한, 최종 책임을 누가 가졌는지 증거로 남깁니다.

집행위원회의 Code of Practice는 생성 콘텐츠 표식과 라벨링 의무를 입증하는 자발적 도구입니다. 참여하지 않는 provider나 deployer도 다른 충분한 방법으로 준수를 입증해야 할 수 있습니다. 기술 구현과 편집 절차를 한 정책 문구로 덮지 말고, 실제 제품 흐름에서 각각 시험할 이유입니다.

## 출처

- [유럽연합 집행위원회 보도자료 — Commission publishes guidelines on transparency obligations](https://digital-strategy.ec.europa.eu/en/news/commission-publishes-guidelines-transparency-obligations-providers-and-deployers-certain-ai-systems)
- [집행위원회 가이드라인 개요 — Guidelines on Transparency of AI-Generated Content](https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content)
- [집행위원회 공식 FAQ — Transparency obligations under Article 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [AI Act Service Desk — Article 50 조문](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50)

이 글의 만화 이미지는 AI로 생성했습니다.
