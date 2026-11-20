"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ExperienceProject } from "@/types/experience.types";
import { ProjectDeviceStage } from "@/components/ui/DeviceMockups";

interface ProjectShowcaseCardProps {
  project: ExperienceProject;
  index: number;
}

export function ProjectShowcaseCard({
  project,
  index,
}: ProjectShowcaseCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group flex min-w-0 flex-col overflow-hidden border-2 border-border bg-card transition-colors duration-300 hover:bg-background"
    >
      <div className="overflow-hidden">
        <ProjectDeviceStage
          platform={project.platform}
          desktopScreenshot={project.desktopScreenshot}
          mobileScreenshot={project.mobileScreenshot}
          title={project.name}
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          <h3 className="mt-2 font-heading text-xl font-black leading-tight text-foreground sm:text-2xl">
            {project.name}
          </h3>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 align-center">
            {project.technologies.slice(0, 4).map((technology) => (
              <span
                key={technology}
                className="bg-highlight/50 px-2 py-1 text-[10px] font-bold text-foreground/75"
              >
                {technology}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1 py-1 text-[10px] font-bold text-muted-foreground">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/70 pt-4">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex min-h-10 items-center gap-2 border-2 border-foreground bg-foreground px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-background transition-transform hover:translate-x-0.5 hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2"
          >
            case study
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 px-1 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
              aria-label={`Open ${project.name} live website in a new tab`}
            >
              Live
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
