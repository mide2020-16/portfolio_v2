import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { getExperienceGroup } from "@/components/experience/experience.data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ organization: string }>;
}

export function generateStaticParams() {
  return ["maekandex", "ictrec"].map((organization) => ({ organization }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = getExperienceGroup((await params).organization);
  if (!group || group.kind !== "employment") return { title: "Experience not found" };
  return { title: `${group.organisation} | Experience`, description: group.summary, alternates: { canonical: `/experience/${group.id}` } };
}

export default async function OrganizationExperiencePage({ params }: Props) {
  const group = getExperienceGroup((await params).organization);
  if (!group || group.kind !== "employment") notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b-2 border-border bg-highlight/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
          <Link href="/experience" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-muted-foreground hover:text-foreground"><ChevronLeft size={15} />
            All experience</Link>
          <p className="mt-8 text-[10px] font-black uppercase tracking-[.2em] text-secondary-accent">Organisation record / {group.dateRange}</p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-black leading-tight sm:text-6xl">{group.organisation}</h1>
          <p className="mt-4 max-w-3xl text-base font-bold text-foreground/75">{group.role}</p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{group.summary}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.1fr_.9fr]">
        <section aria-labelledby="responsibilities"><div className="flex items-center gap-3"><BriefcaseBusiness className="text-secondary-accent" /><h2 id="responsibilities" className="font-heading text-2xl font-black">Responsibilities & contributions</h2></div>
          <ul className="mt-5 space-y-3">{(group.highlights ?? group.milestones?.flatMap((milestone) => milestone.highlights) ?? []).map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-7 text-muted-foreground"><CheckCircle2 size={17} className="mt-1 shrink-0 text-secondary-accent" />{highlight}</li>)}</ul>
        </section>
        <aside className="border-2 border-border bg-card p-5 sm:p-6"><p className="text-[10px] font-black uppercase tracking-[.18em] text-secondary-accent">Case files</p><h2 className="mt-2 font-heading text-2xl font-black">Documented work</h2>
          <div className="mt-5 space-y-3">{group.achievements?.map((achievement) => <Link key={achievement.id} href={`/experience/${group.id}/achievements/${achievement.id}`} className="group block border border-border p-4 transition-colors hover:bg-highlight/20"><p className="font-mono text-[10px] font-bold text-secondary-accent">{achievement.caseReference}</p><h3 className="mt-1 font-heading font-black">{achievement.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{achievement.summary}</p><span className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider group-hover:text-secondary-accent">Open case file <ArrowUpRight size={13} /></span></Link>)}</div>
        </aside>
      </div>
    </main>
  );
}
