
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials.data";

const accentClasses = {
  lime: {
    profile: "bg-primary-accent text-[var(--on-accent)]",
    edge: "border-primary-accent",
    shadow: "shadow-[6px_6px_0_var(--primary-accent)]",
    quote: "text-primary-accent",
  },
  coral: {
    profile: "bg-secondary-accent text-white",
    edge: "border-secondary-accent",
    shadow: "shadow-[6px_6px_0_var(--secondary-accent)]",
    quote: "text-secondary-accent",
  },
  ink: {
    profile: "bg-foreground text-background",
    edge: "border-foreground",
    shadow: "shadow-[6px_6px_0_var(--foreground)]",
    quote: "text-foreground",
  },
} as const;

export function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const accent = accentClasses[testimonial.accent];

  return (
    <motion.figure
      initial={
        reduceMotion
          ? false
          : {
            opacity: 0,
            x: index % 2 === 0 ? -16 : 16,
            y: 12,
          }
      }
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group relative flex min-h-76 w-full flex-col border-2 border-border bg-card p-5 shadow-[6px_6px_0_var(--foreground)] transition-colors duration-300 hover:bg-background sm:p-6"
    >
      <blockquote className="font-heading text-sm font-bold leading-8 tracking-tight text-foreground sm:text-lg sm:leading-9">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3 pt-5">
        <span
          className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-2 ${accent.edge} ${accent.profile}`}
        >
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-black tracking-wider">
              {testimonial.initials}
            </span>
          )}
        </span>

        <span className="min-w-0">
          <span className="block text-sm font-black text-foreground">
            {testimonial.name}
          </span>

          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
