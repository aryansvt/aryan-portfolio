import { todoLinks } from "@/config/links";

export type Role = {
  title: string;
  org: string;
  orgUrl?: string;
  place?: string;
  start: string;
  end: string;
  current: boolean;
  blurb: string;
  tags: string[];
};

// newest first
export const experience: Role[] = [
  {
    title: "Spatial Data Science Researcher",
    org: "UT Dallas",
    start: "Sept 2026",
    end: "Present",
    current: true,
    blurb:
      "Studying healthcare access gaps in Dr. Alexander Michels’ group using population and facility data. Implementing place-based spatial accessibility measures modeled on the PySAL access package, including floating catchment area and gravity models, building on PostGIS work from LineFinder.",
    tags: ["Python", "PostGIS", "spatial analysis"],
  },
  {
    title: "AI Engineer Intern",
    org: "Innowhyte",
    orgUrl: todoLinks.innowhyte,
    place: "Remote",
    start: "Summer 2026",
    end: "Present",
    current: true,
    blurb:
      "Built a full-stack conversational data analysis app that answers natural-language questions across multiple CSVs with text and charts. Designed an LLM planning pipeline that validates model-generated plans before deterministic Pandas execution, with a regression test suite. Now contributing to a live agentic AI project.",
    tags: ["Python", "FastAPI", "Next.js", "Pandas", "OpenAI API", "Docker"],
  },
  {
    title: "OIT Support Desk Analyst",
    org: "UT Dallas",
    start: "July 2025",
    end: "Aug 2026",
    current: false,
    blurb:
      "Supported students, faculty, and staff across phone, email, chat, and remote channels, troubleshooting AWS remote access, Duo, Teams, PeopleSoft, Azure, and hardware and software issues.",
    tags: ["AWS", "Azure", "JIRA", "TeamDynamix"],
  },
];
