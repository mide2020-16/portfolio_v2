
import { X } from "lucide-react";
import type { Step } from "../hire-me.types";

type HireMeHeaderProps = {
  step: Step;
  onClose: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export function HireMeHeader({
  step,
  onClose,
  closeButtonRef,
}: HireMeHeaderProps) {
  return (
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
                <span className="bg-secondary-accent px-1">
                  together
                </span>
              </>
            ) : step === "book" ? (
              <>
                Schedule a{" "}
                <span className="bg-secondary-accent px-1">
                  session
                </span>
              </>
            ) : (
              <>
                Meeting{" "}
                <span className="bg-secondary-accent px-1">
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
        onClick={onClose}
        aria-label="Close dialog"
        className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground/30 transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:rotate-90 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </header>
  );
}
