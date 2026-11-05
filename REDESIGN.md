# Redesign: plain-text document conversion

Status: **implemented on branch `redesign-document`** (2026-11-05). `DESIGN.md` is now the
source of truth for the system; this file is kept as the plan of record.

Deviations from the plan as written:

- Arrows are ASCII `->`, not `→` / `↗`: Geist Mono has no glyph for them in any subset.
- A third font subset (`geist-mono-symbols.woff2`) was added for the `█` caret and box drawing.
- The home `~*~` kicker above the headline was dropped (kicker above a heading is a banned
  pattern); `~*~` remains as a divider only.
- Code blocks use dual Shiki themes (`github-light` / `github-dark`) wired in `astro.config.mjs`.
- Post-review: the hero caption chip, the home quick-facts table, and the header year were removed; the home h1 is 22px and its lead 16px; the brand block is 16px/13px.
- The favicon is a pixel-grid `EA` on `#070708`; the OG image was rendered once from the new system.

Reference: <https://code.storage> (measured live, 2026-11-05). This is a visual-world
replacement, not a retheme. Content, voice, routes, data, and deploy behaviour stay.

## 1. Brief

### Job and audience

A mixed audience (recruiters, peers, collaborators, friends) arrives to find out who
Eugene is, judge credibility, and choose a route: CV, writing, or contact. The site is
read in a browser, often on a phone, sometimes skimmed in under a minute.

### What changes

- Every page shell, heading, body, card, image frame, and control.
- The light theme: Electric Klein flood → white paper. The dark theme: true black →
  `#070707` with light-gray mono.
- The typeface: Schibsted Grotesk → Geist Mono, self-hosted.
- The CV: white shadowed paper card → the same plain-text document on screen, with a
  preserved three-column print contract.
- Header: fixed translucent bar + mobile disclosure → static three-line brand block and
  wrapping bracket navigation. The mobile-menu script is deleted.
- Favicon and OG image, which currently carry Electric Klein.

### What stays

- All copy and first-person voice; no new claims, metrics, or testimonials.
- Routes: `/`, `/about`, `/cv`, `/contact`, `/blog`, `/blog/[id]`, 404.
- `src/data/cv.json` as the single CV source; `src/lib/site.ts` identity facts.
- Static Astro, no hydration; theme initialisation + toggle remain the only client-side
  scripts (the mobile-menu script is deleted).
- Cloudflare deploy, CSP-hash generation, `_headers`, print contract.

### Direction: **The Checked-Out Document**

A personal site rendered as a plain-text document: one measured column of mono type, a
second column for a captioned artefact, ASCII tables for facts, dashed rules for panels,
and no decoration a reader could not have typed. The terminal is the grammar, not a
costume: no fake prompt, no scanlines, no blinking cursor.

### Direction contract

- **THESIS.** A checked-out document, not a marketing page. Precision, dates, and links
  are the visual material; the category-default hero-with-big-type is refused.
- **OWN-WORLD.** White `#ffffff` or near-black `#070707` ground; near-black or light-gray
  mono text; blue links with half-opacity underlines; 520px document column; 12px ASCII
  tables; dashed 12px panels; inverted caption chips; Klein-blue selection. No shadows,
  gradients, or chromatic surfaces.
- **STORY.** The visitor reads who Eugene is, trusts the numbers, and follows a bracketed
  route to the CV, writing, or email.
- **FIRST VIEWPORT.** Static header (three-line brand left, bracket nav right). 40px
  gutter, 80px gap. Left 520px: `~*~` kicker, `#` headline, two paragraphs, ASCII
  quick-facts table, three `*` links. Right: hero photo in a dashed frame with a caption
  chip. Below `lg`, the figure follows the intro paragraphs.
- **FORM.** Spec sheet / plain-text document. Uniform 13px type, weight and muted
  prefixes for hierarchy, generous vertical spacing instead of size jumps.
- **RISK.** Uniform type can read as undifferentiated. Counter with 700-weight headings,
  muted `#`/`##` prefixes, 24px section rhythm, and a strictly single-column reading
  measure. 13px is below the browser default; 12px is reserved for labels and ASCII.

## 2. Reference readout (measured)

