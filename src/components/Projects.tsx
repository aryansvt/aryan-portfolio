import { projects } from "@/content/projects";

import { ArrowUpRight } from "./icons";
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
        {projects.map((project) => (
          <li key={project.name}>
            <article className="project reveal">
              <div className="project-head">
                <h3 className="project-title">{project.name}</h3>
                <div className="project-links">
                  <ProjectLink href={project.github} label="GitHub" context={`repository for ${project.name}`} />
                  {project.live && <ProjectLink href={project.live} label="Live site" context={`for ${project.name}`} />}
                </div>
              </div>
              <p className="t-body mt-3">{project.blurb}</p>
              <Tags items={project.tags} label={`${project.name} tech stack`} />
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
