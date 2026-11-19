
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "lottie-react";

import workAnimation from "@/assets/lottie/experience/work.json";
import internAnimation from "@/assets/lottie/experience/intern.json";
import personalAnimation from "@/assets/lottie/experience/personal.json";

import type { ExperienceGroup } from "./experience.types";

interface ExperienceLottieIconProps {
  animation: ExperienceGroup["animation"];
  isActive: boolean;
  shouldReduceMotion: boolean;
}

const animationSources = {
  maekandex: workAnimation,
  ictrec: internAnimation,
  "personal-projects": personalAnimation,
};

const fallbackIcons: Record<ExperienceGroup["animation"], string> = {
  maekandex: "👷‍♂️",
  ictrec: "🧑‍🎓",
  "personal-projects": "💻",
};

export function ExperienceLottieIcon({
  animation,
  isActive,
  shouldReduceMotion,
}: ExperienceLottieIconProps) {
  const showLottie = isActive && !shouldReduceMotion;

  return (
    <span
      aria-hidden="true"
      className={`relative flex size-14 shrink-0 items-center justify-center overflow-hidden border-2 border-border transition-colors duration-300 sm:size-16 ${isActive
        ? "bg-highlight shadow-[3px_3px_0px_0px_var(--foreground)]"
        : "bg-background/60"
        }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {showLottie ? (
          <motion.span
            key={animation}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-1"
          >
            <Lottie
              key={animation}
              src={animationSources[animation]}
              autoplay
              loop={false}
              className="h-full w-full"
            />
          </motion.span>
        ) : (
          <motion.span
            key="fallback"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="font-heading text-2xl font-black text-foreground sm:text-3xl"
          >
            {fallbackIcons[animation]}
          </motion.span>
        )}
      </AnimatePresence>

      <span className="pointer-events-none absolute inset-0 border border-foreground/10" />
    </span>
  );
}
