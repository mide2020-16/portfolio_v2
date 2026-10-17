import { SkillCategory } from "@/lib/data/portfolio";
import { SkillItem } from "./SkillItem";

type SkillMarqueeProps = {
  category: SkillCategory;
  inView: boolean;
  reduceMotion: boolean;
  selectedSkill: string | null;
  onSelect: (skill: string) => void;
  categoryIndex: number;
};

export function SkillMarquee({
  category,
  inView,
  reduceMotion,
  selectedSkill,
  onSelect,
  categoryIndex,
}: SkillMarqueeProps) {
  const skills = category.skills;
  const shouldMove = inView && !reduceMotion && skills.length > 1;
  const groups = shouldMove ? [0, 1] : [0];

  return (
    <div
      className={[
        "skills-marquee group/marquee relative min-w-0",
        "h-full overflow-hidden rounded-xl",
        "focus-within:overflow-x-auto",
        "motion-safe:scroll-smooth",
      ].join(" ")}
      role="region"
      aria-label={`${category.title} skills`}
      tabIndex={0}
    >
      {/* Left and right edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-linear-to-r from-card to-transparent sm:w-7"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-linear-to-l from-card to-transparent sm:w-7"
      />

      <div
        className={[
          "skills-marquee-track flex h-full w-max items-center",
          shouldMove ? "skills-marquee-running" : "",
          categoryIndex % 2 === 0 ? "skills-marquee-reverse" : "",
        ].join(" ")}
        style={
          shouldMove
            ? {
                animationDuration: `${Math.max(
                  24,
                  Math.min(45, skills.length * 2.8),
                )}s`,
                animationDelay: `${categoryIndex * 0.12}s`,
              }
            : undefined
        }
      >
        {groups.map((groupIndex) => {
          const duplicate = groupIndex === 1;

          return (
            <div
              key={`${category.title}-group-${groupIndex}`}
              aria-hidden={duplicate || undefined}
              className="flex shrink-0 items-center gap-2.5 pr-2.5 sm:gap-3 sm:pr-3"
            >
              {skills.map((skill, skillIndex) => (
                <SkillItem
                  key={`${skill}-${skillIndex}`}
                  skill={skill}
                  selected={!duplicate && selectedSkill === skill}
                  activated={!duplicate && inView}
                  delay={categoryIndex * 160 + skillIndex * 100}
                  duplicate={duplicate}
                  onSelect={() => onSelect(skill)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
