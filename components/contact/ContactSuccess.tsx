"use client";

import { motion } from "framer-motion";
import { Lottie } from "lottie-react";

import successAnimation from "@/assets/lottie/success.json";

type ContactSuccessProps = {
  email: string;
  onSendAnother: () => void;
};

export function ContactSuccess({
  email,
  onSendAnother,
}: ContactSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-48 flex-col items-center justify-center gap-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="flex h-16 w-16 items-center justify-center overflow-hidden border-2 border-border bg-green-400"
      >
        <Lottie
          src={successAnimation}
          autoplay
          loop={false}
          className="h-full w-full"
        />
      </motion.div>

      <div>
        <p className="text-lg font-black">Message sent! 🎉</p>

        <p className="mt-1 text-sm text-muted-foreground">
          I&apos;ll reply to {email || "you"} soon.
        </p>
      </div>

      <button
        type="button"
        onClick={onSendAnother}
        className="text-xs font-black uppercase tracking-widest text-primary-accent hover:underline"
      >
        Send another!
      </button>
    </motion.div>
  );
}