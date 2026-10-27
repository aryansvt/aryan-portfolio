---
name: Aryan Achar
description: A cold white print carrying deep blue exposed bands that sink deeper as you scroll, cold air into deep water.
colors:
  paper: "#f2f6fb"
  wash: "#e3ecf8"
  line: "#d3deee"
  ink: "#0a1a3f"
  ink-soft: "#42557a"
  signal: "#2b4bff"
  signal-deep: "#1d3ef0"
  frost: "#a8c4ff"
  ice: "#e8efff"
  ice-soft: "#9fb2da"
  deep: "#0a1a4a"
  deep-raised: "#102463"
  abyss: "#040a1c"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Hubot Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(9.1vw, 7.6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  close:
    fontFamily: "Hubot Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 13vw, 8.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Hubot Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  project-title:
    fontFamily: "Hubot Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 2.8vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Hubot Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.9vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.3vw, 1.875rem)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 87.5"
  chip:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 87.5"
rounded:
  chip: "6px"
  menu-item: "0.75rem"
  halftone: "1rem"
  menu: "1.25rem"
  full: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  container: "76rem"
  section-top: "clamp(5.5rem, 11vw, 9rem)"
  band-bottom: "clamp(5rem, 9vw, 8rem)"
  label-column: "9.5rem"
  row: "1.75rem 2rem"
  column-gap: "2rem"
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.25rem"
  xl: "2rem"
components:
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep}"
    rounded: "{rounded.full}"
    padding: "0 1.25rem"
    height: "2.875rem"
  button-light-hover:
    backgroundColor: "{colors.ice}"
  button-solid:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "0 1.25rem"
    height: "2.875rem"
  button-solid-hover:
    backgroundColor: "{colors.signal-deep}"
  button-ghost:
    textColor: "{colors.ice}"
    rounded: "{rounded.full}"
    padding: "0 1.25rem"
    height: "2.875rem"
  chip-paper:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.chip}"
    padding: "0.2rem 0.5rem"
  chip-deep:
    textColor: "{colors.frost}"
    typography: "{typography.chip}"
    rounded: "{rounded.chip}"
    padding: "0.2rem 0.5rem"
  skill:
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.75rem"
  nav-pill:
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.375rem"
  nav-link:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: "0.5rem 0.875rem"
  nav-link-active:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
  now-badge:
    textColor: "{colors.signal}"
    rounded: "{rounded.full}"
    padding: "0.15rem 0.55rem 0.15rem 0.45rem"
---

# Design System: Aryan Achar

## Overview

**Creative North Star: "The Cyanotype Print"**

The page is a cold white print with deep blue bands exposed into it. Grounds alternate down the scroll (sky, paper, deep, paper, abyss), and each band is darker than the last dark one, so the visitor goes from cold air at the top into deep water at the close. The print metaphor is literal in the materials: band edges are ordered-dither bitmaps that develop once when they enter view, a fine film grain lies over everything, and project rows fill with a halftone dot screen on hover.

Typography carries the identity. Hubot Sans set wide (wdth 112 to 125), heavy and uppercase for names and section titles; Mona Sans for reading; Martian Mono, condensed, for dates, tags, and small labels. Everything else stays quiet: hairline rules between rows, pill-shaped controls, a single signal blue for action. Character-cell texture (the ASCII sea, the stippled horizon, the scrambled dates) is a sparse accent, always decorative and hidden from assistive tech.

The world rejects the two-column sidebar portfolio and the near-black neon developer page. Dark grounds here are saturated navy, never neutral black.

**Key Characteristics:**
- Five grounds (sky, paper, deep, paper, abyss), each remapping text, rule, accent, and chip tokens.
- Ordered-dither band edges, 3px cells, Bayer threshold.
- Wide heavy uppercase display, condensed mono labels.
- One action color per ground: signal on paper, frost on dark, white in the sky.
- Hairlines, not cards. Shadows only on floating glass.
- Character-cell motifs (ASCII sea, horizon, scramble) as accents, never as body content.

