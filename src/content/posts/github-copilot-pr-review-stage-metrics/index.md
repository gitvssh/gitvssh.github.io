---
title: "Copilot 지표에 PR 대기 구간이 생겼다: 사람 리뷰만 집계"
description: "GitHub의 새 PR 리뷰 시간 지표가 나누는 세 구간, 사람 리뷰 집계 범위, 빈 배열과 0의 차이, 조회 조건을 정리합니다."
slug: "github-copilot-pr-review-stage-metrics"
publishedAt: "2026-09-28"
updatedAt: "2026-10-18"
track: "news"
subtype: "announcement_analysis"
tags: ["AI 코딩", "개발 도구"]
audience: "developer"
readerOutcome: "PR 리뷰의 세 대기 구간을 구분하고 사람 리뷰만 집계하는 범위를 확인해 AI 효과를 과장하지 않는다."
contentFormats: ["article", "comic", "table"]
freshnessStatus: "current"
reviewedAt: "2026-09-28"
reviewAfter: "2026-10-05"
cover: "./cover.webp"
coverAlt: "카솔이 PR 대기의 세 구간을 살펴보며 집계 기준을 묻는 표지"
sourceUrl: "https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/"
featured: false
draft: false
---

글·해설: 다메카솔

발행·확인: 2026-09-28

**Copilot 사용량 보고서에 새로 추가된 풀 리퀘스트(PR) 리뷰 대기 시간은 현재 사람의 리뷰만을 기준으로 계산합니다.** GitHub는 2026년 9월 25일 저장소별 사용량 지표 API에 PR이 병합되기까지의 세 가지 대기 구간을 추가했습니다. AI 코딩 도구를 쓰는 팀에서도 실제 코드가 병합되기까지 어느 구간에서 시간이 지체되는지 나누어 살필 수 있게 된 변화입니다. ([공식 발표](https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/))

## 병합까지 걸린 시간을 세 구간으로 나눕니다

![하나의 긴 대기 경로가 첫 리뷰 전, 리뷰 사이, 마지막 리뷰 후의 세 구간으로 드러나는 그림](./page-01.webp)

조직·엔터프라이즈의 `repos-1-day` 보고서에 추가된 `pull_request_review_times` 배열은 각 구간의 분 단위 중앙값(median)과 상위 10% 지연(p90)을 함께 제공합니다.

| 구간 | 시작과 끝 기준 | 살펴볼 수 있는 병목 |
| --- | --- | --- |
| 첫 리뷰 전 | 리뷰 준비 완료 → 첫 번째 리뷰 | 첫 리뷰어 배정 및 응답 대기 시간 |
| 리뷰 사이 | 첫 번째 리뷰 → 마지막 리뷰 | 리뷰 의견 반영과 재검토 왕복 시간 |
| 마지막 리뷰 후 | 마지막 리뷰 → PR 병합 | 최종 리뷰 이후 배포·병합 게이트 대기 시간 |

여기서 ‘마지막 리뷰’는 반드시 승인(Approve)만을 뜻하지 않으며, 병합 전에 남겨진 **마지막 사람 리뷰 시점**을 기준으로 삼습니다.

## 누가 남긴 리뷰인지, 분모가 어떻게 다른지 봐야 합니다

![사람이 작성하고 동료가 리뷰한 PR의 시간만 재며, 봇 리뷰는 별도로 두는 카솔](./page-02.webp)

보고서 수치를 읽을 때 가장 주의해야 할 조건은 집계 대상과 분모입니다. ([필드 정의](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics))

- **사람 작성·동료 사람 리뷰만 포함**: 사람이 작성하고 다른 사람이 리뷰한 PR만 집계합니다. Copilot이나 다른 봇이 작성·리뷰한 내역, 그리고 작성자 본인이 남긴 셀프 리뷰는 시간 계산에서 제외됩니다(사람과 Copilot이 함께 리뷰한 PR은 포함하되 사람 리뷰 시각으로만 계산합니다).
- **전체 병합 수와 다른 분모**: 같은 일자 보고서의 전체 병합 PR 수에는 들어갔더라도, 유효한 사람 리뷰가 없거나 리뷰 준비 시각·시각 순서가 맞지 않는 PR은 이 시간 배열 계산에서 빠집니다.
- **빈 배열(`[]`), `0`, 소급 적용 제한**: 해당 날짜에 조건을 만족하는 병합 PR이 없으면 `[]`가 반환되고, 유효한 사람 리뷰가 단 1회뿐인 PR은 첫 리뷰와 마지막 리뷰가 같아 ‘리뷰 사이’ 구간에 `0`을 기여합니다. 또한 모든 시간은 **병합일**에 귀속되며, 과거 데이터를 소급해 채우지 않고 2026년 9월 21일 이전에 리뷰 준비 상태가 된 PR은 제외됩니다.

이 보고서를 조회하려면 조직 소유자, 엔터프라이즈 소유자·청구 관리자 또는 Copilot 사용량 지표 조회 권한이 필요하며, REST API가 반환하는 다운로드 링크에서 저장소별 보고서를 내려받아 확인할 수 있습니다. ([API 문서](https://docs.github.com/en/rest/copilot/copilot-usage-metrics))

## 다메카솔의 해석: 병목과 AI 효과를 구분해서 읽기

앞서 소개한 [Copilot Memory를 보안 수정에 연결한 발표](/posts/github-agentic-autofix-copilot-memory/)가 에이전트의 작업 방식을 다뤘다면, 이번 업데이트는 팀의 리뷰 흐름을 관측하는 계기판에 가깝습니다. 첫 리뷰 전 대기가 길다면 리뷰어 배정과 알림 규칙을, 마지막 리뷰 후 대기가 길다면 CI 시간이나 병합 정책을 먼저 점검하는 식으로 원인을 좁힐 수 있습니다.

다만 이 지표만으로 AI 도구 도입의 순수한 인과 효과를 단정하기는 어렵습니다. [보안 API 과제에서 AI 코딩 도우미를 비교한 연구](/posts/copilot-security-api-study/)처럼 PR의 크기, 팀 인원 변화, 배포 주기를 함께 대조해야 하며, 특히 이 지표는 **병합된 PR만 병합일 기준으로 집계**하므로 아직 병합되지 못한 채 쌓여 있는 미결 PR이 얼마나 있는지도 별도로 함께 살펴야 합니다.

## 출처

- [GitHub 변경 공지](https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/) — 2026-09-25
- [사용량 지표 필드 정의](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) — 2026-09-28 확인
- [사용량 지표 REST API](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) — 2026-09-28 확인 (공식 문서 사양을 바탕으로 정리했으며 실제 조직 계정 API 호출 시험은 포함하지 않습니다).

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
