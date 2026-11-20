import Link from "next/link";
import { ProjectDeviceStage } from "../ui/DeviceMockups";
import { ArrowUpRight } from "lucide-react";
import { ExperienceProject } from "../../types/experience.types";

export function ProjectIntroduction({
  project,
  isOpen,
}: {
  project: ExperienceProject;
  isOpen: boolean;
}) {
  return (
    <div className="grid min-h-[min(78vh,760px)] gap-6 p-5 sm:p-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-10 lg:p-12">
      <div className="order-2 lg:order-1">
        <h2 className="mt-3 font-heading text-3xl font-black leading-tight sm:text-5xl">
          {project.name}
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {project.summary}
        </p>

        <p className="mt-5 text-xs font-black uppercase tracking-[.13em] text-foreground/70">
          Contributions
        </p>

        <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
          {project.contribution}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-border bg-highlight/20 px-2.5 py-1.5 text-[10px] font-bold"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="mt-7 inline-flex min-h-11 items-center gap-2 border-2 border-foreground bg-foreground px-4 py-3 text-xs font-black uppercase tracking-[.1em] text-background hover:bg-secondary-accent hover:text-foreground"
        >
          Read project case study
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="order-1 overflow-hidden lg:order-2">
        <ProjectDeviceStage
          platform={project.platform}
          desktopScreenshot={project.desktopScreenshot}
          mobileScreenshot={project.mobileScreenshot}
          title={project.name}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}