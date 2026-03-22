# [SY] — Personal Website

Personal site for Serhii Yahdzhyiev. Two sides of one person: software
developer and musician/producer. Built with Astro, deployed to GitHub Pages.

---

## Stack

| Concern         | Choice                                                    |
| --------------- | --------------------------------------------------------- |
| Framework       | [Astro](https://astro.build) 5.x — static output          |
| Styling         | SCSS + CSS custom properties + UnoCSS (`preset-mini`)     |
| Interactive UI  | React 19 — used only where state is needed (audio player) |
| Language        | TypeScript strict mode                                    |
| Package manager | **yarn** (do not use npm or pnpm)                         |
| Node version    | Managed via nvm — see `.nvmrc`                            |
| Fonts           | Local files in `public/fonts/` + `@fontsource/fraunces`   |
| Images          | `astro:assets` `<Picture>` — AVIF + WebP at build time    |
| Hosting         | GitHub Pages (static, `output: 'static'`)                 |
| Content         | Astro Content Collections (blog posts as `.md`)           |

---

## Dev Setup

```bash
nvm install && nvm use   # match Node version from .nvmrc
yarn                     # install dependencies
yarn dev                 # start dev server at localhost:4321
yarn build               # production build → dist/
yarn preview             # preview the built site locally
```

Linting and formatting:

```bash
yarn lint          # ESLint check
yarn lint:fix      # ESLint auto-fix
yarn format        # Prettier write
yarn format:check  # Prettier check (used in CI)
```

---

## Project Structure

```
src/
  components/
    landing/         # Hero.astro, RecentPosts.astro
    music/           # AudioPlayer.tsx (React)
    experience/      # item.astro
    education/       # item.astro
    skills/          # item.astro
    layout/          # ThemeToggle.astro
    Footer.astro
    Header.astro
    Navigation.astro
    Portrait.astro
    SocialLinks.astro
  content/
    blog/            # .md posts — filename becomes the slug
    config.ts        # Content Collection schemas
  data/
    main.ts          # Owner info and social links (shared across site)
    videos.ts        # YouTube video entries
    cv/
      experience.ts
      education.ts
      skills.ts
  layouts/
    base.astro       # HTML shell, meta tags, dark-mode bootstrap script
    Page.astro       # Standard layout (Header + main slot + Footer)
    BlogPost.astro   # Blog post layout with metadata and prose styles
  pages/
    index.astro      # Landing
    blog/
      index.astro
      [...slug].astro
    music/index.astro
    videos/index.astro
    cv/index.astro
  styles/
    index.scss       # Single entry point
    tokens/
      color.css      # CSS custom properties — light and dark palettes
      typo.css       # Font families, sizes, weights, line heights
      spacing.css    # Spacing scale, border radius, border widths
      motion.css     # Transition/animation tokens
    core/
      reset.scss
      base.scss      # body flex layout, dark mode color-scheme
      layout.scss    # Panel and card utility classes
      typo.scss      # Heading styles
    mixins/
      focus.scss
      media.scss
      stack.scss
  assets/
    img/
      portrait.jpg   # Source image — processed by astro:assets at build time
public/
  cv.pdf             # Updated manually by committing a new file
  fonts/             # Archivo, Inconsolata (loaded via @font-face in typo.css)
  favicon.ico
  robots.txt
```

---

## Pages

| Route           | File                         | Description                                           |
| --------------- | ---------------------------- | ----------------------------------------------------- |
| `/`             | `pages/index.astro`          | Hero with name, tagline, bio, CTA buttons             |
| `/blog/`        | `pages/blog/index.astro`     | Blog post list, sorted by date                        |
| `/blog/[slug]/` | `pages/blog/[...slug].astro` | Individual post with read time                        |
| `/music/`       | `pages/music/index.astro`    | Audio player (React) with self-hosted tracks          |
| `/videos/`      | `pages/videos/index.astro`   | YouTube embed grid                                    |
| `/cv/`          | `pages/cv/index.astro`       | Full bio, experience, education, skills + CV download |

---

## Design System

### Fonts

| Role               | Family               | Token          |
| ------------------ | -------------------- | -------------- |
| Display / headings | Fraunces (serif)     | `--ff-display` |
| Body               | Archivo (sans-serif) | `--ff-sans`    |
| Monospace / labels | Inconsolata          | `--ff-mono`    |

Fraunces is installed as an npm package (`@fontsource/fraunces`) and imported
in `typo.css`. Archivo and Inconsolata are local files in `public/fonts/` loaded
via `@font-face` with `font-display: swap`.

### Colour Tokens

All colours are CSS custom properties defined in `src/styles/tokens/color.css`.
The `.dark` class on `<html>` switches the palette.

Key tokens: `--clr-bg-body`, `--clr-bg-surface`, `--clr-bg-header`,
`--clr-text-primary`, `--clr-text-secondary`, `--clr-text-muted`,
`--clr-accent`, `--clr-border-subtle`, `--clr-border-strong`,
`--clr-surface-1/2/3`, `--sh-surface-1/2`.

Never hardcode colour values — always use a token.

### Spacing / Radius

Scale in `src/styles/tokens/spacing.css`: `--sp-1` (0.25 rem) through
`--sp-8` (4 rem). Border radius: `--rd-sm` through `--rd-xl`.

---

## Dark Mode

- Default: system preference (`prefers-color-scheme: dark`)
- Toggle: `ThemeToggle.astro` — writes `"dark"` or `"light"` to `localStorage`
- Bootstrap: inline `<script is:inline>` in `base.astro` reads `localStorage`
  and adds `.dark` to `<html>` before first paint (no flash)
- All CSS uses `html.dark` (not `:global(:not(.dark))` — that matches every
  ancestor and breaks visibility logic)

---

## Content Management

### Blog posts

Create a `.md` file in `src/content/blog/`. The filename becomes the URL slug.

```md
---
title: "Post title"
description: "Short description for SEO and index listing"
publishedAt: 2025-01-15
tags: ["tag-one", "tag-two"]
draft: false
---

Post body here (Markdown / MDX).
```

Draft posts (`draft: true`) are filtered out at build time and never published.

### Music tracks

Add an entry to the music content collection (see `src/content/config.ts`),
place the audio file at `public/music/tracks/{filename}`, and optionally add
cover art at `public/music/covers/{cover}`.

### Videos

Add entries to `src/data/videos.ts`. Each entry needs a YouTube video ID,
title, description, and year.

### CV data

Edit the files in `src/data/cv/`:

- `experience.ts` — work history
- `education.ts` — education entries
- `skills.ts` — skill groups with proficiency levels (0–100)

### CV PDF

Replace `public/cv.pdf` and commit. The download link on the bio page points
directly to this file.

### Portrait

Replace `src/assets/img/portrait.jpg`. Astro regenerates the optimised AVIF
and WebP variants on next build — no config changes needed.

---

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy.yaml` on every push to
`main`. The workflow runs `npm ci && npm run build` and publishes the `dist/`
folder to the `gh-pages` branch.

The live site URL is configured in `astro.config.ts`:

```ts
site: "https://serhiiyahdzhyiev.github.io";
```

If the site moves to a custom domain, update `site` (and remove or adjust
`base` if it changes from `/`).

---

## Key Architectural Decisions

**Why Astro?** Static output with zero JS by default, first-class content
collections, and native image optimisation (`astro:assets`) — a good fit for
a personal site that is mostly content with one interactive island (the audio
player).

**Why React only for the audio player?** All other interactive behaviour
(theme toggle, hamburger nav) is implemented with vanilla JS in `<script>`
tags inside `.astro` components. React adds bundle weight; keeping it
isolated to `AudioPlayer.tsx` minimises that cost.

**Why CSS custom properties instead of Tailwind utilities?** UnoCSS
(`preset-mini`) is present for occasional utility classes, but the primary
styling approach is scoped `<style>` blocks in each component backed by
design tokens as CSS variables. This gives the granular control needed for
the design without fighting a utility framework's reset.

**Why local fonts?** Removes any runtime dependency on external CDNs, ensures
the site works offline/in restricted networks, and removes a render-blocking
request. Trade-off: the font files are committed to the repo.

**Scoped styles caveat:** When writing CSS that reacts to the `html.dark`
class inside an Astro `<style>` block, use `:global(html.dark) .selector`
— not `:global(:not(.dark)) .selector`. The latter matches any ancestor
without the class (including `<body>`, `<div>`, etc.) and will fire in both
modes.

---

## License

MIT
