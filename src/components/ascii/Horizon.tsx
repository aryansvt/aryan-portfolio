"use client";

import { useEffect, useRef } from "react";

import { fitCanvas, mulberry32 } from "./field";

// a stippled sounding on a single line, drawn once
export function Horizon() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;

    const draw = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w || !h) return;
      const dpr = fitCanvas(canvas, w, h);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const rnd = mulberry32(7);
      const line = h * 0.68;
      const count = Math.round(w * 0.6);

      for (let i = 0; i < count; i++) {
        const x = rnd() * w;
        const a = (x - w * 0.55) / w;
        const b = (x - w * 0.62) / w;
        const peak = Math.exp(-a * a * 28) * h * 0.55 + Math.exp(-b * b * 90) * h * 0.28;
        const up = rnd() < 0.62;
        const y = up ? line - rnd() ** 2.2 * peak : line + rnd() ** 3 * h * 0.27;
        const size = rnd() < 0.85 ? 1 : 1.6;
        ctx.globalAlpha = 0.25 + rnd() * 0.6;
        ctx.fillStyle = rnd() < 0.2 ? "#a8c4ff" : "#e8efff";
        ctx.fillRect(x, y, size, size);
      }

      const fade = ctx.createLinearGradient(0, 0, w, 0);
      fade.addColorStop(0, "rgb(232 239 255 / 0)");
      fade.addColorStop(0.55, "rgb(232 239 255 / 0.9)");
      fade.addColorStop(1, "rgb(232 239 255 / 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = fade;
      ctx.fillRect(0, line, w, 1);
    };

    const resizer = new ResizeObserver(draw);
    resizer.observe(box);
    return () => resizer.disconnect();
  }, []);

  return <canvas ref={ref} className="canvas-fill" aria-hidden="true" />;
}
