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
- `wrangler`, already in `devDependencies`

`wrangler.jsonc` is checked in. There is deliberately no `main` key and no worker script: the site is assets-only, and Cloudflare serves matching files straight from the CDN without invoking any Worker code. Omitting `main` is supported for assets-only Workers, so the CPU and subrequest limits never come into play. `workers_dev` is `false` because the site is served from a custom domain rather than a `workers.dev` URL.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "personal-website",
  "compatibility_date": "2026-09-29",
  "workers_dev": false,
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  },
  "observability": {
    "logs": {
      "enabled": true,
      "head_sampling_rate": 1,
      "invocation_logs": true,
      "persist": true
    },
    "traces": {
      "enabled": false,
      "head_sampling_rate": 1,
      "persist": true
    }
  }
}
```

Invocation logs are persisted on the Workers Free plan, which is enough for a site this size. If the volume ever becomes worth reducing, lower `head_sampling_rate`.

Wrangler also accepts `wrangler.toml`. Cloudflare recommends the JSON form for new projects because some newer features are JSON-only, and the `observability` block above is the reason to prefer it here.

### Deploying

Pushing to `main` deploys automatically through GitHub Actions. To deploy by hand:

```sh
npx wrangler login
npm run deploy
```

Authentication is per machine. `npx wrangler login` opens a browser and stores credentials, or set `CLOUDFLARE_API_TOKEN` in the environment.

To check the configuration without uploading anything, and without being logged in:

```sh
npx wrangler deploy --dry-run
```

### CI

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. It needs two repository secrets:

| Secret                  | Value                                              |
| :---------------------- | :------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | A Cloudflare API token with Workers Scripts:Edit   |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID                          |

`CLOUDFLARE_ACCOUNT_ID` is already set. The API token has to be created in the Cloudflare dashboard under **My Profile**, API Tokens, using the **Edit Cloudflare Workers** template, then added with:

```sh
gh secret set CLOUDFLARE_API_TOKEN
```

The workflow uses `npm install` rather than `npm ci`. The lock file is generated on macOS and so does not contain the linux-x64 variants of the optional native dependencies Tailwind pulls in, which makes `npm ci` fail on a Linux runner with `Missing: @emnapi/core from lock file`. npm has no supported way to write a lock file covering every platform.

### Headers and redirects

`public/_headers` is deployed automatically and sets security headers on every response, plus a one-year immutable `Cache-Control` on `/_astro/` where Astro's fingerprinted assets live.

Two things to know before editing it:

- A request matching several rules inherits headers from all of them, and **a header declared twice has its values joined with a comma**. Each header belongs in exactly one rule.
- The `Content-Security-Policy` allows the two inline scripts by SHA-256 hash rather than using `unsafe-inline`. Those hashes are tied to the exact script text, so if you change the theme script in `Layout.astro` or the toggle in `ThemeToggle.astro`, regenerate them or the site will fail to boot with a CSP violation. A failing check in the browser console looks like `Refused to execute inline script`.

There is no `_redirects` file because nothing needs redirecting. Cloudflare handles the HTTP to HTTPS upgrade itself, and the site has no moved or renamed URLs.

To serve the styled 404 page, `assets.not_found_handling` is set to `"404-page"`, which serves `dist/404.html`.

