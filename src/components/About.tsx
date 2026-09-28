import { todoLinks } from "@/config/links";

import { Section } from "./Section";
import { TextLink } from "./TextLink";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="t-body space-y-5">
        <p>
          Hi! I’m Aryan, a Computer Science student at UT Dallas working across AI engineering, data science, and
          full-stack development. I enjoy building projects where those overlap, like a transit app with its own routing
          engine or a model that grades every shot from an NBA season.
        </p>
        <p>
          Right now, I’m an AI Engineer Intern at <TextLink href={todoLinks.innowhyte}>Innowhyte</TextLink>, working on
          an agentic AI project, and an undergraduate researcher in{" "}
          <TextLink href={todoLinks.michelsLab}>Dr. Alexander Michels’ spatial data science group</TextLink>, studying
          gaps in healthcare access. Previously, I spent a year on the UT Dallas IT support desk helping students,
          faculty, and staff.
        </p>
        <p>
          In my free time, I’m usually playing basketball, hanging out with my friends,{" "}
          <TextLink href={todoLinks.letterboxd}>watching films</TextLink>, or reading a book from my ever-growing reading
          list. Currently, I’m reading{" "}
          <TextLink href={todoLinks.goodreads} className="italic">
            Urban Creatures
          </TextLink>{" "}
          by Sarah Gray.
        </p>
      </div>
    </Section>
  );
}
