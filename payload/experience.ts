import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '큐뱅',
      positions: [
        {
          title: 'System Engineer',
          startedAt: '2025-04',
          descriptions: [
            '사내 인프라 유지보수 및 안정적인 운영 환경 관리.',
            '로깅 및 모니터링 시스템 구축 및 지속적인 개선/운영.',
            'CI/CD 파이프라인 설계, 구축 및 운영 자동화.',
            '사내 보안 솔루션 운영 및 보안 환경 강화.',
          ],
          skillKeywords: ['Linux', 'Ansible', 'Python', 'Automation'],
        },
        {
          title: 'Developer',
          startedAt: '2025-04',
          descriptions: [
            '선불형 결제 시스템 "큐뱅Pay" 서비스 개발 및 운영.',
            '오프라인 QR 결제 시 카드 추천 기능을 제공하는 AI 솔루션 "AI 솔로몬" 개발.',
          ],
          skillKeywords: ['JAVA', 'SpringBoot', 'JPA', 'QueryDSL', 'Vault', 'Redis', 'Kafka'],
        },
      ],
    },
    {
      title: 'Lowall',
      positions: [
        {
          title: 'Lead Developer',
          startedAt: '2023-04',
          endedAt: '2025-01',
          descriptions: [
            '사이드 프로젝트로 시작해 사회적 기업 스타트업 창업 및 성장 주도.',
            '가족 기반 SNS 플랫폼 기획, 개발 및 운영.',
            '클라우드 인프라(AWS) 구축 및 Kubernetes 기반 운영 환경 구성.',
            'CI/CD 파이프라인 구축 및 데이터베이스 관리.',
            '서비스 요구사항 분석, ERD 설계, 백엔드 서버(API/배치/메시징) 개발.',
            '기술 및 제품 홍보를 위해 외부 컨퍼런스 부스 운영, 방문자 대상 제품 데모 및 질의응답 진행.',
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
