import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '큐뱅',
      positions: [
        {
          title: 'Developer',
          startedAt: '2025-04',
          descriptions: [
            'https://qr-road.com/',
            '선불형 결제 시스템 "큐뱅Pay" 서비스 개발 및 운영.',
            '오프라인 QR 결제 시 카드 추천 기능을 제공하는 AI 솔루션 "AI 솔로몬" 프로젝트 리딩.',
          ],
          skillKeywords: ['JAVA', 'SpringBoot', 'JPA', 'QueryDSL', 'Vault', 'Redis', 'Kafka'],
        },
        {
          title: 'System Engineer',
          startedAt: '2025-04',
          descriptions: [
            'Kafka, Vault, Jenkins, GitLab, Nexus를 포함한 CI/CD 및 보안 자동화 환경을 구축·운영하며, 안정성과 효율성을 극대화.',
            '사내 인프라 유지보수 및 안정적인 운영 환경 관리.',
            '로깅 및 모니터링 시스템 구축 및 지속적인 개선/운영.',
            'CI/CD 파이프라인 설계, 구축 및 운영 자동화.',
            '사내 보안 솔루션 운영 및 보안 환경 강화.',
          ],
          skillKeywords: ['Linux', 'Ansible', 'Python', 'Automation'],
        },
      ],
    },
    {
      title: 'Lowall',
      positions: [
        {
          title: 'Lead Developer',
          startedAt: '2023-04',
          endedAt: '2025-03',
          descriptions: [
            'https://blog.naver.com/low_wall',
            'https://beginmate.com/team/detail/10109',
            '부모-자녀 관계 향상을 위한 질문·답변 기반 모바일 서비스의 전체 시스템 아키텍처 설계 및 개발 주도.',
            '대학생 창업동아리에서 시작하여 사회적기업(예창패 선정)으로 성장하는 과정에서 핵심 기술 리더십 제공. ',
            'AWS 클라우드 환경 설계부터 시스템 아키텍처, CI/CD 파이프라인 구축, 데이터베이스 마이그레이션까지 전체 기술 스택 관리.',
            '멀티모듈 프로젝트 설계를 통한 안정성과 확장성을 고려한 핵심 서비스 개발 및 운영.',
            '고객과 밀접한 서비스를 위한 대외 홍보 및 기술 커뮤니케이션.',
          ],
          skillKeywords: ['AWS', 'Kubernetes', 'Docker', 'JAVA', 'SpringBoot', 'JPA', 'QueryDSL'],
        },
      ],
    },
    {
      title: 'Wello',
      positions: [
        {
          title: 'Developer',
          startedAt: '2023-10',
          endedAt: '2024-01',
          descriptions: [
            'https://www.welfarehello.com/',
            '개인 맞춤형 정부 정책 추천 서비스 설계, 개발 및 운영.',
            '백오피스 관리 시스템 설계, 개발 및 운영 고도화.',
            '외부 서비스 연계를 위한 API 설계 및 개발.',
          ],
          skillKeywords: ['AWS', 'JAVA', 'SpringBoot', 'JPA', 'QueryDSL'],
        },
      ],
    },
    {
      title: 'IMB System',
      positions: [
        {
          title: 'Developer',
          startedAt: '2021-05',
          endedAt: '2023-09',
          descriptions: [
            'http://imbsystem.com/',
            '금융권 SI/SM 프로젝트 개발 및 유지보수 업무 수행.',
            '사내 금융 솔루션 기능 개발 및 고도화, 유지보수.',
            '사내 인프라 및 CI/CD 환경 설계, 구축 및 운영.',
          ],
          skillKeywords: ['JAVA', 'Spring', 'PostgreSQL', 'Jira', 'Confluence', 'Oracle', 'MDD'],
        },
      ],
    },
  ],
};

export default experience;
