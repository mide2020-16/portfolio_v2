"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ExperienceGroup, ExperienceView } from "./experience.types";
import { EXPERIENCE_EASE } from "./experience.motion";
import { ExperienceGroupHeader } from "./ExperienceGroupHeader";
// import { ExperienceAchievementsList } from "./ExperienceAchievementsList";
import { ExperienceMilestonesTimeline } from "./ExperienceMilestonesTimeline";
import { ExperienceHighlightsNote } from "./ExperienceHighlightsNote";
import { ExperienceProjectsSection } from "./ExperienceProjectsSection";

interface ExperienceGroupCardProps {
  group: ExperienceGroup;
  index: number;
  view: ExperienceView;
  shouldReduceMotion: boolean;
  defaultExpanded?: boolean;
}

export function ExperienceGroupCard({
  group,
  index,
  view,
  shouldReduceMotion,
  defaultExpanded = false,
}: ExperienceGroupCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const detailsId = `experience-group-${group.id}`;
  const featuredProject = group.projects?.find((project) => project.featured);
  const isActive = isHovered || isExpanded;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        delay: shouldReduceMotion ? 0 : index * 0.055,
        ease: EXPERIENCE_EASE,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden border-2 border-border transition-colors duration-300 ${
        isActive ? "bg-background" : "bg-background/70"
      }`}
    >
      <ExperienceGroupHeader
        group={group}
        detailsId={detailsId}
        isExpanded={isExpanded}
        isHovered={isHovered}
        shouldReduceMotion={shouldReduceMotion}
        featuredProject={featuredProject}
        onToggleExpand={() => setIsExpanded((current) => !current)}
      />

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
              ease: EXPERIENCE_EASE,
            }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-b-2 border-border/70 px-3 py-4 sm:px-5 sm:py-6">
              <p className="mb-5 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                {group.summary}
              </p>

              {group.milestones && (
                <ExperienceMilestonesTimeline
                  milestones={group.milestones}
                  shouldReduceMotion={shouldReduceMotion}
                />
              )}

              {group.kind === "employment" && (
                <Link
                  href={`/experience/${group.id}`}
                  className="mb-6 inline-flex items-center gap-2 border-2 border-border px-3 py-2 text-[10px] font-black uppercase tracking-[.12em] text-foreground hover:border-foreground hover:bg-highlight/20"
                >
                  {`see details of my work at ${group.id}`} {" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              )}

              {group.highlights && (
                <ExperienceHighlightsNote
                  groupId={group.id}
                  highlights={group.highlights}
                />
              )}

              <ExperienceProjectsSection
                projects={group.projects}
                kind={group.kind}
                view={view}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
          isActive ? "w-full bg-secondary-accent" : "w-0 bg-transparent"
        }`}
      />
    </motion.article>
  );
}