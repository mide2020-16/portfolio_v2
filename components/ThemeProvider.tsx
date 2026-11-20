/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

function getStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (value === "light" || value === "dark" || value === "system") {
      return value;
    }
  } catch {
    // Ignore unavailable localStorage.
  }

  return "system";
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>("light");

  const setTheme = useCallback((next: Theme) => {
    const resolved = resolveTheme(next);

    setThemeState(next);
    setResolvedTheme(resolved);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore unavailable localStorage.
    }

    applyTheme(resolved);
  }, []);

  useEffect(() => {
    const stored = getStoredTheme();
    const resolved = resolveTheme(stored);

    setThemeState(stored);
    setResolvedTheme(resolved);

    applyTheme(resolved);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = () => {
      if (theme !== "system") return;

      const resolved = getSystemTheme();

      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
