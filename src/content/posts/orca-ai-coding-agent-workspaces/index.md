---
title: "Orca란? 여러 AI 코딩 에이전트의 작업 공간을 나누는 도구"
description: "Orca는 Codex나 Claude Code를 대체하는 모델이 아니라, 여러 코딩 에이전트를 각자의 Git worktree로 나눠 주는 데스크톱 환경입니다. 권한 우회 기본값과 안전한 첫 사용 범위까지 살펴봅니다."
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
readerOutcome: "독자는 Orca가 모델이나 에이전트 자체가 아니라 여러 AI 코딩 에이전트의 worktree와 검토 흐름을 정리하는 환경임을 이해하고, 권한 우회 기본값을 검토한 뒤 안전한 첫 사용 범위를 정할 수 있다."
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
한 에이전트가 만든 변경을 읽기도 전에 다른 에이전트가 같은 파일을 고치기 시작하면, 속도보다 비교와 정리가 먼저 병목이 됩니다. Orca는 이런 상황에서 Codex나 Claude Code를 대체하는 모델이 아니라, 여러 코딩 에이전트가 각자의 Git worktree에서 일하도록 정리하는 데스크톱 환경입니다.

글·해설: 다메카솔

## 핵심 요약

Orca는 작업마다 별도의 worktree, 에이전트 터미널, 브라우저를 두고 여러 AI 코딩 에이전트를 관리하는 도구입니다. 기존의 Codex, Claude Code 같은 CLI 에이전트와 구독을 가져와 쓰는 방식이라, 모델의 능력보다 **작업 분리와 변경 검토**를 다룹니다. [Orca 공식 소개](https://www.onorca.dev/docs)

## 왜 지금 Orca를 봐야 하나

AI 코딩 도구의 관심은 더 좋은 모델을 고르는 데서 끝나지 않습니다. 여러 에이전트를 동시에 돌릴 때 **작업을 어떻게 나누고, 결과를 누가 검토하고, 어떤 변경을 병합할지**가 다음 병목이 됩니다. Orca는 바로 이 운영 층을 전면에 둔 도구입니다.

그 관심은 공개 저장소에서도 확인할 수 있습니다. 2026년 7월 25일 확인 시점에 [stablyai/orca GitHub 저장소](https://github.com/stablyai/orca)는 약 **2.84만 스타**, 약 **2천 포크**, **7,243개 커밋**을 표시했습니다. 동시에 Codex·Claude Code·OpenCode 같은 CLI 에이전트를 각 worktree에서 병렬로 실행하고, 변경을 비교·검토하는 흐름을 공개적으로 내세웁니다.

다만 이 숫자는 ‘커뮤니티가 주목하고 있다’는 신호일 뿐입니다. 보안성, 제품 완성도, 내 저장소에 맞는 권한 설정까지 보증하지는 않습니다. 그래서 이 글은 스타 수로 도입을 권하지 않고, **왜 에이전트 오케스트레이션이 지금 읽어 볼 주제인지**를 이해한 뒤 작은 범위에서 검증하는 방법으로 이어집니다.

## 에이전트를 늘리기 전에 작업 공간이 먼저 엉킨다

한 저장소에서 여러 에이전트가 동시에 움직이면, 누가 어떤 파일을 바꿨는지와 어느 변경을 남길지가 문제로 남습니다. 프롬프트를 나눴다고 파일 충돌까지 사라지는 것은 아닙니다.

Orca는 작업마다 실제 Git worktree를 만들고, 그 안에 브랜치·파일·에이전트 터미널을 연결하는 구조를 안내합니다. 즉, ‘버그 조사’, ‘문서 정리’, ‘새 기능 시안’을 각각 다른 작업 공간에서 시작할 수 있습니다. [Orca의 worktree 설명](https://www.onorca.dev/docs/model/worktrees)

![한 공유 폴더에서 얽힌 작업이 각각의 worktree로 분리되는 만화](./page-01.webp)

## 모델, 에이전트, Orca는 서로 다른 층에 있다

이 셋을 같은 것으로 보면 도입 판단이 흐려집니다.

| 층 | 하는 일 | 예시 |
| --- | --- | --- |
| 모델 | 언어와 코드의 패턴을 바탕으로 답을 만든다 | 코딩 모델 |
| 에이전트 | 모델을 사용해 파일을 읽고, 명령을 실행하고, 변경을 제안한다 | Codex, Claude Code |
| Orca | 여러 에이전트의 작업 공간과 검토 흐름을 한 화면에서 정리한다 | worktree·터미널·diff 관리 |

Orca는 지원 목록에 없는 도구도 사용자 지정 CLI 에이전트로 등록할 수 있으며, 등록된 실행 파일은 현재 worktree를 작업 디렉터리로 사용합니다. 따라서 특정 모델 하나를 ‘더 똑똑하게’ 만드는 도구라기보다, 이미 쓰는 에이전트를 여러 작업에 배치하는 쪽에 가깝습니다. [사용자 지정 CLI 에이전트 문서](https://www.onorca.dev/docs/agents/custom-cli)

![모델, 에이전트, worktree를 세 층으로 구분해 보여 주는 만화](./page-02.webp)

## worktree는 보안 샌드박스가 아니다

여기서 가장 중요한 오해를 하나 막아야 합니다. worktree는 같은 Git 저장소에 연결된 여러 작업 트리입니다. Git 공식 문서도 worktree별 파일을 제외한 저장소 데이터가 공유될 수 있다고 설명합니다. [Git worktree 공식 문서](https://git-scm.com/docs/git-worktree)

그래서 worktree는 **파일과 브랜치가 서로 밟는 일을 줄이는 경계**이지, 에이전트 권한·네트워크 접근·비밀값을 자동으로 가둬 주는 보안 샌드박스는 아닙니다. 이는 Git의 공유 구조와 Orca의 에이전트 권한 설정을 함께 읽었을 때의 해석입니다.

공식 지원 에이전트 설정에는 확인을 건너뛰는 기본 인자가 있으며, 설정에서는 권한을 `Yolo` 또는 `Manual`로 조절할 수 있습니다. 처음에는 수동 승인을 선택하고, 비밀값이나 운영 권한이 있는 저장소는 별도 환경과 검토 절차를 먼저 정하는 편이 낫습니다. [지원 에이전트와 기본 인자](https://www.onorca.dev/docs/agents/supported), [권한 설정](https://www.onorca.dev/docs/settings)

![분리된 worktree와 별개로 권한 검토 게이트가 필요한 모습을 보여 주는 만화](./page-03.webp)

## 마지막 책임은 diff와 테스트에 남는다

여러 에이전트가 동시에 일하면 결과가 빨리 나올 수는 있습니다. 하지만 결과가 여러 개라는 사실은 정답이라는 뜻이 아닙니다. Orca는 worktree의 시작 기준점 이후 변경을 diff로 확인하고, 선택한 줄의 의견을 묶어 에이전트에게 다시 보낼 수 있는 검토 흐름을 제공합니다. [diff viewer](https://www.onorca.dev/docs/review/diff-viewer), [AI diff 주석](https://www.onorca.dev/docs/review/annotate-ai-diff)

첫 도입에서는 다음처럼 범위를 작게 두는 것이 좋습니다.

1. 민감하지 않은 저장소에서 worktree 하나와 에이전트 하나로 시작합니다.
2. 권한은 수동 승인으로 두고, 생성된 명령과 파일 변경을 읽습니다.
3. diff와 테스트를 통과한 변경만 병합합니다.
4. 이 흐름이 익숙해진 뒤에 작업과 에이전트를 늘립니다.

![여러 변경 결과를 사람이 검토, 수정, 테스트한 뒤 병합하는 만화](./page-04.webp)

## Orca가 잘 맞는 경우

| 상황 | Orca가 더해 주는 것 | 먼저 확인할 것 |
| --- | --- | --- |
| 같은 버그에 서로 다른 접근을 비교하고 싶다 | 작업별 worktree와 diff 비교 | 각 작업의 범위가 겹치지 않는가 |
| Codex와 Claude Code를 한 흐름에서 관리하고 싶다 | 에이전트별 실행 환경 정리 | 각 도구의 구독·권한·기본 인자 |
| AI가 만든 변경을 빠르게 여러 개 검토하고 싶다 | 시작 기준점 이후 diff 확인 | 테스트와 코드 리뷰 책임자 |
| 운영 권한·비밀값이 있는 저장소를 다룬다 | 작업 분리는 가능 | 수동 승인, 격리 환경, 비밀값 정책 |

Orca의 가치는 에이전트를 많이 띄우는 데 있지 않습니다. **누가 무엇을 바꿨는지 읽고, 필요하면 되돌릴 수 있는 흐름을 만드는 데** 있습니다.

## 공식 자료

- [Orca 소개](https://www.onorca.dev/docs)
- [Orca GitHub 저장소](https://github.com/stablyai/orca)
- [Worktrees](https://www.onorca.dev/docs/model/worktrees)
- [지원 에이전트](https://www.onorca.dev/docs/agents/supported)
- [권한 설정](https://www.onorca.dev/docs/settings)
- [Diff viewer](https://www.onorca.dev/docs/review/diff-viewer)
- [Git worktree 공식 문서](https://git-scm.com/docs/git-worktree)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다. 만화 이미지는 텍스트 없는 원화에 결정적 레터링을 합성해 만들었습니다. 공식 로고·UI·제품 화면·문서 도표 등 외부 이미지 자산은 사용하지 않았습니다.

_확인일: 2026-07-25. Orca의 지원 에이전트와 권한 기본값은 바뀔 수 있으므로 실제 도입 전 공식 문서를 다시 확인하세요._
