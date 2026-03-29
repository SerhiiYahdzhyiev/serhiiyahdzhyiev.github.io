# [SY] — Personal Website

Personal site for Serhii Yahdzhyiev. Built with Astro, deployed to GitHub Pages.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Make](https://www.gnu.org/software/make/)

## Development

Build the container image and start the dev server:

```sh
make dev
```

Builds `website-dev` on first run, then starts the Astro dev server at
`http://localhost:4321`. Source is mounted read-only; `node_modules` and the
Astro cache live in named volumes inside the container.

Other container targets:

```sh
make build-devcontainer   # build the image explicitly
make prune-devcontainer   # remove the image and named volumes
```

To run linting or formatting against the running container:

```sh
docker exec $(docker ps -qf ancestor=website-dev) npm run lint
docker exec $(docker ps -qf ancestor=website-dev) npm run format:check
```

Available scripts: `lint`, `lint:fix`, `format`, `format:check`.

### On-host fallback

> **Warning:** Running directly on the host is unsandboxed and not recommended.
> Only use this if Docker is unavailable.

Requires [Node.js](https://nodejs.org/) 24.12.0 via
[nvm](https://github.com/nvm-sh/nvm) and either `npm` or `yarn`.

```sh
nvm install && nvm use
npm ci                  # or: yarn
npm run dev             # or: yarn dev
```

## Content

### Blog posts

Add a `.md` file to `src/content/blog/`. The filename becomes the URL slug.

```md
---
title: "Post title"
description: "Short description"
publishedAt: 2025-01-15
tags: ["tag"]
draft: false
---
```

### Music tracks

Add an entry to the music content collection (`src/content/config.ts`), place
the audio file at `public/music/tracks/{filename}`, and optionally add cover
art at `public/music/covers/{cover}`.

### Videos

Add entries to `src/data/videos.ts`. Each entry needs a YouTube video ID,
title, description, and year.

### CV

Edit files in `src/data/cv/`: `experience.ts`, `education.ts`, `skills.ts`.
Replace `public/cv.pdf` to update the downloadable CV.

## Deployment

Deployed automatically to GitHub Pages on push to `main` via
`.github/workflows/deploy.yaml`. The workflow runs `npm ci && npm run build`
and publishes `dist/` to the `gh-pages` branch.
