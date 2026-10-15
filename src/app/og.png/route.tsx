import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { RAMP, glyphIndex, swell } from "@/components/ascii/field";
import { ogImage, site } from "@/config/site";

// a route handler instead of opengraph-image so the export writes out/og.png with an extension
export const dynamic = "force-static";

// the hero sea, frozen: same field, same ramp
const ROWS = 9;
const COLS = 150;
const sea = Array.from({ length: ROWS }, (_, r) => {
  const z = ((r + 1) / ROWS) ** 1.5;
  let line = "";
  for (let c = 0; c < COLS; c++) line += RAMP[glyphIndex(swell(c / COLS, z, 2.2) ** 1.5 * (0.22 + z * 0.85))];
  return { line, alpha: 0.3 + z * 0.7, tone: r < ROWS * 0.3 ? "#e8efff" : "#a8c4ff" };
});

export async function GET() {
  // static ttf instances, satori can't read variable woff2
  const dir = join(process.cwd(), "src/app/_og");
  const [display, body, mono] = await Promise.all([
    readFile(join(dir, "hubot-expanded-900.ttf")),
    readFile(join(dir, "mona-500.ttf")),
    readFile(join(dir, "martian-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundImage: "linear-gradient(180deg, #2b4bff 0%, #1b36cc 48%, #0a1a4a 76%, #081540 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "60px 80px 0" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Hubot Sans",
              fontSize: 112,
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
              color: "#f4f7ff",
            }}
          >
            <span>ARYAN</span>
            <span>ACHAR</span>
          </div>
          <div style={{ marginTop: 28, fontFamily: "Mona Sans", fontSize: 32, color: "#ffffff" }}>{site.title}</div>
          <div
            style={{
              marginTop: 10,
              maxWidth: 720,
              fontFamily: "Mona Sans",
              fontSize: 28,
              lineHeight: 1.4,
              color: "#dce6ff",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", paddingBottom: 18 }}>
          <div
            style={{
              height: 1,
              marginBottom: 10,
              backgroundImage: "linear-gradient(90deg, rgba(232,239,255,0), rgba(232,239,255,0.65) 20%, rgba(232,239,255,0.65) 80%, rgba(232,239,255,0))",
            }}
          />
          {sea.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                whiteSpace: "pre",
                fontFamily: "Martian Mono",
                fontSize: 12,
                lineHeight: 1.2,
                color: row.tone,
                opacity: row.alpha,
              }}
            >
              {row.line}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: [
        { name: "Hubot Sans", data: display, weight: 900, style: "normal" },
        { name: "Mona Sans", data: body, weight: 500, style: "normal" },
        { name: "Martian Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
