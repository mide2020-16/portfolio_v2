"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Briefcase, Code, Mail } from "lucide-react";

export function Navbar() {
  return (
    <>
      {/* Desktop Navbar — sharp, thick border, bold branding */}
      <header className="hidden md:flex fixed top-0 inset-x-0 z-50 border-b-2 border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-8 max-w-6xl flex items-center justify-between py-4">
          <Link href="/" className="font-heading font-black text-2xl tracking-tight">
            Ayomide<span className="text-primary-accent">.</span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <Link href="#experience" className="transition-colors hover:text-primary-accent text-foreground/70 hover:text-foreground">Experience</Link>
            <Link href="#projects" className="transition-colors hover:text-primary-accent text-foreground/70 hover:text-foreground">Projects</Link>
            <Link href="#skills" className="transition-colors hover:text-primary-accent text-foreground/70 hover:text-foreground">Skills</Link>
            <Link href="#contact" className="transition-colors hover:text-primary-accent text-foreground/70 hover:text-foreground">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="#contact"
              className="inline-flex items-center px-5 py-2 bg-foreground text-background font-bold text-sm uppercase tracking-wider hover:bg-primary-accent hover:text-white transition-colors border-2 border-foreground"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 border-b-2 border-border bg-background/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-heading font-black text-xl tracking-tight">
          Ayo<span className="text-primary-accent">.</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background border-t-2 border-border pb-safe">
        <nav className="flex items-center justify-around px-2 py-3">
          <Link href="#" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary-accent transition-colors">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
          </Link>
          <Link href="#experience" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary-accent transition-colors">
            <Briefcase className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Exp</span>
          </Link>
          <Link href="#projects" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary-accent transition-colors">
            <Code className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Work</span>
          </Link>
          <Link href="#contact" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary-accent transition-colors">
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Contact</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
