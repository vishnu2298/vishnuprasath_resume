/** Roles are described by what the work was, not by employer or client names. */
export const roles = [
  {
    title: "Software Engineer / Technical Lead",
    context: "Backend, microservices & AI integration",
    period: "Current",
    current: true,
    points: [
      "Backend development with Node.js services",
      "API architecture",
      "Production issue resolution",
      "Task allocation & technical guidance",
      "Microservice migration",
      "MongoDB & Elasticsearch",
      "AI integrations",
      "Recommendation & search systems",
      "Third-party integrations",
    ],
  },
  {
    title: "Senior Software Engineer / MEAN Stack Developer",
    context: "Enterprise engineering",
    period: "2022 →",
    points: [
      "Analyzing, modifying and modernizing existing systems",
      "Designing, constructing and testing applications",
      "Angular, AngularJS, Node.js & REST APIs",
      "Business workflows & production support",
      "Root-cause analysis, project planning, Agile Scrum",
    ],
  },
  {
    title: "Software Engineer",
    context: "Scalable data & business applications",
    period: "Feb 2020 – Mar 2022",
    points: [
      "Data extraction, analysis, retrieval and indexing",
      "MongoDB, Node.js, AngularJS, Angular 11",
      "Legacy modernization & modularization",
      "Requirement analysis with business analysts",
    ],
  },
  {
    title: "Software Engineer",
    context: "Enterprise & web applications",
    period: "2018 – 2020",
    points: [
      "Client-specific web applications",
      "Angular 8, NativeScript, Node.js, PostgreSQL",
      "Integration troubleshooting & performance improvements",
      "Feature development with development and testing teams",
    ],
  },
];

export const leadership = {
  foundations: [
    "Technical problem solving",
    "Root-cause analysis",
    "Task planning",
    "Agile / Scrum",
    "Cross-functional teams",
    "Translating requirements into implementation",
    "Modernizing existing systems",
  ],
  now: [
    "Assigning tasks",
    "Reviewing implementation",
    "Supporting junior developers",
    "API issue resolution",
    "Architecture discussions",
    "Microservice migration",
    "AI-assisted engineering",
  ],
};

/** Only claims that can be supported — no revenue, users or percentages. */
export const metrics = [
  { value: "7+", label: "Years", note: "Engineering experience" },
  { value: "Multiple", label: "Production systems", note: "Built, maintained & debugged" },
  { value: "AI", label: "In real products", note: "Integrated, not demoed" },
  { value: "Microservices", label: "Architecture & migration", note: "Monolith → services" },
  { value: "Search", label: "& recommendations", note: "Product intelligence" },
];

export type LabStatus = "BUILDING" | "EXPLORING" | "EXPERIMENT" | "CONCEPT";

/** Stage index on a Concept → Exploring → Building → Shipped track. Nothing here is shipped. */
export const labProjects: { title: string; status: LabStatus; statusText: string; stage: number; note: string }[] = [
  { title: "AI Investor Intelligence", status: "BUILDING", statusText: "Building", stage: 2, note: "Research → qualify → personalize → human approval" },
  { title: "Business Operating System", status: "BUILDING", statusText: "Building", stage: 2, note: "Multi-tenant workflows with AI assistance" },
  { title: "AI Real Estate Platform", status: "CONCEPT", statusText: "Concept → Building", stage: 1.5, note: "Natural-language, location-aware property discovery" },
  { title: "AI Voice Support", status: "EXPLORING", statusText: "Exploring", stage: 1, note: "Multi-tenant voice agent over business APIs" },
  { title: "AI Automation", status: "EXPERIMENT", statusText: "Experiment", stage: 1, note: "Workflows that replace repeated manual steps" },
  { title: "Recommendation Systems", status: "EXPERIMENT", statusText: "Experiment", stage: 1, note: "Signals, candidates and reranking ideas" },
  { title: "Developer Productivity", status: "EXPLORING", statusText: "Exploring", stage: 1, note: "AI-assisted development workflows" },
  { title: "AI-powered Workflows", status: "EXPLORING", statusText: "Exploring", stage: 1, note: "Agents connected to real systems" },
];

export const labStages = ["Concept", "Exploring", "Building", "Shipped"];
