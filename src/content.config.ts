import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One markdown file per page, under src/content/docs/.
 *
 *   docs/home.md                      -> /
 *   docs/<section>/index.md           -> /<section>/          (top-nav entry)
 *   docs/<section>/<page>.md          -> /<section>/<page>/   (left-nav entry)
 *
 * `order` sorts sections in the top nav and pages within a section.
 */
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Shorter label for the navigation, when the title is too long for it. */
    navLabel: z.string().optional(),
    /** Inline SVG markup (or an emoji) rendered immediately left of the page's <h1>. */
    titleIcon: z.string().optional(),
    order: z.number(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Tech/topic badges shown on this page's card when its section index renders cards. */
    cardBadges: z.array(z.string()).optional(),
    /** Section index only: render its child pages as a card grid below the intro text. */
    cards: z.boolean().default(false),

    /* Used by home.md and projects/index.md — rendered as real components, not markdown. */
    competencies: z.array(z.object({ label: z.string(), detail: z.string(), href: z.string() })).optional(),
    skills: z.array(z.object({ area: z.string(), items: z.array(z.string()) })).optional(),
    projects: z
      .array(
        z.object({
          name: z.string(),
          stack: z.string(),
          blurb: z.string(),
          page: z.string(),
          repo: z.string().url(),
          docs: z.string().url().optional(),
          year: z.number().optional(),
          badges: z.array(z.enum(['poc', 'product', 'library', 'opensource', 'experimental'])).optional(),
        })
      )
      .optional(),
    vitals: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    starters: z.array(z.string()).optional(),
  }),
});

export const collections = { docs };
