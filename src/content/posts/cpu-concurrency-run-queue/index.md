---
title: "RAM은 남는데 서버가 느리다: CPU 코어·동시성·실행 대기 읽는 법"
description: "메모리가 널널한데도 서버가 버벅이고 태스크가 타임아웃으로 죽는다면? CPU 사용률, Load Average, 런큐(Run Queue), 그리고 리눅스 PSI 지표를 통해 병목을 진단하는 실무 가이드입니다."
slug: "cpu-concurrency-run-queue"
publishedAt: 2026-07-21
updatedAt: 2026-07-28
track: tech_column
subtype: how_to
category: infrastructure
tags:
  - "리눅스 운영"
  - "관측 가능성"
  - "Kubernetes"
audience: builder
readerOutcome: "단순 CPU 사용률과 Load Average의 차이를 이해하고, 리눅스 PSI 및 cgroup 쓰로틀링 지표를 활용해 동시성 병목을 과학적으로 디버깅할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-23
reviewAfter: 2026-10-23
cover: "./cover.webp"
coverAlt: "메모리 수조에는 빈 공간이 많지만 좁은 CPU 관문 앞에는 작업이 길게 줄 선 모습을 카솔이 살피는 표지"
sourceUrl: "urn:internal:creator-correction:2026-07-21"
featured: false
draft: false
---
글·해설: 다메카솔

서버 모니터링 대시보드를 열어봤을 때 메모리(RAM) 사용률이 30%밖에 안 되는데도, 실제 애플리케이션 응답 속도는 곤두박질치고 백그라운드 배치 작업이 줄줄이 타임아웃으로 실패하는 상황을 겪어보신 적 있으신가요?

홈랩에서 시놀로지 NAS 위에 Airflow와 k3s를 운영할 때 제가 바로 이 함정에 빠졌습니다. 32GB나 되는 RAM을 보며 "인프라에 여유가 넘친다"고 안심했지만, 정작 시스템은 꽉 막힌 **CPU 런큐(Run Queue)**와 **심각한 컨텍스트 스위칭 경합** 때문에 비명을 지르고 있었습니다.

**"남는 RAM은 프로세스를 올려둘 공간이 넉넉하다는 뜻일 뿐, CPU가 태스크를 제때 처리하고 있다는 보증이 되지 않는다."**  
이번 글에서는 메모리 지표 뒤에 가려지기 쉬운 CPU 병목과 리눅스 커널 지표(Load Average, PSI, cgroup 쓰로틀링)를 정확히 읽는 방법을 정리해 보았습니다.

## 메모리 여유와 CPU 처리량은 별개의 문제다

![빈 메모리 선반과 작업이 쌓이는 작은 CPU 작업대를 대비해 용량과 처리량이 다른 문제임을 보여 주는 장면](./page-01.webp)

- **RAM**: 실행 중인 프로세스와 캐시 데이터를 적재해두는 **'작업대(Workspace)'**의 크기입니다.
- **CPU 코어**: 준비된 태스크를 타임 슬라이스로 쪼개어 실제로 밀어내는 **'일꾼(Worker)'**의 처리량입니다.

아무리 창고가 운동장만큼 넓어도 일꾼이 2명뿐이면 쏟아지는 물류를 감당하지 못해 출하 지연이 발생합니다. 반대로 CPU 사용률이 낮아도 프로세스가 디스크 I/O나 외부 API 응답을 기다리느라 멈춰 있다면 시스템은 똑같이 느려집니다.

따라서 성능 트러블슈팅을 시작할 때는 "단순히 자원이 부족한가?"가 아니라 **"작업이 지금 어느 큐(Queue)에서 대기하고 있는가?"**를 먼저 분리해야 합니다.

| 점검 질문 | 1차 확인 지표 | 이 지표만으로 알 수 없는 것 |
| :--- | :--- | :--- |
| **메모리가 부족한가?** | Available Memory, Swap 사용량, OOM Kill 카운트 | CPU 대기 지연 및 실제 연산 진척도 |
| **CPU가 일하고 있는가?** | CPU Utilization (%) | 코어를 얻기 위해 런큐에서 기다린 시간 |
| **태스크가 어디서 대기하는가?** | Load Average, 리눅스 PSI, cgroup Throttling | 비즈니스 로직 자체의 내부 락(Lock) 경합 |

## Load Average와 CPU 사용률의 결정적 차이

![같은 시간축 위에 CPU 사용, 실행 대기, CPU pressure의 세 신호를 겹쳐 보는 진단 도식](./page-02.webp)

흔히 `top`이나 `uptime` 명령어를 쳤을 때 나오는 **Load Average(부하율)**를 "CPU 사용률"과 동일시하는 실수를 범하곤 합니다.

```bash
uptime
# 14:10:05 up 10 days, 0.61, 1.25, 2.50 4/828 22084
```

리눅스 커널에서 Load Average는 **"CPU를 할당받기 위해 런큐에서 기다리는 프로세스(R 상태) + 디스크 I/O 등을 기다리며 언인터럽터블 슬립에 빠진 프로세스(D 상태)"의 합계**입니다.

즉, CPU 코어가 100% 돌아가지 않더라도 **NFS 파일시스템 지연이나 느린 디스크 I/O 때문에 D-state 프로세스가 쌓이면 Load Average는 10, 20까지 치솟을 수 있습니다.**

따라서 CPU 연산 병목인지 디스크 I/O 병목인지를 구분하려면 커널의 **PSI(Pressure Stall Information)** 지표를 확인해야 합니다:

