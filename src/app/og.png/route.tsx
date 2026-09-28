import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { ogImage, site } from "@/config/site";

// a route handler instead of opengraph-image so the export writes out/og.png with an extension
export const dynamic = "force-static";

// the three areas from the about text, drawn as stations on a line
const stops = ["AI engineering", "Data science", "Full-stack development"];

export async function GET() {
  // static ttf instances, satori can't read variable woff2
  const dir = join(process.cwd(), "src/app/_og");
  const [expanded, sans, serif] = await Promise.all([
    readFile(join(dir, "archivo-expanded-800.ttf")),
    readFile(join(dir, "archivo-500.ttf")),
    readFile(join(dir, "newsreader-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          backgroundColor: "#0d090e",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(75,29,94,0.6), rgba(13,9,14,0) 55%), radial-gradient(circle at 100% 100%, rgba(142,36,70,0.32), rgba(13,9,14,0) 50%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo Expanded",
              fontSize: 138,
              lineHeight: 0.92,
              letterSpacing: "-0.015em",
              color: "#efe6ec",
            }}
          >
            <span>Aryan</span>
            <span>Achar</span>
          </div>
          <div style={{ marginTop: 34, fontFamily: "Archivo", fontSize: 36, color: "#f1b8c8" }}>{site.title}</div>
          <div
            style={{
              marginTop: 12,
              maxWidth: 560,
              fontFamily: "Newsreader",
              fontSize: 31,
              lineHeight: 1.35,
              color: "#a99aa7",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", flexDirection: "column", gap: 58 }}>
          <div
            style={{
              position: "absolute",
              left: 9,
              top: 12,
              bottom: 12,
              width: 4,
              borderRadius: 4,
              backgroundImage: "linear-gradient(to bottom, #f1b8c8, #8e2446 60%, #2e2033)",
            }}
          />
          {stops.map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 22,
                  backgroundColor: i === 0 ? "#f1b8c8" : "#0d090e",
                  border: `4px solid ${i === 0 ? "#f1b8c8" : "#8e2446"}`,
                  boxShadow: i === 0 ? "0 0 0 8px rgba(142,36,70,0.5)" : "none",
                }}
              />
              <div style={{ fontFamily: "Archivo", fontSize: 30, color: i === 0 ? "#efe6ec" : "#a99aa7" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: [
        { name: "Archivo Expanded", data: expanded, weight: 800, style: "normal" },
        { name: "Archivo", data: sans, weight: 500, style: "normal" },
        { name: "Newsreader", data: serif, weight: 400, style: "normal" },
      ],
    },
  );
}
