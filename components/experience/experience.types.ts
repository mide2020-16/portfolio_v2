export type ProjectPlatform = "web" | "desktop" | "mobile";
export type ExperienceGroupKind = "employment" | "personal";

export interface CareerMilestone {
  role: string;
  dateRange: string;
  summary: string;
  highlights: string[];
}

export interface ExperienceProject {
  id: string;
  name: string;
  category: "work-product" | "personal-project";
  platform: ProjectPlatform;
  summary: string;
  contribution: string;
  technologies: string[];
  highlights: string[];
  desktopScreenshot?: string;
  mobileScreenshot?: string;
  featured?: boolean;
  link?: string;
  recognition?: string;
}

export interface ExperienceGroup {
  id: string;
  kind: ExperienceGroupKind;
  organisation: string;
  role: string;
  dateRange: string;
  location?: string;
  label: string;
  summary: string;
  animation: "maekandex" | "ictrec" | "personal-projects";
  milestones?: CareerMilestone[];
  highlights?: string[];
  projects?: ExperienceProject[];
}

export type ExperienceView = "home" | "all";
