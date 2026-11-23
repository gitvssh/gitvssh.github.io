---
title: "MiniMax M3.1 Flash 출시, 추론 깊이부터 확인하세요"
description: "MiniMax M3.1 Flash의 API 출시와 추론 깊이 기본값을 정리합니다. 가중치 공개 예정, 프로토콜별 설정 필드와 비용 비교 조건을 구분합니다."
slug: "minimax-m31-flash-thinking-depth"
publishedAt: "2026-10-20"
updatedAt: "2026-11-20"
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

새 Flash 계열 모델이 더 빠르고 저렴해졌다는 소식이 들리면 당장 기존 파이프라인의 모델명부터 바꿔 보고 싶어집니다. 2026년 10월 19일 출시된 MiniMax M3.1 Flash 역시 에이전트와 코딩을 겨냥했는데요. 호출 코드를 고치기 전에 가중치 공개 시점과 추론 깊이(`effort`) 기본값부터 확인해야 합니다.

글·해설: 다메카솔

## API는 열렸지만 가중치 공개는 추후 일정입니다

공식 [출시 발표](https://www.minimax.io/blog/minimax-m31f) 기준 현재 바로 쓸 수 있는 경로는 **MiniMax API**, **M Plan**, **MiniMax Code**입니다. 반면 모델 가중치는 추후 공개 예정이며, 10월 20일 확인한 발표 본문에도 공개 날짜와 라이선스가 빠져 있습니다. 문서 표의 'open-weight' 표기와 실제 파일 배포 시점은 별개로 구분해 읽어야 하거든요. 사내 서버에 직접 올릴 계획이라면 공식 배포 공지가 나올 때까지 API 경로로 먼저 검토하는 편이 현실적입니다.

[현재 API 문서](https://platform.minimax.io/docs/guides/text-generation)의 공식 모델 ID는 `MiniMax-M3.1-Flash`이며, 100만 토큰 문맥 창과 텍스트·이미지·영상 입력을 지원합니다. 긴 코드베이스나 다단계 에이전트 세션을 한 번에 담기 좋은 규격이죠. 다만 문맥 창 크기는 입력 상한 명세이므로 긴 입력에서의 실제 정확도와 지연은 팀 작업으로 따로 검증해야 합니다.

## effort 기본값이 max라 끄는 대신 낮춰야 합니다

`effort`는 답을 내기 전 추론 깊이를 조절하는 설정입니다. 선택지는 `low`, `medium`, `high`, `xhigh`, `max` 다섯 단계이고, 생략하면 **가장 깊은 `max`가 기본값으로 적용**됩니다. MiniMax 문서는 깊이를 높일수록 출력 토큰과 지연 시간이 늘어난다고 설명합니다. 따라서 속도를 비교할 때는 `effort` 값도 시험 조건으로 함께 남겨 두어야 합니다.

![설정을 생략해 높은 단계에 놓인 다이얼과 깊이를 직접 조절하는 다음 장면](./page-01.webp)

주의할 점은 추론 자체를 끄는 옵션이 막혀 있다는 사실입니다. 문서에 따르면 `thinking: {"type": "disabled"}`나 `effort: "none"` 요청에는 HTTP 400 오류가 반환되거든요. 토큰과 지연을 줄이려면 추론을 끄려 들기보다 `low`처럼 지원되는 더 낮은 `effort` 단계를 선택해야 합니다.

사용하는 호환 프로토콜마다 추론 깊이 필드와 응답 위치도 다릅니다. 요청 시 지정하는 필드부터 표로 살펴볼까요?

| 요청 방식 | 추론 깊이 필드 |
| --- | --- |
| Anthropic 호환 | `output_config.effort` |
| OpenAI Chat Completions 호환 | `reasoning_effort` |
| OpenAI Responses 호환 | `reasoning.effort` |

응답에서 추론 과정이 담기는 위치는 Anthropic 호환이 `thinking` 블록, Chat Completions 호환이 `reasoning_content` 필드, Responses 호환이 `type: "reasoning"` 항목입니다. Chat Completions 호환 경로에서는 `reasoning_content`가 추론 내용이고 `content`가 최종 답에 해당합니다.

가령 기존 OpenAI 호환 에이전트에서 `MiniMax-M3.1-Flash`로 모델만 바꾼다고 가정해 봅시다. `reasoning_effort`를 비우면 의도치 않게 `max`가 돌고, 기존 파서가 `reasoning_content`와 `content`를 가리지 못하면 출력이 엉킬 수 있는 셈이죠. 아래는 OpenAI Chat Completions 호환 요청의 일부 예시이며, 실제 호출에는 API 키와 엔드포인트, 메시지 배열이 필요합니다.

```json
{
  "model": "MiniMax-M3.1-Flash",
  "reasoning_effort": "low"
}
```

## 토큰 단가와 제공사 주장은 대표 작업으로 확인하세요

2026년 10월 19일 발표에 적힌 API 토큰 단가는 100만 토큰 기준으로 아래 표와 같습니다.

| 과금 항목 | 100만 토큰당 단가 (USD) |
| --- | --- |
| 입력 (Input) | 0.15달러 |
| 출력 (Output) | 0.60달러 |
| 캐시 입력 (Cached input) | 0.015달러 |

이 금액은 API 토큰 단가이므로 M Plan 구독료나 작업 한 건의 고정 비용과는 따로 봐야 합니다. MiniMax는 에이전트 작업의 전체 사용 비용이 이전 모델보다 70% 낮고 출력 속도가 200 TPS 이상에 이를 수 있다고 발표했는데요. 다만 제공사 측 수치여서 모든 환경에서 같은 효과가 보장되지는 않으므로, 입력 길이와 `effort`, 출력량, 도구 호출 비중이 맞물리는 우리 조건에서 직접 재어 봐야 합니다.

그래서 다메카솔은 **같은 대표 작업에서 추론 깊이를 명시한 뒤 성공 여부·총 토큰·전체 소요 시간을 함께 비교**하는 순서를 권합니다. 가장 낮은 `low`가 모든 작업에 충분하다고 미리 전제할 수는 없거든요. 예를 들어 파일 수정 과제라면 `low`에서 첫 응답이 빨라도 테스트 실패로 재시도가 늘면 총비용이 커질 수 있으니 테스트 통과 여부까지 기록해야 합니다. 모델 교체 뒤 기존 작업을 다시 확인하는 관점은 [DeepSeek Flash 1017 업데이트](/posts/deepseek-flash-1017-stable-api-model-change/)에서도 다뤘습니다.

## 출처

- [MiniMax 공식 출시 발표, 2026-10-19](https://www.minimax.io/blog/minimax-m31f)
- [MiniMax 모델 호출·추론 깊이 문서](https://platform.minimax.io/docs/guides/text-generation): 2026년 10월 20일 확인

이 글은 MiniMax 공식 발표와 API 문서를 바탕으로 정리했으며 별도의 API 호출이나 벤치마크 실행 측정은 포함하지 않았고, 만화 그림은 이해를 돕기 위해 새로 구성했습니다.

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
