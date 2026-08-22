import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string().optional(),
    year: z.string().optional(),
    language: z.string().optional(),
    stars: z.number().optional(),
    tags: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    docs: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string().default('Present'),
    stack: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

export const collections = { blog, projects, resume };
