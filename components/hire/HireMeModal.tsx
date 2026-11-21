
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useCalendlyEventListener } from "react-calendly";

import { HireMeHeader } from "./components/HireMeHeader";
import { IntentSelection } from "./components/IntentSelection";
import { BookingStep } from "./components/BookingStep";
import { BookingSuccess } from "./components/BookingSuccess";
import { useCalendlyTheme } from "./hooks/useCalendlyTheme";
import { useHireMeDialog } from "./hooks/useHireMeDialog";

import { getCalendlyUrl } from "./hire-me.utils";
import type {
  HireMeModalProps,
  Intent,
  Step,
} from "./hire-me.types";

export function HireMeModal({
  open,
  onClose,
}: HireMeModalProps) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [step, setStep] = useState<Step>("choose");

  const reduceMotion = useReducedMotion();
  const calendlyColors = useCalendlyTheme();
  const calendlyUrl = getCalendlyUrl(intent);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const { dialogRef, closeButtonRef } = useHireMeDialog({
    open,
    onClose: handleClose,
  });

  // Reset modal state whenever it closes.
  useEffect(() => {
    if (open) return;

    setIntent(null);
    setStep("choose");
  }, [open]);

  // Listen for successful Calendly bookings.
  useCalendlyEventListener({
    onEventScheduled: () => {
      setStep("success");
    },
  });

  const handlePreferEmail = useCallback(() => {
    const selectedIntent = intent || "client";

    const params = new URLSearchParams(window.location.search);
    params.set("intent", selectedIntent);

    const newRelativePathQuery = `${window.location.pathname}?${params.toString()}#contact`;

    window.history.pushState(null, "", newRelativePathQuery);

    handleClose();

    const contactElement = document.getElementById("contact");

    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.hash = "#contact";
    }
  }, [intent, handleClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 320,
            damping: 32,
            mass: 0.85,
          },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.22,
            ease: "easeIn" as const,
          },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="hire-me-overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: reduceMotion ? 0 : 0.22,
          }}
          className="fixed inset-0 z-100 bg-black/70 backdrop-blur-[3px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
          role="presentation"
        >
          <motion.section
            ref={dialogRef}
            tabIndex={-1}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-me-title"
            className="absolute right-0 top-0 flex h-dvh w-full flex-col overflow-hidden border-l-2 border-border bg-background text-foreground shadow-[-8px_0px_0px_0px_var(--highlight)] outline-none sm:w-[60vw] sm:max-w-4xl sm:shadow-[-12px_0px_0px_0px_var(--highlight)]"
          >
            <HireMeHeader
              step={step}
              onClose={handleClose}
              closeButtonRef={closeButtonRef}
            />

            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {step === "choose" && (
                <IntentSelection
                  key="choose"
                  intent={intent}
                  reduceMotion={!!reduceMotion}
                  onSelect={setIntent}
                  onContinue={() => setStep("book")}
                  onPreferEmail={handlePreferEmail}
                />
              )}

              {step === "book" && (
                <BookingStep
                  key="book"
                  intent={intent}
                  calendlyUrl={calendlyUrl}
                  calendlyColors={calendlyColors}
                  reduceMotion={!!reduceMotion}
                  onBack={() => setStep("choose")}
                  onPreferEmail={handlePreferEmail}
                />
              )}

              {step === "success" && (
                <BookingSuccess
                  key="success"
                  reduceMotion={!!reduceMotion}
                  onClose={handleClose}
                />
              )}
            </AnimatePresence>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
