
import {
  BriefcaseBusiness,
  Layers3,
} from "lucide-react";
import type { IntentOption } from "./hire-me.types";

export const intentOptions: IntentOption[] = [
  {
    id: "client",
    title: "I have a project",
    description: "Let's discuss your idea and how I can help.",
    icon: Layers3,
  },
  {
    id: "recruiter",
    title: "An opportunity",
    description: "Let's discuss a role or collaboration.",
    icon: BriefcaseBusiness,
  },
];
