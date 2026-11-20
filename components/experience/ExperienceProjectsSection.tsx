import type {
  ExperienceGroupKind,
  ExperienceProject,
  ExperienceView,
} from "../../types/experience.types";
import { ExperienceProjectCard } from "./ExperienceProjectCard";

interface ExperienceProjectsSectionProps {
  projects?: ExperienceProject[];
  kind: ExperienceGroupKind;
  view: ExperienceView;
  shouldReduceMotion: boolean;
}

export function ExperienceProjectsSection({
  projects = [],
  kind,
  view,
  shouldReduceMotion,
}: ExperienceProjectsSectionProps) {
  const displayedProjects = projects
    .filter((project) => view === "all" || project.featured)
    .slice(0, view === "home" ? 3 : undefined);

  if (displayedProjects.length === 0) return null;

  const isPersonal = kind === "personal";

  return (
    <div className="mt-6">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <h4 className="mt-1 font-heading text-base font-black text-foreground sm:text-lg">
          {isPersonal ? "See Personal Projects" : view === "all" ? "View Projects" : "View Project"}
        </h4>

        {isPersonal && (
          <span className="text-[10px] font-bold text-muted-foreground sm:text-xs">
            {view === "home"
              ? `Showing ${displayedProjects.length} featured projects`
              : `${displayedProjects.length} personal projects`}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {displayedProjects.map((project, projectIndex) => (
          <ExperienceProjectCard
            view={view}
            key={project.id}
            project={project}
            index={projectIndex}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </div>
  );
}