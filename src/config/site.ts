// name, headline, and the url used for metadata

export const site = {
  name: "Aryan Achar",
  title: "Software Engineer",
  tagline: "I build models, tools, and apps that turn ideas into working products.",
  description:
    "Aryan Achar is a software engineer and Computer Science student at UT Dallas working across AI engineering, data science, and full-stack development.",
};

// set NEXT_PUBLIC_SITE_URL for a custom domain, otherwise vercel's production url is used
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
