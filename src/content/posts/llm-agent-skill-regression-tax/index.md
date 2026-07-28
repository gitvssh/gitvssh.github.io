---
title: "스킬을 더했는데 왜 더 못해질까, Regression Tax가 측정한 것"
description: "절차형 스킬은 새 성공을 만들면서 기존 성공을 깨뜨릴 수도 있습니다. 486개 과제와 세 model-harness stack의 paired run을 바탕으로 gain, regression, grounding, verification을 분리해 봅니다."
slug: "llm-agent-skill-regression-tax"
publishedAt: 2026-07-27
updatedAt: 2026-07-28
track: paper
subtype: empirical
tags:
  - "AI 에이전트"
  - "LLM"
  - "벤치마크"
  - "운영 자동화 안전"
audience: developer
readerOutcome: "스킬의 순성공률을 gain과 regression으로 분해하고, 설명 존재·입력 grounding·출력 verification의 실패 경로와 논문의 적용 한계를 구분해 설명할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-28
reviewAfter: 2026-10-28
cover: "./cover.webp"
coverAlt: "성인형 카솔이 성공 블록과 깨진 과제 블록이 함께 놓인 감사 저울을 점검하는 표지"
sourceUrl: "https://arxiv.org/abs/2607.22520"
featured: false
draft: false
---
553번 좋아졌고, 324번은 나빠졌습니다. **The Regression Tax: Decomposing Why Skills Help and Hurt LLM Agents**는 LLM 에이전트에 절차형 스킬을 넣기 전과 후를 같은 과제로 비교해, 새로 푼 과제와 원래 풀던 과제를 깨뜨린 경우를 따로 셌습니다. 연구진이 관찰한 regression은 gross gain의 59%를 상쇄했습니다.

이 비율의 적용 범위는 두 office-automation benchmark와 세 model-harness stack으로 한정됩니다. 이 글은 연구 질문, 비교 방법, 세 후보 메커니즘, 통계와 재현 한계를 차례로 분리합니다.

글·해설: 다메카솔

## 평균 성공률은 무엇을 숨기나

![같은 office task가 no-skill 경로에서는 완료되고 skill 경로에서는 마지막에 깨지는 두 갈래 장면](./page-01.webp)

연구진은 같은 과제의 no-skill 결과와 skill 결과를 짝지었습니다. baseline에서 실패했다가 스킬과 함께 성공하면 **gain**, baseline에서 성공했다가 스킬을 넣은 뒤 실패하면 **regression**입니다. 둘 다 실패한 경우는 residual failure, 둘 다 성공한 경우는 retained success로 둡니다.

순성공률만 보면 gain에서 regression을 뺀 결과만 남습니다. 그러나 같은 +5라도 경로는 다를 수 있습니다. 한 library는 새 성공 15개와 regression 10개를 만들고, 다른 library는 새 성공 7개와 regression 2개를 만들 수 있습니다. 두 결과의 순증가는 같아도 후자는 기존 성공을 더 잘 지켰습니다.

논문은 이 차이를 18개 library-condition 비교에서 합산했습니다. gain transition은 553개, regression transition은 324개였고 net gain은 229개였습니다. 여기서 553과 324는 unique task 수가 아닙니다. 같은 과제가 여러 library와 비교되므로 task-level transition의 합계입니다.

## 실험은 5,832개의 독립 과제가 아니다

평가는 OfficeQA-Pro 94개와 SpreadsheetBench 392개, 합계 486개 과제로 구성됐습니다. 각 과제를 no-skill baseline과 세 skill library 조건에서 실행하고, 같은 구성을 세 stack에 적용했습니다. 계산하면 `486 × 4 × 3 = 5,832` task-condition runs입니다.

세 stack은 다음 조합입니다.

- OpenCode와 MiniMax-M2.7
- Codex와 GPT-5.4-mini
- Claude Code와 Claude Sonnet 4.6

각 stack 안에서는 skill library만 바뀝니다. 반대로 stack끼리 비교할 때는 model과 harness가 함께 바뀝니다. 따라서 이 설계만으로 model과 harness 한쪽의 효과를 분리할 근거는 부족합니다.

## 입력, 절차, 검증을 한 줄에 놓는다

