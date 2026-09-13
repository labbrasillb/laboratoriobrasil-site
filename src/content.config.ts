import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const artigos = defineCollection({
  loader: glob({ base: './src/content/artigos', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    version: z.string().default('1.0'),
    status: z.enum(['rascunho', 'em-discussao', 'estavel']).default('em-discussao'),
    tags: z.array(z.string()).default([]),
    youtube: z.url().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { artigos };
