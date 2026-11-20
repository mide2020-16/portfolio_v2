import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ExperienceAchievement } from "../../types/experience.types";

interface ExperienceAchievementsListProps {
  groupId: string;
  achievements: ExperienceAchievement[];
}

export function ExperienceAchievementsList({
  groupId,
  achievements,
}: ExperienceAchievementsListProps) {
  if (achievements.length === 0) return null;

  return (
    <div className="mb-6 border-y border-border/70 py-5">
      <p className="text-[10px] font-black uppercase tracking-[.16em] text-secondary-accent">
        Achievement case files
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {achievements.map((achievement) => (
          <Link
            key={achievement.id}
            href={`/experience/${groupId}/achievements/${achievement.id}`}
            className="inline-flex items-center gap-1.5 border border-border px-3 py-2 text-xs font-bold hover:bg-highlight/20"
          >
            {achievement.title}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
