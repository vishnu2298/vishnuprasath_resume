import { ModeView } from "@/components/providers/ModeProvider";
import { ExperienceView } from "@/components/ExperienceView";
import { Resume } from "@/components/resume/Resume";
import { Footer } from "@/components/navigation/Footer";

export default function Page() {
  return (
    <>
      <ModeView experience={<ExperienceView />} resume={<Resume />} />
      <Footer />
    </>
  );
}
