import { contact, resumePath } from "@/config/links";
import { site } from "@/config/site";

import { AsciiSea } from "./ascii/AsciiSea";
import { DitherEdge } from "./ascii/DitherEdge";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Hero() {
  return (
    <section id="top" data-ground="sky" className="hero" aria-labelledby="hero-name">
      <div className="wrap hero-copy">
        <h1 id="hero-name" className="t-display hero-name">
          <span className="line">
            <span style={{ "--i": 0 } as React.CSSProperties}>Aryan</span>
          </span>{" "}
          <span className="line">
            <span style={{ "--i": 1 } as React.CSSProperties}>Achar</span>
          </span>
        </h1>
        <p className="hero-title">{site.title}</p>
        <p className="hero-tagline">{site.tagline}</p>
        <div className="hero-actions">
          <a href={resumePath} {...external} className="btn btn-light">
            View resume
            <ArrowUpRight className="nudge" />
            <span className="sr-only"> (PDF, opens in new tab)</span>
          </a>
          <a href={`mailto:${contact.email}`} className="btn btn-ghost">
            <MailIcon />
            Email
          </a>
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
        </div>
      </div>

      <div className="hero-sea" aria-hidden="true">
        <span className="sea-horizon" />
        <AsciiSea />
      </div>
      <DitherEdge color="var(--color-paper)" fade="in" className="bottom-0" />
    </section>
  );
}
