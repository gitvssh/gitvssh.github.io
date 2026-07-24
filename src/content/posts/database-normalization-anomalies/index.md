---
title: "정규화는 왜 하는가: 중복 제거보다 중요한 세 가지 이상 현상"
searchTitle: "데이터베이스 정규화란? 삽입·갱신·삭제 이상으로 이해하기"
description: "데이터베이스 정규화를 삽입·갱신·삭제 이상, 주문 도메인 분리, PK/FK, 반정규화의 동기화 책임으로 설명합니다."
slug: "database-normalization-anomalies"
publishedAt: 2026-07-15
updatedAt: 2026-07-17
track: tech_column
subtype: concept
category: database
tags:
  - 데이터베이스
  - 정규화
  - 이상 현상
  - 관계형 모델
audience: developer
readerOutcome: "주문 통합 테이블에서 삽입·갱신·삭제 이상을 찾아 역할별 테이블로 분리하고 반정규화의 책임을 설명할 수 있다."
contentFormats:
  - article
  - comic
  - diagram
  - table
  - checklist
freshnessStatus: current
reviewedAt: 2026-07-17
reviewAfter: 2027-07-15
cover: "./cover.webp"
coverAlt: "카솔이 엉킨 주문 통합 테이블과 역할별로 분리된 네 테이블을 비교하는 정규화 표지"
sourceUrl: "https://learn.microsoft.com/ko-kr/office/troubleshoot/access/database-normalization-description"
featured: true
draft: false
---

상품명 하나를 고쳤는데 주문마다 다른 이름이 남고, 마지막 주문을 지웠더니 상품 정보까지 사라졌다면 문제는 `중복 데이터가 보기 싫다`는 수준이 아닙니다. **데이터베이스 정규화란 서로 다른 사실을 적절한 테이블과 관계로 조직해 삽입·갱신·삭제 이상을 줄이는 설계 과정입니다.** 핵심은 같은 사실을 한곳에 기록하고, 그 사실을 식별하는 키에 맞게 컬럼의 종속성을 정리하는 데 있습니다.

글·해설: 다메카솔

## 핵심 내용

- 정규화의 주된 목적은 중복 자체보다 중복으로 인해 생기는 삽입·갱신·삭제 이상을 줄이는 것입니다.
- 주문 도메인에서는 사용자, 상품, 주문 헤더, 주문 라인을 서로 다른 사실로 보고 `users`, `products`, `orders`, `order_items`로 분리할 수 있습니다.
- PK는 행의 정체성을, FK는 테이블 사이의 참조 무결성을 지킵니다.
- 정규화는 테이블과 JOIN을 늘릴 수 있습니다. 읽기 성능을 위해 반정규화한다면 중복 값의 갱신·검증·복구 책임도 함께 설계해야 합니다.
- 현재 상품 가격과 주문 당시 단가처럼 값이 같아 보여도 의미와 수명 주기가 다르면 별개의 사실일 수 있습니다.

## 한 번 고쳤는데 왜 값이 다를까

![개발자가 한 상품명 셀을 고친 뒤 다른 주문 행에 옛값이 남은 것을 발견하고 카솔과 원인을 찾는 도입 만화](./page-00.webp)

주문 화면에 필요한 값을 한곳에 모은 통합 테이블부터 살펴보겠습니다.

```text
orders_all(
  order_id, ordered_at, order_status,
  user_id, user_name, user_email,
  product_id, product_name, product_price,
  quantity
)
```

한 행만 보면 편리합니다. 주문 화면에 필요한 값이 전부 들어 있고 JOIN도 없습니다. 하지만 이 구조에는 서로 다른 네 종류의 사실이 섞여 있습니다.

| 컬럼 묶음 | 실제로 말하는 사실 | 자연스러운 식별 기준 |
| --- | --- | --- |
| `user_name`, `user_email` | 사용자 | `user_id` |
| `product_name`, 현재 `product_price` | 상품 | `product_id` |
| `ordered_at`, `order_status` | 주문 헤더 | `order_id` |
| `product_id`, `quantity` | 주문 라인 | `order_id + line_no` 또는 `order_id + product_id` |

문제는 컬럼이 많다는 사실이 아닙니다. `product_name`은 `order_id`가 아니라 `product_id`에 종속되는데, 주문 행마다 반복됩니다. 한 상품의 이름을 바꿀 때 같은 `product_id`가 있는 모든 행을 정확히 찾아 바꿔야 합니다. 한 행이라도 빠지면 데이터베이스 안에 서로 충돌하는 두 답이 남습니다.

