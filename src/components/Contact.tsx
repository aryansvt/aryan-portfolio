import { contact, resumePath } from "@/config/links";

import { DitherEdge } from "./ascii/DitherEdge";
import { AsciiSea } from "./ascii/AsciiSea";
import { ArrowUp, ArrowUpRight, GitHubIcon, LinkedInIcon } from "./icons";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Contact() {
  return (
    <footer data-ground="abyss" className="relative" aria-labelledby="contact-title">
      <DitherEdge color="var(--color-paper)" fade="out" className="top-0" />
      <div className="wrap pt-[clamp(6rem,12vw,9.5rem)]">
        <h2 id="contact-title" className="t-display close-title reveal">
          Say hi.
        </h2>
        <p className="reveal mt-6 max-w-[40rem] text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-normal text-(--fg-soft)">
          Currently open to internship opportunities in software engineering, AI, and data science. Feel free to reach
          out.
        </p>
        <a href={`mailto:${contact.email}`} className="hl close-email reveal mt-8 inline-block">
          {contact.email}
        </a>
        <div className="reveal mt-9 flex flex-wrap gap-2.5">
          <a href={contact.linkedin} {...external} className="btn btn-ghost">
            <LinkedInIcon />
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a href={contact.github} {...external} className="btn btn-ghost">
            <GitHubIcon />
            GitHub
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a href={resumePath} {...external} className="btn btn-solid">
            View resume
            <ArrowUpRight className="nudge" />
            <span className="sr-only"> (PDF, opens in new tab)</span>
          </a>
        </div>
      </div>

      {/* a quieter echo of the hero sea, so the page closes the way it opened */}
      <div className="close-sea" aria-hidden="true">
        <span className="sea-horizon" />
        <AsciiSea quiet />
      </div>

      <div className="wrap flex flex-col-reverse gap-4 pt-4 pb-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-mono text-[0.6875rem] text-balance text-(--fg-soft) normal-case">
          Built with Next.js and TypeScript, set in Hubot Sans, Mona Sans, and Martian Mono, and hosted on&nbsp;Vercel.
        </p>
        <a href="#top" className="back-top t-mono shrink-0">
          Back to top
          <ArrowUp className="nudge" />
        </a>
      </div>
    </footer>
  );
}
