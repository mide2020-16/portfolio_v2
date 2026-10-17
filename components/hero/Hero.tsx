"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useHireMe } from "../hire/HireMeProvider";
import { HeroContent } from "./HeroContent";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [heroInView, setHeroInView] = useState(true);

  const heroRef = useRef<HTMLElement>(null);

  const { openHireMe } = useHireMe();
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative mt-12 flex min-h-[90svh] items-center overflow-hidden px-6 py-16 sm:px-8 lg:px-16"
    >
      {/* Background grid */}
      <div
        className="hero-grid pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        aria-hidden="true"
      />

      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[--color-secondary-accent] opacity-60 blur-[100px] dark:opacity-30"
      />

      {/* Main layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
        <HeroContent
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          heroInView={heroInView}
          reduceMotion={reduceMotion}
          openHireMe={openHireMe}
        />

        <HeroPortrait />
      </div>
    </section>
  );
}
