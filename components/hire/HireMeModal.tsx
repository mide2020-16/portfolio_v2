/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Mail,
  X,
} from "lucide-react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import Link from "next/link";

type Intent = "client" | "recruiter";
type Step = "choose" | "book" | "success";

type Props = {
  open: boolean;
  onClose: () => void;
};

const options = [
  {
    id: "client" as const,
    title: "I have a project",
    description: "Let's discuss your idea and how I can help.",
    icon: Layers3,
  },
  {
    id: "recruiter" as const,
    title: "An opportunity",
    description: "Let's discuss a role or collaboration.",
    icon: BriefcaseBusiness,
  },
];

function getCalendlyUrl(intent: Intent | null): string | null {
  const configuredUrl =
    (intent === "client"
      ? process.env.NEXT_PUBLIC_CALENDLY_PROJECT_URL
      : intent === "recruiter"
        ? process.env.NEXT_PUBLIC_CALENDLY_RECRUITER_URL
        : undefined) || process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!configuredUrl) return null;

  try {
    const parsedUrl = new URL(configuredUrl);

    const isCalendly =
      parsedUrl.hostname === "calendly.com" ||
      parsedUrl.hostname.endsWith(".calendly.com");

    if (parsedUrl.protocol !== "https:" || !isCalendly) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

export function HireMeModal({ open, onClose }: Props) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [step, setStep] = useState<Step>("choose");

  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const reduceMotion = useReducedMotion();
  const calendlyUrl = getCalendlyUrl(intent);

  const transition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 300,
        damping: 28,
        mass: 0.8,
      };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useCalendlyEventListener({
    onEventScheduled: () => {
      setStep("success");
    },
  });

  useEffect(() => {
    if (!open) {
      setIntent(null);
      setStep("choose");
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.offsetParent !== null ||
          element.getBoundingClientRect().height > 0,
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, handleClose]);

  const handlePreferEmail = () => {
    const selectedIntent = intent || "client";

    // Update browser URL query params without reloading
    const params = new URLSearchParams(window.location.search);
    params.set("intent", selectedIntent);
    const newRelativePathQuery = `${window.location.pathname}?${params.toString()}#contact`;
    window.history.pushState(null, "", newRelativePathQuery);

    // Close the modal
    handleClose();

    // Scroll smoothly to contact section and let its mount listener handle pre-filling
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = `#contact`;
    }
  };

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
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[3px]"
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
            {/* Modal header — matching the achievement modal */}
            <header className="flex shrink-0 items-center justify-between gap-4 border-b-2 border-border bg-background px-4 py-4 text-foreground sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="min-w-0">
                  <h2
                    id="hire-me-title"
                    className="mt-1 truncate text-sm font-black uppercase tracking-wide sm:text-base"
                  >
                    {step === "choose" ? (
                      <>
                        Let&apos;s work{" "}
                        <span className="bg-[var(--secondary-accent)] px-1">
                          together
                        </span>
                      </>
                    ) : step === "book" ? (
                      <>
                        Schedule a{" "}
                        <span className="bg-[var(--secondary-accent)] px-1">
                          session
                        </span>
                      </>
                    ) : (
                      <>
                        Meeting{" "}
                        <span className="bg-[var(--secondary-accent)] px-1">
                          confirmed
                        </span>
                        !
                      </>
                    )}
                  </h2>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground/30 transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-90 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            {/* Animated step content */}
            <AnimatePresence mode="wait" initial={false}>
              {step === "choose" && (
                <motion.div
                  key="choose"
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : 12,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: reduceMotion ? 0 : -12,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                    ease: "easeOut",
                  }}
                  className="min-h-0 flex-1 overflow-y-auto"
                >
                  <div className="p-5 sm:p-7">
                    <div className="mb-7">
                      <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                        What brings you here
                        <span className="text-secondary-accent">?</span>
                      </h3>
                    </div>

                    {/* Intent cards */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {options.map((option, index) => {
                        const Icon = option.icon;
                        const selected = intent === option.id;

                        return (
                          <motion.button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setIntent(option.id)}
                            initial={{
                              opacity: 0,
                              y: reduceMotion ? 0 : 12,
                            }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.25,
                              delay: reduceMotion ? 0 : index * 0.07,
                            }}
                            whileHover={
                              reduceMotion ? undefined : { x: -2, y: -2 }
                            }
                            whileTap={reduceMotion ? undefined : { x: 2, y: 2 }}
                            className={`group flex min-h-44 flex-col border-2 p-5 text-left shadow-[4px_4px_0px_0px_var(--border)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2 ${
                              selected
                                ? "border-foreground bg-background"
                                : "border-border bg-background hover:border-foreground"
                            }`}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div
                                className={`flex h-11 w-11 items-center justify-center border-2 transition-colors ${
                                  selected
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-border bg-background text-foreground group-hover:border-foreground"
                                }`}
                              >
                                <Icon size={22} aria-hidden="true" />
                              </div>
                            </div>

                            <span className="mt-6 font-black tracking-tight">
                              {option.title}
                            </span>

                            <span className="mt-2 text-sm leading-5 text-foreground/60">
                              {option.description}
                            </span>

                            <div className="mt-auto flex w-full items-center justify-end pt-4">
                              <AnimatePresence mode="wait" initial={false}>
                                {selected ? (
                                  <motion.div
                                    key="check"
                                    initial={{
                                      scale: 0.6,
                                      opacity: 0,
                                      rotate: -45,
                                    }}
                                    animate={{
                                      scale: 1,
                                      opacity: 0.5,
                                      rotate: 0,
                                    }}
                                    exit={{
                                      scale: 0.6,
                                      opacity: 0,
                                      rotate: 45,
                                    }}
                                    transition={{
                                      duration: 0.2,
                                      ease: "easeOut",
                                    }}
                                    className="flex h-6 w-6 items-center justify-center"
                                  >
                                    <Check
                                      size={20}
                                      className="text-[var(--foreground)]"
                                      aria-hidden="true"
                                    />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="arrow"
                                    initial={{ scale: 0.6, opacity: 0, x: -5 }}
                                    animate={{ scale: 1, opacity: 0.5, x: 0 }}
                                    exit={{ scale: 0.6, opacity: 0, x: 5 }}
                                    transition={{
                                      duration: 0.2,
                                      ease: "easeOut",
                                    }}
                                    className="flex h-6 w-6 items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                  >
                                    <ChevronRight
                                      size={18}
                                      className="text-[var(--foreground)]"
                                      aria-hidden="true"
                                    />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="mt-7 flex flex-col-reverse gap-3 border-t-2 border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        title="Email Ayomide."
                        onClick={handlePreferEmail}
                        className="inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm font-bold text-foreground/60 transition-colors hover:text-secondary-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
                      >
                        <Mail size={17} aria-hidden="true" />
                        Prefer email?
                      </button>

                      <button
                        type="button"
                        disabled={!intent}
                        onClick={() => setStep("book")}
                        className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-border bg-foreground px-5 py-3 text-xs font-black uppercase tracking-widest text-background shadow-[4px_4px_0px_0px_var(--highlight)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary-accent hover:text-foreground hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-foreground disabled:hover:text-background disabled:hover:shadow-[4px_4px_0px_0px_var(--highlight)]"
                      >
                        Continue
                        <ChevronRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "book" && (
                <motion.div
                  key="book"
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : 12,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: reduceMotion ? 0 : -12,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                    ease: "easeOut",
                  }}
                  className="flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                  {/* Booking header */}
                  <div className="shrink-0 border-b-2 border-border px-5 pb-4 pt-4 sm:px-7 sm:pt-5">
                    <button
                      type="button"
                      onClick={() => setStep("choose")}
                      className="mb-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/50 transition-colors hover:text-secondary-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
                    >
                      <ChevronLeft size={16} aria-hidden="true" />
                      Back
                    </button>

                    <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                      Let&apos;s find a time to talk
                      <span className="ml-0.5 text-secondary-accent">...</span>
                    </h3>
                  </div>

                  {/* Calendly */}
                  {calendlyUrl ? (
                    <div className="min-h-0 flex-1 overflow-hidden bg-white">
                      <InlineWidget
                        key={`${intent}-${calendlyUrl}`}
                        url={calendlyUrl}
                        styles={{
                          height: "100%",
                          minWidth: "320px",
                          width: "100%",
                        }}
                        pageSettings={{
                          backgroundColor: "ffffff",
                          textColor: "101211",
                          primaryColor: "6b9a1f",
                          hideEventTypeDetails: false,
                          hideLandingPageDetails: false,
                        }}
                        utm={{
                          utmSource: "portfolio",
                          utmMedium: "hire_me_modal",
                          utmCampaign: "intro_call",
                          utmContent:
                            intent === "client"
                              ? "project_inquiry"
                              : "recruiter_opportunity",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="m-5 border-2 border-border bg-background p-5 shadow-[4px_4px_0px_0px_var(--border)] sm:m-7">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-border bg-foreground text-background">
                          <Mail size={19} aria-hidden="true" />
                        </div>

                        <div>
                          <p className="font-black">
                            Booking is not configured yet.
                          </p>

                          <button
                            type="button"
                            title="Email Ayomide."
                            onClick={handlePreferEmail}
                            className="mt-4 inline-flex min-h-10 items-center gap-2 border-2 border-border bg-foreground px-4 py-2 text-[10px] font-black uppercase tracking-widest text-background transition-colors hover:bg-secondary-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
                          >
                            Send an email
                            <ChevronRight size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 12,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    ease: "easeOut",
                  }}
                  className="overflow-y-auto p-7 text-center sm:p-10"
                >
                  <motion.div
                    initial={
                      reduceMotion ? { scale: 1 } : { scale: 0.8, rotate: -8 }
                    }
                    animate={{ scale: 1, rotate: 0 }}
                    transition={transition}
                    className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-border bg-highlight text-secondary-accent shadow-[4px_4px_0px_0px_var(--border)]"
                  >
                    <CalendarCheck size={30} aria-hidden="true" />
                  </motion.div>

                  <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                    You&apos;re all set
                    <span className="text-secondary-accent ml-0.5">!</span>
                  </h3>

                  <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-foreground/60">
                    Your meeting has been scheduled. Check your email for the
                    booking confirmation and meeting details.
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 border-2 border-border bg-foreground px-6 py-3 text-xs font-black uppercase tracking-widest text-background shadow-[4px_4px_0px_0px_var(--highlight)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary-accent hover:text-foreground hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
                  >
                    Done
                    <Check size={17} aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
