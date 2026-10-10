/**
 * Engineering evolution. Years represent career stages, not exact technology adoption dates.
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
  /** A small flow rendered as the stage's "object". */
  flow: string[];
  status?: "past" | "current" | "next";
};

export const journey: JourneyStage[] = [
  {
    id: "foundation",
    period: "2018",
    stage: "Foundation",
    title: "Enterprise & Web Applications",
    role: "Software Engineer",
    label: "Learning how applications work end-to-end.",
    points: [
      "Robust, client-specific web applications",
      "Frontend engineering and backend APIs",
      "Integration troubleshooting and performance improvements",
      "New feature development with development and testing teams",
      "Identifying integration issues and vulnerabilities",
    ],
    tech: ["Angular 8", "Angular Material", "Kendo UI", "Bootstrap", "NativeScript", "Node.js", "PostgreSQL"],
    flow: ["Angular UI", "Node.js API", "PostgreSQL"],
    status: "past",
  },
  {
    id: "data",
    period: "2020 – 2022",
    stage: "Scalable Data + MEAN",
    title: "Scalable Data & Business Applications",
    role: "Software Engineer",
    label: "Moving from building features to understanding systems.",
    points: [
      "Scalable applications for data extraction, analysis, retrieval and indexing",
      "Modernizing legacy code and modularizing applications",
      "Requirement analysis with business analysts",
      "Cross-functional engineering",
    ],
    tech: ["Node.js", "MongoDB", "AngularJS", "Angular 11"],
    flow: ["Legacy application", "Refactor", "Modular architecture", "Modern web app"],
    status: "past",
  },
  {
    id: "enterprise",
    period: "2022 →",
    stage: "Enterprise Engineering",
    title: "Enterprise Engineering & Large Systems",
    role: "MEAN Stack Developer → Senior Software Engineer",
    label: "Working inside large systems — and learning to change them safely.",
    points: [
      "Analyzing and modifying existing software",
      "Designing, constructing and testing applications",
      "Modernizing codebases with security in mind",
      "Root-cause analysis and technical issue resolution",
      "Project planning and Agile Scrum collaboration",
    ],
    tech: ["Angular", "AngularJS", "Node.js", "REST APIs", "MongoDB"],
    flow: ["MEAN stack", "Node.js backend", "API engineering"],
    status: "past",
  },
  {
    id: "backend",
    period: "Current",
    stage: "Backend + Microservices + AI",
    title: "Backend, Search, Microservices & AI",
    role: "Software Engineer / Technical Lead",
    label: "Thinking in services, data flow and intelligence.",
    points: [
      "Node.js services and API architecture",
      "MongoDB and Elasticsearch",
      "Monolith → microservice migration",
      "Recommendation and search systems",
      "AI integration in production workflows",
      "React Native mobile apps with deep linking and CodePush releases",
      "Analytics pipelines and Kibana dashboards",
      "Task ownership, code review and technical guidance",
    ],
    tech: ["Node.js", "MongoDB", "Elasticsearch", "Kibana", "React Native", "Microservices", "LLM Integration", "Docker", "GitLab CI/CD", "Azure"],
    flow: ["Search / Elasticsearch", "Microservices", "AI integration", "Intelligent systems"],
    status: "current",
  },
  {
    id: "next",
    period: "Next",
    stage: "AI-Native Product Engineering",
    title: "AI-Native Product Engineering",
    label: "Systems where AI is part of the architecture itself.",
    points: [
      "AI products built outside of work",
      "Agents, voice and intelligent platforms",
      "Technical leadership on AI-enabled systems",
    ],
    tech: ["AI Agents", "Voice AI", "Automation", "Product thinking"],
    flow: ["Personal products", "Entrepreneurial thinking"],
    status: "next",
  },
];

export const codeToSystems = {
  early: {
    label: "Early engineer",
    question: "How do I build this feature?",
    flow: ["UI", "API", "Database"],
  },
  current: {
    label: "Current engineer",
    question: "How should this system work?",
    flow: ["User", "Intent", "API", "Business Logic", "Search", "Data", "AI", "External Systems", "Response"],
  },
  message: "Experience changed the questions I ask.",
};

export const biggerStory = [
  "I started by building interfaces.",
  "I learned how applications communicate.",
  "I learned how data moves through systems.",
  "I moved deeper into backend engineering.",
  "I worked with production systems and business requirements.",
  "I learned to think about architecture and scalability.",
  "I started integrating search and intelligence.",
  "Now I'm building systems where AI becomes part of the engineering architecture itself.",
];

export const progression = [
  "Work experience",
  "Engineering experience",
  "System design",
  "AI integration",
  "Personal products",
  "Entrepreneurial thinking",
];
