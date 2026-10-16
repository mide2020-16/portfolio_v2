"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/data/portfolio";
import { ProjectModal } from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

function ProjectMotion({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (
      !scene ||
      !card ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const context = gsap.context(() => {
      gsap.fromTo(
        card,
        { yPercent: 12, rotate: index % 2 ? -2.5 : 2.5, opacity: 0.45 },
        {
          yPercent: -10,
          rotate: index % 2 ? 1.5 : -1.5,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.to(scene.querySelector(".project-orb"), {
        scale: 1.25,
        xPercent: index % 2 ? -16 : 16,
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, scene);
    return () => context.revert();
  }, [index]);

  return (
    <article
      ref={sceneRef}
      className="project-scene"
      aria-label={project.title}
    >
      <div className={`project-copy ${index % 2 ? "project-copy--right" : ""}`}>
        <p className="eyebrow">
          0{index + 1} / {project.year}
        </p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.description}</p>
        <ul className="project-points">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="project-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-actions">
          <button
            className="project-view-button"
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
          >
            <Plus size={16} aria-hidden="true" /> Explore case study
          </button>
          {project.demoUrl && project.demoUrl !== "#" && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              Live product <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
      <div className={`project-stage project-stage--${project.visual}`}>
        <span className="project-orb" aria-hidden="true" />
        <div className="stage-label">
          <Play size={12} fill="currentColor" /> scroll to preview
        </div>
        <div className="project-device" ref={cardRef}>
          <div className="device-chrome">
            <span />
            <span />
            <span />
            <b>{project.slug}.app</b>
          </div>
          <ProjectScreen project={project} />
        </div>
        <p className="stage-caption">
          LIVE INTERFACE / {project.role.toUpperCase()}
        </p>
      </div>
      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </article>
  );
}

export function ProjectScreen({ project }: { project: Project }) {
  const tag =
    project.visual === "voice"
      ? "HAUSA / AI"
      : project.visual === "weather"
        ? "24°C / ABEOKUTA"
        : project.visual === "hostel"
          ? "12 ROOMS"
          : project.visual === "jobs"
            ? "1,240 OPENINGS"
            : project.visual === "schedule"
              ? "NO CONFLICTS"
              : "EVENTS / 12";
  const headline =
    project.visual === "voice"
      ? "Your language,\nunderstood."
      : project.visual === "weather"
        ? "Forecast,\nreframed."
        : project.visual === "hostel"
          ? "Find your\nnext room."
          : project.visual === "jobs"
            ? "Work that\nfits."
            : project.visual === "schedule"
              ? "Timetables,\nsolved."
              : "The moment,\norganised.";
  return (
    <div className="screen-ui">
      <div className="screen-top">
        <span>{tag}</span>
        <i />
      </div>
      <div className="screen-head">
        <strong>{project.title}</strong>
        <em>{project.visual === "voice" ? "Listen" : "Explore"}</em>
      </div>
      <div className="screen-hero">
        <span className="screen-kicker">{project.role}</span>
        <b>{headline}</b>
        <div className="screen-shape" />
      </div>
      <div className="screen-grid">
        <span />
        <span />
        <span />
      </div>
      <div className="screen-bar">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="work-section">
      <div className="work-intro">
        <p className="eyebrow">Selected work / 2024 - now</p>
        <h2>
          Interfaces with a <i>point of view.</i>
        </h2>
        <p>
          I build focused digital products where performance, clarity and
          real-world needs meet. Scroll through a living collection of recent
          work.
        </p>
      </div>
      <div className="project-rail">
        {projects.map((project, index) => (
          <ProjectMotion project={project} index={index} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
