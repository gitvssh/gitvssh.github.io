---
title: "컴퓨터 사용 AI 에이전트가 화면 좌표 대신 의미를 누르는 법: Tactile 분석"
description: "AI 에이전트에게 마우스 조작을 시켰을 때 왜 엉뚱한 곳을 클릭하거나 멈칫거릴까요? 단순 스크린샷 픽셀 좌표 추정을 넘어 OS 접근성 트리(Accessibility Tree)를 1급 인터페이스로 활용하는 Tactile 아키텍처를 분석합니다."
slug: "tactile-computer-use-agents"
publishedAt: 2026-07-17
updatedAt: 2026-07-17
track: paper
subtype: systems
tags:
  - "AI 에이전트"
  - "멀티모달 AI"
audience: developer
readerOutcome: "Computer Use AI 에이전트의 시각(Vision) 좌표 제어의 한계를 이해하고, OS 접근성 API·OCR·VLM을 계층적으로 결합하는 신뢰성 높은 GUI 자동화 파이프라인을 설계할 수 있다."
contentFormats:
  - article
  - comic
  - table
  - diagram
freshnessStatus: current
reviewedAt: 2026-07-17
reviewAfter: 2026-10-17
cover: "./cover.webp"
coverAlt: "카솔이 흔들리는 좌표 십자선과 역할·상태가 드러난 버튼을 비교해 가리키는 표지"
sourceUrl: "https://arxiv.org/abs/2607.14443"
featured: false
draft: false
---
글·해설: 다메카솔

Claude 3.5 Sonnet이나 OpenAI의 Computer Use 에이전트에게 화면 조작을 맡겨보면, `(x, y)` 픽셀 좌표를 미세하게 빗맞히거나, 버튼이 아직 비활성화(Disabled) 상태인데도 무의미하게 클릭을 반복하는 모습을 자주 보게 됩니다.

이 문제의 근본 원인은 **"에이전트가 화면의 구조적 의미(Semantic)를 모른 채 오직 평면 스크린샷 픽셀만 보고 마우스 좌표를 찍어 누르기 때문"**입니다.

최근 발표된 시스템 논문 **Tactile: Giving Computer-Using Agents Hands and Feet**는 이 문제를 해결하기 위해 **OS의 접근성 트리(Accessibility Tree)를 1순위로 읽고, OCR과 VLM 시각 제어를 단계적으로 결합하는 계층적 GUI 제어 아키텍처**를 제안했습니다.

이번 글에서는 Computer Use 에이전트가 픽셀 좌표의 한계를 넘어 실제 UI 오브젝트를 안전하게 다루는 원리를 살펴보겠습니다.

## 스크린샷 기반 GUI 조작이 번번이 실패하는 이유

![보내기 모양 버튼을 본 커서가 좌표를 빗나가고 성공 여부를 확인하지 못하는 세 장면](./page-00.webp)

인간은 화면을 볼 때 단순히 색상 픽셀을 보는 것이 아니라 "이것은 클릭 가능한 확인 버튼이고 현재 활성화되어 있다"는 **UI 컴포넌트의 상태와 의미**를 즉각 이해합니다.

반면 순수 비전 모델(VLM) 기반의 에이전트는:
1. 고해상도 화면 캡처 이미지를 압축하는 과정에서 텍스트 해상도가 뭉개짐
2. 버튼이 눌렸는지(Active), 로딩 중인지, 회색 비활성 상태인지 픽셀만으로 판별하기 어려움
3. 클릭 후 창이 바뀌었는지 여부를 검증할 피드백 루프가 부실함

결국 "좌표를 잘못 계산한 건지, 앱이 렉이 걸린 건지, 이미 성공했는데 모르는 건지" 디버깅이 불가능한 상태에 빠집니다.

## Tactile의 해결책: '접근성 우선(Accessibility-first)' 사다리

![접근성 의미, OCR 좌표, 시각 제어의 세 층을 위에서 아래로 배치한 운영 사다리](./page-01.webp)

Tactile은 화면 조작 시 증거의 신뢰도에 따라 3단계 사다리 모델을 구축했습니다:

1. **1순위: OS 접근성 트리 (Accessibility API)**  
   - macOS의 Accessibility API나 Windows UI Automation을 통해 버튼의 고유 ID, 텍스트 라벨, 활성/비활성 상태, `AXPress` 같은 네이티브 실행 이벤트를 직접 조회합니다.  
   - 마우스 커서를 움직여 클릭할 필요 없이 OS 이벤트로 즉시 정확한 액션을 트리거합니다.
