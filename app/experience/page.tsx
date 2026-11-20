import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { ExperienceSection } from "@/components/experience/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Explore Ayomide's software development experience, role progression, product contributions, and technical responsibilities.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground mt-12">
      <section className="bg-highlight/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-14 lg:py-18">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft size={15} aria-hidden="true" />
            home
          </Link>

          <div className="mt-4 max-w-3xl">
            <h1 className="font-heading text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Experience shaped by{" "}
              <span className="text-secondary-accent italic">building products.</span>
            </h1>

            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-foreground transition-colors hover:text-secondary-accent"
            >
              Explore projects
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ExperienceSection view="all" showWorkLink={false} />
    </main>
  );
}