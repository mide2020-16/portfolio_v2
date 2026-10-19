"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpRight, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ExperienceProject } from "@/components/experience/experience.types";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";

type ProjectFilter = "all" | "personal-project" | "work-product";

export function ProjectsDirectory({
  projects,
}: {
  projects: ExperienceProject[];
}) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");
  const reduceMotion = useReducedMotion();

  const filters: { label: string; value: ProjectFilter }[] = [
    { label: "All projects", value: "all" },
    { label: "Personal projects", value: "personal-project" },
    { label: "Team products", value: "work-product" },
  ];

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        filter === "all" || project.category === filter;

      const searchableText = [
        project.name,
        project.summary,
        project.contribution,
        ...project.technologies,
        ...project.highlights,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [filter, projects, search]);

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects, technologies, or skills..."
            aria-label="Search projects"
            className="min-h-12 w-full border-2 border-border bg-card py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-secondary-accent"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear project search"
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((item) => {
            const active = filter === item.value;

            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.value)}
                className={`min-h-10 border-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors sm:text-xs ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p
          className="text-xs font-semibold text-muted-foreground"
          aria-live="polite"
        >
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {filteredProjects.length > 0 ? (
        <motion.div
          layout={!reduceMotion}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectShowcaseCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-start border-2 border-dashed border-border p-6 sm:p-10">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary-accent">
            No matching projects
          </span>
          <h2 className="mt-2 font-heading text-xl font-black text-foreground">
            Try another search
          </h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            There are no projects matching those filters. Clear the search or
            select another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="mt-5 inline-flex min-h-10 items-center gap-2 border-2 border-foreground bg-foreground px-4 py-2 text-xs font-black uppercase tracking-wider text-background hover:bg-transparent hover:text-foreground"
          >
            Reset filters
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}