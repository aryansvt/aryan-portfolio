// name, headline, and the url used for metadata

export const site = {
  name: "Aryan Achar",
  title: "Software Engineer",
  tagline: "I build models, tools, and apps that turn ideas into working products.",
  description:
    "Aryan Achar is a software engineer and Computer Science student at UT Dallas working across AI engineering, data science, and full-stack development.",
};

// canonical origin for metadata, the sitemap, and the og image. aryanachar.com redirects here
export const SITE_URL = "https://www.aryanachar.com";

// built at export time by src/app/og.png/route.tsx
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.title}`,
};
