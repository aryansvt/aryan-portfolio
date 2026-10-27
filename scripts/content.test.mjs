import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { resumePath } from "../src/config/links.ts";
import { site } from "../src/config/site.ts";
import { featured, monthYear, projects } from "../src/content/projects.ts";

const read = (p) => readFileSync(p, "utf8");

test("homepage leads with breadcrumbs and drops the csv assistant", () => {
  assert.deepEqual(
    featured.map((p) => p.name),
    ["Breadcrumbs", "LineFinder", "Cinema Cosmos", "NBA Shot Quality Model"],
  );
  assert.equal(featured[0].award, "Winner · Vultr Track, HackTX 2026");
  assert.equal(featured[0].devpost, "https://devpost.com/software/naps-hack-project");
  for (const p of featured) assert.ok(p.blurb, `${p.name} needs a blurb`);
});

test("archive lists all eight public projects, newest first", () => {
  assert.equal(projects.length, 8);
  assert.ok(projects.some((p) => p.name === "Multi-CSV AI Data Assistant"));
  for (const p of projects) {
    assert.match(p.date, /^\d{4}-(0[1-9]|1[0-2])$/, `${p.name} date`);
    assert.match(p.github, /^https:\/\/github\.com\/aryansvt\//, `${p.name} github`);
    if (p.live) assert.match(p.live, /^https:\/\//, `${p.name} live`);
  }
  const dates = projects.map((p) => p.date);
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test("archive dates read like the experience dates", () => {
  assert.equal(monthYear("2026-10"), "Oct 2026");
  assert.equal(monthYear("2026-09"), "Sept 2026");
  assert.equal(monthYear("2025-07"), "July 2025");
  assert.equal(monthYear("2026-01"), "Jan 2026");
});

test("resume links point at the new pdf and the old one is gone", () => {
  assert.equal(resumePath, "/PortfolioResumeNoGPA.pdf");
  assert.ok(existsSync(join("public", resumePath)));
  assert.ok(!existsSync("public/aryan-achar-resume.pdf"));
});

test("the next up note lives in config, not in about", () => {
  assert.match(site.nextUp, /HackUTD 2026/);
  const about = read("src/components/About.tsx");
  assert.match(about, /site\.nextUp/);
  assert.doesNotMatch(about, /HackUTD/);
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
  for (const file of walk("src")) assert.ok(!read(file).includes("—"), `em dash in ${file}`);
});
