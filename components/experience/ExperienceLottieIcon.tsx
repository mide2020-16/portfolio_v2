"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "lottie-react";
import type { ExperienceGroup } from "./experience.types";

interface ExperienceLottieIconProps {
  animation: ExperienceGroup["animation"];
  isActive: boolean;
  shouldReduceMotion: boolean;
}

const animationSources: Record<ExperienceGroup["animation"], string> = {
  maekandex: "/lottie/experience/maekandex.json",
  ictrec: "/lottie/experience/ictrec.json",
  "personal-projects": "/lottie/experience/personal-projects.json",
};

const fallbackIcons: Record<ExperienceGroup["animation"], string> = {
  maekandex: "⌘",
  ictrec: "⌂",
  "personal-projects": "✳",
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
      className={`relative flex size-14 shrink-0 items-center justify-center overflow-hidden border-2 border-border transition-colors duration-300 sm:size-16 ${
        isActive
          ? "bg-highlight shadow-[3px_3px_0px_0px_var(--foreground)]"
          : "bg-background"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {showLottie ? (
          <motion.span
            key={animation}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="absolute inset-1"
          >
            <Lottie
              src={animationSources[animation]}
              autoplay
              loop={false}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.span>
        ) : (
          <motion.span
            key="fallback"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
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
