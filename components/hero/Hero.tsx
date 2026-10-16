"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { personalInfo } from "@/lib/data/portfolio";

import fullStackAnimation from "@/assets/lottie/dev.json";
import mobileAppsAnimation from "@/assets/lottie/creative.json";
import aiSystemsAnimation from "@/assets/lottie/server.json";

import { InteractiveHeroItem } from "./InteractiveHeroItem";
import { useHireMe } from "../hire/HireMeProvider";
import { socialIcons } from "../ContactSection";

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

const socialLinks = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/mide2020-16",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/efuwapeayomide",
  },
  {
    key: "twitter",
    label: "X",
    href: "https://x.com/westfiree",
  },
];

function HeroSocialLinks({
  heroInView,
  reduceMotion,
}: {
  heroInView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence initial={false}>
      {heroInView ? (
        <motion.div
          key="hero-socials"
          layout
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: "easeOut",
          }}
          className="flex items-center gap-2"
          aria-label="Social profiles"
        >
          {socialLinks.map((social) => {
            const icon = socialIcons[social.key];

            return (
              <motion.a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.label} profile`}
                // title={social.label}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        y: 0,
                      }
                }
                className={[
                  "group/social relative flex size-10 items-center",
                  "justify-center border-2 border-zinc-900",
                  "bg-white text-zinc-900",
                  "shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]",
                  "transition-colors duration-200",
                  "hover:bg-amber-800 hover:text-white",
                  "dark:border-zinc-100 dark:bg-zinc-900",
                  "dark:text-zinc-100",
                  "dark:shadow-[3px_3px_0px_0px_rgba(244,244,245,1)]",
                  "dark:hover:bg-amber-700",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-amber-700",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                  "sm:size-11",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center text-lg"
                >
                  {icon}
                </span>

                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap border border-zinc-900 bg-zinc-900 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-white opacity-0 transition-opacity duration-150 group-hover/social:opacity-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
                  {social.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          key="floating-socials"
          layout
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -16,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  x: -16,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: "easeOut",
          }}
          className={[
            "fixed left-2 top-1/2 z-50 -translate-y-1/2",
            "hidden flex-col gap-2 sm:flex",
          ].join(" ")}
          aria-label="Social profiles"
        >
          {socialLinks.map((social) => {
            const icon = socialIcons[social.key];

            return (
              <motion.a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.label} profile`}
                // title={social.label}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 3,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        x: 1,
                      }
                }
                className={[
                  "group/social relative flex size-10 items-center",
                  "justify-center border-2 border-zinc-900",
                  "bg-white text-zinc-900",
                  "shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]",
                  "transition-colors duration-200",
                  "hover:bg-amber-800 hover:text-white",
                  "dark:border-zinc-100 dark:bg-zinc-900",
                  "dark:text-zinc-100",
                  "dark:shadow-[4px_4px_0px_0px_rgba(244,244,245,1)]",
                  "dark:hover:bg-amber-700",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-amber-700",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center text-lg"
                >
                  {icon}
                </span>

                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap border border-zinc-900 bg-zinc-900 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-white opacity-0 transition-opacity duration-150 group-hover/social:opacity-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
                  {social.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

            {/* Social links */}
            <HeroSocialLinks
              heroInView={heroInView}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto flex h-[380px] w-full max-w-[320px] sm:h-[440px] sm:max-w-[360px] lg:h-130 lg:max-w-105 lg:items-center lg:justify-center">
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-3 z-20 h-16 w-16 border-r-2 border-t-2 border-amber-800 dark:border-amber-500"
          />

          <span
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 z-20 h-16 w-16 border-b-2 border-l-2 border-amber-800 dark:border-amber-500"
          />

          <div className="relative h-full w-full overflow-hidden border border-zinc-300 bg-zinc-100 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-[12px_12px_0px_0px_rgba(244,244,245,1)]">
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

                <p className="mt-1 text-sm font-black tracking-tight sm:text-lg">
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
