import type { CollectionEntry } from 'astro:content';
export {
  getPostDisplayTitle,
  SITE_NAME,
  TECH_CATEGORIES,
  TECH_CATEGORY_KEYS,
  TRACKS,
} from './taxonomy';
export type { TechCategory, Track } from './taxonomy';

export function sortPosts(posts: CollectionEntry<'posts'>[]) {
  return [...posts].sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

export function sortSeriesPosts(posts: CollectionEntry<'posts'>[]) {
  return [...posts].sort((a, b) => {
    const orderDelta = (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0);
    return orderDelta || a.data.publishedAt.valueOf() - b.data.publishedAt.valueOf();
  });
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
