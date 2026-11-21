"use client";

import { motion } from "framer-motion";
import { ScreenContent } from "./ScreenContent";

interface MacBookMockupProps {
  screenshot?: string;
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function MacBookMockup({
  screenshot,
  title,
  isOpen = true,
  onToggle,
}: MacBookMockupProps) {
  return (
    <div
      role={onToggle ? "button" : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (!onToggle) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-label={onToggle ? `${title} laptop — click to ${isOpen ? "close" : "open"} lid` : undefined}
      className={`group relative mx-auto w-full max-w-172.5 px-1 pb-3 pt-1 select-none ${
        onToggle ? "cursor-pointer focus:outline-none" : ""
      }`}
      style={{ perspective: "1400px" }}
    >
      {/* Display Lid */}
      <motion.div
        animate={{
          rotateX: isOpen ? 0 : -76,
          y: isOpen ? 0 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 155,
          damping: 22,
          mass: 0.9,
        }}
        style={{
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 mx-auto w-[94%] rounded-t-[14px] border-[1.5px] border-[#b7bcc4]/80 bg-linear-to-b from-[#d5d8de] via-[#aeb3bc] to-[#878c96] p-1 shadow-[0_18px_36px_-10px_rgba(15,23,42,0.35),inset_0_1px_1px_rgba(255,255,255,0.75)] sm:rounded-t-[18px] sm:p-1.5"
      >
        {/* Inner black glass bezel */}
        <div className="relative overflow-hidden rounded-[10px] bg-[#090a0d] p-1.75 pt-3 ring-1 ring-black/80 sm:rounded-[13px] sm:p-2.5 sm:pt-4">
          {/* Camera housing & lens */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1 z-20 flex -translate-x-1/2 items-center gap-1 sm:top-1.25"
          >
            <span className="flex size-1.5 items-center justify-center rounded-full bg-[#15181e] ring-1 ring-white/10 sm:size-2">
              <span className="size-0.5 rounded-full bg-sky-400/70 sm:size-0.75" />
            </span>
          </div>

          {/* 16:10 Screen */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm bg-neutral-950 ring-1 ring-white/10 sm:rounded-md">
            <ScreenContent
              src={screenshot}
              alt={`${title} desktop screen`}
              kind="laptop"
            />
          </div>
        </div>
      </motion.div>

      {/* Hinge Barrel */}
      <div
        aria-hidden="true"
        className="relative z-20 mx-auto -mt-px h-1.25 w-[94.5%] rounded-b-xs bg-[linear-gradient(90deg,#6d727b_0%,#c9cdd4_18%,#eef1f5_50%,#c5cad2_82%,#656a73_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_1px_2px_rgba(0,0,0,0.35)] sm:h-1.75"
      />

      {/* Unibody Base & Front Lip */}
      <div className="relative z-10 mx-auto w-full">
        <div
          aria-hidden="true"
          className="relative h-2 w-full overflow-hidden rounded-b-xl border-x border-b border-[#7a808a] bg-[linear-gradient(180deg,#e5e8ec_0%,#c5cad2_48%,#8c929c_88%,#6b7079_100%)] shadow-[0_6px_12px_rgba(15,23,42,0.22)] sm:h-3 sm:rounded-b-[14px]"
        >
          {/* Specular top edge highlight */}
          <span className="block h-px w-full bg-white/80" />
          {/* Lid-opening thumb recess */}
          <span className="mx-auto block h-0.75 w-[15%] rounded-b-md bg-[#7c828c]/75 shadow-[inset_0_1px_1px_rgba(0,0,0,0.25)] sm:h-1" />
        </div>

        {/* Grounded surface shadow */}
        <div
          aria-hidden="true"
          className="mx-auto -mt-0.5 h-2.5 w-[92%] rounded-full bg-slate-900/25 blur-md transition-transform duration-300 group-hover:scale-[1.01] sm:h-3.25"
        />
      </div>
    </div>
  );
}