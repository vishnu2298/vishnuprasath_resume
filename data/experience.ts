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
      "React Native mobile apps (deep linking, CodePush releases)",
      "Elasticsearch + Kibana analytics dashboards",
      "CRON jobs & background processing",
      "OTP provider migration",
      "Multi-region rollout & localization",
      "Docker, GitLab CI/CD & Azure deployments",
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
    "Code reviews & best practices",
    "Sprint planning with product, QA & marketing",
  ],
};

/** Smaller experiments that sit alongside the personal products. None of these are shipped. */
export const labExperiments: { title: string; note: string }[] = [
  { title: "Workflow automation", note: "Agents and scripts that replace repeated manual steps in real systems." },
  { title: "Recommendation experiments", note: "Signals, candidate generation and reranking ideas tried outside work." },
  { title: "AI-assisted development", note: "Multi-agent setups for development, QA and product tasks." },
];

export const labStages = ["Concept", "Exploring", "Building", "Shipped"];
