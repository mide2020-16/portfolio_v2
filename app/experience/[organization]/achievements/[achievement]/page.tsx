import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, FileText, FolderKanban } from "lucide-react";
import { allProjects, getExperienceGroup } from "@/components/experience/experience.data";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ organization: string; achievement: string }> }

async function getCase(params: Props["params"]) {
  const { organization, achievement } = await params;
  const group = getExperienceGroup(organization);
  return { group, achievement: group?.achievements?.find((item) => item.id === achievement) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const record = await getCase(params);
  if (!record.group || !record.achievement) return { title: "Case file not found" };
  return { title: `${record.achievement.title} | ${record.group.organisation}`, description: record.achievement.summary, alternates: { canonical: `/experience/${record.group.id}/achievements/${record.achievement.id}` } };
}

export default async function AchievementCasePage({ params }: Props) {
  const { group, achievement } = await getCase(params);
  if (!group || !achievement) notFound();
  const projects = allProjects.filter((project) => achievement.associatedProjectIds?.includes(project.id));
  return <main className="min-h-screen bg-background text-foreground"><section className="border-b-2 border-border bg-highlight/40"><div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-16"><Link href={`/experience/${group.id}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-muted-foreground hover:text-foreground"><ChevronLeft size={15} />{group.organisation}</Link><p className="mt-8 font-mono text-xs font-bold tracking-widest text-secondary-accent">CASE FILE / {achievement.caseReference}</p><h1 className="mt-3 font-heading text-4xl font-black sm:text-6xl">{achievement.title}</h1><p className="mt-4 text-sm font-bold text-foreground/75">{achievement.dateRange}</p><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{achievement.summary}</p></div></section><div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-2"><section className="border-2 border-border bg-card p-5 sm:p-7"><FileText className="text-secondary-accent" /><h2 className="mt-4 font-heading text-2xl font-black">Context & contribution</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{achievement.context}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{achievement.contribution}</p></section><section className="border-2 border-border bg-card p-5 sm:p-7"><h2 className="font-heading text-2xl font-black">Evidence record</h2><ul className="mt-4 space-y-3">{achievement.evidence.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground"><CheckCircle2 size={17} className="mt-1 shrink-0 text-secondary-accent" />{item}</li>)}</ul></section>{projects.length > 0 && <section className="border-2 border-border bg-card p-5 sm:p-7 lg:col-span-2"><div className="flex items-center gap-3"><FolderKanban className="text-secondary-accent" /><h2 className="font-heading text-2xl font-black">Associated projects</h2></div><div className="mt-5 flex flex-wrap gap-3">{projects.map((project) => <Link className="border-2 border-border px-4 py-3 text-sm font-bold hover:bg-highlight/20" href={`/projects/${project.id}`} key={project.id}>{project.name}</Link>)}</div></section>}</div></main>;
}
