
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Mail,
} from "lucide-react";
import { intentOptions } from "../hire-me.data";
import type { Intent } from "../hire-me.types";

type IntentSelectionProps = {
  intent: Intent | null;
  reduceMotion: boolean;
  onSelect: (intent: Intent) => void;
  onContinue: () => void;
  onPreferEmail: () => void;
};

export function IntentSelection({
  intent,
  reduceMotion,
  onSelect,
  onContinue,
  onPreferEmail,
}: IntentSelectionProps) {
  return (
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

        <div className="grid gap-3 sm:grid-cols-2">
          {intentOptions.map((option, index) => {
            const Icon = option.icon;
            const selected = intent === option.id;

            return (
              <motion.button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(option.id)}
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
                whileTap={
                  reduceMotion ? undefined : { x: 2, y: 2 }
                }
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
                          className="text-foreground"
                          aria-hidden="true"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow"
                        initial={{
                          scale: 0.6,
                          opacity: 0,
                          x: -5,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 0.5,
                          x: 0,
                        }}
                        exit={{
                          scale: 0.6,
                          opacity: 0,
                          x: 5,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="flex h-6 w-6 items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        <ChevronRight
                          size={18}
                          className="text-foreground"
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

        <div className="mt-7 flex flex-col-reverse gap-3 border-t-2 border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            title="Email Ayomide."
            onClick={onPreferEmail}
            className="inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm font-bold text-foreground/60 transition-colors hover:text-secondary-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
          >
            <Mail size={17} aria-hidden="true" />
            Prefer email?
          </button>

          <button
            type="button"
            disabled={!intent}
            onClick={onContinue}
            className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-border bg-foreground px-5 py-3 text-xs font-black uppercase tracking-widest text-background shadow-[4px_4px_0px_0px_var(--highlight)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-secondary-accent hover:text-foreground hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-foreground disabled:hover:text-background disabled:hover:shadow-[4px_4px_0px_0px_var(--highlight)]"
          >
            Continue
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
