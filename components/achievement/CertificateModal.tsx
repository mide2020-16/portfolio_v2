"use client";

import {
  motion,
  useReducedMotion
} from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { achievements } from "@/lib/data/portfolio";
import { backdropVariants, modalVariants } from "./achievementAnimation";

type Achievement = (typeof achievements)[number];

interface CertificateModalProps {
  achievement: Achievement;
  selectedCertIndex: number;
  certificateIndexes: number[];
  closeModal: () => void;
  handleNextCert: () => void;
  handlePrevCert: () => void;
  previousFocusRef: React.RefObject<HTMLElement | null>;
}

export function CertificateModal({
  achievement,
  selectedCertIndex,
  certificateIndexes,
  closeModal,
  handleNextCert,
  handlePrevCert,
  previousFocusRef,
}: CertificateModalProps) {
  const shouldReduceMotion = useReducedMotion() || null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = previousFocusRef.current;

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

      previousFocus?.focus();
    };
  }, [
    closeModal,
    handleNextCert,
    handlePrevCert,
    previousFocusRef,
  ]);

  const certificatePosition =
    certificateIndexes.indexOf(selectedCertIndex) + 1;

  return (
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
        variants={modalVariants(shouldReduceMotion)}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        className="relative my-auto flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden border-2 border-border bg-background shadow-[8px_8px_0px_0px_var(--highlight)] sm:shadow-[12px_12px_0px_0px_var(--highlight)]"
      >
        {/* Header */}
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
                {achievement.title}
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

        {/* Certificate */}
        <div className="relative min-h-0 flex-1 overflow-auto bg-[#e9e7e1]">
          <div className="relative mx-auto aspect-4/3 w-full">
            <Image
              key={achievement.certificateImage}
              src={achievement.certificateImage}
              alt={`${achievement.title} certificate`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain p-2 sm:p-5"
              priority
              quality={100}
            />
          </div>

          {certificateIndexes.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevCert}
                aria-label="Previous certificate"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-border bg-background/95 text-foreground shadow-[3px_3px_0px_0px_var(--foreground)] transition-all hover:-translate-x-0.5 hover:bg-foreground hover:text-background active:translate-y-[-45%] sm:left-4"
              >
                <ChevronLeft size={23} />
              </button>

              <button
                type="button"
                onClick={handleNextCert}
                aria-label="Next certificate"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-border bg-background/95 text-foreground shadow-[3px_3px_0px_0px_var(--foreground)] transition-all hover:-translate-x-0.5 hover:bg-foreground hover:text-background active:translate-y-[-45%] sm:right-4"
              >
                <ChevronRight size={23} />
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t-2 border-border bg-background px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-black text-foreground">
              {achievement.subtitle}
            </p>

            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50">
              Certificate{" "}
              {String(certificatePosition).padStart(2, "0")} /{" "}
              {String(certificateIndexes.length).padStart(2, "0")}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="inline-flex min-h-10 items-center gap-2 border-2 border-border bg-foreground px-4 py-2 text-[10px] font-black uppercase tracking-widest text-background transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
          >
            Done
            <X size={14} />
          </button>
        </footer>
      </motion.section>
    </motion.div>
  );
}
