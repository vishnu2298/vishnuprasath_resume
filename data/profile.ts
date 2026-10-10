/**
 * Core profile content. Everything personal lives here so it can be edited in one place.
 * Only links that are filled in are shown — empty ones are hidden, not rendered as disabled buttons.
 */
export const profile = {
  name: "Vishnu Prasath K",
  shortName: "Vishnu Prasath",
  roles: ["Senior MEAN Stack Developer", "Technical Lead"],
  focus: "Senior MEAN Stack Developer · Technical Lead",
  location: "Chennai, India",
  yearsExperience: "7+",

  headline: { lead: ["Building", "reliable", "systems."], follow: "Adding intelligence where it matters." },
  supporting:
    "I work across backend engineering, search, recommendation systems, and AI integration to turn complex requirements into practical software.",
  mainStatement: "I build reliable backend systems and add intelligence where it matters.",
  summary:
    "7+ years of engineering experience across enterprise applications, backend systems, web and mobile apps, data platforms, search, microservices and AI-enabled products.",
  secondary:
    "From Angular and enterprise applications to Node.js, distributed services and AI-native systems.",
  /** Shown under the hero copy. */
  focusStack: ["Node.js", "MongoDB", "Elasticsearch", "Angular", "React Native"],

  /**
   * Optional hero portrait. Put a photo in /public (e.g. public/portrait.jpg, roughly 4:5)
   * and set this to "/portrait.jpg". Leave empty to use the workstation scene instead.
   */
  portrait: "" as string,

  links: {
    linkedin: "" as string,
    github: "https://github.com/vishnu2298" as string,
    email: "" as string,
    /** Path to a PDF in /public, e.g. "/resume.pdf". If empty, "Download PDF" prints Resume Mode. */
    resume: "" as string,
  },

  education: [
    { degree: "M.Sc. Information Technology", note: "Postgraduate" },
    { degree: "B.Sc. Information Technology", note: "2015 – 2018" },
  ],
} as const;

export const site = {
  title: "Vishnu Prasath K — Backend, Search & AI Integration",
  description:
    "Senior MEAN stack developer and technical lead working across Node.js backend systems, microservices, MongoDB, Elasticsearch, recommendation systems and practical AI integration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

/** Prefix for files in /public when the site is served from a sub-path (GitHub Pages). */
export const assetPath = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;
