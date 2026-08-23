# Editing this site

Everything you will normally want to change is either **a markdown file** in
`src/content/docs/` or **a CSS variable** near the top of
`src/styles/global.css`. This file says which is which.

> Local notes for you — not published. The build only publishes
> `src/content/docs/`, so this file never appears on the site.

---

## 1. Daily loop

```bash
npm run dev        # http://localhost:4321 — live reload, but NO search index
npm run build      # full build + search index into dist/
npm run preview    # serve dist/ at :4321 — this is what the live site looks like
npx astro preview stop
```

Use `dev` while writing prose. Use `build` + `preview` before pushing, because
search and the sitemap only exist after a build.

Publish: commit and push to `main`. GitHub Actions builds and deploys; the site
is live at <https://anandmnair.github.io> a minute or two later.

---

## 2. Where each part of a page comes from

```
┌────────────────────────────────────────────────────────────────────┐
│  ⬡ AM   Anand Manissery [Draft]     ⌕ Search      A A │ ☀ ▣ ☾      │  src/components/SiteHeader.astro
├────────────────────────────────────────────────────────────────────┤
│  Home  Projects  AI  Digital Transformation  Technology  …         │  src/components/TopNav.astro
├──────────────┬─────────────────────────────────┬───────────────────┤
│ CRAFTSMANSHIP│  Home / Craftsmanship           │ ON THIS PAGE      │
│              │                                 │                   │
│ Overview     │  Domain-Driven Design           │  Event storming   │  right column: the ###
│ Problem solv.│  ─────────────────────────────  │  Grouping events  │  headings of the page
│▸Domain-Driv. │  Draft  Work in progress …      │  Bounded contexts │
│ Agile dev.   │                                 │                   │
│ TDD          │  Finding the boundaries of a    │                   │
│ …            │  system starts with language…   │                   │
│              │                                 │                   │
│ SectionNav   │  ← Previous        Next →       │                   │  DocsLayout.astro
│ .astro       │                                 │                   │
├──────────────┴─────────────────────────────────┴───────────────────┤
│  ⬡ Anand Manissery · … · GitHub LinkedIn Email Source      © 2026  │  src/components/SiteFooter.astro
└────────────────────────────────────────────────────────────────────┘
        ↑                    ↑
   left column =        middle = the markdown file
   the section's        src/content/docs/craftsmanship/domain-driven-design.md
   other .md files
```

---

## 3. Content — the markdown files

All pages live under `src/content/docs/`. **One markdown file = one page.**

```
src/content/docs/
├── home.md                          →  /                  (the landing page)
├── projects/
│   ├── index.md                     →  /projects/         (top-nav entry + overview)
│   ├── failover.md                  →  /projects/failover/
│   └── …
├── craftsmanship/
│   ├── index.md                     →  /craftsmanship/
│   ├── problem-solving.md           →  /craftsmanship/problem-solving/
│   └── …
└── …
```

**The rule:** a folder is a top-nav section. `index.md` is that section's
overview page and carries the label shown in the top bar. Every other file in
the folder is a page in the left sidebar.

### The front matter

```yaml
---
title: Domain-Driven Design      # the <h1> and the browser tab
description: Finding the …       # the lede under the h1, the meta description,
                                 # and the snippet shown in search results
navLabel: DDD                    # optional — shorter label for the nav
order: 2                         # position in the sidebar (or top nav, in index.md)
updated: 2026-08-23              # optional — shown under the lede
tags: ['ddd', 'architecture']    # optional — shown as chips
draft: false                     # true removes the page from the build entirely
---
```

Only `title`, `description` and `order` are required.

### Common jobs

