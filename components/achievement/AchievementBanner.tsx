"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, X, ChevronLeft, ChevronRight } from "lucide-react";

import { achievements } from "@/lib/data/portfolio";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { AchievementCard } from "./AnimationCard";

export function AchievementBanner() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTrophyIndex, setActiveTrophyIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeAchievement = selectedCertIndex !== null ? achievements[selectedCertIndex] : null;

  const certAchievementsIndexes = achievements
    .map((item, index) => (item.certificateImage?.trim() ? index : null))
    .filter((index): index is number => index !== null);

  const handleNextCert = useCallback(() => {
    if (selectedCertIndex === null || certAchievementsIndexes.length <= 1) {
      return;
    }

    const currentPosition = certAchievementsIndexes.indexOf(selectedCertIndex);

    const nextPosition = (currentPosition + 1) % certAchievementsIndexes.length;

    setSelectedCertIndex(certAchievementsIndexes[nextPosition]);
  }, [selectedCertIndex, certAchievementsIndexes]);

  const handlePrevCert = useCallback(() => {
    if (selectedCertIndex === null || certAchievementsIndexes.length <= 1) {
      return;
    }

    const currentPosition = certAchievementsIndexes.indexOf(selectedCertIndex);

    const previousPosition =
      (currentPosition - 1 + certAchievementsIndexes.length) %
      certAchievementsIndexes.length;

    setSelectedCertIndex(certAchievementsIndexes[previousPosition]);
  }, [selectedCertIndex, certAchievementsIndexes]);

  const closeModal = useCallback(() => {
    setSelectedCertIndex(null);
  }, []);

  const openCertificate = (index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;

    setSelectedCertIndex(index);
  };

  const activateTrophy = (index: number) => {
    setHoveredIndex(index);
    setActiveTrophyIndex(index);
  };

  const deactivateTrophy = (index: number) => {
    setHoveredIndex((current) => (current === index ? null : current));

    setActiveTrophyIndex((current) => (current === index ? null : current));
  };

  const handleTrophyPointerUp = (index: number, pointerType: string) => {
    if (pointerType === "mouse") return;

    if (activeTrophyIndex === index) {
      deactivateTrophy(index);
    } else {
      activateTrophy(index);
    }
  };

  // Keyboard accessibility for the trophy.
  const handleTrophyKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (activeTrophyIndex === index) {
        deactivateTrophy(index);
      } else {
        activateTrophy(index);
      }
    }
  };

  // Keyboard navigation and page scroll locking.
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNextCert();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevCert();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);

      window.clearTimeout(focusTimer);

      previousFocusRef.current?.focus();
    };
  }, [selectedCertIndex, closeModal, handleNextCert, handlePrevCert]);

  // Modal animations.
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
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
        ? { duration: 0 }
        : {
            type: "spring" as const,
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
  };

  return (
    <>
      <section
        aria-label="Achievements and certifications"
        className="relative overflow-hidden border-y-2 border-border bg-highlight py-8 sm:py-10"
      >
        {/* Decorative background details */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-foreground/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-foreground/10"
        />

        <div className="relative mx-auto max-w-6xl space-y-5 px-4 sm:px-8">
          {/* Section heading */}
          <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Achievements
                <span className="text-secondary-accent">.</span>
              </h2>
          </div>

          {/* Achievement cards */}
          {achievements.map((item, index) => (
            <AchievementCard
              key={item.title + index}
              item={item}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
              hoveredIndex={hoveredIndex}
              activeTrophyIndex={activeTrophyIndex}
              activateTrophy={activateTrophy}
              deactivateTrophy={deactivateTrophy}
              handleTrophyPointerUp={handleTrophyPointerUp}
              handleTrophyKeyDown={handleTrophyKeyDown}
              openCertificate={openCertificate}
            />
          ))}
        </div>
      </section>

      {/* Certificate modal */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Focus restoration is handled by the effect cleanup.
        }}
      >
        {activeAchievement?.certificateImage && selectedCertIndex !== null && (
          <motion.div
            key="certificate-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
            }}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
            role="presentation"
          >
            <motion.section
              key={selectedCertIndex}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-modal-title"
              className="relative my-auto flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden border-2 border-border bg-background shadow-[8px_8px_0px_0px_var(--highlight)] sm:shadow-[12px_12px_0px_0px_var(--highlight)]"
            >
              {/* Modal header */}
              <header className="flex shrink-0 items-center justify-between gap-4 border-b-2 border-border bg-foreground px-4 py-4 text-background sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-background/20 bg-background/10">
                    <Award size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id="certificate-modal-title"
                      className="mt-1 truncate text-sm font-black uppercase tracking-wide sm:text-base"
                    >
                      {activeAchievement.title}
                    </h2>
                  </div>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close certificate"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-background/30 transition-all duration-200 hover:rotate-90 hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
                >
                  <X size={20} />
                </button>
              </header>

              {/* Certificate image */}
              <div className="relative min-h-0 flex-1 overflow-auto bg-[#e9e7e1]">
                <div className="relative mx-auto aspect-4/3 w-full">
                  <Image
                    key={activeAchievement.certificateImage}
                    src={activeAchievement.certificateImage}
                    alt={`${activeAchievement.title} certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-contain p-2 sm:p-5"
                    priority
                    quality={100}
                  />
                </div>

                {/* Certificate navigation */}
                {certAchievementsIndexes.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevCert}
                      aria-label="Previous certificate"
                      className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-border bg-background/95 text-foreground shadow-[3px_3px_0px_0px_var(--foreground)] transition-all hover:translate-x-[-2px] hover:bg-foreground hover:text-background active:translate-y-[-45%] sm:left-4"
                    >
                      <ChevronLeft size={23} />
                    </button>

                    <button
                      type="button"
                      onClick={handleNextCert}
                      aria-label="Next certificate"
                      className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-border bg-background/95 text-foreground shadow-[3px_3px_0px_0px_var(--foreground)] transition-all hover:translate-x-[2px] hover:bg-foreground hover:text-background active:translate-y-[-45%] sm:right-4"
                    >
                      <ChevronRight size={23} />
                    </button>
                  </>
                )}
              </div>

              {/* Modal footer */}
              <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t-2 border-border bg-background px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="text-xs font-black text-foreground">
                    {activeAchievement.subtitle}
                  </p>

                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50">
                    Certificate{" "}
                    {String(
                      certAchievementsIndexes.indexOf(selectedCertIndex) + 1,
                    ).padStart(2, "0")}{" "}
                    / {String(certAchievementsIndexes.length).padStart(2, "0")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex min-h-10 items-center gap-2 border-2 border-border bg-foreground px-4 py-2 text-[10px] font-black uppercase tracking-widest text-background transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
                >
                  Done
                  <X size={14} />
                </button>
              </footer>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
