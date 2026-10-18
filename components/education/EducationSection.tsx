"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { education } from "./education.data";
import { EducationCard } from "./EducationCard";
import { SectionLabel } from "../ui/SectionLabel";

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="education"
      aria-label="Education"
      className="relative overflow-hidden border-y-2 border-border bg-highlight/80 py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-foreground/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-foreground/10"
      />

      <div className="relative mx-auto max-w-6xl space-y-5 px-4 sm:px-8">
        <div className="mb-7">
          <SectionLabel title="Education" />
        </div>

        {education.map((item, index) => (
          <EducationCard
            key={`${item.institution}-${item.degree}-${index}`}
            item={item}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </section>
  );
}
