import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { allProjects } from "@/data/experience.data";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { SectionLabel } from "../ui/SectionLabel";

export function ProjectsSection() {
  const featuredProjects = allProjects
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-y-2 border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionLabel
              title="Projects"
            />
          </div>

          <Link
            href="/projects"
            className="group inline-flex min-h-11 w-fit shrink-0 items-center gap-3 border-2 border-foreground px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2"
          >
            View all projects
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectShowcaseCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-border p-8 text-sm leading-7 text-muted-foreground">
            No featured projects have been selected yet. Set
            `featured: true` on up to three projects in your experience data.
          </div>
        )}

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 py-2 text-sm font-bold text-foreground transition-colors hover:text-secondary-accent uppercase"
          >
            View all projects
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
