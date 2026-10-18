import { education } from "./education.data";

export type EducationItem = (typeof education)[number] & {
  certificateUrl?: string;
  highlights: string[];
};

export interface EducationCardSharedProps {
  item: EducationItem;
  shouldReduceMotion: boolean;
}
