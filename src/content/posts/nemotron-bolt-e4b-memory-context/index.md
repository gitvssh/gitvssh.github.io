---
title: "Nemotron Bolt E4B, 4GB라는 이름보다 대화 길이를 보세요"
description: "Bolt E4B의 공개 소식과 로컬 대화 모델의 메모리 조건을 살펴봅니다. 4GB라는 이름과 실행 중 메모리를 구분합니다."
slug: "nemotron-bolt-e4b-memory-context"
publishedAt: "2026-10-24T00:19:13Z"
updatedAt: "2026-11-20"
track: "news"
subtype: "release_announcement"
tags: ["NVIDIA", "로컬 AI", "언어 모델"]
audience: "developer"
readerOutcome: "Bolt E4B의 공개 상태와 대화 길이에 따른 메모리 조건을 구분한다."
contentFormats: ["article", "comic"]
freshnessStatus: "current"
reviewedAt: "2026-10-24"
reviewAfter: "2026-11-07"
cover: "./cover.webp"
coverAlt: "모델 칩과 대화 기록이 함께 차지하는 공간을 살피는 카솔"
sourceUrl: "https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/"
featured: false
draft: false
---

로컬 AI 모델 이름에 ‘4GB’가 붙어 있으면, 보급형 GPU나 소형 보드에서도 여유롭게 돌아갈 거라는 기대가 먼저 듭니다. 하지만 NVIDIA의 **Bolt E4B** 공식 자료를 들여다보면, 모델 크기만으로는 실제 필요한 메모리를 가늠하기 어렵거든요. 대화 기록이 쌓이고 음성·시각 파이프라인까지 함께 돌리기 시작하면 계산이 달라집니다.

글·해설: 다메카솔

## 공개된 모델과 실행 모드

NVIDIA는 2026년 10월 23일 로컬 음성 비서와 기기용 에이전트를 겨냥한 **Bolt E4B**를 [공식 발표](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/)하고, [모델 카드](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)에 가중치를 공개했습니다. 주요 사양과 지원 범위는 아래와 같습니다.

- **체크포인트**: `NVIDIA-Nemotron-3.5-Bolt-E4B-4GB`로 Q4_K_M GGUF가 배포되며, BF16 원본과 병렬 추측 디코딩용 DFlash 드래프터도 함께 제공합니다.
- **구조와 지원**: Gemma-4-E4B-it 기반 전체 8B(활성 4B) 모델에 OpenMDW-1.1 라이선스를 적용하며, 입출력 64K 토큰과 한국어 포함 35개 언어를 지원합니다.
- **실행과 모드**: `llama.cpp`, Ollama 등에서 돌리며 `conversational_mode`로 간결한 대화형 응답을, `enable_thinking`과 `--reasoning-budget`으로 추론량을 조절합니다.

한편 추론 예산을 너무 짧게 자르면 내부 사고가 문장 중간에 끊길 수 있고, 전체 `max_tokens` 상한에 닿으면 생성이 멈춥니다. 모델 카드는 실제 프롬프트로 예산을 먼저 시험한 뒤, 시스템 프롬프트에 구체적인 문장 수 제한을 두도록 권고합니다.

## 같은 모델도 대화가 길어지면 메모리가 달라집니다

제품명의 ‘4GB’를 모든 대화 길이에서의 메모리 상한으로 읽으면 곤란합니다. 모델 가중치 외에 대화 이력을 담는 캐시와 입출력 버퍼가 실행 중 공간을 함께 차지하기 때문이죠. NVIDIA가 `Q4_K_M` 양자화, 배치 크기 1, `llama.cpp` CUDA(AIPerf) 조건으로 공개한 대표 측정치는 아래와 같습니다.

