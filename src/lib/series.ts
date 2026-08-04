import type { CollectionEntry } from 'astro:content';
import { sortSeriesPosts } from './content';
import type { TechCategory } from './taxonomy';

export interface SeriesDefinition {
  title: string;
  description: string;
  category: TechCategory;
}

export const SERIES: Record<string, SeriesDefinition> = {
  'homelab-k8s': {
    title: '홈랩 쿠버네티스 구축기',
    description:
      '집에 둔 서버로 쿠버네티스 클러스터를 세우고 운영하며 마주친 병목, 장애, 복구 판단을 회차 순서로 기록합니다.',
    category: 'development_episode',
  },
  'payment-platform-devlog': {
    title: '선불결제 플랫폼 개발기',
    description: '선불결제 백엔드를 설계·개발하며 겪은 판단과 검증 기록',
    category: 'development_episode',
  },
  'safelease-devlog': {
    title: 'SafeLease 실험기',
    description: '판례 근거 계약 분석 실험에서 평가와 한계를 다루는 기록',
    category: 'development_episode',
  },
  'database-core': {
    title: '데이터베이스 핵심 원리',
    description:
      '데이터 모델과 SQL, 트랜잭션까지 데이터베이스를 지탱하는 원리를 순서대로 쌓아 올립니다.',
    category: 'database',
  },
};

export type PublishedSeries = SeriesDefinition & {
  slug: string;
  posts: CollectionEntry<'posts'>[];
};

type Post = CollectionEntry<'posts'>;

export function getSeriesDefinition(slug: string) {
  return SERIES[slug];
}

export function getSeriesPosts(posts: Post[], slug: string) {
  return sortSeriesPosts(posts.filter((post) => post.data.series?.slug === slug));
}

export function getPublishedSeries(posts: Post[]): PublishedSeries[] {
  return Object.entries(SERIES)
    .map(([slug, series]) => ({ ...series, slug, posts: getSeriesPosts(posts, slug) }))
    // A series registered for future publication has no episode to order yet, so it
    // stays out of the public routes, index, and sitemap until its first post ships.
    .filter(({ posts: seriesPosts }) => seriesPosts.length > 0)
    .sort(
      (a, b) => b.posts.length - a.posts.length || a.title.localeCompare(b.title, 'ko-KR'),
    );
}
