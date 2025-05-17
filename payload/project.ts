import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'QR코드 기반 카드추천 AI 솔로몬 프로젝트 리딩',
      startedAt: '2025-04',
      where: '큐뱅',
      descriptions: [
        {
          content:
            '카드 혜택 정보와 결제 데이터를 분석하여 최적의 카드를 추천하는 인공지능 모델 및 서비스 개발.',
        },
        { content: 'Apache Airflow를 활용한 데이터 파이프라인 구축.' },
        { content: 'AI 추천 모델 학습을 위한 머신러닝 알고리즘 선별 및 통계 분석.' },
        { content: '머신러닝 파이프라인 설계 및 구축.' },
      ],
    },
    {
      title: 'QR 결제 서비스 DQMS 개발',
      startedAt: '2025-04',
      where: '큐뱅',
      descriptions: [
        {
          content: '기능개발, 운영 및 유지보수',
          weight: 'MEDIUM',
          descriptions: [
            { content: '결제사 API 연동을 위한 API 인증 시스템 개발 및 EDI 표준화 작업' },
          ],
        },
        {
          content: '개발 문화 개선',
          weight: 'MEDIUM',
          descriptions: [
            { content: '안정적인 형상관리를 위한 git flow 전략 소개 및 도입, 기술 지원' },
            { content: 'TDD 방법론 도입 제안 및 파일럿 테스트' },
            { content: '온보딩 문서 작성 및 정보 최신화' },
          ],
        },
      ],
    },
    {
      title: '쩜쩜',
      startedAt: '2023-03',
      endedAt: '2025-01',
      where: 'Lowall',
      descriptions: [
        {
          content: '시스템 아키텍처 설계 및 개발',
          weight: 'MEDIUM',
          descriptions: [
            { content: '대학생 창업동아리 스타트업에 기술 리더십 제공 및 사회적기업 선정 기여.' },
            {
              content:
                '가족 기반 SNS 플랫폼의 기획부터 요구사항 분석, 시스템 설계, 개발 및 운영까지 전 과정 책임.',
            },
            { content: '서비스 초기 단계부터 확장성을 고려한 도메인 주도 아키텍처 설계.' },
          ],
        },
        {
          content: '클라우드 인프라 구축 및 최적화',
          weight: 'MEDIUM',
          descriptions: [
            {
              content:
                '고가용성·확장성을 고려한 AWS 인프라 아키텍처 설계 및 구현 (Route53, ELB, ASG, EC2).',
            },
            { content: 'Mysql에서 Serverless Aurora DB로 마이그레이션하여 비용 최적화 달성' },
            { content: '서버 모니터링 및 로그 수집 시스템 구축.' },
          ],
        },
        {
          content: 'DevOps 환경 구축',
          weight: 'MEDIUM',
          descriptions: [
            { content: 'CI/CD 파이프라인 고도화 (Jenkins → GitHub Actions → S3 → CodeDeploy).' },
            { content: 'Kubernetes 기반 자동 배포 환경 구축으로 배포 시간 단축 및 안정성 확보.' },
            { content: '서버 모니터링 및 로그 수집 시스템 구축.' },
          ],
        },
        {
          content: '서비스 아키텍처 고도화',
          weight: 'MEDIUM',
          descriptions: [
            {
              content:
                '모놀리스 아키텍처에서 시작해 프로젝트 진행에 따른 멀티모듈 프로젝트 리팩토링으로 코드 재사용성 향상.',
            },
            { content: '클린 아키텍처 전환을 고려한 인터페이스 설계 및 프로젝트 의존성 관리.' },
            { content: 'SPOF를 고려한 이벤트기반 메세지 처리 아키텍처 구축.' },
          ],
        },
        {
          content: '대외 홍보 및 기술 커뮤니케이션',
          weight: 'MEDIUM',
          descriptions: [
            { content: '제품 전시회에서 제품 부스 운영 및 현장 고객 응대, 서비스 개선.' },
            { content: '잠재 투자자 및 파트너사 대상 기술 스택 및 아키텍처 프레젠테이션.' },
            { content: '서비스 고도화에 따른 개발팀 빌딩 및 기술 전략 수립 및 실행.' },
          ],
        },
      ],
    },
    {
      title: 'KB Pay x Wello 플랫폼 연동 시스템 구축',
      startedAt: '2023-11',
      endedAt: '2024-01',
      where: 'Wello',
      descriptions: [
        {
          content: '외부 시스템과 데이터 연동을 위한 실시간/배치 데이터 연동 시스템 설계 및 구현.',
        },
        { content: 'Spring Batch 프레임워크 도입으로 처리 성능 200% 향상 및 시스템 안정성 확보.' },
        { content: '양사 데이터 통합을 위한 ETL 프로세스 최적화 및 모니터링 체계 구축.' },
      ],
    },
    {
      title: '웰로링크 B2G 서비스 개발',
      startedAt: '2023-11',
      endedAt: '2023-12',
      where: 'Wello',
      descriptions: [
        { content: '기관 대상 B2G 서비스인 웰로비즈 관리 서비스 개발.' },
        {
          content:
            '도메인 주도 설계(DDD) 방법론 적용을 통한 비즈니스 로직과 시스템 아키텍처 정합성 확보.',
        },
        { content: 'OAuth 2.0 및 JWT 기반 다중 인증 시스템 구현으로 보안성 강화.' },
        { content: '통계 데이터 시각화 및 실시간 대시보드 기능 개발.' },
      ],
    },
    {
      title: '사내 솔루션 고도화 및 인프라 개선',
      startedAt: '2023-02',
      endedAt: '2023-09',
      where: 'IMB System',
      descriptions: [
        { content: '사내 금융 솔루션 UI 고도화(jsp → Vue).' },
        {
          content: '애자일 개발 문화 도입 및 품질 관리 체계 구축',
          weight: 'MEDIUM',
          descriptions: [
            {
              content:
                'Jenkins 기반 CI/CD 파이프라인 구축으로 배포 소요시간 90% 단축(10분 이상 → 1분 미만).',
            },
            {
              content:
                'SonarQube를 활용한 코드 품질 모니터링 시스템 도입 및 기술 부채 지표 50% 개선.',
            },
            {
              content:
                'SVN에서 Git으로의 버전 관리 시스템 마이그레이션 및 브랜치 전략(Gitflow) 수립.',
            },
            { content: '코드 리뷰 프로세스 정립 및 Junit5 기반 테스트 자동화 체계 구축.' },
          ],
        },
        {
          content: '대용량 데이터 처리 성능 최적화 및 시스템 안정성 향상',
          weight: 'MEDIUM',
          descriptions: [
            { content: '100만건 테스트 데이터셋 기반 부하 테스트(JMeter) 수행 및 병목 구간 식별.' },
            { content: 'Scouter APM 도입으로 실시간 애플리케이션 성능 모니터링 체계 확립.' },
            {
              content:
                '데이터베이스 쿼리 최적화 및 인덱싱 전략 수립으로 트랜잭션 처리 속도 60% 향상.',
            },
          ],
        },
      ],
    },
    {
      title: 'SharePOS 시스템 고도화 및 쿠폰시스템 개발',
      startedAt: '2022-06',
      endedAt: '2023-01',
      where: 'IMB System',
      descriptions: [
        { content: '베트남 VAN사 Alliex SharePOS 백오피스 시스템 고도화 및 오픈 준비.' },
        { content: '쿠폰시스템 개발 및 보안(침투) 테스트, 부하 테스트 수행.' },
        { content: 'AOP 기반 트랜잭션 관리 개선으로 커넥션 누수 이슈 해결.' },
        { content: '100만건 데이터 기반 부하 테스트 및 성능 진단(Scouter, JMeter).' },
      ],
    },
    {
      title: '하나은행 글로벌 차세대 확산 프로젝트',
      startedAt: '2021-12',
      where: 'IMB System',
      descriptions: [
        { content: '하나은행 차세대 시스템(BankHive) 글로벌 확산 프로젝트 참여.' },
        { content: '데이터 이행 논리 검증 및 BAD 이슈 대응 개발.' },
        { content: '데이터 암호화 이행을 위한 배치 프로그램 개발.' },
        { content: '여신 실행·상환 업무 유지보수(지급보증, 이수관 등).' },
      ],
    },
    {
      title: '바이브온 AI생기부',
      startedAt: '2021-05',
      endedAt: '2021-08',
      where: 'IMB System',
      descriptions: [
        { content: '학생 생활기록부를 AI로 분석하여 입시정보 보고서를 제공하는 서비스 개발.' },
        { content: '관리자 페이지(상품 및 구매 관리) 개발 및 테스트.' },
        { content: 'Inicis 결제 API 적용 및 검증.' },
      ],
    },
  ],
};

export default project;
