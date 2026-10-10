export const problems = [
  {
    problem: "Local product data becomes stale.",
    solution: "Combine local inventory with fresh external search and configurable refresh logic.",
    tag: "Search",
  },
  {
    problem: "A large monolithic backend becomes difficult to maintain.",
    solution: "Separate responsibilities into focused services, migrating one boundary at a time instead of rewriting.",
    tag: "Architecture",
  },
  {
    problem: "AI processing increases API latency.",
    solution: "Move enrichment into background workers, process lazily and cache the result, so responses don't wait on a model.",
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
  uses: ["Search intent", "Recommendation reranking", "Product data enrichment", "Comparison insights", "Automation", "Developer tooling"],
  statement: "I don't treat AI as a separate feature. I add it to software that already works.",
  traditional: ["Request", "Business logic", "Database", "Response"],
  enabled: ["Request", "Intent understanding", "Business logic", "Data retrieval", "AI enrichment", "Ranking", "Response"],
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
