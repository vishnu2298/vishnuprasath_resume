import { Hero } from "@/components/hero/Hero";
import { Journey } from "@/components/timeline/Journey";
import { CodeToSystems } from "@/components/timeline/CodeToSystems";
import { EngineeringStack } from "@/components/skills/EngineeringStack";
import { TechGalaxy } from "@/components/skills/TechGalaxy";
import { BackendCore } from "@/components/architecture/BackendCore";
import { ArchitectureLab } from "@/components/architecture/ArchitectureLab";
import { Projects } from "@/components/projects/Projects";
import { Problems } from "@/components/experience/Problems";
import { Principles } from "@/components/experience/Principles";
import { Education, Leadership, Roles } from "@/components/experience/Experience";
import { AISection } from "@/components/ai/AISection";
import { Lab } from "@/components/lab/Lab";
import { Contact } from "@/components/contact/Contact";
import { WorldLoader } from "@/components/3d/WorldLoader";
import { ScrollDirector } from "@/components/3d/ScrollDirector";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Experience Mode. The order follows the work:
 * who → how it progressed → what I use → how a request flows → what I built → how I design → AI → career → lab → contact.
 */
export function ExperienceView() {
  return (
    <>
      <WorldLoader />
      <ScrollDirector />
      <main id="main" className="relative">
        <Hero />

        <Section id="journey" chapter="journey">
          <div className="container-x">
            <SectionHeader
              id="journey"
              eyebrow="About"
              layout="split"
              title="From interfaces to systems — and the intelligence inside them."
              lead="Seven years, six stages. Each one built on the last instead of replacing it."
            />
            <Journey />
            <CodeToSystems />
          </div>
        </Section>

        <Section id="stack" chapter="stack">
          <div className="container-x">
            <SectionHeader
              id="stack"
              size="md"
              title="What I work with"
              lead="Read from the top: what I'm adding now, down to where I started. No skill bars, no percentages."
            />
            <EngineeringStack />
            <div className="mt-28">
              <Reveal className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
                <h3 className="heading text-[clamp(1.6rem,3vw,2.3rem)]">How the pieces connect</h3>
                <p className="text-muted">
                  Technologies are linked by how they work together in the systems I build — select one to see its neighbours.
                </p>
              </Reveal>
              <TechGalaxy />
            </div>
          </div>
        </Section>

        <Section id="backend" chapter="backend">
          <div className="container-x">
            <SectionHeader
              id="backend"
              eyebrow="Backend"
              title="Most of the engineering lives on the path a request takes."
              lead="Pick a layer to see the decision I make there."
            />
            <BackendCore />
          </div>
        </Section>

        <Section id="systems" chapter="systems">
          <div className="container-x">
            <SectionHeader
              id="systems"
              eyebrow="Selected work"
              layout="split"
              title="Systems I've built and led"
              lead="Client and product names stay confidential, and nothing here claims numbers I can't support."
            />
            <Projects />
          </div>
        </Section>

        <Section id="problems" chapter="problems">
          <div className="container-x">
            <SectionHeader id="problems" size="md" title="The interesting part usually isn't the code." />
            <Problems />
          </div>
        </Section>

        <Section id="architecture" chapter="architecture">
          <div className="container-x">
            <SectionHeader
              id="architecture"
              eyebrow="Architecture"
              layout="split"
              title="Monolith → services → intelligence"
              lead="Three patterns I've worked with. Switch between them and orbit the model to see how responsibilities separate."
            />
            <ArchitectureLab />
          </div>
        </Section>

        <Section id="principles" chapter="principles" className="md:py-24">
          <div className="container-x">
            <SectionHeader id="principles" size="md" title="How I approach engineering" />
            <Principles />
          </div>
        </Section>

        <Section id="ai" chapter="ai">
          <div className="container-x">
            <SectionHeader id="ai" eyebrow="AI integration" title="AI, used where it changes the outcome." />
            <AISection />
          </div>
        </Section>

        <Section id="experience" chapter="experience">
          <div className="container-x">
            <SectionHeader
              id="experience"
              eyebrow="Career"
              layout="split"
              title="Seven years, four kinds of work"
              lead="Enterprise applications, data platforms, backend systems and AI-enabled products. Employers and clients are kept confidential."
            />
            <Roles />
            <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Leadership />
              <Education />
            </div>
          </div>
        </Section>

        <Section id="lab" chapter="lab">
          <div className="container-x">
            <SectionHeader
              id="lab"
              eyebrow="The lab"
              title="Things I'm building after work"
              lead="Personal products and experiments, each shown at the stage it's really at."
            />
            <Lab />
          </div>
        </Section>

        <Section id="contact" chapter="contact" className="pb-36 md:pb-44 md:pt-40">
          <div className="container-x">
            <Contact />
          </div>
        </Section>
      </main>
    </>
  );
}
