# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A broad, mixed audience rather than one primary group. Visitors arrive by looking Eugene up and may be:

- recruiters and hiring managers judging professional credibility;
- technical peers interested in his work and writing;
- potential collaborators or clients considering working with him;
- friends and casual visitors.

The shared job is to find out who Eugene is, see what he has built, and decide whether to reach out or read on. Success is a visitor leaving with an accurate sense of his work and a clear route to the CV, writing, or contact.

## Product Purpose

A personal home base for Eugene Agyeman, a software engineer in London. It exists to present his work and thinking in his own voice, and to give anyone who looks him up one authoritative place to land. Success is not a single conversion; it is accurate, engaging self-presentation across several possible reasons for visiting.

## Positioning

A first-person account of operating real-time systems at scale, told with the honesty of someone who actually carries the pager. The claim is not a product feature but a perspective: what it is actually like to own the rules domain behind a large real-time alerting platform, in Eugene's own voice.

## Operating Context

- Day job: full-stack engineer on real-time operations at Axon, owning the rules domain end-to-end (data model, APIs, real-time evaluation in Go, operator tooling, cloud operations).
- Writing is managed as Markdown/MDX content-collection entries in the repo.
- The CV exists twice: an HTML page rendered from the schema'd `cv` content collection (`src/data/cv.json`) and a PDF exported from LaTeX source kept in Overleaf, maintained separately and liable to drift.
- Deployment is a static Astro build served as Cloudflare Workers assets.

## Capabilities and Constraints

- Static Astro site, no hydrated components; the only client-side scripts are the theme toggle and the mobile menu.
- Dark mode is class-based, set by an inline script to avoid a flash of the wrong theme.
- Blog collection schema: `title`, `description`, `pubDate`, optional `updatedDate`; slug from filename.
- The "Thoughts" blog is intentionally empty for now and will carry mixed technical and personal writing.
- Deployed assets-only to Cloudflare Workers via GitHub Actions on push to `main`.
- CSP is enforced with SHA-256 hashes tied to the exact inline script text. The hashes are derived from the build output by `scripts/sync-csp.mjs`, which runs as part of `npm run build` and rewrites `public/_headers` and `dist/_headers` — scripts can be edited freely.
- `/cv` prints as a paper document; print styles are part of the page's contract.

## Brand Commitments

- Name used throughout: "Eugene Agyeman".
- Voice: warm, casual, and first-person, with dry humour and self-deprecation. This is deliberate and must be preserved, though it may be tightened and made more consistent. New copy should sound like the same person, not corporate boilerplate.

## Evidence on Hand

- Real professional history and metrics in `src/pages/cv.astro` (Axon, Digital Shadows, NatWest Markets; education at Southampton).
- A real hero photograph at `src/assets/hero.jpg` (Eugene at a viewpoint above a lake).
- The CV PDF at `public/eugene-agyeman-cv.pdf`.
- No blog posts exist yet, and there are no testimonials, press, or case studies — future work must not fabricate any.
- `public/favicon.svg` is a personal mark: a white "EA" monogram on an Electric Klein rounded square.
- `public/og-image.jpg` (1200×630, cropped from the hero photo) backs the Open Graph/Twitter meta emitted by `src/layouts/Layout.astro`; absolute URLs come from `site` in `astro.config.mjs`.

## Product Principles

1. Honest first-person voice over polished corporate tone — it should read like Eugene, not like a template.
2. Serve many reasons for visiting without a single forced funnel; every page must be self-sufficient.
3. Show real work and real numbers; never invent credentials, clients, or praise.
4. Keep the site fast and static; JavaScript is a last resort, and the only exceptions are the theme toggle and mobile menu.
5. Preserve the warmth while tightening the copy — the voice is the differentiator, but it should not drift into rambling.
