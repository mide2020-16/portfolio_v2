/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onFinish?: () => void;
  durationMs?: number;
}

type GlitchVariant = 0 | 1 | 2;

export function SplashScreen({
  onFinish,
  durationMs = 2800,
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchVariant, setGlitchVariant] = useState<GlitchVariant>(0);

  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Loading progress and exit.
  useEffect(() => {
    const start = performance.now();
    const duration = Math.max(1, durationMs);

    let frame = 0;
    let lastUpdate = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    setProgress(0);
    setIsExiting(false);

    const update = (now: number) => {
      const value = Math.min(100, ((now - start) / duration) * 100);

      if (now - lastUpdate >= 30 || value >= 100) {
        setProgress(Math.floor(value));
        lastUpdate = now;
      }

      if (value >= 100) {
        setProgress(100);
        setIsExiting(true);

        exitTimer = setTimeout(() => {
          onFinishRef.current?.();
        }, 700);

        return;
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);

      if (exitTimer) {
        clearTimeout(exitTimer);
      }
    };
  }, [durationMs]);

  // Organic glitch bursts: irregular gaps, different patterns,
  // and different burst lengths instead of a constant loop.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let burstTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const burstDurations = [295, 330, 365] as const;

    const scheduleBurst = (initial = false) => {
      const delay = initial
        ? 120 + Math.random() * 280
        : 450 + Math.random() * 950;

      startTimer = setTimeout(() => {
        if (cancelled) return;

        const variant = Math.floor(Math.random() * 3) as GlitchVariant;

        setGlitchVariant(variant);
        setIsGlitching(true);

        burstTimer = setTimeout(() => {
          if (cancelled) return;

          setIsGlitching(false);
          scheduleBurst();
        }, burstDurations[variant]);
      }, delay);
    };

    scheduleBurst(true);

    return () => {
      cancelled = true;

      if (startTimer) clearTimeout(startTimer);
      if (burstTimer) clearTimeout(burstTimer);
    };
  }, []);

  const glitchState = isGlitching
    ? `is-glitching glitch-variant-${glitchVariant}`
    : "";

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className={`splash-screen ${glitchState} fixed inset-0 z-[9999] isolate flex flex-col justify-between overflow-hidden bg-[#f7f6f0] p-[clamp(24px,5vw,64px)] font-sans text-[#171813] select-none transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] dark:bg-[#090a09] dark:text-[#f2f1eb] motion-reduce:transition-none ${
        isExiting
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        <Image
          src="/splash.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="h-full w-full scale-105 transform-gpu object-cover object-center grayscale contrast-[1.2] opacity-[0.13] mix-blend-multiply dark:brightness-90 dark:opacity-25 dark:mix-blend-screen"
        />
      </div>

      {/* Theme-aware shading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#f7f6f0] via-[#f7f6f0]/65 to-[#f7f6f0]/80 dark:from-[#090a09] dark:via-[#090a09]/70 dark:to-[#090a09]/80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[9] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(23,24,19,0.05)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.48)_100%)]"
      />

      {/* Header */}
      <header className="splash-fade-in relative z-10 flex justify-between gap-5 font-mono text-[10px] uppercase tracking-[0.13em] text-black/55 dark:text-white/55">
        <span>Portfolio</span>
        <span>{new Date().getFullYear()}</span>
      </header>

      {/* Central typography */}
      <main className="splash-hero relative z-10 my-auto w-full text-center">
        <h1
          aria-label="Efuwape Ayomide Oreoluwa"
          className="m-0 flex flex-col items-center text-center font-black leading-[0.88]"
        >
          <span
            aria-hidden="true"
            data-text="EFUWAPE AYOMIDE"
            className="glitch-line glitch-first relative block max-w-full whitespace-nowrap px-[0.035em] pb-[0.09em] pt-[0.05em] text-[clamp(26px,7.2vw,100px)] tracking-[-0.085em] text-[#171813] dark:text-[#f2f1eb]"
          >
            EFUWAPE AYOMIDE
          </span>

          <span
            aria-hidden="true"
            data-text="OREOLUWA"
            className="glitch-line glitch-last relative mt-[0.055em] block max-w-full whitespace-nowrap px-[0.035em] pb-[0.09em] pt-[0.05em] text-[clamp(54px,13.2vw,176px)] tracking-[-0.105em] text-[#536d00] dark:text-[#d7fa54]"
          >
            OREOLUWA
          </span>
        </h1>
      </main>

      {/* Progress */}
      <footer className="splash-fade-in relative z-10 ml-auto w-full max-w-[420px]">
        <div className="h-[2px] overflow-hidden bg-black/15 dark:bg-white/[0.18]">
          <div
            className="h-full bg-[#536d00] transition-[width] duration-[80ms] ease-linear dark:bg-[#d7fa54]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.1em] text-black/55 dark:text-white/50">
          <span>{progress < 100 ? "Loading portfolio" : "Welcome"}</span>

          <span className="tabular-nums text-[#536d00] dark:text-[#d7fa54]">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </footer>

      {/* All animations live inside this component */}
      <style jsx>{`
        .splash-fade-in {
          animation: splashFade 800ms ease both;
        }

        .splash-hero {
          animation: splashHero 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms both;
        }

        /* Keep the text crisp when no glitch is happening. */
        .glitch-line {
          isolation: isolate;
        }

        .glitch-line::before,
        .glitch-line::after {
          position: absolute;
          inset: 0;
          display: block;
          overflow: hidden;
          pointer-events: none;
          white-space: nowrap;
          content: attr(data-text);
          opacity: 0;
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          will-change: transform, clip-path, opacity;
        }

        /* Electric cyan channel */
        .glitch-line::before {
          z-index: 2;
          color: #00f0ff;
          text-shadow:
            2px 0 #ff2bd6,
            -2px 0 #00f0ff;
        }

        /* Hot-pink channel */
        .glitch-line::after {
          z-index: 3;
          color: #ff2bd6;
          text-shadow:
            -2px 0 #00f0ff,
            2px 0 #ff2bd6;
        }

        /*
         * Animations only run during a randomly timed burst.
         * The two channels have different durations and delays.
         */

        .is-glitching .glitch-line {
          animation: nameJitter 280ms steps(1, end) both;
        }

        .is-glitching .glitch-line::before {
          animation: cyanBurst 260ms steps(1, end) both;
        }

        .is-glitching .glitch-line::after {
          animation: pinkBurst 285ms steps(1, end) both;
        }

        /* Three different burst personalities. */

        .glitch-variant-0 .glitch-first::before {
          animation-duration: 235ms;
        }

        .glitch-variant-0 .glitch-first::after {
          animation-duration: 275ms;
          animation-delay: 12ms;
        }

        .glitch-variant-0 .glitch-last::before {
          animation-duration: 285ms;
          animation-delay: 18ms;
        }

        .glitch-variant-0 .glitch-last::after {
          animation-duration: 245ms;
        }

        .glitch-variant-1 .glitch-first::before {
          animation-duration: 310ms;
          animation-delay: 8ms;
        }

        .glitch-variant-1 .glitch-first::after {
          animation-duration: 235ms;
        }

        .glitch-variant-1 .glitch-last::before {
          animation-duration: 245ms;
        }

        .glitch-variant-1 .glitch-last::after {
          animation-duration: 300ms;
          animation-delay: 14ms;
        }

        .glitch-variant-2 .glitch-first::before {
          animation-duration: 275ms;
        }

        .glitch-variant-2 .glitch-first::after {
          animation-duration: 315ms;
          animation-delay: 20ms;
        }

        .glitch-variant-2 .glitch-last::before {
          animation-duration: 320ms;
          animation-delay: 10ms;
        }

        .glitch-variant-2 .glitch-last::after {
          animation-duration: 280ms;
        }

        /* Brief jumps in the original letters. */
        @keyframes nameJitter {
          0% {
            transform: translateX(0);
          }

          13% {
            transform: translateX(-0.012em) skewX(-0.7deg);
          }

          26% {
            transform: translateX(0.022em) skewX(1deg);
          }

          37% {
            transform: translateX(-0.008em);
          }

          51% {
            transform: translateX(0.015em) skewX(-0.5deg);
          }

          65% {
            transform: translateX(-0.02em) skewX(0.8deg);
          }

          79% {
            transform: translateX(0.006em);
          }

          100% {
            transform: translateX(0);
          }
        }

        /*
         * Cyan jumps between several narrow horizontal regions.
         * Some frames shift the upper slice; others move the lower
         * half, preventing the effect from looking like a uniform RGB shadow.
         */
        @keyframes cyanBurst {
          0%,
          100% {
            opacity: 0;
            clip-path: inset(50% 0 50% 0);
            transform: translate(0);
          }

          7% {
            opacity: 1;
            clip-path: inset(7% 0 79% 0);
            transform: translate(-0.065em, -0.012em) skewX(-3deg);
          }

          17% {
            opacity: 0.95;
            clip-path: inset(7% 0 79% 0);
            transform: translate(0.045em, 0);
          }

          24% {
            opacity: 1;
            clip-path: inset(43% 0 39% 0);
            transform: translate(0.055em, 0.008em);
          }

          33% {
            opacity: 0.85;
            clip-path: inset(43% 0 39% 0);
            transform: translate(-0.035em, 0);
          }

          44% {
            opacity: 1;
            clip-path: inset(77% 0 6% 0);
            transform: translate(-0.06em, 0.01em) skewX(2deg);
          }

          53% {
            opacity: 0.9;
            clip-path: inset(77% 0 6% 0);
            transform: translate(0.025em, 0);
          }

          63% {
            opacity: 1;
            clip-path: inset(19% 0 66% 0);
            transform: translate(0.07em, -0.008em);
          }

          73% {
            opacity: 0.8;
            clip-path: inset(19% 0 66% 0);
            transform: translate(-0.03em, 0);
          }

          84% {
            opacity: 0.65;
            clip-path: inset(56% 0 25% 0);
            transform: translate(0.018em, 0.005em);
          }

          91% {
            opacity: 0;
            clip-path: inset(56% 0 25% 0);
            transform: translate(0);
          }
        }

        /* The pink channel interrupts the cyan in different places. */
        @keyframes pinkBurst {
          0%,
          100% {
            opacity: 0;
            clip-path: inset(50% 0 50% 0);
            transform: translate(0);
          }

          5% {
            opacity: 0.9;
            clip-path: inset(66% 0 14% 0);
            transform: translate(0.06em, 0.008em) skewX(2deg);
          }

          16% {
            opacity: 1;
            clip-path: inset(66% 0 14% 0);
            transform: translate(-0.045em, 0);
          }

          25% {
            opacity: 0.95;
            clip-path: inset(14% 0 71% 0);
            transform: translate(-0.055em, -0.01em);
          }

          36% {
            opacity: 0.85;
            clip-path: inset(14% 0 71% 0);
            transform: translate(0.04em, 0);
          }

          47% {
            opacity: 1;
            clip-path: inset(48% 0 29% 0);
            transform: translate(0.055em, 0.012em) skewX(-2deg);
          }

          58% {
            opacity: 0.85;
            clip-path: inset(48% 0 29% 0);
            transform: translate(-0.03em, 0);
          }

          69% {
            opacity: 1;
            clip-path: inset(4% 0 83% 0);
            transform: translate(-0.07em, -0.008em);
          }

          79% {
            opacity: 0.85;
            clip-path: inset(4% 0 83% 0);
            transform: translate(0.035em, 0);
          }

          89% {
            opacity: 0.65;
            clip-path: inset(73% 0 8% 0);
            transform: translate(-0.02em, 0.005em);
          }

          96% {
            opacity: 0;
            clip-path: inset(73% 0 8% 0);
            transform: translate(0);
          }
        }

        @keyframes splashFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes splashHero {
          from {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-fade-in,
          .splash-hero,
          .glitch-line,
          .glitch-line::before,
          .glitch-line::after {
            animation: none !important;
          }

          .glitch-line::before,
          .glitch-line::after {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
