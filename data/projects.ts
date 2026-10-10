/**
 * Selected systems. Client / product names are intentionally replaced with capability-focused titles.
 * No metrics, user counts or scale numbers are claimed.
 */
export type ProjectStatus =
  | "Professional Experience"
  | "Selected Engineering Experience"
  | "Currently Building"
  | "Architecture / Product Exploration"
  | "Concept → Building";

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: "professional" | "product";
  status: ProjectStatus;
  summary: string;
  role?: string;
  problem?: string;
  built: string[];
  capabilitiesLabel?: string;
  tech: string[];
  architecture?: string[];
  example?: { prompt: string; steps: string[]; outcome?: string };
  challenge?: string;
  purpose?: string;
  footnote?: string;
  /** Shown as a full case study with its own diagram. */
  featured?: boolean;
  /** The engineering decision that shaped the system — the part worth explaining. */
  decision?: string;
  /** Personal products: position on the Concept → Exploring → Building → Shipped track. */
  labStage?: number;
};

export const projects: Project[] = [
  {
    id: "commerce",
    index: "01",
    title: "Commerce platform backend",
    kind: "professional",
    featured: true,
    decision:
      "Search, comparison, rewards and analytics were separated into focused services, so each could change and be released without touching the others.",
    status: "Professional Experience",
    summary:
      "Backend services for a commerce platform that combines product discovery, comparison, affiliate commerce, rewards, analytics and AI-assisted product information.",
    role: "Backend Engineer / Technical Lead",
    built: [
      "Node.js APIs",
      "MongoDB services",
      "Elasticsearch services",
      "Product APIs & product comparison",
      "Affiliate conversion",
      "Search, rewards & analytics",
      "AI integration",
      "Third-party API integration",
      "Production issue resolution",
      "Service separation",
      "React Native app releases",
      "Email-based identity & OTP flows",
      "Multi-region (US + India) rollout",
    ],
    tech: ["Node.js", "MongoDB", "Elasticsearch", "Kibana", "React Native", "Angular", "AI / LLM", "REST APIs", "Docker", "Azure"],
    architecture: ["Client", "API Gateway", "Node.js Services", "MongoDB", "Elasticsearch", "AI Services", "External APIs"],
  },
  {
    id: "recommendation",
    index: "02",
    title: "Recommendation engine",
    kind: "professional",
    featured: true,
    decision:
      "Candidates come from inexpensive behaviour and product signals first; AI reranking only runs on the short list, and refreshes are scheduled instead of computed on every request.",
    status: "Professional Experience",
    summary:
      "Personalized product recommendations built from user behaviour, product relationships and trending signals.",
    role: "Recommendation architecture & implementation",
    built: [
      "Recommendation architecture",
      "Cold-start recommendations",
      "User activity signals & recent product views",
      "Trending signals and deals",
      "Product relationships",
      "AI-based reranking",
      "Recommendation pagination",
      "Elasticsearch event analysis",
      "Scheduled recommendation refresh",
    ],
    tech: ["Node.js", "Python", "MongoDB", "Elasticsearch", "LLMs", "SerpAPI"],
    architecture: [
      "User Activity",
      "Behavior Signals",
      "Product Intelligence",
      "Recommendation Candidates",
      "AI Reranking",
      "Personalized Results",
    ],
  },
  {
    id: "search",
    index: "03",
    title: "Product search with model-level intent",
    kind: "professional",
    featured: true,
    decision:
      "Detect the product and model in the query before matching, so a search for one specific model returns that model instead of everything that shares its name.",
    status: "Professional Experience",
    summary:
      "Fresher, more relevant product search that combines local inventory with external search results.",
    built: [
      "Exact product search",
      "Keyword matching",
      "Product / model matching",
      "Search relevance",
      "Local inventory + external search",
      "Search freshness",
      "Pagination",
      "Product validation",
    ],
    tech: ["Node.js", "Elasticsearch", "MongoDB", "Search APIs", "Product APIs"],
    example: {
      prompt: "AirPods 5",
      steps: ["Parse query", "Detect product + model intent", "Match exact model", "Validate results"],
      outcome:
        "The system understands the specific product intent instead of returning every product that contains “AirPods”.",
    },
  },
  {
    id: "comparison",
    index: "04",
    title: "Product comparison with background enrichment",
    kind: "professional",
    featured: true,
    decision:
      "AI enrichment runs lazily in background workers and is cached, so a comparison response never waits on a model call.",
    status: "Professional Experience",
    summary:
      "Comparison of merchant offers, prices and affiliate links, with AI-generated product insights added in the background.",
    built: [
      "Merchant & price comparison",
      "Affiliate conversion",
      "Best-value identification",
      "Offer analysis & trust indicators",
      "AI insights & AI scoring",
      "Lazy AI enrichment",
      "Background enrichment",
    ],
    tech: ["Node.js", "MongoDB", "Elasticsearch", "AI / LLM", "Search APIs"],
    architecture: ["MongoDB", "Cache", "Elasticsearch", "External Search", "AI Enrichment", "Comparison API"],
  },
  {
    id: "data-platform",
    index: "05",
    title: "Data extraction & indexing platform",
    kind: "professional",
    status: "Professional Experience",
    summary:
      "Scalable applications for data extraction, analysis, retrieval and indexing — an early foundation for the search and data systems I work with today.",
    role: "Software Engineer",
    problem: "Business data had to be extracted, processed and made retrievable inside working applications.",
    built: ["Data extraction", "Data analysis", "Data retrieval", "Data indexing", "Application integration"],
    tech: ["Node.js", "MongoDB", "Angular"],
    architecture: ["Source Data", "Extraction", "Processing", "MongoDB", "Indexing", "Retrieval", "Application"],
    challenge: "Designing data flows that stay maintainable as sources and requirements grow.",
    purpose: "Make business data usable — the bridge to my later Elasticsearch and search work.",
  },
  {
    id: "erp",
    index: "06",
    title: "ERP & business workflow platform",
    kind: "professional",
    status: "Selected Engineering Experience",
    summary:
      "Enterprise software supporting structured business workflows, operational data, user management and business processes.",
    role: "Backend / Full-stack Engineer",
    problem: "Operational processes needed to be represented as reliable, structured software workflows.",
    built: [
      "Backend development & APIs",
      "Business logic",
      "Database operations",
      "Authentication & user workflows",
      "UI integration",
      "Requirement analysis",
      "Legacy modernization",
      "Production support & feature development",
    ],
    tech: ["Node.js", "Angular", "AngularJS", "MongoDB", "PostgreSQL", "MySQL", "REST APIs"],
    challenge: "Evolving business logic inside existing systems without breaking day-to-day operations.",
    purpose: "Support structured business workflows and operational data.",
  },
  {
    id: "logistics",
    index: "07",
    title: "Logistics & tracking platform",
    kind: "professional",
    status: "Selected Engineering Experience",
    summary: "Systems designed around logistics and operational tracking.",
    built: [
      "Tracking workflows",
      "API integrations",
      "Backend services",
      "Operational data",
      "Business rules",
      "User-facing dashboards",
      "Status-oriented workflows",
    ],
    tech: ["Node.js", "REST APIs", "Angular"],
    purpose: "Give operations teams a clear view of status across tracking workflows.",
  },
  {
    id: "fleet",
    index: "08",
    title: "Fleet management platform",
    kind: "professional",
    status: "Selected Engineering Experience",
    summary: "Enterprise application supporting operational fleet-management workflows.",
    role: "Software Engineer",
    problem: "Fleet operations depended on accurate operational information and dependable workflows.",
    built: [
      "Backend APIs",
      "Business workflows",
      "Data management",
      "Operational information",
      "User workflows",
      "Application maintenance",
      "Production issue resolution",
    ],
    tech: ["Node.js", "Angular", "REST APIs"],
    challenge: "Keeping a working operational system scalable and performant while it continues to change.",
    purpose: "Support day-to-day fleet operations.",
  },
  {
    id: "billing",
    index: "09",
    title: "Client-specific billing platform",
    kind: "professional",
    status: "Selected Engineering Experience",
    summary: "Customized enterprise billing-oriented application workflows built around specific client requirements.",
    role: "Software Engineer",
    problem: "Billing workflows varied by client and had to be implemented as custom business logic.",
    built: [
      "Business logic",
      "Backend APIs",
      "Data handling",
      "Database integration",
      "User workflows",
      "Application maintenance",
    ],
    tech: ["Node.js", "Angular", "PostgreSQL"],
    challenge: "Translating custom client requirements into maintainable rules.",
    purpose: "Support client-specific billing workflows.",
  },
  {
    id: "investor",
    labStage: 2,
    index: "10",
    title: "Investor research assistant",
    kind: "product",
    status: "Currently Building",
    summary:
      "An AI-assisted platform designed to research investors and identify potential investment opportunities — currently being developed.",
    built: [
      "Investor research",
      "Portfolio & profile analysis",
      "Investment-fit scoring",
      "Personalized outreach",
      "AI-generated insights",
      "Follow-up assistance",
    ],
    capabilitiesLabel: "AI capabilities",
    tech: ["Node.js", "AI / LLM", "Automation"],
    architecture: [
      "Discover",
      "Research",
      "Enrich",
      "Qualify",
      "Analyze",
      "Personalize",
      "Human Approval",
      "Outreach",
      "Track",
      "Follow-up",
      "Learn",
    ],
  },
  {
    id: "voice",
    labStage: 1,
    index: "11",
    title: "Voice support platform",
    kind: "product",
    status: "Architecture / Product Exploration",
    summary: "A reusable, multi-tenant AI voice support platform concept.",
    built: [
      "Voice AI",
      "Multi-language support",
      "Tenant isolation & RBAC",
      "Audit logging",
      "Knowledge retrieval",
      "Transactional APIs",
      "REST / GraphQL / database / EDI integrations",
      "Webhooks",
    ],
    capabilitiesLabel: "Capabilities explored",
    tech: ["Node.js", "AI / LLM", "Voice APIs", "REST", "GraphQL", "Webhooks"],
    example: {
      prompt: "A logistics company receives a phone call.",
      steps: [
        "Detect language",
        "Understand intent",
        "Collect required information",
        "Query business APIs",
        "Retrieve shipment / container status",
        "Respond naturally",
        "Escalate when required",
      ],
    },
  },
  {
    id: "realestate",
    labStage: 1.5,
    index: "12",
    title: "Property discovery",
    kind: "product",
    status: "Concept → Building",
    summary: "A personal product concept focused on simplifying property discovery and rental workflows.",
    built: [
      "AI search",
      "Location-aware recommendations",
      "Property discovery",
      "Real-time suggestions",
      "Business workflow automation",
    ],
    capabilitiesLabel: "Focus",
    tech: ["Node.js", "AI / LLM", "Geo search"],
    example: {
      prompt: "Find me a house under ₹10,000 within 2 km.",
      steps: ["Understand intent", "Search available properties", "Filter by price", "Filter by distance", "Rank results", "Suggest"],
    },
  },
  {
    id: "bizos",
    labStage: 2,
    index: "13",
    title: "Business operating system",
    kind: "product",
    status: "Currently Building",
    summary:
      "A personal product initiative exploring a unified business operating system for managing business workflows and digital operations.",
    built: [
      "Business automation",
      "Authentication",
      "Multi-tenant architecture",
      "APIs",
      "Workflow management",
      "AI assistance",
      "Cloud-first architecture",
    ],
    capabilitiesLabel: "Focus",
    tech: ["Node.js", "Multi-tenant", "AI assistance", "Cloud"],
    footnote: "Personal product initiative — ongoing.",
  },
];