| I want to… | Do this |
|---|---|
| **Fix a typo / rewrite a paragraph** | Edit the `.md` file for that page |
| **Add a page to a section** | New `.md` in that folder, give it `title`, `description`, `order` |
| **Add a whole new section** | New folder with an `index.md`; its `order` places it in the top nav |
| **Reorder the top nav** | Change `order:` in each section's `index.md` |
| **Reorder pages in a sidebar** | Change `order:` in those files |
| **Rename a page's URL** | Rename the file — the filename *is* the URL segment |
| **Hide a page for now** | `draft: true` |
| **Shorten a nav label** | Add `navLabel: 'Short name'` |

Nothing else needs touching. The sidebar, top nav, previous/next pager, sitemap
and search index all read the same files.

### Headings inside a page

- `##` and `###` become the **"On this page"** list on the right.
- Do not add an `#` H1 — the `title` front-matter field is the H1.
- The right column only appears when a page has at least two headings.

### Linking between pages

Use the final URL, with the trailing slash:

```markdown
See [event storming](/craftsmanship/domain-driven-design/#event-storming)
and [the projects](/projects/).
```

After renaming or moving anything, re-run the link check in §7.

---

## 4. The home page

`/` is not a plain markdown page. Its prose comes from the body of
`src/content/docs/home.md`, and everything else on it comes from **front matter
in that same file**:

| Section on the page | Front-matter key |
|---|---|
| The three paragraphs under "About me" | the markdown body |
| Stat strip (17+ years, 3 libraries, …) | `stats:` |
| Vitals card (Experience, Working on, …) | `vitals:` |
| Open-source cards | `projects:` |
| "Start here" cards | `starters:` — a list of section URLs |
| Core competencies grid | `competencies:` |
| Technical skills rows | `skills:` |

So adding an open-source card is this, in `home.md`:

```yaml
projects:
  - name: My Library
    stack: Java · Spring Boot · Messaging
    blurb: >-
      One or two sentences on the problem it solves.
    page: /projects/my-library/      # a page you also created in projects/
    repo: https://github.com/anandmnair/my-library
    docs: https://…                  # optional
```

The *layout* of the home page — the hero, the card shapes, the order of the
blocks — is `src/pages/index.astro`.

---

## 5. Site-wide details

`src/site.ts` — name, role, tagline, location, email, social links, and the
draft banner:

```ts
role: 'Technology Evangelist & Architect',
tagline: 'Distributed systems, domain-driven design, …',   // the line in the hero
location: 'Bangalore, India',
wip: { enabled: true, … },     // ← set false to remove every "Draft" badge and note
```

**To remove the work-in-progress notices site-wide:** `wip.enabled = false`.

---

## 6. Styles

### Colours, fonts, spacing — `src/styles/global.css`

Everything visual is a CSS variable in the first 90 lines. You almost never
need to touch anything below that.

| Lines | What |
|---|---|
| ~6–34 | Fonts, type scale, spacing scale, radii, page width (`--shell`) |
| ~37–52 | **Light theme** colours |
| ~55–70 | **Dark theme** colours (explicit toggle) |
| ~72–89 | Dark theme colours again, for people whose OS is dark and who never touched the toggle |

> **Important:** the dark palette is written **twice** — once under
> `:root[data-theme='dark']` and once under
> `@media (prefers-color-scheme: dark)`. Change a dark colour in **both** or the
> toggle and the OS setting will disagree.

The palette (matching societe-generale.github.io/failover):

| Variable | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0e0e18` | Page background |
| `--bg-elev` | `#f7f8fc` | `#15151f` | Cards, footer, raised surfaces |
| `--bg-sunken` | `#eef0f9` | `#1d1d2c` | Inline code, chips, control tracks |
| `--ink` | `#0f172a` | `#f0f0fa` | Body text |
| `--ink-soft` | `#475569` | `#c3c3dc` | Secondary text, ledes |
| `--muted` | `#64748b` | `#9090b4` | Labels, metadata |
| `--line` / `--line-strong` | `#e0e4f0` / `#c8cce0` | `#262638` / `#373752` | Borders |
| `--accent` | `#4f46e5` | `#818cf8` | Brand — links, rules, active states |
| `--accent-ink` | `#4338ca` | `#a5b4fc` | Link text, hover |
| `--accent-wash` | 8% indigo | 12% indigo | Tinted backgrounds |

