"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "/\\|-_=+*#<>";
const DURATION = 480;

// adapted from balick ui's scramble-text (ui.balick.me): letters and digits decode left to right
// once in view, an invisible copy holds the width, and screen readers get the plain text
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / DURATION);
        const settled = Math.floor(k * text.length);
        setShown(
          Array.from(text, (ch, i) =>
            i < settled || !/[\p{L}\p{N}]/u.test(ch) ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ).join(""),
        );
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        watcher.disconnect();
        run();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    watcher.observe(el);

    return () => {
      watcher.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible whitespace-pre">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-pre">
        {shown}
      </span>
    </span>
  );
}
