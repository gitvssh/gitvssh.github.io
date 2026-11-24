---
title: "AI가 화면을 확대했다고 정말 더 잘 본 걸까"
searchTitle: "AI 시각 도구 사용 평가, crop-and-zoom 관측은 답을 바꿀까"
description: "시각 AI의 도구 호출과 반환 관측의 실제 기여를 정책·궤적·한 단계 개입으로 구분한 인과 감사 연구를 살펴봅니다."
slug: "visual-tool-use-causal-audit"
publishedAt: 2026-08-08
updatedAt: "2026-11-23"
track: paper
subtype: empirical
tags:
  - "멀티모달 AI"
  - "AI 에이전트"
  - "벤치마크"
audience: builder
readerOutcome: "시각 도구 호출 횟수와 관측의 실제 기여를 구분하고, 정책·궤적·단계 개입과 Visual Evidence Gain의 역할을 설명해 자체 에이전트 평가에 호출 필요성·관측 기여·중단 시점을 추가할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
freshnessStatus: current
reviewedAt: 2026-08-08
reviewAfter: 2026-11-08
cover: "./cover.webp"
coverAlt: "성인형 카솔이 여러 확대 렌즈 가운데 실제 단서와 연결된 렌즈를 살피는 표지"
sourceUrl: "https://arxiv.org/abs/2608.06270"
featured: false
draft: false
---

화면을 보는 AI가 확대 도구를 열 번 불렀다고 해서, 그 열 번이 모두 답을 개선했다고 보긴 어렵습니다. 모델은 이미 정해 둔 답을 내면서 호출만 덧붙이기도 하고, 단서를 찾고도 확대를 멈추지 못해 예산만 쓰기도 하거든요. 2026년 8월 6일 공개된 프리프린트 **「The Illusion of Visual Tool-Use: A Causal Audit of Thinking with Images」**는 crop-and-zoom 도구를 쓰는 공개 모델 6개를 대상으로, 호출 횟수가 아니라 **반환된 관측이 실제로 답을 바꿨는지**를 정책·궤적·한 단계 개입으로 감사했습니다.

글·해설: 다메카솔

## 핵심 내용

- **인과 감사 3단계**: 정책(도구 허용 vs 직접 응답), 궤적(엉뚱한 위치 crop 교체), 한 단계(VEG) 개입으로 행동 지름길과 관측 기여를 갈랐습니다.
- **평균 뒤의 양극화**: 정책 효과는 Mini-o3(+21.3%p)부터 Qwen3-VL-8B(-3.7%p)까지 엇갈렸고, DeepEyes 호출의 81%는 VEG 절댓값이 0.01 미만이었습니다.
- **소수 궤적에 몰린 이득**: V* 기준 관측을 제대로 쓴 `Calibrated` 비율은 7.9%~45.0%에 그쳤고, 나머지는 보지 않고 답하거나 좁은 곳만 반복 확대했습니다.

## 도구를 불렀다는 사실과 결과를 썼다는 사실은 다릅니다

![확대 렌즈를 움직이는 호출 경로와 단서가 답 나침반을 바꾸는 증거 경로가 갈라진 장면](./page-01.webp)

시각 도구를 쓰는 모델의 추론에는 세 경로가 섞여 있습니다. 원래 이미지와 질문에서 바로 답으로 가는 **직접 경로**, 도구를 호출했다는 행동 자체가 답에 영향을 주는 **지름길**, 그리고 반환된 관측이 답을 갱신하는 **증거(매개) 경로**죠.

일반적인 정확도 비교는 이 셋을 한꺼번에 뭉뚱그립니다. 예를 들어 영수증이나 대시보드 스크린샷을 읽는 에이전트에 확대 도구를 붙여 정답률이 올랐다고 해 봅시다. 그 상승이 확대된 숫자를 읽은 덕분인지, 호출 동안 추론이 길어진 덕분인지, 출력 형식이 답을 유도한 덕분인지는 점수만으로 가려내기 어렵습니다.

## 세 수준의 개입으로 두 경로를 가릅니다

![같은 시각 도구 사용을 정책 비교, 궤적 교란, 한 단계 비교로 나눈 세 층의 실험 정원](./page-02.webp)

연구진은 아래 세 가지 개입으로 행동 지름길과 관측 증거를 분해했습니다.

| 개입 수준 | 비교 방식 | 측정 대상과 한계 | 접근 요건 |
| --- | --- | --- | --- |
| **정책 수준** | crop-and-zoom 허용 vs 처음부터 직접 응답 | 전체 평균 효과는 보지만 지름길과 관측 기여는 분리하기 어려움 | Black-box 가능 |
| **궤적 수준** | 호출 모양은 유지하고 반환 crop을 엉뚱한 위치로 교체 | 증거 상실 붕괴를 보지만 불일치에 따른 추가 호출·예산 소진(답변 절단)도 함께 반영됨 | Black-box 가능 (관측 교체) |
| **한 단계 수준 (VEG)** | 동일 호출·문맥에서 실제 crop과 다른 위치 crop의 답 확률 변화 차이 계산 | 행동 지름길을 상쇄해 관측의 국소 기여(Visual Evidence Gain) 추정 | White-box 필요 (토큰 점수) |

실제 서비스가 외부 API인지 자체 서빙 모델인지에 따라 적용 가능한 층위가 달라집니다.

## 평균 상승 뒤에 가려진 양극화와 두 실패 모드

