---
title: "Anthropic OSS Scanner: 무료 취약점 스캔, 검토는 누가 맡을까"
description: "Anthropic OSS Scanner의 무료 정기 점검과 신청 조건을 살펴봅니다. 사람이 사전 검토하지 않은 보고서를 받았을 때 유지보수자가 맡을 검증과 공개 기한도 정리합니다."
slug: "anthropic-oss-scanner-maintainer-review"
publishedAt: "2026-10-10"
updatedAt: "2026-10-18"
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

**Anthropic은 2026년 10월 8일 오픈소스 프로젝트를 무료로 정기 점검하는 OSS Scanner를 공개했습니다.** 신청해 심사를 통과한 프로젝트는 사람이 사전 검토하지 않은 AI 취약점 보고서를 직접 받아보게 되며, 발견 결과를 더 일찍 확인할 수 있는 만큼 유지보수 팀의 자체 검토 여력도 함께 중요해집니다. ([공식 발표](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source))

## 보고서를 전달하기 전에 누가 확인하나

![사람의 검토를 거쳐 전달하던 경로에 AI 보고서를 유지보수자가 직접 받는 선택지가 추가되는 장면](./page-01.webp)

기존에는 Anthropic의 연구원이 직접 검토한 취약점을 조정된 공개 절차(CVD)에 따라 유지보수자에게 전달했습니다. OSS Scanner에 가입한 프로젝트는 이 사전 검토를 기다리지 않고 모델이 만든 보고서를 곧바로 받는 경로를 선택할 수 있으며, 사람의 사전 검토가 필요한 프로젝트에는 기존 전달 경로도 계속 유지됩니다. ([Cyber Mission 발표](https://www.anthropic.com/news/anthropic-cyber-mission))

보고서에는 문제를 재현하는 예제와 설명, 그리고 가능한 경우 수정 후보가 함께 담깁니다. 문제를 바로 확인해 보기 좋은 구성이지만, Anthropic 스스로도 오탐이나 과장된 심각도 판단이 포함될 수 있다고 밝힌 만큼 실제 유효성 판단은 수신한 팀의 몫입니다. ([연구팀의 서비스 설명](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source))

## 신청 자격과 운영 방식

![프로젝트 참여를 협의한 뒤 카솔과 유지보수자가 시계 옆에서 수리한 기어를 검토하는 장면](./page-02.webp)

누구나 즉시 실행하는 범용 스캐너와 달리, OSS Scanner는 공식 등록 저장소에 핵심 유지보수자가 PR을 보내면 Anthropic이 프로젝트의 중요도와 신청자 자격을 건별로 심사합니다. 인프라·사용자 보안에 미치는 영향과 함께, 이미 검증된 고위험 보고서를 처리할 여력이 있는 프로젝트를 대상으로 삼습니다. ([신청 자격 FAQ](https://red.anthropic.com/oss-scanner))

등록과 수신 과정에서 알아 둘 실무 조건은 세 가지입니다. ([등록 저장소 안내](https://github.com/anthropics/oss-scanner))

- **격리된 감사 환경**: 프로젝트 설정과 빌드용 Dockerfile을 제출하면, 처음 환경을 구성할 때만 네트워크를 쓰고 실제 보안 감사는 인터넷 연결 없이 진행합니다. 위협 모델 문서를 함께 넣어 검사 범위나 팀의 심각도 기준을 전달할 수도 있습니다.
- **공개 연락처와 수신 일시 중지**: 설정 파일에 적는 이메일 주소는 저장소에 공개되므로 공개 가능한 보안 연락처를 써야 하며, 검토가 밀릴 때는 설정의 `disabled: true`로 보고서 수신을 잠시 멈출 수 있습니다.
- **90일 공개 기한의 적용 조건**: 사람이 검토하지 않은 OSS Scanner 보고서에는 현재 90일 공개 기한이 부과되지 않습니다. 이후 Anthropic이 사람 검토를 마쳐 기존 CVD 절차로 전환되면 그때부터 통지일 기준 90일 정책이 적용될 수 있으며, 향후 일부 고위험 보고서에 기한을 도입할 경우에는 사전 고지와 탈퇴 선택권을 제공할 계획입니다. ([현재 공개 정책과 향후 변경 안내](https://red.anthropic.com/oss-scanner))

## 다메카솔의 해석: 발견 속도에 검토 시간을 맞춥니다

보고서를 더 일찍 받는 이점을 실제 보안 개선으로 연결하려면, 수신함에서 패치 배포까지 이어지는 팀 내부의 검토 경로가 먼저 준비돼 있어야 합니다. 재현 여부를 확인하고 실제 배포 환경의 영향을 따진 뒤, 제안된 수정 후보가 기존 동작을 깨뜨리지 않는지 회귀 테스트할 담당자 시간이 뒷받침되지 않으면 보고서가 빨리 도착해도 수신함에 쌓이기 쉽기 때문입니다.

앞서 다룬 [확장 CVP](/posts/anthropic-cvp-three-access-tiers/)가 방어 목적의 보안 업무에 모델 접근 권한을 여는 제도였다면, 이번 OSS Scanner는 오픈소스 프로젝트에 점검 결과를 직접 전달하는 프로그램입니다. 보고서 전달 속도가 빨라진 만큼 실제 패치까지 걸리는 시간도 줄어들지, 앞으로 참여 프로젝트들의 운영 경험과 검토 부담이 어떻게 나타나는지 함께 지켜볼 만합니다.

## 출처

- [Launching an opt-in vulnerability-finding service for open-source software](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)
- [Introducing the Anthropic Cyber Mission](https://www.anthropic.com/news/anthropic-cyber-mission)
- [OSS Scanner overview and FAQ](https://red.anthropic.com/oss-scanner)
- [anthropics/oss-scanner README](https://github.com/anthropics/oss-scanner)

공식 발표와 등록 저장소 문서를 바탕으로 정리했으며, 실제 가입 신청이나 스캔 결과 수신은 직접 시험하지 않았습니다. 이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
