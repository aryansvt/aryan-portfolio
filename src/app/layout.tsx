import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";

import { site } from "@/config/site";

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

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#0d090e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
