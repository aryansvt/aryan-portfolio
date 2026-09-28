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
| Links still to fill in (Innowhyte, lab page, Letterboxd, Goodreads) | `src/config/links.ts` |
| Email, LinkedIn, GitHub, resume path | `src/config/links.ts` |
| Name, title, tagline, SEO description, site URL | `src/config/site.ts` |
| Experience, projects, skills | `src/content/*.ts` |
| About text | `src/components/About.tsx` |
| Colors, type, and the route line styles | `src/app/globals.css` |
| Social preview image | `src/app/og.png/route.tsx` |
| Resume PDF | `public/aryan-achar-resume.pdf` |

### TODO links

The four links in `todoLinks` are empty strings for now. While a link is empty, its words still get the highlight but aren't clickable, so nothing on the site points nowhere. Paste a URL in and it becomes a link.

Once `letterboxd` is set, "watching films" opens Letterboxd in a new tab and plays the film effect when you come back to the tab. Until then, clicking the words plays the effect right away.

### Site URL

Canonical URLs, the sitemap, and the social preview image need an absolute URL. On Vercel this comes from `VERCEL_PROJECT_PRODUCTION_URL` automatically. For a custom domain, set `NEXT_PUBLIC_SITE_URL` (for example `https://aryanachar.com`) in the Vercel project settings.

## Easter eggs

- Clicking "basketball" in the About section turns the cursor into a basketball, and every click after that drops a ball through a small hoop. Click the word again or press Escape to turn it off.
- "watching films" adds letterbox bars and film grain for a few seconds.

Neither one blocks clicks. With reduced motion turned on, both switch to simple fades.

## Fonts

Archivo and Newsreader come from Google Fonts through `next/font`. The static TTF copies in `src/app/_og/` are only used to render the social preview image. They're licensed under the SIL Open Font License, and the license files sit next to them.