**To rebrand:** change `--accent`, `--accent-ink` and `--accent-wash` in all
three blocks. Nothing else references a colour directly.

**Fonts** are at the top of the same file, and the stylesheet that loads them is
one `<link>` in `src/layouts/BaseLayout.astro`. Change both together.

```css
--font-display: 'Plus Jakarta Sans', …   /* headings, brand, numbers */
--font-body:    'Inter', …               /* everything else */
--font-mono:    'JetBrains Mono', …      /* code, labels, keycaps */
```

**Page width:** `--shell` (currently `1420px`). It is the only place the width
is defined — the header, footer, home page and doc layout all read it.

**Reading width:** `--measure: 68ch` controls how wide a paragraph gets.

### Layout and components

| Change | File |
|---|---|
| Header — brand, search box, controls | `src/components/SiteHeader.astro` |
| Top nav tabs | `src/components/TopNav.astro` |
| Left sidebar | `src/components/SectionNav.astro` |
| Right "On this page", breadcrumb, prev/next | `src/layouts/DocsLayout.astro` |
| Footer | `src/components/SiteFooter.astro` |
| Home page layout | `src/pages/index.astro` |
| Hexagon monogram | `src/components/Monogram.astro` |
| Search dialog | `src/components/Search.astro` |
| Theme toggle · text size | `src/components/ThemeToggle.astro` · `FontSize.astro` |
| `<head>`, fonts, social cards | `src/layouts/BaseLayout.astro` |
| 404 page | `src/pages/404.astro` |

Each `.astro` file holds its own markup, its own scoped `<style>`, and any
script it needs — so a component's styles are always in the same file as its
HTML. Only genuinely shared rules live in `global.css`.

---

## 7. Images

Put files in `public/img/`, reference them as `/img/name.svg`:

```markdown
![Test pyramid](/img/test-pyramid.svg)
```

Diagrams are rendered on a light sheet in both themes, because the artwork is
ink-on-paper. Current set: `hexagonal.svg`, `test-pyramid.svg`,
`feedback-loop.svg`, `event-storming.svg`, `skateboard-bike-car.svg`.

`event-storming.svg` is a drawn stand-in — swap it for a photo of a real wall
when you have one.

---

## 8. Checking your work

```bash
npm run build
```

A broken front-matter field fails the build with the file name and the field —
that is the fastest check you have.

To verify every internal link and anchor still resolves after a rename:

```bash
python3 - <<'PY'
import re, os, glob
bad, total = [], 0
for f in glob.glob('dist/**/*.html', recursive=True):
    html = open(f).read()
    for path, frag in set(re.findall(r'href="(/[^"#]*)(#[^"]*)?"', html)):
        if path.startswith(('/_astro', '/pagefind')): continue
        total += 1
        t = 'dist' + path
        page = t if os.path.isfile(t) else t.rstrip('/') + '/index.html'
        if not os.path.isfile(page): bad.append((f, path))
        elif frag and f'id="{frag[1:]}"' not in open(page).read(): bad.append((f, path + frag))
print(f'{total} links checked')
for src, ref in sorted(set(bad)): print('  BROKEN', ref, 'in', src)
print('  all resolve' if not bad else '')
PY
```

---

## 9. Custom domain

Currently served from `anandmnair.github.io`. To move to a domain you own:

1. Buy it.
2. DNS: four `A` records on the apex — `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153` — and a `CNAME` for `www` pointing at
   `anandmnair.github.io`.
3. `public/CNAME` containing just the bare domain.
4. `astro.config.mjs` → change `site:` to the new origin.
5. GitHub → Settings → Pages → set the custom domain, tick *Enforce HTTPS*.
