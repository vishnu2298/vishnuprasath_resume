/** Engineering stack — represented by depth/progression, never by percentages. */
export const stackLevels = [
  {
    level: 1,
    name: "Application",
    note: "Where it started",
    items: ["Angular", "AngularJS", "RxJS", "Angular Material", "React Native", "Kendo UI", "NativeScript"],
  },
  {
    level: 2,
    name: "Backend",
    note: "Core identity",
    items: ["Node.js", "Express", "Mongoose", "Sequelize", "REST APIs", "TypeScript"],
  },
  {
    level: 3,
    name: "Data",
    note: "How data moves",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Elasticsearch", "Kibana"],
  },
  {
    level: 4,
    name: "Systems",
    note: "How it fits together",
    items: ["Microservices", "API Architecture", "Auth & Authorization", "CRON / Background Jobs", "Docker", "GitLab CI/CD", "Azure"],
  },
  {
    level: 5,
    name: "Intelligence",
    note: "What I'm adding now",
    items: ["Generative AI", "LLM Integration", "AI Enrichment", "Recommendations", "AI Agents", "Automation", "Voice AI"],
  },
];

export type GalaxyCategory =
  | "backend"
  | "data"
  | "ai"
  | "search"
  | "cloud"
  | "mobile"
  | "devops"
  | "integrations"
  | "architecture"
  | "foundations";

export const galaxyCategories: { id: GalaxyCategory; label: string; color: string }[] = [
  { id: "backend", label: "Backend", color: "#63b7ae" },
  { id: "data", label: "Databases", color: "#a7c7d9" },
  { id: "search", label: "Search", color: "#7aa3c8" },
  { id: "ai", label: "AI", color: "#b7c79b" },
  { id: "architecture", label: "Architecture", color: "#8fc6bd" },
  { id: "integrations", label: "Integrations", color: "#cdbf9f" },
  { id: "mobile", label: "Mobile", color: "#c3b6d6" },
  { id: "devops", label: "DevOps", color: "#8d9fac" },
  { id: "cloud", label: "Cloud / Services", color: "#b6c4cd" },
  { id: "foundations", label: "Foundations", color: "#6f818d" },
];

export type GalaxyNode = { id: string; label: string; category: GalaxyCategory; core?: boolean };

export const galaxyNodes: GalaxyNode[] = [
  // Backend
  { id: "node", label: "Node.js", category: "backend", core: true },
  { id: "ts", label: "TypeScript", category: "backend" },
  { id: "express", label: "Express", category: "backend" },
  { id: "rest", label: "REST APIs", category: "backend" },
  { id: "micro", label: "Microservices", category: "backend" },
  { id: "apiarch", label: "API Architecture", category: "backend" },
  { id: "auth", label: "Auth & Authorization", category: "backend" },
  { id: "cron", label: "CRON / Background Jobs", category: "backend" },
  // Data
  { id: "mongo", label: "MongoDB", category: "data", core: true },
  { id: "es", label: "Elasticsearch", category: "data", core: true },
  { id: "pg", label: "PostgreSQL", category: "data" },
  { id: "mysql", label: "MySQL", category: "data" },
  { id: "mongoose", label: "Mongoose", category: "data" },
  { id: "sequelize", label: "Sequelize", category: "data" },
  { id: "agg", label: "Aggregation Pipelines", category: "data" },
  // Search
  { id: "psearch", label: "Product Search", category: "search" },
  { id: "keyword", label: "Keyword Matching", category: "search" },
  { id: "relevance", label: "Search Relevance", category: "search" },
  { id: "soptim", label: "Search Optimization", category: "search" },
  { id: "kibana", label: "Kibana Dashboards", category: "search" },
  // AI
  { id: "genai", label: "Generative AI", category: "ai", core: true },
  { id: "llm", label: "LLM Integration", category: "ai" },
  { id: "prompt", label: "Prompt Engineering", category: "ai" },
  { id: "agents", label: "AI Agents", category: "ai" },
  { id: "enrich", label: "AI Enrichment", category: "ai" },
  { id: "rag", label: "RAG concepts", category: "ai" },
  { id: "aiauto", label: "AI Automation", category: "ai" },
  { id: "aidev", label: "AI-assisted Dev", category: "ai" },
  { id: "reco", label: "Recommendations", category: "ai" },
  // Architecture
  { id: "m2m", label: "Monolith → Microservices", category: "architecture" },
  { id: "event", label: "Event-driven Workflows", category: "architecture" },
  { id: "orch", label: "API Orchestration", category: "architecture" },
  { id: "separation", label: "Service Separation", category: "architecture" },
  { id: "cache", label: "Caching", category: "architecture" },
  { id: "pipelines", label: "Data Pipelines", category: "architecture" },
  // Integrations
  { id: "serp", label: "SerpAPI", category: "integrations" },
  { id: "affiliate", label: "Affiliate APIs", category: "integrations" },
  { id: "push", label: "Push Notification APIs", category: "integrations" },
  { id: "ocr", label: "OCR APIs", category: "integrations" },
  { id: "analytics", label: "Analytics APIs", category: "integrations" },
  { id: "otp", label: "OTP / SMS Providers", category: "integrations" },
  { id: "thirdparty", label: "Third-party APIs", category: "integrations", core: true },
  // Mobile
  { id: "rn", label: "React Native", category: "mobile", core: true },
  { id: "deeplink", label: "Deep Linking", category: "mobile" },
  { id: "codepush", label: "CodePush Releases", category: "mobile" },
  { id: "native", label: "Android / iOS Native Modules", category: "mobile" },
  // DevOps
  { id: "docker", label: "Docker", category: "devops" },
  { id: "gitlab", label: "GitLab CI/CD", category: "devops" },
  { id: "multirepo", label: "Multi-repo Services", category: "devops" },
  { id: "region", label: "Multi-region Deployment", category: "devops" },
  // Cloud
  { id: "azure", label: "Azure", category: "cloud" },
  { id: "firebase", label: "Firebase", category: "cloud" },
  { id: "cloudapis", label: "Cloud APIs", category: "cloud" },
  { id: "serverside", label: "Server-side Integrations", category: "cloud" },
  // Foundations
  { id: "angular", label: "Angular", category: "foundations" },
  { id: "angularjs", label: "AngularJS", category: "foundations" },
  { id: "rxjs", label: "RxJS", category: "foundations" },
  { id: "nativescript", label: "NativeScript", category: "foundations" },
  { id: "kendo", label: "Kendo UI", category: "foundations" },
];

