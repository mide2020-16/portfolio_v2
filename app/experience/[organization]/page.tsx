
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
} from "lucide-react";
import { notFound } from "next/navigation";

import { getExperienceGroup } from "@/data/experience.data";

interface Props {
  params: Promise<{ organization: string }>;
}

export function generateStaticParams() {
  return ["maekandex", "ictrec"].map((organization) => ({
    organization,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const group = getExperienceGroup((await params).organization);

  if (!group || group.kind !== "employment") {
    return { title: "Experience not found" };
  }

  return {
    title: `${group.organisation} | Experience`,
    description: group.summary,
    alternates: {
      canonical: `/experience/${group.id}`,
    },
  };
}

export default async function OrganizationExperiencePage({
  params,
}: Props) {
  const group = getExperienceGroup((await params).organization);

  if (!group || group.kind !== "employment") {
    notFound();
  }

  const responsibilities =
    group.highlights ??
    group.milestones?.flatMap((milestone) => milestone.highlights) ??
    [];

  return (
    <main className="relative mt-12 min-h-screen overflow-hidden bg-background text-foreground">
      {/* Subtle Background Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-0 h-80 w-80 rounded-full bg-secondary-accent/5 blur-3xl"
      />

      {/* Organisation Header */}
      <section className="relative border-b border-border bg-highlight/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-20">
          <Link
            href="/experience"
            className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-secondary-accent sm:text-xs"
          >
            <ChevronLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to experience
          </Link>

          <div className="mt-12 max-w-4xl sm:mt-16">

            <h1 className="max-w-4xl wrap-break-word font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {group.organisation}
              <span className="text-secondary-accent">.</span>
            </h1>

            <div className="mt-6 flex items-start gap-3">
              <span className="mt-1 h-8 w-1 shrink-0 bg-secondary-accent" />

              <p className="max-w-2xl text-base font-bold italic leading-relaxed text-foreground/75 sm:text-lg">
                {group.role}
              </p>
            </div>
          </div>

          {/* Bottom Header Details */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/70 pt-6">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                Experience
              </p>
              <p className="mt-1 text-xs font-bold text-foreground">
                Professional journey
              </p>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                Record
              </p>
              <p className="mt-1 text-xs font-bold text-foreground">
                {group.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organisation Details */}
      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* Section Introduction */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-accent">
              My Experiences
            </p>

            <h2 className="mt-3 max-w-sm font-heading text-3xl font-black leading-tight sm:text-4xl">
              Work, impact & contributions
              <span className="text-secondary-accent">.</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
              A closer look at the responsibilities, contributions, and
              professional experience I gained during my engagement in the organisation.
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="mt-1 font-heading text-xl font-black sm:text-2xl">
                  Responsibilities & contributions
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {responsibilities.map((highlight, index) => (
                <article
                  key={highlight}
                  className="group flex gap-4 border border-border bg-card/50 p-4 transition-all duration-300 hover:border-secondary-accent/50 hover:bg-highlight/30 sm:gap-5 sm:p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[10px] font-bold text-secondary-accent transition-colors duration-300 group-hover:border-secondary-accent group-hover:bg-secondary-accent group-hover:text-background">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-7 text-foreground/80 sm:text-[15px]">
                      {highlight}
                    </p>
                  </div>

                </article>
              ))}
            </div>

            {responsibilities.length === 0 && (
              <div className="border border-dashed border-border px-5 py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No responsibilities have been documented yet.
                </p>
              </div>
            )}

            <Link
              href="/experience"
              className="group mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-secondary-accent"
            >
              Explore other experiences
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
