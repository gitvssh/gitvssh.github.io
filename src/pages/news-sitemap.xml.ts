import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_NAME } from '../lib/content';

const NEWS_WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL('https://blog.damecasol.com');
  const now = Date.now();
  const newsPosts = (
    await getCollection(
      'posts',
      ({ data }) =>
        !data.draft &&
        data.track === 'news' &&
        data.publishedAt.valueOf() <= now &&
        data.publishedAt.valueOf() >= now - NEWS_WINDOW_MS,
    )
  ).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const urls = newsPosts
    .map(
      (post) => `  <url>
    <loc>${escapeXml(new URL(`/posts/${post.id}/`, siteUrl).href)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>ko</news:language>
      </news:publication>
      <news:publication_date>${post.data.publishedAt.toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.data.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
      `xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
  );
};
