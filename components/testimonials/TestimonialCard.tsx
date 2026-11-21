"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials.data";

const accentClasses = {
  lime: "bg-primary-accent text-[var(--on-accent)]",
  coral: "bg-secondary-accent text-white",
  ink: "bg-foreground text-background",
} as const;

export function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group relative flex min-h-76 flex-col border-2 border-border bg-card p-5 transition-colors duration-300 hover:bg-background sm:p-6"
    >

      <blockquote className="flex-1 font-heading text-lg font-bold leading-8 tracking-tight text-foreground sm:text-xl">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden="true"
          className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-black tracking-[0.08em] ${accentClasses[testimonial.accent]}`}
        >
          {testimonial.initials}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-black text-foreground">
            {testimonial.name}
          </span>
          <span className="mt-0.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