## Colors

A cold monochrome of blues from icy paper to near-black navy, with one saturated signal blue doing every action.

### Primary
- **Signal Blue** (signal): every action on paper. Solid buttons, link hairlines, the scroll-progress ring, the "Now" badge, selection highlight, scrollbar thumb, and the top stop of the sky gradient. Pressed-hover shade is Signal Deep (signal-deep).

### Secondary
- **Frost** (frost): the accent on deep and abyss grounds. Links, chip text, and (at 10 to 16% alpha) rules and chip fills on dark.
- **Ice** (ice): primary text on dark grounds and the light button's hover.

### Neutral
- **Cold Paper** (paper): the light ground and the color every dither edge paints toward.
- **Wash** (wash): chip fills, the nav indicator, the phone menu button.
- **Hairline** (line): row dividers and rules on paper.
- **Ink** (ink): headings and primary text on paper.
- **Ink Soft** (ink-soft): body copy and secondary text on paper.
- **Ice Soft** (ice-soft): body copy on dark grounds.
- **Deep Water** (deep): the Projects band, the monogram disc, light-button text.
- **Deep Raised** (deep-raised): the halftone row fill on the deep band.
- **Abyss** (abyss): the contact close. The darkest ground, still blue.

### Grounds
- **Sky**: `linear-gradient(#2b4bff 0%, #2142ef 22%, #1b36cc 46%, #0a1a4a 72%, #081540 100%)`, text white and #dce6ff, accent white. Hero only.
- **Paper**: paper ground, ink text, line rules, signal accent, wash chips.
- **Deep**: deep ground, ice text, frost accent, rules at frost 16%.
- **Abyss**: abyss ground, same mapping as deep with rules at frost 14%.

### Named Rules
**The Remap Rule.** Components never name a ground color directly for text, rules, accent, or chips; they read the ground variables (fg, fg-soft, rule, accent, chip-bg, chip-fg) so the same component works on every ground.

**The Sinking Rule.** Dark bands get darker down the page: sky, then deep, then abyss. A later band is never lighter than an earlier dark one.

**The Blue-Black Rule.** No neutral grays or true black. Every dark is a navy; every shadow tint is rgb(6 18 56).

## Typography

**Display Font:** Hubot Sans (ui-sans-serif fallback), variable with the wdth axis
**Body Font:** Mona Sans (ui-sans-serif fallback), wdth axis, italic available
**Label/Mono Font:** Martian Mono (ui-monospace fallback), set condensed at wdth 87.5

**Character:** A wide, heavy, uppercase grotesk against a calm humanist-leaning body and a narrow technical mono. The width axis is the system's main lever: display goes wide, labels go narrow.

### Hierarchy
- **Display** (900, wdth 125, uppercase, 0.88 line height): the hero name, one line from 640px up, two lines on phones (clamp(3rem, 18.4vw, 6.5rem)). The close title "Say hi." uses the same style at the close size.
- **Headline** (900, wdth 118, uppercase): section titles, sticky in the left four columns on desktop.
- **Project Title** (800, wdth 125, mixed case): project names on the deep band.
- **Title** (700, wdth 112): role titles, the hero job title, the close email.
- **Lead** (500): the opening line of About.
- **Body** (400, 1.7 line height, ink-soft or ice-soft, 66ch max).
- **Label** (mono, uppercase, wdth 87.5): dates, footer note, back-to-top.
- **Chip** (mono, wdth 87.5, mixed case): tech tags.

### Named Rules
**The Width Axis Rule.** Hierarchy is set with weight and width together. Display and headline are always wide and uppercase; nothing below title is uppercase except mono labels.

**The Balanced Heading Rule.** Headings use balanced wrapping and paragraphs use pretty wrapping; long titles and links break anywhere rather than overflow.

## Layout

