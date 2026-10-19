import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
} from "lucide-react";
import { allProjects } from "@/components/experience/experience.data";
import { ProjectDeviceStage } from "@/components/experience/DeviceMockups";
import { ProjectShowcaseCard } from "@/components/projects/ProjectShowcaseCard";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((item) => item.id === slug);

  if (!project) {
    return { title: "Project not found | Ayomide" };
  }

  return {
    title: `${project.name} | Projects | Ayomide`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.id === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = allProjects
    .filter(
      (item) =>
        item.id !== project.id &&
        item.category === project.category,
    )
    .slice(0, 3);

  const platformLabel = {
    web: "Web application",
    desktop: "Desktop application",
    mobile: "Mobile application",
  }[project.platform];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b-2 border-border bg-highlight/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-accent sm:text-xs">
                {project.category === "work-product"
                  ? "Professional product"
                  : "Independent project"}
              </p>

              <h1 className="mt-3 font-heading text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
                {project.name}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {project.summary}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 border-2 border-border bg-background px-3 py-2 text-xs font-bold text-foreground">
              <Layers3 size={15} aria-hidden="true" />
              {platformLabel}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="overflow-hidden border-2 border-border bg-highlight/20">
          <ProjectDeviceStage
            platform={project.platform}
            desktopScreenshot={project.desktopScreenshot}
            mobileScreenshot={project.mobileScreenshot}
            title={project.name}
          />
        </div>

        {project.recognition && (
          <div className="mt-5 flex items-start gap-3 border-l-4 border-secondary-accent bg-highlight/50 p-4 sm:p-5">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-secondary-accent"
              aria-hidden="true"
            />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                Recognition
              </p>
              <p className="mt-1 text-sm font-bold leading-6 text-foreground">
                {project.recognition}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <article className="border-2 border-border bg-card p-5 sm:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary-accent">
              The project
            </p>
            <h2 className="mt-3 font-heading text-2xl font-black sm:text-3xl">
              Overview & contribution
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {project.summary}
            </p>

            <h3 className="mt-7 font-heading text-lg font-black">
              My contribution
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {project.contribution}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 border-2 border-foreground bg-foreground px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-background transition-colors hover:bg-transparent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2"
              >
                Visit live project
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
          </article>

          <aside className="border-2 border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center border-2 border-border bg-highlight">
                <Code2 size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                  Technology
                </p>
                <h2 className="font-heading text-xl font-black">
                  Tools & stack
                </h2>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-border bg-highlight/40 px-3 py-2 text-xs font-bold text-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="my-6 border-t border-border" />

            <h3 className="font-heading text-lg font-black">
              Key contributions
            </h3>

            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight, index) => (
                <li
                  key={`${project.id}-highlight-${index}`}
                  className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-1 shrink-0 text-secondary-accent"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="border-t-2 border-border bg-highlight/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary-accent">
                  Keep exploring
                </p>
                <h2 className="mt-2 font-heading text-2xl font-black sm:text-3xl">
                  More projects
                </h2>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-foreground hover:text-secondary-accent"
              >
                All projects
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((related, index) => (
                <ProjectShowcaseCard
                  key={related.id}
                  project={related}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}