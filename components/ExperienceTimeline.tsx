"use client";

import { SectionLabel } from "./ui/SectionLabel";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data/portfolio";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <SectionLabel title="Experience" />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: index * 0.12 }}
              whileHover={{ x: 4 }}
              className="bg-card border-2 border-border p-8 flex flex-col md:flex-row md:items-start gap-6 transition-all"
            >
              {/* Accent bar */}
              <div className={`w-1.5 self-stretch min-h-full hidden md:block ${exp.accent} flex-shrink-0`} />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    {exp.date}
                  </span>
                  <span
                    className={`px-2 py-0.5 border-2 border-border text-xs font-black uppercase tracking-widest ${exp.accent} ${
                      exp.accent === "bg-highlight" ? "text-foreground" : "text-white"
                    }`}
                  >
                    {exp.type}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-black mb-1">{exp.role}</h3>
                <p className="font-bold text-muted-foreground mb-4">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