A single 76rem column inside a fluid gutter (clamp(1.25rem, 4vw, 4rem)). Each section is a grid: one column on phones, twelve columns from 1024px with the section title sticky in columns 1 to 4 (top 7.5rem) and content in columns 5 to 12, column gap clamp(2rem, 4vw, 4rem). Sections open with clamp(5.5rem, 11vw, 9rem) of top padding.

Lists are rows separated by hairlines, not cards. Experience and Skills rows use a 9.5rem label column plus a fluid column from 640px, 2rem apart; below that they stack. Row padding is 1.75rem top and 2rem bottom for roles, 2rem to 2.25rem for projects, 1.25rem for skills.

Breakpoints: 640px (one-line hero name, two-column rows), 768px (centered header pill with inline links), 1024px (twelve-column sections).

The hero is full-bleed and at least max(40rem, 100svh) tall: copy on top, the ASCII sea filling the lower part under a single 1px horizon line, a dither edge into paper at the bottom.

## Elevation & Depth

Depth comes from ground changes, grain, and dither, not from shadows. The page is flat. The only lifted surfaces are the floating glass controls: the header pill and the phone menu that drops from it.

### Shadow Vocabulary
- **Glass pill** (`0 1px 2px rgb(6 18 56 / 0.08), 0 10px 28px -10px rgb(6 18 56 / 0.28)`, blur 16px saturate 1.4): the fixed header.
- **Glass menu** (`0 1px 2px rgb(6 18 56 / 0.1), 0 24px 48px -16px rgb(6 18 56 / 0.35)`, blur 18px saturate 1.4): the phone popover menu.

### Named Rules
**The Floating Glass Rule.** Shadows belong only to surfaces that float over the scroll (fixed header, its popover). Content in the flow never casts a shadow.

**The Grain Rule.** A fractal-noise grain sits over the whole page at 0.13 opacity in overlay blend (0.22 in the sky), pointer-events off.

## Shapes

Two shape families. Controls are full pills (999px): buttons, header, nav links, skill tags, the "Now" and "Next up" badges, the monogram. The award pill uses a 1rem radius, a full pill on one line. Small information pieces are softly squared: chips at 6px, menu rows at 0.75rem, the halftone hover fill at 1rem, the menu panel at 1.25rem. Band edges are hard bitmap steps, never curves or waves. Rules are 1px hairlines.

## Components

### Buttons
Confident pills with a quick press.
- **Shape:** full pill, 2.875rem tall (2.375rem inside the header pill, 3.125rem for the hero resume button on phones), 600 weight at 0.9375rem.
- **Light:** white with deep text, used on the sky. The trailing arrow is signal blue.
- **Solid:** signal with white text, used on the abyss close.
- **Ghost:** 1px rule-colored border, ground text; hover adds a white 8% fill and strengthens the border.
- **States:** press scales to 0.97 (160ms ease-out). Trailing arrows nudge 2px up-right on hover (220ms). Hover styles only apply on fine pointers.

### Chips
- **Style:** condensed mono 0.6875rem on the chip-bg variable (wash on paper, frost at 10% on dark), 6px radius. Static, not interactive.
- **Skill tags:** larger body-font pills (500, 0.9375rem) with a hairline border on a white 60% fill, paper only.

### Links
- **Hairline draw:** accent-colored text over a 1px hairline at 32% of its color; on hover or focus a 1.5px line draws left to right (320ms ease-out). Project links and the close email use the same draw.
- **Easter egg triggers:** inline words with a dotted signal underline; they turn signal on hover or when open.

### Navigation
- **Header pill:** fixed, centered from 768px (full width with 0.75rem insets on phones), translucent paper glass. Holds the monogram, section links, and a solid "Resume" button.
- **Monogram:** deep disc with ice initials inside a conic signal ring that fills with scroll progress.
- **Links:** ink-soft, ink when current; a wash indicator slides between them (280ms ease-out).
- **Phone:** a native popover menu with wide uppercase section names, items staggered in at 30ms steps; the two-line icon morphs into an X.

