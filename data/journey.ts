/**
 * Engineering progression: Application → Backend → Data & Search → Recommendations → AI → Leadership.
 * Periods describe career stages; the last four overlap inside the current role and are labelled that way.
 * Organization names are intentionally omitted — the story is about the engineering.
 */
export type JourneyStage = {
  id: string;
  period: string;
  stage: string;
  title: string;
  role?: string;
  label: string;
  points: string[];
  tech: string[];
  /** A small flow rendered as the stage's system diagram. */
  flow: string[];
  current?: boolean;
};

export const journey: JourneyStage[] = [
  {
    id: "application",
    period: "2018 – 2020",
    stage: "Application Engineering",
    title: "Building complete web applications",
    role: "Software Engineer",
    label: "Learning how an application works end to end.",
    points: [
      "Client-specific web applications, from UI to API",
      "Angular 8, Angular Material, Kendo UI and NativeScript front ends",
      "Node.js APIs on PostgreSQL",
      "Tracking down integration issues and performance problems with the testing team",
    ],
    tech: ["Angular 8", "Angular Material", "Kendo UI", "NativeScript", "Node.js", "PostgreSQL"],
    flow: ["Angular UI", "Node.js API", "PostgreSQL"],
  },
  {
    id: "backend",
    period: "2020 →",
    stage: "Backend Systems",
    title: "Owning the backend: data, APIs, modular code",
    role: "Software Engineer → MEAN Stack Developer",
    label: "Moving from building screens to designing what sits behind them.",
    points: [
      "Applications for data extraction, analysis, retrieval and indexing on MongoDB and Node.js",
      "Modernising and modularising legacy code (AngularJS → Angular 11)",
      "Enterprise MEAN-stack systems: ERP, fleet, billing and logistics workflows",
      "Root-cause analysis and production support",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Mongoose", "PostgreSQL", "Angular", "REST APIs"],
    flow: ["Client", "REST API", "Business logic", "MongoDB / PostgreSQL"],
  },
  {
    id: "search",
    period: "Current role",
    stage: "Data & Search",
    title: "Search and product discovery on real data",
    label: "Thinking about how data is shaped before anyone queries it.",
    points: [
      "MongoDB schema design and aggregation pipelines",
      "Elasticsearch index design, keyword matching and relevance",
      "Combining local inventory with fresh external search results",
      "Product scraping and data-transformation pipelines on scheduled jobs",
      "Kibana dashboards for analytics",
    ],
    tech: ["MongoDB", "Aggregation pipelines", "Elasticsearch", "Kibana", "CRON jobs"],
    flow: ["Sources", "Normalise", "MongoDB", "Elasticsearch index", "Search API"],
  },
  {
    id: "recommendations",
    period: "Current role",
    stage: "Recommendation Systems",
    title: "Recommendations from behaviour and product signals",
    label: "From “what matches” to “what is useful for this person”.",
    points: [
      "Personalised recommendations from recent activity and product views",
      "Cold-start recommendations for new users",
      "Trending products, deals and product relationships as signals",
      "AI reranking on a short candidate list",
      "Scheduled refresh instead of per-request computation",
    ],
    tech: ["Node.js", "Python", "MongoDB", "Elasticsearch", "LLMs"],
    flow: ["User activity", "Signals", "Candidates", "Rerank", "Recommendations"],
  },
  {
    id: "ai",
    period: "Current role",
    stage: "AI Integration",
    title: "Adding AI to applications that already exist",
    label: "AI as one step in the request path — not a separate product.",
    points: [
      "Understanding product and model intent in search queries",
      "Background AI enrichment of product data, cached for reuse",
      "AI-generated comparison insights",
      "Moving Python / AI workflows into maintainable Node.js services",
      "Keeping latency predictable with asynchronous processing",
    ],
    tech: ["LLM APIs", "Node.js", "Python", "Queues / workers", "Elasticsearch"],
    flow: ["Request", "Intent", "Retrieve", "Enrich (async)", "Rank", "Response"],
  },
  {
    id: "leadership",
    period: "Current role",
    stage: "Technical Leadership",
    title: "Leading the work, not only doing it",
    role: "Technical Lead",
    label: "Making decisions other developers can build on.",
    points: [
      "Task allocation, technical guidance and mentoring",
      "Code reviews and engineering standards",
      "Planning the monolith → microservices migration",
      "Production issue resolution and root-cause analysis",
      "Sprint planning with product, QA, marketing and DevOps",
    ],
    tech: ["Microservices", "Docker", "GitLab CI/CD", "Azure", "Agile / Scrum"],
    flow: ["Requirement", "Design", "Tasks", "Review", "Release"],
    current: true,
  },
];

export const codeToSystems = {
  early: {
    label: "Early on",
    question: "How do I build this feature?",
    flow: ["UI", "API", "Database"],
  },
  current: {
    label: "Now",
    question: "How should this system behave?",
    flow: ["User", "Intent", "API", "Business logic", "Search", "Data", "AI", "External systems", "Response"],
  },
  message: "Experience changed the questions I ask.",
};
