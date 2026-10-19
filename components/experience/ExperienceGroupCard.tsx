"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, BriefcaseBusiness, MapPin } from "lucide-react";
import type {
  ExperienceGroup,
  ExperienceProject,
  ExperienceView,
} from "./experience.types";
import { ExperienceLottieIcon } from "./ExperienceLottieIcon";
import { ExperienceProjectCard } from "./ExperienceProjectCard";

export function ExperienceGroupCard({
  group,
  index,
  view,
  shouldReduceMotion,
  defaultExpanded = false,
}: {
  group: ExperienceGroup;
  index: number;
  view: ExperienceView;
  shouldReduceMotion: boolean;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);
  const detailsId = `experience-group-${group.id}`;
  const displayedProjects: ExperienceProject[] = (group.projects ?? [])
    .filter((project) => view === "all" || project.featured)
    .slice(0, view === "home" ? 3 : undefined);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        delay: shouldReduceMotion ? 0 : index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden border-2 border-border transition-colors duration-300 ${isHovered || isExpanded ? "bg-background" : "bg-background/70"}`}
    >
      <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:gap-6 md:p-6">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => setIsExpanded((current) => !current)}
          className="flex min-w-0 flex-1 items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-accent sm:gap-5"
        >
          <ExperienceLottieIcon
            animation={group.animation}
            isActive={isHovered || isExpanded}
            shouldReduceMotion={shouldReduceMotion}
          />
          <span className="block min-w-0 flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                {group.dateRange}
            </span>
            <span className="block font-heading text-lg font-black leading-tight text-foreground sm:text-xl md:text-2xl">
              {group.organisation}
            </span>
            <span className="mt-1 block text-xs font-bold leading-relaxed text-foreground/65 sm:text-sm">
              {group.role}
            </span>
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex size-10 shrink-0 items-center justify-center border transition-colors sm:size-12 ${isExpanded ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground"}`}
          >
            <ChevronDown size={21} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={detailsId}
            key="group-details"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { height: 0, opacity: 0, y: -8 }
            }
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { height: 0, opacity: 0, y: -6 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-border/70 px-3 py-4 sm:px-5 sm:py-6">
              <p className="mb-5 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                {group.summary}
              </p>

              {group.milestones && group.milestones.length > 0 && (
                <div className="mb-6 space-y-3 sm:mb-8">
                  <div className="relative ml-2 space-y-4 border-l-2 border-border pl-4 sm:ml-4 sm:pl-6">
                    {group.milestones.map((milestone, milestoneIndex) => (
                      <motion.div
                        key={`${milestone.role}-${milestone.dateRange}`}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, x: -8 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.25,
                          delay: shouldReduceMotion ? 0 : milestoneIndex * 0.06,
                        }}
                        className="relative"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-[23px] top-1.5 size-3 border-2 border-background bg-secondary-accent shadow-[0_0_0_1px_var(--border)] sm:-left-[31px]"
                        />
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h5 className="font-heading text-sm font-black text-foreground sm:text-base">
                            {milestone.role}
                          </h5>
                          <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs">
                            {milestone.dateRange}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground sm:text-sm">
                          {milestone.summary}
                        </p>
                        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2 sm:gap-x-5">
                          {milestone.highlights.map(
                            (highlight, highlightIndex) => (
                              <li
                                key={`${milestone.role}-${highlightIndex}`}
                                className="flex items-start gap-2 text-xs leading-6 text-foreground/75 sm:text-sm"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[9px] size-1.5 shrink-0 rounded-full bg-secondary-accent"
                                />
                                <span>{highlight}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

{/* Responsibilities & Impact — Notebook Paper */}
{group.highlights && group.highlights.length > 0 && (
  <div className="relative mb-6 overflow-hidden border border-[#e5dcc8] bg-[#fffdf5] px-4 py-4 shadow-[2px_3px_0_rgba(120,100,70,0.06)] sm:px-5">
    {/* Notebook ruled lines */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(100,130,160,0.13)_28px,transparent_29px)]"
    />

    {/* Red notebook margin */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-red-400/40 sm:left-9"
    />

    <div className="relative pl-7 sm:pl-8">
      {/* Heading and tilted Field Notes label */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-heading text-sm font-black text-[#39352e] sm:text-base">
          Responsibilities &amp; impact
        </h4>

        <span className="-rotate-3 inline-flex origin-center items-center border border-[#d9c7a1] bg-[#f5e9cb] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#77613c] shadow-[1px_2px_0_rgba(120,100,70,0.10)] transition-transform duration-200 hover:rotate-0 sm:text-[11px]">
          Field notes
        </span>
      </div>

      {/* Highlights */}
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {group.highlights.map((highlight, highlightIndex) => (
          <li
            key={`${group.id}-${highlightIndex}`}
            className="flex items-start gap-2.5 text-xs leading-7 text-[#625c50] sm:text-sm"
          >
            <span
              aria-hidden="true"
              className="mt-[11px] size-1.5 shrink-0 rounded-full bg-secondary-accent"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

              {displayedProjects.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h4 className="mt-1 font-heading text-base font-black text-foreground sm:text-lg">
                        {group.kind === "personal"
                          ? "See Personal Project"
                          : "View Project"}
                      </h4>
                    </div>
                    {view === "home" && group.kind === "personal" && (
                      <span className="text-[10px] font-bold text-muted-foreground sm:text-xs">
                        Showing {displayedProjects.length} featured projects
                      </span>
                    )}
                    {view === "all" && group.kind === "personal" && (
                      <span className="text-[10px] font-bold text-muted-foreground sm:text-xs">
                        {displayedProjects.length} personal projects
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {displayedProjects.map((project, projectIndex) => (
                      <ExperienceProjectCard
                        key={project.id}
                        project={project}
                        index={projectIndex}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${isExpanded || isHovered ? "w-full bg-secondary-accent" : "w-0 bg-transparent"}`}
      />
    </motion.article>
  );
}
