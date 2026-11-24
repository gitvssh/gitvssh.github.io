---
title: "Anthropic OSS Scanner: 무료 취약점 스캔, 검토는 누가 맡을까"
description: "Anthropic OSS Scanner의 무료 정기 점검과 신청 조건을 살펴봅니다. 사람이 사전 검토하지 않은 보고서를 받았을 때 유지보수자가 맡을 검증과 공개 기한도 정리합니다."
slug: "anthropic-oss-scanner-maintainer-review"
publishedAt: "2026-10-10"
updatedAt: "2026-11-23"
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

오픈소스 프로젝트에서 취약점 제보는 반갑지만, 막상 보고서를 받으면 진짜 문제인지 재현해 보고 기존 기능에 영향이 없는지 살피는 데 적지 않은 시간이 듭니다. Anthropic이 **2026년 10월 8일** [공식 발표](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)로 공개한 **OSS Scanner**는 심사를 통과한 프로젝트에 무료 정기 보안 스캔을 제공하며, 사람이 사전 검토하지 않은 AI 보고서를 유지보수자에게 곧바로 전달하는 선택 가입 서비스입니다. 발견 시점을 앞당기는 만큼 보고서를 검증하고 패치할 팀 여력까지 함께 따져 봐야 하는 셈이죠.

글·해설: 다메카솔

## 사람 검토를 거치던 경로와 무엇이 달라지나

![사람의 검토를 거쳐 전달하던 경로에 AI 보고서를 유지보수자가 직접 받는 선택지가 추가되는 장면](./page-01.webp)

