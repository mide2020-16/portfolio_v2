"use client";

import { SectionLabel } from "./ui/SectionLabel";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data/portfolio";

export function EducationSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <SectionLabel number="04" title="Education" />

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="bg-card border-2 border-border p-8 flex flex-col md:flex-row items-start gap-8 transition-all"
            >
              {/* Icon block */}
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-primary-accent border-2 border-border text-white">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                  {edu.dateRange}
                </div>
                <h3 className="font-heading font-black text-3xl mb-1">{edu.degree}</h3>
                <p className="font-bold text-lg text-muted-foreground mb-3">{edu.institution}</p>
                <span
                  className={`inline-block px-4 py-1.5 border-2 font-black text-xs uppercase tracking-widest ${edu.classificationAccent}`}
                >
                  {edu.classification}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
