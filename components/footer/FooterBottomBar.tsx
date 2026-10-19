"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export function FooterBottomBar() {
  const year = new Date().getFullYear();
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <div className="mt-9 flex flex-col gap-3 border-t border-border pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <p className="text-[10px] font-semibold leading-5 tracking-wide text-muted-foreground">
        © {year} Efuwape Ayomide. All rights reserved.
      </p>

      <Link
        href="#top"
        className={[
          "group inline-flex min-h-11 w-fit items-center gap-2",
          "rounded-sm text-xs font-bold uppercase tracking-wider",
          "text-foreground/75 transition-colors hover:text-primary-accent",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary-accent",
        ].join(" ")}
      >
        <span>Back to top</span>

        <ArrowUp
          size={15}
          aria-hidden="true"
          className={[
            "transition-transform duration-200",
            shouldReduceMotion ? "" : "group-hover:-translate-y-1",
          ].join(" ")}
        />
      </Link>
    </div>
  );
}