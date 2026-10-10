---
title: "Anthropic OSS Scanner: 무료 취약점 스캔, 검토는 누가 맡을까"
description: "Anthropic OSS Scanner의 무료 정기 점검과 신청 조건을 살펴봅니다. 사람이 사전 검토하지 않은 보고서를 받았을 때 유지보수자가 맡을 검증과 공개 기한도 정리합니다."
slug: "anthropic-oss-scanner-maintainer-review"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
track: "news"
subtype: "announcement_analysis"
tags: ["AI 보안", "AI 코딩 도구", "코드 리뷰"]
audience: "developer"
readerOutcome: "OSS Scanner의 신청 조건과 미검토 보고서 수신 방식을 이해하고 팀의 검토 역량에 맞춰 참여 여부를 판단한다."
contentFormats: ["article", "comic"]
freshnessStatus: "current"
reviewedAt: "2026-10-10"
reviewAfter: "2026-10-17"
cover: "./cover.webp"
coverAlt: "무료 정기 취약점 스캔 발표를 소개하며 보고서 검토 주체를 묻는 카솔"
sourceUrl: "https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source"
featured: false
draft: false
---

글·해설: 다메카솔

발행·확인: 2026-10-10

**Anthropic은 2026년 10월 8일 오픈소스 프로젝트를 무료로 정기 점검하는 OSS Scanner를 공개했습니다.** 신청해 심사를 통과한 프로젝트는 사람이 사전 검토하지 않은 AI 취약점 보고서를 받습니다. 유지보수자에게는 발견 결과를 더 일찍 받아볼 기회가 생기는 만큼, 이를 확인할 시간도 필요합니다. [공식 발표](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)

## 보고서를 전달하기 전에 누가 확인하나

![사람의 검토를 거쳐 전달하던 경로에 AI 보고서를 유지보수자가 직접 받는 선택지가 추가되는 장면](./page-01.webp)

기존에는 Anthropic의 사람이 검토한 취약점을 조정된 공개 절차(CVD)에 따라 유지보수자에게 전달했습니다. OSS Scanner에 가입하면 그 사전 검토를 기다리지 않고 모델이 만든 결과를 받습니다. 선택지가 하나 더 생긴 셈입니다. 사람 검토가 필요한 프로젝트에는 기존 경로를 계속 제공한다는 설명입니다. [Cyber Mission 발표](https://www.anthropic.com/news/anthropic-cyber-mission)

보고서에는 문제를 재현하는 예제와 설명이 들어가며, 가능한 경우 수정 후보도 붙습니다. 바로 손대기 좋은 재료지만 유효성은 확인해야 합니다. Anthropic도 잘못된 보고서나 과장된 심각도 판단이 나올 수 있다고 밝혔습니다. 그림 속 기어 점검은 이 검토 순서를 설명하는 비유입니다. [연구팀의 서비스 설명](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)

## 신청 전에 수신 이후의 일을 살펴봅니다

![프로젝트 참여를 협의한 뒤 카솔과 유지보수자가 시계 옆에서 수리한 기어를 검토하는 장면](./page-02.webp)

핵심 유지보수자가 공식 등록 저장소에 PR을 보내면 Anthropic이 프로젝트와 신청자를 확인합니다. 인프라·사용자 보안에 미치는 중요성 등을 기준으로 건별 심사하며, 이미 검증된 고위험 보고서를 처리할 여력이 있는 프로젝트를 대상으로 설명합니다. 누구나 즉시 쓰는 범용 스캐너와는 이용 조건이 다릅니다. [신청 자격 FAQ](https://red.anthropic.com/oss-scanner)

등록 준비물은 프로젝트 설정과 빌드용 Dockerfile입니다. 처음 환경을 만들 때는 네트워크를 사용하고, 보안 감사는 인터넷 연결 없이 진행합니다. 위협 모델 문서를 덧붙이면 검사 범위나 팀의 심각도 기준을 설명할 수 있습니다. 제가 확인한 범위는 공식 문서이며 실제 가입·스캔을 시험한 결과는 포함하지 않았습니다. [등록 저장소 안내](https://github.com/anthropics/oss-scanner)

연락처도 공개 범위를 봐야 합니다. 설정 파일의 이메일 주소는 공개되므로 공개 가능한 보안 연락처를 쓰는 편이 좋습니다. 보고서는 이메일로 받으며, 검토가 밀릴 때는 설정의 `disabled: true`로 수신을 잠시 멈출 수 있습니다. [설정과 일시 중지](https://github.com/anthropics/oss-scanner)

## 공개 기한은 보고서 상태에 따라 달라집니다

현재 미검증 보고서에는 90일 공개 기한을 부과하지 않습니다. 이후 Anthropic이 사람 검토를 마쳐 기존 CVD로 전환하면, 사람이 검증했다는 통지를 받은 날부터 90일 기준이 적용될 수 있습니다. 전환 조건이 중요합니다. 향후 일부 고위험 보고서에 공개 기한을 도입할 가능성은 사전 고지와 탈퇴 선택을 제공하는 계획으로 안내했습니다. [현재 공개 정책과 향후 변경 안내](https://red.anthropic.com/oss-scanner)

## 다메카솔의 해석: 발견 속도에 검토 시간을 맞춥니다

보고서 수신함에서 배포까지 이어지는 검토 경로가 준비됐는지가 제 판단 기준입니다. 재현 여부를 확인하고 실제 배포 환경의 영향을 따진 다음, 수정 후보가 기존 동작을 깨뜨리는지 회귀 테스트할 사람이 필요하기 때문입니다. 보고서가 빨리 도착해도 이 구간에 일이 쌓이면 패치까지 걸리는 시간은 그대로일 수 있습니다. 이는 발표 내용을 바탕으로 한 운영 설계 해석입니다.

역할도 구분해 볼 만합니다. 앞서 다룬 [확장 CVP](/posts/anthropic-cvp-three-access-tiers/)는 보안 업무에 맞는 모델 접근 권한을 다뤘고, 이번 서비스는 프로젝트에 점검 결과를 전달합니다. 보고서가 늘어난 만큼 패치도 빨라질까요? 이후에는 팀이 실제로 고친 문제와 검토에 들인 시간을 함께 살펴보고 싶습니다.

## 출처

- [Launching an opt-in vulnerability-finding service for open-source software](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)
- [Introducing the Anthropic Cyber Mission](https://www.anthropic.com/news/anthropic-cyber-mission)
- [OSS Scanner overview and FAQ](https://red.anthropic.com/oss-scanner)
- [anthropics/oss-scanner README](https://github.com/anthropics/oss-scanner)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
