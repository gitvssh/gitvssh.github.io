import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'QR코드 기반 카드추천 AI 솔로몬',
      startedAt: '2025-04',
      where: '큐뱅',
      descriptions: [
        {
          content:
            '카드 혜택 정보와 결제 데이터를 분석하여 최적의 카드를 추천하는 인공지능 모델 및 서비스 개발.',
        },
        { content: 'Apache Airflow를 활용한 데이터 파이프라인 구축.' },
        { content: '머신러닝 파이프라인 설계 및 구축.' },
      ],
    },
    {
      title: 'QR 선불페이 서비스',
      startedAt: '2025-04',
      where: '큐뱅',
      descriptions: [{ content: 'QR 뱅크 선불 결제 시스템 개발 및 운영, 유지보수.' }],
    },
    {
      title: '쩜쩜',
      startedAt: '2023-03',
      endedAt: '2025-01',
      where: 'Lowall',
      descriptions: [
        { content: '부모와 자녀 관계 향상을 위한 질문·답변 기반 모바일 서비스 개발.' },
        { content: '대학생 창업동아리 스타트업에 백엔드 개발 및 인프라 지원(사회적기업 선정).' },
        {
          content: '인프라 및 DevOps 업무 수행.',
          weight: 'MEDIUM',
          descriptions: [
            { content: '로컬/테스트/운영 환경 분리 및 git-flow 적용.' },
            { content: 'CI/CD 환경 개선 (Jenkins → GitHub Actions → S3 → CodeDeploy).' },
            { content: '고가용성·확장성을 고려한 AWS 인프라 구성(Route53, ELB, ASG, EC2).' },
            { content: 'Mysql → Serverless Aurora DB로 마이그레이션하여 비용 최적화.' },
          ],
        },
        {
          content: '멀티모듈 프로젝트 설계 및 구축.',
          weight: 'MEDIUM',
          descriptions: [
            { content: '서버 분리 및 모듈화로 시스템 확장성과 안정성 향상.' },
            { content: 'Kubernetes 기반 자동 배포 환경 구축.' },
            { content: 'FCM, APNs 연동 푸시 알림 및 푸시 로그 관리 기능 개발.' },
          ],
        },
      ],
    },
    {
      title: 'KB Pay x Wello 연동 서비스 개발',
      startedAt: '2023-11',
      endedAt: '2024-01',
      where: 'Wello',
      descriptions: [
        { content: '외부 시스템과 데이터 연동을 위한 배치 프로그램 및 API 개발.' },
        { content: 'Spring Batch 도입으로 기존 배치 서버 부하 및 실행 시간 문제 개선.' },
      ],
    },
    {
      title: '웰로링크 서비스 개발',
      startedAt: '2023-11',
      endedAt: '2023-12',
      where: 'Wello',
      descriptions: [
        { content: '기관 대상 B2G 서비스인 웰로비즈 관리 서비스 개발.' },
        { content: '요구사항 분석 및 데이터베이스 설계.' },
        { content: '회원 관리 및 인증·인가 API 개발.' },
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
          content: '개발문화 및 품질 향상 활동.',
          weight: 'MEDIUM',
          descriptions: [
            { content: 'Jenkins 기반 CI/CD 구축으로 배포 시간 10분 이상 → 1분 미만 단축.' },
            { content: 'SonarQube 도입으로 코드 품질 측정 및 기술 부채 관리.' },
            { content: 'SVN → Git 전환 및 브랜치 전략 수립, 코드리뷰 문화 도입.' },
            { content: '솔루션 리팩토링 및 Junit5 기반 자동화 테스트 파일럿 운영.' },
          ],
        },
        {
          content:
            '100만건 테스트 데이터 기반 부하 테스트 및 애플리케이션 성능 진단(Scouter, JMeter).',
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
        {
          content: '데이터 이행 논리 검증 및 BAD 이슈 대응 개발.',
          weight: 'MEDIUM',
          descriptions: [
            { content: '시스템 리소스 효율성 30% 개선.' },
            { content: 'Job Scheduler 리팩토링 및 최적화.' },
          ],
        },
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
