export type Project = {
  name: string;
  // month built, YYYY-MM
  date: string;
  tags: string[];
  github: string;
  live?: string;
  devpost?: string;
  // homepage rows only
  blurb?: string;
  award?: string;
};

// every public project, newest first. the archive page lists them all
export const projects: Project[] = [
  {
    name: "Breadcrumbs",
    date: "2026-10",
    award: "Winner · Vultr Track, HackTX 2026",
    blurb:
      "An AI-powered SSH honeypot that won the Vultr track at HackTX 2026. A fake company server lured in real attackers, told bots, humans and AI agents apart, investigated what they left behind with live web search, and showed every intrusion as a creature on a 3D globe. It caught 4,900+ attacks from 20 countries over the weekend, including a live Kaiji botnet attempt. The site now replays the recorded attacks.",
    tags: ["Python", "FastAPI", "Claude API", "SerpApi", "Redis", "TimescaleDB", "Next.js", "Three.js", "Docker", "Vultr"],
    github: "https://github.com/aryansvt/hacktx2026",
    live: "https://followthebreadcrumbs.tech",
    devpost: "https://devpost.com/software/naps-hack-project",
  },
  {
    name: "Cinema Cosmos",
    date: "2026-10",
    blurb:
      "A 3D galaxy of about 5,000 films where every star is a film, placed by how it feels instead of its genre. Plot, themes, and poster colors are embedded and laid out with UMAP, rendered with React Three Fiber on WebGPU, and vibe search runs fully in the browser with Transformers.js.",
    tags: ["TypeScript", "React Three Fiber", "WebGPU", "Transformers.js", "UMAP", "Next.js"],
    github: "https://github.com/aryansvt/cinema-cosmos",
    live: "https://cinema-cosmos.vercel.app",
  },
  {
    name: "LineFinder",
    date: "2026-09",
    blurb:
      "Mobile-first DART transit navigator with a custom RAPTOR-style routing engine, versioned GTFS schedule ingestion, walking-aware trip planning, and transfer-risk ranking, backed by 1.9M+ stop-time records in PostGIS.",
    tags: ["TypeScript", "Next.js", "Fastify", "PostgreSQL/PostGIS", "Redis", "Docker"],
    github: "https://github.com/aryansvt/dallas-transit",
    live: "https://linefinder-dart.vercel.app",
  },
  {
    name: "Multi-CSV AI Data Assistant",
    date: "2026-08",
    tags: ["Python", "FastAPI", "Pydantic", "Pandas", "OpenAI API", "Next.js", "Docker"],
    github: "https://github.com/aryansvt/csv-chat-poc",
  },
  {
    name: "Real-Time Particle Effects Engine",
    date: "2026-05",
    tags: ["C++", "OpenGL", "GLSL", "GLFW", "GLM", "ImGui", "CMake"],
    github: "https://github.com/aryansvt/realtime-particle-effects-engine-revamp",
  },
  {
    name: "NBA Shot Quality Model",
    date: "2026-04",
    blurb:
      "ML pipeline on 128K NBA shots predicting make probability, benchmarking five model families and explaining the model with SHAP. Deployed as an interactive dashboard with a shot predictor and an out-of-sample player shot-making leaderboard.",
    tags: ["Python", "LightGBM", "XGBoost", "SHAP", "Next.js", "Vercel"],
    github: "https://github.com/aryansvt/nba-shot-quality",
    live: "https://nba-shot-quality-model.vercel.app",
  },
  {
    name: "Credit Default Risk Benchmark",
    date: "2026-04",
    tags: ["Python", "scikit-learn", "LightGBM", "XGBoost", "SHAP"],
    github: "https://github.com/aryansvt/credit-default-risk-benchmark",
  },
  {
    name: "Esports Stats Analyzer",
    date: "2026-04",
    tags: ["Python", "Pandas", "SQLite", "Streamlit", "Plotly"],
    github: "https://github.com/aryansvt/esports-stats-analyzer",
  },
];

// "2026-09" to "Sept 2026", the way the experience dates read
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
export const monthYear = (date: string) => `${MONTHS[Number(date.slice(5)) - 1]} ${date.slice(0, 4)}`;

// homepage rows, in this order
export const featured = ["Breadcrumbs", "LineFinder", "Cinema Cosmos", "NBA Shot Quality Model"].map(
  (name) => projects.find((p) => p.name === name)!,
);
