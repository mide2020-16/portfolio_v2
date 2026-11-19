"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Columns2, Rows3, Search, X } from "lucide-react";
import Link from "next/link";
import type { ExperienceProject, ProjectTopic } from "@/components/experience/experience.types";
import { ProjectDeviceStage } from "@/components/experience/DeviceMockups";

type OwnerFilter = "all" | "personal-project" | "work-product";
type ViewMode = "vertical" | "horizontal";

const topicLabels: Record<ProjectTopic, string> = {
  "web-applications": "Web applications",
  "mobile-applications": "Mobile applications",
  "ai-machine-learning": "AI / machine learning",
  "backend-apis": "Backend / APIs",
  "developer-tools": "Other / tools",
};

function ProjectIntroduction({ project, index, isOpen }: { project: ExperienceProject; index: number; isOpen: boolean }) {
  return <div className="grid min-h-[min(78vh,760px)] gap-6 p-5 sm:p-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-10 lg:p-12">
    <div className="order-2 lg:order-1"><p className="text-[10px] font-black uppercase tracking-[.18em] text-secondary-accent">{project.category === "work-product" ? "Professional / team product" : "Personal project"} · {String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-heading text-3xl font-black leading-tight sm:text-5xl">{project.name}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{project.summary}</p><p className="mt-5 text-xs font-black uppercase tracking-[.13em] text-foreground/70">Contribution</p><p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{project.contribution}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="border border-border bg-highlight/20 px-2.5 py-1.5 text-[10px] font-bold">{tech}</span>)}</div><Link href={`/projects/${project.id}`} className="mt-7 inline-flex min-h-11 items-center gap-2 border-2 border-foreground bg-foreground px-4 py-3 text-xs font-black uppercase tracking-[.1em] text-background hover:bg-secondary-accent hover:text-foreground">Read project case study <ArrowUpRight size={15} /></Link></div>
    <div className="order-1 overflow-hidden border-2 border-border bg-highlight/20 lg:order-2"><ProjectDeviceStage platform={project.platform} desktopScreenshot={project.desktopScreenshot} mobileScreenshot={project.mobileScreenshot} title={project.name} isOpen={isOpen} /></div>
  </div>;
}

export function ProjectPresentation({ projects }: { projects: ExperienceProject[] }) {
  const [owner, setOwner] = useState<OwnerFilter>("all");
  const [topic, setTopic] = useState<ProjectTopic | "all">("all");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<ViewMode>("vertical");
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const availableTopics = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.topics ?? []))), [projects]);
  const filtered = useMemo(() => projects.filter((project) => {
    const haystack = [project.name, project.summary, project.contribution, ...project.technologies, ...project.highlights].join(" ").toLowerCase();
    return (owner === "all" || project.category === owner) && (topic === "all" || project.topics?.includes(topic)) && (!search.trim() || haystack.includes(search.trim().toLowerCase()));
  }), [owner, topic, search, projects]);

  const displayIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));
  useEffect(() => {
    if (mode !== "horizontal") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "ChevronRight") setActiveIndex((current) => Math.min(current + 1, filtered.length - 1));
      if (event.key === "ChevronLeft") setActiveIndex((current) => Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, mode]);

  const reset = () => { setOwner("all"); setTopic("all"); setSearch(""); };
  const ownerFilters: { label: string; value: OwnerFilter }[] = [{ label: "All projects", value: "all" }, { label: "Personal projects", value: "personal-project" }, { label: "Professional / team", value: "work-product" }];
  const filterButton = (active: boolean) => `min-h-10 border-2 px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"}`;

  return <div>
    <div className="mb-8 space-y-4"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-secondary-accent">Browse the archive</p><h2 className="mt-2 font-heading text-2xl font-black sm:text-3xl">Choose a presentation mode.</h2></div><div className="inline-flex w-fit border-2 border-border bg-card p-1" role="group" aria-label="Project presentation mode"><button type="button" aria-pressed={mode === "vertical"} onClick={() => setMode("vertical")} className={`inline-flex min-h-10 items-center gap-2 px-3 text-[10px] font-black uppercase tracking-wider ${mode === "vertical" ? "bg-foreground text-background" : "text-muted-foreground"}`}><Rows3 size={15} />Vertical</button><button type="button" aria-pressed={mode === "horizontal"} onClick={() => setMode("horizontal")} className={`inline-flex min-h-10 items-center gap-2 px-3 text-[10px] font-black uppercase tracking-wider ${mode === "horizontal" ? "bg-foreground text-background" : "text-muted-foreground"}`}><Columns2 size={15} />Horizontal</button></div></div>
      <div className="relative max-w-xl"><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects, technologies, or skills..." aria-label="Search projects" className="min-h-12 w-full border-2 border-border bg-card py-3 pl-11 pr-10 text-sm outline-none focus:border-secondary-accent" />{search && <button type="button" onClick={() => setSearch("")} aria-label="Clear project search" className="absolute right-3 top-1/2 -translate-y-1/2"><X size={16} /></button>}</div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by ownership">{ownerFilters.map((item) => <button key={item.value} type="button" aria-pressed={owner === item.value} onClick={() => setOwner(item.value)} className={filterButton(owner === item.value)}>{item.label}</button>)}</div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type"><button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")} className={filterButton(topic === "all")}>All types</button>{availableTopics.map((item) => <button key={item} type="button" aria-pressed={topic === item} onClick={() => setTopic(item)} className={filterButton(topic === item)}>{topicLabels[item]}</button>)}</div>
      <p className="text-xs font-semibold text-muted-foreground" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}</p></div>
    {filtered.length === 0 ? <div className="border-2 border-dashed border-border p-8"><p className="font-heading text-xl font-black">No matching projects</p><button onClick={reset} className="mt-4 border-2 border-foreground bg-foreground px-4 py-2 text-xs font-black uppercase tracking-wider text-background">Reset filters</button></div> : mode === "vertical" ? <div className="space-y-6">{filtered.map((project, index) => <motion.article key={project.id} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} onViewportEnter={() => setActiveIndex(index)} viewport={{ amount: .45 }} transition={{ duration: reduceMotion ? 0 : .4 }} className={`overflow-hidden border-2 transition-colors ${displayIndex === index ? "border-secondary-accent bg-card" : "border-border bg-card"}`}><ProjectIntroduction project={project} index={index} isOpen={displayIndex === index || reduceMotion} /></motion.article>)}</div> : <section className="overflow-hidden border-2 border-border bg-card" aria-label="Horizontal project presentation"><AnimatePresence mode="wait">{filtered[displayIndex] && <motion.div key={filtered[displayIndex].id} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: reduceMotion ? 0 : .28 }}><ProjectIntroduction project={filtered[displayIndex]} index={displayIndex} isOpen /></motion.div>}</AnimatePresence><div className="flex items-center justify-between gap-4 border-t-2 border-border p-4 sm:px-8"><button type="button" onClick={() => setActiveIndex((current) => Math.max(0, Math.min(current, displayIndex) - 1))} disabled={displayIndex === 0} className="inline-flex min-h-11 items-center gap-2 border-2 border-border px-3 text-xs font-black uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={15} />Previous</button><p className="text-xs font-black uppercase tracking-wider text-muted-foreground">{String(displayIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</p><button type="button" onClick={() => setActiveIndex((current) => Math.min(filtered.length - 1, Math.min(current, displayIndex) + 1))} disabled={displayIndex === filtered.length - 1} className="inline-flex min-h-11 items-center gap-2 border-2 border-foreground bg-foreground px-3 text-xs font-black uppercase tracking-wider text-background disabled:cursor-not-allowed disabled:opacity-40">Next<ChevronRight size={15} /></button></div></section>}
  </div>;
}
