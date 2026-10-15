import { test } from "node:test";
import assert from "node:assert/strict";

import { BAYER4, RAMP, bayer, fitCanvas, glyphFor, mulberry32, swell } from "./field.ts";

test("swell stays in range and is deterministic", () => {
  for (let i = 0; i < 200; i++) {
    const v = swell(i / 200, (i % 17) / 16, 3.5);
    assert.ok(v >= 0 && v <= 1, `out of range ${v}`);
    assert.equal(v, swell(i / 200, (i % 17) / 16, 3.5));
  }
});

test("glyph ramp covers both ends", () => {
  assert.equal(glyphFor(0), RAMP[0]);
  assert.equal(glyphFor(1), RAMP[RAMP.length - 1]);
  assert.equal(glyphFor(-5), RAMP[0]);
  assert.equal(glyphFor(9), RAMP[RAMP.length - 1]);
});

test("bayer thresholds are a permutation of 16 levels", () => {
  assert.equal(new Set(BAYER4).size, 16);
  assert.ok(BAYER4.every((v) => v > 0 && v < 1));
  assert.equal(bayer(4, 4), bayer(0, 0));
});

test("fitCanvas clamps dpr and sizes the backing store", () => {
  const canvas = { width: 0, height: 0, style: {} as Record<string, string> };
  (globalThis as { devicePixelRatio?: number }).devicePixelRatio = 3;
  const dpr = fitCanvas(canvas as unknown as HTMLCanvasElement, 100, 50);
  assert.equal(dpr, 2);
  assert.equal(canvas.width, 200);
  assert.equal(canvas.height, 100);
});

test("seeded random repeats", () => {
  const a = mulberry32(7);
  const b = mulberry32(7);
  assert.equal(a(), b());
});
