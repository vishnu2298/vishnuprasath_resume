import { Hero } from "@/components/hero/Hero";
import { Journey } from "@/components/timeline/Journey";
import { CodeToSystems } from "@/components/timeline/CodeToSystems";
import { EngineeringStack } from "@/components/skills/EngineeringStack";
import { TechGalaxy } from "@/components/skills/TechGalaxy";
import { BackendCore } from "@/components/architecture/BackendCore";
import { ArchitectureLab } from "@/components/architecture/ArchitectureLab";
import { Capabilities } from "@/components/projects/Capabilities";
import { Projects } from "@/components/projects/Projects";
import { Problems } from "@/components/experience/Problems";
import { Principles } from "@/components/experience/Principles";
import { Education, Leadership, Metrics, Roles } from "@/components/experience/Experience";
import { AISection } from "@/components/ai/AISection";
import { Lab } from "@/components/lab/Lab";
import { BiggerStory, Contact } from "@/components/contact/Contact";
import { WorldLoader } from "@/components/3d/WorldLoader";
import { ScrollDirector } from "@/components/3d/ScrollDirector";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

/**
 * Experience Mode. The order follows the story:
 * who → where it started → how it evolved → what I build → how I think → what now → what next → let's build.
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
              index="01"
              eyebrow="Where it started"
              title={
                <>
                  The engineer
                  <br />
                  behind the systems
                </>
              }
              lead="Not a biography — a technical evolution. From interfaces, to data, to services, to intelligence."
            />
            <Journey />
            <CodeToSystems />
          </div>
        </Section>

        <Section id="stack" chapter="stack">
          <div className="container-x">
            <SectionHeader
              id="stack"
              index="02"
              eyebrow="How I evolved"
              title={
                <>
                  I didn&apos;t abandon what I learned.
                  <br />
                  <span className="text-accent">I built on top of it.</span>
                </>
              }
              lead="Five layers of depth — from application foundations to intelligence. No skill bars, no percentages."
            />
            <EngineeringStack />
            <div className="mt-28">
              <Reveal className="mb-10 max-w-3xl">
                <p className="eyebrow mb-4">Technology galaxy</p>
                <h3 className="heading text-[clamp(1.8rem,4vw,3.2rem)]">How the stack connects</h3>
              </Reveal>
              <TechGalaxy />
            </div>
          </div>
        </Section>

        <Section id="backend" chapter="backend">
          <div className="container-x">
            <SectionHeader
              id="backend"
              index="03"
              eyebrow="Core identity"
              title="Backend is where I think."
              lead="Requests, rules, data, search, integrations and intelligence — the path a request takes is where most of the real engineering lives."
            />
            <BackendCore />
          </div>
        </Section>

        <Section id="build" chapter="build">
          <div className="container-x">
            <SectionHeader id="build" index="04" eyebrow="What I build" title="More than APIs" lead="I build systems around real business problems." />
            <Capabilities />
          </div>
        </Section>

        <Section id="systems" chapter="systems">
          <div className="container-x">
            <SectionHeader
              id="systems"
              index="05"
              eyebrow="Work"
              title="Selected systems I've built"
              lead="The problem, my role and the technology. Client and product names stay confidential; work in progress is labelled as such."
            />
            <Projects />
          </div>
        </Section>

        <Section id="problems" chapter="problems">
          <div className="container-x">
            <SectionHeader id="problems" index="06" eyebrow="Engineering problem solving" title="The interesting part isn't the code." />
            <Problems />
          </div>
        </Section>

        <Section id="architecture" chapter="architecture">
          <div className="container-x">
            <SectionHeader
              id="architecture"
              index="07"
              eyebrow="Architecture lab"
              title={
                <>
                  Monolith → services
                  <br />→ intelligence
                </>
              }
              lead="Switch between patterns I've worked with. Orbit and zoom to see how responsibilities separate."
            />
            <ArchitectureLab />
          </div>
        </Section>

        <Section id="principles" chapter="principles">
          <div className="container-x">
            <SectionHeader id="principles" index="08" eyebrow="How I think" title="How I approach engineering" />
            <Principles />
          </div>
        </Section>

        <Section id="ai" chapter="ai">
          <div className="container-x">
            <SectionHeader
              id="ai"
              index="09"
              eyebrow="What I'm doing now"
              title={
                <>
                  AI is now part of
                  <br />
                  <span className="text-accent">my engineering stack</span>
                </>
              }
            />
            <AISection />
          </div>
        </Section>

        <Section id="experience" chapter="experience">
          <div className="container-x">
            <SectionHeader
              id="experience"
              index="10"
              eyebrow="Experience"
              title="Engineering beyond code"
              lead={`${profile.yearsExperience} years across enterprise applications, data platforms, backend systems and AI-enabled products. Employers and clients are kept confidential.`}
            />
            <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr]">
              <Roles />
              <div className="flex flex-col gap-6">
                <Leadership />
                <Education />
              </div>
            </div>
            <div className="mt-20">
              <Metrics />
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-dim">
                No invented revenue, user counts or percentages — only what can be supported.
              </p>
            </div>
          </div>
        </Section>

        <Section id="lab" chapter="lab">
          <div className="container-x">
            <SectionHeader
              id="lab"
              index="11"
              eyebrow="The lab · Experiments"
              title="Things I'm building after work"
              lead="Products and experiments in progress. Each one shows where it really is — nothing here is presented as finished."
            />
            <Lab />
          </div>
        </Section>

        <Section id="contact" chapter="contact" className="pb-40 md:pb-48">
          <div className="container-x">
            <div className="mb-28">
              <BiggerStory />
            </div>
            <Contact />
          </div>
        </Section>
      </main>
    </>
  );
}
