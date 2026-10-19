"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectPlatform } from "./experience.types";

interface ScreenProps {
  src?: string;
  alt: string;
  kind: "laptop" | "phone";
}

function ScreenContent({ src, alt, kind }: ScreenProps) {
  const [hasError, setHasError] = useState(false);

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
    <Image
      src={src}
      alt={alt}
      fill
      sizes={
        kind === "laptop"
          ? "(max-width: 768px) 85vw, 680px"
          : "(max-width: 768px) 28vw, 220px"
      }
      className="object-cover object-top"
      onError={() => setHasError(true)}
      priority={false}
    />
  );
}

export function MacBookMockup({
  screenshot,
  title,
}: {
  screenshot?: string;
  title: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[690px] px-1 pb-2 pt-1">
      {/* Display lid */}
      <div className="relative z-10 mx-auto w-[94%] rounded-t-[14px] border-[5px] border-b-[4px] border-[#30343a] bg-[#0a0b0d] p-[3px] shadow-[0_16px_30px_rgba(15,23,42,0.22)] sm:rounded-t-[18px] sm:border-[7px] sm:border-b-[5px] sm:p-[4px]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] bg-slate-900 sm:rounded-[8px]">
          <ScreenContent
            src={screenshot}
            alt={`${title} desktop screenshot`}
            kind="laptop"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1 z-10 size-1 -translate-x-1/2 rounded-full bg-[#24272c] ring-1 ring-white/10 sm:top-1.5"
          />
        </div>
      </div>
      {/* Hinge and aluminium base */}
      <div
        aria-hidden="true"
        className="relative z-20 mx-auto -mt-px h-[5px] w-[96%] rounded-b-sm bg-gradient-to-b from-[#92969d] via-[#d7d9dc] to-[#62676e] sm:h-[7px]"
      />
      <div
        aria-hidden="true"
        className="relative mx-auto h-[8px] w-full rounded-b-[55%] border-x border-b border-[#8e939a] bg-gradient-to-b from-[#e4e6e9] via-[#b9bdc3] to-[#737982] shadow-[0_8px_9px_rgba(15,23,42,0.22)] sm:h-[12px]"
      >
        <span className="absolute left-1/2 top-0 h-[2px] w-[18%] -translate-x-1/2 rounded-b-sm bg-[#8b9097]/80" />
      </div>
    </div>
  );
}

export function IPhone17Mockup({
  screenshot,
  title,
}: {
  screenshot?: string;
  title: string;
}) {
  return (
    <div className="relative w-[31%] min-w-[94px] max-w-[190px] shrink-0 drop-shadow-[0_18px_18px_rgba(15,23,42,0.28)] sm:min-w-[120px]">
      <div className="relative aspect-[0.485] overflow-hidden rounded-[2rem] border-[3px] border-[#737780] bg-gradient-to-br from-[#f4f4f5] via-[#a6a9af] to-[#454950] p-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] sm:rounded-[2.55rem] sm:border-[4px] sm:p-[4px]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.72rem] bg-black sm:rounded-[2.18rem]">
          <ScreenContent
            src={screenshot}
            alt={`${title} mobile screenshot`}
            kind="phone"
          />
          {/* Dynamic Island */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[2.1%] z-20 h-[2.7%] w-[34%] -translate-x-1/2 rounded-full bg-black shadow-[0_1px_1px_rgba(255,255,255,0.16)]"
          />
          {/* Fine inner rim */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/15"
          />
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[22%] h-[8%] w-[3px] rounded-r-sm bg-[#555960]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[18%] h-[5%] w-[3px] rounded-l-sm bg-[#aeb1b6]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[25%] h-[8%] w-[3px] rounded-l-sm bg-[#aeb1b6]"
      />
    </div>
  );
}

export function ProjectDeviceStage({
  platform,
  desktopScreenshot,
  mobileScreenshot,
  title,
}: {
  platform: ProjectPlatform;
  desktopScreenshot?: string;
  mobileScreenshot?: string;
  title: string;
}) {
  return (
    <div className="relative isolate flex min-h-[260px] items-center justify-center sm:min-h-[350px] sm:px-6 sm:py-10 lg:min-h-[395px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 25px, rgba(100,116,139,.15) 26px, transparent 27px)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 top-8 size-40 rounded-full border border-amber-900/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 size-36 rounded-full border border-amber-900/10"
      />

      {platform === "desktop" && (
        <div className="relative z-10 w-full">
          <MacBookMockup screenshot={desktopScreenshot} title={title} />
        </div>
      )}

      {platform === "mobile" && (
        <div className="relative z-10 flex w-full items-center justify-center py-1">
          <IPhone17Mockup screenshot={mobileScreenshot} title={title} />
        </div>
      )}

      {platform === "web" && (
        <div className="relative z-10 flex w-full items-center justify-center">
          <div className="w-[87%] translate-x-[-3%] sm:w-[88%] sm:translate-x-[-4%]">
            <MacBookMockup screenshot={desktopScreenshot} title={title} />
          </div>
          <div className="absolute bottom-0 right-[2%] z-20 w-[31%] rotate-[4deg] transition-transform duration-500 sm:right-[4%] sm:w-[25%] sm:hover:rotate-0">
            <IPhone17Mockup screenshot={mobileScreenshot} title={title} />
          </div>
        </div>
      )}
    </div>
  );
}
