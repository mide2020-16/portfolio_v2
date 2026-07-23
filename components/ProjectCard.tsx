"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code, Images } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/data/portfolio";
import { TechTag } from "./ui/TechTag";
import { ProjectGallery } from "./ui/ProjectGallery";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const accentColors = [
  { bg: "bg-primary-accent", text: "text-white", shadow: "hover:shadow-[6px_6px_0px_0px_var(--primary-accent)]" },
  { bg: "bg-secondary-accent", text: "text-white", shadow: "hover:shadow-[6px_6px_0px_0px_var(--secondary-accent)]" },
  { bg: "bg-highlight", text: "text-foreground", shadow: "hover:shadow-[6px_6px_0px_0px_var(--highlight)]" },
  { bg: "bg-foreground", text: "text-background", shadow: "hover:shadow-[6px_6px_0px_0px_var(--foreground)]" },
];

export function ProjectCard({ project, index }: ProjectCardProps) {
  const accent = accentColors[index % accentColors.length];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const hasImages = project.images && project.images.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className={`group relative flex flex-col justify-between h-full bg-card border-2 border-border p-6 sm:p-8 transition-shadow duration-200 ${accent.shadow}`}
      >
        {/* Index badge */}
        <div className={`absolute top-6 right-6 w-10 h-10 ${accent.bg} ${accent.text} flex items-center justify-center font-black font-heading text-sm border-2 border-border`}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div>
          <h3 className="font-heading font-black text-2xl mb-4 pr-12 leading-tight">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
            {project.description}
          </p>
        </div>

        <div className="space-y-5 mt-auto">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-border">
            {project.stack.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Gallery button — only if images exist */}
            {hasImages && (
              <button
                onClick={() => setGalleryOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-border text-xs font-black uppercase tracking-widest hover:bg-primary-accent hover:text-white hover:border-primary-accent transition-all active:scale-95"
                aria-label={`View ${project.title} screenshots`}
              >
                <Images className="w-3.5 h-3.5" />
                Gallery
              </button>
            )}

            {project.sourceUrl && project.sourceUrl !== "#" ? (
              <Link
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-border text-xs font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all active:scale-95"
              >
                <Code className="w-3.5 h-3.5" />
                Source
              </Link>
            ) : project.sourceUrl === "#" ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-border text-xs font-black uppercase tracking-widest text-muted-foreground cursor-not-allowed opacity-60">
                <Code className="w-3.5 h-3.5" />
                Source
              </span>
            ) : null}

            {project.demoUrl && project.demoUrl !== "#" ? (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-secondary-accent text-xs font-black uppercase tracking-widest text-secondary-accent hover:bg-secondary-accent hover:text-white transition-all active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </Link>
            ) : project.demoUrl === "#" ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-border text-xs font-black uppercase tracking-widest text-muted-foreground cursor-not-allowed opacity-60">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </span>
            ) : null}
          </div>
        </div>
      </motion.div>

      {/* Gallery modal */}
      {hasImages && (
        <ProjectGallery
          images={project.images}
          projectTitle={project.title}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}
