# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page portfolio in the cold blue "cold prints" world with the two content changes, keeping every link, easter egg, and the static export working.

**Architecture:** Next.js static export. Tokens live in `src/app/globals.css` under Tailwind 4 `@theme`; grounds switch with `data-ground` on band elements, which remaps text and line tokens. Decorative ASCII is three small client canvases sharing pure math helpers in `src/components/ascii/field.ts`. The old sidebar and route nav are replaced by a hero band and a floating header pill.

**Tech Stack:** Next.js 16 (static export), React 19, TypeScript 5.9, Tailwind 4, `next/font/google` (Hubot Sans, Mona Sans, Martian Mono), Node 24 `node --test` for checks.

**Spec:** `docs/superpowers/specs/2026-10-15-portfolio-redesign-design.md`. Visual reference: Figma file https://www.figma.com/design/5PKlPY0RogtLiWOxUQ196n (frames "Desktop / 1440" and "Mobile / 390").

## Global Constraints

- Palette, exactly: paper #F2F6FB, frost-wash #E3ECF8, line #D3DEEE, ink #0A1A3F, ink-soft #42557A, signal #2B4BFF, frost #A8C4FF, deep #0A1A4A, deep-raised #102463, ice #E8EFFF, ice-soft #9FB2DA, abyss #040A1C. Warm color only on the basketball.
- Fonts: Hubot Sans (display, width 112 to 125), Mona Sans (body), Martian Mono (labels, ASCII). Loaded with `next/font/google` and the `wdth` axis.
- No em dashes anywhere in copy. No AI-sounding copy. Short lowercase code comments.
- Every animation respects `prefers-reduced-motion`. Decorative ASCII is `aria-hidden`.
- Text contrast meets WCAG AA on every ground.
- Empty-URL links render as non-clickable highlighted text.
- Static export only: no server runtime, no runtime fetches.
- No new runtime dependencies unless a few lines cannot do the job.

## Review Focus

