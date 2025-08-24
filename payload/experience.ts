import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '큐뱅',
      url: 'https://qr-road.com/',
      positions: [
        {
          title: 'Developer',
          startedAt: '2025-04',
          descriptions: [
            'AI 카드 추천 시스템 "AI 솔로몬" 프로젝트 리딩',
            '선불 페이 시스템 개발 및 유지보수',
            'ETL, MLops 아키텍처 및 ML Lifecycle 구성',
            '선불 페이 시스템 헥사고날 아키텍처 리팩토링',
            '3rd 암호화모듈 제거 및 Java진영 표준 암호화 모듈 설계/구현',
          ],
          skillKeywords: ['JAVA', 'SpringBoot', 'JPA', 'QueryDSL', 'Vault', 'Redis', 'Kafka'],
        },
        {
          title: 'System Engineer',
          startedAt: '2025-04',
          descriptions: [
            '인프라 자동화 및 DevOps 문화 개선',
            '컨테이너 기반 CI/CD 구축(jar 배포 개선)',
            '인프라 보고서 5개 업무자동화 (Ansible)',
            'Kafka, Vault, Jenkins, GitLab, Nexus를 포함한 CI/CD 및 보안 자동화 환경 구축·운영',
          ],
          skillKeywords: ['Linux', 'Ansible', 'Python', 'Automation'],
        },
      ],
    },
    {
      title: 'Lowall',
      url: 'https://blog.naver.com/low_wall',
      positions: [
        {
          title: 'Lead Developer',
          startedAt: '2023-04',
          endedAt: '2025-03',
          descriptions: [
            '전체 시스템 아키텍처 설계 및 기술 스택 결정',
            'AWS 인프라 구축 및 비용 최적화',
            '6명 개발팀 빌딩 및 기술 전략 수립',
            'MAU 500명 달성',
            '인프라 비용 70% 절감',
            '시스템 발전에 따른 아키텍처 개선(모노리스→멀티모듈→헥사고날)',
            '예비 사회적기업 인증 및 시드 투자 유치 (5천만원)',
          ],
          skillKeywords: ['AWS', 'Kubernetes', 'Docker', 'JAVA', 'SpringBoot', 'JPA', 'QueryDSL'],
        },
      ],
    },
    {
      title: 'Wello',
      url: 'https://www.welfarehello.com/',
      positions: [
        {
          title: 'Developer',
          startedAt: '2023-10',
          endedAt: '2024-01',
          descriptions: [
            'KB Pay 연동 시스템 설계 및 구현',
            'Spring Batch 기반 데이터 파이프라인 구축',
            'B2G 서비스 백오피스 개발',
            'MAU 2배 이상 증가 (KB Pay - Wello 연동)',
            '데이터 처리 성능 200% 향상 (시간당 20만건)',
            '데이터 정합성 99.99% 달성',
          ],
          skillKeywords: ['AWS', 'JAVA', 'SpringBoot', 'JPA', 'QueryDSL'],
        },
      ],
    },
    {
      title: 'IMB System',
      url: 'http://imbsystem.com/',
      positions: [
        {
          title: 'Developer',
          startedAt: '2021-05',
          endedAt: '2023-09',
          descriptions: [
            '하나은행 글로벌 차세대 시스템 개발',
            '레거시 시스템 현대화 및 DevOps 도입',
            '베트남 VAN사 SharePOS 시스템 개발',
            '14개 해외지점 시스템 성공적 오픈',
            '코드 품질 지표 50% 개선 (SonarQube 도입)',
            '배포 시간 90% 단축 (SVN → Git 전환, CI/CD Jenkins 도입)',
          ],
          skillKeywords: ['JAVA', 'Spring', 'PostgreSQL', 'Jira', 'Confluence', 'Oracle', 'MDD'],
        },
      ],
    },
  ],
};

export default experience;
