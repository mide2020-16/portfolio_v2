"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lottie } from "lottie-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Sparkles } from "lucide-react";

import UnFound from "@/assets/lottie/404-not-found.json";

export default function NotFound() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const goBack = useCallback(() => {
    // Avoid returning to an external site or a useless history entry.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12">
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]
          [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)]
          [background-size:40px_40px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-80 rounded-full bg-primary-accent/10 blur-[100px]"
      />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.08,
            },
          },
        }}
        className="relative z-10 mx-auto w-full max-w-5xl"
        aria-labelledby="not-found-title"
      >
        {/* Main panel */}
        <div className="grid min-w-0 overflow-hidden border-2 border-border bg-background shadow-[5px_5px_0px_0px_var(--foreground)] sm:shadow-[8px_8px_0px_0px_var(--foreground)] lg:grid-cols-[0.95fr_1.05fr]">
          {/* Visual panel */}
          <div className="relative flex min-w-0 flex-col items-center justify-center overflow-hidden border-b-2 border-border bg-card px-5 py-7 sm:px-8 sm:py-9 lg:min-h-[480px] lg:border-b-0 lg:border-r-2 lg:px-10 lg:py-12">
            {/* Soft accent behind the illustration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-accent/[0.07] blur-3xl sm:size-64"
            />

            {/* Lottie illustration */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 h-32 w-36 shrink-0 sm:h-40 sm:w-44 lg:h-48 lg:w-52"
            >
              <Lottie
                src={UnFound}
                autoplay={!reduceMotion}
                loop={!reduceMotion}
                renderer="svg"
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid meet",
                }}
                className="h-full w-full"
                aria-hidden="true"
              />
            </motion.div>

            {/* Error number */}
            <motion.div variants={fadeUp} className="relative z-10 mt-3">
              <p className="select-none whitespace-nowrap text-[clamp(6rem,19vw,10.5rem)] font-black leading-[0.82] tracking-[-0.1em] text-foreground">
                404
              </p>

              <motion.span
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, 7, -4, 0], y: [0, -4, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 -top-3 flex size-9 items-center justify-center border-2 border-border bg-primary-accent text-white shadow-[3px_3px_0px_0px_var(--foreground)] sm:-right-5 sm:-top-4 sm:size-12"
              >
                <Sparkles size={20} aria-hidden="true" />
              </motion.span>
            </motion.div>
          </div>

          {/* Content panel */}
          <div className="flex min-w-0 flex-col justify-center px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <motion.div variants={fadeUp}>
              <div className="mb-5 inline-flex items-center gap-2 border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                <span aria-hidden="true" className="size-2 bg-secondary-accent" />
                Page not found
              </div>

              <h1
                id="not-found-title"
                className="max-w-lg text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                Well, this is
                <br />
                <span className="text-primary-accent">unexpected.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                The page you&apos;re looking for isn&apos;t here. It may have
                moved, the link may be incorrect, or the page may no longer
                exist.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={fadeUp}
              className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
            >
              <Link
                href="/"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border-2 border-foreground bg-primary-accent px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_var(--foreground)] transition-[transform,box-shadow,background-color] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 sm:w-auto"
              >
                <Home size={17} aria-hidden="true" />
                Go home
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 border-2 border-border bg-background px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors duration-200 hover:border-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 sm:w-auto"
              >
                <ChevronLeft size={16} aria-hidden="true" />
                Go back
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 border-t border-border pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70 sm:mt-10"
            >
              Sometimes the best way is back.
            </motion.p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
