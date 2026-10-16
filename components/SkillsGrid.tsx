"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { SectionLabel } from "./ui/SectionLabel";
import { skillCategories, type SkillCategory } from "@/lib/data/portfolio";

const skillIcons: Record<string, string> = {
  React: "react.png",
  "Next.js": "nextjs.png",
  TypeScript: "typescript.png",
  JavaScript: "javascript.png",
  "Tailwind CSS": "tailwind.png",
  HTML: "html.png",
  CSS: "css.png",
  Expo: "expo.png",
  "React Native": "react.png",
  "Node.js": "nodejs.png",
  Python: "python.png",
  MongoDB: "mongodb.png",
  Django: "django.png",
  "Git & GitHub": "git.png",
  "Agile / Scrum": "agile.png",
  Vercel: "vercel.png",
  Figma: "figma.png",
  "Google Console": "google.png",
};

const categoryVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

type SkillItemProps = {
  skill: string;
  selected: boolean;
  activated: boolean;
  delay: number;
  duplicate?: boolean;
  onSelect: () => void;
};

function SkillItem({
  skill,
  selected,
  activated,
  delay,
  duplicate = false,
  onSelect,
}: SkillItemProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const active = selected || hovered || focused;
  const icon = skillIcons[skill];

  const iconContent = (
    <span className="relative grid size-8 shrink-0 place-items-center sm:size-9">
      {icon ? (
        <Image
          src={`/skills/${icon}`}
          alt=""
          aria-hidden="true"
          width={36}
          height={36}
          draggable={false}
          className="skill-icon size-8 select-none object-contain sm:size-9"
          style={
            {
              "--skill-color-delay": active ? "0ms" : `${delay}ms`,
              filter: activated || active ? "grayscale(0%)" : "grayscale(100%)",
              opacity: activated || active ? 1 : 0.55,
              transform: active ? "scale(1.08)" : "scale(1)",
            } as CSSProperties
          }
        />
      ) : (
        <span className="text-xs font-black text-muted-foreground">
          {skill.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );

  const label = (
    <span
      className={[
        "whitespace-nowrap text-xs font-semibold sm:text-sm",
        "transition-colors duration-300",
        active ? "text-foreground" : "text-muted-foreground",
      ].join(" ")}
    >
      {skill}
    </span>
  );

  // The repeated sequence is purely visual.
  // Do not add duplicate skills to the keyboard or screen-reader flow.
  if (duplicate) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none flex min-h-12 shrink-0 items-center gap-2.5 rounded-xl border border-border/70 bg-background/70 px-3.5 py-2.5 sm:px-4"
      >
        {iconContent}
        {label}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-pressed={selected}
      className={[
        "group/skill relative flex min-h-12 shrink-0 items-center gap-2.5",
        "rounded-xl border px-3.5 py-2.5",
        "transition-[border-color,background-color,box-shadow]",
        "duration-300 ease-out sm:px-4",
        "focus-visible:z-20 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary-accent",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        active
          ? "border-primary-accent/70 bg-primary-accent/10 shadow-sm"
          : "border-border/70 bg-background/70 hover:border-primary-accent/40",
      ].join(" ")}
    >
      {iconContent}
      {label}

      {selected && (
        <motion.span
          layoutId="selected-skill-indicator"
          className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary-accent"
        />
      )}
    </button>
  );
}

type SkillMarqueeProps = {
  category: SkillCategory;
  inView: boolean;
  reduceMotion: boolean;
  selectedSkill: string | null;
  onSelect: (skill: string) => void;
  categoryIndex: number;
};

function SkillMarquee({
  category,
  inView,
  reduceMotion,
  selectedSkill,
  onSelect,
  categoryIndex,
}: SkillMarqueeProps) {
  const skills = category.skills;
  const shouldMove = inView && !reduceMotion && skills.length > 1;

  // Two identical groups allow the track to loop seamlessly.
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
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-card to-transparent sm:w-7"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-card to-transparent sm:w-7"
      />

      <div
        className={[
          "skills-marquee-track flex h-full w-max items-center",
          shouldMove ? "skills-marquee-running" : "",
          // Alternate direction slightly between categories.
          categoryIndex % 2 === 1 ? "skills-marquee-reverse" : "",
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

function SkillCategoryRow({
  category,
  categoryIndex,
  selectedSkill,
  onSelect,
  reduceMotion,
}: {
  category: SkillCategory;
  categoryIndex: number;
  selectedSkill: string | null;
  onSelect: (skill: string) => void;
  reduceMotion: boolean;
}) {
  const rowRef = useRef<HTMLElement>(null);

  const inView = useInView(rowRef, {
    amount: 0.25,
    margin: "0px 0px -5% 0px",
  });

  return (
    <motion.article
      ref={rowRef}
      variants={categoryVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className={[
        "grid min-w-0 grid-cols-[108px_minmax(0,1fr)]",
        "items-stretch gap-2 rounded-2xl border border-border/80",
        "bg-card p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.025)]",
        "transition-shadow duration-300 hover:shadow-md",
        "sm:grid-cols-[168px_minmax(0,1fr)] sm:gap-5 sm:p-4",
      ].join(" ")}
    >
      {/* Fixed left column: vertically centered category title */}
      <div className="flex min-w-0 items-center">
        <div
          className={[
            "flex min-h-[68px] w-full items-center",
            "gap-1.5 border-2 border-foreground",
            "bg-secondary-accent py-3 text-background",
            "shadow-[5px_5px_0px_0px_var(--border)]",
            "sm:min-h-[76px] sm:px-4",
          ].join(" ")}
        >
          <span className="text-lg font-black uppercase leading-tight tracking-wide sm:text-xl sm:tracking-wider">
            {category.title}
          </span>
        </div>
      </div>

      {/* Right column: all skills on one continuous horizontal line */}
      <SkillMarquee
        category={category}
        inView={inView}
        reduceMotion={reduceMotion}
        selectedSkill={selectedSkill}
        onSelect={onSelect}
        categoryIndex={categoryIndex}
      />
    </motion.article>
  );
}

export function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-muted/40 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <SectionLabel title="Skills" />
        <motion.div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5">
          {skillCategories.map((category, index) => (
            <SkillCategoryRow
              key={category.title}
              category={category}
              categoryIndex={index}
              selectedSkill={selectedSkill}
              onSelect={(skill) =>
                setSelectedSkill((current) =>
                  current === skill ? null : skill,
                )
              }
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
