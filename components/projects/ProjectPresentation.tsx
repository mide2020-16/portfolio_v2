"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Columns2,
  Rows3,
  Search,
  X,
} from "lucide-react";

import type {
  ExperienceProject,
  ProjectTopic,
} from "@/types/experience.types";
import { ProjectIntroduction } from "./projectIntroduction";

type OwnerFilter = "all" | "personal-project" | "work-product";
type ViewMode = "vertical" | "horizontal";

const topicLabels: Record<ProjectTopic, string> = {
  "web-applications": "Web applications",
  "mobile-applications": "Mobile applications",
  "ai-machine-learning": "AI / machine learning",
  "backend-apis": "Backend / APIs",
  "developer-tools": "Other / tools",
};

const ownerFilters: { label: string; value: OwnerFilter }[] = [
  { label: "All projects", value: "all" },
  { label: "Personal projects", value: "personal-project" },
  { label: "Professional / team", value: "work-product" },
];

export function ProjectPresentation({
  projects,
}: {
  projects: ExperienceProject[];
}) {
  const [owner, setOwner] = useState<OwnerFilter>("all");
  const [topic, setTopic] = useState<ProjectTopic | "all">("all");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<ViewMode>("vertical");
  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion() ?? false;

  const availableTopics = useMemo(
    () =>
      Array.from(
        new Set(projects.flatMap((project) => project.topics ?? [])),
      ),
    [projects],
  );

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const haystack = [
        project.name,
        project.summary,
        project.contribution,
        ...project.technologies,
        ...project.highlights,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (owner === "all" || project.category === owner) &&
        (topic === "all" || project.topics?.includes(topic)) &&
        (!search.trim() || haystack.includes(search.trim().toLowerCase()))
      );
    });
  }, [owner, topic, search, projects]);

  const displayIndex = Math.min(
    activeIndex,
    Math.max(filtered.length - 1, 0),
  );

  const reset = () => {
    setOwner("all");
    setTopic("all");
    setSearch("");
    setActiveIndex(0);
  };

  const filterButton = (active: boolean) =>
    `min-h-10 border-2 px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${active
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
    }`;

  const goToPrevious = () => {
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      Math.min(filtered.length - 1, current + 1),
    );
  };

  useEffect(() => {
    if (mode !== "horizontal") return;

    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          Math.min(current + 1, filtered.length - 1),
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, mode]);

  return (
    <div>
      {/* Sticky Search & Presentation Mode Bar */}
      <div className="sticky top-0 z-30 -mx-2 mb-6 bg-background/85 px-2 py-3 backdrop-blur-md sm:-mx-3 sm:px-3">
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xl">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search projects, technologies, or skills..."
              aria-label="Search projects"
              className="min-h-12 w-full border-2 border-border bg-card/95 py-3 pl-11 pr-10 text-sm outline-none transition-colors focus:border-secondary-accent"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveIndex(0);
                }}
                aria-label="Clear project search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Presentation Mode */}
          <div
            className="inline-flex w-fit shrink-0 border-2 border-border bg-card/95 p-1"
            role="group"
            aria-label="Project presentation mode"
          >
            <button
              type="button"
              aria-pressed={mode === "vertical"}
              onClick={() => setMode("vertical")}
              className={`inline-flex min-h-10 items-center gap-2 px-3 text-[10px] font-black uppercase tracking-wider transition-colors ${mode === "vertical"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Rows3 size={15} />
              Vertical
            </button>

            <button
              type="button"
              aria-pressed={mode === "horizontal"}
              onClick={() => setMode("horizontal")}
              className={`inline-flex min-h-10 items-center gap-2 px-3 text-[10px] font-black uppercase tracking-wider transition-colors ${mode === "horizontal"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Columns2 size={15} />
              Horizontal
            </button>
          </div>
        </div>

        {/* Soft blur shadow along the bottom border of the sticky bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-5 h-5 bg-linear-to-b from-background/80 via-background/30 to-transparent blur-[3px] shadow-[0_8px_18px_-6px_rgba(15,23,42,0.22)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/70 shadow-[0_4px_12px_rgba(15,23,42,0.18)]"
        />
      </div>

      {/* Non-sticky Filters */}
      <div className="mb-8 space-y-5">
        {/* Ownership Filters */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by ownership"
        >
          {ownerFilters.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={owner === item.value}
              onClick={() => {
                setOwner(item.value);
                setActiveIndex(0);
              }}
              className={filterButton(owner === item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Topic Filters */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by type"
        >
          <button
            type="button"
            aria-pressed={topic === "all"}
            onClick={() => {
              setTopic("all");
              setActiveIndex(0);
            }}
            className={filterButton(topic === "all")}
          >
            All types
          </button>

          {availableTopics.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => {
                setTopic(item);
                setActiveIndex(0);
              }}
              className={filterButton(topic === item)}
            >
              {topicLabels[item]}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p
          className="text-xs font-semibold text-muted-foreground"
          aria-live="polite"
        >
          Showing {filtered.length}{" "}
          {filtered.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-border p-8">
          <p className="font-heading text-xl font-black">
            No matching projects
          </p>

          <button
            type="button"
            onClick={reset}
            className="mt-4 border-2 border-foreground bg-foreground px-4 py-2 text-xs font-black uppercase tracking-wider text-background"
          >
            Reset filters
          </button>
        </div>
      ) : mode === "vertical" ? (
        /* Vertical Presentation */
        <div className="space-y-6">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              initial={
                reduceMotion ? false : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.45 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
              }}
              className="overflow-hidden border-2 border-border bg-card transition-colors"
            >
              <ProjectIntroduction
                project={project}
                isOpen={true}
              />
            </motion.article>
          ))}
        </div>
      ) : (
        /* Horizontal Presentation with Fixed-Position Controls */
        <section
          className="relative overflow-hidden border-2 border-border bg-card"
          aria-label="Horizontal project presentation"
        >
          {/* Fixed-position overlay rail for Previous / Next buttons */}
          <div
            aria-hidden="false"
            className="pointer-events-none absolute inset-x-0 top-56 z-20 flex items-center justify-between px-3 sm:top-64 sm:px-5"
          >
            <button
              type="button"
              onClick={goToPrevious}
              disabled={displayIndex === 0}
              aria-label="Previous project"
              className="pointer-events-auto flex size-10 items-center justify-center border-2 border-border bg-background/95 text-foreground shadow-lg backdrop-blur transition-colors hover:border-secondary-accent hover:bg-secondary-accent hover:text-background disabled:pointer-events-none disabled:opacity-30 sm:size-12"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              disabled={displayIndex === filtered.length - 1}
              aria-label="Next project"
              className="pointer-events-auto flex size-10 items-center justify-center border-2 border-border bg-background/95 text-foreground shadow-lg backdrop-blur transition-colors hover:border-secondary-accent hover:bg-secondary-accent hover:text-background disabled:pointer-events-none disabled:opacity-30 sm:size-12"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Project Content */}
          <AnimatePresence mode="wait">
            {filtered[displayIndex] && (
              <motion.div
                key={filtered[displayIndex].id}
                initial={
                  reduceMotion ? false : { opacity: 0, x: 24 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, x: -24 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                }}
              >
                <ProjectIntroduction
                  project={filtered[displayIndex]}
                  isOpen
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Counter */}
          <div className="flex items-center justify-center border-t-2 border-border px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              <span className="text-foreground">
                {String(displayIndex + 1).padStart(2, "0")}
              </span>{" "}
              / {String(filtered.length).padStart(2, "0")}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}