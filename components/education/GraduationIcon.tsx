"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "lottie-react";
import graduationAnimation from "@/assets/lottie/education.json";

interface GraduationIconProps {
  index: number;
  isHovered: boolean;
  isExpanded: boolean;
  shouldReduceMotion: boolean;
}

export function GraduationIcon({
  index,
  isHovered,
  isExpanded,
  shouldReduceMotion,
}: GraduationIconProps) {
  const showAnimation = isHovered || isExpanded;

  return (
    <span
      aria-hidden="true"
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border-2 border-border transition-all duration-300 sm:h-16 sm:w-16 ${
        showAnimation
          ? "bg-highlight shadow-[3px_3px_0px_0px_var(--foreground)]"
          : "bg-background"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!showAnimation ? (
          <motion.span
            key="graduation-emoji"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.7, rotate: -10 }
            }
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.7, rotate: 10 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
            }}
            className="select-none text-3xl leading-none sm:text-4xl"
          >
            🎓
          </motion.span>
        ) : (
          <motion.span
            key="graduation-animation"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.8 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
            }}
            className="h-full w-full"
          >
            <Lottie
              key={`education-lottie-${index}`}
              src={graduationAnimation}
              autoplay={!shouldReduceMotion}
              loop={false}
              className="h-full w-full"
            />
          </motion.span>
        )}
      </AnimatePresence>

      <span className="pointer-events-none absolute inset-0 border border-foreground/10" />
    </span>
  );
}
