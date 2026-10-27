# Breadcrumbs, project archive, next up, resume swap

Date: 2026-10-27. Requested by Aryan; design questions answered by Claude (his standing instruction), marked "my call".

## Intent

Breadcrumbs won the Vultr track at HackTX 2026 and should lead the homepage projects. Older and smaller projects deserve a home without crowding the four homepage rows, so a full archive page lists all eight public projects. About gets a light "next up" note (HackUTD 2026), and every resume link points at the new PDF.

## Goals

1. Homepage Projects stays at four rows: Breadcrumbs (first), LineFinder, Cinema Cosmos, NBA Shot Quality Model. Multi-CSV AI Data Assistant leaves the homepage.
2. Breadcrumbs carries a "Winner · Vultr Track, HackTX 2026" badge and slightly more emphasis than the other rows. Copy, tags, and links (live, GitHub, Devpost) exactly as given.
3. A "View full project archive" link closes the Projects section and opens `/archive`.
4. `/archive` is a table of all eight public projects, newest first: Date (e.g. "Oct 2026") | Project | Built with | Live site | GitHub. Phones hide Built with.
5. About shows a small "Next up" line whose text lives in `src/config/site.ts`. An empty string hides it.
6. All resume links point at `/PortfolioResumeNoGPA.pdf`; the old PDF is removed.

## Non-goals and anti-goals

- No new colors, fonts, or dependencies. Everything reads the ground variables (the Remap Rule).
- No cards, shadows on in-flow content, or eyebrows above headings (DESIGN.md).
- No emoji, no em dashes, no invented facts or dates.
- No row click targets in the archive; links stay explicit.

## Data (single source)

`src/content/projects.ts` holds every public project once, newest first, with `date` as `YYYY-MM`. Homepage-only fields (`blurb`, `award`, `devpost`) are optional. A `featured` list picks the four homepage rows by name, in homepage order (my call: keeps LineFinder ahead of Cinema Cosmos as it is today). The Multi-CSV blurb is dropped since nothing renders it anymore (it stays in git history).

Dates, newest first (sources: Aryan's resume, then the first commit of each repo):

| Project | Date | Source |
|---|---|---|
| Breadcrumbs | Oct 2026 | resume + repo |
| Cinema Cosmos | Oct 2026 | repo (all commits Oct 8) |
| LineFinder | Sep 2026 | resume + repo |
| Multi-CSV AI Data Assistant | Aug 2026 | repo (Aug 11) |
| Real-Time Particle Effects Engine | May 2026 | repo of the revamp; original may be older (flag) |
| NBA Shot Quality Model | Apr 2026 | resume; repo published Sep 2026 (flag) |
| Credit Default Risk Benchmark | Apr 2026 | repo (Apr 11) |
| Esports Stats Analyzer | Apr 2026 | repo upload; README says it was built earlier (flag) |

Stacks come from the existing site data, READMEs, and dependency files. Particle engine: C++, OpenGL, GLSL, GLFW, GLM, ImGui, CMake. Esports: Python, Pandas, SQLite, Streamlit, Plotly. Credit default: the tags it had on the old site.

## Homepage changes (my calls)

- **Badge:** a pill below the Breadcrumbs title row (never above it), condensed mono uppercase, frost on the deep band with a hairline frost ring and a small star mark in SVG. Static.
- **Emphasis:** the Breadcrumbs row keeps a faint resting halftone (the same dot screen the rows wipe in on hover), which fills fully on hover. Uses the system's own print language, no new treatment.
- **Links:** GitHub, Live site, Devpost, same `project-link` style.
- **Archive link:** after the list, a hairline above it, frost text with the hairline draw and a right arrow that nudges right on hover.

## Archive page (my calls)

- Route `src/app/archive/page.tsx`, static, own title, description, and canonical; added to the sitemap.
- Composition mirrors the home in short: the header pill, a compact sky band with the title "Archive" rising out of a mask like the hero name, a back link to the homepage and one intro line, a dither edge into paper, the table on paper, then the existing contact close in the abyss. Grounds go sky, paper, abyss (the Sinking Rule).
- Header pill section links become `/#id` so they work from any page; on the home they stay same-document jumps. The scroll spy never marks a section current on a page without sections.
- Table: real `<table>` with a hidden caption. Mono header labels, hairline rows, mono dates in `<time>`, project names in Hubot Sans 700, chips for stacks. Live site shows the bare domain with an up-right arrow and hairline draw; GitHub is the GitHub mark. Rows tint with wash on hover (fine pointers only) to help scanning across columns. Breadcrumbs gets a small "Winner" chip next to its name.
- Below 768px: Built with hides; Live site and GitHub collapse to icon links with 40px targets and visually hidden header labels.
- Motion: title rise, intro fade-up, rows fade up in a short stagger on load. All off under reduced motion.

## About next up (my calls)

`site.nextUp` in `src/config/site.ts`, text "I’ll be at HackUTD 2026." Rendered at the end of About as a small mono "Next up" pill (hollow dot, so it reads as upcoming rather than the pulsing "Now") followed by the text in body size. Empty string renders nothing.

## Resume

Move `PortfolioResumeNoGPA.pdf` into `public/`, point `resumePath` at it, delete `public/aryan-achar-resume.pdf` (only `resumePath` referenced it), update README and PRODUCT.md.

## Checks

`scripts/content.test.mjs` asserts: featured order and size, no Multi-CSV on the homepage, Breadcrumbs award, eight archive entries sorted newest first, resume file exists and the old one is gone, next up text lives in config. Lint, typecheck, build, then screenshots at 1440 and 390 wide.
