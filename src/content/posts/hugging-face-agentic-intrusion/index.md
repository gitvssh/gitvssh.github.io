---
title: "허깅페이스 AI 에이전트 침입, 토큰 교체와 활동 점검이 필요한 이유"
description: "허깅페이스 인프라 침해 사고 분석: 악성 데이터셋을 통한 원격 코드 실행(RCE)과 자율 AI 에이전트를 활용한 내부 권한 상승/측면 이동 메커니즘, 그리고 개발자가 즉시 취해야 할 보안 조치를 정리합니다."
slug: "hugging-face-agentic-intrusion"
publishedAt: 2026-07-19
updatedAt: 2026-07-20
track: news
subtype: incident_security
tags:
  - "AI 보안"
  - "AI 에이전트"
audience: developer
readerOutcome: "악성 AI 데이터셋 및 로더를 통한 원격 코드 실행(RCE) 위험을 이해하고, Fine-grained 토큰 분리와 감사 로그 분석을 통해 AI 워크플로우 보안을 강화할 수 있다."
contentFormats:
  - article
  - comic
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-20
reviewAfter: 2026-08-02
cover: "./cover.webp"
coverAlt: "카솔이 데이터 처리 관문에서 내부 서버로 번지는 경고를 확인하며 토큰 교체와 활동 점검을 안내하는 표지"
sourceUrl: "https://huggingface.co/blog/security-incident-july-2026"
featured: true
draft: false
---
글·해설: 다메카솔

AI 모델과 데이터셋의 최대 허브인 **허깅페이스(Hugging Face)**의 프로덕션 인프라가 침해당하는 중대한 보안 사고가 발생했습니다.

공격자는 단순히 취약점 하나를 찌른 것이 아니었습니다. **'악성 데이터셋 로더'를 통해 워커 노드에서 임의 코드(RCE)를 실행한 뒤, 자율 AI 에이전트(Agentic Framework)를 활용해 클러스터 내부 자격 증명을 탈취하고 측면 이동(Lateral Movement)을 감행**했습니다.

허깅페이스는 즉시 악용된 통로를 닫고 노드를 재구축했으며, 모든 사용자에게 **"액세스 토큰(User Access Token)을 즉시 갱신하고 계정 활동 로그를 점검하라"**고 긴급 권고했습니다.

이번 글에서는 침입 경로의 기술적 메커니즘과, AI 파이프라인을 운영하는 개발자가 즉시 취해야 할 조치를 정리합니다.

## 악성 데이터셋에서 내부 클러스터까지: 공격 체인 분석

![악성 데이터셋이 두 코드 실행 경로를 거쳐 처리 워커와 노드 권한으로 번지고 자격 증명이 여러 클러스터로 이동하는 과정](./page-01.webp)

허깅페이스의 공식 사고 보고서에 따르면 공격은 데이터 전처리 파이프라인의 취약점에서 시작되었습니다:

1. **원격 코드 실행 (RCE)**: 공격자가 악의적으로 조작된 커스텀 데이터셋 로더 스크립트와 템플릿 인젝션을 업로드하여, 데이터를 파싱하던 백엔드 처리 워커(Worker) 컨테이너에서 임의 코드를 실행시켰습니다.
2. **호스트 노드 권한 상승**: 워커 탈취 후 노드 레벨로 권한을 상승시켜 쿠버네티스 서비스 어카운트 및 클라우드 IAM 자격 증명을 긁어모았습니다.
3. **자율 에이전트 기반 측면 이동**: 공격자는 탈취한 토큰을 바탕으로 자율 AI 에이전트 프레임워크를 구동하여 내부 클러스터 간 네트워크를 고속으로 탐색하고 2차 침투를 시도했습니다.

## 현시점 확인된 영향 범위 3단계 팩트체크

![내부 데이터 무단 접근, 파트너·고객 영향 조사 중, 공개 자산 변조 증거 없음이라는 세 범위를 분리한 만화](./page-02.webp)

보안 사고를 접할 때는 막연한 공포 대신 팩트를 정확히 분리해야 합니다:

- **확인된 사실**: 제한된 일부 내부 데이터셋과 서비스 내부 자격 증명에 무단 접근이 발생함
- **조사 중인 사항**: 파트너사 및 엔터프라이즈 고객의 비공개 데이터가 유출되었는지 정밀 포렌식 진행 중
- **이상 없음 확인**: 공개 허브에 올라와 있는 오픈소스 모델, 공개 데이터셋, Spaces 앱의 위변조(공급망 오염) 흔적은 발견되지 않음

## 허깅페이스 사용자가 지금 당장 해야 할 2가지 조치

![카솔이 액세스 토큰 교체와 최근 계정 활동 점검을 두 단계 체크리스트로 설명하는 만화](./page-03.webp)

허깅페이스 API나 Spaces를 사용하고 계신다면 다음 조치를 즉시 수행해야 합니다:

### 1. 허깅페이스 User Access Token 전면 재발급 및 폐기
- [Hugging Face Settings > Access Tokens](https://huggingface.co/settings/tokens)로 이동합니다.
- 기존 토큰을 즉시 삭제(Revoke)하고 신규 토큰을 발급받아 CI/CD 및 배포 환경에 교체 적용합니다.
- 특히 모든 권한이 열려 있는 `Write` 토큰 대신, 특정 저장소만 읽고 쓸 수 있는 **세부 권한 토큰(Fine-grained Token)**을 사용하세요.

### 2. 조직 및 계정 감사 로그(Audit Logs) 검증
- [Settings > Audit Logs](https://huggingface.co/settings/audit-logs)에서 최근 낯선 IP나 해외 리전에서 발생한 API 호출 기록이 있는지 확인합니다.

## 다메카솔의 해석: AI 파이프라인의 숨은 공격 표면, '데이터 로더'

이번 사고는 **"AI 모델 파일이나 데이터셋 파싱 코드 역시 엄연한 실행 파일(Executable Code)이자 위험한 공격 표면(Attack Surface)"**이라는 사실을 명확히 일깨워줍니다.

실무 AI 시스템을 운영할 때 다음 보안 원칙을 수립해야 합니다:

1. **데이터 처리 워커의 엄격한 샌드박싱**: 사용자가 업로드한 데이터셋이나 Pickle 모델을 로드하는 전처리 파더는 반드시 루트 권한을 박탈하고, 외부 아웃바운드 인터넷 통신을 차단(Egress NetworkPolicy)한 격리 샌드박스에서 실행해야 합니다.
2. **인스턴스 메타데이터(IMDS) 차단**: 파드 내부에서 클라우드 인스턴스 자격 증명(`169.254.169.254`)을 조회하지 못하도록 IMDSv2 강제 및 홉 제한(Hop Limit 1)을 걸어두어야 측면 이동을 원천 차단할 수 있습니다.
3. **토큰의 수명주기 최소화**: 장기 보존되는 고권한 PAT 토큰 대신, OIDC 기반의 단기 임시 자격 증명(Short-lived Token)을 사용하는 아키텍처로 전환해야 합니다.

## 함께 읽을 AI/보안 글

- [Kubernetes NetworkPolicy와 간헐적 차단 트러블슈팅](/posts/k8s-networkpolicy-dnat-evaluation/)
- [Copilot 보안 API 실증 연구와 가드레일](/posts/copilot-security-api-study/)

## 출처

- [Hugging Face Official Security Incident Disclosure (July 2026)](https://huggingface.co/blog/security-incident-july-2026)
- [Hugging Face Security Documentation — User Access Tokens](https://huggingface.co/docs/hub/security-tokens)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
