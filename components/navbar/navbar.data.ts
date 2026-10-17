import { Home, Briefcase, Code, Mail } from "lucide-react";


export const BRAND_NAME = "Ayomide";
export const MATRIX_CHARS = BRAND_NAME.split("");
export const SCRAMBLE_INTERVAL_MS = 45;
export const INITIAL_DECODE_DELAY_MS = 70;
export const DECELERATION_MS = 28;
export const DECELERATION_POWER = 1.35;

export const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const MOBILE_NAV_ITEMS = [
  { href: "#top", label: "Home", icon: Home },
  { href: "#experience", label: "Exp", icon: Briefcase },
  { href: "#projects", label: "Work", icon: Code },
  { href: "#contact", label: "Contact", icon: Mail },
] as const;