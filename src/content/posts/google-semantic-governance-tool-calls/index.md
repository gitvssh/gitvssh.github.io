---
title: "메일 권한이 있어도 보내면 안 될 때, Google의 실행 전 검사"
description: "도구 권한과 개별 행동의 판단을 구분하고, Google의 실행 전 검사와 미리보기·스트리밍 제한을 살펴봅니다."
slug: "google-semantic-governance-tool-calls"
publishedAt: "2026-11-23T00:24:38Z"
track: "news"
subtype: "release_announcement"
tags: ["Google Cloud", "AI 에이전트", "보안"]
audience: "builder"
readerOutcome: "도구 접근 권한과 개별 실행 판단을 구분하고, Semantic governance의 미리보기·비스트리밍 조건과 오판 가능성을 설명한다."
contentFormats: ["comic", "article"]
freshnessStatus: "current"
reviewedAt: "2026-11-23"
reviewAfter: "2026-11-30"
cover: "./cover.webp"
coverAlt: "메일 봉투가 검사 지점 앞에 멈추고 카솔이 살펴보는 장면. 메일 권한과 개별 발송 판단을 구분한다"
sourceUrl: "https://developers.googleblog.com/en/check-what-your-ai-agents-do-before-they-do-it-with-semantic-governance-policies/"
featured: false
draft: false
---

AI에게 메일 발송 권한을 줬다고 해서, 회사 자료를 아무에게나 보내도 되는 것은 아니죠. Google은 2026년 11월 20일 **도구를 실행하기 전에 사용자 요청과 회사 규칙을 함께 검사하는 Semantic governance policies**를 소개했습니다. Gemini 플랫폼에서 제공하는 미리보기 기능으로, 에이전트 코드 밖에 판단 단계를 둡니다.

글·해설: 다메카솔

## 권한과 이번 행동의 타당성은 다르다

접근 권한은 “이 에이전트가 메일 도구를 사용할 수 있는가”를 정합니다. 새 기능이 살피는 질문은 “지금 이 수신자에게 이 자료를 보내는 것이 맡긴 일과 규칙에 맞는가”입니다. 같은 도구를 써도 요청의 맥락과 자료의 성격에 따라 판단이 달라지는 셈이죠.

예를 들어 발표 전 실적 자료를 사내 담당자에게만 공유한다는 규칙이 있다고 해 볼까요. 직원이 외부 투자자에게 보내 달라고 명시적으로 요청해도 규칙을 어기면 거절 대상입니다. 반대로 자료를 요약하던 중 읽은 문서가 몰래 파일 삭제를 지시했다면, 원래 사용자 요청에서 벗어났는지가 문제가 됩니다. Google의 발표는 이처럼 **사용자 의도 확인과 업무 규칙 확인을 나눠 설명**합니다.

## 모델 응답이 도구 실행으로 바뀌기 직전

Agent Gateway는 에이전트와 모델 사이의 통신에서 모델이 제안한 도구 호출을 가로챕니다. 정책 엔진의 LLM이 요청과 대화 기록, 도구 설명, 설정한 규칙을 읽고 판정합니다. 허용하면 응답을 그대로 전달하고, 거절하면 도구 호출을 포함한 내용을 거절 메시지로 바꿉니다. 에이전트가 실행할 호출을 받기 전에 개입하는 구조입니다.

![외부로 나가려던 봉투가 멈춘 뒤 카솔이 돋보기로 판정을 검토하는 두 컷. 실행 전 검사와 오판 점검을 연결한다](./page-01.webp)

사용자 의도 검사는 기본으로 켜져 있고, 별도 업무 규칙도 연결할 수 있습니다. 다만 검사하려는 통신을 Gateway로 보내도록 구성해야 합니다. 프롬프트에 규칙을 한 줄 적는 것만으로 외부 검사 단계가 생기지는 않습니다. [에이전트가 원래 할 일을 놓치는 문제](/posts/google-agent-distraction-todo/)를 다룰 때도, 작업을 기억시키는 방법과 실행 직전의 통제는 구분해서 볼 필요가 있습니다.

| 확인 항목 | 11월 23일 공식 안내 기준 |
| --- | --- |
| 제공 상태 | 미리보기(Preview), 현재 지원 집행 지점은 Agent Gateway |
| 검사 대상 | 모델이 제안한 도구 호출. 일반 텍스트 답변·계획은 제외 |
| 스트리밍 | 스트리밍 모델 응답은 미지원. 도구 호출도 차단되지 않을 수 있어 비스트리밍으로 구성 |
| 모델 연결 | Gemini, Anthropic Messages, 플랫폼의 Claude, OpenAI 호환 Chat Completions 등 문서에 명시된 형식 |
| 남는 기본 통제 | IAM 접근 권한, 호출량 제한, 네트워크 보안 |

## 판단하는 AI도 점검해야 한다

정책 엔진 역시 LLM을 사용하므로 판정이 틀리거나 달라질 수 있습니다. Google은 먼저 dry run으로 살펴보라고 권합니다. 이 모드에서는 실제로 막지 않고 어떤 호출을 거절했을지 기록하므로, 정상 업무가 막히는지와 금지한 요청이 통과하는지를 비교하기 좋습니다.

규칙 문장도 구체적이어야 합니다. “비싼 서버는 만들지 마”보다 허용 지역, 금지한 인스턴스 종류, 최대 사용 시간을 도구의 매개변수 이름에 맞춰 적는 편이 명확합니다. 도구 설명과 매개변수 설명이 부실하면 판단에 필요한 정보도 줄어듭니다. 실적 공개일처럼 규칙 적용에 필요한 사실은 에이전트의 지침에 포함하라는 것이 Google의 안내입니다.

다메카솔이 주목한 변화는 권한 설정 뒤에 **개별 행동의 맥락을 확인하는 자리**가 생겼다는 점입니다. 도입을 검토한다면 대표적인 허용·거절 사례를 먼저 정하고 로그의 판정을 비교해 보는 편이 좋습니다. 이 검사는 기존 접근 제어에 추가되는 방어층이므로, 기본 권한과 네트워크 제한도 함께 유지해야 합니다.

## 출처

- [Google Developers Blog 발표](https://developers.googleblog.com/en/check-what-your-ai-agents-do-before-they-do-it-with-semantic-governance-policies/) — 2026년 11월 20일, 미리보기 소개와 실행 전 검사 흐름.
- [공식 기능 개요](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview) — 대상 API, 스트리밍 제한, 기본 통제와의 관계.
- [정책 작성 권장 사항](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/best-practices) — 구체적인 도구·매개변수 설명과 규칙 작성 사례.
- [정책 엔진 구성 안내](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance) — Gateway 연결과 시험 모드 설정.

Google의 발표와 공식 문서를 바탕으로 정리했으며, 직접 배포하거나 차단율·지연·비용을 측정하지 않았습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