## 한 사실을 여러 행에 쓰면 변경 지점도 늘어난다

![한 상품 사실이 여러 주문 행으로 복제되고 한 행만 수정돼 나머지 행에 경고가 남는 만화](./page-01.webp)

Microsoft Learn은 중복 데이터가 여러 위치에 존재하면 변경을 모든 위치에 정확히 같은 방식으로 적용해야 해 유지보수 문제가 생긴다고 설명합니다. 저장 공간보다 더 중요한 비용은 **한 번의 비즈니스 변경이 여러 쓰기 지점으로 확장된다는 것**입니다.

애플리케이션에서 `UPDATE` 한 번으로 모두 바꾸면 되지 않느냐고 생각할 수 있습니다. 하지만 다음 경로들은 같은 규칙을 항상 공유하지 않을 수 있습니다.

- 오래된 배치 작업
- 운영자의 수동 SQL
- 같은 DB를 쓰는 다른 서비스
- 재처리·보상 로직
- 일부만 성공한 마이그레이션

반복된 값이 많을수록 모든 쓰기 경로가 같은 원자성과 검증 규칙을 지켜야 합니다. 정규화는 그 부담을 `상품 이름은 products의 한 행에서만 바뀐다`는 구조로 줄입니다.

## 삽입·갱신·삭제 이상은 행동할 때 드러난다

![삽입이 막히고 일부 값만 갱신되며 마지막 주문 삭제와 함께 상품 정보가 사라지는 세 가지 이상 현상](./page-02.webp)

### 갱신 이상

상품 `P10`의 이름이 세 주문 행에 반복돼 있는데 두 행만 바뀌면, `P10`의 이름을 묻는 쿼리가 행에 따라 다른 답을 냅니다. 하나의 사실에 여러 원본이 생긴 상태입니다.

### 삽입 이상

아직 한 번도 팔리지 않은 상품을 등록하려는데 상품 컬럼이 주문 행 안에만 있다면 `order_id` 없는 가짜 행이나 많은 `NULL`이 필요합니다. 상품이라는 사실의 생성 시점이 주문이라는 다른 사건에 묶였습니다.

### 삭제 이상

어떤 상품의 마지막 주문 행을 삭제했는데 그 행이 상품 설명을 보관한 유일한 장소였다면, 주문 이력을 지우는 행동이 상품 마스터까지 없애 버립니다. 수명 주기가 서로 다른 사실이 같은 행에 갇힌 결과입니다.

이상 현상은 단순히 데이터가 반복돼서가 아니라 **서로 다른 키와 수명 주기에 종속되는 사실을 한 행의 생성·변경·삭제에 묶었기 때문에** 생깁니다.

## 정규화는 사실의 저장 장소를 나눈다

![주문 통합 테이블의 사용자 상품 주문 헤더 주문 라인 사실이 users products orders order_items로 이동하는 정규화 도식](./page-03.webp)

주문 예시는 역할에 따라 네 테이블로 나뉩니다.

| 테이블 | 한 행이 표현하는 것 | 예시 컬럼 |
| --- | --- | --- |
| `users` | 한 사용자 | `user_id`, `name`, `email` |
| `products` | 한 상품의 현재 정보 | `product_id`, `name`, `current_price` |
| `orders` | 한 주문의 헤더 | `order_id`, `user_id`, `ordered_at`, `status` |
| `order_items` | 주문 안의 한 라인 | `order_id`, `line_no`, `product_id`, `quantity`, `unit_price` |

```sql
CREATE TABLE users (
  user_id       BIGINT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE products (
  product_id    BIGINT PRIMARY KEY,
  name          VARCHAR(200) NOT NULL,
  current_price NUMERIC(12, 2) NOT NULL CHECK (current_price >= 0)
);

CREATE TABLE orders (
  order_id      BIGINT PRIMARY KEY,
  user_id       BIGINT NOT NULL REFERENCES users(user_id),
  ordered_at    TIMESTAMP NOT NULL,
  status        VARCHAR(30) NOT NULL
);

CREATE TABLE order_items (
  order_id      BIGINT NOT NULL REFERENCES orders(order_id),
  line_no       INTEGER NOT NULL,
  product_id    BIGINT NOT NULL REFERENCES products(product_id),
  quantity      INTEGER NOT NULL CHECK (quantity >= 1),
  unit_price    NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  PRIMARY KEY (order_id, line_no)
);
```

