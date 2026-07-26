import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap.xml', site);
  const newsSitemap = new URL('news-sitemap.xml', site);
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\nSitemap: ${newsSitemap.href}\n`,
  );
};
