# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Landing page with hero section, section navigation cards, recent blog posts, and social links
- Blog section: index page and individual post layout with read time estimation
- Music page with interactive React-based audio player (playlist, seek, volume control)
- Videos page with responsive YouTube embed grid
- Bio / CV page with full experience, education, and skills sections
- CV PDF download button on landing page and bio page (`/cv.pdf`)
- Content collections for blog posts and music tracks (Astro Content Collections)
- Sample blog post ("Hello, World")
- Dark/light mode with system preference detection and manual toggle (persisted to `localStorage`)
- `ThemeToggle` component in the header
- Warm minimal color palette (off-white light / near-black dark) with CSS custom property tokens
- Fraunces display font for headings (via `@fontsource/fraunces`)
- Sticky header with wordmark, navigation, and theme toggle
- Footer with social icon links (GitHub, YouTube, SoundCloud, email)
- React integration (`@astrojs/react`) for interactive components
- `Page.astro` and `BlogPost.astro` reusable layouts
- Updated `base.astro` with Open Graph meta tags and dark mode bootstrap script
- `src/data/main.ts` with site owner info and social links
- `src/data/videos.ts` for managing video entries
- Sitemap integration (`@astrojs/sitemap`)
- `robots.txt`

- ESLint (flat config) with `typescript-eslint`, `eslint-plugin-astro`,
  `eslint-plugin-react`, and `eslint-plugin-react-hooks`
- Prettier with `prettier-plugin-astro`; line length capped at 79 characters
- `lint`, `lint:fix`, `format`, and `format:check` scripts in `package.json`

### Changed

- Replaced previous colorful blue palette with refined warm minimal tokens
- Updated `Header.astro` to use sticky layout with wordmark + nav + theme toggle
- Updated `Footer.astro` with inline SVG social icons (removed Font Awesome dependency)
- Updated `Navigation.astro` with all v0.1.0 routes and active-link highlighting
- Cleaned up `layout.scss` (removed legacy header/footer rules now handled in components)
- Updated `base.scss` to flex-column body layout and proper dark mode color-scheme
- `h1`/`h2` now use the Fraunces display font via typography tokens
- Deploy workflow updated to use `npm ci` for reproducible CI installs
