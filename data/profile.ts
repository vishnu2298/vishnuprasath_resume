/**
 * Core profile content. Everything personal lives here so it can be edited in one place.
 * Contact links are intentionally empty — fill them in before deploying.
 */
export const profile = {
  name: "Vishnu Prasath K",
  displayName: ["VISHNU", "PRASATH"],
  shortName: "Vishnu Prasath",
  roles: ["Backend Engineer", "Technical Lead", "AI Integration Engineer"],
  eyebrow: "Software Engineer • Backend • AI",
  location: "Chennai, India",
  yearsExperience: "7+",
  status: "Currently building with AI",

  headline: ["Building systems.", "Adding intelligence."],
  supporting:
    "Software engineer and technical lead focused on backend systems, scalable APIs, search, recommendations and practical AI integration.",
  mainStatement: "I build reliable backend systems and add intelligence where it matters.",
  summary:
    "7+ years of engineering experience across enterprise applications, backend systems, data platforms, search, microservices and AI-powered products.",
  secondary:
    "From Angular and enterprise applications to Node.js, distributed services and AI-native systems.",
  smallStatement: "From enterprise applications to AI-powered products.",

  /** Fill these in. Empty values render as inactive buttons with a hint. */
  links: {
    linkedin: "" as string,
    github: "" as string,
    email: "" as string,
    /** Path to a PDF in /public, e.g. "/resume.pdf". If empty, "Download Resume" prints Resume Mode to PDF. */
    resume: "" as string,
  },

  education: [
    { degree: "M.Sc. Information Technology", note: "Postgraduate" },
    { degree: "B.Sc. Information Technology", note: "2015 – 2018" },
  ],
} as const;

export const site = {
  title: "Vishnu Prasath K — Software Engineer | Backend | AI",
  description:
    "Software Engineer and Technical Lead specializing in Node.js, backend architecture, microservices, AI integration, recommendation systems and intelligent product platforms.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
