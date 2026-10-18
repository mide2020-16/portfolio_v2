import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SkillCategory } from "@/lib/data/portfolio";
import { SkillMarquee } from "./SkillMarquee";

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

type SkillCategoryRowProps = {
  category: SkillCategory;
  categoryIndex: number;
  selectedSkill: string | null;
  onSelect: (skill: string) => void;
  reduceMotion: boolean;
};

export function SkillCategoryRow({
  category,
  categoryIndex,
  selectedSkill,
  onSelect,
  reduceMotion,
}: SkillCategoryRowProps) {
  const rowRef = useRef<HTMLElement>(null);

  const inView = useInView(rowRef, {
    amount: 0.2,
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
        "min-w-0 overflow-hidden",
        "rounded-2xl border border-border/80",
        "bg-card",
        "shadow-[0_4px_20px_rgba(0,0,0,0.025)]",
        "transition-shadow duration-300",
        "hover:shadow-md",
      ].join(" ")}
    >
      {/* Category heading */}
      <div className="flex items-center justify-between gap-4 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={[
            "inline-flex min-h-11 items-center",
            "border-2 border-foreground",
            "bg-secondary-accent text-background",
            "px-3 py-2",
            "shadow-[4px_4px_0px_0px_var(--border)]",
            "sm:min-h-14 sm:px-4",
          ].join(" ")}
        >
          <span className="text-sm font-black uppercase leading-tight tracking-wider sm:text-xl">
            {category.title}
          </span>
        </div>

        {/* Mobile scroll hint */}
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:hidden">
          Swipe →
        </span>
      </div>

      {/* Skills */}
      <div className="mt-3 px-3 pb-3 sm:mt-4 sm:px-4 sm:pb-4">
        <SkillMarquee
          category={category}
          inView={inView}
          reduceMotion={reduceMotion}
          selectedSkill={selectedSkill}
          onSelect={onSelect}
          categoryIndex={categoryIndex}
        />
      </div>
    </motion.article>
  );
}
