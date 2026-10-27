import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { DitherEdge } from "@/components/ascii/DitherEdge";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="content">
        <div data-ground="paper" className="pb-[clamp(5rem,9vw,8rem)]">
          <About />
          <Experience />
        </div>
        <div data-ground="deep" className="relative pb-[clamp(4rem,7vw,6rem)]">
          <DitherEdge color="var(--color-paper)" fade="out" className="top-0" />
          <Projects />
          <DitherEdge color="var(--color-paper)" fade="in" className="bottom-0" />
        </div>
        <div data-ground="paper" className="pb-[clamp(5rem,9vw,8rem)]">
          <Skills />
        </div>
      </main>
      <Contact />
    </>
  );
}
