import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TECH_CATEGORY_KEYS } from './lib/taxonomy';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: ({ image }) => {
    const officialResource = z
      .object({
        kind: z.enum(['official_announcement', 'documentation', 'product_page', 'press_material']),
        title: z.string().min(1),
        siteName: z.string().min(1),
        summary: z.string().min(1),
        url: z.url(),
        publishedAt: z.coerce.date().optional(),
        image: image().optional(),
        imageAlt: z.string().min(1).optional(),
        imageRights: z
          .object({
            owner: z.string().min(1),
            basis: z.enum([
              'brand_policy',
              'press_media_terms',
              'open_license',
              'official_embed',
              'written_permission',
              'quotation',
            ]),
            evidenceUrl: z.url(),
            attribution: z.string().min(1),
            modifications: z.enum(['none', 'resize_only', 'crop', 'annotated']),
          })
          .optional(),
      })
      .superRefine((data, context) => {
        if (!data.url.startsWith('https://')) {
          context.addIssue({
            code: 'custom',
            path: ['url'],
            message: '공식 자료 링크는 HTTPS URL이어야 합니다.',
          });
        }

        if (data.image && (!data.imageAlt || !data.imageRights)) {
          context.addIssue({
            code: 'custom',
            path: ['image'],
            message: '공식 자료 이미지에는 imageAlt와 imageRights가 모두 필요합니다.',
          });
        }

        if (!data.image && (data.imageAlt || data.imageRights)) {
          context.addIssue({
            code: 'custom',
            path: ['image'],
            message: 'imageAlt와 imageRights는 로컬 이미지와 함께 사용해야 합니다.',
          });
        }
      });

    return z.object({
      title: z.string(),
      searchTitle: z.string().min(1).max(55).optional(),
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
      officialResources: z.array(officialResource).max(4).optional(),
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

      if (
        data.searchTitle &&
        (data.searchTitle.includes('3분만에 만화로 보는 IT') || data.searchTitle.includes('|'))
      ) {
        context.addIssue({
          code: 'custom',
          path: ['searchTitle'],
          message: 'searchTitle에는 사이트 접두사나 구분자(|)를 넣지 않습니다.',
        });
      }
    });
  },
});

export const collections = { posts };
