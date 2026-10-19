import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allProjects } from "@/components/experience/experience.data";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";

export const metadata: Metadata = {
  title: "Projects | Ayomide",
  description:
    "Explore web applications, mobile products, AI experiments, and software systems built by Ayomide.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b-2 border-border bg-highlight/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to home
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-accent sm:text-xs">
              Project archive / Selected work
            </p>

            <h1 className="mt-3 font-heading text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Ideas turned into{" "}
              <span className="text-secondary-accent">working products.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              Explore my product work, independent builds, and technical
              experiments. Open a case study to learn about the problem,
              implementation, technologies, and contributions behind each
              project.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-muted-foreground">
              <span>{allProjects.length} projects in the collection</span>
              <Link
                href="/experience"
                className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-secondary-accent"
              >
                Explore my experience
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14 lg:py-16">
        <ProjectsDirectory projects={allProjects} />
      </section>
    </main>
  );
}