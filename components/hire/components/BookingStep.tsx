/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { InlineWidget } from "react-calendly";
import type {
  CalendlyColors,
  Intent,
} from "../hire-me.types";

type BookingStepProps = {
  intent: Intent | null;
  calendlyUrl: string | null;
  calendlyColors: CalendlyColors;
  reduceMotion: boolean;
  onBack: () => void;
  onPreferEmail: () => void;
};

export function BookingStep({
  intent,
  calendlyUrl,
  calendlyColors,
  reduceMotion,
  onBack,
  onPreferEmail,
}: BookingStepProps) {
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true);

  useEffect(() => {
    if (!calendlyUrl) return;

    setIsCalendlyLoading(true);

    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "object" &&
        event.data !== null &&
        typeof event.data.event === "string" &&
        event.data.event.startsWith("calendly.")
      ) {
        setIsCalendlyLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);

    const fallbackTimer = window.setTimeout(() => {
      setIsCalendlyLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearTimeout(fallbackTimer);
    };
  }, [calendlyUrl]);

  return (
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
      <div className="shrink-0 border-b-2 border-border px-5 pb-4 pt-4 sm:px-7 sm:pt-5">
        <button
          type="button"
          onClick={onBack}
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

      {calendlyUrl ? (
        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          style={{
            backgroundColor: `#${calendlyColors.backgroundColor}`,
          }}
        >
          <AnimatePresence>
            {isCalendlyLoading && (
              <motion.div
                key="calendly-loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                }}
                role="status"
                aria-live="polite"
                className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/90 text-foreground"
              >
                <motion.span
                  aria-hidden="true"
                  animate={
                    reduceMotion ? undefined : { rotate: 360 }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          repeat: Infinity,
                          duration: 2.6,
                          ease: "linear",
                        }
                  }
                  className="inline-block select-none text-4xl leading-none"
                >
                  ⏳
                </motion.span>

                <span className="text-xs font-black uppercase tracking-widest text-foreground/60">
                  Loading calendar...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <InlineWidget
            key={`${intent}-${calendlyUrl}`}
            url={calendlyUrl}
            styles={{
              height: "100%",
              minWidth: "320px",
              width: "100%",
            }}
            pageSettings={{
              backgroundColor: calendlyColors.backgroundColor,
              textColor: calendlyColors.textColor,
              primaryColor: calendlyColors.primaryColor,
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
                onClick={onPreferEmail}
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
  );
}
