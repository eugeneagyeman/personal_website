---
name: Eugene Agyeman — Personal Site
description: A plain-text, mono-set personal site for a London software engineer, drawn as a checked-out document.
colors:
  paper: "#ffffff"
  ink: "#070708"
  graphite: "#5f5f66"
  hairline: "rgba(7,7,8,0.16)"
  link-blue: "#1f6fbf"
  night: "#070707"
  chalk: "#e8e8ea"
  ash: "#9a9aa2"
  hairline-night: "rgba(232,232,234,0.16)"
  link-blue-night: "#69b1ff"
  klein: "#0000f2"
  print-ink: "#000000"
typography:
  body:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "24px"
  heading:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "14px"
    fontWeight: 700
    lineHeight: "24px"
  home-heading:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "22.43px"
    fontWeight: 700
    lineHeight: "32px"
  home-lead:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "17.72px"
    fontWeight: 400
    lineHeight: "28px"
  label:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "12.44px"
    fontWeight: 400
    lineHeight: "20px"
  chip:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: "11.06px"
    fontWeight: 700
    lineHeight: "24px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
components:
  chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 10px"
  chip-night:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.night}"
  panel:
    backgroundColor: "transparent"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  button-download:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-download-night:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.night}"
---

# Design System: Eugene Agyeman — Personal Site

## Overview

**Creative North Star: "The Checked-Out Document"**

The site is a plain-text document pulled out of a store: one measured column of monospaced type, a second column for a framed photograph, ASCII for the odd sign, dashed rules for panels, and nothing decorative a reader could not have typed. The reference is code.storage's spec-sheet register, adapted for reading rather than copied: 14px type on 24px leading and a 560px column instead of 12px/24px/500px.

There are two grounds and no chromatic surface: white paper by day, near-black `#070707` by night. Colour is reserved for links, which are blue with a half-opacity underline, and for text selection, which is Klein blue, the colour the site was built on before this redesign. Everything else is ink, graphite, or hairline. The terminal is the grammar, not a costume: there is no prompt, no scanline, and no glow. The one exception is a gag rather than chrome: the name in the header is an editable line whose block caret blinks and doubles as a tiny shell.

Hierarchy is built without size. Headings are the same 14px as body, set bold and uppercase, led by a muted `#` or `##` marker. Weight, case, spacing, and a 48px gap between sections do the work that scale does elsewhere.

**Key Characteristics:**
- Geist Mono only, on one 9/8 modular scale: 14px/24px body, 12.44px labels and ASCII, 11.06px caption chips.
- White or `#070707` grounds; blue links; Klein-blue selection. No gradients, no shadows, no filled panes.
- One 560px document column; the shell is 1200px with 20px/40px gutters.
- Dashed 12px panels carry structure; the photograph is a framed artefact with no caption.
- Static header with a two-line brand block and bracketed, wrapping navigation; no menu script.

## Colors

A two-ground monochrome with a single functional blue and a Klein-blue selection.

