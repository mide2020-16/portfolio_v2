/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ScreenProps {
  src?: string;
  alt: string;
  kind: "laptop" | "phone";
}

export function ScreenContent({ src, alt, kind }: ScreenProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[linear-gradient(145deg,#f8fafc_0%,#e2e8f0_48%,#cbd5e1_100%)] p-3 text-slate-700 sm:p-5">
        <div className="flex items-center gap-1.5 border-b border-slate-400/40 pb-2">
          <span className="size-1.5 rounded-full bg-rose-400" />
          <span className="size-1.5 rounded-full bg-amber-400" />
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {kind === "laptop" && (
            <span className="ml-2 h-1.5 w-2/5 rounded-full bg-slate-400/50" />
          )}
        </div>
        <div className="my-auto flex flex-col items-center justify-center text-center">
          <span className="mb-2 flex size-8 items-center justify-center rounded-xl border border-slate-500/20 bg-white/60 text-lg shadow-sm sm:size-11 sm:text-2xl">
            {kind === "laptop" ? "▤" : "▯"}
          </span>
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">
            Screenshot placeholder
          </span>
          <span className="mt-1 max-w-[22ch] text-[9px] font-medium leading-relaxed text-slate-500 sm:text-xs">
            Add your {kind === "laptop" ? "desktop" : "mobile"} screen image
          </span>
        </div>
        <div className="mt-auto space-y-1.5 opacity-40">
          <span className="block h-1.5 w-3/4 rounded-full bg-slate-500/60" />
          <span className="block h-1.5 w-1/2 rounded-full bg-slate-500/40" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          kind === "laptop"
            ? "(max-width: 768px) 90vw, 720px"
            : "(max-width: 768px) 35vw, 240px"
        }
        className="h-full w-full object-cover object-top select-none"
        onError={() => setHasError(true)}
        priority={false}
      />
      {/* Subtle diagonal display glass reflection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_28%,transparent_52%)]"
      />
    </div>
  );
}