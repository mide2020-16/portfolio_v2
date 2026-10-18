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

const directionPattern = [false, true, true, false];

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

  const reverseDirection =
    directionPattern[categoryIndex % directionPattern.length];

  const duration = Math.max(
    24,
    Math.min(45, skills.length * 2.8),
  );

  return (
    <div
      className={[
        "skills-marquee group/marquee relative min-w-0",
        "rounded-xl",
      ].join(" ")}
      role="region"
      aria-label={`${category.title} skills`}
    >
      {/* ─────────────────────────────
          MOBILE
          Natural horizontal scrolling.
      ───────────────────────────── */}
      <div
        className={[
          "skills-mobile-scroll",
          "flex items-center gap-2.5",
          "overflow-x-auto overflow-y-hidden",
          "pb-1",
          "scroll-smooth",
          "touch-pan-x",
          "[-ms-overflow-style:none]",
          "scrollbar-none",
          "[&::-webkit-scrollbar]:hidden",
          "sm:hidden",
        ].join(" ")}
      >
        {skills.map((skill, skillIndex) => (
          <SkillItem
            key={`${skill}-${skillIndex}`}
            skill={skill}
            selected={selectedSkill === skill}
            activated={inView}
            delay={categoryIndex * 160 + skillIndex * 100}
            onSelect={() => onSelect(skill)}
          />
        ))}
      </div>

      {/* ─────────────────────────────
          DESKTOP
          Animated marquee.
      ───────────────────────────── */}
      <div
        className={[
          "relative hidden min-w-0 overflow-hidden rounded-xl sm:block",
        ].join(" ")}
        tabIndex={0}
      >
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-card to-transparent lg:w-8"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-card to-transparent lg:w-8"
        />

        <div
          className={[
            "skills-marquee-track flex h-full w-max items-center",
            shouldMove && "skills-marquee-running",
            shouldMove &&
              reverseDirection &&
              "skills-marquee-reverse",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            shouldMove
              ? {
                  animationDuration: `${duration}s`,
                  animationDelay: `${categoryIndex * 0.12}s`,
                }
              : undefined
          }
        >
          {/* Original sequence */}
          <div className="flex shrink-0 items-center gap-3 pr-3">
            {skills.map((skill, skillIndex) => (
              <SkillItem
                key={`${skill}-${skillIndex}`}
                skill={skill}
                selected={selectedSkill === skill}
                activated={inView}
                delay={categoryIndex * 160 + skillIndex * 100}
                onSelect={() => onSelect(skill)}
              />
            ))}
          </div>

          {/* Visual duplicate */}
          {shouldMove && (
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center gap-3 pr-3"
            >
              {skills.map((skill, skillIndex) => (
                <SkillItem
                  key={`duplicate-${skill}-${skillIndex}`}
                  skill={skill}
                  selected={false}
                  activated={false}
                  delay={0}
                  duplicate
                  onSelect={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
