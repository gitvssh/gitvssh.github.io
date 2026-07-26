---
title: "트랜잭션은 무엇을 보장하는가: ACID와 커밋·롤백의 경계"
description: "트랜잭션의 성공·실패 경계, ACID의 네 속성, 동시성 충돌과 WAL 복구를 커밋·롤백 모델로 설명합니다."
slug: "transaction-acid-commit-rollback"
publishedAt: 2026-07-25
updatedAt: 2026-07-25
track: tech_column
subtype: mechanism
category: database
series:
  slug: database-core
  title: "데이터베이스 핵심 원리"
  order: 3
tags:
  - 데이터베이스
  - 트랜잭션
  - ACID
  - 커밋
  - 롤백
audience: developer
readerOutcome: "송금·재고 같은 예시에서 트랜잭션 경계와 commit·rollback의 역할을 설명하고, ACID 네 속성을 각각 어떤 실패 질문과 연결해야 하는지 말할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-25
reviewAfter: 2027-07-25
cover: "./cover.webp"
coverAlt: "두 계좌 사이에 멈춘 송금 토큰을 카솔이 하나의 초록 경계로 가리키는 트랜잭션 ACID 표지"
sourceUrl: "https://www.postgresql.org/docs/current/sql-begin.html"
featured: false
draft: false
---

송금 처리에서 출금은 끝났는데 입금 전에 오류가 나면, 한 요청은 이미 데이터베이스를 어긋나게 만들었습니다. 트랜잭션은 이런 관련 변경을 하나의 성공·실패 단위로 묶고, `COMMIT`은 그 단위를 확정하며 `ROLLBACK`은 아직 확정되지 않은 그 단위의 변경을 취소합니다. ACID는 그 경계가 어떤 실패까지 견뎌야 하는지 나누어 보는 네 가지 속성입니다.

글·해설: 다메카솔

## 핵심 내용

- 트랜잭션의 핵심은 여러 SQL 문장을 “같이 확정하거나 같이 취소할” 경계로 묶는 일입니다.
- Atomicity는 전부 반영 또는 전부 취소이고, Consistency는 그 전후에 정한 무결성 조건을 지키는 일입니다.
- 동시에 실행되는 요청은 Isolation의 문제를 따로 만듭니다. 한 번의 원자적 처리만으로 잃어버린 갱신이 자동으로 사라지지는 않습니다.
- Durability는 커밋 성공 뒤 장애가 나도 결과를 복구할 수 있는지의 문제입니다. PostgreSQL은 WAL을 먼저 영구 저장소에 기록하는 방식으로 이를 지원합니다.

![출금만 끝난 송금 흐름을 보고 개발자가 오류를 묻자 카솔이 두 변경을 하나의 경계로 묶는 도입 장면](./page-00.webp)

## 트랜잭션은 여러 변경의 성공·실패 경계다

송금에서 출금과 입금은 따로 성공해도 안 됩니다. PostgreSQL의 명시적 트랜잭션 블록에서는 `BEGIN` 뒤의 문장이 `COMMIT` 또는 `ROLLBACK`까지 하나의 트랜잭션에서 실행됩니다. `ROLLBACK`은 현재 트랜잭션을 중단하고 그 트랜잭션이 만든 갱신을 버립니다. 다른 트랜잭션이 이미 확정한 결과나 데이터베이스 전체 시간을 되돌리는 명령은 아닙니다.

![하나의 경계 안에서 출금과 입금이 함께 확정되거나 함께 원래 위치로 돌아가는 트랜잭션 흐름](./page-01.webp)

다음 예시는 하나의 송금을 어떻게 묶는지 보여 주는 최소 형태입니다. 실제 서비스에서는 오류 전파, 재시도, 연결 관리, 감사 기록을 애플리케이션과 DBMS 특성에 맞게 더 다뤄야 합니다.

```sql
BEGIN;

UPDATE account
SET balance = balance - :amount
WHERE id = :from_id;

UPDATE account
SET balance = balance + :amount
WHERE id = :to_id;

COMMIT;
```

두 번째 `UPDATE`가 실패했거나 검증이 통과하지 못했다면 `COMMIT` 대신 `ROLLBACK`으로 현재 경계를 취소합니다. autocommit 환경에서는 문장 하나가 각자 트랜잭션이 될 수 있으므로, 함께 성공해야 하는 여러 변경은 명시적인 경계가 필요한지 먼저 확인해야 합니다.

## Atomicity와 Consistency는 답하는 질문이 다르다

모든 SQL 문장이 끝까지 실행됐다는 사실만으로 업무 결과가 맞아지지는 않습니다. Atomicity는 관련 연산이 전부 반영되거나 전부 취소되는지를 묻습니다. Consistency는 그 전후에 정한 무결성 조건이 지켜지는지를 묻습니다.

![A 계좌에서 100이 빠지고 B 계좌에 90이 들어가 두 갱신은 모두 완료됐지만 합계 규칙 경고가 켜진 비교 도식](./page-02.webp)

예를 들어 A에서 100을 뺐고 B에 90을 더한 두 `UPDATE`가 모두 커밋됐다면, 처리 자체는 “반만 적용된” 상태가 아닙니다. 그래서 Atomicity만 놓고 보면 전부 반영됐습니다. 그러나 송금 전후 총액이 같아야 한다는 업무 규칙을 정했다면 결과는 Consistency를 만족하지 못합니다.

`CHECK`, `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`는 데이터베이스에 표현할 수 있는 무결성 조건의 중요한 도구입니다. 다만 여러 행·테이블·외부 시스템을 걸치는 업무 규칙까지 제약 조건 하나가 자동으로 보장한다고 생각하면 안 됩니다. 어떤 규칙을 DB 제약으로 강제하고, 어떤 규칙을 트랜잭션 경계와 애플리케이션 검증으로 책임질지 설계해야 합니다.

