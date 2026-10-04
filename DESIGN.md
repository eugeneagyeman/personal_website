---
name: Eugene Agyeman — Personal Site
description: A bold, broadcast-blue personal site for a London software engineer.
colors:
  electric-klein: "#0000f2"
  ink-black: "#000000"
  electric-cyan: "#22d3ee"
  document-cyan: "#0e7490"
  document-cyan-bright: "#06b6d4"
  paper-white: "#ffffff"
  steel-muted: "#94a3b8"
  mist-hairline: "#e2e8f0"
typography:
  display:
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(2.25rem, 6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  section:
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.025em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.electric-klein}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "rgba(255,255,255,0.85)"
  button-pill:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  card-contact:
    backgroundColor: "rgba(255,255,255,0.1)"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-paper:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.lg}"
    padding: "32px"
  chip-skill:
    backgroundColor: "#f1f5f9"
    textColor: "#334155"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
---

# Design System: Eugene Agyeman — Personal Site

## Overview

**Creative North Star: "The Broadcast"**

The site runs on a single, unmissable signal: Electric Klein, a saturated ultramarine that floods the entire "light" theme — page, header, and footer alike. This is not a background colour used sparingly; it is the broadcast itself. Against it, everything else is a hard, confident counterpoint: solid white type, hairline borders, flat surfaces, and a total absence of decoration. The effect is a screen that announces itself rather than one that recedes, which matches the site's purpose as a personal home base that has to work for recruiters, peers, and casual visitors alike.

At night the signal inverts. The black theme drops to true black and swaps the blue for a bright accent that marks attention: section labels, links, and the small status dots beside CV roles. The accent is the one place colour is allowed to speak in dark mode; everything else is a cool slate hierarchy over black. This two-world structure — a flooded blue day, a quiet black night — is the system's defining move.

The build is deliberately unfussy. Components state what they are and step aside: buttons are flat rectangles or simple pills, cards are translucent panes on the coloured surface, and depth is drawn with borders and rings rather than shadows. The one exception is the CV, which lifts off the surface as a white "paper" artefact with a real shadow, because it is a document, not a panel. Warmth comes through the copy and the human touches, never through ornament.

**Key Characteristics:**
- One dominant surface colour (Electric Klein) carried at full saturation, not as an accent.
- Two named worlds: a flooded blue light theme and a true-black dark theme.
- Flat by default; depth from hairlines, rings, and translucency.
- A single warm accent reserved for attention in dark mode.
- Hard, confident typography — heavy weights, tight tracking, generous line height on body.

## Colors

A high-voltage monochrome built on one saturated blue, punctured by a single warm signal.

