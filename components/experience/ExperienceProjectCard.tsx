"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import type { ExperienceProject } from "./experience.types";
import { ProjectNotebook } from "./ProjectNotebook";

export function ExperienceProjectCard({
  project,
  index,
  shouldReduceMotion,
}: {
  project: ExperienceProject;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = `project-notebook-${project.id}`;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : Math.min(index * 0.035, 0.18), ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden border-2 border-border transition-colors duration-300 ${isExpanded ? "bg-background" : "bg-background/70"}`}
    >
      <div className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => setIsExpanded((current) => !current)}
          className="group/project flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-accent sm:gap-4"
        >
          <span className={`flex size-10 shrink-0 items-center justify-center border-2 border-border font-heading text-xs font-black transition-colors sm:size-12 sm:text-sm ${isExpanded ? "bg-foreground text-background" : "bg-highlight text-foreground"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-sm font-black leading-tight text-foreground sm:text-base md:text-lg">{project.name}</span>
              {project.featured && (
                <span className="-rotate-3 inline-flex origin-center items-center border border-[#d9c7a1] bg-[#f5e9cb] px-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#77613c] shadow-[1px_2px_0_rgba(120,100,70,0.10)] transition-transform duration-200 hover:rotate-0 sm:text-[11px]">Featured</span>
              )}
            </span>
            <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{project.summary}</span>
            <span className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((technology) => (
                <span key={technology} className="border border-border/80 px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground sm:text-[10px]">{technology}</span>
              ))}
            </span>
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className={`flex size-9 shrink-0 items-center justify-center border transition-colors sm:size-10 ${isExpanded ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground"}`}
          >
            <ChevronDown size={18} />
          </motion.span>
        </button>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${project.name} in a new tab`}
            className="flex size-9 shrink-0 items-center justify-center border border-border text-foreground hover:bg-highlight sm:size-10"
          >
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div id={detailsId} key="project-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}>
            <ProjectNotebook project={project} shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        )}
      </AnimatePresence>
      <span aria-hidden="true" className={`block h-1 transition-colors duration-300 ${isExpanded ? "bg-secondary-accent" : "bg-transparent"}`} />
    </motion.article>
  );
}