기존에는 Anthropic 연구원이 취약점을 직접 검토하고 분류한 뒤 조정된 공개 절차(CVD)에 따라 유지보수자에게 전달해 왔습니다. OSS Scanner는 이 사전 확인 단계를 기다리지 않고 AI 모델이 작성한 보고서를 곧바로 받는 선택지입니다. [Cyber Mission 발표](https://www.anthropic.com/news/anthropic-cyber-mission)에서 안내했듯 검토 인력이 부족해 사람의 사전 검토가 꼭 필요한 프로젝트를 위해 기존 CVD 전달 경로도 그대로 유지됩니다.

보고서에는 취약점 설명과 문제를 재현하는 예제가 담기며, 가능한 경우 수정 후보도 함께 포함돼 유지보수자 이메일로 전달됩니다. 문제를 빠르게 확인해 보기 좋은 구성이지만, [연구팀의 서비스 설명](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)에서도 오탐이 섞이거나 심각도가 부정확하게 매겨질 수 있다고 밝힌 만큼 실제 유효성 판별은 수신한 팀의 몫으로 넘어옵니다.

예를 들어 여러 서비스가 의존하는 오픈소스 네트워크 라이브러리 유지보수 팀을 떠올려 볼까요? 평소 외부 제보나 정기 점검으로 취약점을 파악하던 팀도 OSS Scanner가 보낸 재현 예제와 수정 후보를 메일로 먼저 받아 볼 수 있습니다. 모델이 실제 운영 환경과 다른 조건으로 판단해 심각도를 높게 잡았을 수도 있으므로, 팀은 제안을 곧장 병합하기보다 테스트 환경에서 재현 여부를 확인하고 기존 동작이 깨지지 않는지 먼저 따져 봐야 합니다.

기존 전달 경로와 새 선택 경로의 차이는 아래 표로 정리됩니다.

| 구분 | 기존 CVD 경로 | OSS Scanner 선택 경로 |
| --- | --- | --- |
| **사전 검토 주체** | Anthropic 연구원이 직접 검증·분류 | 사람 사전 검토 없이 AI 모델 보고서 수신 |
| **전달 내용** | 검증이 끝난 취약점 통지 | 설명·재현 예제·가능한 경우 후보 패치 (이메일) |
| **유효성 판별** | 전달 전 Anthropic 측 1차 검토 완료 | 수신한 유지보수 팀이 직접 검증과 영향 판단 |
| **90일 공개 기한** | 통지 기준 90일 공개 정책 적용 가능 | 미검증 보고서에는 현재 90일 기한 미부과 |

## 신청 자격과 등록 전 챙길 운영 조건

![프로젝트 참여를 협의한 뒤 카솔과 유지보수자가 시계 옆에서 수리한 기어를 검토하는 장면](./page-02.webp)

누구나 가입 즉시 실행하는 범용 스캐너와 달리, OSS Scanner는 건별 심사를 통과해야 참여할 수 있는 프로그램입니다. 핵심 유지보수자가 [anthropics/oss-scanner 등록 저장소](https://github.com/anthropics/oss-scanner)에 PR을 보내 신청하면, Anthropic이 유지보수자 신원과 프로젝트 중요도를 함께 확인합니다. [신청 자격 FAQ](https://red.anthropic.com/oss-scanner)에 따르면 중요 인프라와 사용자 보안에 미치는 영향이 크고, 이미 검증된 고위험 보고서를 처리할 여력이 있는 프로젝트를 대상으로 삼습니다.

등록을 준비하고 보고서를 받아 볼 때는 세 가지 실무 조건을 챙겨야 합니다.

- **빌드와 격리 감사 환경**: 프로젝트 설정과 빌드용 `Dockerfile`을 제출하면 최초 환경을 구성할 때만 네트워크를 쓰고, 이후 실제 감사는 인터넷 연결 없이 격리 환경에서 진행됩니다. 검사 범위나 팀의 심각도 기준을 전달하려면 위협 모델 문서를 선택 사항으로 함께 넣을 수 있습니다.
- **공개 연락처와 수신 일시 중지**: 설정 파일에 적는 이메일 주소는 공개 저장소에 드러나므로 README 권고대로 공개해도 무방한 보안 연락처를 써야 합니다. 검토 대기열이 밀릴 때는 설정의 `disabled: true` 옵션으로 보고서 수신을 잠시 멈출 수 있죠.
- **90일 공개 기한과 향후 정책 변경**: 사람이 검증하지 않은 OSS Scanner 보고서에는 현재 90일 공개 기한을 적용하지 않습니다. 이후 Anthropic이 사람 검토를 마쳐 기존 CVD 절차로 전환하면 통지 시점부터 90일 정책이 적용될 수 있으며, 향후 일부 고위험 보고서에 기한을 도입할 때는 사전 고지와 탈퇴 선택권을 제공할 계획입니다.

## 다메카솔의 해석: 받는 속도에 검토 시간을 맞춥니다

보고서를 일찍 받아 보는 이점을 실제 보안 개선으로 연결하려면, 수신함에서 패치 배포까지 이어지는 내부 검토 경로가 먼저 준비돼 있어야 합니다. 재현 여부를 확인하고 실제 배포 환경의 영향을 따진 뒤, 후보 패치가 기존 동작을 깨뜨리지 않는지 회귀 테스트할 담당자와 시간이 뒷받침돼야 하거든요. 자동 발견이 늘어나더라도 검토가 밀리면 실제 해결까지 걸리는 시간이 줄어들기 어렵습니다.

앞서 살펴본 [확장 CVP](/posts/anthropic-cvp-three-access-tiers/)가 방어 목적의 보안 업무에 모델 접근 권한을 여는 제도였다면, 이번 OSS Scanner는 오픈소스 프로젝트에 점검 결과를 직접 전달하는 프로그램입니다. 보고서 전달이 빨라진 만큼 실제 패치까지 걸리는 시간도 함께 줄어들지, 앞으로 참여 프로젝트들의 운영 경험과 검토 부담이 어떻게 나타나는지 지켜볼 만합니다.

## 출처

- [Launching an opt-in vulnerability-finding service for open-source software](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source)
- [Introducing the Anthropic Cyber Mission](https://www.anthropic.com/news/anthropic-cyber-mission)
- [OSS Scanner overview and FAQ](https://red.anthropic.com/oss-scanner)
- [anthropics/oss-scanner README](https://github.com/anthropics/oss-scanner)

이 글은 공식 발표와 등록 저장소 문서를 바탕으로 정리했으며, 실제 가입 신청이나 스캔 결과 수신은 직접 시험하지 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
