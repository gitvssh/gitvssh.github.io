import type { CollectionEntry } from 'astro:content';

export const TOPIC_MIN_POSTS = 3;

export const TOPICS = {
  'ai-use': {
    label: 'AI 활용',
    description:
      'AI 도구와 에이전트를 실제 작업에 적용할 때 필요한 기능, 운영 방식과 안전 경계를 모아 봅니다.',
    sourceTags: ['AI 활용'],
    sourceTracks: ['practice'],
  },
  'ai-agents': {
    label: 'AI 에이전트',
    description:
      'AI 에이전트의 설계, 운영, 안전과 생태계 변화를 논문과 최신 사례로 함께 살펴봅니다.',
    sourceTags: ['AI 에이전트', 'LLM 에이전트'],
  },
  'github-copilot': {
    label: 'GitHub Copilot',
    description:
      'GitHub Copilot의 모델, 자동화, 보안과 요금 변화를 개발자 관점에서 정리합니다.',
    sourceTags: ['GitHub Copilot'],
  },
} as const;

export type TopicSlug = keyof typeof TOPICS;
export type TopicDefinition = (typeof TOPICS)[TopicSlug];
export type PublishedTopic = TopicDefinition & {
  slug: TopicSlug;
  count: number;
};

type Post = CollectionEntry<'posts'>;

function normalizedTagSet(tags: string[]) {
  return new Set(tags.map((tag) => tag.trim().toLocaleLowerCase('ko-KR')));
}

export function postMatchesTopic(post: Post, slug: TopicSlug) {
  const postTags = normalizedTagSet(post.data.tags);
  const topic = TOPICS[slug];
  const tagMatches = topic.sourceTags.some((tag) =>
    postTags.has(tag.toLocaleLowerCase('ko-KR')),
  );
  const trackMatches =
    'sourceTracks' in topic &&
    (topic.sourceTracks as readonly string[]).includes(post.data.track);

  return tagMatches || trackMatches;
}

export function getTopicPosts(posts: Post[], slug: TopicSlug) {
  return posts.filter((post) => postMatchesTopic(post, slug));
}

export function getPublishedTopics(posts: Post[]): PublishedTopic[] {
  return (Object.entries(TOPICS) as [TopicSlug, TopicDefinition][])
    .map(([slug, topic]) => ({
      ...topic,
      slug,
      count: getTopicPosts(posts, slug).length,
    }))
    .filter(({ count }) => count >= TOPIC_MIN_POSTS)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ko-KR'));
}

export function getTopicsForPost(post: Post, topics: PublishedTopic[]) {
  return topics.filter(({ slug }) => postMatchesTopic(post, slug));
}
