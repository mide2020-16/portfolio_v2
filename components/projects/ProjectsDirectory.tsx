"use client";

import type { ExperienceProject } from "@/components/experience/experience.types";
import { ProjectPresentation } from "./ProjectPresentation";

export function ProjectsDirectory({
  projects,
}: {
  projects: ExperienceProject[];
}) {
  return <ProjectPresentation projects={projects} />;
}
