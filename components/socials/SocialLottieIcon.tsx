
"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";
import { Lottie } from "lottie-react";
import type { LottieHandle } from "lottie-react";

import type { SocialAnimationKey } from "./socialLottie.data";
import { socialLottieAnimations } from "./socialLottie.data";

interface SocialLottieIconProps {
  socialKey: SocialAnimationKey;
  reduceMotion: boolean;
  onInteraction?: () => void;
}

export function SocialLottieIcon({
  socialKey,
  reduceMotion,
  onInteraction,
}: SocialLottieIconProps) {
  const lottieRef = useRef<LottieHandle>(null);

  const playAnimation = useCallback(() => {
    onInteraction?.();

    if (reduceMotion) return;

    lottieRef.current?.stop();
    lottieRef.current?.play();
  }, [onInteraction, reduceMotion]);

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (event.pointerType === "mouse") {
        playAnimation();
      }
    },
    [playAnimation],
  );

  const handlePointerLeave = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (event.pointerType === "mouse" && !reduceMotion) {
        lottieRef.current?.stop();
      }
    },
    [reduceMotion],
  );

  return (
    <span
      aria-hidden="true"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={playAnimation}
      className="flex size-7 items-center justify-center sm:size-8"
    >
      <Lottie
        lottieRef={lottieRef}
        src={socialLottieAnimations[socialKey]}
        autoplay={false}
        loop={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </span>
  );
}
