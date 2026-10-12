import { Hero } from "@/components/Hero";
import { AchievementBanner } from "@/components/AchievementBanner";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsGrid } from "@/components/SkillsGrid";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {

  return (
        <main className="flex min-h-screen flex-col">
          <Hero />
          <AchievementBanner />
          <ExperienceTimeline />
          <ProjectsSection />
          <SkillsGrid />
          <EducationSection />
          <ContactSection />
        </main>
  );
}
