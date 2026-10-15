export type Project = {
  name: string;
  blurb: string;
  tags: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "LineFinder",
    blurb:
      "Mobile-first DART transit navigator with a custom RAPTOR-style routing engine, versioned GTFS schedule ingestion, walking-aware trip planning, and transfer-risk ranking, backed by 1.9M+ stop-time records in PostGIS.",
    tags: ["TypeScript", "Next.js", "Fastify", "PostgreSQL/PostGIS", "Redis", "Docker"],
    github: "https://github.com/aryansvt/dallas-transit",
    live: "https://linefinder-dart.vercel.app",
  },
  {
    name: "Cinema Cosmos",
    blurb:
      "A 3D galaxy of about 5,000 films where every star is a film, placed by how it feels instead of its genre. Plot, themes, and poster colors are embedded and laid out with UMAP, rendered with React Three Fiber on WebGPU, and vibe search runs fully in the browser with Transformers.js.",
    tags: ["TypeScript", "React Three Fiber", "WebGPU", "Transformers.js", "UMAP", "Next.js"],
    github: "https://github.com/aryansvt/cinema-cosmos",
    live: "https://cinema-cosmos.vercel.app",
  },
  {
    name: "Multi-CSV AI Data Assistant",
    blurb:
      "Upload multiple CSVs and ask questions in plain English. The LLM produces a validated analysis plan and Pandas does all the math, so model-generated code is never executed. Handles multi-hop joins while preventing fanout double-counting, and rejects unverified joins.",
    tags: ["Python", "FastAPI", "Pydantic", "Pandas", "OpenAI API", "Next.js", "Docker"],
    github: "https://github.com/aryansvt/csv-chat-poc",
  },
  {
    name: "NBA Shot Quality Model",
    blurb:
      "ML pipeline on 128K NBA shots predicting make probability, benchmarking five model families and explaining the model with SHAP. Deployed as an interactive dashboard with a shot predictor and an out-of-sample player shot-making leaderboard.",
    tags: ["Python", "LightGBM", "XGBoost", "SHAP", "Next.js", "Vercel"],
    github: "https://github.com/aryansvt/nba-shot-quality",
    live: "https://nba-shot-quality-model.vercel.app",
  },
];