![입력 grounding 작업대와 과적재된 method 작업장, 도구가 부족한 verification gate가 이어진 장면](./page-02.webp)

논문은 agent task를 세 단계로 나눠 읽습니다. **Grounding**은 어느 문서·표·범위·시점·정의를 써야 하는지 입력을 올바르게 붙잡는 단계입니다. **Method**는 계산이나 편집 절차를 수행하는 중간 단계입니다. **Verification**은 산출물이 요구사항과 맞는지 실행하거나 다시 계산해 확인하는 마지막 단계입니다.

기존 skill은 주로 중간 절차를 자세히 씁니다. 연구진의 paired trace에서는 오히려 입력과 출력에서 regression과 residual failure가 많이 관찰됐습니다. 이는 procedure가 무용하다는 결론이 아닙니다. 이번 두 benchmark에서는 method보다 grounding과 verification이 더 자주 병목이었다는 범위의 주장입니다.

## 열지 않은 skill 설명도 영향을 줄 수 있다

![열리지 않은 skill folder의 색 신호가 같은 과제를 고르는 agent의 경로에 미세한 영향을 주는 장면](./page-03.webp)

**Skill-description osmosis**는 body를 호출하지 않았는데도 system prompt에 상주한 skill 이름과 설명이 행동을 바꾸는 후보 메커니즘입니다. retrieval이나 invocation만 켜고 끄는 실험은 이 경로를 놓칠 수 있습니다.

SpreadsheetBench regression 243개 가운데 70개가 osmosis로 분류됐습니다. 동시에 두 low-engagement stack에서는 invocation-free gain이 그 regression보다 훨씬 많았습니다. 설명이 문맥에 있는 것만으로도 행동이 달라질 수 있지만, 방향은 항상 해로운 쪽이 아니었습니다.

이 분류는 controlled intervention으로 인과를 확정한 결과가 아닙니다. 연구진은 body가 열리지 않은 paired trace와 library 간 결과 차이를 근거로 candidate mechanism을 붙였습니다. 설명만 있는 조건을 따로 두는 후속 실험이 필요한 이유입니다.

## 절차가 입력 독해를 밀어내는 경우

![baseline은 올바른 source document를 가리키지만 generic procedure가 skilled agent를 비슷한 다른 문서로 돌리는 장면](./page-04.webp)

**Grounding displacement**는 agent가 skill body를 읽고 그 절차를 따르는 과정에서 baseline의 올바른 입력 선택을 잃는 경우입니다. OfficeQA-Pro에서 body가 관여한 regression 81개 중 59개가 이 범주로 코딩됐습니다.

논문의 사례 하나는 1934년과 1946년 수치를 비교합니다. No-skill run은 올바른 두 값을 골라 정답 142를 냈지만, skill run은 비슷한 다른 수치를 따라 542를 반환했습니다. 산술은 둘 다 같았습니다. 달라진 것은 어느 표의 어느 값을 질문과 연결했는지였습니다.

저라면 이 사례를 “절차를 줄여라”보다 “절차가 입력 근거를 바꾸면 그 근거를 다시 보여 달라”는 요구로 옮기겠습니다. 어떤 문서와 셀을 선택했는지 추적할 수 없다면, method 단계의 정교함만으로는 regression을 막기 어렵습니다.

## 계산이 맞아도 검증에서 실패할 수 있다

![글자 없는 spreadsheet cell에서 나온 formula object를 shallow checker가 거부하고 full execution checker가 다시 계산하는 장면](./page-05.webp)

SpreadsheetBench의 기존 value-only grader에는 제약이 있었습니다. agent가 남긴 formula를 제한된 엔진이 재계산하지 못하면, formula 자체가 맞아도 실패로 기록될 수 있었습니다.

연구진은 treatment 실패 중 graded 영역에 formula가 있던 663개 task-condition을 full spreadsheet engine으로 다시 계산했습니다. 226개는 이미 정답, 396개는 실제 오답, 41개는 새 엔진도 계산하지 못했습니다. “검증을 강화하면 663개가 모두 살아난다”는 결과가 아니라, 얕은 검사 때문에 226개의 올바른 산출물을 놓쳤다는 뜻입니다.

