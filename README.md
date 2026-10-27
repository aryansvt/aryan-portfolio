# aryan-portfolio

Personal site for Aryan Achar. Next.js, TypeScript, and Tailwind, exported as a static site and hosted on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm test           # content check and ascii math
npm run typecheck
npm run build      # static export to out/
npm run preview    # serve out/ on http://localhost:3000
```

## Where things live

| What | File |
|---|---|
| About text links (Innowhyte, lab pages, Goodreads) | `src/config/links.ts` |
| Email, LinkedIn, GitHub, resume path | `src/config/links.ts` |
| Name, title, tagline, SEO description, site URL, the About "next up" note | `src/config/site.ts` |
| Experience, projects, skills | `src/content/*.ts` |
| Project archive page | `src/app/archive/page.tsx` |
| About text | `src/components/About.tsx` |
| Film card text | `src/components/eggs/FilmEnvelope.tsx` |
| Colors, type, grounds, and every component style | `src/app/globals.css` |
| Header pill and phone menu | `src/components/SiteHeader.tsx` |
| Hero, contact close | `src/components/Hero.tsx`, `src/components/Contact.tsx` |
| ASCII sea, dither edges | `src/components/ascii/` |
| Social preview image | `src/app/og.png/route.tsx` |
| Resume PDF | `public/Aryan-Achar-Resume.pdf` |

### Projects and the archive

Every public project lives once in `projects` in `src/content/projects.ts`, newest first, with its month as `YYYY-MM`. The archive page lists all of them. The homepage shows the four names in `featured`, in that order, and those need a `blurb`. Give a project an `award` and it gets the winner pill on the homepage and a small "Winner" tag in the archive. `npm test` checks the order, the dates, and that every featured project has a blurb.

### Next up

The small "Next up" line at the end of About reads `nextUp` in `src/config/site.ts`. Change the text there, or set it to an empty string to hide it.

### About links

The blue underlined words in the About text use the URLs in `aboutLinks`. If you set one to an empty string, its words turn back into plain text and stop being clickable, so the site never shows a dead link.

"basketball" and "watching films" aren't links. They have a dotted underline because they open the easter eggs below.

### Site URL

The site lives at https://www.aryanachar.com, and `aryanachar.com` redirects there. The canonical URL, the sitemap, `robots.txt`, and the social preview image all build absolute links from `SITE_URL` in `src/config/site.ts`, so change it there if the domain ever changes.

## Easter eggs

- Clicking "basketball" in the About section turns the cursor into a basketball, and every click after that drops a ball through a small hoop. Click the word again or press Escape to turn it off.
- Clicking "watching films" opens a small blue envelope next to the words: the black wax seal breaks, the flap swings up, and a card with my favorite film slides out. Click anywhere else, press Escape, or click the words again and it tucks itself away. The envelope is inline SVG in `src/components/eggs/FilmEnvelope.tsx`.

Neither one blocks clicks. With reduced motion turned on, the ball skips the drop and the envelope simply fades in and out, already open.

## Cursor glow

A faint cold blue light sits right under the mouse, over the page colors and under the text. It only runs with a mouse, so touch devices never get it, and it's off with reduced motion. Its size and strength are the `.glow` rules in `src/app/globals.css`.

## ASCII and grain

The ASCII bits are small canvases in `src/components/ascii/`, all hidden from screen readers:

- the sea at the bottom of the hero, which ripples where the mouse moves or a finger taps
- the dithered edges where the page changes color, which fill in the first time you scroll to them
- a quieter, finer echo of the same sea at the bottom of the contact section

`field.ts` holds the shared math and has a test (`npm test`). With reduced motion turned on, both seas are still frames and the edges appear already filled in. A faint film grain sits over the whole page as one fixed layer.

## Fonts

Hubot Sans (headings), Mona Sans (body), and Martian Mono (dates, tags, and the ASCII) come from Google Fonts through `next/font`. The static TTF copies in `src/app/_og/` are only used to render the social preview image. They're licensed under the SIL Open Font License, and the license files sit next to them.