## 동시에 실행되면 Isolation을 따로 설계해야 한다

같은 잔액을 두 요청이 동시에 읽는 순간, 문제의 종류가 달라집니다. 두 요청이 각각 `SELECT`로 100을 읽고 애플리케이션에서 새 잔액을 계산한 다음 `UPDATE`하면, 늦게 쓴 값이 먼저 쓴 값을 덮어써 한 갱신이 사라질 수 있습니다. 이것이 흔히 말하는 lost update의 전형적인 형태입니다.

![두 요청이 같은 잔액 100을 읽고 서로의 결과를 덮어쓰는 장면과 조건 재평가 및 재시도 경로](./page-03.webp)

그래서 “트랜잭션을 썼다”만으로 동시성 안전을 결론내리면 안 됩니다. PostgreSQL의 Read Committed에서는 동시 `UPDATE` 뒤 대상 행의 `WHERE` 조건을 새 버전에 다시 평가합니다. 아래처럼 잔액 조건을 `UPDATE`의 조건으로 넣는 패턴은 읽기-계산-쓰기를 분리하는 것보다 안전한 출발점이 될 수 있습니다.

```sql
UPDATE account
SET balance = balance - :amount
WHERE id = :from_id
  AND balance >= :amount;
```

영향을 받은 행이 0개면 잔액 부족 또는 경쟁 충돌을 구분해 처리해야 합니다. `SELECT ... FOR UPDATE`, 낙관적 잠금용 버전 검사, 직렬화 격리와 재시도 중 무엇을 쓸지는 DBMS, 격리 수준, 충돌 빈도, 업무 규칙에 따라 달라집니다. 특히 직렬화 실패는 정상적인 제어 흐름으로 재시도할 준비가 필요합니다.

## Durability는 WAL과 복구 경로까지 본다

전원이 꺼진 뒤에도 커밋 결과를 믿으려면, 메모리 속 변경만으로는 부족합니다. PostgreSQL의 WAL(Write-Ahead Logging)은 데이터 파일을 쓰기 전에 변경을 설명한 로그 레코드를 영구 저장소에 먼저 flush합니다. 그래서 장애 시점에 데이터 페이지에 아직 반영되지 않은 변경도 WAL을 재생해 REDO할 수 있습니다.

![WAL 기록이 데이터 페이지보다 먼저 남고 전원이 꺼진 뒤 REDO 화살표로 데이터 페이지가 복구되는 세 단계 도식](./page-04.webp)

중요한 구분이 있습니다. WAL은 감사 로그가 아닙니다. 감사 로그는 누가 어떤 업무 행동을 했는지 추적하는 목적이고, WAL은 장애 뒤 데이터 파일을 복구하는 목적입니다. 또한 Durability는 단순한 제품 홍보 문구가 아니라 설정의 경계도 가집니다. PostgreSQL 문서는 `synchronous_commit`을 끄면 운영체제 충돌에서 트랜잭션 손실 위험이 생길 수 있다고 설명합니다. 서비스가 믿는 “커밋 성공”의 의미는 DB 설정과 저장 장치의 보장까지 확인해야 합니다.

## ACID를 네 질문으로 점검하기

이제 ACID는 외울 네 글자가 아니라 구현 전에 확인할 네 질문이 됩니다.

![카솔과 개발자가 경계, 규칙, 동시성, 복구의 네 체크 항목을 함께 확인하는 결말 장면](./page-05.webp)

1. **경계** — 어떤 변경이 함께 성공하거나 함께 취소되어야 하는가?
2. **규칙** — 커밋 전후에 반드시 유지해야 하는 무결성 조건은 무엇인가?
3. **동시성** — 같은 데이터를 동시에 읽고 바꾸는 요청을 어떻게 제어하고, 충돌 뒤 무엇을 재시도하는가?
4. **복구** — 장애 뒤에도 어떤 커밋 결과를 믿을 수 있으며, 그 보장은 어떤 설정에 의존하는가?

다음 단계에서는 격리 수준별로 어떤 이상 현상이 남는지와, 재시도를 어디에서 책임져야 하는지를 다루면 이 네 질문을 실제 코드의 선택으로 이어갈 수 있습니다.

## 자주 묻는 질문

### ROLLBACK은 데이터베이스 전체를 이전 시점으로 돌리나요?

아닙니다. 여기서 말하는 `ROLLBACK`은 현재 트랜잭션을 중단하고 그 트랜잭션의 갱신을 버리는 명령입니다. 이미 다른 트랜잭션이 커밋한 변경까지 되돌리는 작업과는 다릅니다.

### Atomicity가 있으면 Consistency도 자동으로 보장되나요?

아닙니다. Atomicity는 관련 연산을 반만 남기지 않는 성질입니다. Consistency는 그 전체 결과가 정한 무결성 조건을 지키는지의 문제이므로, 올바른 계산·제약 조건·동시성 제어가 함께 필요합니다.

## 출처

- [PostgreSQL Documentation — BEGIN](https://www.postgresql.org/docs/current/sql-begin.html)
- [PostgreSQL Documentation — ROLLBACK](https://www.postgresql.org/docs/current/sql-rollback.html)
- [PostgreSQL Documentation — Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL Documentation — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [PostgreSQL Documentation — Write-Ahead Logging](https://www.postgresql.org/docs/16/wal-intro.html)
- [PostgreSQL Documentation — Non-Durable Settings](https://www.postgresql.org/docs/current/non-durability.html)

이 글의 만화 이미지는 AI로 생성한 베이스 아트에 결정적 레터링을 합성해 만들었습니다.

Updated: 2026-07-25
