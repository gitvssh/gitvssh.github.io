export const SITE_NAME = '3분만에 만화로 보는 IT';

export const TRACKS = {
  news: {
    label: '개발 뉴스',
    titlePrefix: `${SITE_NAME} - 개발 뉴스`,
    description: '공식 발표와 현재 확인 가능한 사실을 빠르게 정리합니다.',
  },
  paper: {
    label: '논문 읽기',
    titlePrefix: `${SITE_NAME} - 논문 읽기`,
    description: '논문의 근거와 해석을 구분해 핵심 주장을 읽습니다.',
  },
  tech_column: {
    label: '기술 해설',
    titlePrefix: `${SITE_NAME} - 기술 해설`,
    description: '핵심 CS·백엔드 주제의 개념, 조건, 오해와 예외를 설명합니다.',
  },
  practice: {
    label: 'AI 활용·실습',
    titlePrefix: `${SITE_NAME} - AI 활용·실습`,
    description: 'AI 도구를 실제로 설정하고 검증한 재현 가능한 활용법을 다룹니다.',
  },
} as const;

export type Track = keyof typeof TRACKS;

export const TECH_CATEGORY_KEYS = [
  'operating_system',
  'database',
  'network',
  'algorithms',
  'data_structures',
  'kafka',
  'interview_core',
] as const;

export type TechCategory = (typeof TECH_CATEGORY_KEYS)[number];

export const TECH_CATEGORIES: Record<
  TechCategory,
  { label: string; description: string; tone: 'green' | 'blue' | 'rust' | 'amber' }
> = {
  operating_system: {
    label: '운영체제',
    description: '프로세스, 스레드, 메모리, 동시성, 파일 시스템을 연결해 이해합니다.',
    tone: 'rust',
  },
  database: {
    label: '데이터베이스',
    description: '데이터 모델, SQL, 인덱스, 트랜잭션과 운영 원리를 다룹니다.',
    tone: 'green',
  },
  network: {
    label: '네트워크',
    description: '프로토콜, 전송, 웹 통신과 장애 분석의 흐름을 설명합니다.',
    tone: 'blue',
  },
  algorithms: {
    label: '알고리즘',
    description: '복잡도와 문제 해결 전략을 선택 근거까지 포함해 정리합니다.',
    tone: 'amber',
  },
  data_structures: {
    label: '자료구조',
    description: '배열, 해시, 트리, 그래프의 구조와 선택 조건을 비교합니다.',
    tone: 'blue',
  },
  kafka: {
    label: 'Kafka',
    description: '브로커, 파티션, 컨슈머와 운영 문제를 하나의 흐름으로 연결합니다.',
    tone: 'rust',
  },
  interview_core: {
    label: '면접 핵심 질문',
    description: '자주 묻는 개념을 암기가 아닌 설명과 판단의 구조로 준비합니다.',
    tone: 'green',
  },
};

interface TitleData {
  title: string;
  track: Track;
  category?: TechCategory | undefined;
}

export function getPostDisplayTitle(data: TitleData) {
  return `${TRACKS[data.track].titlePrefix} | ${data.title}`;
}
