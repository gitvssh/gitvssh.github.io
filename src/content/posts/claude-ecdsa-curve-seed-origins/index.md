---
title: "Claude가 찾은 ECDSA 시드의 기원: 공개 숫자가 만들어진 경로"
description: "Anthropic이 발표한 NIST ECDSA 곡선 시드 기원 연구를 살펴봅니다. 공개 시드와 개인키의 차이, 다섯 시드의 로컬 재현 결과와 아직 남은 질문을 정리합니다."
slug: "claude-ecdsa-curve-seed-origins"
publishedAt: "2026-10-17"
updatedAt: "2026-10-18"
track: "news"
subtype: "research_news"
tags: ["Claude", "보안"]
audience: "developer"
readerOutcome: "표준 곡선의 공개 시드 재현과 개인키 복구를 구분하고, 발표가 설명한 범위와 남은 질문을 이해한다."
contentFormats: ["article", "comic"]
freshnessStatus: "current"
reviewedAt: "2026-10-17"
reviewAfter: "2026-10-24"
cover: "./cover.webp"
coverAlt: "카솔이 시계와 숫자 생성 장치의 흔적을 살피는 장면"
sourceUrl: "https://www.anthropic.com/research/ecdsa-curve-origins"
featured: false
draft: false
---

글·해설: 다메카솔

발행·확인: 2026-10-17

Anthropic은 10월 16일, 내부 연구 모델 Claude가 **ECDSA 표준 곡선에 쓰인 공개 시드의 생성 경로**를 찾아냈다고 발표했습니다. 오래전 공개된 숫자를 다시 만들어 내는 계산 경로가 확인된 셈인데, 사용자의 비밀키를 알아낸 사건으로 오해하기보다 암호 표준의 설계 이력을 역추적한 연구로 읽으면 의미가 선명해집니다. ([공식 발표](https://www.anthropic.com/research/ecdsa-curve-origins))

## 먼저, 어떤 시드였을까

2023년 Filippo Valsorda가 올린 현상금 공고에는 이미 다섯 NIST 곡선의 시드가 공개돼 있었습니다. 당시의 질문은 그 값을 **처음에 어떤 방식으로 골랐는지**였으며, 공고문은 영어 문장을 해시했을 것이라는 가설을 소개하면서도 전해 들은 기억이 부정확할 가능성을 함께 열어 두었습니다. ([당시 공고](https://words.filippo.io/seeds-bounty/))

| 구분 | 이 글에서 뜻하는 것 |
| --- | --- |
| 곡선 생성 시드 | 표준 곡선의 일부 매개변수를 만들 때 사용한 공개 입력 |
| 사용자 개인키 | 사용자별로 비밀을 유지해야 하는 키 |

같은 ‘시드’라는 단어를 암호화폐 지갑 복구 문구나 개인키 생성 시드와 혼동하면 사건의 성격을 잘못 짚게 됩니다. 이번 연구가 다룬 대상은 처음부터 표준 문서에 공개돼 누구나 읽을 수 있었던 숫자였습니다.

## 시계에서 출발한 계산을 다시 돌려 보면

![시계에서 시작한 의사난수 생성 과정과 일치하는 공개 시드의 개념도](./page-01.webp)

Anthropic이 찾아낸 경로는 영어 문장 해시가 아니라, Unix 시각으로 초기화한 C 계열 의사난수 생성기 `lrand48`이었습니다. 기존 가설에 매달리는 대신 당시 소프트웨어 환경의 의사난수 출력 패턴을 살핀 것이 핵심 단서가 됐다는 설명입니다. ([발견 경위와 공개 코드](https://www.anthropic.com/research/ecdsa-curve-origins#how-it-was-found))

이 글을 준비하며 발표문에 공개된 계산 방식을 Windows 환경의 Python 3.12.14에서 직접 실행해 **2023년 공고의 원래 시드 값**과 대조해 보았습니다.

| 대조 대상 | 확인 결과 |
| --- | --- |
| P-192 · P-224 · P-256 · P-384 · P-521 | 다섯 공개 시드 모두 일치 |

예를 들어 P-256은 발표문에 적힌 1997년 8월 16일 01:52:34 UTC를 시작값으로 넣고 1,842번째 후보를 택했을 때 원래 시드와 정확히 일치했습니다. 공개된 계산 절차로 동일한 결과가 재현됨을 확인한 것이며, Claude가 그 규칙을 처음 탐색한 과정이나 당시 설계자의 주관적 의도까지 별도로 검증한 것은 아닙니다.

## 설명된 기원과 남아 있는 질문

![공개 곡선과 닫힌 개인키 보관함을 구분해 설명하는 카솔](./page-02.webp)

Anthropic은 이번 발견을 ECDSA의 새로운 취약점이나 공격 기법으로 보지 않으며, 오히려 표준 곡선 매개변수에 임의의 백도어를 심기 어렵게 만드는 출처 단서로 평가합니다. 아울러 연구에 쓰인 모델은 내부 연구 모델로 소개됐을 뿐 일반 출시 안내는 없었고, 아래 질문들은 여전히 열린 과제로 남았습니다. ([의미와 열린 질문](https://www.anthropic.com/research/ecdsa-curve-origins#open-questions))

- **B-163 시드의 기원**: 이번 `lrand48` 경로로 함께 설명되지 않은 시드
- **기준점(base point) 생성 방식**: 곡선 시드 외에 여러 기준점이 만들어진 구체적 절차
- **후보 건너뛰기 이유**: 의사난수열에서 조건에 맞는 일부 후보를 지나치고 특정 순번을 택한 이유

## 다메카솔의 해석: 설명을 실행 가능한 형태로 남기기

이번 발표에서 가장 인상적이었던 대목은 **AI가 찾아낸 설명을 짧은 코드 한 벌로 누구나 즉시 대조해 볼 수 있게 남겼다는 점**입니다. 생성된 코드를 검토할 때도 모델의 장황한 부연 설명보다 입력과 기대 결과가 명확한 테스트 코드 한 줄이 훨씬 강력한 근거가 되듯, 기술 발표에서도 무엇을 직접 실행해 검증할 수 있는지 분리해 볼 필요가 있습니다.

앞서 다룬 [AI Scan의 탐지 결과와 검토 책임](/posts/github-ai-scan-advisory-merge-boundary/)이 도구가 찾은 문제를 누가 최종 판단할지에 관한 이야기였다면, 이번 사례는 주장을 뒷받침하는 검증 가능한 산출물의 힘을 보여 줍니다. 계산으로 되살린 생성 경로 너머에 왜 특정 순번의 후보들이 선택됐는지에 관한 역사적 기록도 언젠가 함께 밝혀지기를 기대합니다.

## 출처

- [Anthropic · Claude reveals ECDSA curve origins, 2026-10-16](https://www.anthropic.com/research/ecdsa-curve-origins)
- [Filippo Valsorda · NIST 곡선 시드 현상금 공고, 2023-10-05](https://words.filippo.io/seeds-bounty/)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
