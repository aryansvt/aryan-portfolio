import { skills } from "@/content/skills";

import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-5 sm:space-y-4">
        {skills.map((group) => (
          <div key={group.label} className="sm:grid sm:grid-cols-[7.5rem_2rem_minmax(0,1fr)]">
            <dt className="font-display text-[0.9375rem] font-semibold text-bone sm:pt-[0.2rem]">{group.label}</dt>
            <dd className="t-body mt-1 sm:col-start-3 sm:mt-0">
              <ul className="comma-list" role="list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
