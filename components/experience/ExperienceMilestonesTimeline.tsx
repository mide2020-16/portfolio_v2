
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CareerMilestone } from "../../types/experience.types";

interface ExperienceMilestonesTimelineProps {
  milestones: CareerMilestone[];
  shouldReduceMotion: boolean;
}

export function ExperienceMilestonesTimeline({
  milestones,
  shouldReduceMotion,
}: ExperienceMilestonesTimelineProps) {
  const [collapsedMilestones, setCollapsedMilestones] = useState<
    Set<string>
  >(new Set());

  if (milestones.length === 0) return null;

  const toggleMilestone = (id: string) => {
    setCollapsedMilestones((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div className="mb-6 space-y-3 sm:mb-8">
      <div className="relative ml-2 space-y-4 border-l-2 border-border pl-4 sm:ml-4 sm:pl-6">
        {milestones.map((milestone, milestoneIndex) => {
          const milestoneId = `${milestone.role}-${milestone.dateRange}`;
          const isCollapsed = collapsedMilestones.has(milestoneId);

          return (
            <motion.div
              key={milestoneId}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 24, x: -8 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: shouldReduceMotion
                  ? 0
                  : Math.min(milestoneIndex * 0.04, 0.2),
              }}
              className="relative"
            >
              {/* Custom clickable milestone dot */}
              <button
                type="button"
                onClick={() => toggleMilestone(milestoneId)}
                aria-expanded={!isCollapsed}
                aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${milestone.role} milestone`}
                className="absolute -left-5.75 top-1.5 z-10 flex size-3 items-center justify-center border-2 border-background bg-secondary-accent shadow-[0_0_0_1px_var(--border)] transition-transform duration-200 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 sm:-left-7.75"
              />

              {/* Milestone heading */}
              <button
                type="button"
                onClick={() => toggleMilestone(milestoneId)}
                aria-expanded={!isCollapsed}
                className="flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 text-left"
              >
                <h5 className="font-heading text-sm font-black text-foreground sm:text-base">
                  {milestone.role}
                </h5>

                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {milestone.dateRange}
                </span>
              </button>

              {/* Animated milestone content */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, height: 0, y: -8 }
                    }
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0, y: -8 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <p className="mt-1 text-xs leading-6 text-muted-foreground sm:text-sm">
                      {milestone.summary}
                    </p>

                    <ul className="mt-2 grid gap-1.5 sm:grid-cols-2 sm:gap-x-5">
                      {milestone.highlights.map(
                        (highlight, highlightIndex) => (
                          <li
                            key={`${milestoneId}-${highlightIndex}`}
                            className="flex items-start gap-2 text-xs leading-6 text-foreground/75 sm:text-sm"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.25 size-1.5 shrink-0 rounded-full bg-secondary-accent"
                            />

                            <span>{highlight}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
