"use client";

import { motion } from "framer-motion";
import { ScreenContent } from "./ScreenContent";

interface IPhone17MockupProps {
  screenshot?: string;
  title: string;
  isUpright?: boolean;
  onToggle?: () => void;
}

export function IPhone17Mockup({
  screenshot,
  title,
  isUpright = true,
  onToggle,
}: IPhone17MockupProps) {
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
      aria-label={
        onToggle
          ? `${title} phone — click to ${isUpright ? "lay flat on table" : "stand upright"}`
          : undefined
      }
      className={`relative mx-auto flex w-full max-w-48.75 flex-col items-center select-none ${
        onToggle ? "cursor-pointer focus:outline-none" : ""
      }`}
      style={{ perspective: "1300px" }}
    >
      {/* Phone Body pivoting from its bottom edge resting on the table */}
      <motion.div
        animate={{
          rotateX: isUpright ? 0 : 68,
          y: isUpright ? 0 : 14,
          scale: isUpright ? 1 : 0.94,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 22,
          mass: 0.9,
        }}
        style={{
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
        }}
        className="relative z-20 w-full"
      >
        {/* Physical Side Buttons */}
        {/* Power button (right) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2.5px] top-[24%] h-[9.5%] w-[2.5px] rounded-r-sm bg-linear-to-b from-[#e2e5ea] via-[#8e939c] to-[#4b5058] shadow-sm"
        />
        {/* Action button (top-left) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-2.5px] top-[15%] h-[4.2%] w-[2.5px] rounded-l-sm bg-linear-to-b from-[#e2e5ea] via-[#8e939c] to-[#4b5058]"
        />
        {/* Volume Up (left) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-2.5px] top-[22%] h-[7.5%] w-[2.5px] rounded-l-sm bg-linear-to-b from-[#e2e5ea] via-[#8e939c] to-[#4b5058]"
        />
        {/* Volume Down (left) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-2.5px] top-[31.5%] h-[7.5%] w-[2.5px] rounded-l-sm bg-linear-to-b from-[#e2e5ea] via-[#8e939c] to-[#4b5058]"
        />

        {/* Titanium Outer Frame */}
        <div className="relative aspect-[0.485] w-full overflow-hidden rounded-4xl border border-white/55 bg-[linear-gradient(135deg,#eef0f4_0%,#9ca3af_26%,#3f4652_66%,#a1a7b0_100%)] p-[3.5px] shadow-[0_14px_24px_-8px_rgba(15,23,42,0.45),inset_0_1px_1px_rgba(255,255,255,0.85)] sm:rounded-[2.55rem] sm:border-[1.5px] sm:p-[4.5px]">
          {/* Black Inner Glass Bezel & Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.72rem] bg-black ring-1 ring-black/90 sm:rounded-[2.18rem]">
            <ScreenContent
              src={screenshot}
              alt={`${title} mobile screen`}
              kind="phone"
            />

            {/* Dynamic Island */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[2%] z-20 flex h-[2.8%] w-[33%] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[5%] shadow-[0_1px_2px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              <span className="size-1.5 rounded-full bg-[#0f172a] ring-1 ring-sky-400/30 sm:size-2" />
            </div>

            {/* Subtle glass edge highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
            />
          </div>
        </div>
      </motion.div>

      {/* Tabletop Contact Shadow & Ambient Occlusion Seam */}
      <div className="relative z-10 -mt-0.75 flex w-full flex-col items-center">
        {/* Tight dark contact line where the bottom bezel touches the tabletop */}
        <motion.div
          aria-hidden="true"
          animate={{
            width: isUpright ? "82%" : "90%",
            opacity: isUpright ? 0.72 : 0.55,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 22 }}
          className="h-0.75 rounded-full bg-slate-950/90 blur-[1.5px]"
        />
        {/* Soft diffused shadow cast onto the table surface */}
        <motion.div
          aria-hidden="true"
          animate={{
            width: isUpright ? "94%" : "108%",
            height: isUpright ? 12 : 22,
            opacity: isUpright ? 0.34 : 0.48,
            y: isUpright ? -1 : -4,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 22 }}
          className="rounded-full bg-slate-900/75 blur-md"
        />
      </div>
    </div>
  );
}