import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Temporary fixture posts exercise Astro's real schema, article/card rendering,
// social-image generation and RSS serialization in an isolated output directory.
const root = resolve('src/content/posts');
const slugs = ['publication-check-article', 'publication-check-dated', 'publication-check-draft'];
const created = [];
let buildRoot;
function run(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], { stdio: 'inherit' });
  assert.equal(result.status, 0, `${script} failed`);
}
function frontmatter(slug, extra = '') {
  return `---\ntitle: "Publication regression fixture"\ndescription: "Local regression fixture."\nslug: ${slug}\npublishedAt: 2000-01-01T00:00:00+09:00\nupdatedAt: 2000-01-02T00:00:00+09:00\ntrack: tech_column\nsubtype: devlog\ncategory: infrastructure\ncontentFormats: [article]\ntags: [Kubernetes]\n${extra}---\n\n## Check\n\nArticle without a cover.\n`;
}
try {
  for (const slug of slugs) {
    const directory = resolve(root, slug);
    assert.ok(!existsSync(directory), `Refusing to overwrite ${directory}`);
    await mkdir(directory);
    created.push(directory);
  }
  await writeFile(resolve(root, slugs[0], 'index.md'), frontmatter(slugs[0], 'testedAt: 2026-10-18\ntestedVersion: "Node 24"\n') + '\n```yaml\ncover: "this-is-an-example-not-an-image.png"\n```\n');
  await writeFile(resolve(root, slugs[1], 'index.md'), frontmatter(slugs[1], 'dateDisplay: show\n'));
  await writeFile(resolve(root, slugs[2], 'index.md'), frontmatter(slugs[2], 'draft: true\n'));

  const articlePath = resolve(root, slugs[0], 'index.md');
  const articleSource = await readFile(articlePath, 'utf8');
  for (const source of [
    articleSource.replace('contentFormats: [article]\n', ''),
    articleSource.replace('contentFormats: [article]', 'contentFormats: [article, comic]'),
    articleSource.replace('contentFormats: [article]', 'contentFormats: []'),
  ]) {
    await writeFile(articlePath, source);
    const invalid = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'sync'], { encoding: 'utf8' });
    assert.notEqual(invalid.status, 0, 'Invalid or legacy coverless comic must fail the actual content schema');
    assert.match(`${invalid.stdout}${invalid.stderr}`, /cover|contentFormats/);
  }
  await writeFile(articlePath, articleSource);

  await mkdir(resolve('output'), { recursive: true });
  buildRoot = await mkdtemp(resolve('output/publication-build-'));
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', buildRoot], { stdio: 'inherit' });
  assert.equal(build.status, 0, 'Astro build with article-only fixtures failed');
  run('scripts/generate-social-images.mjs', [buildRoot]);

  const article = await readFile(resolve(buildRoot, 'posts', slugs[0], 'index.html'), 'utf8');
  const dated = await readFile(resolve(buildRoot, 'posts', slugs[1], 'index.html'), 'utf8');
  const header = article.match(/<header class="article-header[\s\S]*?<\/header>/)?.[0];
  assert.ok(header);
  assert.ok(!header.includes('발행 <time'));
  assert.ok(!header.includes('수정 <time'));
  assert.ok(header.includes('검증 <time'));
  assert.ok(header.includes('검증 환경 Node 24'));
  assert.ok(!article.includes('<figure class="article-cover'));
  assert.ok(article.includes('property="og:image" content="https://blog.damecasol.com/social-default.jpg"'));
  assert.ok(article.includes('"datePublished":"1999-12-31T15:00:00.000Z"'));
  assert.ok(article.includes('"dateModified":"2000-01-01T15:00:00.000Z"'));
  assert.ok(dated.includes('발행 <time'));
  assert.ok(dated.includes('수정 <time'));
  assert.ok(!existsSync(resolve(buildRoot, 'posts', slugs[2], 'index.html')));

  const feed = await readFile(resolve(buildRoot, 'rss.xml'), 'utf8');
  const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
  assert.ok(items.length > 50, 'RSS must retain posts beyond the former 50-item limit');
  for (const item of items) {
    const image = item.match(/<media:content url="([^"]+)"/)?.[1];
    assert.ok(image, 'Every feed item must have a social image');
    const imageUrl = new URL(image);
    assert.equal(imageUrl.origin, 'https://blog.damecasol.com');
    assert.ok(existsSync(resolve(buildRoot, '.' + imageUrl.pathname)), `Missing social image: ${imageUrl.pathname}`);
  }
  for (const slug of slugs.slice(0, 2)) {
    const item = items.find((xml) => xml.includes(`/posts/${slug}/`));
    assert.ok(item, `${slug} was dropped because its publication date was old`);
    assert.ok(item.includes(`<guid isPermaLink="true">https://blog.damecasol.com/posts/${slug}/</guid>`));
    assert.ok(item.includes('<pubDate>Fri, 31 Dec 1999 15:00:00 GMT</pubDate>'));
    assert.ok(item.includes('url="https://blog.damecasol.com/social-default.jpg"'));
  }
  assert.ok(!feed.includes(`/posts/${slugs[2]}/`));
  const listing = await readFile(resolve(buildRoot, 'categories/infrastructure/index.html'), 'utf8');
  assert.ok(listing.includes('post-card--text'));
  assert.ok(listing.includes(`/posts/${slugs[0]}/`));
  console.log('Publication build regression passed: coverless articles, dates, metadata, RSS, drafts and text cards.');
} finally {
  for (const directory of created) await rm(directory, { recursive: true, force: true });
  if (buildRoot) await rm(buildRoot, { recursive: true, force: true });
}
