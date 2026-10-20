---
title: "MiniMax M3.1 Flash 출시, 추론 깊이부터 확인하세요"
description: "MiniMax M3.1 Flash의 API 출시와 추론 깊이 기본값을 정리합니다. 가중치 공개 예정, 프로토콜별 설정 필드와 비용 비교 조건을 구분합니다."
slug: "minimax-m31-flash-thinking-depth"
publishedAt: "2026-10-20"
track: "news"
subtype: "release_announcement"
tags: ["AI 모델", "AI 코딩 도구"]
audience: "developer"
readerOutcome: "MiniMax M3.1 Flash의 현재 이용 경로와 추론 깊이 기본값을 구분하고 비교 시험의 조건을 정한다."
contentFormats: ["article", "comic"]
freshnessStatus: "current"
reviewedAt: "2026-10-20"
reviewAfter: "2026-10-27"
cover: "./cover.webp"
coverAlt: "새 모델의 연결 버튼과 추론 조절 다이얼을 살펴보는 카솔"
sourceUrl: "https://www.minimax.io/blog/minimax-m31f"
featured: false
draft: false
---

글·해설: 다메카솔

MiniMax가 2026년 10월 19일 **M3.1 Flash를 출시**했습니다. 공식 발표는 MiniMax API·M Plan·MiniMax Code에서 사용할 수 있다고 안내합니다. 개발자가 연결할 때 먼저 볼 항목은 추론 깊이인 `effort`입니다. [현재 API 문서](https://platform.minimax.io/docs/guides/text-generation)에 따르면 이 값을 생략하면 `max`가 적용되고, 추론 자체를 끄는 설정은 지원하지 않습니다.

## API는 출시, 가중치는 추후 공개

[출시 발표](https://www.minimax.io/blog/minimax-m31f)는 API와 두 제품의 이용 가능 상태를 밝히면서 모델 가중치는 나중에 공개한다고 적었습니다. 가중치는 모델이 학습한 값을 담은 파일로, 직접 운영 여부를 검토할 때 필요한 자료입니다. 10월 20일 확인한 발표 본문에는 공개 날짜와 라이선스가 명시돼 있지 않습니다. 문서 표에 있는 ‘open-weight’라는 소개만으로 파일을 지금 받을 수 있다고 판단해서는 안 됩니다.

공식 문서의 모델 ID는 `MiniMax-M3.1-Flash`입니다. 최대 문맥 길이는 100만 토큰이며 텍스트·이미지·영상 입력을 안내합니다. 문맥 길이는 한 번에 다룰 수 있는 입력과 작업 기록의 범위에 관한 명세입니다. 긴 문서를 넣었을 때의 정확도나 응답 시간을 이번 글에서 시험한 것은 아닙니다.

## 설정을 비워 두면 가장 깊게 추론합니다

`effort`는 답을 내기 전 추론의 깊이를 조절하는 설정입니다. 선택지는 `low`, `medium`, `high`, `xhigh`, `max`이며 기본값은 `max`입니다. MiniMax 문서는 깊이를 높이면 추론에 쓰는 출력 토큰과 지연이 늘어난다고 설명합니다. 따라서 새 모델을 붙이고 속도를 비교할 때는 이 값도 시험 조건으로 기록해야 합니다.

![설정을 생략해 높은 단계에 놓인 다이얼과 깊이를 직접 조절하는 다음 장면](./page-01.webp)

문서는 추론을 끄는 `thinking: {"type": "disabled"}` 또는 `effort: "none"` 요청에 HTTP 400 오류가 반환된다고 안내합니다. 지연과 토큰 사용량을 줄이고 싶다면 지원되는 더 낮은 깊이를 선택하는 방식입니다. 이 오류는 공식 문서의 설명이며 여기서 API를 호출해 재현하지는 않았습니다.

같은 깊이 설정도 사용하는 프로토콜에 따라 필드 이름이 다릅니다.

| 요청 방식 | 추론 깊이 필드 |
| --- | --- |
| Anthropic 호환 | `output_config.effort` |
| OpenAI Chat Completions 호환 | `reasoning_effort` |
| OpenAI Responses 호환 | `reasoning.effort` |

추론 결과의 위치도 다릅니다. Anthropic 호환 경로는 `thinking` 블록, Chat Completions 호환 경로는 `reasoning_content`, Responses 호환 경로는 `type: "reasoning"` 항목에 담습니다.

예를 들어 Chat Completions 호환 요청의 모델·설정 부분은 다음처럼 지정할 수 있습니다. 아래는 공식 문서에 근거한 **요청 일부의 예시**입니다. 실제 호출에는 MiniMax 계정과 API 키, 해당 엔드포인트 및 메시지가 필요하며, 실행 결과를 제시하는 코드는 아닙니다.

```json
{
  "model": "MiniMax-M3.1-Flash",
  "reasoning_effort": "low"
}
```

응답을 화면에 표시할 때도 필드를 구분합니다. Chat Completions 호환 경로에서는 `reasoning_content`가 추론 내용이고 `content`가 최종 답입니다. 기존 파서가 두 필드를 어떻게 다루는지 확인하면 모델 교체 뒤 출력이 섞이는 문제를 점검하기 쉽습니다.

## 토큰 단가와 작업 비용을 나눠 보기

출시 발표에 적힌 API 단가는 100만 토큰당 입력 0.15달러, 출력 0.60달러, 캐시 입력 0.015달러입니다. 이는 2026년 10월 19일 발표 기준이며 M Plan 구독료나 작업 한 건의 고정 가격을 뜻하지 않습니다.

MiniMax는 에이전트 작업의 전체 사용 비용이 이전 모델보다 70% 낮고 출력 속도가 200 TPS 이상에 이를 수 있다고 주장합니다. 이 수치를 우리 작업의 결과로 옮기려면 입력 길이, 추론 깊이, 출력량과 도구 사용 조건을 맞춘 측정이 필요합니다. 이 글은 해당 성능·비용 주장을 독립 검증하지 않았으므로 도입 효과를 보장하지 않습니다.

다메카솔은 **같은 대표 작업에서 추론 깊이를 명시한 뒤 성공 여부·총 토큰·전체 소요 시간을 함께 비교**하는 순서를 제안합니다. 가장 낮은 깊이가 모든 작업에 충분하다고 미리 가정할 필요는 없습니다. 예를 들어 파일 수정 과제라면 테스트 통과 여부까지 함께 기록해야 속도와 결과를 같은 기준으로 볼 수 있습니다. 모델 교체 뒤 기존 작업을 다시 확인하는 관점은 [DeepSeek Flash 1017 업데이트](/posts/deepseek-flash-1017-stable-api-model-change/)에서도 다뤘습니다.

## 출처

- [MiniMax 공식 출시 발표, 2026-10-19](https://www.minimax.io/blog/minimax-m31f)
- [MiniMax 모델 호출·추론 깊이 문서](https://platform.minimax.io/docs/guides/text-generation): 2026-10-20 확인

출시 상태·명세·설정 동작은 MiniMax 자료에 근거합니다. 비교 시험 순서는 다메카솔의 제안이며, API 호출이나 벤치마크를 직접 수행한 후기는 아닙니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
