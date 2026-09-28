import { experience } from "@/content/experience";

import { Section } from "./Section";
import { Tags } from "./Tags";
import { TextLink } from "./TextLink";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol>
        {experience.map((role, i) => (
          <li
            key={`${role.title}-${role.org}`}
            className="rail-item"
            data-current={role.current}
            // the segment below a role is wine only while both ends are ongoing
            data-live={role.current && Boolean(experience[i + 1]?.current)}
          >
            <p className="rail-date t-label">
              <span>{role.start}</span> <span>to {role.end}</span>
            </p>
            <span className="rail-mark" aria-hidden="true">
              <span className="rail-dot" />
            </span>
            <div className="rail-body">
              <h3 className="t-item">{role.title}</h3>
              <p className="mt-0.5 font-display text-[0.9375rem] font-medium text-mist">
                {role.orgUrl ? <TextLink href={role.orgUrl}>{role.org}</TextLink> : role.org}
                {role.place && ` (${role.place})`}
              </p>
              <p className="t-body mt-3">{role.blurb}</p>
              <Tags items={role.tags} label={`${role.title} tools`} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
