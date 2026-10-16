---
title: "GitHub AI Scan 정식 출시: 탐지 결과가 병합을 막지는 않습니다"
description: "GitHub AI Scan의 정식 출시와 PR 검사 범위를 정리합니다. 권고 결과와 병합 차단의 차이, 지원 저장소와 AI 크레딧 과금 조건을 살펴봅니다."
slug: "github-ai-scan-advisory-merge-boundary"
publishedAt: "2026-10-16"
updatedAt: "2026-10-16"
track: "news"
subtype: "announcement_analysis"
tags: ["AI 코딩 도구", "보안"]
audience: "developer"
readerOutcome: "AI Scan의 PR 탐지 범위와 병합 차단의 차이를 이해하고, 사용 조건과 비용을 확인한다."
contentFormats: ["article", "comic"]
freshnessStatus: "current"
reviewedAt: "2026-10-16"
reviewAfter: "2026-10-23"
cover: "./cover.webp"
coverAlt: "카솔이 경고등과 열린 통로를 살피며 탐지와 병합 조건의 차이를 묻는 장면"
sourceUrl: "https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available/"
featured: false
draft: false
---

글·해설: 다메카솔

발행·확인: 2026-10-16

PR에 보안 경고가 달렸는데도 병합 버튼은 그대로 열려 있다면, 팀은 그 경고를 누가 확인할지부터 정해야 합니다. GitHub가 10월 15일 정식 출시한 **AI Scan for pull requests**에서 특히 눈여겨볼 지점인데요. CodeQL이 현재 다루지 않는 일부 언어·프레임워크의 변경을 보완 검사해 주지만, 발견된 결과가 병합을 자동으로 차단하는 조건으로 쓰이지는 않습니다. [공식 발표](https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available/)

## CodeQL 옆에 더해지는 검사

![하나의 검사등에 다른 검사등이 더해져 별도 작업물을 비추는 개념도](./page-01.webp)

GitHub는 PHP, Shell/Bash, Terraform 설정(HCL), Dockerfile 등을 주요 보완 검사 대상으로 소개합니다. 저장소에 code scanning과 유효한 AI Scan 설정이 켜져 있으면 적격 PR에서 자동으로 실행되는데요. 탐지 결과는 PR의 Conversation·Files changed 화면에서 기존 CodeQL 결과와 나란히 표시되며, AI 배지와 함께 위험 설명이나 수정 제안이 제공될 수 있습니다. [작동 방식](https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available/)

검사 범위는 PR 변경분으로만 한정됩니다. 공식 문서에 따르면 전체 저장소 스캔이나 fork에서 올라온 PR, Dependabot이 만든 PR은 검사 대상에서 제외되고, 탐지 결과도 저장소 보안 화면에 쌓이는 기존 backlog alert와는 따로 구분됩니다(위 그림의 두 조명은 탐지율 비교 실험이 아니라 검사 영역이 보완되는 구조를 나타낸 비유입니다). [지원 범위와 한계](https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/code-scanning/ai-powered-security-detections)

## 경고를 읽는 일은 남습니다

![경고등이 켜져도 통로는 열려 있고 카솔이 발견된 문제를 검토하는 장면](./page-02.webp)

실무에서 가장 중요한 차이는 AI Scan이 찾은 결과가 **권고(advisory)**로만 취급된다는 점입니다. 새로운 경고가 발견되더라도 Code scanning check가 실패로 바뀌지 않으며, ruleset의 필수 병합 조건으로 걸어 PR을 막을 수도 없습니다. GitHub 스스로도 오탐 가능성을 명시하고 있어서, 화면에 경고가 보인다는 사실과 팀이 그 결과를 실제로 검토했다는 사실은 별개로 챙겨야 합니다. [결과의 의미](https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/code-scanning/ai-powered-security-detections#limitations)

공식 문서 기준으로만 보더라도(이번 발표를 직접 재현하거나 오탐률을 측정한 것은 아닙니다), 결국 핵심은 탐지 신호와 실행 통제를 어떻게 연결할지에 있습니다. 가령 배포 설정을 바꾸는 PR에 AI 경고가 붙었다면, 리뷰어가 실제 위험 여부를 판단하고 수정할지 수용할지 근거를 남기는 절차가 함께 돌아가야 합니다.

## 공개 저장소도 비용을 확인하세요

도입할 때는 지원 대상 여부와 과금 조건을 나누어 살펴봐야 합니다. 기능 자체는 일반 공개 저장소에 기본 제공되고, 조직 소유의 비공개·내부 저장소에서는 GitHub Code Security 또는 Advanced Security가 필요합니다. Copilot 라이선스는 필수 요건이 아니며, 개인 계정의 비공개 저장소와 관리형 사용자 계정의 개인 공간은 지원 대상에서 제외됩니다. [저장소별 이용 조건](https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/code-scanning/ai-powered-security-detections#availability)

주의할 점은 공개 저장소에서도 AI Scan이 실행될 때 **Code Security AI Credits**를 소비한다는 사실입니다. 청구 계정에 기본 포함 크레딧이 있으면 이를 먼저 차감하고, 이후에는 사용량 과금과 예산 설정이 적용됩니다(포함 크레딧이 없는 계정은 사용량 기준 과금). 활성 커미터 라이선스가 필요 없다는 조건과 AI 크레딧 비용이 아예 없다는 것은 다른 이야기입니다. [AI 기능 과금](https://docs.github.com/en/billing/concepts/product-billing/github-advanced-security#how-ai-feature-usage-is-billed)

## 다메카솔의 해석: 확인할 사람까지 연결하기

제가 팀의 도입 범위를 정한다면 기존 테스트와 병합 차단 규칙은 그대로 유지하면서, AI 경고를 누가 어떤 기준으로 확인할지부터 먼저 약속하겠습니다. 탐지 신호가 늘어나도 실제 코드 리뷰에서 읽히지 않으면 보안 개선 효과는 반감될 수밖에 없으니까요. 반대로 오탐 가능성이 있는 신호를 무조건 차단 조건으로 묶으면 정상적인 배포까지 밀릴 수 있어서, 수용과 수정의 판단 근거를 리뷰 기록으로 쌓는 편이 현실적이라고 봅니다.

앞서 다룬 [OSS Scanner의 유지관리자 검토](/posts/anthropic-oss-scanner-maintainer-review/)에서도 AI가 만든 발견 보고서와 사람의 검증 책임을 구분해 살펴봤는데요. 이번에는 그 경계가 일상적인 PR 화면 안으로 들어왔습니다. AI Scan을 켠 팀이라면 다음 PR에서 **누가 경고를 읽고 어떤 근거로 닫았는지**부터 한 번 확인해 보세요.

## 출처

- [GitHub · AI Scan 정식 출시, 2026-10-15](https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available/)
- [GitHub Docs · AI Scan, 2026-10-16 확인](https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/code-scanning/ai-powered-security-detections)
- [GitHub Docs · Advanced Security 과금, 2026-10-16 확인](https://docs.github.com/en/billing/concepts/product-billing/github-advanced-security)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
