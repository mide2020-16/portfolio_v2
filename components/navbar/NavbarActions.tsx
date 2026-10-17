"use client";

import { ArrowUpRight } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";

interface NavbarActionsProps {
  openHireMe: () => void;
}

export function NavbarActions({
  openHireMe,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />

      <button
        type="button"
        title="Hire Ayomide."
        onClick={openHireMe}
        className="group relative hidden items-center justify-center border-2 border-foreground bg-primary-accent px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[5px_5px_0px_0px_var(--color-foreground)] transition-all duration-150 ease-out hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0px_0px_var(--color-foreground)] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-accent dark:shadow-[5px_5px_0px_0px_var(--color-foreground)] dark:hover:shadow-[2px_2px_0px_0px_var(--color-foreground)] sm:inline-flex"
      >
        <span className="relative z-10 flex items-center gap-2">
          Hire Me

          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </span>
      </button>
    </div>
  );
}