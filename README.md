# aryan-portfolio

Personal site for Aryan Achar. Next.js, TypeScript, and Tailwind, exported as a static site and hosted on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # static export to out/
npm run preview    # serve out/ on http://localhost:3000
```

## Where things live

| What | File |
|---|---|
| About text links (Innowhyte, lab page, Goodreads) | `src/config/links.ts` |
| Email, LinkedIn, GitHub, resume path | `src/config/links.ts` |
| Name, title, tagline, SEO description, site URL | `src/config/site.ts` |
| Experience, projects, skills | `src/content/*.ts` |
| About text | `src/components/About.tsx` |
| Film card text | `src/components/eggs/FilmEnvelope.tsx` |
| Colors, type, and the route line styles | `src/app/globals.css` |
| Social preview image | `src/app/og.png/route.tsx` |
| Resume PDF | `public/aryan-achar-resume.pdf` |

### About links

The highlighted words in the About text use the URLs in `aboutLinks`. If you set one to an empty string, its words keep the highlight but stop being clickable, so the site never shows a dead link.

"watching films" isn't a link. It keeps the highlight because it opens the envelope easter egg below.

### Site URL

The site lives at https://www.aryanachar.com, and `aryanachar.com` redirects there. The canonical URL, the sitemap, `robots.txt`, and the social preview image all build absolute links from `SITE_URL` in `src/config/site.ts`, so change it there if the domain ever changes.

## Easter eggs

- Clicking "basketball" in the About section turns the cursor into a basketball, and every click after that drops a ball through a small hoop. Click the word again or press Escape to turn it off.
- Clicking "watching films" opens a small blue envelope next to the words: the wax seal breaks, the flap swings up, and a card with my favorite film slides out. Click anywhere else, press Escape, or click the words again and it tucks itself away. The envelope is inline SVG in `src/components/eggs/FilmEnvelope.tsx`.

Neither one blocks clicks. With reduced motion turned on, the ball skips the drop and the envelope simply fades in and out, already open.

## Cursor glow

A faint plum glow sits right under the mouse, behind the page. It only runs with a mouse, so touch devices never get it, and it's off with reduced motion. Its size and strength are the `.glow` rules in `src/app/globals.css`.

## Fonts

Archivo and Newsreader come from Google Fonts through `next/font`. The static TTF copies in `src/app/_og/` are only used to render the social preview image. They're licensed under the SIL Open Font License, and the license files sit next to them.
