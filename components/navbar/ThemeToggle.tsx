/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const nextTheme = isDark ? "light" : "dark";

    // Fallback if browser doesn't support View Transitions
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Set origin coordinates
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);

    // Smooth transition trigger
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      // Optional: fine-tune timing if needed
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group relative p-2.5 rounded-full border border-border bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary-accent transition-all duration-300 cursor-pointer shadow-sm overflow-hidden"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {!mounted ? (
        <span className="block w-5 h-5" aria-hidden />
      ) : isDark ? (
        <Sun className="w-5 h-5 text-foreground transition-all duration-500 ease-out group-hover:rotate-180 group-hover:scale-110 active:scale-95" />
      ) : (
        <Moon className="w-5 h-5 text-foreground transition-all duration-500 ease-out group-hover:-rotate-45 group-hover:scale-110 active:scale-95" />
      )}
    </button>
  );
}
