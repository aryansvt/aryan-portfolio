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
| Name, title, tagline, SEO description, site URL | `src/config/site.ts` |
| Experience, projects, skills | `src/content/*.ts` |
| About text | `src/components/About.tsx` |
| Film card text | `src/components/eggs/FilmEnvelope.tsx` |
| Colors, type, grounds, and every component style | `src/app/globals.css` |
| Header pill and phone menu | `src/components/SiteHeader.tsx` |
| Hero, contact close | `src/components/Hero.tsx`, `src/components/Contact.tsx` |
| ASCII sea, dither edges, stippled horizon | `src/components/ascii/` |
| Social preview image | `src/app/og.png/route.tsx` |
| Resume PDF | `public/aryan-achar-resume.pdf` |

### About links

The highlighted words in the About text use the URLs in `aboutLinks`. If you set one to an empty string, its words keep the highlight but stop being clickable, so the site never shows a dead link.

"watching films" isn't a link. It keeps the highlight because it opens the envelope easter egg below.

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
- the stippled horizon in the contact section

`field.ts` holds the shared math and has a test (`npm test`). With reduced motion turned on, the sea is a still frame and the edges appear already filled in. A faint film grain sits over the whole page as one fixed layer.

## Fonts

Hubot Sans (headings), Mona Sans (body), and Martian Mono (dates, tags, and the ASCII) come from Google Fonts through `next/font`. The static TTF copies in `src/app/_og/` are only used to render the social preview image. They're licensed under the SIL Open Font License, and the license files sit next to them.
