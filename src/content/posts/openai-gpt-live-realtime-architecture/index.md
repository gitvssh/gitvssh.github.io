---
title: "OpenAI가 공개한 GPT-Live 실시간 구조: 말하기와 깊은 추론을 분리했다"
description: "OpenAI GPT-Live가 오디오의 실시간 경로와 검색·추론·도구 호출의 비동기 경로를 어떻게 분리했는지 정리합니다."
slug: "openai-gpt-live-realtime-architecture"
publishedAt: 2026-08-04
updatedAt: 2026-08-06
track: news
subtype: announcement_analysis
tags:
  - "AI 모델"
  - "AI 인프라"
  - "네트워킹"
audience: developer
readerOutcome: "GPT-Live가 실시간 음성 경로와 깊은 추론·도구 호출 경로를 어떻게 분리했는지 설명하고, 음성 에이전트 설계에서 지연에 민감한 작업과 비동기 작업을 나눌 수 있습니다."
contentFormats:
  - article
  - comic
  - diagram
freshnessStatus: current
reviewedAt: 2026-08-06
reviewAfter: 2026-09-04
cover: "./cover.webp"
coverAlt: "성인형 카솔이 끊김 없는 음성 흐름과 깊은 추론 흐름이 갈라졌다 다시 합쳐지는 구조를 안내하는 표지"
sourceUrl: "https://openai.com/index/continuous-voice-interaction-with-gpt-live/"
featured: false
draft: false
---

OpenAI는 2026년 8월 3일 GPT-Live를 움직이는 실시간 음성 시스템의 구현 구조를 공개했습니다. 이번 공개의 성격은 새 제품 출시보다 엔지니어링 설명에 가깝습니다. 7월부터 ChatGPT Voice에 순차 제공 중인 GPT-Live가 **말을 끊김 없이 이어 가는 경로와 검색·추론·도구 호출을 처리하는 경로를 어떻게 분리했는지** 설명합니다.

글·해설: 다메카솔

## 턴이 끝나기를 기다리지 않습니다

기존 음성 AI는 사용자가 말을 끝냈는지 먼저 판단한 뒤 큰 모델을 움직이는 경우가 많았습니다. 별도 턴 감지기가 너무 일찍 결정하면 사용자를 끊고, 늦게 결정하면 답이 굼떠집니다. OpenAI는 GPT-Live에서 이 감지기를 오디오 경로에서 빼고, 음성 모델이 듣기와 말하기를 동시에 처리하는 전이중 구조를 사용한다고 설명했습니다.

![멈춤 감지 뒤 응답하던 이전 흐름과 듣기·말하기를 함께 처리하는 연속 흐름을 비교한 만화](./page-01.webp)

연속 처리는 “항상 먼저 말한다”와 다릅니다. 음성 모델은 짧은 간격으로 계속 듣기, 말하기, 기다리기, 끼어들기, 도구 호출 중 무엇을 할지 판단합니다. 잠깐 생각하느라 멈춘 사람과 발화를 끝낸 사람을 더 자연스럽게 구분하려는 구조입니다.

## 오디오와 깊은 작업은 다른 길로 갑니다

![오디오는 중앙 실시간 경로로 흐르고 검색·추론·도구 호출은 옆 비동기 경로에서 처리되는 구조를 보여 주는 만화](./page-02.webp)

OpenAI가 공개한 구조에서 오디오는 전용 미디어 경로를 지납니다. 검색, 깊은 추론, 도구 호출, 대화 저장 같은 작업은 별도의 비동기 RPC 경계 뒤에서 처리됩니다. 도구 하나가 늦어져도 그 결과만 늦어질 뿐, 음성 프레임의 흐름까지 붙잡지 않게 만든 것입니다.

깊은 작업은 세션 시작과 함께 미리 준비됩니다. 음성 세션을 열 때 프런티어 모델 세션과 필요한 도구를 준비하고 초기 문맥을 채웁니다. 이후 요청은 같은 세션에 붙이고 프롬프트 캐싱을 이용해, 음성 모델이 대화를 이어 가는 동안 검색이나 추론 결과가 돌아오도록 시간을 줄였습니다.

