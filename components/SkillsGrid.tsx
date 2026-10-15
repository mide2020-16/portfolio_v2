"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { SectionLabel } from "./ui/SectionLabel";
import { skillCategories, type SkillCategory } from "@/lib/data/portfolio";

const skillIcons: Record<string, string> = {
  React: "react.png",
  "Next.js": "nextjs.png",
  TypeScript: "typescript.png",
  JavaScript: "javascript.png",
  "Tailwind CSS": "tailwind-css.png",
  HTML: "html.png",
  CSS: "css.png",

  Expo: "expo.png",
  "React Native": "react-native.png",

  "Node.js": "nodejs.png",
  Python: "python.png",
  MongoDB: "mongodb.png",
  Django: "django.png",

  "Git & GitHub": "git-github.png",
  "Agile / Scrum": "agile-scrum.png",
  Vercel: "vercel.png",
  Figma: "figma.png",
  "Google Console": "google-console.png",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 110,
      damping: 18,
    },
  },
};

type SkillItemProps = {
  skill: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
};

function SkillItem({ skill, index, selected, onSelect }: SkillItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(itemRef, {
    amount: 0.65,
    margin: "-12px",
  });
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const active = selected || hovered;
  const icon = skillIcons[skill];
  const shouldShowColor = isInView || active;

  return (
    <button
      ref={itemRef}
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-pressed={selected}
      className={[
        "group relative flex min-w-[120px] flex-1 items-center justify-center gap-2.5 cursor-pointer",
        "border-2 px-3 py-2.5 text-left sm:min-w-[140px] sm:gap-3 sm:px-4",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-accent",
        active
          ? "border-primary-accent bg-primary-accent/10"
          : "border-border bg-background hover:border-primary-accent/50 hover:bg-muted/50",
      ].join(" ")}
    >
      {/* Fixed 3D Icon Container */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10">
        {icon ? (
          <motion.img
            src={`/images/skills/${icon}`}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-8 w-8 select-none object-contain sm:h-9 sm:w-9"
            animate={{
              filter: shouldShowColor ? "grayscale(0%)" : "grayscale(100%)",
              opacity: shouldShowColor ? 1 : 0.6,
            }}
            transition={{
              filter: {
                duration: reduceMotion ? 0 : active ? 0.15 : 0.5,
                delay:
                  shouldShowColor && !active && !reduceMotion
                    ? index * 0.04
                    : 0,
              },
              opacity: { duration: reduceMotion ? 0 : 0.3 },
            }}
          />
        ) : (
          <span className="text-xs font-black text-muted-foreground">
            {skill.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Skill Name */}
      <span
        className={[
          "truncate text-xs font-bold sm:text-sm",
          "transition-colors duration-200",
          active ? "text-foreground" : "text-foreground/80",
        ].join(" ")}
      >
        {skill}
      </span>
    </button>
  );
}

export function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-muted py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <SectionLabel title="Skills" />

        {/* Category Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 flex flex-col gap-6"
        >
          {skillCategories.map((category: SkillCategory) => (
            <motion.article
              key={category.title}
              variants={categoryVariants}
              className="relative flex min-w-0 flex-col border-2 border-border bg-card p-4 sm:p-6 shadow-[4px_4px_0px_0px_var(--border)]"
            >
              {/* Category Header Tag */}
              <div className="mb-4">
                <div
                  className={[
                    "inline-flex items-center justify-start border-2 px-4 py-2",
                    "text-xs font-black uppercase tracking-wider",
                    "shadow-[4px_4px_0px_0px_var(--color-foreground)] dark:shadow-[4px_4px_0px_0px_var(--color-foreground)]",
                    "transition-all duration-200 ease-out hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--color-foreground)]",
                    category.accent,
                  ].join(" ")}
                >
                  <span>{category.title}</span>
                </div>
              </div>

              {/* Horizontal Flex Grid */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill + skillIndex}
                    skill={skill}
                    index={skillIndex}
                    selected={selectedSkill === skill}
                    onSelect={() =>
                      setSelectedSkill((current) =>
                        current === skill ? null : skill,
                      )
                    }
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
