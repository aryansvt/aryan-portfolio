import Link from "next/link";

import { featured } from "@/content/projects";

import { ArrowRight, ArrowUpRight, TrophyIcon } from "./icons";
import { Section } from "./Section";
import { Tags } from "./Tags";

function ProjectLink({ href, label, context }: { href: string; label: string; context: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="project-link">
      <span className="label">{label}</span>
      <ArrowUpRight className="nudge" />
      <span className="sr-only">
        {" "}
        {context} (opens in new tab)
      </span>
    </a>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <ul className="projects">
        {featured.map((project) => (
          <li key={project.name}>
            <article className="project reveal" data-award={project.award ? "" : undefined}>
              <div className="project-head">
                <h3 className="project-title">{project.name}</h3>
                <div className="project-links">
                  <ProjectLink href={project.github} label="GitHub" context={`repository for ${project.name}`} />
                  {project.live && <ProjectLink href={project.live} label="Live site" context={`for ${project.name}`} />}
                  {project.devpost && (
                    <ProjectLink href={project.devpost} label="Devpost" context={`page for ${project.name}`} />
                  )}
                </div>
              </div>
              {project.award && (
                <p className="award t-mono">
                  <TrophyIcon />
                  {project.award}
                </p>
              )}
              <p className="t-body mt-3">{project.blurb}</p>
              <Tags items={project.tags} label={`${project.name} tech stack`} />
            </article>
          </li>
        ))}
      </ul>
      <Link href="/archive" className="archive-cta reveal">
        <span className="label">View full project archive</span>
        <ArrowRight className="nudge" />
      </Link>
    </Section>
  );
}
