"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";
import { skillCategories} from "@/lib/data/portfolio";
import { SkillCategoryRow } from "./skills/SkillCategory";

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
