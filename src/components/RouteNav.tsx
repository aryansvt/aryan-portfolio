"use client";

import { useEffect, useRef, useState } from "react";

import { sections } from "@/content/sections";

// share of the viewport height a section top must pass to become current
const LINE = 0.4;

export function RouteNav() {
  const [active, setActive] = useState(0);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * LINE;
      const tops = sections.map(
        (s) => document.getElementById(s.id)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY,
      );

      let index = 0;
      tops.forEach((top, i) => {
        if (top <= line) index = i;
      });

      // how far along the track toward the next station
      let fraction = 0;
      if (index < tops.length - 1) {
        const span = tops[index + 1] - tops[index];
        fraction = span > 0 ? Math.min(Math.max((line - tops[index]) / span, 0), 1) : 0;
      }

      // a short last section never reaches the line, so the bottom of the page counts
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        index = tops.length - 1;
        fraction = 0;
      }

      fillRef.current?.style.setProperty("--progress", String((index + fraction) / (tops.length - 1)));
      setActive(index);
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

  return (
    <nav aria-label="Sections" className="route">
      <span className="route-track" aria-hidden="true">
        <span className="route-fill" ref={fillRef} />
      </span>
      <ol className="route-stops">
        {sections.map((section, i) => (
          <li key={section.id} style={{ "--i": i } as React.CSSProperties}>
            <a
              href={`#${section.id}`}
              className="route-stop"
              aria-current={i === active ? "true" : undefined}
              data-passed={i < active}
            >
              <span className="route-dot" aria-hidden="true" />
              <span className="route-label">{section.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
