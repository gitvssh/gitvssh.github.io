import type { CollectionEntry } from 'astro:content';

export const TRACKS = {
  news: {
    label: '최신 뉴스',
    description: '공식 발표와 현재 확인 가능한 사실을 빠르게 정리합니다.',
  },
  paper: {
    label: '논문',
    description: '논문의 근거와 해석을 구분해 핵심 주장을 읽습니다.',
  },
  tech_column: {
    label: '기술 칼럼',
    description: '기술 개념과 선택지를 문제에 맞는 관점으로 풀어냅니다.',
  },
} as const;

export type Track = keyof typeof TRACKS;

export function sortPosts(posts: CollectionEntry<'posts'>[]) {
  return [...posts].sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