![답을 이미 고정한 채 렌즈만 반복하는 경로와 단서를 본 뒤에도 확대 터널을 멈추지 못하는 경로](./page-03.webp)

평가는 공개 모델 6개와 V*, HR-Bench 4K·8K, VisualProbe(Easy·Medium·Hard 합산), MME-RealWorld-Lite의 5개 보고 열에서 진행됐습니다. 수치를 뜯어보면 도구 사용이 일률적인 성능 향상으로 이어지진 않거든요.

- **모델별 정책·VEG 편차**: DeepEyes는 정책 효과가 거의 0이었고 호출의 81%가 `|VEG| < 0.01`이었습니다. Mini-o3는 VisualProbe에서 +21.3%p를 얻고 높은 최고점 호출도 보였으나 저기여 호출에 희석됐고, Qwen3-VL-8B는 포화 전 호출에만 기여가 몰린 채 MME-RealWorld-Lite에서 -3.7%p를 기록했습니다.
- **궤적 4그룹 분류**: 연구진은 궤적을 무호출과 `Calling Without Looking`, `Calibrated`, `Looking Without Planning`으로 나눴습니다.
- **Calling Without Looking**: 첫 호출 전 사고 블록에 이미 최종 답에 가까운 결론을 적은 비율이 약 58%로, `Calibrated`(약 28%)의 두 배를 넘었습니다.
- **Looking Without Planning**: 단서를 얻고도 멈추지 못하는 궤적으로, Mini-o3 기준 이 그룹 호출의 38%가 원본 면적 4% 미만을 잘라내며 좁은 지점만 반복 확대했습니다.
- **Calibrated 비율**: V* 기준 관측을 유효하게 쓴 비율은 DeepEyes 7.9%, Qwen3-VL-8B 20.9%, Qwen3-VL-4B 24.1%, Mini-o3 45.0%에 머물렀습니다.

눈여겨볼 대목은 V*의 네 인터페이스 기반 모델에서 `Calibrated` 그룹만 일관되게 양의 정책 기여를 냈다는 점입니다. 0이 아닌 전체 이득의 대부분도 이 그룹이 설명했고, HR-Bench-4K에서도 같은 정성적 패턴이 나타났어요. 결국 평균 점수가 올랐더라도 소수의 제대로 된 실행이 대다수 헛발질 호출의 비용을 덮고 있을 가능성을 점검해야 합니다.

## 다메카솔의 해석: 호출 수 대신 답의 변화를 기록합니다

![성인형 카솔이 실제 관측이 답을 움직인 밝은 경로를 가리키며 반복 호출 경로에 중단 원칙을 세우는 장면](./page-04.webp)

자체 화면 에이전트를 평가할 때는 호출 횟수나 최종 정답률만 세지 말고, 호출 전 답 상태와 반환 관측, 다른 위치 crop으로 바꿨을 때의 답 변화, 포화 이후 추가 호출의 증거 기여와 중단 실패 여부를 함께 기록해야 합니다. Black-box API 환경이라면 도구 허용과 직접 응답 비교에 더해 궤적 교란 검사부터 붙일 수 있고, 토큰 점수를 볼 수 있는 white-box 환경이라면 VEG 같은 한 단계 지표로 조기 중단 기준을 잡을 수 있죠.

다만 실험이 공개 모델과 crop-and-zoom에 한정된 만큼, OCR·영역 분할·비디오 프레임 선택·코드 기반 이미지 조작·외부 검색 도구에서도 같은 실패율이 나온다고 단정하긴 어렵습니다. 결과만 보상하는 강화학습이 원인이라는 설명도 관찰과 일치하는 저자 가설일 뿐 통제 학습으로 확정한 결론은 아닙니다. 아울러 2026년 8월 8일 확인한 공식 저장소에도 README와 MIT LICENSE만 있어 실행 코드·데이터·체크포인트·실험 설정이 추가 공개되는지 지켜볼 필요가 있습니다.

다음에 화면 에이전트가 확대를 반복한다면 호출 수보다 이 질문부터 확인해 보시기 바랍니다. **그 관측을 다른 위치 이미지로 바꿨을 때 답도 함께 바뀌는가?**

## 논문 정보

| 항목 | 내용 |
| --- | --- |
| 제목 | The Illusion of Visual Tool-Use: A Causal Audit of Thinking with Images |
| 저자·소속 | Zhiheng Wang, Bo Peng, Lai Wei, Chaochao Lu (Shanghai Artificial Intelligence Laboratory, Shanghai Jiao Tong University, Shanghai Innovation Institute) |
| arXiv v1 | 2026-08-06 17:01:08 UTC (cs.CV, cs.AI, preprint) |

## 출처

- [논문 초록과 메타데이터 — arXiv:2608.06270](https://arxiv.org/abs/2608.06270)
- [논문 원문 PDF](https://arxiv.org/pdf/2608.06270)
- [공식 CauAudit 코드 저장소](https://github.com/OpenCausaLab/CauAudit)
- [관련 글: AI가 화면을 보고 컴퓨터를 쓰게 만드는 법](/posts/tactile-computer-use-agents/)
- [관련 글: AI 영상 평가가 점수 하나로 끝나면 안 되는 이유](/posts/videoargus-evidence-video-evaluation/)

이 글은 논문 원문과 공개 저장소 자료를 바탕으로 정리했으며, 별도 실험 재현이나 독립 측정은 포함하지 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
