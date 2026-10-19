import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { ExperienceSection } from "@/components/experience/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience | Ayomide",
  description:
    "Explore Ayomide's software development experience, role progression, product contributions, and technical responsibilities.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b-2 border-border bg-highlight/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to home
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 border-2 border-border bg-background px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-foreground sm:text-xs">
              <BriefcaseBusiness size={15} aria-hidden="true" />
              Professional journey
            </span>

            <h1 className="mt-5 font-heading text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Experience shaped by{" "}
              <span className="text-secondary-accent">building products.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              A closer look at my development experience, role progression,
              responsibilities, and contributions to real software products
              and university systems.
            </p>

            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-foreground transition-colors hover:text-secondary-accent"
            >
              Explore project case studies
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ExperienceSection view="all" showWorkLink={false} />
    </main>
  );
}