import assert from 'node:assert/strict';
import test from 'node:test';
import { getFeedPosts, showPublicationDates } from '../src/lib/publication.ts';
import { socialImagePathForPost } from '../src/lib/site.ts';

test('a batch larger than 50 retains older entries, honest dates, and excludes drafts', () => {
  const sameDay = new Date('2026-10-18T00:00:00+09:00');
  const posts = Array.from({ length: 65 }, (_, i) => ({
    id: `batch-${String(i).padStart(2, '0')}`,
    data: { track: 'tech_column', publishedAt: sameDay },
  })).reverse();
  const oldDate = new Date('2022-01-03T12:00:00+09:00');
  const migrated = { id: 'older-published-essay', data: { track: 'tech_column', publishedAt: oldDate } };
  const draft = { id: 'unreleased-essay', data: { track: 'tech_column', publishedAt: sameDay, draft: true } };
  const input = [...posts, migrated, draft];
  const result = getFeedPosts(input);

  assert.equal(result.length, 66);
  assert.equal(result[0].id, 'batch-00');
  assert.equal(result[64].id, 'batch-64');
  assert.equal(result.at(-1), migrated);
  assert.equal(result.at(-1).data.publishedAt, oldDate);
  assert.ok(!result.includes(draft));
  assert.equal(input[0].id, 'batch-64', 'sorting must not mutate the source collection');
  assert.deepEqual(getFeedPosts(input.toReversed()).map(({ id }) => id), result.map(({ id }) => id));
});

test('visible publication dates are independent of metadata and support explicit overrides', () => {
  assert.equal(showPublicationDates({ track: 'news' }), true);
  assert.equal(showPublicationDates({ track: 'paper', dateDisplay: 'auto' }), true);
  assert.equal(showPublicationDates({ track: 'tech_column' }), false);
  assert.equal(showPublicationDates({ track: 'practice' }), false);
  assert.equal(showPublicationDates({ track: 'tech_column', dateDisplay: 'show' }), true);
  assert.equal(showPublicationDates({ track: 'news', dateDisplay: 'hide' }), false);
});

test('coverless articles use an existing default image while legacy comic paths remain stable', () => {
  assert.equal(socialImagePathForPost('article-without-art', false), '/social-default.jpg');
  assert.equal(socialImagePathForPost('existing-comic'), '/social/existing-comic.jpg');
  assert.equal(socialImagePathForPost('illustrated-article', true), '/social/illustrated-article.jpg');
});
