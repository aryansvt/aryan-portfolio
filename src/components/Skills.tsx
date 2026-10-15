import { skills } from "@/content/skills";

import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills">
      <dl className="skill-rows">
        {skills.map((group) => (
          <div key={group.label} className="skill-row reveal">
            <dt className="t-item text-[1.0625rem]!">{group.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5" role="list">
                {group.items.map((item) => (
                  <li key={item} className="skill">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
