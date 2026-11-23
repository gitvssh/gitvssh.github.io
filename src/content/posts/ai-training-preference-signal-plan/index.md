---
title: "AI 학습 선호 공통 신호, OpenAI 도입은 아직 예정"
description: "OpenAI의 AI 학습 선호 공통 신호 도입 계획과 기존 크롤러 제어, IETF 개인 초안 상태를 구분합니다."
slug: "ai-training-preference-signal-plan"
publishedAt: "2026-11-02T00:23:35Z"
updatedAt: "2026-11-20"
track: "news"
subtype: "release_announcement"
tags: ["OpenAI", "robots.txt", "AI 학습"]
audience: "developer"
readerOutcome: "공통 학습 선호 신호의 도입 계획과 현재 크롤러 제어, 표준화 상태를 구분한다."
contentFormats: ["comic", "article"]
freshnessStatus: "current"
reviewedAt: "2026-11-02"
reviewAfter: "2026-11-09"
cover: "./cover.webp"
coverAlt: "도입 예정인 공통 학습 선호 신호를 살피는 카솔"
sourceUrl: "https://openai.com/index/helping-websites-express-ai-training-preferences/"
featured: false
draft: false
---

OpenAI가 웹사이트의 AI 학습 선호를 한 번에 전달하는 공통 `robots.txt` 신호를 지원하겠다고 발표하자, 지금 운영 중인 규칙을 바로 고쳐야 할지 고민하는 개발자가 많습니다. 하지만 2026년 10월 30일 공개된 [OpenAI 공식 발표](https://openai.com/index/helping-websites-express-ai-training-preferences/)는 서비스 적용 완료를 알리기보다 **향후 몇 달** 안에 도입할 계획을 밝힌 문서에 가깝죠. 발표 내용과 연결된 초안 문서를 나란히 짚어 보면, 지금 유지할 설정과 앞으로 지켜볼 변화가 또렷하게 구분됩니다.

글·해설: 다메카솔

## 기존 크롤러 제어는 그대로 유지됩니다

발표문에서 먼저 확인할 지점은 도입 일정과 기존 설정의 관계입니다. OpenAI는 웹사이트가 `robots.txt`로 AI 학습 선호를 여러 참여 업체에 함께 알리는 공통 신호를 존중하겠다고 밝혔지만, 실제 구현은 향후 몇 달 안에 진행할 예정이거든요. 회사가 구현할 때 세부 사항을 다시 알리겠다고 언급한 만큼, 11월 2일 확인 시점에는 작동 중인 기능이 아니라 앞으로 도입될 계획으로 읽는 편이 정확합니다.

운영자 입장에서 더 중요한 대목은 현재 규칙의 유효성입니다. OpenAI는 이번 공통 신호가 **기존 크롤러 제어**를 대체하지 않으며 기존 `robots.txt` 제어를 계속 존중한다고 설명했는데요. 따라서 사이트 운영자가 발표 소식만 보고 현재 설정된 크롤러별 규칙을 성급히 지울 근거는 찾기 어렵고, 당분간은 기존 규칙을 그대로 둔 채 후속 공지를 기다리는 쪽이 안전합니다.

![기존 제어 유지와 공통 신호의 초안 상태를 구분하는 만화](./page-01.webp)

## 접근 허용과 학습 선호를 구분하는 제안 구조

공통 신호가 줄이려는 것은 크롤러마다 같은 의사를 반복해 적어야 하는 관리 부담입니다. 발표가 연결한 제안 문서는 개별 크롤러의 접근 규칙과 별도로 콘텐츠의 **학습 용도**에 대한 선호를 표현하며, 경로별 학습 선호(path-based training preferences)를 담는 방식을 다룹니다.

가령 기술 블로그와 제품 문서를 한 도메인에서 운영하는 개발팀을 떠올려 볼까요? 이 팀은 일반 페이지 열람을 위한 크롤러 접근은 열어 두되, 공지 영역이나 기술 문서 경로별로 AI 모델 학습 활용 선호만 따로 전달하고 싶어 합니다. 그동안은 AI 크롤러가 늘어날 때마다 `robots.txt`에 크롤러 이름을 추가해 같은 정책을 되풀이해 적어야 했죠. 이번 제안은 페이지 접근 허용과 학습 용도 선호를 서로 다른 층위로 나누어, 경로 단위 의사를 공통 신호로 전하려는 설계 방향을 보여 줍니다.

## IETF 개인 초안 상태와 한눈에 보는 구분표

연결된 규격 문서의 현재 지위도 정확히 가려 읽어야 합니다. OpenAI가 링크한 [초안 상태와 본문](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)은 10월 30일 갱신된 `Machine-Readable Training Preference Signal draft 00`으로, IETF Datatracker상 **개인 초안(Internet-Draft)**입니다. Datatracker 역시 이 문서가 IETF의 승인을 받거나 표준 절차에서 공식 지위를 얻은 상태가 아님을 분명히 명시해 두었습니다.

제목이나 링크 경로에 표준화 논의와 맞닿은 용어가 들어가더라도, 개인 초안은 아직 확정된 IETF 표준과 거리가 있습니다. 발표 내용과 초안 문서의 상태를 한눈에 비교할 수 있도록 핵심 기준을 표로 정리했습니다.

| 구분 항목 | 2026년 11월 2일 확인 상태 | 실무 해석 기준 |
| --- | --- | --- |
| OpenAI 도입 시점 | 향후 몇 달 내 구현 계획 발표 (10월 30일) | 적용 완료가 아닌 향후 지원 예정 단계 |
| 기존 `robots.txt` 제어 | 계속 존중하며 공통 신호가 대체하지 않음 | 현재 운영 중인 개별 크롤러 규칙 유지 |
| 신호의 표현 범위 | 접근 규칙과 별도로 경로별 학습 용도 선호 표현 | 페이지 접근 허용과 학습 선호 분리 관리 |
| IETF 문서 지위 | 개인 초안(`draft 00`), 공식 표준 미승인 | 세부 문법·적용 방식의 확정 단정 보류 |

표에서 보듯 공통 의사를 전할 방향은 잡혔지만, 표준 확정과 크롤러 구현까지는 시차가 남아 있습니다. 특히 `robots.txt` 기반 선호 신호는 참여 업체의 구현과 준수에 기대어 동작하는 구조이므로, 세부 공지 전에 특정 문법이나 법적 효력을 미리 전제해 설정을 바꾸기는 이른 편입니다.

## 지금 웹사이트 운영자가 점검할 실무 기준

이번 발표가 전하는 실무적 의미는 여러 업체에 공통 학습 선호를 알릴 방향이 생겼다는 데 있습니다. 후속 구현 공지가 나오기 전까지는 아래 세 가지 기준으로 현재 구성을 점검해 두면 충분합니다.

- **기존 크롤러 제어 유지**: OpenAI가 기존 `robots.txt` 제어를 계속 존중한다고 밝힌 만큼, 이미 적용해 둔 크롤러별 규칙을 삭제하지 않고 유지합니다.
- **접근 규칙과 학습 선호 분리 점검**: 페이지 열람용 크롤링 허용 범위와 경로별 AI 학습 활용 선호를 내부 정책에서 따로 정리해 두면 향후 반영 대상을 정하기 수월합니다.
- **후속 구현 안내와 초안 개정 확인**: OpenAI가 구현 시점에 다시 공유할 세부 사항과 IETF 개인 초안의 개정 여부를 확인한 뒤 실제 적용 일정을 잡습니다.

## 출처

- OpenAI, [OpenAI 공식 발표](https://openai.com/index/helping-websites-express-ai-training-preferences/) (`Making it easier for websites to express AI training preferences`, 2026년 10월 30일 발표, 2026년 11월 2일 확인).
- IETF Datatracker, [초안 상태와 본문](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/) (`Machine-Readable Training Preference Signal draft 00`, 2026년 10월 30일 갱신 개인 초안).

발표문과 공개 초안 문서를 바탕으로 정리했으며, 실제 크롤러의 준수 동작 시험이나 법적 효력 검토는 포함하지 않았습니다.
이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
