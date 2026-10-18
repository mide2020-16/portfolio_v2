"use client";

import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { achievements } from "@/lib/data/portfolio";
import { CertificateModal } from "./CertificateModal";
import { AchievementCard } from "./AchievementCard";

export function AchievementBanner() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(
    null,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTrophyIndex, setActiveTrophyIndex] = useState<number | null>(
    null,
  );

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion() || null
  const activeAchievement =
    selectedCertIndex !== null
      ? achievements[selectedCertIndex]
      : null;

  const certAchievementsIndexes = achievements
    .map((item, index) =>
      item.certificateImage?.trim() ? index : null,
    )
    .filter((index): index is number => index !== null);

  const handleNextCert = useCallback(() => {
    if (
      selectedCertIndex === null ||
      certAchievementsIndexes.length <= 1
    ) {
      return;
    }

    const currentPosition =
      certAchievementsIndexes.indexOf(selectedCertIndex);

    const nextPosition =
      (currentPosition + 1) % certAchievementsIndexes.length;

    setSelectedCertIndex(certAchievementsIndexes[nextPosition]);
  }, [selectedCertIndex, certAchievementsIndexes]);

  const handlePrevCert = useCallback(() => {
    if (
      selectedCertIndex === null ||
      certAchievementsIndexes.length <= 1
    ) {
      return;
    }

    const currentPosition =
      certAchievementsIndexes.indexOf(selectedCertIndex);

    const previousPosition =
      (currentPosition - 1 + certAchievementsIndexes.length) %
      certAchievementsIndexes.length;

    setSelectedCertIndex(certAchievementsIndexes[previousPosition]);
  }, [selectedCertIndex, certAchievementsIndexes]);

  const closeModal = useCallback(() => {
    setSelectedCertIndex(null);
  }, []);

  const openCertificate = useCallback((index: number) => {
    previousFocusRef.current =
      document.activeElement as HTMLElement;

    setSelectedCertIndex(index);
  }, []);

  const activateTrophy = useCallback((index: number) => {
    setHoveredIndex(index);
    setActiveTrophyIndex(index);
  }, []);

  const deactivateTrophy = useCallback((index: number) => {
    setHoveredIndex((current) =>
      current === index ? null : current,
    );

    setActiveTrophyIndex((current) =>
      current === index ? null : current,
    );
  }, []);

  const handleTrophyPointerUp = useCallback(
    (index: number, pointerType: string) => {
      if (pointerType === "mouse") return;

      if (activeTrophyIndex === index) {
        deactivateTrophy(index);
      } else {
        activateTrophy(index);
      }
    },
    [activeTrophyIndex, activateTrophy, deactivateTrophy],
  );

  const handleTrophyKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLDivElement>,
      index: number,
    ) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();

      if (activeTrophyIndex === index) {
        deactivateTrophy(index);
      } else {
        activateTrophy(index);
      }
    },
    [activeTrophyIndex, activateTrophy, deactivateTrophy],
  );

  return (
    <>
      <section
        aria-label="Achievements and certifications"
        className="relative overflow-hidden border-y-2 border-border bg-highlight/80 py-8 sm:py-10"
      >
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-foreground/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-foreground/10"
        />

        <div className="relative mx-auto max-w-6xl space-y-5 px-4 sm:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Achievements
              <span className="text-secondary-accent">.</span>
            </h2>
          </div>

          {achievements.map((item, index) => (
            <AchievementCard
              key={item.title + index}
              item={item}
              index={index}
              shouldReduceMotion={reduceMotion}
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

      <AnimatePresence mode="wait">
        {activeAchievement?.certificateImage &&
          selectedCertIndex !== null && (
            <CertificateModal
              achievement={activeAchievement}
              selectedCertIndex={selectedCertIndex}
              certificateIndexes={certAchievementsIndexes}
              closeModal={closeModal}
              handleNextCert={handleNextCert}
              handlePrevCert={handlePrevCert}
              previousFocusRef={previousFocusRef}
            />
          )}
      </AnimatePresence>
    </>
  );
}