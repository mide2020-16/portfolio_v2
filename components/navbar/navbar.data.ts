import { Home, Briefcase, Code, Mail } from "lucide-react";


export const BRAND_NAME = "Ayomide";
export const MATRIX_CHARS = "Ayomide".split("");
export const SCRAMBLE_INTERVAL_MS = 50;
export const INITIAL_DECODE_DELAY_MS = 10;
export const DECELERATION_MS = 15;
export const DECELERATION_POWER = 2;

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