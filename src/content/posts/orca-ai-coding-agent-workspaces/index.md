---
title: "Orca란? 여러 AI 코딩 에이전트의 작업 공간을 나누는 도구"
description: "Codex, Claude Code 등 여러 AI 코딩 에이전트를 동시에 돌릴 때 생기는 파일 충돌을 어떻게 해결할까요? Git Worktree 기반으로 에이전트 작업 공간을 격리하고 통제하는 Orca 아키텍처를 분석합니다."
slug: "orca-ai-coding-agent-workspaces"
publishedAt: 2026-07-25
updatedAt: 2026-07-25
track: tech_column
subtype: architecture
category: ai_tools
tags:
  - "AI 코딩 도구"
  - "Git"
  - "코드 리뷰"
  - "AI 활용"
audience: builder
readerOutcome: "AI 코딩 모델, CLI 에이전트, 오케스트레이션 도구의 계층 구조를 이해하고, Git Worktree 기반의 작업 격리와 안전한 권한 제어 가드레일을 구축할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-25
reviewAfter: 2026-10-25
cover: "./cover.webp"
coverAlt: "여러 AI 코딩 에이전트의 작업 공간을 분리하는 Orca를 상징적으로 표현한 표지"
sourceUrl: "https://www.onorca.dev/docs"
featured: false
draft: false
---
글·해설: 다메카솔

Claude Code나 Codex 같은 AI 코딩 에이전트 2~3개를 하나의 프로젝트에서 동시에 돌려보신 적 있으신가요? 

에이전트 A가 백엔드 리팩토링을 진행하는 도중에 에이전트 B가 동일한 파일을 수정해 버리면서 **Git 브랜치와 워킹 디렉터리가 엉망진창으로 꼬이는 충돌(Conflict)**을 겪게 됩니다. 결국 AI가 코딩하는 속도보다 개발자가 충돌을 해결하고 변경점을 수작업으로 검토하는 데 더 많은 시간이 낭비됩니다.

이 문제의 본질은 "모델 성능이 부족해서"가 아니라 **"여러 에이전트의 작업 공간과 컨텍스트가 물리적으로 격리되지 않았기 때문"**입니다. 

오픈소스 도구 **Orca**는 새로운 AI 모델이 아니라, **여러 코딩 에이전트를 각자의 독립된 'Git Worktree'로 분리하고 변경사항을 안전하게 검토·병합할 수 있도록 돕는 데스크톱 오케스트레이션 환경**입니다.

이번 글에서는 멀티 에이전트 코딩 환경의 아키텍처적 과제와 Orca의 작업 격리 메커니즘을 살펴보겠습니다.

## 모델 ➡️ 에이전트 ➡️ 오케스트레이터의 3계층 구조

![모델, 에이전트, worktree를 세 층으로 구분해 보여 주는 만화](./page-02.webp)

AI 코딩 생태계를 정확히 이해하려면 다음 3가지 계층을 명확히 분리해서 바라보아야 합니다:

| 계층 | 주요 역할 | 대표 예시 |
| :--- | :--- | :--- |
| **1. 파운데이션 모델** | 언어와 코드 패턴을 학습하여 다음 토큰을 예측 | Claude Sonnet, GPT-5, DeepSeek |
| **2. CLI 코딩 에이전트** | 모델을 바탕으로 터미널 셸을 열고, 파일을 읽고 쓰고 커밋을 생성 | Codex CLI, Claude Code, OpenCode |
| **3. 워크스페이스 오케스트레이터** | 여러 에이전트에게 독립된 작업 공간을 배정하고 병합 흐름을 관리 | **Orca** |

Orca는 특정 모델에 종속되지 않고, 개발자가 기존에 구독하고 있는 여러 CLI 에이전트들을 한 화면에 탭 형태로 띄워두고 병렬로 제어할 수 있게 해줍니다.

## 왜 브랜치 체크아웃 대신 'Git Worktree'인가?

![한 공유 폴더에서 얽힌 작업이 각각의 worktree로 분리되는 만화](./page-01.webp)

동일한 로컬 저장소 폴더에서 단순히 `git checkout -b feature-a`로 브랜치만 바꾼다면, 에이전트 A가 작업을 끝내기 전까지 다른 에이전트가 그 폴더를 건드릴 수 없습니다.

