# anandmnair.github.io

Personal site — a handbook rather than a blog. Built with [Astro](https://astro.build),
searched with [Pagefind](https://pagefind.app), deployed to GitHub Pages by GitHub Actions.

Live at <https://anandmnair.github.io>.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321 — no search index in dev
npm run build    # astro build + pagefind index into dist/
npm run preview  # serve dist/, search works here
npm run check    # type-check .astro / .ts
```

Search only exists after `npm run build`, because the Pagefind index is generated
from the built HTML. In `npm run dev` the search dialog says so.

## How the site is put together

Every page is **one markdown file** in `src/content/pages/`. There are no other
content types — no separate blog, projects or résumé collections.

Front matter drives everything:

```yaml
---
title: Technology              # <h1> and browser title
description: Architecture …    # lede under the h1, meta description, search snippet
navLabel: Technology           # optional — shorter label for the sidebar
slug: /technology/             # the route
order: 5                       # position in the sidebar and the footer nav
updated: 2026-08-23
tags: ['architecture']
draft: false                   # true removes the page from the build entirely
---
```

To **add a page**: drop a markdown file in `src/content/pages/`, give it a `slug`
and an `order`. The sidebar, the footer nav, the previous/next pager, the sitemap
and the search index all pick it up with no further wiring.

To **reorder the menu**: change the `order` numbers. Nothing else refers to the
sequence.

| Concern | File |
|---|---|
| Name, role, tagline, socials | `src/site.ts` |
| Nav construction | `src/nav.ts` |
| Page content | `src/content/pages/*.md` |
| Front-matter schema | `src/content.config.ts` |
| Colours, type, spacing, prose | `src/styles/global.css` |
| Shell — sidebar, TOC, pager | `src/layouts/DocsLayout.astro` |
| Home hero | `src/pages/index.astro` |
| Diagrams | `public/img/*.svg` |

`home.md` is special: it is rendered by `src/pages/index.astro`, which puts a
hero above its body. Its front matter still supplies the description and its
`order: 1` still puts Home first in the nav.

## Layout

Three columns on a wide screen: section list on the left, content in the middle,
"On this page" on the right. Under 1180px the right column goes; under 900px the
left column becomes a drawer behind the menu button.

`##` and `###` headings become the "On this page" entries automatically, which is
why the long pages are written with a lot of them.

## Deployment

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages. Repository setting: **Settings → Pages → Source: GitHub Actions**.

## Custom domain

The site is served from `https://anandmnair.github.io` — a GitHub subdomain,
free, nothing to configure. A custom domain is a name you buy and point at GitHub
instead, for example `anandmnair.dev`. To switch later:

1. Buy the domain from any registrar.
2. At the DNS provider add, for the apex, four `A` records — `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153` — and for `www` a
   `CNAME` to `anandmnair.github.io`.
3. Put the bare domain in `public/CNAME` (one line, no scheme).
4. Change `site:` in `astro.config.mjs` to the new origin.
5. In **Settings → Pages**, set the custom domain and tick *Enforce HTTPS*.