| Property   | code.storage                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| Body       | Berkeley Mono 12px / 24px; prose column 500px; shell 1200px; 40px gutters                                             |
| Headings   | Same 12px, 700, uppercase; muted `# ` / `## ` pseudo-prefixes                                                         |
| Light      | `#ffffff` ground, `#070708` text                                                                                      |
| Dark       | `#070707` ground, `#e8e8ea` text                                                                                      |
| Links      | `#297cd7` light / `#69b1ff` dark; weight 500; underline at 50% opacity                                                |
| Muted      | `#8e8e95` (3.25:1 on white — decoration only)                                                                         |
| Structure  | Static header; left content column + right art column; 80px top gap                                                   |
| Signatures | ASCII `<pre>` tables; dashed 12px panels; 10px caption chips; bracket nav; `~*~` and `–––` rules; `#0000f2` selection (changed from code.storage's yellow) |
| Depth      | Flat; hairlines and dashed borders only                                                                               |

Our adaptation raises body to 13px/22px and the reading measure to 520px, per the
confirmed "readable adaptation" choice. Everything else follows the readout.

## 3. Target design system

### Tokens

| Token                               | Light                  | Dark                     |
| ----------------------------------- | ---------------------- | ------------------------ |
| `--bg`                              | `#ffffff`              | `#070707`                |
| `--fg`                              | `#070708`              | `#e8e8ea`                |
| `--muted`                           | `#5f5f66`              | `#9a9aa2`                |
| `--line`                            | `rgba(7,7,8,0.16)`     | `rgba(232,232,234,0.16)` |
| `--link`                            | `#1f6fbf`              | `#69b1ff`                |
| `--link-underline`                  | `rgba(31,111,191,0.5)` | `rgba(105,177,255,0.5)`  |
| `--chip-bg` / `--chip-fg`           | `#070708` / `#ffffff`  | `#e8e8ea` / `#070707`    |
| `--selection-bg` / `--selection-fg` | `#0000f2` / `#ffffff`  | same                     |

Link colors are darker/lighter than code.storage to clear 4.5:1 at 13px:
`#1f6fbf` = 5.14:1 on white; `#69b1ff` = 8.95:1 on `#070707`.

Implementation: semantic CSS variables in `:root` / `.dark`, exposed through
Tailwind v4 `@theme inline` (`--color-bg`, `--color-fg`, `--color-muted`, `--color-line`,
`--color-link`, `--color-chip`). No `dark:` color utilities remain; tokens flip.

### Typography

Font: **Geist Mono** variable (SIL OFL 1.1), self-hosted as latin + latin-ext woff2,
weights 100–900. Fallback: `ui-monospace, SFMono-Regular, Menlo, monospace`.
Schibsted Grotesk is deleted.

| Role         | Size / line | Weight  | Treatment                             |
| ------------ | ----------- | ------- | ------------------------------------- |
| Body         | 13px / 22px | 400     | 520px measure (~66ch)                 |
| Heading 1    | 13px / 22px | 700     | uppercase, muted `# ` prefix          |
| Heading 2    | 13px / 22px | 700     | uppercase, muted `## ` prefix         |
| Heading 3    | 13px / 22px | 700     | uppercase, no prefix                  |
| Nav / label  | 12px / 18px | 400–500 | bracket links, uppercase labels       |
| Caption chip | 11px / 24px | 700     | uppercase, padded 0 10px, no radius   |
| ASCII block  | 12px / 18px | 400     | `white-space: pre`, horizontal scroll |
| Prose (blog) | 13px / 22px | 400     | same column; headings inherit size    |

Hierarchy comes from weight, case, muted prefixes, and space — never a size jump.
Headings use CSS `::before` for the `#` / `##` markers (decorative, not copy).

### Layout

- Shell: `max-width: 1200px`, gutters 20px → 40px at `lg`.
- Document column: `max-width: 520px`, left-aligned. No centred prose.
- Page top: 40px padding; 80px between header and first content; 40px between sections;
  24px between prose blocks.
- Home at `lg`: `grid-template-columns: minmax(0, 520px) minmax(0, 1fr)`, 80px gap.
  Below `lg`: one column; figure follows the intro.
- Breakpoints: `md` 768px, `lg` 1024px. No fixed header offset, no `100vh` centring.

### Components

- **Header.** Static (not fixed). Left: `EUGENE AGYEMAN █` / `SOFTWARE ENGINEER` /
  `2026`, 12px, first line 700, others muted. Right: `[ HOME / ABOUT / THOUGHTS / CV /
CONTACT ]` plus `[ DARK ]` / `[ LIGHT ]`. Active item 700 + half-opacity underline.
  Wraps at narrow widths; no disclosure JS.
- **Footer.** `–––` rule text, then a pipe-separated sitemap row
  (`HOME | ABOUT | THOUGHTS | CV | CONTACT`), a social row (`EMAIL | GITHUB | LINKEDIN`),
  and `© 2026 EUGENE AGYEMAN · BUILT WITH LOVE FROM LONDON`. 11–12px, muted.
- **Links.** `--link`, weight 500, underline 50% opacity; hover raises underline to 100%.
  External links append `↗`, internal `→` where a direction is useful.
- **Panel.** 1px dashed `--line`, 12px radius, 20–24px padding, no fill. Hover: solid
  border; no lift, no shadow.
- **Caption chip.** 11px, 700, uppercase, `--chip-bg` / `--chip-fg`, 24px line box,
  0 10px padding, 0 radius. Used under the hero figure and as contact labels.
- **ASCII table.** `<pre>` inside a focusable `.ascii-wrap` (`role="region"`,
  `aria-label`, `tabindex="0"`) with `overflow-x: auto`. No syntax colour; bold only
  where a table needs emphasis.
- **Button.** One filled control only: `[ DOWNLOAD PDF ]` on `/cv`. `--fg` background,
  `--bg` text, 8px radius, 12px/700 uppercase, 10px 16px padding. Everything else is a
  bracket link.
- **Focus.** 2px solid `--link`, 2px offset. Skip link becomes an inverted chip.
- **Selection.** `#ffffff` on Klein `#0000f2` in both themes.
- **Motion.** Colour/border transitions at 120ms; honour reduced motion. No entrance
  animation, no parallax, no blinking caret.

## 4. Page conversions

### Global chrome

- `Layout.astro`: replace the body classes with `bg-bg text-fg`; drop
  `min-h-screen flex flex-col`, `pt-20`, print colour overrides handled in `global.css`;
  add light/dark `theme-color` metas.
- Header becomes static; remove the backdrop blur, fixed positioning, and mobile menu
  markup/script.
- `theme.mjs`: keep the storage key and toggle id; remove `menuToggle` and `mobileMenu`.
- `<noscript>`: hide only the theme toggle.
- Footer: replace the centred `&copy; … Built with ❤️` block with the mono footer above.

### Home (`/`)

Left column:

1. `~*~ SOFTWARE ENGINEER, LONDON ~*~` (muted).
2. `# HEY, I'M EUGENE. I LOVE TECH. A LOT.` — existing copy, rendered uppercase.
3. Existing two-sentence intro.
4. ASCII quick-facts table:

   ```text
   +----------+--------------------------------+
   | BASED    | London, United Kingdom         |
   | ROLE     | Real-time operations @ Axon    |
   | FOCUS    | Rules engine, Go, p99 latency  |
   | STATUS   | Inbox open                     |
   +----------+--------------------------------+
   ```

   All four facts are supported by PRODUCT.md / `cv.json` / the contact page.

5. `~*~` rule.
6. `Elsewhere:` then `* More about me →`, `* Read the CV →`, `* Get in touch →`.

Right column: hero photo (`src/assets/hero.jpg`) in a dashed 0-radius frame, 3:4,
caption chip `EUGENE — VIEWPOINT ABOVE A LAKE`. At `<lg`, the figure sits after the
intro paragraphs and before the table. No shadow, no ring, no rounded corners.

Delete the `main:has(#hero)` flex-centring style.

### About (`/about`)

Single 520px column, no section borders. `# HEY!`; sections become
`## A TYPICAL DAY`, `## OUTSIDE OF THAT`, `## THE DETAIL`. Existing prose unchanged.
The filled `View CV` button becomes `[ VIEW CV ]` bracket link.

### Contact (`/contact`)

`# MY INBOX IS OPEN.`, existing intro. Replace the icon cards with two dashed panels
(one column at `<sm`, two at `sm`): inverted caption chip (`EMAIL`, `LINKEDIN`, `GITHUB`,
`CV`), 13px link value, muted note, trailing `↗`/`→`. Delete the inline SVG icon map.
Hover: dashed → solid, value underline. No circular badges, no translucent fills.

### CV (`/cv`)

Screen:

- Header line: `CURRICULUM VITAE` + `[ DOWNLOAD PDF ]` filled control.
- `# EUGENE AGYEMAN`; role line derived from `cv.json` `experience[0].role` (fixes the
  hard-coded "Senior Software Engineer" drift); location; email and LinkedIn links.
- `## EXPERIENCE`, `## PROJECTS`, `## TECHNICAL SKILLS`, `## EDUCATION`.
- Entries: role/company line with dates right-aligned, tabular numerals; bullets use a
  `- ` prefix, no discs, no timeline dot.
- Skills: label + comma-separated list. Chips deleted.
- Remove the white paper card, `shadow-xl`, cyan accents, and the cyan selection.

Print:

- `@page { size: A4; margin: 12mm; }`; 9.5pt/13pt; white ground, black text.
- Keep the 3-column print grid; hide header, footer, skip link, toggle, and download.
- Dashed borders become solid `#ccc`; links black, no underline.
- `break-inside: avoid` on entries and sections.
- Verification: render `/cv` to A4 PDF, confirm a maximum of two pages, no clipped
  bullets, and readable dates.

### Blog

- Index (`/blog`): `# THOUGHTS`, `~*~`, an `aria-hidden` ASCII "under construction" box,
  and the existing paragraph. Replace the roadwork SVG.
- Post (`BlogPost.astro`): `# {title}`; meta line `{date} · THOUGHTS` in 12px muted;
  description as a muted lede; dashed rule; `.doc-prose`. Remove `prose`/`prose-invert`
  utilities and the typography plugin.
- `.doc-prose` styles: paragraphs, h2/h3, lists, blockquote, `code`, `pre`, `table`,
  `hr`, `a` — all on the token set, no size jumps, blue links.

### 404

Muted `~*~ 404 ~*~` line; `# THAT PAGE ISN'T HERE`; existing paragraph; bracket links
`[ BACK HOME ]` and `[ REPORT A BROKEN LINK ]`. No 8xl numeral, no pill button.

## 5. File-by-file change map

| File                               | Change                                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/global.css`            | Rewrite: Geist Mono faces, light/dark tokens, base type, `.doc`, `.panel`, `.chip`, `.ascii-wrap`, `.doc-prose`, focus, selection, print. Remove `@plugin` typography and `@variant dark` if unused. |
| `src/layouts/Layout.astro`         | Static shell, semantic colours, footer, theme-color metas, simplified `<noscript>`.                                                                                                                  |
| `src/components/Header.astro`      | Rewrite static brand/nav; delete mobile-menu markup and script.                                                                                                                                      |
| `src/components/ThemeToggle.astro` | Text `[ DARK ]` / `[ LIGHT ]`; keep inline script and id.                                                                                                                                            |
| `src/lib/theme.mjs`                | Remove menu ids; keep storage key, toggle id, resolve logic.                                                                                                                                         |
| `src/pages/index.astro`            | Hero grid, ASCII table, dashed figure + caption, bracket links.                                                                                                                                      |
| `src/pages/about.astro`            | 520px document column, `##` sections, bracket CTA.                                                                                                                                                   |
| `src/pages/contact.astro`          | Dashed channel panels; delete icon map.                                                                                                                                                              |
| `src/pages/cv.astro`               | Mono document, derived role, print rewrite.                                                                                                                                                          |
| `src/pages/blog/index.astro`       | ASCII empty state.                                                                                                                                                                                   |
| `src/layouts/BlogPost.astro`       | Document header + `.doc-prose`.                                                                                                                                                                      |
| `src/pages/404.astro`              | Mono 404.                                                                                                                                                                                            |
| `public/fonts/`                    | Add `geist-mono-latin.woff2`, `geist-mono-latin-ext.woff2`; delete Schibsted files.                                                                                                                  |
| `public/favicon.svg`               | Pixel-grid `EA` monogram on `#070708`. Bump `?v=3` in Layout.                                                                                                                                        |
| `public/og-image.jpg`              | Regenerate 1200×630: near-black ground, mono name/role, hero photo in a dashed frame. One-off Playwright render committed as an asset.                                                               |
| `package.json`                     | Remove `@tailwindcss/typography`.                                                                                                                                                                    |
| `README.md`                        | Update script/font/design notes; remove "mobile menu".                                                                                                                                               |
| `PRODUCT.md`                       | Update stale facts: one client script, mono system, new favicon/OG, CV presentation. Product truth and voice unchanged.                                                                              |
| `DESIGN.md`                        | Replace the visual world and tokens; keep the document structure.                                                                                                                                    |
| `.impeccable/design.json`          | Regenerate after the build (sidecar currently stale).                                                                                                                                                |
| `screenshots/`                     | Regenerate all routes, both themes, desktop + mobile.                                                                                                                                                |

Not changed: `astro.config.mjs`, `wrangler.jsonc`, `.github/workflows/*`,
`src/data/cv.json`, `src/content.config.ts`, `src/lib/site.ts`, `scripts/sync-csp.mjs`.

## 6. Phases

1. **Baseline.** Branch; capture current desktop/mobile light/dark screenshots and the
   current `/cv` print PDF; run `npm run build` to confirm a clean start.
2. **Foundations.** Add Geist Mono; rewrite `global.css` tokens/base/utilities; delete
   Schibsted; expose semantic colours through `@theme inline`.
3. **Chrome.** Rewrite Header, ThemeToggle, theme lib, Layout, footer; delete the mobile
   menu script; run the build and confirm CSP hashes regenerate.
4. **Read pages.** Home, About, Thoughts, 404.
5. **Contact and CV.** Panels; CV screen + print contract + derived role.
6. **Blog.** Empty state and `.doc-prose`; remove the typography plugin.
7. **Assets.** Favicon, OG image, `theme-color`; verify `_headers` and font paths.
8. **Documentation.** Rewrite DESIGN.md; update PRODUCT.md/README; regenerate
   `.impeccable/design.json` and screenshots.
9. **Verification.** Full build + browser pass + print pass (section 7). Stop after at
   most two fix rounds; no open-ended polishing.

## 7. Verification

Build and static checks:

- `npm run build` exits 0; `dist/_headers` contains the newly derived inline-script
  hashes and `font-src 'self'`.
- No remaining references to `electric`, `schibsted`, `bg-electric`, `text-4xl`,
  `rounded-2xl`, `shadow-xl`, `prose-invert`, `mobile-menu`, or the typography plugin.
- Font files resolve from `/fonts/`; no external font requests.

Browser pass, light + dark, at 390 / 768 / 1280 / 1440:

- Home: header and nav do not overflow at 390; ASCII table scrolls inside its wrapper
  without scrolling the page; figure and caption stack correctly below `lg`.
- Every route: headings render `#` / `##` prefixes; links are blue with 50% underline;
  panels are dashed and go solid on hover; no shadows or rounded cards remain.
- Theme toggle flips tokens, persists in `localStorage`, and produces no flash on reload.
- Keyboard: skip link, nav, links, ASCII scroll regions, and toggle all show a visible
  focus ring; tab order follows reading order.
- Console: no CSP refusals, no 404s, no hydration warnings.
- No horizontal page overflow at 390 (ASCII wrappers excepted).
- Contrast spot-check: link `#1f6fbf` on white, `#69b1ff` on `#070707`, body text, and
  muted labels meet 4.5:1 for text; caption chips meet 4.5:1.

Print pass:

- `/cv` → A4 PDF: two pages maximum, three-column layout intact, no clipped entries,
  no chrome, links readable in black.
- Confirm the `Download PDF` control is hidden in print.

Screenshot pass:

- Regenerate all route/theme/viewport screenshots with `npm run shots`; inspect one
  desktop and one mobile capture per theme.

## 8. Risks

| Risk                                                        | Mitigation                                                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Uniform 13px type is hard to scan for recruiters            | 13px/22px body (not 12/24), 700 headings, muted prefixes, 24px block rhythm; test at 390 and 1440 before finishing       |
| Mono throughout reads as a terminal costume                 | Ban fake prompts, scanlines, blinking cursors, and neon; keep the document metaphor, not an emulator                     |
| Removing the white CV paper weakens the print contract      | Explicit `@page`/print tokens and a rendered A4 PDF check; print stays 3-column and mono                                 |
| ASCII tables overflow on mobile                             | Focusable, horizontally scrollable `.ascii-wrap`; never page-level overflow                                              |
| CSP breaks after deleting the menu script                   | `sync-csp.mjs` derives hashes at build; verify `dist/_headers` and the browser console                                   |
| Font licensing or weight gaps                               | Geist Mono is OFL 1.1 and variable; self-host latin/latin-ext; no external requests                                      |
| Interior pages feel empty without code.storage's art column | Interior pages are deliberately pure documents; the hero figure lives only on `/`, where it carries a caption and a fact |
| Theme-color meta desync after a manual toggle               | Ship media-query metas only; browser chrome may stay on the OS preference. Acceptable; no extra script                   |

## 9. Out of scope

- Rewriting copy, adding projects, posts, testimonials, or metrics.
- Listing published posts on `/blog` (pre-existing behaviour: the index is a static empty
  state even though `/blog/[id]` exists).
- Regenerating the LaTeX CV PDF in Overleaf; the HTML print version is the only print
  surface changed here.
- Deploy workflow, Cloudflare configuration, analytics, and new client-side behaviour.
