"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data/portfolio";
import { ProjectScreen } from "./ProjectsSection";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="case-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="presentation"
        >
          <motion.dialog
            open
            aria-modal="true"
            aria-labelledby={`project-${project.slug}`}
            className="case-modal"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <span>Case study / {project.year}</span>
              <button
                onClick={onClose}
                aria-label={`Close ${project.title} case study`}
              >
                <X />
              </button>
            </header>
            <div className="case-modal-body">
              <div className={`modal-visual project-stage--${project.visual}`}>
                <div className="modal-screen">
                  <ProjectScreen project={project} />
                </div>
              </div>
              <div className="case-copy">
                <p className="eyebrow">{project.role}</p>
                <h2 id={`project-${project.slug}`}>{project.title}</h2>
                <p>{project.caseStudy}</p>
                <div className="case-frames">
                  {project.gallery.map((frame, index) => (
                    <div
                      className="case-frame"
                      role="img"
                      aria-label={`${project.title}: ${frame} interface image`}
                      key={frame}
                    >
                      <div className="case-thumbnail">
                        <i />
                        <i />
                        <i />
                      </div>
                      <span>0{index + 1}</span>
                      <b>{frame}</b>
                    </div>
                  ))}
                </div>
                {project.demoUrl && project.demoUrl !== "#" && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="case-visit"
                  >
                    Visit live product <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
