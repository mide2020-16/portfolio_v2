
"use client";

import { motion } from "framer-motion";

interface EducationChevronProps {
  expanded: boolean;
  reduceMotion?: boolean;
}

export function EducationChevron({
  expanded,
  reduceMotion = false,
}: EducationChevronProps) {
  return (
    <span
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center border transition-colors duration-300 ${
        expanded
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground"
      }`}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <path
          d="M6.75 9.25L12 14.25L17.25 9.25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 9.5L12 11.9L14.5 9.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
      </motion.svg>
    </span>
  );
}
