
import type { LucideIcon } from "lucide-react";

export type Intent = "client" | "recruiter";
export type Step = "choose" | "book" | "success";

export type HireMeModalProps = {
  open: boolean;
  onClose: () => void;
};

export type IntentOption = {
  id: Intent;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type CalendlyColors = {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
};
