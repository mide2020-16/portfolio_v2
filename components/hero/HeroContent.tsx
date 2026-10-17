"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { personalInfo } from "@/lib/data/portfolio";
import { InteractiveHeroItem } from "./InteractiveHeroItem";
import { HeroSocialLinks } from "./HeroSocialLinks";
import { heroItems } from "./hero.data";

interface HeroContentProps {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  heroInView: boolean;
  reduceMotion: boolean;
  openHireMe: () => void;
}

export function HeroContent({
  activeIndex,
  setActiveIndex,
  heroInView,
  reduceMotion,
  openHireMe,
}: HeroContentProps) {
  return (
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

      {/* Bio + actions */}
      <div className="max-w-xl space-y-6">
        <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {personalInfo.bio}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="/cv.pdf"
            download="Ayomide-CV.pdf"
            className="group relative inline-flex items-center justify-center gap-2 border-2 border-zinc-900 bg-amber-800 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] transition-all duration-150 ease-out hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none dark:border-zinc-100 dark:bg-amber-700 dark:shadow-[5px_5px_0px_0px_rgba(244,244,245,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,244,245,1)] sm:px-6 sm:text-sm"
          >
            Download CV
            <ArrowDownRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>

          <button
            onClick={openHireMe}
            type="button"
            title="Speak with Ayomide."
            className="group relative inline-flex items-center justify-center gap-2 border-2 border-zinc-900 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-zinc-900 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] transition-all duration-150 ease-out hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-[5px_5px_0px_0px_rgba(244,244,245,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,244,245,1)] sm:px-6 sm:text-sm"
          >
            Let&apos;s Talk
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <HeroSocialLinks heroInView={heroInView} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
