"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data/portfolio";

export function Hero() {
  return (
    <section className="hero-shell" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-status"><span /> {personalInfo.available ? "Available for thoughtful work" : "Currently heads-down"}</div>
        <p className="hero-overline">AYOMIDE EFUWAPE / SOFTWARE DEVELOPER</p>
        <h1>I craft the <i>digital<br />rooms</i> people live in.</h1>
        <div className="hero-bottom"><p>{personalInfo.bio}</p><div className="hero-actions"><Link href="#projects" className="hero-primary">Selected work <ArrowDownRight size={18} /></Link><Link href="#contact" className="hero-secondary">Let&apos;s talk <ArrowUpRight size={16} /></Link></div></div>
      </div>
      <aside className="hero-aside"><div className="hero-orb" /><p>BASED IN<br />NIGERIA</p><div className="hero-counter"><b>01</b><span>06 / selected<br />projects</span></div></aside>
      <div className="hero-foot"><div className="hero-socials"><Link href="https://github.com/mide2020-16" target="_blank" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.25 9.25 0 0 1 12 6.92c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.57 5.08.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" fill="currentColor" /></svg></Link><Link href="https://linkedin.com/in/efuwapeayomide" target="_blank" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.85 3A1.93 1.93 0 1 0 4.9 6.86 1.93 1.93 0 0 0 4.85 3ZM21 13.82c0-3.77-2.01-5.52-4.7-5.52-2.17 0-3.14 1.19-3.68 2.03V8.5H9.3V21h3.31v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.86 2.02 3.31V21h3.3l.74-7.18Z" fill="currentColor" /></svg></Link></div><div className="hero-scroll">SCROLL TO ENTER <span /></div><div className="hero-stats">{personalInfo.stats.map((stat) => <span key={stat.label}><b>{stat.value}</b>{stat.label}</span>)}</div></div>
    </section>
  );
}
