import { Hero } from "@/components/hero/Hero";
import { AchievementBanner } from "@/components/achievement/AchievementBanner";
import { SkillsGrid } from "@/components/SkillsGrid";
import { EducationSection } from "@/components/education/EducationSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementBanner />
      <SkillsGrid />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
