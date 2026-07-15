import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPostDisplayTitle, SITE_NAME } from '../lib/content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: SITE_NAME,
    description: 'AI논문, 최신뉴스와 핵심 IT 주제를 3분 만화와 정확한 글로 설명합니다.',
    site: context.site,
    items: posts.map((post) => ({
      title: getPostDisplayTitle(post.data),
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/posts/${post.id}/`,
    })),
    customData: '<language>ko-KR</language>',
  });
}
