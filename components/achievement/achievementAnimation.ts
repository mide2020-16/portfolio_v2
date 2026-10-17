import type { Variants } from "framer-motion";

export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

export const modalVariants = (
  shouldReduceMotion: boolean | null,
): Variants => ({
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 28,
    scale: shouldReduceMotion ? 1 : 0.94,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: shouldReduceMotion
      ? {
          duration: 0,
        }
      : {
          type: "spring",
          stiffness: 300,
          damping: 28,
          mass: 0.8,
        },
  },

  exit: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 12,
    scale: shouldReduceMotion ? 1 : 0.97,

    transition: {
      duration: shouldReduceMotion ? 0 : 0.18,
    },
  },
});