import type { Metadata } from "next";
import Link from "next/link";

import { DitherEdge } from "@/components/ascii/DitherEdge";
import { Contact } from "@/components/Contact";
import { ArrowLeft, ArrowUpRight, GitHubIcon, GlobeIcon, TrophyIcon } from "@/components/icons";
import { Tags } from "@/components/Tags";
import { ogImage, site } from "@/config/site";
import { monthYear, projects } from "@/content/projects";

const title = `Archive | ${site.name}`;
const description = `Every public project ${site.name} has built, newest first, with the stack, live site, and code for each.`;

// next swaps nested metadata whole, so the share card is spelled out here or it shows the homepage
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/archive" },
  openGraph: {
    type: "website",
    url: "/archive",
    siteName: site.name,
    title,
    description,
    locale: "en_US",
    images: [{ ...ogImage, type: "image/png" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Archive() {
  return (
    <>
      {/* the hero, cut short */}
      <section id="top" data-ground="sky" className="hero archive-hero" aria-labelledby="archive-title">
        <div className="wrap hero-copy">
          <h1 id="archive-title" className="t-display hero-name archive-title">
            <span className="line">
              <span>Archive</span>
            </span>
          </h1>
          <p className="hero-tagline">Every public project I’ve built, newest first.</p>
          <div className="archive-actions">
            <Link href="/" className="btn btn-ghost">
              <ArrowLeft className="nudge-back" />
              Back home
            </Link>
          </div>
        </div>
        <DitherEdge color="var(--color-paper)" fade="in" className="bottom-0" />
      </section>

      <main id="content" data-ground="paper" className="archive">
        <div className="wrap">
          <table className="archive-table">
            <caption className="sr-only">Every public project, newest first</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Project</th>
                <th scope="col" className="col-stack">
                  Built with
                </th>
                <th scope="col" className="col-link">
                  <span className="max-lg:sr-only">Live site</span>
                </th>
                <th scope="col" className="col-link">
                  <span className="max-lg:sr-only">GitHub</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={project.name} style={{ "--i": i } as React.CSSProperties}>
                  <td className="t-mono archive-date">
                    <time dateTime={project.date}>{monthYear(project.date)}</time>
                  </td>
                  <th scope="row" className="archive-name">
                    {/* a wrapped pill starts flush, no stray margin */}
                    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {project.name}
                      {project.award && (
                        <span className="award t-mono">
                          <TrophyIcon />
                          Winner
                        </span>
                      )}
                    </span>
                  </th>
                  <td className="col-stack">
                    <Tags items={project.tags} label={`${project.name} tech stack`} className="" />
                  </td>
                  <td className="col-link">
                    {project.live && (
                      <a href={project.live} {...external} className="project-link">
                        <GlobeIcon className="lg:hidden" />
                        <span className="label max-lg:hidden">{project.live.replace(/^https?:\/\/|\/$/g, "")}</span>
                        <ArrowUpRight className="nudge max-lg:hidden" />
                        <span className="sr-only"> {project.name} live site (opens in new tab)</span>
                      </a>
                    )}
                  </td>
                  <td className="col-link">
                    <a href={project.github} {...external} className="project-link">
                      <GitHubIcon />
                      <span className="sr-only">{project.name} on GitHub (opens in new tab)</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Contact />
    </>
  );
}