| 하드웨어 (메모리) | 캐시 / 새 입력 / 출력 | VRAM | TTFT | 속도 (tok/s) |
| --- | --- | --- | --- | --- |
| **RTX 5070 (12GB)** | 0 / 3K / 50 | **3.5GB** | 548ms | 133.4 |
| **RTX 5070 (12GB)** | 32K / 2K / 256 | **4.3GB** | 1,238ms | 106.2 |
| **RTX Spark (32GB)** | 0 / 3K / 50 | **3.1GB** | 930ms | 67.0 |
| **RTX Spark (32GB)** | 32K / 2K / 256 | **4.2GB** | 1,988ms | 52.0 |
| **Jetson Orin Nano (8GB)** | 0 / 3K / 50 | **4.2GB** | 5,785ms | 15.5 |
| **Jetson Orin Nano (8GB)** | 32K / 2K / 256 | **4.9GB** | 6,259ms | 13.0 |

표에서 먼저 볼 점은 두 구간의 측정 조건이 같지 않다는 사실입니다. 캐시 길이뿐 아니라 새 입력과 출력 토큰 수도 함께 바뀌므로, 증가분 전부를 캐시 탓으로 보기는 어렵습니다. 또한 모델은 64K 컨텍스트를 지원하지만, 공식 측정표는 배치 크기 1과 32K 캐시까지만 다룹니다.

![짧은 대화 뒤 기록 블록이 늘어나 모델 외에 추가 공간이 필요한 두 장면](./page-01.webp)

가령 8GB 메모리의 Jetson Orin Nano에 로컬 로봇 비서나 음성 에이전트를 올리는 상황을 떠올려 볼까요? NVIDIA 데모처럼 시각 모델(`Cosmos 3 Edge`)이나 음성 파이프라인을 함께 띄우면, 짧은 대화에서도 이미 절반 넘는 메모리가 쓰이고 32K 캐시 구간에서는 4.9GB까지 올라가며 여유 공간이 빠르게 줄어듭니다.

여기에 DFlash 드래프터까지 올리거나 대화 턴이 쌓이면 메모리 부담이 한층 커집니다. 실제로 RTX 5070에서도 긴 캐시 구간의 첫 토큰 지연이 두 배 이상 벌어졌으니, 로컬 앱에서는 허용할 최대 대화 길이부터 정해 두어야 안정적으로 굴릴 수 있는 셈이죠.

## 다메카솔의 해석

로컬 도우미를 검토한다면 이름의 ‘4GB’보다 **쓸 대화 길이와 함께 켤 프로그램을 먼저 정하는 편**이 현실적입니다. 적용 전에는 아래 세 가지를 기준으로 자체 환경을 점검해 둘 필요가 있습니다.

- **세션 상한과 동시 모델**: 유지할 최대 턴 수와 초기화 기준을 정하고, 음성·시각 모델이나 DFlash 드래프터의 메모리를 합산합니다.
- **추론 예산과 대화 모드**: 음성 응대 중심이라면 `conversational_mode`를 켜고 `enable_thinking` 끄기나 `--reasoning-budget` 제한의 품질·지연 변화를 비교합니다.
- **실제 조건 누적 측정**: 공식 수치는 배치 크기 1 기준이므로, 도구 호출과 검색 문맥이 쌓이는 상태에서 메모리 최고치와 응답 지연을 확인합니다.

특히 음성 에이전트에서는 언어 모델 외에 음성 인식·합성 단계의 자원 배분도 함께 따져야 하는데요. 전체 구성 흐름을 살피려면 [Voxtral 3의 음성 에이전트 구성](/posts/voxtral-3-voice-agent-pipeline/) 글도 참고해 보시기 바랍니다.

## 출처

- [NVIDIA 공식 발표](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/) — 2026년 10월 23일 공개. 모델 개요, 기능과 하드웨어별 메모리·지연 측정 조건.
- [NVIDIA 모델 카드](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB) — 2026년 10월 24일 확인. GGUF 체크포인트, 추론·대화 모드 옵션과 도구 호출 제약.

이 글은 NVIDIA 공식 발표와 모델 카드 자료를 바탕으로 정리했으며 별도의 로컬 실행이나 메모리 측정은 포함하지 않았고, 만화 그림은 이해를 돕기 위해 새로 구성했습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
