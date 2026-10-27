# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: recruiters and hiring managers who skim quickly and then open the resume, LinkedIn, or email. Secondary: engineers and researchers who judge technical depth through projects, GitHub, and live demos.

## Product Purpose
Personal portfolio for Aryan Achar, a Computer Science student at UT Dallas working across AI engineering, data science, and full-stack development. It exists to get him internships and entry-level roles and to open research conversations. Success is a visitor reaching the resume, a contact link, or a project repo or demo.

## Positioning
Serious applied engineering (a custom RAPTOR-style transit routing engine, a 3D galaxy of 5,000 films searchable by feel in the browser, validated LLM plans executed deterministically, an ML pipeline on 128K NBA shots) presented in a friendly, human voice with small crafted details. Both halves are claimed together.

## Operating Context
Visitors arrive from a resume, LinkedIn, or an application link and often on a phone. The homepage is a hero with the name, title, tagline, and the resume and contact links, then four sections (About, Experience, Projects, Skills), then a contact close. A second page, `/archive`, lists every public project in a table.

## Capabilities and Constraints
- Next.js, TypeScript, Tailwind, exported as a static site and hosted on Vercel at https://www.aryanachar.com. No server runtime or runtime data fetching.
- Content lives in `src/content/*.ts`, `src/config/*.ts`, and `src/components/About.tsx`.
- Homepage with four sections (About, Experience, Projects, Skills) and four featured projects; `/archive` holds the full project list.
- Easter eggs are intentional identity and must stay: the basketball cursor and hoop (About, "basketball") and the film envelope ("watching films"). Neither may block clicks. Both respect reduced motion. Both are restyled to the cold blue world.
- A faint cold blue cursor glow runs for mouse users only and is off with reduced motion.
- No em dashes or AI-sounding copy anywhere on the site.
- Links with empty URLs render as non-clickable highlighted text so the site never shows a dead link.

## Visual Direction
The old plum and wine, serif, two-column sidebar design is retired. Do not bring any of it back.

- Feel: sleek, clean, and professional, but it pops. Cool and chilly, like cold air and deep water. Enticing to explore, easy for a recruiter to scan.
- Palette: blues only, with hints of black where needed. A bright electric blue, a light frost blue, a deep dark blue, and a near-black abyss. No warm colors anywhere except the basketball itself.
- Typography: Hubot Sans for display (wide, heavy, cold), Mona Sans for body text, Martian Mono for small labels, dates, and the ASCII accents.
- Clean, modern design first. ASCII art and film grain are accents, used in a few deliberate spots only (the hero visual, section transitions, a faint texture layer). Everything else stays crisp, with lots of clean space. If an accent competes with content, it gets pulled back.
- Accents never hurt readability. Decorative ASCII is `aria-hidden` and respects reduced motion.
- Detailed, interactive, and full of purposeful motion: entrances, hover and press states, layout transitions. Every animation has a job, feels fast, and respects reduced motion. Nothing gimmicky.
- Inspiration lives in `design-refs/`: dithered landscapes in fog, cold blue film haze, a stippled particle horizon on black, and an electric blue halftone brand system. They set the vibe and are not to be copied.

## Brand Commitments
Name: Aryan Achar. Title: Software Engineer. First-person, friendly copy ("Hi! I'm Aryan"). Fonts are Hubot Sans, Mona Sans, and Martian Mono.

## Evidence on Hand
Real projects with GitHub links and some live demos (Breadcrumbs, LineFinder, Cinema Cosmos, NBA Shot Quality Model), one real award (Breadcrumbs won the Vultr track at HackTX 2026), a resume PDF (`public/Aryan-Achar-Resume.pdf`), real roles (Innowhyte AI Engineer Intern, UT Dallas spatial data science research, UT Dallas OIT Support Desk). Aryan has also just started assisting with post-quantum cryptography research in Dr. Imtiaz Karim's SysNets Lab at UT Dallas; it is mentioned modestly in About and is not an Experience entry. No testimonials, customer logos, press, or usage metrics exist. Do not fabricate any.

## Product Principles
1. Substance first: every project and role states what was built and how, in specifics a skimmer can verify.
2. The shortest path to the resume, contact links, and repos is always visible.
3. Personality is earned by craft and small details, not decoration or filler.
4. Never invent proof; absent evidence stays absent.
5. Fast, static, and fully usable on a phone.

## Accessibility & Inclusion
Reduced motion must be honored by every animation and easter egg. Touch devices must get a complete experience without hover or cursor effects. Text contrast meets WCAG AA on every ground, light and dark.
