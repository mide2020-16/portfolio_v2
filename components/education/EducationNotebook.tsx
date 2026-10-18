"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { EducationCardSharedProps } from "./education.types";

interface EducationNotebookProps extends EducationCardSharedProps {
  isExpanded: boolean;
  detailsId: string;
}

export function EducationNotebook({
  item,
  shouldReduceMotion,
  isExpanded,
  detailsId,
}: EducationNotebookProps) {
  const highlights = Array.isArray(item.highlights)
    ? item.highlights
    : [];

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key="education-notebook"
          id={detailsId}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { height: 0, opacity: 0, y: -8 }
          }
          animate={{
            height: "auto",
            opacity: 1,
            y: 0,
          }}
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
          <div className="px-4 pb-5 sm:px-5 sm:pb-6">
            <div
              className="relative overflow-hidden border-2 border-border text-slate-800 shadow-[4px_4px_0px_0px_var(--foreground)]"
              style={{
                backgroundColor: "#fffef8",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(91, 145, 190, 0.20) 32px, transparent 33px)",
                backgroundPosition: "0 7px",
              }}
            >
              {/* Notebook margin */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-7 top-0 w-px bg-rose-400/50 sm:left-10"
              />

              {/* Notebook heading */}
              <div className="relative flex items-start gap-3 border-b border-slate-300/70 px-4 py-5 pl-11 sm:gap-4 sm:px-6 sm:py-6 sm:pl-14">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border-2 border-slate-800/15 bg-amber-100 text-lg shadow-[2px_2px_0px_rgba(15,23,42,0.12)]"
                >
                  ✏️
                </span>

                <div className="min-w-0">
                  <h4 className="mt-1 font-heading text-lg font-black leading-tight text-slate-900 sm:text-xl">
                    My Learning and Experiences
                  </h4>
                </div>

                <span
                  aria-hidden="true"
                  className="ml-auto hidden shrink-0 rotate-3 border border-amber-300 bg-amber-100/80 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-amber-900 sm:inline-block"
                >
                  Notes
                </span>
              </div>

              {/* Learning highlights */}
              <ul className="relative space-y-0 px-4 py-3 pl-11 sm:px-6 sm:py-4 sm:pl-14">
                {highlights.map((highlight, highlightIndex) => (
                  <motion.li
                    key={`${item.degree}-${highlightIndex}`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -10 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion
                        ? 0
                        : highlightIndex * 0.065,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-3 py-[7px] text-[13px] font-medium leading-[1.8] text-slate-700 sm:gap-4 sm:text-sm"
                  >
                    <span className="min-w-0 flex-1">
                      {highlight}
                    </span>
                  </motion.li>
                ))}

                {highlights.length === 0 && (
                  <li className="py-3 text-sm text-slate-600">
                    Learning outcomes will be added here.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
