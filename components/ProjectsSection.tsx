"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./ui/SectionLabel";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <SectionLabel number="02" title="Selected Projects" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" as const, stiffness: 100 }}
          className="mt-10 text-center"
        >
          <Link
            href="https://github.com/mide2020-16"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border font-black uppercase text-sm tracking-widest hover:bg-foreground hover:text-background transition-colors active:scale-95"
          >
            View All on GitHub →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
