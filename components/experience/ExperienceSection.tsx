"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "../ui/SectionLabel";
import { ExperienceGroupCard } from "./ExperienceGroupCard";
import { experienceGroups } from "./experience.data";
import type { ExperienceView } from "./experience.types";

export function ExperienceSection({
  view = "home",
  showWorkLink = true,
}: {
  view?: ExperienceView;
  showWorkLink?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const displayedGroups = experienceGroups.filter(
    (group) => group.kind === "employment",
  );

  return (
    <section
      id={view === "home" ? "experience" : "work-experience"}
      aria-label="Ayomide. Experience"
      className="relative overflow-hidden border-y-2 border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border border-foreground/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full border border-foreground/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full border border-foreground/[0.07]"
      />

      <div className="relative mx-auto max-w-6xl space-y-5 px-4 sm:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionLabel
              title={view === "home" ? "Experience" : "Experience & Achievements"}
            />
          {view === "home" && showWorkLink && (
            <Link
              href="/experience"
              className="group inline-flex w-fit shrink-0 items-center gap-2 border-2 border-foreground bg-foreground px-4 py-3 text-xs font-black uppercase tracking-[0.13em] text-background shadow-[4px_4px_0px_0px_var(--secondary-accent)] transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--secondary-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2"
            >
              View experience & achievements
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        <div className="space-y-6">
          {displayedGroups.map((group, index) => (
            <ExperienceGroupCard
              key={group.id}
              group={group}
              index={index}
              view={view}
              shouldReduceMotion={shouldReduceMotion}
              defaultExpanded={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}