**Git Worktree**는 단일 `.git` 저장소를 공유하면서도, **디스크의 서로 다른 디렉터리에 물리적으로 독립된 작업 트리(Working Tree)를 동시에 생성**할 수 있는 Git의 내장 기능입니다:

- `~/project/worktrees/fix-bug-123` ➡️ 에이전트 A 전용 작업 공간
- `~/project/worktrees/refactor-auth` ➡️ 에이전트 B 전용 작업 공간
- `~/project/worktrees/docs-update` ➡️ 에이전트 C 전용 작업 공간

Orca는 이슈나 프롬프트가 들어올 때마다 백그라운드에서 Worktree를 자동으로 생성하고, 해당 폴더 안에서 에이전트 프로세스를 격리 기동하여 **파일 쓰기 간섭을 100% 차단**합니다.

## 주의: Worktree는 '보안 샌드박스'가 아니다

![분리된 worktree와 별개로 권한 검토 게이트가 필요한 모습을 보여 주는 만화](./page-03.webp)

여기서 반드시 짚고 넘어가야 할 보안적 한계가 있습니다.

Git Worktree는 **'파일과 브랜치의 충돌을 막아주는 작업 공간의 분리'**일 뿐, 프로세스의 시스템 접근 권한을 가두는 **'도커(Docker)나 VM 수준의 격리 샌드박스'가 아닙니다.**

에이전트가 Worktree 내부에서 `rm -rf /`를 치거나 터미널에서 로컬 환경 변수(`.env`), SSH 키를 탈취하는 악성 셸 스크립트를 실행한다면 호스트 OS 전체가 피해를 입게 됩니다.

따라서 Orca를 사용할 때는 무작정 자동 실행(`Yolo` 모드)을 켜두지 말고:
1. **명령어 수동 승인(`Manual` 모드)**을 기본값으로 유지
2. 중요한 운영 AWS 자격 증명이나 프로덕션 DB 패스워드가 있는 환경에서는 격리된 개발 컨테이너 내부에서만 에이전트를 구동해야 합니다.

## AI가 짠 코드의 최종 검증 책임

![여러 변경 결과를 사람이 검토, 수정, 테스트한 뒤 병합하는 만화](./page-04.webp)

아무리 3~4개의 에이전트가 동시에 고속으로 코드를 뽑아내더라도, **"빨리 나왔다는 사실이 올바른 아키텍처라는 뜻은 아닙니다."**

Orca의 진짜 가치는 생성 속도가 아니라, **에이전트가 수정한 Diff를 시각적으로 검토하고(Diff Viewer), 특정 코드 라인에 피드백 주석을 달아 에이전트에게 재작성을 요청하며, 단위 테스트를 거쳐 안전하게 메인 브랜치로 병합(Merge)하는 통제 루프**를 제공한다는 데 있습니다.

## 다메카솔의 해석: AI 코딩 시대, 엔지니어의 역할은 '코드 작성자'에서 '테크 리드'로

여러 에이전트가 병렬로 코드를 생산하는 환경에서 개발자의 역할은 타자수가 아니라 **"코드 리뷰어이자 아키텍처 설계자(Tech Lead)"**로 진화합니다.

실무에서 멀티 에이전트 파이프라인을 도입할 때 다음 3가지를 권장합니다:

1. **태스크 단위의 명확한 경계 분리**: 1개의 Worktree에는 1개의 명확하고 독립적인 이슈(단일 책임 원칙)만 할당하세요.
2. **테스트 자동화 가드레일**: 에이전트가 코드를 완성했다고 보고해도, CI 파이프라인의 유닛 테스트와 린터(Linter)를 100% 통과하기 전에는 절대 `main` 브랜치에 머지하지 마세요.
3. **보안 최소 권한 원칙**: 에이전트 터미널에는 쓰기 권한을 필요한 폴더로 최소화하고, 외부 네트워크 호출을 모니터링해야 합니다.

## 함께 읽을 AI/개발 도구 글

- [LLM 에이전트 스킬 주입과 성능 회귀(Regression Tax) 방어 전략](/posts/llm-agent-skill-regression-tax/)
- [워크플로우를 지식으로 자산화하는 엔지니어링 방법론](/posts/workflow-as-knowledge/)

## 출처

- [Orca Official Documentation](https://www.onorca.dev/docs)
- [Orca Official GitHub Repository](https://github.com/stablyai/orca)
- [Git Documentation — git-worktree](https://git-scm.com/docs/git-worktree)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
