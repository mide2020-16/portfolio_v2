"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, X, ChevronLeft, ChevronRight } from "lucide-react";
import { achievements } from "@/lib/data/portfolio";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export function AchievementBanner() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const activeAchievement =
    selectedCertIndex !== null ? achievements[selectedCertIndex] : null;

  // Filter achievements that actually have a certificate image set
  const certAchievementsIndexes = achievements
    .map((item, idx) => (item.certificateImage && item.certificateImage.trim() !== "" ? idx : null))
    .filter((idx): idx is number => idx !== null);

  const handleNextCert = useCallback(() => {
    if (selectedCertIndex === null || certAchievementsIndexes.length <= 1) return;
    const currentPos = certAchievementsIndexes.indexOf(selectedCertIndex);
    const nextPos = (currentPos + 1) % certAchievementsIndexes.length;
    setSelectedCertIndex(certAchievementsIndexes[nextPos]);
  }, [selectedCertIndex, certAchievementsIndexes]);

  const handlePrevCert = useCallback(() => {
    if (selectedCertIndex === null || certAchievementsIndexes.length <= 1) return;
    const currentPos = certAchievementsIndexes.indexOf(selectedCertIndex);
    const prevPos = (currentPos - 1 + certAchievementsIndexes.length) % certAchievementsIndexes.length;
    setSelectedCertIndex(certAchievementsIndexes[prevPos]);
  }, [selectedCertIndex, certAchievementsIndexes]);

  // Keyboard controls for the modal
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCertIndex(null);
      if (e.key === "ArrowRight") handleNextCert();
      if (e.key === "ArrowLeft") handlePrevCert();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertIndex, handleNextCert, handlePrevCert]);

  return (
    <>
      <section className="border-y-2 border-border bg-highlight py-6">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-4">
          {achievements.map((item, index) => {
            const hasCert = Boolean(item.certificateImage && item.certificateImage.trim() !== "");

            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring" as const,
                  stiffness: 120,
                  damping: 18,
                  delay: index * 0.05,
                }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-2 border-border bg-background/60 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-foreground text-highlight border-2 border-border flex-shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 font-bold text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  {hasCert && (
                    <button
                      onClick={() => setSelectedCertIndex(index)}
                      className="flex items-center gap-2 px-4 py-2 bg-foreground/10 border-2 border-border text-foreground font-black text-xs uppercase tracking-widest hover:bg-foreground hover:text-highlight transition-all active:scale-95"
                    >
                      <Award className="w-4 h-4" />
                      View Certificate
                    </button>
                  )}
                  <div className="px-5 py-2 bg-foreground text-background font-black text-xs uppercase tracking-widest border-2 border-border flex-shrink-0">
                    {item.badge}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeAchievement && activeAchievement.certificateImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedCertIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 280, damping: 26 }}
              className="relative max-w-3xl w-full border-2 border-border shadow-[8px_8px_0px_0px_var(--highlight)] bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-3 bg-foreground text-background border-b-2 border-border">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2 truncate">
                  <Trophy className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{activeAchievement.title} — Certificate</span>
                </span>
                <button
                  onClick={() => setSelectedCertIndex(null)}
                  className="font-black p-1 hover:text-secondary-accent transition-colors"
                  aria-label="Close certificate"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Display */}
              <div className="relative w-full bg-white" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={activeAchievement.certificateImage}
                  alt={`${activeAchievement.title} certificate`}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Arrow Controls (Only if multiple items have certificates) */}
                {certAchievementsIndexes.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevCert}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-foreground/80 text-background p-2 border-2 border-border hover:bg-foreground transition-all active:scale-95"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextCert}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-foreground/80 text-background p-2 border-2 border-border hover:bg-foreground transition-all active:scale-95"
                      aria-label="Next certificate"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}