### Rows
- **Role:** mono dates in the label column with a pulsing signal "Now" badge for current roles; title, org, body, chips on the right.
- **Project:** on the deep band, a halftone dot screen (7px pitch, frost 20% dots over deep-raised) wipes in from the left on hover or focus within (420ms in, 220ms out).
- **Winning project:** keeps that halftone printed at 40% at rest, square along its bottom hairline and reaching up past the title on the first row, then brightens to full on hover (320ms in, 220ms out). An award pill sits under the title: condensed mono uppercase in the ground accent, a 10% accent fill, a 30% accent hairline, a stroke trophy, and a 1rem radius so a long award wraps soft.
- **Next up:** the last line of About. A "Next up" pill like the "Now" badge but with a hollow dot (coming, not happening), followed by one line of body text at 0.9375rem.
- **Archive link:** closes the Projects list under a hairline. Hubot Sans 700 in the accent with the hairline draw and a right arrow that nudges 3px.

### Archive Table
The `/archive` page opens with the sky cut short (the hero name style for the title, no sea), dithers into paper for the table, and closes on the abyss contact. The table is a real `<table>`: mono uppercase headers, mono dates in the Experience month style, Hubot Sans 700 names, chips for the stack, the bare domain with the hairline draw for live sites, and the GitHub mark. Hairlines are cell backgrounds that stop at the text, while the row hover (a white 75% tint, fine pointers only) runs 0.75rem past them with a 0.75rem radius. Below 1024px the link columns become 40px icon targets; below 768px the stack column hides and dates fold to month over year when space runs out. Rows fade up on load with a 45ms stagger capped at ten rows.

### Band Edge (signature)
An ordered-dither canvas, 42px tall, 3px cells, painting the neighboring ground's color over this band's edge with a Bayer threshold. It develops once on first view over 700ms (cubic ease-out) and paints fully at once under reduced motion.

### Character Cells (signature)
- **ASCII sea:** a Martian Mono character swell in ice and frost under the hero horizon; the pointer leaves a fading wake.
- **Footer sea:** the hero sea again in the abyss footer, finer (7 by 10 cells) and at about 40% strength, under the same horizon line and fog, fading out before the colophon. The page closes the way it opened.
- **Scramble:** role dates decode left to right with glyphs from `/\|-_=+*#<>` over 480ms when scrolled into view; width is held by an invisible copy and screen readers get the plain text.

### Motion
One curve, ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, at 160 to 420ms for interaction. The hero name rises line by line out of a mask (760ms, 90ms stagger), supporting copy fades up (600ms). Section titles rise from a clip mask and rows fade up 14px on scroll-driven timelines, only where `animation-timeline: view()` exists. A faint cold radial glow trails a fine pointer. All of it switches off under reduced motion.

## Do's and Don'ts

### Do:
- **Do** read text, rule, accent, and chip colors from the ground variables so components work on paper, deep, and abyss.
- **Do** join grounds with the dither band edge, painting toward the neighboring ground's color.
- **Do** set display and section titles in Hubot Sans 900, uppercase, wdth 118 to 125.
- **Do** use mono at wdth 87.5 for dates, tags, and small labels.
- **Do** separate list items with 1px hairlines and keep them flat.
- **Do** use the single ease-out curve and keep interactions between 160 and 420ms, with reduced-motion fallbacks.
- **Do** mark character-cell and dither decoration aria-hidden.

### Don't:
- **Don't** use neutral gray or true black; darks are navy (deep, abyss).
- **Don't** put shadows on in-flow content; only floating glass is lifted.
- **Don't** wrap rows in bordered or shadowed cards.
- **Don't** introduce a second action hue; signal and its ground equivalents (frost, white) are the only accents.
- **Don't** add mono kickers or eyebrows above headings, or index numbers on sections.
- **Don't** use character-cell texture for readable content.