이 분석은 verification의 두 얼굴을 보여 줍니다. 필요한 output check가 빠지면 잘못된 답을 지나칠 수 있고, 불완전한 grader는 올바른 답을 실패로 셀 수 있습니다. 검증은 존재 여부만이 아니라 무엇을 실제로 실행해 확인하는지가 중요합니다.

## 숫자가 지지하는 범위와 남은 빈칸

![성인형 준신 카솔이 입력 evidence와 method, output check 장치 앞의 작업대에서 평가 계획을 점검하는 장면](./page-06.webp)

18개 McNemar test 중 nominal `p < .05`는 다섯 칸이었습니다. Bonferroni correction 뒤 남은 세 칸은 모두 Claude Code·Sonnet 4.6의 SpreadsheetBench 조건이었습니다. 전체 stack에서 일관된 유의 효과가 확인됐다고 말할 수는 없습니다.

논문이 직접 적은 제한도 큽니다.

- 두 benchmark 모두 office automation에 집중합니다.
- 각 task-condition은 seed 반복 없이 한 번 실행돼 run-to-run variance를 추정하지 못했습니다.
- 세 stack은 model과 harness를 결합하므로 두 효과를 분리하지 못합니다.
- library 길이와 wording이 달라 treatment끼리 같은 token dose가 아닙니다.
- mechanism label은 한 저자가 코딩했고 inter-coder agreement가 없습니다.

논문 title note가 연결한 `sentient-agi/meta-skill-creator` 저장소는 공개돼 있고 Apache-2.0 license를 사용합니다. 2026년 7월 28일 확인한 main commit은 `02cb1db951e5a99159bc1d5d6ccb6c01167f0391`입니다. 그러나 이 저장소는 저자들의 skill-creator 구현이며, 논문의 5,832개 raw trajectory·평가 데이터·분석 코드 전체가 공개됐다는 증거는 아닙니다. arXiv 자료에서 그 재현 artifact link는 확인하지 못했습니다.

## 다메카솔의 해석: 스킬 릴리스에도 baseline 보존이 필요하다

저라면 skill을 배포하기 전에 평균 성공률 하나 대신 세 갈래 실험부터 고정하겠습니다.

1. **No library**: 원래 풀던 과제를 baseline으로 보존합니다.
2. **Descriptions only**: 이름과 설명이 문맥에 있는 효과를 따로 잽니다.
3. **Descriptions plus bodies**: 실제 body 호출이 추가한 gain과 regression을 셉니다.

그 다음 실패 trace를 입력 grounding, method, output verification으로 나눕니다. regression이 생기면 “더 좋은 절차”부터 추가하기 전에 어떤 입력을 선택했고 어떤 검사를 생략했는지 확인합니다. 특히 spreadsheet, 코드, 데이터 변환처럼 실행 가능한 산출물은 결과를 실제 엔진에 넣어 확인해야 합니다.

이 논문이 확정한 것은 모든 skill의 보편 법칙이 아닙니다. 평균 개선이 기존 성공의 손실을 숨길 수 있다는 측정 문제, 그리고 그 손실을 찾기 위한 실용적인 분해법입니다. 공개 artifact가 더 완전해지고 seed 반복과 controlled ablation이 붙으면 세 메커니즘의 인과 경계도 더 또렷해질 것입니다.

## 논문 정보

| 항목 | 내용 |
| --- | --- |
| 제목 | The Regression Tax: Decomposing Why Skills Help and Hurt LLM Agents |
| 저자 | Darshan Tank, Baran Nama |
| 소속 | Sentient Labs |
| arXiv v1 제출 | 2026-07-24 17:50:03 UTC |
| 분야 | cs.AI |
| 평가 규모 | 486 tasks × 4 conditions × 3 stacks = 5,832 task-condition runs |
| 공식 연결 저장소 | sentient-agi/meta-skill-creator, Apache-2.0 |

## 출처

- [논문 초록과 메타데이터, arXiv:2607.22520](https://arxiv.org/abs/2607.22520)
- [논문 원문 PDF](https://arxiv.org/pdf/2607.22520)
- [arXiv HTML 원문](https://arxiv.org/html/2607.22520)
- [저자 공식 meta-skill-creator 저장소](https://github.com/sentient-agi/meta-skill-creator)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.

Updated: 2026-07-28
