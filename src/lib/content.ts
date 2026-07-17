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

export function sortUpdatedPosts(posts: CollectionEntry<'posts'>[]) {
  return [...posts]
    .filter(
      (post) =>
        post.data.updatedAt &&
        post.data.updatedAt.valueOf() > post.data.publishedAt.valueOf(),
    )
    .sort(
      (a, b) =>
        (b.data.updatedAt ?? b.data.publishedAt).valueOf() -
        (a.data.updatedAt ?? a.data.publishedAt).valueOf(),
    );
}

export function getRelatedPosts(
  current: CollectionEntry<'posts'>,
  posts: CollectionEntry<'posts'>[],
  limit = 3,
) {
  const currentTags = new Set(current.data.tags.map((tag) => tag.toLocaleLowerCase('ko-KR')));

  return posts
    .filter((candidate) => candidate.id !== current.id)
    .map((candidate) => {
      const sharedTags = candidate.data.tags.filter((tag) =>
        currentTags.has(tag.toLocaleLowerCase('ko-KR')),
      ).length;
      let score = Math.min(sharedTags, 3);

      if (
        current.data.series?.slug &&
        candidate.data.series?.slug === current.data.series.slug
      ) {
        score += 8;
      }
      if (current.data.category && candidate.data.category === current.data.category) {
        score += 4;
      }
      if (candidate.data.track === current.data.track) {
        score += 2;
      }

      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.data.publishedAt.valueOf() - a.candidate.data.publishedAt.valueOf(),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
