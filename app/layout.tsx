import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { profile, site } from "@/data/profile";
import { ModeProvider } from "@/components/providers/ModeProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Nav } from "@/components/navigation/Nav";

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Software Engineer",
    "Backend Engineer",
    "MEAN Stack Developer",
    "Technical Lead",
    "AI Integration",
    "Node.js",
    "Microservices",
    "MongoDB",
    "Elasticsearch",
    "Recommendation Systems",
    "Search",
    "Generative AI",
    "Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: profile.name,
    firstName: "Vishnu Prasath",
    lastName: "K",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101820",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: profile.name,
      url: site.url,
      jobTitle: profile.roles.join(" | "),
      description: site.description,
      address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
      knowsAbout: [
        "Node.js",
        "TypeScript",
        "REST APIs",
        "Microservices",
        "API Architecture",
        "MongoDB",
        "Elasticsearch",
        "PostgreSQL",
        "Generative AI",
        "LLM Integration",
        "Recommendation Systems",
        "Search Systems",
        "Automation",
      ],
      hasCredential: profile.education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: e.degree,
      })),
      sameAs: [profile.links.linkedin, profile.links.github].filter(Boolean),
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      mainEntity: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="grain min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ModeProvider>
          <MotionProvider>
            <Nav />
            {children}
          </MotionProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
