import type { Metadata, Viewport } from "next";
import { Hubot_Sans, Martian_Mono, Mona_Sans } from "next/font/google";

import { CursorGlow } from "@/components/CursorGlow";
import { contact } from "@/config/links";
import { SITE_URL, ogImage, site } from "@/config/site";

import "./globals.css";

// all three carry the width axis; hubot sets the display type wide
const hubot = Hubot_Sans({
  variable: "--font-hubot",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
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
  themeColor: "#2b4bff",
  colorScheme: "light",
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
    <html lang="en" className={`${hubot.variable} ${mona.variable} ${martian.variable}`}>
      <body>
        <CursorGlow />
        {children}
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
