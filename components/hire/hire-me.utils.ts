
import type {
  CalendlyColors,
  Intent,
} from "./hire-me.types";

export function getCalendlyThemeColors(
  isDark: boolean,
): CalendlyColors {
  if (isDark) {
    return {
      backgroundColor: "121413",
      textColor: "f3f4f2",
      primaryColor: "84b82b",
    };
  }

  return {
    backgroundColor: "ffffff",
    textColor: "101211",
    primaryColor: "6b9a1f",
  };
}

export function getCalendlyUrl(
  intent: Intent | null,
): string | null {
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
