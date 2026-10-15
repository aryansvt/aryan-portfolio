"use client";

import { useEffect, useRef } from "react";

import { RAMP, fitCanvas, glyphIndex, swell } from "./field";

type Ripple = { x: number; y: number; t0: number };

const REDUCE = "(prefers-reduced-motion: reduce)";
// far rows in ice, the rest in frost
const TONES = ["#e8efff", "#a8c4ff"];
const MAX_RIPPLES = 12;
const FRAME_MS = 33;

// a swell of characters under a single horizon; the pointer leaves a wake that fades
export function AsciiSea() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;

    const media = window.matchMedia(REDUCE);
    const atlas = document.createElement("canvas");
    const ripples: Ripple[] = [];
    let cw = 9;
    let ch = 12;
    let pw = 9;
    let ph = 12;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let inView = true;
    let start = performance.now();
    let lastRipple = { x: -1e4, y: -1e4, t: 0 };

    const font = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--font-martian").trim() || "monospace";

    // every glyph pre-drawn once per tone, so a frame is only drawImage calls
    const buildAtlas = (dpr: number) => {
      pw = Math.round(cw * dpr);
      ph = Math.round(ch * dpr);
      atlas.width = pw * RAMP.length;
      atlas.height = ph * TONES.length;
      const a = atlas.getContext("2d");
      if (!a) return;
      a.font = `${(ch - 1) * dpr}px ${font()}`;
      a.textAlign = "center";
      a.textBaseline = "middle";
      TONES.forEach((tone, row) => {
        a.fillStyle = tone;
        for (let i = 1; i < RAMP.length; i++) a.fillText(RAMP[i], i * pw + pw / 2, row * ph + ph / 2);
      });
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      while (ripples.length && now - ripples[0].t0 > 1800) ripples.shift();

      for (let r = 0; r < rows; r++) {
        const depth = (r + 1) / rows;
        const z = depth ** 1.5;
        const cy = r * ch + ch / 2;
        ctx.globalAlpha = 0.28 + z * 0.72;
        const tone = depth < 0.3 ? 0 : 1;

        for (let c = 0; c < cols; c++) {
          let v = swell(c / cols, z, t) ** 1.5 * (0.22 + z * 0.85);

          for (const p of ripples) {
            const age = (now - p.t0) / 1000;
            const d = Math.hypot(c * cw + cw / 2 - p.x, (cy - p.y) * 1.7);
            const ring = d - age * 220;
            v += 0.85 * Math.exp(-age * 2.2) * Math.exp(-(ring * ring) / 1100);
          }

          const i = glyphIndex(v);
          if (i) ctx.drawImage(atlas, i * pw, tone * ph, pw, ph, c * pw, r * ph, pw, ph);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // runs only while visible, with motion allowed
    const sync = () => {
      const run = !media.matches && inView && !document.hidden;
      if (run && !raf) raf = requestAnimationFrame(loop);
      if (!run) {
        stop();
        if (media.matches) {
          start = performance.now();
          draw(start);
        }
      }
    };

    const resize = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w || !h) return;
      const dpr = fitCanvas(canvas, w, h);
      const small = w < 640;
      cw = small ? 8 : 9;
      ch = small ? 11 : 12;
      cols = Math.ceil(w / cw);
      rows = Math.ceil(h / ch);
      buildAtlas(dpr);
      draw(performance.now());
    };

    const addRipple = (e: PointerEvent, force: boolean) => {
      if (media.matches) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < -40 || x > rect.width || y > rect.height) return;
      const now = performance.now();
      const moved = Math.hypot(x - lastRipple.x, y - lastRipple.y);
      if (!force && (moved < 28 || now - lastRipple.t < 70)) return;
      lastRipple = { x, y, t: now };
      ripples.push({ x, y, t0: now });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    const onMove = (e: PointerEvent) => addRipple(e, false);
    const onDown = (e: PointerEvent) => addRipple(e, true);

    const resizer = new ResizeObserver(resize);
    resizer.observe(box);
    const watcher = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    watcher.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    // the atlas needs the real font, not the fallback
    document.fonts.load(`11px ${font()}`).then(resize, resize);
    sync();

    return () => {
      stop();
      resizer.disconnect();
      watcher.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, []);

  return <canvas ref={ref} className="canvas-fill" aria-hidden="true" />;
}
