import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";

import { CursorGlow } from "@/components/CursorGlow";
import { contact } from "@/config/links";
import { SITE_URL, ogImage, site } from "@/config/site";

import "./globals.css";

// archivo carries the width axis used for the name and nav
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const title = `${site.name} | ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: site.description,
  authors: [{ name: site.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
    firstName: "Aryan",
    lastName: "Achar",
    images: [{ ...ogImage, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d090e",
  colorScheme: "dark",
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: SITE_URL,
  email: `mailto:${contact.email}`,
  sameAs: [contact.linkedin, contact.github],
  affiliation: { "@type": "CollegeOrUniversity", name: "The University of Texas at Dallas" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <CursorGlow />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
