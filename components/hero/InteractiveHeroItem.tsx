import { Lottie, type LottieHandle } from "lottie-react";
import { useEffect, useRef } from "react";

interface InteractiveHeroItemProps {
  title: string;
  animation: object;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}


export function InteractiveHeroItem({
  title,
  animation,
  active,
  onActivate,
  onDeactivate,
}: InteractiveHeroItemProps) {
  const lottieRef = useRef<LottieHandle | null>(null);

  useEffect(() => {
    const player = lottieRef.current;

    if (!player) return;

    if (active) {
      player.play();
    } else {
      player.stop();
    }
  }, [active]);

  return (
    <button
      type="button"
      aria-pressed={active}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={() => {
        if (!active) {
          onActivate();
        } else {
          onDeactivate();
        }
      }}
      className="group flex w-fit max-w-full items-center gap-0 text-left outline-none cursor-pointer"
    >
      {/* Lottie animation container */}
      <span
        aria-hidden="true"
        className={`relative flex shrink-0 items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active
            ? "mr-3 h-12 w-12 translate-x-0 scale-100 opacity-100"
            : "mr-0 h-12 w-0 -translate-x-4 scale-90 opacity-0"
        }`}
      >
        <span className="relative block h-10 w-10 shrink-0">
          <Lottie
            lottieRef={lottieRef}
            src={animation}
            autoplay={false}
            loop={false}
            className="h-full w-full"
          />
        </span>
      </span>

      {/* Interactive title */}
      <span
        className={`relative block text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active
            ? "translate-x-1 text-amber-800 dark:text-amber-500 sm:translate-x-2"
            : "translate-x-0 text-zinc-900 dark:text-zinc-100 group-hover:text-amber-800 dark:group-hover:text-amber-500"
        }`}
      >
        {title}
      </span>
    </button>
  );
}