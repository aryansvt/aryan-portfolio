import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Sidebar } from "@/components/Sidebar";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:rounded-md focus:bg-blush focus:px-4 focus:py-2 focus:font-display focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[76rem] px-6 sm:px-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-[clamp(3rem,6vw,6rem)] lg:px-16">
        <Sidebar />
        <div className="max-w-[38rem] pt-16 lg:pt-[clamp(2rem,7vh,6rem)]">
          <main id="content" className="flex flex-col gap-24 lg:gap-32">
            <About />
            <Experience />
            <Projects />
            <Skills />
          </main>
          <footer className="mt-24 border-t border-plum/60 pt-6 pb-16 lg:mt-32 lg:pb-24">
            <p className="font-display text-sm text-mist">
              Built with Next.js and TypeScript, set in Archivo and Newsreader, and hosted on Vercel.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
