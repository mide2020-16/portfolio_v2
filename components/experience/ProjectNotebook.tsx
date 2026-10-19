"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Monitor, Smartphone, Laptop } from "lucide-react";
import type { ExperienceProject } from "./experience.types";
import { ProjectDeviceStage } from "./DeviceMockups";

export function ProjectNotebook({
  project,
  shouldReduceMotion,
}: {
  project: ExperienceProject;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: -8 }
      }
      animate={{ height: "auto", opacity: 1, y: 0 }}
      exit={
        shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: -6 }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="overflow-hidden"
    >
      <div className="px-3 pb-4 sm:px-5 sm:pb-6">
        <div
          className="relative overflow-hidden border-2 border-slate-300/80 text-slate-800 shadow-[5px_5px_0px_0px_var(--foreground)] sm:shadow-[7px_7px_0px_0px_var(--foreground)]"
          style={{
            backgroundColor: "#fffef8",
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(91,145,190,.18) 32px, transparent 33px)",
            backgroundPosition: "0 7px",
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-5 top-0 w-px bg-rose-400/50 sm:left-9"
          />

          <div className="relative flex items-start gap-3 border-b border-slate-300/70 px-4 py-4 pl-9 sm:gap-4 sm:px-6 sm:py-5 sm:pl-14">
            <div className="min-w-0 flex-1">
              <h4 className="mt-1 font-heading text-lg font-black leading-tight tracking-widest text-slate-900 sm:text-2xl">
                {project.name}
              </h4>
            </div>
            <span
              aria-hidden="true"
              className="hidden -rotate-3 border border-amber-300 bg-amber-100/80 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-amber-900 sm:inline-block"
            >
              {project.category === "work-product" ? "Work log" : "Case study"}
            </span>
          </div>

          <ProjectDeviceStage
            platform={project.platform}
            desktopScreenshot={project.desktopScreenshot}
            mobileScreenshot={project.mobileScreenshot}
            title={project.name}
          />

          <div className="relative grid gap-6 px-4 py-5 pl-9 sm:grid-cols-[1.1fr_.9fr] sm:gap-8 sm:px-6 sm:py-7 sm:pl-14">
            <div className="min-w-0">
              <h5 className="font-heading text-sm font-black text-slate-900 sm:text-base">
                What I worked on
              </h5>
              <p className="mt-2 text-xs leading-6 text-slate-700 sm:text-sm sm:leading-7">
                {project.contribution}
              </p>
              <p className="mt-3 text-xs leading-6 text-slate-600 sm:text-sm">
                {project.summary}
              </p>
            </div>
            <div className="min-w-0">
              <h5 className="font-heading text-sm font-black text-slate-900 sm:text-base">
                Key contributions
              </h5>
              <ul className="mt-2 space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li
                    key={`${project.id}-highlight-${index}`}
                    className="flex items-start gap-2 text-xs leading-6 text-slate-700 sm:text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-1.5 shrink-0 rounded-full bg-rose-600"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-start gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-slate-400/50 bg-white/70 px-2 py-1 text-[9px] font-bold text-slate-700 sm:text-[10px]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex items-center gap-2 border-2 border-slate-900 bg-slate-900 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-amber-800 sm:text-xs"
                >
                  View live project <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
