import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPostDisplayTitle, SITE_NAME, TECH_CATEGORIES, TRACKS } from '../lib/content';
import { AUTHOR_NAME, SITE_DESCRIPTION, socialImagePathForPost } from '../lib/site';
import { getFeedPosts } from '../lib/publication';

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function GET(context) {
  const posts = getFeedPosts(await getCollection('posts'));
  const siteUrl = new URL('/', context.site).href;

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site,
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
    items: posts.map((post) => {
      const image = new URL(socialImagePathForPost(post.id, Boolean(post.data.cover)), context.site).href;
      const categories = [
        TRACKS[post.data.track].label,
        ...(post.data.category ? [TECH_CATEGORIES[post.data.category].label] : []),
        ...post.data.tags,
      ];
      return {
        title: getPostDisplayTitle(post.data),
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(`/posts/${post.id}/`, context.site).href,
        categories,
        customData:
          `<dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">${escapeXml(AUTHOR_NAME)}</dc:creator>` +
          `<media:content url="${escapeXml(image)}" medium="image" type="image/jpeg" width="1280" height="720" />`,
      };
    }),
    customData:
      `<language>ko-KR</language>` +
      `<managingEditor>${escapeXml(AUTHOR_NAME)}</managingEditor>` +
      `<image><url>${escapeXml(new URL('/favicon.svg', siteUrl).href)}</url><title>${escapeXml(SITE_NAME)}</title><link>${escapeXml(siteUrl)}</link></image>`,
  });
}
