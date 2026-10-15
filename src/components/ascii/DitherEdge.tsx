"use client";

import { useEffect, useRef } from "react";

import { bayer } from "./field";

const PIXEL = 3;
const DEVELOP_MS = 700;

type DitherEdgeProps = {
  // the neighboring band's color, painted in ordered dither over this band's edge
  color: string;
  // "in" thickens toward the bottom, "out" thins away from the top
  fade: "in" | "out";
  className?: string;
};

// a band edge drawn one canvas pixel per dither cell, scaled up crisp; it develops once when first seen
export function DitherEdge({ color, fade, className = "" }: DitherEdgeProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let progress = reduce ? 1 : 0;
    let raf = 0;

    const paint = () => {
      const cols = Math.max(1, Math.ceil(canvas.clientWidth / PIXEL));
      const rows = Math.max(1, Math.round(canvas.clientHeight / PIXEL));
      if (canvas.width !== cols) canvas.width = cols;
      if (canvas.height !== rows) canvas.height = rows;
      ctx.clearRect(0, 0, cols, rows);
      const m = /^var\((--[\w-]+)\)$/.exec(color);
      ctx.fillStyle = m ? getComputedStyle(canvas).getPropertyValue(m[1]).trim() : color;

      for (let y = 0; y < rows; y++) {
        const g = fade === "in" ? (y + 0.5) / rows : 1 - (y + 0.5) / rows;
        for (let x = 0; x < cols; x++) {
          if (g > bayer(x, y) * progress + (1 - progress)) ctx.fillRect(x, y, 1, 1);
        }
      }
    };

    const develop = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / DEVELOP_MS);
        progress = 1 - (1 - k) ** 3;
        paint();
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const resizer = new ResizeObserver(paint);
    resizer.observe(canvas);
    const watcher = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      watcher.disconnect();
      if (!reduce) develop();
    });
    watcher.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      resizer.disconnect();
      watcher.disconnect();
    };
  }, [color, fade]);

  return (
    <div className={`dither ${className}`} aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
