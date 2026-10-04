# Personal Website

Source for [eugeneagyeman.io](https://eugeneagyeman.io) — a static Astro site
served as Cloudflare Workers assets. No framework components, no hydration; the
only client-side scripts are the theme toggle and the mobile menu.

## Commands

Requires Node 22.12+.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static build to ./dist/ (also derives the CSP hashes)
npm run preview   # serve the build locally
npm run shots     # screenshot every route, both themes, desktop + mobile
```

`npm run shots` needs `npm run dev` running and `npx playwright install chromium`
once. Playwright is a devDependency, so CI never installs it.

## Layout

```text
src/
├── assets/        Images (the hero photo, processed by Astro)
├── components/    Header, theme toggle
├── content/       Blog collection (markdown)
├── data/          cv.json — the CV's structured data
├── layouts/       Layout, BlogPost
├── lib/           site.ts (identity facts), theme.mjs (theme contract)
├── pages/         One file per route
└── styles/        Tokens and global CSS
```

Routes: `/`, `/about`, `/cv`, `/contact`, `/blog`.

## Things that bite

**Identity facts live in `src/lib/site.ts`.** Name and social links are declared
once; change them there, not in a page. Two addresses exist on purpose: `hi@` for
the contact page and `eugene@` for the CV and its PDF.

**CSP hashes are derived, not hand-written.** `scripts/sync-csp.mjs` runs inside
`npm run build` and rewrites the `script-src` directive in `public/_headers` from
the built inline scripts. Edit scripts freely; just commit the regenerated
`_headers`. A stale hash shows up as `Refused to execute inline script`.

**The CV exists twice.** HTML is rendered from `src/data/cv.json` behind the
schema in `src/content.config.ts`; the PDF is exported from LaTeX in Overleaf and
committed as an artefact. They can drift — update both.

**Adding a blog post**: drop a `.md` or `.mdx` file in `src/content/blog/` with
`title`, `description`, and `pubDate` frontmatter. The slug is the filename.

## Deploying

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and
deploys. The job targets the **`production` environment**, so each run waits for
your approval before the Cloudflare secrets are injected:

- `CLOUDFLARE_API_TOKEN` — Workers Scripts: Edit on this account
- `CLOUDFLARE_ACCOUNT_ID`

Both live on the environment (Settings → Environments → production), not at repo
level. Approve the run from the Actions page or with:

```sh
gh api -X POST repos/eugeneagyeman/personal_website/actions/runs/<id>/pending_deployments \
  -f "environment_ids[]=$(gh api repos/eugeneagyeman/personal_website/environments/production --jq .id)" \
  -f state=approved
```

To deploy by hand instead: `npx wrangler login && npm run deploy`.

`wrangler.jsonc` is assets-only — no `main`, no worker script, so nothing
invokes Worker code at request time. `public/_headers` sets the security headers
and the immutable cache for `/_astro/`; note that a header declared in two
matching rules gets its values comma-joined, so each belongs in exactly one.