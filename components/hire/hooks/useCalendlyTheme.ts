/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { getCalendlyThemeColors } from "../hire-me.utils";

function detectDarkTheme() {
  const root = document.documentElement;

  return (
    root.classList.contains("dark") ||
    root.getAttribute("data-theme") === "dark"
  );
}

export function useCalendlyTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(detectDarkTheme());

    const observer = new MutationObserver(() => {
      setIsDarkTheme(detectDarkTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return getCalendlyThemeColors(isDarkTheme);
}
