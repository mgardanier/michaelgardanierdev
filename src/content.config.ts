import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const books = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    year: z.number(),
    dateRead: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    amazonLink: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { books };
