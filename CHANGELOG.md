# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Music page: 33 tracks across 7 albums (Sessions, DB, DB2, Hop Stop I/II/III,
  Clubs) with per-album cover art extracted from MP3 ID3 tags
- `album` field added to music content collection schema and all track entries
- Album-grouped track list in `AudioPlayer`: each album renders as a section
  with cover thumbnail, name, year, and genre tags in the header
- Album cover display in the now-playing bar
- Download button on each track row
- `make preview` target for production build and local preview (Lighthouse, etc.)
- `make help` as default `make` target

- Initial videos content populated on the Videos page
- `Dockerfile` and `Makefile` for containerised local development (`make dev`,
  `make build-devcontainer`, `make prune-devcontainer`)

- `Portrait.astro` component using `astro:assets` `<Picture>` for build-time
  image optimisation (AVIF + WebP variants at 1× and 2× widths)
- `Hero.astro` and `RecentPosts.astro` extracted as focused compound components
  under `src/components/landing/`
- `SocialLinks.astro` shared component for social icon links
- Responsive hamburger navigation: collapses to a flat icon button on mobile
  (≤ 768 px), opens as a positioned dropdown anchored to the left edge;
  closes on link click

- Landing page with hero section, section navigation cards, recent blog posts,
  and social links
- Blog section: index page and individual post layout with read-time estimation
- Music page with interactive React-based audio player (playlist, seek, volume)
- Videos page with responsive YouTube embed grid (lazy-loaded iframes)
- Bio / CV page with full experience, education, and skills sections
- CV PDF available at `/cv.pdf`; download link on bio page
- Astro Content Collections for blog posts (`type: content`) and music tracks
  (`type: data`)
- Sample blog post ("Hello, World")
- Dark / light mode: system-preference default, manual toggle persisted to
  `localStorage`, flash-of-wrong-theme prevented by inline bootstrap script
  in `<head>`
- `ThemeToggle` component in the header
- Warm minimal colour palette — off-white light / near-black dark — defined
  entirely as CSS custom property tokens in `src/styles/tokens/color.css`
- Fraunces display font for headings (via `@fontsource/fraunces`); Archivo
  (sans) and Inconsolata (mono) loaded from local `public/fonts/`
- Sticky header with wordmark, navigation, and theme toggle
- Footer with inline SVG social icons (GitHub, YouTube, SoundCloud, email)
- React integration (`@astrojs/react`) for interactive components
- `Page.astro` and `BlogPost.astro` reusable layouts
- `base.astro` with Open Graph / Twitter meta tags and dark-mode bootstrap
  script
- `src/data/main.ts` — site owner info and social links (single source of
  truth used by header, footer, hero, and CV page)
- `src/data/videos.ts` — video entries config
- `src/data/cv/` — structured CV data (experience, education, skills)
- Sitemap integration (`@astrojs/sitemap`)
- `robots.txt`
- ESLint (flat config) with `typescript-eslint`, `eslint-plugin-astro`,
  `eslint-plugin-react`, `eslint-plugin-react-hooks`
- Prettier with `prettier-plugin-astro`; line length 79 characters
- `lint`, `lint:fix`, `format`, `format:check` scripts in `package.json`

### Changed

- `AudioPlayer` track list width expanded to full parent container width
- `AudioPlayer` track rows simplified: year and tags moved to album header
- Videos page content updated
- CV page data, layout, and appearance updated
- Blog page temporarily disabled
- Performance and SEO improvements (asset optimisation, meta refinements)
- Accessibility improvements on CV page
- Accent color applied to hover effects across the UI
- Color refinements across the UI

- Replaced previous blue palette with refined warm minimal tokens
- `Footer.astro` rebuilt with inline SVG icons (removed Font Awesome
  dependency)
- `Navigation.astro` updated with all v0.1.0 routes and active-link
  highlighting
- `base.scss` updated to flex-column body layout with dark-mode `color-scheme`
- `h1` / `h2` use Fraunces display font via typography tokens
- Deploy workflow (`deploy.yaml`) updated to use `npm ci` for reproducible CI
  installs

- Landing page decomposed — `index.astro` is now a thin composition file;
  all markup and styles live in dedicated components
- Removed redundant section cards from landing (Music / Videos / Blog
  already
  in header navigation)
- Removed social-link row from landing page body; social icons consolidated
  into the footer only
- Hero CTA buttons changed from "Download CV" to navigational links:
  **Bio & CV** (`/cv/`), **Music** (`/music/`), **Blog** (`/blog/`)
- Hero `[SY]` heading now uses `--ff-mono` (Inconsolata) bold, matching the
  header wordmark
- Portrait frame changed from circle to rounded rectangle (`--rd-lg`) with a
  subtle box shadow instead of a border
- Header wordmark `[SY]` hidden on the home page via `visibility: hidden`
  (space is preserved so navigation stays centred)
- Portrait hidden on mobile to keep the landing minimal
- Burger button placed on the left side of the header on mobile; flat style
  (no border, no background)
- Navigation order updated: Home · Bio · Blog · Music · Videos
- Footer LinkedIn icon added (was missing from original set)

### Fixed

- Progress bars appearance
- Tabs navigation appearance on CV page

- Theme toggle icon swap corrected: moon shown in **light** mode
  (hint: switch to dark), sun shown in **dark** mode
  (hint: switch to light)
- Theme toggle icon invisible in dark mode — root cause:
  `:global(:not(.dark))` matched every ancestor without the class
  (e.g. `<body>`), hiding both icons simultaneously;
  fixed to `html:not(.dark)` / `html.dark`
- Landing page exceeding viewport height after removing recent posts
  section; fixed by replacing `min-height: 100svh` on `.landing` with
  `flex: 1`
