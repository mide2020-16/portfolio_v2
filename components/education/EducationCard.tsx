"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EducationHeader } from "./EducationHeader";
import { EducationNotebook } from "./EducationNotebook";
import type { EducationCardSharedProps } from "./education.types";

interface EducationCardProps extends EducationCardSharedProps {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function EducationCard({
  item,
  index,
  shouldReduceMotion,
  isExpanded,
  onToggle,
}: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const detailsId = `education-details-${index}`;

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 18 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden border-2 border-border transition-colors duration-300 ${
        isHovered || isExpanded
          ? "bg-background"
          : "bg-background/70"
      }`}
    >
      <EducationHeader
        item={item}
        index={index}
        shouldReduceMotion={shouldReduceMotion}
        isHovered={isHovered}
        isExpanded={isExpanded}
        detailsId={detailsId}
        onToggle={onToggle}
      />

      <EducationNotebook
        item={item}
        shouldReduceMotion={shouldReduceMotion}
        isExpanded={isExpanded}
        detailsId={detailsId}
      />

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-1 bg-secondary-accent transition-all duration-500 ${
          isExpanded || isHovered ? "w-full" : "w-0"
        }`}
      />
    </motion.article>
  );
}