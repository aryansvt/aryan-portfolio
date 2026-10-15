import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (p) => readFileSync(p, "utf8");

test("cinema cosmos replaces the credit default benchmark", () => {
  const src = read("src/content/projects.ts");
  assert.match(src, /name: "Cinema Cosmos"/);
  assert.match(src, /https:\/\/github\.com\/aryansvt\/cinema-cosmos/);
  assert.match(src, /https:\/\/cinema-cosmos\.vercel\.app/);
  assert.doesNotMatch(src, /Credit Default/);
});

test("about mentions the sysnets lab, experience does not", () => {
  assert.match(read("src/components/About.tsx"), /SysNets Lab/);
  assert.match(read("src/config/links.ts"), /https:\/\/www\.imtiazkarim\.net\//);
  assert.doesNotMatch(read("src/content/experience.ts"), /SysNets|Karim/);
});

test("no em dashes in source copy", () => {
  const walk = (dir) =>
    readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(p) ? [p] : [];
    });
  for (const file of walk("src")) assert.ok(!read(file).includes("\u2014"), `em dash in ${file}`);
});
