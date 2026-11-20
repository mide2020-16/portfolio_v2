import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Award, ExternalLink } from "lucide-react";
import { achievements } from "@/data/portfolio";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() { return achievements.map((achievement) => ({ slug: achievement.id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const achievement = achievements.find((item) => item.id === slug);
  if (!achievement) return { title: "Achievement not found" };
  return { title: `${achievement.title} | Achievement`, description: achievement.summary, alternates: { canonical: `/achievements/${achievement.id}` } };
}

export default async function AchievementPage({ params }: Props) {
  const { slug } = await params;
  const achievement = achievements.find((item) => item.id === slug);
  if (!achievement) notFound();

  return <main className="min-h-screen bg-background text-foreground"><section className="border-b-2 border-border bg-highlight/40"><div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-16"><Link href="/#achievements" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-muted-foreground hover:text-foreground"><ChevronLeft size={15} />Home achievements</Link><p className="mt-8 text-[10px] font-black uppercase tracking-[.2em] text-secondary-accent">Achievement record</p><h1 className="mt-3 font-heading text-4xl font-black sm:text-6xl">{achievement.title}</h1><p className="mt-4 text-base font-bold text-foreground/75">{achievement.subtitle}</p></div></section><div className="mx-auto grid max-w-5xl gap-7 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-[.9fr_1.1fr]"><section className="border-2 border-border bg-card p-5 sm:p-7"><Award className="text-secondary-accent" /><h2 className="mt-4 font-heading text-2xl font-black">Documented record</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{achievement.summary}</p>{achievement.id === "codefest-nigeria-2025" && <Link href="/projects/gani-ai" className="mt-6 inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-4 py-3 text-xs font-black uppercase tracking-wider text-background hover:bg-secondary-accent hover:text-foreground">View GANI case study <ExternalLink size={14} /></Link>}</section>{achievement.certificateImage ? <section className="overflow-hidden border-2 border-border bg-[#e9e7e1] p-2 sm:p-5"><p className="mb-3 text-[10px] font-black uppercase tracking-[.16em] text-slate-700">Certificate image</p><Image src={achievement.certificateImage} alt={`${achievement.title} certificate`} width={1200} height={900} sizes="(max-width: 1024px) 100vw, 700px" className="h-auto w-full object-contain" quality={100} /></section> : <section className="border-2 border-dashed border-border p-5 sm:p-7"><p className="font-heading text-xl font-black">Certificate asset unavailable</p><p className="mt-3 text-sm leading-7 text-muted-foreground">This achievement is documented in the portfolio, but no certificate image has been provided in the repository.</p></section>}</div>

  </main>;
}
