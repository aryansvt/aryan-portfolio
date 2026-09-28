import { contact, resumePath } from "@/config/links";
import { site } from "@/config/site";

import { DocumentIcon } from "./icons";
import { RouteNav } from "./RouteNav";
import { TextLink } from "./TextLink";

const contactRows = [
  { label: "Email", href: `mailto:${contact.email}`, text: contact.email },
  { label: "LinkedIn", href: contact.linkedin, text: "in/aryanachar" },
  { label: "GitHub", href: contact.github, text: "aryansvt" },
];

export function Sidebar() {
  return (
    <header className="pt-16 pb-4 sm:pt-20 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:overflow-y-auto lg:py-[clamp(2rem,7vh,6rem)] lg:pr-2 lg:pl-1">
      <div>
        <h1 className="t-name">
          <span className="block">Aryan</span> <span className="block">Achar</span>
        </h1>
        <p className="mt-4 font-display text-lg font-medium text-blush [font-variation-settings:'wdth'_108]">
          {site.title}
        </p>
        <p className="mt-2 max-w-[21rem] font-serif text-lg leading-normal text-mist">{site.tagline}</p>
      </div>

      <div className="mt-[clamp(2rem,6vh,4rem)] hidden lg:block">
        <RouteNav />
      </div>

      <div className="mt-10 lg:mt-auto lg:pt-8">
        <h2 className="t-label">Contact</h2>
        <dl className="mt-2.5 grid grid-cols-[4.75rem_minmax(0,1fr)] items-baseline gap-y-1.5 font-display text-[0.9375rem]">
          {contactRows.map((row) => (
            <div key={row.label} className="contents">
              <dt className="t-label leading-[1.6]">{row.label}</dt>
              <dd className="min-w-0 leading-[1.6]">
                <TextLink href={row.href}>{row.text}</TextLink>
              </dd>
            </div>
          ))}
        </dl>
        <a
          href={resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-md border border-plum px-3.5 py-2 font-display text-[0.9375rem] font-medium text-bone transition-colors duration-200 hover:border-wine hover:bg-wine/30"
        >
          <DocumentIcon className="text-blush" />
          View resume
          <span className="sr-only"> (PDF, opens in new tab)</span>
        </a>
      </div>
    </header>
  );
}
