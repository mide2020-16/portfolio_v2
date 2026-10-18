"use client";

import { GraduationIcon } from "./GraduationIcon";
import { CertificateLink } from "./CertificateLink";
import { EducationChevron } from "./EducationSvg";
import type { EducationCardSharedProps } from "./education.types";

interface EducationHeaderProps extends EducationCardSharedProps {
  index: number;
  isHovered: boolean;
  isExpanded: boolean;
  detailsId: string;
  onToggle: () => void;
}

export function EducationHeader({
  item,
  index,
  shouldReduceMotion,
  isHovered,
  isExpanded,
  detailsId,
  onToggle,
}: EducationHeaderProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:gap-6">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-accent sm:gap-5"
      >
        <GraduationIcon
          index={index}
          isHovered={isHovered}
          isExpanded={isExpanded}
          shouldReduceMotion={shouldReduceMotion}
        />

        <span className="block min-w-0 flex-1">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
            {item.dateRange}
          </span>

          <span className="block font-heading text-lg font-black leading-tight text-foreground transition-colors sm:text-xl md:text-2xl">
            {item.degree}
          </span>

          <span className="mt-1 block text-sm font-bold leading-relaxed text-foreground/65 sm:text-base">
            {item.institution}
          </span>

          {item.classification && (
            <span
              className={`mt-3 inline-flex max-w-full border-2 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] sm:text-[10px] ${item.classificationAccent}`}
            >
              {item.classification}
            </span>
          )}
        </span>

        <span className="ml-auto shrink-0">
          <EducationChevron
            expanded={isExpanded}
            reduceMotion={shouldReduceMotion}
          />
        </span>
      </button>

      <CertificateLink
        degree={item.degree}
        certificateUrl={item.certificateUrl}
      />
    </div>
  );
}