// pure helpers shared by the ascii canvases

export const RAMP = " ..·:-~=+*#";

// layered sines seen in perspective: far rows compress, near rows swell
export function swell(x: number, z: number, t: number): number {
  const px = (x - 0.5) / (0.12 + z * 0.95);
  const v =
    Math.sin(px * 14 + z * 26 - t * 0.9) * 0.55 +
    Math.sin(px * 5.3 - z * 11 + t * 0.5 + 1.3) * 0.4 +
    Math.sin(px * 29 + z * 47 - t * 1.4 + 0.7) * 0.18;
  return Math.min(1, Math.max(0, (v + 1.13) / 2.26));
}

export function glyphIndex(v: number): number {
  return Math.floor(Math.min(1, Math.max(0, v)) * (RAMP.length - 1) + 0.5);
}

export function glyphFor(v: number): string {
  return RAMP[glyphIndex(v)];
}

// 4x4 ordered dither, offset by half a step so no threshold is 0 or 1
export const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16);

export function bayer(x: number, y: number): number {
  return BAYER4[(y & 3) * 4 + (x & 3)];
}

export function fitCanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number, maxDpr = 2): number {
  const dpr = Math.min(globalThis.devicePixelRatio || 1, maxDpr);
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  return dpr;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
