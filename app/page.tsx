import { Hero } from "@/components/hero/Hero";
import { AchievementBanner } from "@/components/achievement/AchievementBanner";
import { SkillsGrid } from "@/components/SkillsGrid";
import { EducationSection } from "@/components/education/EducationSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <AchievementBanner />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsGrid />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
