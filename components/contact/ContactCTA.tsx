/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ctaPhrases, phraseAnimations } from "../../data/contact.data";

export function ContactCTA() {
  const shouldReduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const getNextPhrase = (current: number) => {
      let next = Math.floor(Math.random() * ctaPhrases.length);

      while (next === current) {
        next = Math.floor(Math.random() * ctaPhrases.length);
      }

      return next;
    };

    setPhraseIndex((current) => getNextPhrase(current));

    const interval = window.setInterval(() => {
      setPhraseIndex((current) => getNextPhrase(current));
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const animation = phraseAnimations[phraseIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
      className="flex flex-col justify-between border-2 border-border bg-primary-accent/90 p-8 shadow-[8px_8px_0px_0px_var(--foreground)]"
    >
      <div>
        <div className="relative mb-3 flex min-h-[5.5rem] items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h3
              key={phraseIndex}
              initial={
                shouldReduceMotion ? false : animation.initial
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : animation.animate
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : animation.exit
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full font-heading text-3xl font-black leading-tight text-white"
            >
              {ctaPhrases[phraseIndex]}
            </motion.h3>
          </AnimatePresence>
        </div>

        <p className="text-sm leading-relaxed text-white/60">
          Let&apos;s create something meaningful together.
        </p>
      </div>
    </motion.div>
  );
}