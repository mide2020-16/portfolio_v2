"use client";

import { motion } from "framer-motion";
import { CodePanel } from "./ui/CodePanel";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-28 md:pb-0 overflow-hidden bg-background">
      {/* Background accent shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-highlight/10 -skew-x-6 origin-top-right pointer-events-none hidden md:block" />
      <div className="absolute bottom-12 left-0 w-32 h-32 bg-secondary-accent/20 rounded-none pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 sm:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-border bg-highlight text-foreground font-bold text-xs uppercase tracking-widest rounded-2xl hover:border-primary-accent transition-colors">
                <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                {personalInfo.available ? "Available for work" : "Not currently available"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-[0.95]">
                {personalInfo.name}
                <br />
                <span className="text-primary-accent text-lg md:text-2xl lg:text-4xl">
                  {personalInfo.title}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-md leading-relaxed border-l-4 border-border pl-4"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-primary-accent text-white font-black uppercase text-sm tracking-widest border-2 border-primary-accent hover:bg-background hover:text-primary-accent transition-all active:scale-95"
              >
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-background text-foreground font-black uppercase text-sm tracking-widest border-2 border-border hover:bg-foreground hover:text-background transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Say Hi
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-4 border-t-2 border-border w-full"
            >
              {personalInfo.stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className={`text-4xl font-black font-heading ${
                      stat.accent ? "text-secondary-accent" : ""
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: IDE Code Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 18, delay: 0.5 }}
            className="hidden lg:flex justify-end"
          >
            <CodePanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
