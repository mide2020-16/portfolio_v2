export type ProjectPlatform = "web" | "desktop" | "mobile";
export type ExperienceGroupKind = "employment" | "personal";
export type ProjectTopic =
  | "web-applications"
  | "mobile-applications"
  | "ai-machine-learning"
  | "backend-apis"
  | "developer-tools";

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
  topics?: ProjectTopic[];
}

export interface ExperienceAchievement {
  id: string;
  title: string;
  caseReference: string;
  dateRange: string;
  summary: string;
  context: string;
  contribution: string;
  evidence: string[];
  associatedProjectIds?: string[];
  certificateImages?: string[];
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
  achievements?: ExperienceAchievement[];
}

export type ExperienceView = "home" | "all";
