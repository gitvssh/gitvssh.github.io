import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { TECH_CATEGORIES, TRACKS } from '../lib/content';
import { getPublishedSeries } from '../lib/series';
import { getPublishedTopics, getTopicPosts } from '../lib/topics';

type Post = CollectionEntry<'posts'>;

interface SitemapEntry {
  path: string;
  lastmod?: Date | undefined;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function postLastmod(post: Post) {
  return post.data.updatedAt ?? post.data.publishedAt;
}

function latestPostDate(posts: Post[]) {
  return posts.reduce<Date | undefined>((latest, post) => {
    const candidate = postLastmod(post);
    return !latest || candidate.valueOf() > latest.valueOf() ? candidate : latest;
  }, undefined);
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL('https://blog.damecasol.com');
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const latestSiteDate = latestPostDate(posts);
  const entries: SitemapEntry[] = [
    { path: '/', lastmod: latestSiteDate },
    { path: '/about/' },
    { path: '/archives/', lastmod: latestSiteDate },
    { path: '/privacy/' },
  ];

  for (const post of posts) {
    entries.push({ path: `/posts/${post.id}/`, lastmod: postLastmod(post) });
  }

  // Listing pages with no post yet render as noindex and stay out of the sitemap, so the
  // sitemap never advertises an empty page.
  for (const track of Object.keys(TRACKS)) {
    const trackPosts = posts.filter((post) => post.data.track === track);
    if (trackPosts.length === 0) continue;
    entries.push({ path: `/tracks/${track}/`, lastmod: latestPostDate(trackPosts) });
  }

  for (const category of Object.keys(TECH_CATEGORIES)) {
    const categoryPosts = posts.filter(
      (post) => post.data.track === 'tech_column' && post.data.category === category,
    );
    if (categoryPosts.length === 0) continue;
    entries.push({ path: `/categories/${category}/`, lastmod: latestPostDate(categoryPosts) });
  }

  const publishedSeries = getPublishedSeries(posts);
  if (publishedSeries.length > 0) {
    entries.push({
      path: '/series/',
      lastmod: latestPostDate(publishedSeries.flatMap((series) => series.posts)),
    });
  }
  for (const series of publishedSeries) {
    entries.push({ path: `/series/${series.slug}/`, lastmod: latestPostDate(series.posts) });
  }

  for (const topic of getPublishedTopics(posts)) {
    entries.push({
      path: `/topics/${topic.slug}/`,
      lastmod: latestPostDate(getTopicPosts(posts, topic.slug)),
    });
  }

  const urls = entries
    .sort((a, b) => a.path.localeCompare(b.path, 'en'))
    .map(({ path, lastmod }) => {
      const location = escapeXml(new URL(path, siteUrl).href);
      const modified = lastmod ? `\n    <lastmod>${lastmod.toISOString()}</lastmod>` : '';
      return `  <url>\n    <loc>${location}</loc>${modified}\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
  );
};
