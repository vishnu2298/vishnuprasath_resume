export const problems = [
  {
    problem: "Local product data becomes stale.",
    solution: "Combine local inventory with fresh external search and configurable refresh logic.",
    tag: "Search",
  },
  {
    problem: "A large monolithic backend becomes difficult to maintain.",
    solution: "Separate responsibilities into focused services.",
    tag: "Architecture",
  },
  {
    problem: "AI processing increases API latency.",
    solution: "Use asynchronous / background enrichment and lazy processing where appropriate.",
    tag: "AI",
  },
  {
    problem: "Different external systems provide inconsistent data.",
    solution: "Build normalization and service-level integration layers.",
    tag: "Integrations",
  },
  {
    problem: "Recommendations need more than static rules.",
    solution: "Combine behavioral signals, product relationships, trending data and AI reranking.",
    tag: "Recommendations",
  },
];

export const principles = [
  { title: "Build for the real problem", body: "Don't build technology just because it is available." },
  { title: "Keep systems maintainable", body: "Good architecture should help the next developer understand the system." },
  { title: "Automate what repeats", body: "If a process happens repeatedly, look for a way to automate it." },
  { title: "AI should be practical", body: "Use AI where it creates measurable product or engineering value." },
  { title: "Design for change", body: "Systems evolve. Architecture should allow change without rewriting everything." },
  { title: "Observe before rewriting", body: "Understand existing systems before replacing them." },
];

export const aiHub = {
  center: "AI / LLM",
  nodes: [
    "Product Intelligence",
    "Recommendation",
    "Search",
    "Automation",
    "Voice",
    "Research",
    "Personalization",
    "Data Analysis",
    "Developer Assistance",
  ],
  statement: "I don't treat AI as a separate feature. I integrate intelligence into existing software systems.",
  traditional: ["Request", "Business Logic", "Database", "Response"],
  enabled: ["Request", "Intent Understanding", "Business Logic", "Data Retrieval", "AI Enrichment", "Ranking", "Response"],
};

export const architecturePatterns = {
  monolith: {
    label: "Monolith",
    description: "One deployable application owns every responsibility. Simple to start, harder to change as it grows.",
  },
  microservices: {
    label: "Microservices",
    description:
      "An API gateway routes to focused services. Each one owns a responsibility and can change independently.",
  },
  ai: {
    label: "AI-Enabled",
    description:
      "Data services and search feed an AI layer that enriches, ranks and connects to external intelligence APIs.",
  },
} as const;

export type PatternId = keyof typeof architecturePatterns;
