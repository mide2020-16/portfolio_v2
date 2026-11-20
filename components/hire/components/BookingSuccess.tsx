
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";
import projectAnimation from "@/assets/lottie/meeting.json";

type BookingSuccessProps = {
  reduceMotion: boolean;
  onClose: () => void;
};

export function BookingSuccess({
  reduceMotion,
  onClose,
}: BookingSuccessProps) {
  const transition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 300,
        damping: 28,
        mass: 0.8,
      };

  return (
    <motion.div
      key="success"
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 12,
      }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
        ease: "easeOut",
      }}
      className="overflow-y-auto p-7 text-center sm:p-10"
    >
      <motion.div
        initial={
          reduceMotion
            ? { scale: 1 }
            : { scale: 0.8, rotate: -8 }
        }
        animate={{ scale: 1, rotate: 0 }}
        transition={transition}
        className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden border-2 border-border bg-highlight text-secondary-accent shadow-[4px_4px_0px_0px_var(--border)]"
      >
        <Lottie
          src={projectAnimation}
          autoplay
          loop
          className="size-full"
        />
      </motion.div>

      <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
        You&apos;re all set
        <span className="ml-0.5 text-secondary-accent">!</span>
      </h3>

      <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-foreground/60">
        Your meeting has been scheduled. Check your email for the
        booking confirmation and meeting details.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 border-2 border-border bg-foreground px-6 py-3 text-xs font-black uppercase tracking-widest text-background shadow-[4px_4px_0px_0px_var(--highlight)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary-accent hover:text-foreground hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent"
      >
        Done
      </button>
    </motion.div>
  );
}