이 구조에서 사용자 이메일은 `users`에서, 현재 상품명은 `products`에서 한 번 바뀝니다. 주문과 주문 라인은 자신의 키로 독립적으로 생성·삭제됩니다. 테이블을 네 개로 나눈 이유는 `한 테이블은 작아야 한다`가 아니라 **각 사실이 무엇에 종속되고 언제 생기고 사라지는지가 다르기 때문**입니다.

### 1NF·2NF·3NF는 어디에 들어갈까

정규형 이름은 이 판단을 점검하는 형식 언어입니다.

- 1NF: 한 칸에 반복 목록을 넣지 않고 행과 컬럼을 원자적인 값으로 구성합니다.
- 2NF: 복합 키의 일부에만 종속되는 값을 분리합니다.
- 3NF: 키가 아닌 컬럼을 거쳐 간접적으로 종속되는 값을 분리합니다.

실무에서는 이름을 외우기 전에 `이 값은 정확히 어떤 키가 정하는가?`를 묻는 편이 빠릅니다. 그 답이 현재 테이블의 키가 아니라면 분리 후보입니다.

## PK와 FK가 분리된 사실을 연결한다

![기본 키 토큰과 외래 키 참조가 네 테이블을 연결하고 잘못된 참조를 제약조건이 막는 관계 도식](./page-04.webp)

PostgreSQL 공식 문서의 정의대로 PK는 한 행을 유일하게 식별하고 `NULL`을 허용하지 않습니다. FK는 참조 컬럼의 값이 대상 테이블의 PK 또는 유일한 값과 일치하도록 해 참조 무결성을 유지합니다.

정규화가 `사실을 어디에 둘지` 정한다면, 제약조건은 `그 구조 안에 어떤 데이터까지 허용할지` 강제합니다.

| 제약조건 | 이 예시에서 막는 오류 |
| --- | --- |
| `PRIMARY KEY` | 같은 주문·라인을 두 번 저장 |
| `FOREIGN KEY` | 존재하지 않는 사용자·상품을 주문에서 참조 |
| `NOT NULL` | 주문 주체나 수량이 비어 있는 상태 |
| `UNIQUE` | 같은 이메일을 여러 사용자에게 할당 |
| `CHECK` | 수량 0, 음수 가격처럼 허용하지 않는 값 |

애플리케이션 검증은 좋은 오류 메시지와 유스케이스 흐름을 담당하고, DB 제약조건은 배치·수동 SQL·다른 서비스처럼 앱 검증을 우회하는 쓰기에도 마지막 경계를 제공합니다. 다만 여러 행이나 외부 상태를 함께 보는 복잡한 불변조건은 트랜잭션, 잠금, 트리거, 애플리케이션 로직까지 함께 설계해야 합니다.

## 주문 당시 가격은 정말 중복일까

`products.current_price`와 `order_items.unit_price`가 같은 숫자라고 해서 무조건 하나를 제거하면 안 됩니다.

- `products.current_price`: 지금 상품을 새로 살 때 적용할 가격
- `order_items.unit_price`: 특정 주문이 확정됐을 때 적용된 가격

두 값은 생성 시점과 변경 규칙이 다릅니다. 상품 가격이 내일 바뀌어도 어제 주문의 결제 금액은 바뀌면 안 됩니다. Google Cloud도 계약·송장처럼 이후 원본 변경과 독립적으로 보존해야 하는 값은 의도적인 스냅샷이 될 수 있다고 설명합니다. 이것은 같은 사실의 불필요한 중복이 아니라 **서로 다른 시점의 사실을 명시적으로 기록한 것**입니다.

정규화 리뷰에서 `값이 같아 보인다`보다 `의미와 수명 주기가 같은가`를 먼저 물어야 하는 이유입니다.

## 원본은 정규화하고 읽기는 따로 최적화한다

![카솔과 개발자가 정규화된 원본에서 조회 모델과 캐시가 파생되고 동기화 책임이 생기는 구조를 비교하는 만화](./page-05.webp)

정규화된 주문 목록을 보여 주려면 여러 테이블을 JOIN해야 합니다. 테이블이 많아졌다는 사실만으로 반정규화를 결정하지 말고 먼저 실제 쿼리와 실행 계획을 확인합니다.

실행 계획이 쿼리마다 달라지고 인덱스가 항상 선택되지 않는 이유는 [SQL의 선언형 모델과 옵티마이저가 결정하는 것](/posts/sql-declarative-language/)에서 더 자세히 설명합니다.

