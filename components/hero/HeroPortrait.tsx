import Image from "next/image";

export function HeroPortrait() {
  return (
    <div className="relative mx-auto flex h-95 w-full max-w-[320px] sm:h-110 sm:max-w-90 lg:h-130 lg:max-w-105 lg:items-center lg:justify-center">
      {/* Decorative corners */}
      <span
        aria-hidden="true"
        className="absolute -right-3 -top-3 z-20 h-16 w-16 border-r-2 border-t-2 border-amber-800 dark:border-amber-500"
      />

      <span
        aria-hidden="true"
        className="absolute -bottom-3 -left-3 z-20 h-16 w-16 border-b-2 border-l-2 border-amber-800 dark:border-amber-500"
      />

      {/* Portrait */}
      <div className="relative h-full w-full overflow-hidden border border-zinc-300 bg-zinc-100 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-[12px_12px_0px_0px_rgba(244,244,245,1)]">
        <Image
          src="/images/sketch.png"
          alt="Ayomide portrait"
          fill
          priority
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover grayscale contrast-125 transition-all duration-700 ease-out hover:grayscale-0 hover:contrast-100 dark:opacity-85 dark:hover:opacity-100"
        /> 

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/75 via-black/25 to-transparent p-5 pt-20 text-white">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              Creative Developer
            </p>

            <p className="mt-1 text-sm font-black tracking-tight sm:text-lg">
              EFUWAPE AYOMIDE OREOLUWA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
