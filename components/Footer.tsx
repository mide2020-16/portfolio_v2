"use client";

import Link from "next/link";

const getYear = () => {
  return new Date().getFullYear();
};
export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-foreground text-background py-10">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-heading font-black text-2xl mb-1">
              Ayomide<span className="text-primary-accent">.</span>
            </div>
            <p className="text-background/60 text-sm font-medium">Software Engineer | Mathematics B. Sc</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-black uppercase tracking-widest text-background/70">
            <Link href="#experience" className="hover:text-background transition-colors">Experience</Link>
            <Link href="#projects" className="hover:text-background transition-colors">Projects</Link>
            <Link href="#contact" className="hover:text-background transition-colors">Contact</Link>
          </div>
          <p className="text-background/40 text-xs font-bold">
            © {getYear()} Efuwape Ayomide
          </p>
        </div>
      </div>
    </footer>
  );
}
