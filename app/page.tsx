import { Hero } from "@/components/Hero";
import { AchievementBanner } from "@/components/AchievementBanner";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsGrid } from "@/components/SkillsGrid";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AchievementBanner />
      <ExperienceTimeline />
      <ProjectsSection />
      <SkillsGrid />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
