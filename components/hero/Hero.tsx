"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data/portfolio";

import fullStackAnimation from "@/assets/lottie/dev.json";
import mobileAppsAnimation from "@/assets/lottie/creative.json";
import aiSystemsAnimation from "@/assets/lottie/server.json";
import { InteractiveHeroItem } from "./InteractiveHeroItem";
import { useHireMe } from "../hire/HireMeProvider";

const heroItems = [
  {
    title: "Web Dev.",
    animation: fullStackAnimation,
  },
  {
    title: "Mobile Dev.",
    animation: mobileAppsAnimation,
  },
  {
    title: "Systems",
    animation: aiSystemsAnimation,
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {openHireMe} = useHireMe();
  return (
    <section
      id="top"
      className="relative flex min-h-[90svh] items-center overflow-hidden px-6 py-16 mt-12 sm:px-8 lg:px-16"
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
        {/* Left content */}
        <div className="min-w-0">
          {/* Interactive typography */}
          <div
            className="mb-9 flex flex-col items-start gap-2 sm:gap-3"
            onMouseLeave={() => setActiveIndex(null)}
          >
            {heroItems.map((item, index) => (
              <InteractiveHeroItem
                key={item.title}
                title={item.title}
                animation={item.animation}
                active={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
                onDeactivate={() => setActiveIndex(null)}
              />
            ))}
          </div>

          {/* Bio */}
          <div className="max-w-xl space-y-6">
            <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {personalInfo.bio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 border-2 border-zinc-900 dark:border-zinc-100 bg-amber-800 dark:bg-amber-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] dark:shadow-[5px_5px_0px_0px_rgba(244,244,245,1)] transition-all duration-150 ease-out hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,244,245,1)] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none sm:px-6 sm:text-sm"
              >
                Selected Work
                <ArrowDownRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Link>

              <button
              onClick={openHireMe}
              type="button"
              title="Speak with Ayomide."
                className="group relative inline-flex items-center justify-center gap-2 border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-900 px-5 py-3 text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] dark:shadow-[5px_5px_0px_0px_rgba(244,244,245,1)] transition-all duration-150 ease-out hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,244,245,1)] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none sm:px-6 sm:text-sm"
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Portrait (Visible on Mobile & Desktop) */}
        <div className="relative mx-auto flex h-[380px] w-full max-w-[320px] sm:h-[440px] sm:max-w-[360px] lg:h-130 lg:max-w-105 lg:items-center lg:justify-center">
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-3 z-20 h-16 w-16 border-r-2 border-t-2 border-amber-800 dark:border-amber-500"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 z-20 h-16 w-16 border-b-2 border-l-2 border-amber-800 dark:border-amber-500"
          />

          <div className="relative h-full w-full overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] dark:shadow-[12px_12px_0px_0px_rgba(244,244,245,1)]">
            <Image
              src="/images/sketch.png"
              alt="Ayomide portrait"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover grayscale contrast-125 transition-all duration-700 ease-out hover:grayscale-0 hover:contrast-100 dark:opacity-85 dark:hover:opacity-100"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 pt-20 text-white">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  Creative Developer
                </p>
                <p className="mt-1 text-sm sm:text-lg font-black tracking-tight">
                  EFUWAPE AYOMIDE OREOLUWA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}