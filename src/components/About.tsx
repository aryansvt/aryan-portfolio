import { aboutLinks } from "@/config/links";

import { FilmEnvelope } from "./eggs/FilmEnvelope";
import { HoopsToggle } from "./eggs/HoopsToggle";
import { Section } from "./Section";
import { TextLink } from "./TextLink";

export function About() {
  return (
    <Section id="about">
      <p className="t-lead reveal">
        Hi! I’m Aryan, a Computer Science student at UT Dallas working across AI engineering, data science, and{" "}
        <span className="whitespace-nowrap">full-stack</span> development.
      </p>
      <div className="t-body reveal mt-7 space-y-5">
        <p>
          I enjoy building projects where those overlap, like a transit app with its own routing engine or a model that
          grades every shot from an NBA season.
        </p>
        <p>
          Right now, I’m an AI Engineer Intern at <TextLink href={aboutLinks.innowhyte}>Innowhyte</TextLink>, working on
          an agentic AI project, and an undergraduate researcher in{" "}
          <TextLink href={aboutLinks.michelsLab}>Dr. Alexander Michels’ spatial data science group</TextLink>, studying
          gaps in healthcare access. I also just started assisting with post-quantum cryptography research in{" "}
          <TextLink href={aboutLinks.karimLab}>Dr. Imtiaz Karim’s SysNets Lab</TextLink>. Previously, I spent a year on
          the UT Dallas IT support desk helping students, faculty, and staff.
        </p>
        <p>
          In my free time, I’m usually playing <HoopsToggle />, hanging out with my friends,{" "}
          <FilmEnvelope>watching films</FilmEnvelope>, or reading a book from my ever-growing reading list. Currently,
          I’m reading{" "}
          <TextLink href={aboutLinks.goodreads} className="italic">
            Urban Creatures
          </TextLink>{" "}
          by Sarah Gray.
        </p>
      </div>
    </Section>
  );
}
