# Portfolio redesign: cold prints

Date: 2026-10-15
Branch: `redesign`

## Goal

Replace the plum and wine, serif, two-column sidebar portfolio with a new visual world: sleek, clean, professional, and cold, like cold air and deep water, while still popping and inviting exploration. Recruiters must be able to scan it in seconds on a laptop or a phone. Content and behavior stay the same except for two content changes.

## What stays

- Every role, project (minus one), skill, link, and the resume PDF.
- About copy, with one line added.
- The two easter eggs (basketball cursor, film envelope) and the cursor glow, restyled.
- Static export on Vercel, metadata, sitemap, robots, JSON-LD, the OG image route.
- Empty-URL links render as plain highlighted text.
- No em dashes, no AI-sounding copy.

## Content changes

1. Projects: remove Credit Default Risk Benchmark. Add Cinema Cosmos as the second project (live https://cinema-cosmos.vercel.app, repo https://github.com/aryansvt/cinema-cosmos). Blurb drawn from its README: about 5,000 films placed by feel (plot, themes, poster color) instead of genre, laid out with UMAP, rendered with React Three Fiber on WebGPU, vibe search running fully in the browser with Transformers.js.
2. About: one modest sentence that Aryan has also just started assisting with post-quantum cryptography research in Dr. Imtiaz Karim's SysNets Lab, linked to https://www.imtiazkarim.net/. Not added to Experience.

## Direction

Cyanotype prints, translated into the pinned cold blue palette. The page is a sheet of cold white paper carrying deep blue "exposed" bands. Reading-heavy sections sit on paper; the hero, Projects, and the contact close are full-bleed blue bands that get deeper as you scroll (bright, then deep, then abyss), so scrolling reads as a descent from cold air into deep water. Band edges are ordered-dither transitions, the ASCII accent the brief asked for at section boundaries.

Raises kept from the challengers the direction beat (disciplines, not motifs):

- Horizon (from the retro grid): one horizon line organizes the hero sea, echoed once by the stippled horizon in the close.
- Density encodes attention (from the moire gallery): ASCII and halftone density thins wherever text needs to be read and thickens where nothing is asked; project rows fill with halftone on hover.
- Spot-ink discipline (from risograph): exactly four blues plus paper and abyss, no decorative gradients beyond the hero sky.
- Character cells (from the split-flap board): mono index labels resolve character by character on entrance.
- Fading wake (from bioluminescent plankton): the pointer leaves a ripple wake in the hero sea that fades over about a second.

## Palette

| Token | Hex | Role |
|---|---|---|
| paper | #F2F6FB | page ground, cold white |
| frost-wash | #E3ECF8 | chips, quiet fills on paper |
| line | #D3DEEE | hairlines on paper |
| ink | #0A1A3F | primary text on paper |
| ink-soft | #42557A | secondary text on paper (6.9:1) |
| signal | #2B4BFF | bright blue: actions, links, active states, hero sky (5.4:1 on paper) |
| frost | #A8C4FF | light blue: accents and ASCII on deep grounds (9.5:1 on deep) |
| deep | #0A1A4A | deep dark blue band ground |
| deep-raised | #102463 | raised surfaces on deep |
| ice | #E8EFFF | primary text on deep |
| ice-soft | #9FB2DA | secondary text on deep (7.8:1) |
| abyss | #040A1C | near-black, the contact close |

Warm color appears only on the basketball.

## Typography

- Display: Hubot Sans, 800 to 900, width 112 to 125, uppercase, slightly tight tracking. Name, section titles, project titles.
- Body: Mona Sans, 400 to 500, width 100. Lead paragraph about 1.5rem, body about 1.0625rem at 1.65 line height.
- Mono: Martian Mono, 400, narrow width, small uppercase labels: section indexes, dates, tags, the ASCII art.

All three load through `next/font/google` with the width axis.

## Page structure

1. **Header**: a floating frosted pill fixed at the top, the same colors over every ground. Monogram, section links with a sliding active indicator, and a Resume button. A 2px scroll progress line along its bottom edge (CSS scroll timeline, progressive). On phones: monogram, Resume, and a Menu button that opens a native `popover` panel with the sections and contact links.
2. **Hero band** (full viewport): sky gradient from signal down to deep. Small mono kicker with the three focus areas, the name huge in Hubot Sans, title and tagline, primary "View resume" button and secondary email, LinkedIn, and GitHub links. The bottom 45% is the ASCII sea: a canvas of Martian Mono characters driven by a slow swell field with perspective toward a single horizon line, frost and ice glyphs on deep, density thinning behind text. Pointer movement leaves a fading ripple wake; taps do the same on touch. Static single frame with reduced motion. Bottom edge dithers into paper.
3. **About** (paper): section label column (mono index plus Hubot Sans title, sticky on desktop) and a content column. Lead paragraph, then the remaining paragraphs with links and both easter egg triggers.
4. **Experience** (paper): roles as rows. Dates in mono, title, org, place, blurb, tags. Current roles carry a "Now" chip with a slow sonar ping.
5. **Projects band** (deep, dithered top and bottom edges): four projects as full-width rows, not a card grid. Large mono number and Hubot Sans title on the left; blurb, tags, and GitHub and Live links on the right. Hovering a row fills it with a halftone sweep and nudges the link arrows.
6. **Skills** (paper): five groups, mono label and chips.
7. **Contact close** (abyss, dithered top edge): "Say hi." heading, one friendly line, the email as a large link, LinkedIn, GitHub, Resume, a back-to-top button, the build credit, and a stippled particle horizon drawn once.

Desktop uses a 12-column grid at max 76rem; labels take 4 columns and content 8. Phones stack with a 20px gutter.

## Motion

- Entrance: the hero name rises line by line behind a mask, the kicker resolves character by character, the sea fades up.
- Scroll reveals: content fades and lifts 12px as it enters (CSS `animation-timeline: view()`), visible by default where unsupported.
- Band edges develop once: the dither threshold sweeps in when the band first enters.
- Hover and press: links draw an underline from the left, buttons press to 0.97, project rows halftone-fill, header indicator slides between links.
- Easing: ease-out curves, 150 to 500ms, nothing bouncy.
- Reduced motion: every animation is off or replaced by an instant state. The sea is a still frame, the glow is off, the eggs keep their existing reduced-motion behavior.

## Texture and accents

- A faint static grain layer (SVG turbulence) over the whole page, a little stronger in the hero.
- ASCII appears in exactly three places: the hero sea, the dither band edges, the stippled horizon in the close. All `aria-hidden`.

## Easter eggs and glow

- Basketball: cursor and ball unchanged (the only warm color). Rim in signal blue, net in a mid blue that reads on paper and on deep.
- Film envelope: stays a blue envelope. The wine lining and wax become abyss velvet and deep blue wax; the card uses Mona Sans italic for "Silencio." Logic untouched.
- Cursor glow: a cold signal-blue light, above band grounds and below content, mouse only, off with reduced motion.

## Architecture

- Tokens and component classes in `src/app/globals.css` (Tailwind 4 `@theme`), grounds switched with a `data-ground` attribute that remaps the text and line tokens.
- New client components, each one job: `AsciiSea` (hero canvas), `DitherEdge` (band transition canvas), `Horizon` (close canvas), `Scramble` (mono label resolve), `SiteHeader` (pill nav, active tracking, popover menu).
- Existing components rewritten in place: `About`, `Experience`, `Projects`, `Skills`, `Section`, `TextLink`, `Tags`, `icons`. `Sidebar` and `RouteNav` are deleted (replaced by the hero and header).
- Section tracking reuses the RouteNav measurement logic.
- OG image and favicon redrawn in the new palette with static Hubot Sans and Mona Sans TTFs.
- UI pieces are sourced from the shadcn registry pool where one fits and adapted to these tokens; the project has no shadcn setup, so picks are adapted by hand into plain components.

## Testing and verification

- `npm run lint`, `npm run typecheck`, `npm run build` pass.
- A small check script asserts the content changes (Cinema Cosmos present with both links, Credit Default gone, the SysNets line present, no em dashes in source copy).
- Screenshots at 1440 and 390 wide, critiqued with review-animations and impeccable, then the impeccable finish reviewer and documenter.
- Reduced motion, keyboard focus, and touch paths checked by hand in the browser.
- break-ui on the project rows, experience rows, and header.
