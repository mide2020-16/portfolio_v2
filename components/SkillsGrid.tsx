"use client";

import { SectionLabel } from "./ui/SectionLabel";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export function SkillsGrid() {
  return (
    <section id="skills" className="py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <SectionLabel number="03" title="Toolchain & Skills" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-card border-2 border-border p-8 shadow-[4px_4px_0px_0px_var(--border)] transition-all"
            >
              <div
                className={`inline-block px-4 py-1.5 mb-6 border-2 font-black text-xs uppercase tracking-widest ${category.accent}`}
              >
                {category.title}
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3 font-bold text-sm">
                    <span className="w-1.5 h-1.5 bg-foreground" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
