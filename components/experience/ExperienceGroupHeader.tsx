"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ExperienceGroup, ExperienceProject } from "../../types/experience.types";
import { ExperienceLottieIcon } from "./ExperienceLottieIcon";
import { EXPERIENCE_EASE } from "./experience.motion";

interface ExperienceGroupHeaderProps {
  group: ExperienceGroup;
  detailsId: string;
  isExpanded: boolean;
  isHovered: boolean;
  shouldReduceMotion: boolean;
  featuredProject?: ExperienceProject;
  onToggleExpand: () => void;
}

export function ExperienceGroupHeader({
  group,
  detailsId,
  isExpanded,
  isHovered,
  shouldReduceMotion,
  featuredProject,
  onToggleExpand,
}: ExperienceGroupHeaderProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:gap-6 md:p-6">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={onToggleExpand}
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
      </button>

      <div className="flex shrink-0 items-center gap-2">
        <motion.button
          type="button"
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={onToggleExpand}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            ease: EXPERIENCE_EASE,
          }}
          className={`flex size-10 shrink-0 items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent sm:size-12 ${
            isExpanded
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-foreground"
          }`}
        >
          <ChevronDown size={21} aria-hidden="true" />
        </motion.button>

        {isExpanded && featuredProject && (
          <Link
            href={`/projects/${featuredProject.id}`}
            aria-label={`Open featured project ${featuredProject.name}`}
            className="flex size-10 shrink-0 items-center justify-center border border-foreground bg-foreground text-background transition-colors hover:bg-secondary-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent sm:size-12"
          >
            <ArrowUpRight size={21} aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
