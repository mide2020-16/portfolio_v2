import Image from "next/image";
import { CSSProperties, useState } from "react";
import { motion } from "framer-motion";
import { skillIcons } from "./skills.data";

type SkillItemProps = {
  skill: string;
  selected: boolean;
  activated: boolean;
  delay: number;
  duplicate?: boolean;
  onSelect: () => void;
};

export function SkillItem({
  skill,
  selected,
  activated,
  delay,
  duplicate = false,
  onSelect,
}: SkillItemProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const active = selected || hovered || focused;
  const icon = skillIcons[skill];

  const iconStyle = {
    "--skill-color-delay": active ? "0ms" : `${delay}ms`,
    filter: activated || active ? "grayscale(0%)" : "grayscale(100%)",
    opacity: activated || active ? 1 : 0.55,
    transform: active ? "scale(1.08)" : "scale(1)",
  } as CSSProperties;

  const content = (
    <>
      <span className="grid size-8 shrink-0 place-items-center sm:size-9">
        {icon ? (
          <Image
            src={`/skills/${icon}`}
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
            draggable={false}
            className="skill-icon size-8 select-none object-contain sm:size-9"
            style={iconStyle}
          />
        ) : (
          <span className="text-xs font-black text-muted-foreground">
            {skill.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>

      <span
        className={[
          "whitespace-nowrap",
          "text-xs font-semibold sm:text-sm",
          "transition-colors duration-300",
          active ? "text-foreground" : "text-muted-foreground",
        ].join(" ")}
      >
        {skill}
      </span>
    </>
  );

  if (duplicate) {
    return (
      <div
        aria-hidden="true"
        className={[
          "flex min-h-12 shrink-0 items-center gap-2.5",
          "rounded-xl border border-border/70",
          "bg-background/70",
          "px-3.5 py-2.5 sm:px-4",
        ].join(" ")}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-pressed={selected}
      className={[
        "group/skill relative flex min-h-12 shrink-0 items-center gap-2.5",
        "rounded-xl border px-3.5 py-2.5",
        "transition-[border-color,background-color,box-shadow]",
        "duration-300 ease-out",
        "touch-manipulation",
        "focus-visible:z-20 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary-accent",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        active
          ? "border-primary-accent/70 bg-primary-accent/10 shadow-sm"
          : "border-border/70 bg-background/70 hover:border-primary-accent/40",
      ].join(" ")}
    >
      {content}

      {selected && (
        <motion.span
          layoutId="selected-skill-indicator"
          className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary-accent"
        />
      )}
    </button>
  );
}
