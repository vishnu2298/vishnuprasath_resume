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
  capabilities?: string[];
  tech: string[];
  architecture?: string[];
  example?: { prompt: string; steps: string[]; outcome?: string };
  challenge?: string;
  purpose?: string;
  footnote?: string;
};

export const projects: Project[] = [
  {
    id: "commerce",
    index: "01",
    title: "AI-Powered Commerce Platform",
    kind: "professional",
    status: "Professional Experience",
    summary:
      "A large-scale commerce platform combining product discovery, product comparison, affiliate commerce, rewards, analytics and AI-powered product intelligence.",
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
    ],
    tech: ["Node.js", "MongoDB", "Elasticsearch", "AI / LLM", "SerpAPI", "REST APIs", "Azure"],
    architecture: ["Client", "API Gateway", "Node.js Services", "MongoDB", "Elasticsearch", "AI Services", "External APIs"],
  },
  {
    id: "recommendation",
    index: "02",
    title: "AI Recommendation Engine",
    kind: "professional",
    status: "Professional Experience",
    summary:
      "An intelligent recommendation system designed to provide personalized product recommendations based on user behavior and product signals.",
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
    title: "Intelligent Product Search",
    kind: "professional",
    status: "Professional Experience",
    summary:
      "A product search system designed to provide fresher and more relevant results by combining local product inventory with external search intelligence.",
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
    title: "AI Product Comparison System",
    kind: "professional",
    status: "Professional Experience",
    summary:
      "A product comparison system that combines merchant offers, affiliate links, pricing information and AI-generated product intelligence.",
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
    title: "Data Extraction & Searchable Data Platform",
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
    title: "Enterprise ERP & Business Workflow Platform",
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
    title: "Logistics / Tracking Platform",
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
    title: "Fleet Management Platform",
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
    title: "Customized Billing Platform",
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
    index: "10",
    title: "AI Investor Intelligence Platform",
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
    index: "11",
    title: "AI Voice Support Platform",
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
    index: "12",
    title: "AI-Powered Real Estate Platform",
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
    index: "13",
    title: "Business Operating System",
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

/** "More than APIs" — categories of systems built around real business problems. */
export const capabilities = [
  {
    id: "commerce",
    title: "Intelligent Commerce",
    description:
      "Built and enhanced systems around product discovery, product comparison, affiliate commerce, product intelligence, rewards and personalized shopping.",
    listLabel: "Technologies",
    items: ["Node.js", "MongoDB", "Elasticsearch", "AI", "SerpAPI", "Affiliate APIs"],
  },
  {
    id: "reco",
    title: "Recommendation Systems",
    description:
      "Designed recommendation workflows that combine user behavior, recent activity, product signals, trending products, deals and AI-based ranking.",
    listLabel: "Capabilities",
    items: [
      "Cold-start recommendations",
      "Personalization",
      "Trending products",
      "Product relationships",
      "AI reranking",
      "Behavior signals",
      "Diversity & exploration",
    ],
  },
  {
    id: "search",
    title: "Search Intelligence",
    description:
      "Improved product search by combining local inventory with fresh external search results and relevance-based matching.",
    listLabel: "Capabilities",
    items: [
      "Exact keyword search",
      "Product / model matching",
      "Search freshness",
      "Local inventory",
      "External search APIs",
      "Elasticsearch",
      "Pagination",
      "Relevance optimization",
    ],
  },
  {
    id: "ai",
    title: "AI Product Intelligence",
    description:
      "Integrated AI into product workflows to enrich product information, generate insights and improve product comparison experiences.",
    listLabel: "AI capabilities",
    items: ["AI enrichment", "Product analysis", "Comparison insights", "AI scoring", "LLM integration", "Background processing"],
  },
  {
    id: "automation",
    title: "Business Automation",
    description: "Built backend workflows that connect emails, APIs, databases, notifications and business processes.",
    listLabel: "Examples",
    items: [
      "Email processing",
      "OCR workflows",
      "Push notifications",
      "Analytics",
      "Rewards",
      "Referrals",
      "Subscriptions",
      "Automated business events",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    description:
      "Built business applications and ERP-style systems involving workflows, users, permissions, APIs and operational data.",
    listLabel: "Including",
    items: ["ERP workflows", "Fleet management", "Custom billing", "Data extraction & indexing", "Roles & permissions"],
  },
];