### Primary
- **Electric Klein** (#0000f2): The defining colour. It is the light-theme page, header, and footer surface (`bg-electric`) and the text colour for primary buttons on white. Carried at full strength; never tinted toward pastel. It is the brand *and* the background.
- **Electric Cyan** (#22d3ee): The dark-theme accent and the bright end of the site's cyan family. Marks section headings, inline links, and blog post meta.
- **Document Cyan** (#0e7490 on white; #06b6d4 for the timeline dot): The white CV document's own accent — company names, link hovers, the timeline dot, the focus outline, and text selection. A cool counterpoint chosen so the document's accents read as accents against the Electric Klein background rather than blending into it.

### Neutral
- **Ink Black** (#000000): The dark-theme page, header, and footer surface. True black, not near-black, for maximum contrast with the blue day theme.
- **Paper White** (#ffffff): White type on the blue and black surfaces; also the CV paper card surface.
- **Chalk White** (rgba(255,255,255,0.9)–0.95): Light-theme body copy and secondary text. White is almost never used at 100% for prose.
- **Steel Muted** (#94a3b8 / slate-400): Dark-theme body copy, nav links, and muted prose.
- **Frost Panel** (rgba(255,255,255,0.1)–0.15): Translucent card and icon-circle fills on the coloured surface.
- **Mist Hairline** (#e2e8f0 / slate-200): Borders and dividers inside the white CV paper.

### Named Rules
**The Flooded Surface Rule.** Electric Klein is a surface, not a highlight. Any screen in the light theme is expected to sit *on* the blue, not beside it. Do not reduce it to a chip or an underline.

**The Accent-Not-The-Background Rule.** The defining background colour is never reused as an accent on top of itself. Accents that sit on the white CV document use Document Cyan, not Electric Klein, so they separate from the page rather than disappearing into it.

**The One Signal Family Rule.** A single accent family — cyan — carries all emphasis. Dark surfaces take the bright Electric Cyan; the white CV document takes its deeper Document Cyan. There is no second accent hue. If everything is accented, nothing is.

## Typography

**Display Font:** Schibsted Grotesk (variable, 400–900, self-hosted), falling back to the system sans (`ui-sans-serif`, `system-ui`).
**Body Font:** same family.
**Label/Mono Font:** none distinct; labels use the same family in a heavier weight.

**Character:** One self-hosted variable grotesque used everywhere, so the site sounds the same on every device. The voice is set by weight and spacing, not by a second typeface — heavy extrabold headlines with tight tracking against generously led body copy. Numbers in the CV are tabular so dates and metrics align.

### Hierarchy
- **Display** (800, clamp(2.25rem → 3rem), 1.1, tracking-tight): Page-defining headlines ("Hey, I'm Eugene.", "Say hello."). Used at most once per viewport.
- **Headline** (800, 1.875rem–2.25rem, 1.2): Section and page headings ("Under construction", CV name in uppercase).
- **Title** (700, 1.125rem, 1.4): Role and company names, card values, blog post titles.
- **Section** (700, 1.5rem, 1.2, tracking-tight): A standalone section heading that carries its own weight ("A typical day", the "Curriculum Vitae" page label). White on blue, Electric Cyan in dark mode.
- **Body** (400, 1.125rem, 1.625): All prose. Light theme at rgba(255,255,255,0.9); dark theme at slate-400. Constrain to a comfortable measure (the site reads at `max-w-2xl`, ~42rem).
- **Label** (600, 0.875rem, tracking-wide): Nav links, contact card labels, blog post meta. CV section headings step further: 700, 0.75rem, uppercase, tracking 0.18em.

### Named Rules
**The Weight-Not-Faces Rule.** Hierarchy is built from weight and size within one family. Never introduce a second display typeface to create contrast; use weight, scale, and tracking instead.

## Layout

A single centred column governs everything. The working container is `max-w-4xl` (56rem) with responsive gutters of `px-4` → `sm:px-6` → `lg:px-8` (16px → 24px → 32px). Reading content narrows to `max-w-2xl` (42rem) on the About page and `max-w-3xl` (48rem) for blog prose, so lines stay short even when the shell is wide.

The header is fixed at `h-20` (80px) with the page's colour and a hairline bottom border at 90% opacity plus a backdrop blur; the main region is offset by `pt-20` to match. Sections are separated by full-bleed 1px top borders rather than by gaps, giving the page a continuous, ruled feel. Vertical rhythm runs on a 4px base: 16px (`py-2.5`/`p-4`), 24px (`p-6`), 32px (`p-8`/`mt-8`), and 40px (`p-10`), with generous page padding of 80–128px (`py-20`–`py-32`).

Two signature arrangements recur. The home hero is an asymmetric grid (`sm:grid-cols-[1fr_300px]`) pairing fluid text with a fixed 300px portrait. The CV is a two-thirds / one-third split at `lg` (`lg:grid-cols-3`, main content spanning 2 columns) that collapses to a single column on smaller screens and prints as a three-column document.

Breakpoints follow Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px. Structure changes once, at `sm`/`md`; `lg` only widens gutters and the CV.

## Elevation & Depth

Flat by default. The system conveys layering with colour and line, not shadow: hairline borders (`border-white/20` on blue, `border-white/5` on black), 1px rings (`ring-1 ring-white/15` on the hero image, `ring-1 ring-slate-900/5` on the CV paper), and translucent white fills (`bg-white/10`–`/15`) that read as panes sitting on the coloured surface. There is no stack of elevations and no ambient shadow vocabulary.

The single lifted artefact is the CV: a white paper card with `shadow-xl` and a faint dark ring, deliberately raised so it reads as a physical document laid on the blue or black surface. That break in the flat rule is meaningful only because nothing else breaks it.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth is expressed with borders, rings, and translucency; shadow appears only on the CV paper artefact, where it signals "document", not "elevation".

## Shapes

Form language is soft-rectangular but restrained. Cards and images use a 16px radius (`rounded-2xl`); buttons use 8px (`rounded-lg`); small chips use 4px (`rounded`); the one pill-shaped control is the CV download button (`rounded-full`), which earns its shape by being a self-contained download action. Borders are always 1px hairlines; rings are 1px. There are no decorative outlines, no double borders, no gradient fills, and no clipping or angled geometry — the interest comes from the surface colour and the grid, not the silhouette.

## Components

### Buttons
- **Shape:** 8px radius for standard buttons (`rounded-lg`); the pill variant uses a full radius.
- **Primary:** Solid Paper White background with Electric Klein text (white-on-blue inverted; the text drops to Ink Black in dark mode so it stays legible against the white fill). Padding 10px / 20px (`px-5 py-2.5`), weight 500. This is the "View CV" action on the About page.
- **Hover / Focus:** Primary dims to `bg-white/85`. The pill variant fills to `bg-white/10` on hover. Focus is a 2px ring at `ring-white/30`.
- **Secondary / Ghost (pill):** Transparent with a hairline `border-white/50`, white text, and an inline download glyph. Used for "Download PDF" on the CV — deliberately the only pill in the system.

### Chips
- **Style:** Paper-white-adjacent `bg-slate-100` fill with slate-700 text, 4px radius, 12px text at weight 500. Used for the technical-skill tags on the CV paper only.
- **State:** Static; not interactive.

### Cards / Containers
- **Corner Style:** 16px radius (`rounded-2xl`).
- **Background:** Two families. On the coloured surface, translucent Frost Panels (`bg-white/10`, hover `bg-white/15`). On the CV, opaque Paper White.
- **Shadow Strategy:** None on translucent panes (they float on tone); `shadow-xl` on the CV paper only. See Elevation & Depth.
- **Border:** Hairline — `border-white/60` on contact cards (hover `border-white/85`) so the pane is perceivable against the saturated blue; the CV paper uses a `ring-1 ring-slate-900/5`.
- **Internal Padding:** 24px for contact cards (`p-6`); 32–40px for the CV paper (`p-8 sm:p-10`).

### Inputs / Fields
None in the system. The site is static and has no forms; contact is via direct links, and the theme control is a button, not a field. A future field should inherit the hairline, translucent-pane language above.

### Navigation
- **Style:** A fixed header, 80px tall, coloured with the page surface at 90% opacity plus backdrop blur, closed by a hairline bottom border. The wordmark is the full name in 1.5rem weight 700. Links are 14px weight 500, `text-white/90` on blue and `slate-400` on black, brightening to full white on hover.
- **Mobile:** At `<md`, links collapse into a disclosure menu that slides below the header on the same surface; the menu toggle is an icon button beside the theme control, with open/close icons swapped and `aria-expanded` maintained.

### Theme Toggle
An icon-only button (sun in dark mode, moon in light mode) at `text-white/95` / dark `slate-400`, 8px radius, 10px padding, 2px focus ring. It is one of only two client-side scripts on the site and must stay dependency-free. Because the page colour is set by CSP-hashed inline script, any change to this or the boot script requires regenerating the `_headers` hashes.

### Section Labels
A standalone section heading that carries its own weight ("A typical day", "Curriculum Vitae") is 24px (`text-2xl`), weight 700, tracking-tight, at full white on blue and Electric Cyan in dark. The smaller 14px, weight 600, tracking-wide label survives for meta lines such as the blog post date; there is no eyebrow above a headline. CV document section headings are a separate, denser pedigree inside the white paper: 12px, weight 700, uppercase, tracking 0.18em, with a hairline underline.

### Contact Card
The primary "reach me" component. A translucent pane (16px radius, `border-white/60` at rest, `white/85` on hover) holding a 44px circular icon badge with a hairline ring, a muted 12px label, an 18px semibold value, and a muted one-line note. A 16px arrow sits at the trailing edge — up-right for external destinations that open in a new tab, right for internal ones — and brightens on hover. The value underlines on hover; the pane never lifts or casts a shadow.

## Do's and Don'ts

### Do:
- **Do** carry Electric Klein at full saturation as a surface. It is the broadcast, not a highlight.
- **Do** build hierarchy from weight and scale inside the single system font stack; keep display headlines at weight 800 with tight tracking.
- **Do** express depth with hairlines, 1px rings, and translucent white fills; reserve the one shadow for the CV paper.
- **Do** reserve the cyan accent for attention in dark mode only.
- **Do** keep the white CV document's accents in Document Cyan, distinct from the Electric Klein background.
- **Do** give a standalone section heading real size (`text-2xl`); reserve the 14px label for an eyebrow above a headline.
- **Do** keep the JS surface to the theme toggle and the mobile menu, and regenerate the CSP hashes whenever either inline script changes.
- **Do** set body copy at the muted white/slate step and hold a reading measure near 42rem.
- **Do** keep the CV's two-column-at-`lg`, three-column-in-print structure and tabular numerals.

### Don't:
- **Don't** tint, gradient, or pastelise Electric Klein — no soft blues, no gradient fills.
- **Don't** introduce a second display typeface for contrast.
- **Don't** add ambient shadows or layered elevation beyond the CV artefact.
- **Don't** scatter the cyan accent across a screen; if everything is accent, the signal is lost.
- **Don't** add decorative borders, angled geometry, or textured backgrounds — the colour and grid do the work.
- **Don't** put marketing/hero copy in a corporate register; the voice is first-person and warm (see PRODUCT.md).