2. **2순위: 텍스트 OCR 좌표**  
   - 접근성 메타데이터가 부실한 커스텀 UI의 경우, 로컬 OCR 엔진을 돌려 글자의 바운딩 박스 중심점을 정확히 타깃합니다.
3. **3순위: VLM 시각 제어 (Fallback)**  
   - 캔버스 그림판이나 그래픽 툴처럼 접근성 트리나 글자가 전혀 없는 영역에 한해서만 스크린샷 기반 시각 좌표 예측으로 내려갑니다.

## 좌표 `(x, y)` 대신 '행동 가능한 UI 객체'를 생성

![중앙 버튼 후보로 역할, 상태, 행동, 근거의 네 정보 타일이 합쳐지는 도식](./page-02.webp)

Tactile 환경에서 에이전트가 입력받는 정보는 단순한 화면 이미지가 아니라 다음과 같이 구조화된 **인터페이스 후보 객체**입니다:

```json
{
  "target": "Submit Button",
  "source": "Accessibility_API",
  "state": { "visible": true, "enabled": true, "focused": false },
  "supported_actions": ["Native_Press", "Click"],
  "verification_hint": "Check if Dialog Closed"
}
```

에이전트는 이 구조화된 정보를 보고 "활성화된 확인 버튼을 네이티브 이벤트로 누르고, 모달창이 닫혔는지 확인하라"는 안전하고 명확한 명령을 내릴 수 있습니다.

## 4단계 통제 루프: 관찰 ➡️ 타깃팅 ➡️ 실행 ➡️ 결과 검증

![관찰, 목표 고정, 실행, 검증이 원형 화살표로 이어지고 검증이 다시 관찰로 돌아가는 루프](./page-03.webp)

Tactile은 단발성 클릭으로 끝내지 않고 완결된 4단계 제어 루프를 돕니다:
1. **관찰 (Observe)**: OS 접근성 노드와 화면 상태 수집
2. **목표 고정 (Target)**: 신뢰도가 가장 높은 UI 후보 선정
3. **실행 (Act)**: 네이티브 OS 이벤트 우선 실행 (안전성 극대화)
4. **검증 (Verify)**: 화면과 상태 트리를 재조회하여 기대했던 변화(체크박스 체크됨, 페이지 전환 등)가 실제로 일어났는지 확인

벤치마크 평가 결과, Codex 에이전트에 Tactile을 결합했을 때 GUI 작업 성공률(Success@100)이 **41%에서 50%로 유의미하게 향상**되었습니다.

## 다메카솔의 해석: RPA와 AI 에이전트가 만나는 지점

Computer Use AI를 연구하거나 사내 업무 자동화(RPA) 시스템을 구축하는 엔지니어에게 Tactile은 매우 현실적인 아키텍처 인사이트를 제공합니다.

1. **비전 모델 만능주의 탈피**: 화면 전체를 초당 수십 장씩 VLM에 밀어 넣는 것은 토큰 비용과 지연 시간(Latency) 면에서 프로덕션에 적합하지 않습니다. OS가 이미 무료로 제공하는 접근성 메타데이터를 최대한 활용해야 합니다.
2. **웹 접근성(a11y)의 중요성 재조명**: HTML 표준 태그(`button`, `aria-label`)를 준수하여 시각 장애인을 위한 접근성을 잘 갖춘 웹사이트일수록, 미래의 AI 에이전트도 훨씬 더 정확하고 오류 없이 조작할 수 있습니다.
3. **상태 피드백 기반의 자가 치유**: 클릭 명령어 직후 화면의 DOM/접근성 변화를 즉각 검증하는 피드백 루프가 있어야 에이전트의 무한 루프 장애를 막을 수 있습니다.

## 함께 읽을 AI 시스템 글

- [AI 코딩 에이전트 작업 공간 격리(Orca)와 권한 통제](/posts/orca-ai-coding-agent-workspaces/)
- [LLM 에이전트 스킬 주입과 회귀(Regression Tax) 방어 전략](/posts/llm-agent-skill-regression-tax/)

## 출처

- [Tactile: Giving Computer-Using Agents Hands and Feet, arXiv:2607.14443](https://arxiv.org/abs/2607.14443)
- [Tactile Official GitHub Repository](https://github.com/yliust/Tactile)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
