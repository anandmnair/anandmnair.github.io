# anandmnair.github.io

Personal site — built with [Astro](https://astro.build), searched with
[Pagefind](https://pagefind.app), deployed to GitHub Pages by GitHub Actions.

Live at <https://anandmnair.github.io>.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321 — no search index in dev
npm run build    # astro build + pagefind index into dist/
npm run preview  # serve dist/, search works here
npm run check    # type-check .astro / .ts
```

Search is only available after `npm run build`, because the Pagefind index is
generated from the built HTML. In `npm run dev` the search dialog says so.

## Where the content lives

| What | Where |
| --- | --- |
| Name, role, tagline, socials, nav | `src/site.ts` |
| Blog posts | `src/content/blog/*.md` |
| Projects | `src/content/projects/*.md` |
| Résumé entries | `src/content/resume/*.md` |
| Front-matter rules for all three | `src/content.config.ts` |
| Colours, fonts, spacing | `src/styles/global.css` |
| Home page copy (hero, "currently", contact) | `src/pages/index.astro` |
| About page copy | `src/pages/about.astro` |

Everything marked `TODO —` is a placeholder waiting for your words. Grep for
them:

```bash
grep -rn "TODO —" src/
```

## Add a post

Create `src/content/blog/my-post.md`. The file name becomes the URL
(`/blog/my-post/`).

```markdown
---
title: The title
description: One sentence. Used in the list, the search result and the RSS item.
date: 2026-09-01
tags: ['java', 'architecture']
draft: false          # true keeps it out of the build entirely
---

Body in Markdown or MDX. `##` and `###` headings become the
"On this page" panel automatically.
```

## Add a project

Create `src/content/projects/my-project.md`.

```markdown
---
title: My Project
description: What it does, in one sentence.
role: Author
year: '2026'
language: Java
tags: ['Spring Boot']
repo: https://github.com/anandmnair/my-project
docs: https://anandmnair.github.io/my-project/   # optional
featured: true       # shows on the home page
order: 1             # lower sorts first
---
```

## Résumé PDF

The Résumé page links to `/cv.pdf`. Drop your PDF at `public/cv.pdf`, or remove
the button in `src/pages/resume.astro`.

## Deployment

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes it
to GitHub Pages. In the repository: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

## Custom domain

The site is served from `https://anandmnair.github.io` — a GitHub subdomain,
free, nothing to configure. A custom domain is a name you buy and point at
GitHub instead, for example `anandmnair.dev`. To switch later:

1. Buy the domain from any registrar.
2. At the DNS provider, add for the apex (`anandmnair.dev`) four `A` records —
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` —
   and for `www` a `CNAME` to `anandmnair.github.io`.
3. Put the bare domain in `public/CNAME` (one line, no scheme).
4. Change `site:` in `astro.config.mjs` to the new origin.
5. In **Settings → Pages**, set the custom domain and tick *Enforce HTTPS*.

Steps 3–5 are the only ones that touch this repository.
