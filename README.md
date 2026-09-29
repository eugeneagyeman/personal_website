# personal_website

Source for my personal site, a small static site built with [Astro](https://astro.build).

Astro ships zero JavaScript by default. The only client-side script on the entire site is the theme toggle.

## Stack

- **Astro 7**: static output, file-based routing, content collections
- **Tailwind CSS 4**: wired in through `@tailwindcss/vite` rather than the old `@astrojs/tailwind` integration
- **TypeScript** on `astro/tsconfigs/strict`
- **@astrojs/mdx** and **@tailwindcss/typography**

No framework components. No React, Vue or Svelte.

## Getting started

Requires **Node 22.12+** and **npm 9.6.5+**.

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:4321` and hot-reloads on save.

| Command            | Action                                            |
| :----------------- | :------------------------------------------------ |
| `npm run dev`      | Start the local dev server                        |
| `npm run build`    | Build the production site to `./dist/`            |
| `npm run preview`  | Serve the production build locally                |

## Structure

```text
src/
├── assets/       Images imported through Astro's image pipeline
├── components/   Header and theme toggle
├── content/      Markdown content collections
├── layouts/      Page shells (Layout, BlogPost)
├── lib/          Small shared helpers
├── pages/        Routes, one file per page
└── styles/       Global CSS and design tokens
```

Routes: `/`, `/about`, `/cv`, `/contact`, `/blog`.

### Adding a blog post

Create a `.md` or `.mdx` file in `src/content/blog/`. The frontmatter is validated by the schema in `src/content.config.ts`:

```md
---
title: 'My Post'
description: 'One line used for listings and meta tags.'
pubDate: '2026-01-01'
---
```

The URL comes from the filename, so `my-post.md` is served at `/blog/my-post/`.

The blog index is currently a placeholder while the section is being written.

## Theming

Design tokens live in the `@theme` block in `src/styles/global.css`. Dark mode is class-based rather than following the OS preference, set by an inline script in `Layout.astro` to avoid a flash of the wrong theme.

## Deploying

The build output in `dist/` is a folder of static files with no server-side component, so it can be served from anywhere. The site is intended to be hosted on Cloudflare Workers. There is no CI pipeline yet.

### Cloudflare Workers

The free plan is enough. A card is not required, and a Worker script is optional: with static assets only, Cloudflare serves matching files without invoking any Worker code, so the CPU and subrequest limits never come into play. Only the request count and asset limits apply.

| Requirement        | Free plan limit | This site    |
| :----------------- | :-------------- | :----------- |
| Requests per day   | 100,000         | far below    |
| Asset files        | 20,000          | 11           |
| Largest asset file | 25 MiB          | 384 KB       |
| Total build output | 512 MB cached   | 676 KB       |

Requirements to deploy:

- A Cloudflare account, free tier is sufficient
- Node 22.12+ (already required by Astro)
- `wrangler` as a dev dependency

Add a `wrangler.jsonc` at the project root. Omit `main` because there is no Worker script:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "personal-website",
  "compatibility_date": "2026-09-29",
  "assets": {
    "directory": "./dist"
  }
}
```

Then build and deploy:

```sh
npm install --save-dev wrangler
npm run build
npx wrangler deploy
```

A custom domain is attached under **Workers & Pages** in the dashboard.

Two gaps to be aware of:

- There is no `404.html`, so unmatched routes return Cloudflare's default 404 rather than a styled page. Add `src/pages/404.astro` and set `assets.not_found_handling` to `"404-page"` to fix it.
- `_headers` and `_redirects` are not used, so there are currently no cache-control or security headers. Those files go in `public/` and are picked up automatically.

