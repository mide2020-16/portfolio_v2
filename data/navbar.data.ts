import { Home, Briefcase, Code, Mail } from "lucide-react";

export const BRAND_NAME = "Ayomide";
export const MATRIX_CHARS = BRAND_NAME.split("");
export const SCRAMBLE_INTERVAL_MS = 45;
export const INITIAL_DECODE_DELAY_MS = 70;
export const DECELERATION_MS = 28;
export const DECELERATION_POWER = 1.35;

export const NAV_LINKS = [
  { slug: "experience", label: "Experience" },
  { slug: "projects", label: "Projects" },
  { slug: "skills", label: "Skills" },
  { slug: "contact", label: "Contact" },
  { slug: "testimonials", label: "Testimonials"},
] as const;

export const MOBILE_NAV_ITEMS = [
  { slug: "top", label: "Home", icon: Home },
  { slug: "experience", label: "Exp", icon: Briefcase },
  { slug: "projects", label: "Work", icon: Code },
  { slug: "contact", label: "Contact", icon: Mail },
] as const;

/**
 * Resolves the href based on the current pathname.
 * - On Home ("/"): returns "#experience" (or "#top")
 * - On other pages: returns "/experience" (or "/" for "top")
 */
export function getNavHref(slug: string, pathname: string): string {
  const isHome = pathname === "/";

  if (isHome || slug === "skiils" || slug === "contact" || slug === "testimonials") {
    return `/#${slug}`;
  }

  return slug === "top" ? "/" : `/${slug}`;
}