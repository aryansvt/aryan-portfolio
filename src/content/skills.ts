export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "R", "HTML/CSS"],
  },
  {
    label: "AI & ML",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "SHAP",
      "OpenAI API",
      "Anthropic API",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "RAG",
      "structured outputs",
    ],
  },
  {
    label: "Data",
    items: ["Pandas", "NumPy", "Plotly", "Jupyter", "PostgreSQL/PostGIS", "spatial accessibility analysis"],
  },
  {
    label: "Web & Backend",
    items: ["FastAPI", "Pydantic", "Next.js", "React", "Fastify", "Redis", "MapLibre"],
  },
  {
    label: "Tools & Infra",
    items: [
      "Docker",
      "Git",
      "GitHub Actions",
      "Vercel",
      "pytest",
      "Vitest",
      "pnpm",
      "Linux",
      "AWS",
      "Azure",
      "Claude Code",
      "Codex",
    ],
  },
];
