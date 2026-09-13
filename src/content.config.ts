import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const youtubeUrl = z.url().refine((value) => {
  const hostname = new URL(value).hostname.toLowerCase();
  return hostname === 'youtube.com' || hostname === 'www.youtube.com' || hostname === 'youtu.be';
}, 'Informe uma URL válida do YouTube.');

const artigos = defineCollection({
  loader: glob({ base: './src/content/artigos', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().trim().min(1).max(120),
    description: z.string().trim().min(1).max(220),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    version: z.string().regex(/^\d+\.\d+$/, 'Use versão no formato 1.0, 1.1, 2.0...'),
    status: z.enum(['rascunho', 'em-discussao', 'estavel']).default('em-discussao'),
    tags: z.array(z.string().trim().min(1)).max(10).default([]),
    youtube: youtubeUrl.optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { artigos };
