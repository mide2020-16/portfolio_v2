import { Lottie } from "lottie-react";
import trophyAnimation from "@/assets/lottie/trophy.json";
import { Award, ExternalLink } from "lucide-react";
import { achievements } from "@/lib/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

interface AchievementCardProps {
  item: (typeof achievements)[0];
  index: number;
  shouldReduceMotion: boolean | null;
  hoveredIndex: number | null;
  activeTrophyIndex: number | null;
  activateTrophy: (index: number) => void;
  deactivateTrophy: (index: number) => void;
  handleTrophyPointerUp: (index: number, pointerType: string) => void;
  handleTrophyKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => void;
  openCertificate: (index: number) => void;
}

export function AchievementCard({
  item,
  index,
  shouldReduceMotion,
  hoveredIndex,
  activeTrophyIndex,
  activateTrophy,
  deactivateTrophy,
  handleTrophyPointerUp,
  handleTrophyKeyDown,
  openCertificate,
}: AchievementCardProps) {
  const hasCert = Boolean(item.certificateImage?.trim());
  const isHovered = hoveredIndex === index;
  const isTrophyActive = activeTrophyIndex === index;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => activateTrophy(index)}
      onMouseLeave={() => deactivateTrophy(index)}
      onFocusCapture={() => activateTrophy(index)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          deactivateTrophy(index);
        }
      }}
      className={`group relative flex flex-col justify-between gap-5 border-2 border-border p-4 transition-colors duration-300 sm:p-5 md:flex-row md:items-center ${
        isHovered ? "bg-background" : "bg-background/60"
      }`}
    >
      {/* Left: trophy and achievement details */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Interactive trophy */}
        <div
          role="button"
          tabIndex={0}
          aria-label={
            isTrophyActive ? "Show trophy emoji" : "Play trophy animation"
          }
          onPointerUp={(event) =>
            handleTrophyPointerUp(index, event.pointerType)
          }
          onKeyDown={(event) => handleTrophyKeyDown(event, index)}
          className={`relative flex h-14 w-14 shrink-0 cursor-pointer touch-manipulation items-center justify-center overflow-hidden border-2 border-border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2 ${
            isHovered
              ? "bg-highlight shadow-[3px_3px_0px_0px_var(--foreground)]"
              : "bg-background"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isTrophyActive ? (
              <motion.span
                key="trophy-emoji"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.65,
                        rotate: -12,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        scale: 0.65,
                        rotate: 12,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.2,
                  ease: "easeOut",
                }}
                className="select-none text-3xl leading-none"
                aria-hidden="true"
              >
                🏆
              </motion.span>
            ) : (
              <motion.div
                key="trophy-lottie"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.75,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.75,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.2,
                  ease: "easeOut",
                }}
                className="h-full w-full"
                aria-hidden="true"
              >
                <Lottie
                  key={`trophy-${index}`}
                  src={trophyAnimation}
                  autoplay
                  loop={false}
                  className="h-full w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border border-foreground/10"
          />
        </div>

        {/* Achievement information */}
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-black leading-tight text-foreground transition-colors duration-300 sm:text-xl">
            {item.title}
          </h3>

          <p className="mt-1 text-sm font-bold leading-relaxed text-foreground/65">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Right: actions and badge */}
      <div className="flex w-full flex-wrap items-center justify-between gap-3 md:w-auto md:justify-end">
        {hasCert && (
          <button
            type="button"
            onClick={() => openCertificate(index)}
            className="group/cert inline-flex min-h-11 items-center justify-center gap-2 border-2 border-border bg-background px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-foreground transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-foreground hover:text-background active:translate-x-0.75 active:translate-y-0.75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2"
          >
            <Award
              size={16}
              className="transition-transform duration-300 group-hover/cert:rotate-12 group-hover/cert:scale-110"
            />
            View Certificate
            <ExternalLink
              size={13}
              className="opacity-60 transition-transform group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5"
            />
          </button>
        )}
      </div>

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-1 bg-secondary-accent transition-all duration-500 ${
          isHovered ? "w-full" : "w-0"
        }`}
      />
    </motion.article>
  );
}