1. FK와 조회 조건에 맞는 인덱스를 설계합니다.
2. 필요한 컬럼만 조회하고 N+1, 불필요한 정렬, 과도한 페이지네이션 비용을 제거합니다.
3. 그래도 반복 계산이나 조인이 병목이면 캐시·materialized view·조회 전용 테이블을 검토합니다.
4. 중복 값을 저장한다면 갱신 주체, 지연 허용 시간, 재처리, 검증, 복구 방법을 함께 문서화합니다.

| 선택 | 얻는 것 | 새로 생기는 책임 |
| --- | --- | --- |
| 정규화 원본 | 쓰기 정합성, 변경 지점 축소 | JOIN과 응답 조립 |
| 인덱스 | 기존 정규화 구조에서 조회 비용 절감 | 쓰기·저장 비용, 인덱스 관리 |
| 캐시 | 반복 조회 응답 단축 | 무효화, 만료, stampede 대응 |
| 조회 전용 모델 | 화면에 맞춘 단순한 읽기 | 동기화 지연, 재구축 경로 |
| 선택적 반정규화 | JOIN·계산 감소 | 중복 값의 갱신과 불일치 탐지 |

반정규화는 정규화의 실패가 아닙니다. 어떤 읽기 경로를 위해 어떤 중복을 받아들이고, 그 값을 누가 언제 맞출지까지 결정하는 별도의 설계입니다.

## 설계 리뷰 체크리스트

- 이 테이블의 한 행은 정확히 어떤 비즈니스 사실을 나타내는가?
- 각 컬럼은 PK 전체에 종속되는가, 다른 키나 다른 컬럼에 종속되는가?
- 한 값이 반복된다면 같은 사실의 중복인가, 다른 시점·계약의 스냅샷인가?
- 삽입·갱신·삭제 중 하나를 수행했을 때 관련 없는 사실이 함께 막히거나 사라지는가?
- PK·FK·NOT NULL·UNIQUE·CHECK로 저장소 수준에서 강제할 불변조건은 무엇인가?
- 반정규화된 값의 원본, 갱신 주체, 허용 지연, 재처리·복구 경로가 명확한가?
- JOIN이 느리다는 판단은 실제 실행 계획과 측정으로 확인했는가?

## 자주 묻는 질문

### 정규화는 중복을 완전히 없애는 것인가요?

아닙니다. 관계를 연결하는 키는 반복될 수 있고, 주문 당시 가격 같은 이력 스냅샷도 의도적으로 저장할 수 있습니다. 제거 대상은 같은 의미의 사실이 여러 원본처럼 관리돼 이상을 만드는 중복입니다.

### 3NF까지 하면 항상 좋은 설계인가요?

3NF는 유용한 기본선이지만 도메인의 키, 이력, 변경 주기, 조회 패턴을 대신 결정해 주지 않습니다. 실제 시스템에서는 정합성 요구와 측정된 읽기 비용을 함께 봐야 합니다.

### FK를 쓰면 정규화가 끝난 것인가요?

아닙니다. FK는 이미 나눈 테이블 사이의 참조 무결성을 지킵니다. 어떤 사실을 어느 테이블로 분리할지는 함수 종속과 데이터 수명 주기를 먼저 판단해야 합니다.

### JOIN이 많으면 바로 반정규화해야 하나요?

먼저 쿼리, 인덱스, 실행 계획, 호출 빈도를 측정합니다. 병목이 확인된 뒤 캐시나 조회 모델, 선택적 반정규화를 검토하고 동기화 책임을 함께 설계합니다.

## 복습 문제

1. `orders_all`에 `user_email`을 저장할 때 생길 수 있는 갱신 이상을 설명해 보세요.
2. 아직 주문이 없는 상품을 통합 주문 테이블에 넣으려 하면 어떤 삽입 이상이 생기나요?
3. `orders`와 `order_items`를 분리하는 기준은 무엇인가요?
4. `products.current_price`와 `order_items.unit_price`를 둘 다 저장할 수 있는 이유를 말해 보세요.
5. 반정규화를 선택했다면 반드시 함께 정해야 할 운영 책임은 무엇인가요?

## 출처

- [Microsoft Learn — 데이터베이스 정규화 기본 사항에 대한 설명](https://learn.microsoft.com/ko-kr/office/troubleshoot/access/database-normalization-description)
- [PostgreSQL Documentation — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [Google Cloud — What is database normalization?](https://cloud.google.com/discover/what-is-database-normalization)
- [Microsoft Learn — Modeling for Performance](https://learn.microsoft.com/en-us/ef/core/performance/modeling-for-performance)

이 글의 만화 이미지는 AI로 생성했으며, 모든 공개 텍스트는 결정적 레터링으로 별도 합성했습니다.
