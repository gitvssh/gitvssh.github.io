import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TECH_CATEGORY_KEYS } from './lib/taxonomy';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      track: z.enum(['paper', 'news', 'tech_column', 'practice']),
      subtype: z.string(),
      category: z.enum(TECH_CATEGORY_KEYS).optional(),
      series: z
        .object({
          slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
          title: z.string().min(1),
          order: z.number().int().positive(),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      audience: z.enum(['general', 'builder', 'developer']).optional(),
      readerOutcome: z.string().min(1).optional(),
      contentFormats: z
        .array(z.enum(['article', 'comic', 'diagram', 'table', 'tutorial', 'checklist']))
        .default(['article', 'comic']),
      freshnessStatus: z.enum(['current', 'review_due', 'outdated', 'archived']).default('current'),
      reviewedAt: z.coerce.date().optional(),
      reviewAfter: z.coerce.date().optional(),
      testedAt: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string(),
      sourceUrl: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }).superRefine((data, context) => {
      if (data.track === 'tech_column' && !data.category) {
        context.addIssue({
          code: 'custom',
          path: ['category'],
          message: '기술 연재 글에는 category가 필요합니다.',
        });
      }

      if (data.track !== 'tech_column' && (data.category || data.series)) {
        context.addIssue({
          code: 'custom',
          path: data.category ? ['category'] : ['series'],
          message: 'category와 series는 기술 연재 글에서만 사용합니다.',
        });
      }

      if (data.track === 'practice' && (!data.testedAt || !data.reviewAfter)) {
        context.addIssue({
          code: 'custom',
          path: ['testedAt'],
          message: 'AI 활용 실습 글에는 testedAt과 reviewAfter가 필요합니다.',
        });
      }

      if (data.series && !data.category) {
        context.addIssue({
          code: 'custom',
          path: ['series'],
          message: 'series를 사용하려면 category가 필요합니다.',
        });
      }
    }),
});

export const collections = { posts };