```bash
cat /proc/pressure/cpu
# some avg10=12.50 avg60=8.20 avg300=3.10 total=4829102

cat /proc/pressure/io
# some avg10=0.00 avg60=0.00 avg300=0.00 total=12040
```

- `cpu`의 `some` 수치가 높다면? 👉 진짜 **CPU 코어 부족 및 런큐 경합**
- `io`의 `some` 수치가 높다면? 👉 CPU가 아니라 **스토리지 디스크 I/O 병목**

## 쿠버네티스 환경의 복병: CPU Limit과 Throttling

![호스트에는 CPU 여유가 있지만 컨테이너 내부의 제한 관문 때문에 작업이 throttling되는 구조](./page-04.webp)

쿠버네티스(k8s)나 컨테이너 환경에서는 호스트 노드의 CPU가 텅텅 남아도 파드가 심각하게 버벅일 수 있습니다. 바로 **CPU Limit에 의한 커널 쓰로틀링(Throttling)** 때문입니다.

- **CPU Request**: 파드가 스케줄링될 때 보장받는 최소 자원입니다.
- **CPU Limit**: 파드가 100ms(CFS Quota 주기) 동안 사용할 수 있는 최대 CPU 시간 상한선입니다.

만약 파드가 순간적으로 CPU를 집중 사용하여 주어진 쿼터를 다 써버리면, 리눅스 커널(cgroup)은 프로세스를 강제로 슬립 상태로 멈춰 세웁니다(Throttling). 이때 메모리는 여유롭고 호스트 전체 CPU 사용률도 낮지만, 컨테이너 내부의 요청 처리 시간(Latency)은 10배~100배로 튀게 됩니다.

cgroup v2 노드에서는 다음 지표를 통해 쓰로틀링 발생 여부를 디버깅할 수 있습니다:

```bash
# cgroup v2 cpu 통계 확인
cat /sys/fs/cgroup/kubepods.slice/.../cpu.stat
# nr_periods 1024
# nr_throttled 340      <-- 쿼터를 초과해 멈춘 주기 횟수
# throttled_usec 482000 <-- 누적 대기 시간 (마이크로초)
```

## Airflow 파이프라인 동시성 병목 튜닝

![Airflow의 여러 동시성 관문을 한 단계 낮춘 전후 실행을 카솔이 비교하는 마무리 장면](./page-05.webp)

Airflow 같은 데이터 파이프라인을 운영할 때 초심자가 가장 많이 하는 실수가 "빠르게 끝내겠다며 `parallelism`과 `max_active_tasks`를 무작정 크게 늘리는 것"입니다.

저전력 CPU(4코어 등) 환경에서 수십 개의 파이프라인 태스크를 동시에 밀어 넣으면:
1. 각 태스크가 CPU 코어를 선점하지 못하고 런큐에서 쫓겨나는 **컨텍스트 스위칭 오버헤드**가 폭증합니다.
2. 실행 시간이 지연되면서 Airflow 하트비트(Heartbeat) 타임아웃을 놓쳐 정상 태스크가 좀비(Zombie)로 오판되어 강제 재시작됩니다.
3. 재시도된 태스크들이 부하를 가중시켜 **시스템 전체가 연쇄 다운(Cascading Failure)**에 빠집니다.

이런 상황에서는 무작정 하드웨어를 증설하기 전에, **동시성 상한을 50% 수준으로 과감히 낮춘 A/B 테스트**를 진행해 보아야 합니다. 동시성을 줄였는데 오히려 런큐 대기와 타임아웃 실패가 사라져 전체 파이프라인 완료 시간이 더 단축되는 마법을 경험할 수 있습니다.

## 다메카솔의 해석: 지표를 쪼개어 보는 엔지니어링 관측성

성능 문제는 "서버가 느려요"라는 막연한 감각이 아니라, **"커널이 어느 리소스에서 작업을 멈춰 세우고 있는가"**라는 정량적 신호로 접근해야 합니다.

실무 시스템을 운영할 때 다음 진단 절차를 권장합니다:

1. **시간창 고정 및 동기화**: 장애 발생 시점의 애플리케이션 로그, 호스트 `/proc/loadavg`, 커널 PSI 지표를 동일 타임라인에 오버레이합니다.
2. **CPU vs I/O 압력 분리**: Load Average 뒤에 숨겨진 CPU Stall과 I/O Stall을 `/proc/pressure`로 즉시 분리합니다.
3. **컨테이너 쓰로틀링 모니터링**: 프로덕션 k8s 클러스터에서는 CPU 사용률 그래프만 보지 말고 `container_cpu_cfs_throttled_periods_total` 프로메테우스 메트릭을 필수로 알람에 걸어두어야 합니다.

## 함께 읽을 인프라 글

- [홈랩 쿠버네티스 구축기: 32GB RAM 뒤에 숨겨진 CPU 병목](/posts/why-homelab-kubernetes/)
- [애플리케이션 가용성과 24시간 의존성 아키텍처 설계](/posts/state-service-uptime-design/)

## 출처

- [Linux Kernel Documentation — Pressure Stall Information (PSI)](https://docs.kernel.org/accounting/psi.html)
- [Linux Kernel Documentation — Control Group v2 (cgroup)](https://docs.kernel.org/admin-guide/cgroup-v2.html)
- [Kubernetes Documentation — Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Apache Airflow Documentation — Configuration & Concurrency Pools](https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/pools.html)

이 글의 본문과 이미지는 생성형 AI로 제작했습니다. 기획과 편집 기준은 다메카솔이 정했습니다.
