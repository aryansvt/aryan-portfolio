"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { contact, resumePath } from "@/config/links";
import { sections } from "@/content/sections";

import { ArrowUpRight, MenuIcon } from "./icons";

// share of the viewport height a section top must pass to become current
const LINE = 0.4;

const menuLinks = [
  { label: "Email", href: `mailto:${contact.email}` },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
];

export function SiteHeader() {
  // -1 while the hero is in view
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * LINE;
      let index = -1;
      sections.forEach((s, i) => {
        const top = document.getElementById(s.id)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        if (top <= line) index = i;
      });
      // a short last section never reaches the line, so the bottom of the page counts
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? sections.length - 1 : index);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // slide the pill behind the current link; appear in place the first time
  useLayoutEffect(() => {
    const pill = indicatorRef.current;
    const wrap = linksRef.current;
    if (!pill || !wrap) return;

    const place = () => {
      const link = wrap.querySelector<HTMLElement>(`[data-i="${active}"]`);
      if (!link) {
        pill.dataset.on = "false";
        return;
      }
      const instant = pill.dataset.on !== "true";
      pill.dataset.instant = String(instant);
      pill.style.setProperty("--x", `${link.offsetLeft}px`);
      pill.style.setProperty("--w", `${link.offsetWidth}px`);
      pill.dataset.on = "true";
      if (instant) requestAnimationFrame(() => (pill.dataset.instant = "false"));
    };

    place();
    const resizer = new ResizeObserver(place);
    resizer.observe(wrap);
    return () => resizer.disconnect();
  }, [active]);

  const closeMenu = () => menuRef.current?.hidePopover();

  return (
    <header className="site-header">
      <nav aria-label="Primary" className="pill">
        <a href="#top" className="mark" aria-label="Aryan Achar, back to top">
          <span aria-hidden="true">AA</span>
        </a>

        <div className="nav-links" ref={linksRef}>
          <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} data-i={i} className="nav-link" aria-current={i === active ? "true" : undefined}>
              {s.label}
            </a>
          ))}
        </div>

        <div className="pill-actions">
          <a href={resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            Resume
            <ArrowUpRight className="nudge" />
            <span className="sr-only"> (PDF, opens in new tab)</span>
          </a>
          <button
            type="button"
            className="btn menu-btn"
            popoverTarget="site-menu"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            {/* the label stays put; the icon crossing into an x shows it's open */}
            <MenuIcon />
            Menu
          </button>
        </div>
      </nav>

      <div
        id="site-menu"
        ref={menuRef}
        popover="auto"
        className="menu"
        onToggle={(e) => setOpen(e.newState === "open")}
      >
        <nav aria-label="Sections">
          <ul>
            {sections.map((s, i) => (
              <li key={s.id} style={{ "--i": i } as React.CSSProperties}>
                <a href={`#${s.id}`} className="menu-section" onClick={closeMenu}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <hr />
        <ul>
          {menuLinks.map((l, i) => {
            const external = l.href.startsWith("http");
            return (
              <li key={l.label} style={{ "--i": sections.length + i } as React.CSSProperties}>
                <a
                  href={l.href}
                  onClick={closeMenu}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                  <ArrowUpRight />
                  {external && <span className="sr-only"> (opens in new tab)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
