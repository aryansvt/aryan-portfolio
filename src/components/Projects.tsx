import { projects } from "@/content/projects";

import { GitHubIcon, LiveIcon } from "./icons";
import { Section } from "./Section";
import { Tags } from "./Tags";

function ProjectLink({ href, icon, label, context }: { href: string; icon: React.ReactNode; label: string; context: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hl inline-flex items-center gap-1.5 font-display text-sm font-medium"
    >
      <span className="text-blush">{icon}</span>
      {label}
      <span className="sr-only">
        {" "}
        {context} (opens in new tab)
      </span>
    </a>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="space-y-12">
        {projects.map((project) => (
          <li key={project.name} className="border-t border-plum/60 pt-6 first:border-t-0 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="t-item">{project.name}</h3>
              <div className="flex gap-4">
                <ProjectLink
                  href={project.github}
                  icon={<GitHubIcon />}
                  label="GitHub"
                  context={`repository for ${project.name}`}
                />
                {project.live && (
                  <ProjectLink href={project.live} icon={<LiveIcon />} label="Live site" context={`for ${project.name}`} />
                )}
              </div>
            </div>
            <p className="t-body mt-3">{project.blurb}</p>
            <Tags items={project.tags} label={`${project.name} tech stack`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
