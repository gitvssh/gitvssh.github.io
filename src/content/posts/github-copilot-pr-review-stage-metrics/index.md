---
title: "Copilot 지표에 PR 대기 구간이 생겼다: 사람 리뷰만 집계"
description: "GitHub의 새 PR 리뷰 시간 지표가 나누는 세 구간, 사람 리뷰 집계 범위, 빈 배열과 0의 차이, 조회 조건을 정리합니다."
slug: "github-copilot-pr-review-stage-metrics"
publishedAt: "2026-09-28"
updatedAt: "2026-09-28"
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

**Copilot 보고서에 추가된 리뷰 시간은 현재 사람의 리뷰를 기준으로 계산합니다.** GitHub는 2026년 9월 25일 저장소별 사용량 지표에 PR의 세 대기 구간을 추가했습니다. AI 도구를 쓰는 팀도 병합까지 어디서 시간이 걸리는지 살펴볼 수 있게 된 변화입니다. [공식 발표](https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/)

## 병합까지 걸린 시간을 구간으로 나눕니다

![하나의 긴 대기 경로가 첫 리뷰 전, 리뷰 사이, 마지막 리뷰 후의 세 구간으로 드러나는 그림](./page-01.webp)

조직·엔터프라이즈의 `repos-1-day` 보고서에 `pull_request_review_times` 배열이 생겼습니다. 각 구간은 분 단위 중앙값과 p90을 제공합니다. p90은 느린 쪽의 대기를 함께 살펴볼 때 참고할 값입니다.

| 구간 | 시작과 끝 |
| --- | --- |
| 첫 리뷰 전 | 리뷰 준비 → 첫 리뷰 |
| 리뷰 사이 | 첫 리뷰 → 마지막 리뷰 |
| 마지막 리뷰 후 | 마지막 리뷰 → 병합 |

GitHub는 이 구분으로 첫 응답 대기, 리뷰 왕복, 병합 전 대기를 살펴볼 수 있다고 설명합니다. 마지막 리뷰를 승인과 같은 뜻으로 읽으면 범위를 넓히게 됩니다. 필드는 **마지막 리뷰 시점**을 기준으로 합니다.

## 누가 남긴 리뷰인지 먼저 봐야 합니다

![사람이 작성하고 동료가 리뷰한 PR의 시간만 재며, 봇 리뷰는 별도로 두는 카솔](./page-02.webp)

집계 대상은 사람이 작성하고 다른 사람이 리뷰한 PR입니다. Copilot과 다른 봇, 작성자 본인의 리뷰는 시간 계산에서 빠집니다. 사람과 Copilot이 함께 리뷰한 PR은 포함하되 사람 리뷰 시각으로 계산합니다. [필드 정의](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics)

같은 보고서에서도 분모가 다릅니다. 전체 병합 수에는 들어가도 봇이 작성했거나 유효한 사람 리뷰가 없는 PR은 이 시간 배열에서 빠집니다. 준비 시각이 없거나 시각 순서가 맞지 않는 경우도 제외되므로, 집계 대상 수를 전체 병합 수와 함께 보아야 합니다.

빈 배열과 0도 구분합니다. 대상 PR을 병합하지 않은 날은 `[]`이고, 유효한 리뷰가 한 번이면 첫 리뷰와 마지막 리뷰가 같은 사건이라 그 사이 시간에 0을 기여합니다. 시간은 병합일에 귀속되며 과거 데이터는 소급해 채우지 않습니다. 2026년 9월 21일 전에 리뷰 준비 상태가 된 PR은 제외됩니다.

## 보고서를 열기 전에 확인할 조건

조회에는 Copilot 사용량 지표 정책과 권한이 필요합니다. 조직 소유자, 엔터프라이즈 소유자·청구 관리자 또는 해당 지표 조회 권한을 가진 역할이 대상입니다. API는 보고서 다운로드 링크를 반환하므로, 조직·엔터프라이즈별 저장소 보고서를 골라 확인합니다. [API 문서](https://docs.github.com/en/rest/copilot/copilot-usage-metrics)

여기까지는 공개 문서에서 확인한 사양입니다. 이 글을 위해 조직 계정으로 API를 호출하거나 실제 리뷰 시간을 측정한 결과는 없습니다. [Copilot Memory를 보안 수정에 연결한 발표](/posts/github-agentic-autofix-copilot-memory/)가 에이전트의 작업 방식을 다뤘다면, 이번 소식은 작업을 관찰하는 기준을 다룹니다.

## 다메카솔의 해석: 병목과 AI 효과를 구분해서 읽기

저는 이 지표를 리뷰 운영의 관찰 지점으로 보겠습니다. 첫 리뷰 전 대기가 길면 담당자 배정과 알림을, 마지막 리뷰 후 대기가 길면 병합 조건과 운영 시간을 먼저 살펴볼 이유가 생깁니다. 어느 원인이 실제로 작동했는지는 별도 확인이 필요합니다.

AI 도입 전후의 인과 효과를 주장하려면 PR 크기, 팀 구성, 배포 주기 같은 다른 변화도 함께 따져야 합니다. [보안 API 과제에서 AI 코딩 도우미를 비교한 연구](/posts/copilot-security-api-study/)처럼 비교 조건을 드러내는 일이 중요합니다. 그리고 병합일 기준 보고서를 읽을 때 남는 질문이 있습니다. **아직 병합되지 않은 채 기다리는 PR은 얼마나 될까요?**

## 출처

- [GitHub 변경 공지](https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/) — 2026-09-25
- [사용량 지표 필드 정의](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) — 2026-09-28 확인
- [사용량 지표 REST API](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) — 2026-09-28 확인

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
