import { SkillCategory } from "@/lib/data/portfolio";
import { SkillMarquee } from "./SkillMarquee";
import { useRef } from "react";
import { useInView, motion} from "framer-motion";

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

export function SkillCategoryRow({
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
            "flex min-h-17 w-full items-center",
            "gap-1.5 border-2 border-foreground",
            "bg-secondary-accent py-3 text-background",
            "shadow-[5px_5px_0px_0px_var(--border)]",
            "sm:min-h-19 sm:px-4",
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