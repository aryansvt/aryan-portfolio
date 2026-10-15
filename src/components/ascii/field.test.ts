import { test } from "node:test";
import assert from "node:assert/strict";

import { BAYER4, RAMP, bayer, cellGrid, fitCanvas, glyphFor, swell } from "./field.ts";

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

test("cell grid keeps one pitch at fractional dpr", () => {
  for (const dpr of [1, 1.25, 1.5, 1.75, 2]) {
    const g = cellGrid(1536, 360, 9, 12, dpr);
    // drawing pitch and layout pitch agree, so the wake lands under the pointer
    assert.equal(g.cw * dpr, g.pw);
    assert.equal(g.ch * dpr, g.ph);
    // the grid covers the whole backing store with no blank strip
    assert.ok(g.cols * g.pw >= Math.round(1536 * dpr), `cols short at ${dpr}`);
    assert.ok(g.rows * g.ph >= Math.round(360 * dpr), `rows short at ${dpr}`);
  }
});
