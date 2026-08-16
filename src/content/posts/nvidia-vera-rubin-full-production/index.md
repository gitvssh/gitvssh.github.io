---
title: "Vera Rubin 양산 시작: AI 인프라가 '전력당 토큰(Tokens per Watt)'을 보는 이유"
description: "NVIDIA의 차세대 AI 팩토리 아키텍처 Vera Rubin NVL72가 글로벌 전면 양산에 들어갔습니다. 개별 GPU 스펙을 넘어 랙 스케일(Rack-scale) 통합 설계와 전력 효율(Tokens/Watt) 관점의 인프라 전환을 분석합니다."
slug: "nvidia-vera-rubin-full-production"
publishedAt: 2026-07-22
updatedAt: 2026-07-22
track: news
subtype: announcement_analysis
tags:
  - "AI 하드웨어"
  - "AI 인프라"
audience: builder
readerOutcome: "차세대 AI 데이터센터의 병목이 GPU 연산력에서 전력(Power)과 인터커넥트(Network)로 이동한 배경을 이해하고, 랙 스케일 AI 인프라의 TCO 효율을 평가할 수 있다."
contentFormats:
  - article
  - comic
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-22
reviewAfter: 2026-10-22
cover: "./cover.webp"
coverAlt: "카솔이 Vera Rubin을 상징하는 AI 랙 전체의 전력 입력과 토큰 출력을 점검하는 표지"
sourceUrl: "https://blogs.nvidia.com/blog/vera-rubin/"
featured: true
draft: false
---
글·해설: 다메카솔

데이터센터를 구축하는 인프라 아키텍트들에게 요즘 가장 무서운 제약은 "GPU 살 예산이 부족해서"가 아니라, **"변전소에서 데이터센터로 끌어올 수 있는 전력(Megawatt) 용량이 물리적 한계에 부딪혔기 때문"**입니다.

데이터센터의 전력 공급 한도가 10MW로 묶여 있다면, 개별 GPU가 아무리 빨라도 전기를 너무 많이 먹으면 랙을 채울 수 없습니다.

NVIDIA가 글로벌 전면 양산(Full Production) 확대를 발표한 **Vera Rubin NVL72**는 바로 이 지점을 겨냥합니다. 

단순히 "새로운 GPU 칩"이 아니라, **72개의 Rubin GPU, 36개의 Vera CPU, NVLink 6 스위치, BlueField-4 DPU, 액체 냉각 배관을 단 하나의 거대한 랙 스케일 컴퓨터로 통합하여 '메가와트(MW)당 처리 가능한 토큰 수'를 10배 끌어올린 시스템**입니다.

이번 글에서는 Vera Rubin 플랫폼이 제시하는 차세대 AI 팩토리 아키텍처와 엔지니어링 시사점을 정리합니다.

## 단일 칩을 넘어선 '랙 스케일(Rack-scale)' 통합 설계

![GPU와 CPU, 네트워크, DPU, 냉각 부품이 하나의 AI 랙 시스템으로 결합되는 과정](./page-01.webp)

거대 LLM(추론 모델 및 MoE)의 학습과 서빙에서 병목은 GPU 코어 연산이 아니라 **"GPU 간의 통신 지연(All-Reduce Communication Latency)"**입니다.

Vera Rubin NVL72는 7종류의 특화 칩과 5종류의 모듈식 트레이를 단일 랙으로 결합했습니다:
- **Rubin GPU 72장 + Vera CPU 36장**: 에이전트의 워크플로우 오케스트레이션과 모델 추론 연산을 최적 비율로 분배
- **NVLink 6 스위치**: 72장의 GPU가 마치 단 1장의 거대한 단일 GPU 메모리 풀처럼 초고속으로 통신
- **Spectrum-6 & BlueField-4 DPU**: 스토리지 I/O와 클러스터 간 패킷 라우팅 오버헤드를 GPU로부터 100% 오프로딩

## 전력당 토큰(Tokens per Watt): 데이터센터의 새로운 North Star

![같은 전력 입력을 받은 두 AI 랙의 토큰 처리 흐름과 특정 벤치마크 조건을 비교하는 만화](./page-02.webp)

CoreWeave가 실제 가동 중인 Vera Rubin 랙에서 측정한 DeepSeek-R1 벤치마크에 따르면, **동일한 메가와트(MW) 전력 소비 대비 초당 토큰 처리량이 이전 세대(Blackwell NVL72) 대비 최대 10배까지 폭증**했습니다.

전력망 확설이 수년씩 걸리는 글로벌 데이터센터 환경에서, **"같은 전기 요금과 전력 용량으로 10배 많은 AI 추론 트래픽을 감당할 수 있다"**는 것은 인프라 TCO 관점에서 엄청난 경제적 우위를 의미합니다.

## 클라우드 도입 로드맵과 벤치마크 해석 시 주의점

![카솔이 Vera Rubin의 파트너별 제공 경로와 모델, 정밀도, 지연시간, 소프트웨어 조건을 확인하는 만화](./page-03.webp)

현재 CoreWeave, Google Cloud, Microsoft Azure, OCI 등 주요 AI 네이티브 클라우드에서 파일럿 랙이 가동 중입니다. 하지만 '10배'라는 수치를 실무에 대입할 때는 다음 조건을 확인해야 합니다:

1. **배치 크기(Batch Size)와 지연 시간(TTFT)**: 대량 배치 처리량(Throughput) 중심의 10배 수치가 단일 요청의 첫 토큰 지연 시간(Time to First Token) 단축을 의미하는 것은 아닙니다.
2. **양산 단계(Ramping)와 일반 가용성(GA)**: 현재는 주요 빅테크 및 전용 파트너사 위주로 우선 배정되고 있으며, 일반 엔터프라이즈 인스턴스 오픈은 순차적으로 진행됩니다.

## 다메카솔의 해석: 인프라 엔지니어가 준비해야 할 하드웨어 전환

Vera Rubin의 등장은 백엔드 및 인프라 엔지니어에게 중요한 기술적 변화를 시사합니다.

1. **액체 냉각(Direct-to-Chip Liquid Cooling)의 표준화**: 수백 kW급 고밀도 랙이 기본이 되면서 공랭식 데이터센터 설계는 종말을 고하고 있습니다.
2. **FP4 저정밀도 연산 파이프라인**: 성능과 전력 효율의 도약은 4비트 양자화(FP4) 연산의 하드웨어 네이티브 가속에서 나옵니다. 우리 모델이 저정밀도 환경에서 정확도 손실 없이 서빙될 수 있도록 양자화 파이프라인(AWQ, SmoothQuant 등)을 준비해야 합니다.

## 함께 읽을 AI 인프라 글

- [NVIDIA Jetson Thor 엣지 로보틱스 모듈 분석](/posts/nvidia-jetson-thor-t3000-t2000/)
- [홈랩 쿠버네티스 구축기와 하드웨어 병목 분석](/posts/why-homelab-kubernetes/)

## 출처

- [NVIDIA Official Blog — Vera Rubin Driving Performance Per Watt in Full Production](https://blogs.nvidia.com/blog/vera-rubin/)
- [CoreWeave Official Blog — First-Ever Measured Vera Rubin NVL72 Silicon Performance Stats](https://coreweave.com/blog/nvidia-vera-rubin-nvl72-on-coreweave-10x-more-tokens-per-megawatt-than-blackwell)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