1. Touch-only phones: the hero sea must still react (tap ripples), the header menu must open and close, and nothing may depend on hover. Pin: manual check at 390px with touch emulation in Task 9.
2. Reduced motion: every canvas must draw one still frame and stop; scroll reveals and scramble must show final content immediately. Pin: `field.test.ts` asserts the still-frame path is deterministic; manual check in Task 9.
3. Browsers without CSS scroll timelines (Firefox): content must be fully visible with no reveal styles stuck at opacity 0. Pin: reveal styles only inside `@supports (animation-timeline: view())`, checked in Task 9.
4. Long or missing content: a long project name, a project with no live link, a role with no org URL must not break rows. Pin: break-ui pass in Task 9; `Projects` renders the live link only when present (already true in content for Multi-CSV).
5. Canvas sizing on resize and high DPR: canvases must stay crisp and not stretch after a resize or orientation change. Pin: `fitCanvas` helper in `field.ts` with a test for DPR clamping.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/app/globals.css` | tokens, grounds, base, component classes, keyframes, egg and glow styles |
| `src/app/layout.tsx` | fonts, metadata, viewport, grain layer, glow, JSON-LD |
| `src/app/page.tsx` | page composition: header, hero, sections, bands, close |
| `src/components/SiteHeader.tsx` | floating pill nav, active section tracking, popover menu (client) |
| `src/components/Hero.tsx` | hero band markup |
| `src/components/Contact.tsx` | contact close band |
| `src/components/Scramble.tsx` | mono label that resolves character by character (client) |
| `src/components/ascii/field.ts` | pure helpers: swell value, glyph ramp, bayer threshold, canvas fit |
| `src/components/ascii/field.test.ts` | node test for the helpers |
| `src/components/ascii/AsciiSea.tsx` | hero canvas with pointer wake (client) |
| `src/components/ascii/DitherEdge.tsx` | ordered-dither band edge (client) |
| `src/components/ascii/Horizon.tsx` | stippled particle horizon in the close (client) |
| `src/components/Section.tsx` | section shell with index and sticky label |
| `src/components/About.tsx`, `Experience.tsx`, `Projects.tsx`, `Skills.tsx` | section content |
| `src/components/TextLink.tsx`, `Tags.tsx`, `icons.tsx` | shared pieces, restyled, new icons |
| `src/components/eggs/*` | easter eggs, recolored only |
| `src/components/CursorGlow.tsx` | unchanged logic, new styles |
| `src/content/projects.ts`, `src/config/links.ts`, `src/content/sections.ts` | content changes |
| `src/app/og.png/route.tsx`, `src/app/_og/*`, `src/app/icon.svg` | social image and favicon |
| `scripts/content.test.mjs` | content assertions |
| deleted: `src/components/Sidebar.tsx`, `src/components/RouteNav.tsx` | replaced |

---

### Task 1: Content changes and the content check

**Files:**
- Modify: `src/content/projects.ts`
- Modify: `src/config/links.ts`
- Modify: `src/components/About.tsx` (sentence only, markup is rewritten in Task 6)
- Create: `scripts/content.test.mjs`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Produces: `aboutLinks.karimLab: string` in `src/config/links.ts`.

- [ ] **Step 1: Write the failing test**

```js
// scripts/content.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (p) => readFileSync(p, "utf8");

test("cinema cosmos replaces the credit default benchmark", () => {
  const src = read("src/content/projects.ts");
  assert.match(src, /name: "Cinema Cosmos"/);
  assert.match(src, /https:\/\/github\.com\/aryansvt\/cinema-cosmos/);
  assert.match(src, /https:\/\/cinema-cosmos\.vercel\.app/);
  assert.doesNotMatch(src, /Credit Default/);
});

test("about mentions the sysnets lab, experience does not", () => {
  assert.match(read("src/components/About.tsx"), /SysNets Lab/);
  assert.match(read("src/config/links.ts"), /https:\/\/www\.imtiazkarim\.net\//);
  assert.doesNotMatch(read("src/content/experience.ts"), /SysNets|Karim/);
});

test("no em dashes in source copy", () => {
  const walk = (dir) =>
    readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(p) ? [p] : [];
    });
  for (const file of walk("src")) assert.ok(!read(file).includes("—"), `em dash in ${file}`);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test scripts/content.test.mjs`
Expected: FAIL on "Cinema Cosmos" and "SysNets Lab".

- [ ] **Step 3: Make the content changes**

In `src/config/links.ts` add to `aboutLinks`:

```ts
  karimLab: "https://www.imtiazkarim.net/",
```

In `src/content/projects.ts` delete the Credit Default Risk Benchmark entry and insert after LineFinder:

```ts
  {
    name: "Cinema Cosmos",
    blurb:
      "A 3D galaxy of about 5,000 films where every star is a film, placed by how it feels instead of its genre. Plot, themes, and poster colors are embedded and laid out with UMAP, rendered with React Three Fiber on WebGPU, and vibe search runs fully in the browser with Transformers.js.",
    tags: ["TypeScript", "React Three Fiber", "WebGPU", "Transformers.js", "UMAP", "Next.js"],
    github: "https://github.com/aryansvt/cinema-cosmos",
    live: "https://cinema-cosmos.vercel.app",
  },
```

In `src/components/About.tsx`, after the Michels group sentence and before "Previously", add:

```tsx
          {" "}I also just started assisting with post-quantum cryptography research in{" "}
          <TextLink href={aboutLinks.karimLab}>Dr. Imtiaz Karim’s SysNets Lab</TextLink>.
```

In `package.json` scripts add `"test": "node --test scripts/content.test.mjs src/components/ascii/field.test.ts"`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test scripts/content.test.mjs`
Expected: 3 passing.

- [ ] **Step 5: Commit**

```bash
git add scripts/content.test.mjs src/content/projects.ts src/config/links.ts src/components/About.tsx package.json
git commit -m "Swap in Cinema Cosmos and add the SysNets Lab line"
```

### Task 2: ASCII math helpers

**Files:**
- Create: `src/components/ascii/field.ts`
- Create: `src/components/ascii/field.test.ts`
- Modify: `tsconfig.json` (add `"allowImportingTsExtensions": true` so the test can import `./field.ts`)

**Interfaces:**
- Produces:
  - `RAMP: string` glyph ramp from empty to dense.
  - `swell(x: number, z: number, t: number): number` returns 0..1 surface brightness at normalized column `x` (0..1), depth `z` (0 horizon .. 1 near), time `t` seconds.
  - `glyphFor(v: number): string` maps 0..1 to a `RAMP` character.
  - `BAYER4: number[]` 16 thresholds in 0..1.
  - `bayer(x: number, y: number): number` threshold for a cell.
  - `fitCanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number, maxDpr?: number): number` sizes the backing store, returns the dpr used (clamped to `maxDpr`, default 2).
  - `mulberry32(seed: number): () => number` seeded random.

- [ ] **Step 1: Write the failing test**

```ts
// src/components/ascii/field.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";

import { BAYER4, RAMP, bayer, fitCanvas, glyphFor, mulberry32, swell } from "./field.ts";

test("swell stays in range and is deterministic", () => {
  for (let i = 0; i < 200; i++) {
    const v = swell(i / 200, (i % 17) / 16, 3.5);
    assert.ok(v >= 0 && v <= 1, `out of range ${v}`);
    assert.equal(v, swell(i / 200, (i % 17) / 16, 3.5));
  }
});

test("glyph ramp covers both ends", () => {
  assert.equal(glyphFor(0), RAMP[0]);
  assert.equal(glyphFor(1), RAMP[RAMP.length - 1]);
  assert.equal(glyphFor(-5), RAMP[0]);
  assert.equal(glyphFor(9), RAMP[RAMP.length - 1]);
});

test("bayer thresholds are a permutation of 16 levels", () => {
  assert.equal(new Set(BAYER4).size, 16);
  assert.ok(BAYER4.every((v) => v > 0 && v < 1));
  assert.equal(bayer(4, 4), bayer(0, 0));
});

test("fitCanvas clamps dpr and sizes the backing store", () => {
  const canvas = { width: 0, height: 0, style: {} as Record<string, string> };
  (globalThis as { devicePixelRatio?: number }).devicePixelRatio = 3;
  const dpr = fitCanvas(canvas as unknown as HTMLCanvasElement, 100, 50);
  assert.equal(dpr, 2);
  assert.equal(canvas.width, 200);
  assert.equal(canvas.height, 100);
});

test("seeded random repeats", () => {
  const a = mulberry32(7);
  const b = mulberry32(7);
  assert.equal(a(), b());
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test src/components/ascii/field.test.ts`
Expected: FAIL, cannot find module `./field.ts`.

- [ ] **Step 3: Write the helpers**

```ts
// src/components/ascii/field.ts
// pure helpers shared by the ascii canvases

export const RAMP = " ..·:-~=+*#";

// layered sines seen in perspective: far rows compress, near rows swell
export function swell(x: number, z: number, t: number): number {
  const px = (x - 0.5) / (0.12 + z * 0.95);
  const v =
    Math.sin(px * 14 + z * 26 - t * 0.9) * 0.55 +
    Math.sin(px * 5.3 - z * 11 + t * 0.5 + 1.3) * 0.4 +
    Math.sin(px * 29 + z * 47 - t * 1.4 + 0.7) * 0.18;
  return Math.min(1, Math.max(0, (v + 1.13) / 2.26));
}

export function glyphFor(v: number): string {
  const i = Math.floor(Math.min(1, Math.max(0, v)) * (RAMP.length - 1) + 0.5);
  return RAMP[i];
}

// 4x4 ordered dither, offset by half a step so no threshold is 0 or 1
export const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16);

export function bayer(x: number, y: number): number {
  return BAYER4[(y & 3) * 4 + (x & 3)];
}

export function fitCanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number, maxDpr = 2): number {
  const dpr = Math.min(globalThis.devicePixelRatio || 1, maxDpr);
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  return dpr;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test src/components/ascii/field.test.ts` then `npm run typecheck`
Expected: 5 passing; typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/ascii/field.ts src/components/ascii/field.test.ts tsconfig.json
git commit -m "Add ascii field helpers with a node test"
```

### Task 3: Tokens, fonts, base layer, grain, glow

**Files:**
- Modify: `src/app/globals.css` (rewrite tokens and base; keep egg keyframes for Task 8)
- Modify: `src/app/layout.tsx`
- Modify: `src/components/CursorGlow.tsx` (no logic change; only the class names stay)

**Interfaces:**
- Produces CSS custom properties `--color-*` for every palette token, `--font-display`, `--font-body`, `--font-mono`, and the ground variables `--fg`, `--fg-soft`, `--rule`, `--accent` set by `[data-ground="paper" | "deep" | "abyss" | "sky"]`.
- Produces utility classes used by later tasks: `.t-display`, `.t-section`, `.t-item`, `.t-lead`, `.t-body`, `.t-mono`, `.wrap` (max 76rem with gutters), `.grid-12`, `.btn`, `.btn-solid`, `.btn-ghost`, `.btn-light`, `.chip`, `.hl`, `.egg`, `.reveal`.

- [ ] **Step 1: Fonts in `layout.tsx`**

```tsx
import { Hubot_Sans, Martian_Mono, Mona_Sans } from "next/font/google";

const hubot = Hubot_Sans({ variable: "--font-hubot", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const mona = Mona_Sans({ variable: "--font-mona", subsets: ["latin"], style: ["normal", "italic"], axes: ["wdth"], display: "swap" });
const martian = Martian_Mono({ variable: "--font-martian", subsets: ["latin"], axes: ["wdth"], display: "swap" });
```

Viewport: `themeColor: "#2B4BFF"`, `colorScheme: "light"`. Body renders `<CursorGlow />`, a `<div className="grain" aria-hidden="true" />`, then children and the JSON-LD script.

- [ ] **Step 2: Tokens and grounds in `globals.css`**

```css
@theme {
  --color-paper: #f2f6fb;
  --color-wash: #e3ecf8;
  --color-line: #d3deee;
  --color-ink: #0a1a3f;
  --color-ink-soft: #42557a;
  --color-signal: #2b4bff;
  --color-frost: #a8c4ff;
  --color-deep: #0a1a4a;
  --color-deep-raised: #102463;
  --color-ice: #e8efff;
  --color-ice-soft: #9fb2da;
  --color-abyss: #040a1c;
}

@theme inline {
  --font-display: var(--font-hubot), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-mona), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-martian), ui-monospace, monospace;
}

[data-ground="paper"] { --fg: var(--color-ink); --fg-soft: var(--color-ink-soft); --rule: var(--color-line); --accent: var(--color-signal); }
[data-ground="deep"] { --fg: var(--color-ice); --fg-soft: var(--color-ice-soft); --rule: rgb(168 196 255 / 0.16); --accent: var(--color-frost); background: var(--color-deep); }
[data-ground="abyss"] { --fg: var(--color-ice); --fg-soft: var(--color-ice-soft); --rule: rgb(168 196 255 / 0.14); --accent: var(--color-frost); background: var(--color-abyss); }
[data-ground="sky"] { --fg: #fff; --fg-soft: #dce6ff; --rule: rgb(232 239 255 / 0.4); --accent: #fff; }
```

Base: `html { background: var(--color-paper); color-scheme: light }`, body uses `--font-body`, `color: var(--fg)`; `:focus-visible` uses a 2px `--accent` outline with 3px offset; `::selection` signal background with white text; smooth scroll only with no-preference.

Grain: `.grain { position: fixed; inset: 0; z-index: 60; pointer-events: none; opacity: 0.05; background-image: url("data:image/svg+xml,...feTurbulence baseFrequency 0.85...") }`, `mix-blend-mode: multiply` off for dark areas is not needed at this opacity.

Glow: `.glow` fixed, `z-index: 0`, placed first in body so band backgrounds sit under it and positioned content (`.wrap { position: relative }`) sits over it. `.glow-light` radial `rgb(43 75 255 / 0.10)` center to transparent, 34rem. Same media query gate as before.

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run lint`
Expected: clean. Page will look broken until later tasks, which is fine.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/CursorGlow.tsx
git commit -m "Set up cold blue tokens, fonts, grounds, grain, and glow"
```

### Task 4: ASCII canvases

**Files:**
- Create: `src/components/ascii/AsciiSea.tsx`
- Create: `src/components/ascii/DitherEdge.tsx`
- Create: `src/components/ascii/Horizon.tsx`

**Interfaces:**
- Consumes: `swell`, `glyphFor`, `bayer`, `fitCanvas`, `mulberry32` from Task 2.
- Produces:
  - `<AsciiSea className?: string />` fills its parent (absolute), aria-hidden.
  - `<DitherEdge from: string to: string flip?: boolean />` a 28px tall full-width strip dithering from color `from` (top) to `to` (bottom); `flip` reverses. Develops once on first intersection.
  - `<Horizon />` fills its parent, aria-hidden, draws once.

- [ ] **Step 1: AsciiSea**

Behavior:
- Measures its box with a `ResizeObserver`; `fitCanvas` per resize; cell size 9px wide by 12px tall on desktop, 8 by 11 under 640px.
- Pre-renders each `RAMP` glyph in two tones (ice for the far 30% of rows, frost for the rest) into an offscreen atlas canvas with `font: 11px var(--font-martian)` read from `getComputedStyle(document.body).getPropertyValue("--font-martian")`, then `drawImage` per cell.
- Row depth `z = ((row + 1) / rows) ** 1.5`; alpha `0.3 + z * 0.7`; glyph `glyphFor(swell(x, z, t) ** 1.7 * (0.18 + z * 0.82) + wake)`.
- Wake: keep up to 12 ripples `{x, y, t0}` from `pointermove` (mouse, throttled to one per 60ms and only when moved more than 24px) and `pointerdown` (any pointer). Each ripple adds `0.55 * exp(-age * 2.4) * exp(-((d - age * 220) ** 2) / 900)` where `d` is cell distance in px, so a ring travels out and fades in about a second.
- Animates with `requestAnimationFrame` at most 30fps; pauses when off screen (`IntersectionObserver`) or `document.hidden`.
- Reduced motion: draws one frame at `t = 0`, attaches no pointer listeners, starts no loop. Listens to the media query and redraws on change.

- [ ] **Step 2: DitherEdge**

Behavior:
- Canvas 28px tall, full width, pixel size 4px (`imageSmoothingEnabled = false`, `image-rendering: pixelated`).
- For each pixel cell at row `y` the gradient value is `g = (y + 0.5) / rows`; paint `to` when `g > bayer(x, y) * progress + (1 - progress)`; with `progress = 1` the edge is a full dithered gradient.
- On first intersection animates `progress` from 0 to 1 over 700ms with ease-out; reduced motion paints `progress = 1` immediately.
- Redraws on resize.

- [ ] **Step 3: Horizon**

Behavior:
- Draws once (and on resize) about `width * 0.6` stipple dots with `mulberry32(7)`: x uniform, a peak function `exp(-cx² * 28) * 0.55h + exp(-c2² * 90) * 0.28h` centered at 55% and 62% of width, 62% of dots above the line with `pow(r, 2.2) * peak`, the rest below with `pow(r, 3) * 0.27h`.
- Dot color ice or frost at alpha 0.25 to 0.85, size 1 or 1.6 css px.
- One horizontal line at 68% height with a horizontal alpha gradient peaking at 55%.

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run lint && npm test`
Expected: clean, tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ascii
git commit -m "Add the ascii sea, dither edge, and horizon canvases"
```

### Task 5: Header, hero, scramble, page shell

**Files:**
- Create: `src/components/SiteHeader.tsx`, `src/components/Hero.tsx`, `src/components/Scramble.tsx`
- Modify: `src/app/page.tsx`, `src/content/sections.ts`
- Modify: `src/components/icons.tsx` (add `ArrowUpRight`, `ArrowUp`, `MailIcon`, `LinkedInIcon`, `MenuIcon`)
- Delete: `src/components/Sidebar.tsx`, `src/components/RouteNav.tsx`

**Interfaces:**
- Consumes: `AsciiSea`, `DitherEdge` (Task 4); `contact`, `resumePath` from `src/config/links.ts`; `site` from `src/config/site.ts`.
- Produces: `sections` gains `index: "01" | "02" | "03" | "04"`; `<Scramble text: string className?: string />`.

- [ ] **Step 0: Source from the UI library pool**

Run the ui-library-pool skill for the pieces this task and Task 6 build: floating pill nav with sliding indicator, scramble text, animated buttons, halftone hover. Take the best fit per piece on quality, adapt it to these tokens and plain components (the project has no shadcn setup), and record each source in the final summary. Hand-build only what the pool cannot supply.

- [ ] **Step 1: Scramble**

Renders `<span aria-label={text}><span aria-hidden="true">{shown}</span></span>`; on first intersection cycles each character through random glyphs from `"/\\|-_=+*#"` and settles left to right over about 360ms (one char settles per frame step); spaces and slashes never scramble. Reduced motion or no JS: shows `text` from the first render (initial state is the final text; scrambling starts only inside the effect).

- [ ] **Step 2: SiteHeader**

- Fixed pill, centered, `top: 12px` (20px from 1024px up), frosted `rgb(247 250 255 / 0.82)` with `backdrop-filter: blur(16px) saturate(1.4)`, 1px white/60 border, soft deep shadow.
- Monogram link to `#top` (deep circle, "AA" in Hubot Sans 900 wdth 125).
- Desktop (`md` up): four section links plus a sliding indicator (an absolutely positioned frost-wash pill whose `transform` and `width` come from the active link's `offsetLeft` and `offsetWidth`, 300ms ease-out transition, no transition on first placement). Active section comes from the RouteNav measurement logic, moved into this component: the last section whose top is above 40% of the viewport, the last one when scrolled to the bottom, and none while the hero is in view.
- Resume button (signal, white text, arrow icon that nudges up-right on hover).
- Phones: Menu button with `popovertarget="site-menu"`; the panel is `<div id="site-menu" popover>` positioned under the pill with the four sections, Email, LinkedIn, GitHub. Links call `hidePopover()` on click. Enter animation with `@starting-style` (opacity and translateY 8px and scale 0.98, 220ms), items stagger 30ms.
- Scroll progress: a 2px signal line along the pill's bottom inside the radius, `scaleX` driven by `animation-timeline: scroll(root)` inside `@supports`.

- [ ] **Step 3: Hero**

```tsx
<section id="top" data-ground="sky" className="hero">
  <div className="wrap hero-copy">
    <p className="t-mono hero-kicker"><Scramble text="AI engineering / Data science / Full-stack" /></p>
    <h1 className="t-display hero-name"><span className="line"><span>Aryan</span></span> <span className="line"><span>Achar</span></span></h1>
    <p className="hero-title">{site.title}</p>
    <p className="hero-tagline">{site.tagline}</p>
    <div className="hero-actions">
      <a className="btn btn-light" href={resumePath} target="_blank" rel="noopener noreferrer">View resume <ArrowUpRight /></a>
      <a className="btn btn-ghost" href={`mailto:${contact.email}`}><MailIcon /> Email</a>
      <a className="btn btn-ghost" href={contact.linkedin} ...><LinkedInIcon /> LinkedIn</a>
      <a className="btn btn-ghost" href={contact.github} ...><GitHubIcon /> GitHub</a>
    </div>
  </div>
  <div className="hero-sea" aria-hidden="true"><span className="hero-horizon" /><AsciiSea /></div>
  <DitherEdge from="transparent" to="var(--color-paper)" />
</section>
```

- Sky gradient `linear-gradient(#2b4bff 0%, #1b36cc 48%, #0a1a4a 72%, #081540 100%)`, `min-height: 100svh` (at least 640px), the sea occupies the bottom 42%.
- Name: Hubot Sans 900, `font-variation-settings: "wdth" 125`, uppercase, `font-size: clamp(3.4rem, 9.6vw, 9.5rem)`, line-height 0.88, tracking -0.025em, one line from 640px up, two lines below. Entrance: each `.line > span` rises from `translateY(105%)` behind `overflow: clip`, 700ms `cubic-bezier(0.22, 1, 0.36, 1)`, 90ms stagger; title, tagline, actions fade up after; the sea fades in over 1.2s.
- `DitherEdge` must accept CSS variables: resolve `from`/`to` with `getComputedStyle` on the canvas parent.

- [ ] **Step 4: Page shell**

`page.tsx`: skip link, `<SiteHeader />`, `<Hero />`, `<main id="content">` with `<div data-ground="paper">` holding About and Experience, a deep band (`DitherEdge` paper to deep, Projects, `DitherEdge` deep to paper flipped), a paper block with Skills, then `<Contact />`.

- [ ] **Step 5: Verify and commit**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: clean build.

```bash
git add -A src
git commit -m "Build the header pill, hero band, and page shell"
```

### Task 6: Sections

**Files:**
- Modify: `src/components/Section.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Skills.tsx`, `TextLink.tsx`, `Tags.tsx`

**Interfaces:**
- Consumes: `sections` with `index` (Task 5), `Scramble` (Task 5), tokens (Task 3).
- Produces: `Section({ id, children })` looks up its index and label from `sections`.

- [ ] **Step 1: Section shell**

```tsx
export function Section({ id, children }: { id: (typeof sections)[number]["id"]; children: React.ReactNode }) {
  const s = sections.find((x) => x.id === id)!;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section wrap grid-12">
      <header className="section-label">
        <p className="t-mono section-index"><Scramble text={s.index} /></p>
        <h2 id={`${id}-title`} className="t-section">{s.label}</h2>
      </header>
      <div className="section-body">{children}</div>
    </section>
  );
}
```

Label spans 4 columns and is `position: sticky; top: 7rem` from 1024px; body spans 8. Under 1024px both span all columns.

- [ ] **Step 2: About**

Lead paragraph (first sentence of the old first paragraph) in `.t-lead`; the rest of paragraph one, paragraph two with the SysNets line from Task 1, and paragraph three with the eggs in `.t-body` using `--fg-soft`, links in `.hl`.

- [ ] **Step 3: Experience**

Each role: `<li className="role">` grid of a 9rem date column (mono, "Sept 2026" over "to Present") and the body; current roles show `<span className="now"><span className="now-dot" />Now</span>` with a sonar ping (`box-shadow` ring scaling out every 2.4s, off with reduced motion). Title `.t-item`, org as `TextLink` when it has a URL, place after a middle dot, blurb, `Tags`. Hairline between rows.

- [ ] **Step 4: Projects**

Rows on the deep ground: `.project` with a halftone hover layer (`::before` radial-gradient dot grid of frost at 0.16 alpha, 6px pitch, masked by a linear gradient whose `mask-position` slides from -100% to 0 on hover, 500ms ease-out). Title row: mono number, `.t-item` title in Hubot Sans 800 wdth 125, links on the right (`GitHub`, `Live site` when present) with arrow icons that nudge 2px up-right on hover. Blurb in `--fg-soft`, then `Tags`. The whole row is not a link.

- [ ] **Step 5: Skills**

Rows with a mono label column (10rem) and chips (`.chip`: 1px line border, white/60 fill, Mona Sans 500 15px). On the deep ground, chips use frost at 0.1 alpha.

- [ ] **Step 6: Scroll reveals**

Add `.reveal` to each section body child, each role, each project row, and each skills row. The class only animates inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`: `animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 35%;` with `@keyframes reveal { from { opacity: 0; translate: 0 12px } }`. Elsewhere the content is simply visible.

- [ ] **Step 7: Verify and commit**

Run: `npm run typecheck && npm run lint && npm test && npm run build`

```bash
git add -A src
git commit -m "Rebuild About, Experience, Projects, and Skills in the new system"
```

### Task 7: Contact close

**Files:**
- Create: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: `Horizon`, `DitherEdge`, `contact`, `resumePath`, icons.

- [ ] **Step 1: Build it**

`<footer data-ground="abyss">`: `DitherEdge` paper to abyss, then `.wrap` with mono "05", "Say hi." in `.t-display` (clamp 3.5rem to 8.5rem), the line "I’m always up for talking about a project, research, or a good film.", the email as a large Hubot Sans 700 link with a frost underline that draws on hover, then LinkedIn and GitHub ghost buttons and a solid "View resume" button. Below: a 220px `Horizon`, then a row with the build credit "Built with Next.js and TypeScript, set in Hubot Sans, Mona Sans, and Martian Mono, and hosted on Vercel." and a "Back to top" link to `#top` with an arrow that rises on hover.

- [ ] **Step 2: Verify and commit**

Run: `npm run typecheck && npm run lint && npm run build`

```bash
git add src/components/Contact.tsx src/app/page.tsx
git commit -m "Add the contact close with the stippled horizon"
```

### Task 8: Eggs, OG image, favicon, README

**Files:**
- Modify: `src/app/globals.css` (egg styles), `src/components/eggs/FilmEnvelope.tsx` (gradient stops only)
- Modify: `src/app/og.png/route.tsx`, `src/app/icon.svg`
- Replace: `src/app/_og/*.ttf` with static Hubot Sans Expanded Black, Mona Sans Medium, Martian Mono Regular, plus their OFL texts
- Modify: `README.md`

- [ ] **Step 1: Restyle the eggs**

- Swish rim stroke `#2b4bff`, net stroke `#6f8fd9` at 0.9 so both read on paper and deep.
- `.egg` trigger: ink text with a dotted signal underline; pressed or hovered turns signal.
- Envelope: lining gradients become abyss velvet (`#0d1a44` to `#040a1c`), fold highlights frost at 0.08; seal gradients become deep blue wax (`#3a5cff` to `#0a1a4a`) with frost rim highlights; card title "Silencio." in Mona Sans italic; drop shadows tinted `#061238`.

- [ ] **Step 2: OG image and favicon**

OG: 1200x630, sky gradient top to deep, name in Hubot Sans Expanded Black, title and tagline in Mona Sans, a row of ASCII sea glyphs along the bottom drawn as text in Martian Mono. Favicon: deep rounded square with "A" mark in ice and a signal horizon line.

- [ ] **Step 3: README**

Update the "Where things live", easter egg, cursor glow, and fonts sections to the new names, colors, and files. Remove plum and wine mentions.

- [ ] **Step 4: Verify and commit**

Run: `npm run build` and open `out/og.png`.

```bash
git add -A src README.md
git commit -m "Restyle the easter eggs, social image, favicon, and README"
```

### Task 9: Verification, polish, review

- [ ] **Step 1:** `npm test && npm run typecheck && npm run lint && npm run build`.
- [ ] **Step 2:** Serve `out/` and screenshot at 1440 and 390 wide (full page) into `.impeccable/review/desktop.png` and `mobile.png`; also check 1280 and 768.
- [ ] **Step 3:** Check reduced motion (emulated), keyboard tab order and focus rings, touch emulation for the menu and sea taps, and Firefox-like no-scroll-timeline behavior (temporarily disable the `@supports` block).
- [ ] **Step 4:** Critique with emil-design-eng and impeccable; fix in one batch; one confirming screenshot round.
- [ ] **Step 5:** Run `impeccable detect --json`, then the impeccable finish reviewer and documenter (DESIGN.md plus `.impeccable/design.json`).
- [ ] **Step 6:** `/ponytail-review` on the diff and break-ui on the project rows, experience rows, and header; apply what makes sense.
- [ ] **Step 7:** Commit, then finish the branch with a merge into main.
