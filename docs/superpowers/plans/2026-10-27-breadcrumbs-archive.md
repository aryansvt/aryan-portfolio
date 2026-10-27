# Breadcrumbs, Archive, Next Up, Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lead the homepage projects with the award-winning Breadcrumbs, add a `/archive` table of all eight public projects, a config-driven "next up" line in About, and swap the resume PDF.

**Architecture:** One `projects` array (newest first) feeds both the homepage (`featured`, picked by name) and the archive table. The archive is a second static route that reuses the header pill, the sky ground, the dither edge, and the contact close. All styling goes in `src/app/globals.css` using ground variables.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Tailwind 4, `node --test`.

**Spec:** `docs/superpowers/specs/2026-10-27-breadcrumbs-archive-design.md`

## Global Constraints

- No new dependencies, colors, or fonts. Components read `--fg`, `--fg-soft`, `--rule`, `--accent`, `--chip-bg`, `--chip-fg`.
- No em dashes anywhere in `src/` (existing test enforces it). No emoji.
- Badge text exactly: `Winner · Vultr Track, HackTX 2026`.
- Breadcrumbs blurb, tags, and links exactly as in the spec.
- Motion uses `var(--ease-out)`, 160 to 420ms for interaction, off under `prefers-reduced-motion: reduce`; hover only under `(hover: hover) and (pointer: fine)`.
- Short lowercase code comments.

## Review Focus

1. A project with no live site in the archive: the Live site cell is empty, not a dead link or a stray icon.
2. Phone width (390px): the archive table never scrolls sideways; Built with hidden; link targets at least 40px.
3. The header pill on `/archive`: no section shows as current at the bottom of the page; section links go to the homepage sections.
4. `site.nextUp` set to `""`: About renders no empty pill.
5. Long tag lists (Breadcrumbs has 10): the homepage row and the archive row wrap cleanly.

Tests for 1 and 4 live in Task 1's content test (data shape) and the visual pass in Task 5; 2, 3, and 5 are checked in Task 5 screenshots.

---

### Task 1: Project data, config, resume, and content tests

**Files:**
- Modify: `src/content/projects.ts`, `src/config/site.ts`, `src/config/links.ts:17`, `scripts/content.test.mjs`
- Move: `PortfolioResumeNoGPA.pdf` to `public/PortfolioResumeNoGPA.pdf`; delete `public/aryan-achar-resume.pdf`

**Interfaces:**
- Produces: `type Project = { name: string; date: string /* YYYY-MM */; tags: string[]; github: string; live?: string; devpost?: string; blurb?: string; award?: string }`, `projects: Project[]` (8, newest first), `featured: Project[]` (Breadcrumbs, LineFinder, Cinema Cosmos, NBA Shot Quality Model), `site.nextUp: string`, `resumePath = "/PortfolioResumeNoGPA.pdf"`.

- [ ] **Step 1: Rewrite the content tests** (replace the "cinema cosmos replaces credit default" test; keep the SysNets and em dash tests). Tests read source text, as the file does today:
  - `featured` names, in order: `["Breadcrumbs", "LineFinder", "Cinema Cosmos", "NBA Shot Quality Model"]` (match the `featured` name list literal).
  - every `date: "YYYY-MM"` in `projects.ts` appears 8 times and is non-increasing.
  - `projects.ts` contains `award: "Winner · Vultr Track, HackTX 2026"` and `https://devpost.com/software/naps-hack-project`.
  - Multi-CSV has no `blurb` (homepage never shows it).
  - `public/PortfolioResumeNoGPA.pdf` exists, `public/aryan-achar-resume.pdf` does not, `links.ts` has `resumePath = "/PortfolioResumeNoGPA.pdf"`.
  - `site.ts` has `nextUp:` and `About.tsx` reads `site.nextUp` and does not contain `HackUTD`.
- [ ] **Step 2: Run `npm test`.** Expected: the new tests fail.
- [ ] **Step 3: Implement the data, config, and file moves** per the interfaces and the spec's date and stack table.
- [ ] **Step 4: Run `npm test`.** Expected: all pass except the About check, which Task 3 turns green.

### Task 2: Homepage Breadcrumbs row and archive link

**Files:** Modify `src/components/Projects.tsx`, `src/components/icons.tsx`, `src/app/globals.css`

**Interfaces:** Consumes `featured`. Produces `ArrowRight` and `StarIcon` in `icons.tsx` (same `IconProps`, 14px).

- [ ] **Step 1:** Render `featured`. When `award` is set: add `data-award` to the article (CSS keeps a faint resting halftone, full on hover) and a `.award` pill after the head with `StarIcon` and the award text. Links: GitHub, Live site, Devpost.
- [ ] **Step 2:** After the list, `<a href="/archive" className="archive-cta">View full project archive <ArrowRight className="nudge" /></a>` above a hairline; nudge moves right on hover.
- [ ] **Step 3:** `npm run lint && npm run typecheck`. Expected: clean.

### Task 3: About next up

**Files:** Modify `src/components/About.tsx`, `src/app/globals.css`

- [ ] **Step 1:** When `site.nextUp` is non-empty, render `<p className="next-up reveal">` with a `.next-up-tag` (hollow dot + "Next up") and the text.
- [ ] **Step 2:** `npm test`. Expected: all pass.

### Task 4: Archive page

**Files:**
- Create: `src/app/archive/page.tsx`
- Modify: `src/components/SiteHeader.tsx` (links to `/#id`, no current section without sections), `src/app/sitemap.ts`, `src/components/icons.tsx` (`GlobeIcon`), `src/app/globals.css`

**Interfaces:** Consumes `projects`, `SiteHeader`, `DitherEdge`, `Contact`, `Tags`, icons.

- [ ] **Step 1:** Page metadata: title `Archive | Aryan Achar`, description of the archive, `alternates.canonical: "/archive"`.
- [ ] **Step 2:** Sky header band `id="top"` with back link, `h1` "Archive" (mask rise), one intro line, `DitherEdge` into paper. Paper `<main>` with the table. `<Contact />` closes.
- [ ] **Step 3:** Table per spec: `<caption className="sr-only">`, `<time dateTime={date}>` formatted `Oct 2026` via `toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })`, Breadcrumbs gets a small "Winner" chip, domain text from `new URL(live).host`.
- [ ] **Step 4:** Sitemap adds `${SITE_URL}/archive`.
- [ ] **Step 5:** `npm run lint && npm run typecheck && npm test && npm run build`. Expected: clean, `out/archive.html` exists.

### Task 5: Visual pass, reviews, docs, commit

- [ ] **Step 1:** `npm run preview`, screenshot `/` and `/archive` at 1440x900 and 390x844 (full height) with headless Edge; check Review Focus items 2, 3, 5.
- [ ] **Step 2:** Critique with review-animations and impeccable; iterate until polished.
- [ ] **Step 3:** `/ponytail-review` and break-ui on the archive table and the Breadcrumbs row; apply what makes sense.
- [ ] **Step 4:** Update README (resume path, archive, next up) and PRODUCT.md (resume path, archive page).
- [ ] **Step 5:** Commit on main.