### Primary
- **Link Blue** (#1f6fbf on paper; #69b1ff on night): The only chromatic colour in the reading surface. Links, panel values, and the focus ring. Darker and lighter than code.storage's own blue so it clears 4.5:1 at body size (5.14:1 on white, 8.95:1 on `#070707`).

### Neutral
- **Paper** (#ffffff): Light ground.
- **Ink** (#070708): Light text, and the chip and download-button fill.
- **Graphite** (#5f5f66): Muted text on paper: labels, meta, the `#` prefixes, bullets (5.29:1).
- **Hairline** (rgba(7,7,8,0.16)): Dashed borders, rules, and scrollbar thumbs on paper.
- **Night** (#070707): Dark ground.
- **Chalk** (#e8e8ea): Dark text, and the chip and button fill on night.
- **Ash** (#9a9aa2): Muted text on night.
- **Hairline Night** (rgba(232,232,234,0.16)): Dashed borders and rules on night.
- **Klein** (#0000f2, text #ffffff): `::selection` in both themes. White on Klein is about 9:1.
- **Print Ink** (#000000): Text and links on the printed CV only, on white.

### Named Rules
**The Links-Only Colour Rule.** Blue marks something you can follow. It is never decoration, never a heading, never a badge. Klein blue appears only as selection.

**The Tokens-Flip Rule.** Components use semantic variables (`--bg`, `--fg`, `--muted`, `--line`, `--link`, `--chip-bg`, `--chip-fg`). The `.dark` class swaps the values; no component carries a `dark:` colour utility.

## Typography

**Display Font:** none; the site has no display face.
**Body Font:** Geist Mono (variable 100–900, SIL OFL 1.1, self-hosted in latin, latin-ext, and symbols subsets), falling back to `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`.
**Label/Mono Font:** the same.

**Character:** One mono face for everything, so the site reads as a single typed document. The face carries no arrows; use ASCII `->`, never `→` or `↗`, which would fall back to a system font.

### Hierarchy
Every size is the 14px body multiplied by a whole power of 9/8 (1.125), rounded to the nearest pixel. Text smaller than body steps down one power at a time; text larger than body steps up two at a time (×1.266), so each jump between neighbouring roles is the same fraction. Sizes and line heights are both `rem` tokens in `global.css` (`text-chip`, `text-label`, `text-body`, `text-lead`, `text-display`), so the whole scale grows uniformly with the reader's default font size; never write a literal font size. At the 16px browser default, line heights sit on a 4px grid. Print is the exception: the CV prints on its own 8.5pt scale.

| Role | Power | Size / line |
| --- | --- | --- |
| Display | +4 | 1.375rem (22px) / 2rem (32px) |
| Lead | +2 | 1.125rem (18px) / 1.75rem (28px) |
| Body, headings | 0 | 0.875rem (14px) / 1.5rem (24px) |
| Label | −1 | 0.75rem (12px) / 1.25rem (20px) |
| Chip | −2 | 0.6875rem (11px) / 1.5rem (24px) box |

- **Heading** (700, body size, uppercase): h1, h2, h3 are one size. The home h1 is the one exception at display size, and its lead paragraph is lead size. h1 gets a muted `# ` prefix and h2 a muted `## ` prefix via CSS; h3 has none. In a document (`.flow`, `.doc-prose`), the h1 is followed by 36px rather than 24px, and every h2 carries a dashed rule beneath it, the same treatment as the CV's section headings. On the printed CV, headings follow the 8.5pt body.
- **Body** (400, 14px, 24px): All prose, about 66 characters per line at 560px.
- **Label** (400–500, 12px, 20px, uppercase): Navigation, bracket links, footer, meta lines, ASCII blocks, inline code.
- **Chip** (700, 11px, 24px box, uppercase): Inverted caption labels.

### Named Rules
**The No-Size-Jump Rule.** Never raise a heading's font size. Use weight, case, the prefix, and space.

## Layout

A static header, then one document column. The shell is `1200px` wide with 20px gutters, 40px from `lg` (1024px). Prose and headings sit in a left-aligned 560px column (`.doc`); nothing is centred. The header has 40px top padding and the first content sits 80px below it. Vertical rhythm follows the 24px body line: blocks inside a document are separated by 24px, sections by 48px.

The home page is a two-column grid from `lg`, `minmax(0, 560px) minmax(0, 1fr)` with an 80px gap: intro and links on the left, a framed photograph on the right. Below `lg` it is one column and the figure follows the intro paragraph. On contact, the email panel spans the full row and the LinkedIn and GitHub panels sit two across beneath it from `sm`. The CV is two-thirds and one-third at `lg` and prints as three columns.

ASCII tables are wide by nature: each lives in a focusable `.ascii-wrap` that scrolls horizontally inside itself so the page never overflows.

## Elevation & Depth

Flat. There are no shadows, gradients, or filled panes. Depth comes from dashed borders, a solid border on hover, and inverted chips. The only filled controls are the chip and the CV download button.

### Named Rules
**The Dashed-Means-Container Rule.** A 1px dashed hairline marks a container (panel, photo frame, code block, section rule). Solid lines are reserved for the CV print output and the hover/focus state of a panel.

## Shapes

Mostly square. Panels and code blocks use a 12px radius; the download button 8px; inline code 4px; chips, the photo frame, and the figure itself have no radius. Borders are always 1px. There is no clipping, no angled geometry, and no ring or glow.

## Components

### Navigation
A two-line brand block at left (name at lead size, bold, as an editable line with a blinking block caret, then "Software engineer" at body size, muted) and a bracketed link row at right: `[ HOME / ABOUT / THOUGHTS / CV / CONTACT ]`, with the theme control beneath it. Label size, uppercase. The current page is bold with a half-opacity underline; hover shows the same underline. Links wrap naturally on narrow screens, so there is no disclosure menu and no menu script.

### Theme Toggle
A bracket text control that names the theme it will switch to (`[ DARK ]` or `[ LIGHT ]`). Both labels are in the markup and CSS shows one, so there is no flash. Its script, the inline initialiser in `Layout.astro`, and the name shell's script are the site's client scripts; inline ones are CSP-hashed by `scripts/sync-csp.mjs` at build.

### Name Shell
The name is a real text field and the `█` is its cursor: it sits on the caret's cell, shows the character under it in inverse, blinks with a hard on/off step, holds steady while typing, and stops blinking under reduced motion. Idle, the name and tagline are uppercase; once something is typed, the line shows exactly what was typed. Enter runs the line through `src/lib/commands.ts` (`help`, `whoami`, `ls`, `cd <dir>`, `echo`, `status`, `sudo`, `rm`, `exit`, `clear`), and the lowercase reply borrows the tagline's line for four seconds. Leaving the field always restores the name. `status` prints `site.availability` from `src/lib/site.ts`. Without JavaScript the field is still editable, with the native caret.

### Links
Blue, weight 500, underlined at 50% opacity with a 3px offset; hover raises the underline to full. Bracket links (`.bracket`) wrap the label in `[ ]` for primary actions such as "View CV" and "Back home".

### Chips
Inverted caption labels: chip size, bold, uppercase, `0 10px` padding, no radius, ink on paper and chalk on night. They label contact channels. The hero photograph has no caption; its description lives in the `alt` text. The skip link is a chip.

### Panels
1px dashed hairline, 12px radius, 20px 24px padding, no fill. On hover or focus the border turns solid in the foreground colour; the panel never lifts or casts a shadow. Used for contact channels: email, LinkedIn, GitHub. The CV is not a contact channel and is reached from the navigation.

### ASCII Tables
Label size on a 20px line, `white-space: pre`, generated from data so columns cannot drift, kept to ASCII characters. Used for the empty-state sign on Thoughts; the home page has none.

### Figure
The hero photograph sits inside a 1px dashed frame with 12px of inner padding and no radius. It carries no visible caption.

### CV
Screen: the same document, with section headings (`## EXPERIENCE`) ruled by a dashed line, `- ` bullets, comma-separated skills, and a filled `DOWNLOAD PDF` button. Education is a list; a course not yet started carries a muted status line ("Incoming") above its dates. Print: A4 with 12mm margins, 8.5pt type, three columns, solid rules, black links, no site chrome, and entries that do not split across pages.

## Do's and Don'ts

### Do:
- **Do** keep every heading at body size (the home h1 excepted) and let weight, case, prefix, and spacing carry hierarchy.
- **Do** use ASCII `->` for arrows and build tables from data.
- **Do** colour only links blue and only selection Klein blue.
- **Do** use semantic tokens so a component works in both themes without variants.
- **Do** keep scrollable ASCII inside a focusable `.ascii-wrap`.
- **Do** keep the prose column at 560px, left-aligned.
- **Do** take every font size from the 9/8 scale tokens.

### Don't:
- **Don't** add shadows, gradients, glass, or filled cards.
- **Don't** introduce a second typeface or a heading size jump.
- **Don't** use `→`, `↗`, or emoji: Geist Mono has no glyph for them and they fall back to a system font. The one deliberate exception is the heart in the footer's "Built with" line.
- **Don't** add an eyebrow or kicker above a heading.
- **Don't** emulate a terminal: no prompt, scanlines, or glow. The name shell is the one terminal gag; keep new ones inside it rather than adding chrome.
- **Don't** add a menu script; the navigation wraps.
