import { experience } from "@/content/experience";

import { Scramble } from "./Scramble";
import { Section } from "./Section";
import { Tags } from "./Tags";
import { TextLink } from "./TextLink";

export function Experience() {
  return (
    <Section id="experience">
      <ol className="roles">
        {experience.map((role) => (
          <li key={`${role.title}-${role.org}`}>
            <article className="role reveal">
              <p className="role-dates t-mono">
                <Scramble text={role.start} /> <Scramble text={`to ${role.end}`} />
                {role.current && (
                  <span className="now">
                    <span className="now-dot" aria-hidden="true" />
                    Now
                  </span>
                )}
              </p>
              <div>
                <h3 className="t-item">{role.title}</h3>
                <p className="mt-1 text-[0.9375rem] font-medium text-(--fg-soft)">
                  {role.orgUrl ? <TextLink href={role.orgUrl}>{role.org}</TextLink> : role.org}
                  {role.place && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                      {role.place}
                    </>
                  )}
                </p>
                <p className="t-body mt-3">{role.blurb}</p>
                <Tags items={role.tags} label={`${role.title} tools`} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