/** Relationships between technologies — how they actually connect in the systems I build. */
export const galaxyEdges: [string, string][] = [
  // The spine: Node.js ↔ MongoDB ↔ Elasticsearch ↔ AI ↔ External APIs
  ["node", "mongo"],
  ["mongo", "es"],
  ["es", "genai"],
  ["genai", "thirdparty"],
  ["node", "es"],
  ["node", "thirdparty"],
  ["node", "genai"],
  // Backend
  ["node", "ts"],
  ["node", "express"],
  ["express", "rest"],
  ["rest", "apiarch"],
  ["node", "micro"],
  ["micro", "apiarch"],
  ["micro", "m2m"],
  ["micro", "separation"],
  ["apiarch", "orch"],
  // Data
  ["mongo", "mongoose"],
  ["mongoose", "node"],
  ["pg", "sequelize"],
  ["mysql", "sequelize"],
  ["sequelize", "node"],
  ["mongo", "cache"],
  ["mongo", "pipelines"],
  // Search
  ["es", "psearch"],
  ["es", "keyword"],
  ["es", "relevance"],
  ["relevance", "soptim"],
  ["psearch", "serp"],
  ["psearch", "reco"],
  // AI
  ["genai", "llm"],
  ["llm", "prompt"],
  ["llm", "agents"],
  ["llm", "enrich"],
  ["llm", "rag"],
  ["rag", "es"],
  ["genai", "aiauto"],
  ["genai", "aidev"],
  ["reco", "llm"],
  ["reco", "es"],
  ["enrich", "event"],
  // Architecture
  ["event", "pipelines"],
  ["orch", "thirdparty"],
  ["cache", "node"],
  ["node", "auth"],
  ["node", "cron"],
  ["cron", "pipelines"],
  ["mongo", "agg"],
  ["es", "kibana"],
  ["kibana", "analytics"],
  ["thirdparty", "otp"],
  ["auth", "otp"],
  // Mobile
  ["rn", "rest"],
  ["rn", "deeplink"],
  ["rn", "codepush"],
  ["rn", "native"],
  ["rn", "push"],
  // DevOps
  ["docker", "gitlab"],
  ["docker", "micro"],
  ["gitlab", "multirepo"],
  ["multirepo", "micro"],
  ["region", "azure"],
  ["docker", "azure"],
  // Integrations
  ["thirdparty", "serp"],
  ["thirdparty", "affiliate"],
  ["thirdparty", "push"],
  ["thirdparty", "ocr"],
  ["thirdparty", "analytics"],
  ["aiauto", "ocr"],
  // Cloud
  ["azure", "cloudapis"],
  ["firebase", "push"],
  ["cloudapis", "serverside"],
  ["serverside", "node"],
  ["azure", "node"],
  // Foundations
  ["angular", "rest"],
  ["angularjs", "angular"],
  ["nativescript", "angular"],
  ["kendo", "angular"],
  ["rxjs", "angular"],
  ["angular", "node"],
];


/** The request path, with the decision I make at each layer. */
export const backendFlow = [
  {
    label: "Client",
    note: "Web, React Native, partners",
    decision:
      "Keep one versioned contract for web and mobile clients, so app releases — including CodePush updates — and backend deploys can move independently.",
  },
  {
    label: "API",
    note: "Validation, auth, limits",
    decision:
      "Validate and authenticate at the edge: token checks, OTP-based identity and input schemas, so business logic only ever sees trusted, well-formed requests.",
  },
  {
    label: "Business logic",
    note: "Rules, workflows, ownership",
    decision: "Keep each rule in one place per domain. When two services need the same rule, the boundary between them is usually wrong.",
  },
  {
    label: "Services",
    note: "Focused, separable",
    decision:
      "Split by responsibility, not by table: search, recommendations, rewards and comparison each own their data and release on their own schedule.",
  },
  {
    label: "MongoDB / PostgreSQL",
    note: "Source of truth",
    decision:
      "Design schemas around the queries that matter, index for them, and let aggregation pipelines do the work instead of post-processing in application code.",
  },
  {
    label: "Elasticsearch",
    note: "Search & signals",
    decision:
      "Treat Elasticsearch as a read model, not the source of truth: indexes are rebuilt from the database, and mappings follow the searches people actually run.",
  },
  {
    label: "External APIs",
    note: "Normalised integrations",
    decision:
      "Put every external API behind an adapter that normalises its data, retries carefully and fails without taking the whole request down.",
  },
  {
    label: "AI services",
    note: "Enrichment & ranking",
    decision:
      "Keep model calls off the hot path where possible: enrich in background workers, cache the results, and fall back to non-AI behaviour when a model is slow.",
  },
];
