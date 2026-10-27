import type { Metadata } from "next";
import Link from "next/link";

import { DitherEdge } from "@/components/ascii/DitherEdge";
import { Contact } from "@/components/Contact";
import { ArrowLeft, ArrowUpRight, GitHubIcon, GlobeIcon, TrophyIcon } from "@/components/icons";
import { Tags } from "@/components/Tags";
import { site } from "@/config/site";
import { monthYear, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: `Archive | ${site.name}`,
  description: `Every public project ${site.name} has built, newest first, with the stack, live site, and code for each.`,
  alternates: { canonical: "/archive" },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Archive() {
  return (
    <>
      {/* the hero, cut short */}
      <header id="top" data-ground="sky" className="hero archive-hero">
        <div className="wrap hero-copy">
          <h1 className="t-display hero-name archive-title">
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
      </header>

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
                  <span className="max-md:sr-only">Live site</span>
                </th>
                <th scope="col" className="col-link">
                  <span className="max-md:sr-only">GitHub</span>
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
                    {project.name}
                    {project.award && (
                      <span className="award t-mono">
                        <TrophyIcon />
                        Winner
                      </span>
                    )}
                  </th>
                  <td className="col-stack">
                    <Tags items={project.tags} label={`${project.name} tech stack`} className="" />
                  </td>
                  <td className="col-link">
                    {project.live && (
                      <a href={project.live} {...external} className="archive-link">
                        <GlobeIcon className="md:hidden" />
                        <span className="label max-md:hidden">{new URL(project.live).host}</span>
                        <ArrowUpRight className="nudge max-md:hidden" />
                        <span className="sr-only"> {project.name} live site (opens in new tab)</span>
                      </a>
                    )}
                  </td>
                  <td className="col-link">
                    <a href={project.github} {...external} className="archive-link">
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