## 긴 대화는 상태를 뒤에서 갈아탑니다

![기존 모델 인스턴스가 대화를 이어 가는 동안 새 인스턴스가 문맥을 준비하고 카솔이 교대 원칙을 설명하는 만화](./page-03.webp)

실시간 음성 세션은 오래 열려 있고 문맥은 계속 커집니다. 모델 인스턴스를 교체하거나 문맥을 압축할 때마다 멈춘다면 자연스러운 대화가 깨집니다. GPT-Live는 기존 인스턴스가 계속 말하는 동안 새 인스턴스를 데우고 현재 문맥을 미리 채운 뒤, 준비가 끝나면 전환한다고 OpenAI는 밝혔습니다. 문맥 압축도 같은 방식으로 뒤에서 처리합니다.

시작 지연에는 네트워크 프로토콜도 관여합니다. OpenAI는 WARP 제안으로 WebRTC 미디어·데이터 시작의 네트워크 왕복을 여섯 번에서 한 번으로 줄였다고 설명했습니다. 여기에는 경계가 있습니다. WARP는 2026년 8월 6일 현재 IETF Internet-Draft 단계이며 최종 표준 여부는 열려 있습니다.

## 회사 측 성능 주장은 범위를 붙여 읽습니다

OpenAI는 미디어 프런트엔드와 추론 로직을 Python `asyncio` 구현에서 Go로 옮긴 뒤, 새 시스템의 p95 프레임 전달 성능이 이전 시스템의 p50 수준과 맞았다고 보고했습니다. 공개 글에는 절대 지연값과 표본이 빠져 있어, 이 비교의 범위는 OpenAI 내부 관측으로 한정됩니다.

실제 배포 전에는 기존 Voice가 사용자에게 응답하는 동안 새 시스템도 읽기 전용 shadow 경로에서 함께 실행했습니다. OpenAI는 그 과정에서 GPU 처리량만으로는 보이지 않던 지원 구성요소 포화, 지역별 지연, 긴 세션의 메모리·복구 문제를 발견했다고 설명했습니다. 모델 속도만 재면 실시간 시스템의 병목을 놓칠 수 있다는 운영 사례입니다.

## 다메카솔의 해석

저는 이번 공개의 핵심을 “더 빠른 음성 모델”보다 **critical path를 좁게 만든 설계**에서 찾습니다. 사용자가 바로 느끼는 오디오는 작고 예측 가능한 길에 두고, 검색·추론·도구·저장은 늦어져도 전체 대화를 멈추지 않는 길로 격리했습니다.

음성 에이전트를 설계한다면 먼저 작업을 세 묶음으로 나누겠습니다.

1. 프레임마다 제시간에 도착해야 하는 미디어 작업
2. 결과는 필요하지만 비동기로 돌아와도 되는 검색·추론·도구 작업
3. 인스턴스 교체·문맥 압축처럼 뒤에서 준비할 수 있는 상태 작업

이 구분은 GPT-Live 내부 구현을 복제하는 처방보다 설계 질문에 가깝습니다. 공개 자료가 지원하는 평가는 구조와 회사 측 관측 범위까지입니다. 그래도 “무엇을 빨리 할까?”보다 “무엇이 늦어져도 대화를 멈추지 않게 할까?”라는 질문은 실시간 시스템을 설계할 때 바로 가져올 수 있습니다.

ChatGPT Voice의 GPT-Live 제공은 진행 중입니다. OpenAI가 이번 글에서 언급한 GPT-Live API는 예정 단계이며 출시일도 미정입니다.

## 출처

- [OpenAI Engineering — How we built a realtime system for responsive voice AI in six months](https://openai.com/index/continuous-voice-interaction-with-gpt-live/)
- [OpenAI — Introducing GPT-Live](https://openai.com/index/introducing-gpt-live/)
- [IETF Datatracker — WebRTC Abridged Roundtrip Protocol (WARP)](https://datatracker.ietf.org/doc/draft-uberti-tsvwg-warp/)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.

Updated: 2026-08-06
