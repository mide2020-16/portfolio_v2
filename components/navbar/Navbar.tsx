"use client";

import { useEffect, useRef, useState } from "react";
import { useHireMe } from "@/components/hire/HireMeProvider";
import { MobileNav } from "./MobileNav";

import {
  BRAND_NAME,
  DECELERATION_MS,
  DECELERATION_POWER,
  INITIAL_DECODE_DELAY_MS,
  MATRIX_CHARS,
  SCRAMBLE_INTERVAL_MS,
} from "./navbar.data";
import { NavbarFloatingAvatar } from "./NavbarFloatingAvatar";
import { NavbarHeader } from "./NavbarHeader";

interface NavbarProps {
  showSplash: boolean;
}

export function Navbar({ showSplash }: NavbarProps) {
  const [letters, setLetters] = useState<string[]>(
    () => BRAND_NAME.split(""),
  );

  const [decodedIndices, setDecodedIndices] = useState<boolean[]>(
    () => new Array(BRAND_NAME.length).fill(false),
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);

  const lastScrollY = useRef(0);
  const frameRef = useRef<number | null>(null);

  const { openHireMe } = useHireMe();

  /*
   * Matrix decoding animation
   */
  useEffect(() => {
    if (showSplash) return;

    const targetLetters = BRAND_NAME.split("");
    const locked = new Array(BRAND_NAME.length).fill(false);

    let nextIndex = 0;
    let decodeTimeout: number | undefined;

    const scrambleInterval = window.setInterval(() => {
      setLetters((previous) =>
        previous.map((letter, index) => {
          if (locked[index]) {
            return targetLetters[index];
          }

          return MATRIX_CHARS[
            Math.floor(Math.random() * MATRIX_CHARS.length)
          ];
        }),
      );
    }, SCRAMBLE_INTERVAL_MS);

    const decodeNextLetter = () => {
      if (nextIndex >= targetLetters.length) {
        window.clearInterval(scrambleInterval);

        setLetters(targetLetters);
        setDecodedIndices(
          new Array(targetLetters.length).fill(true),
        );

        return;
      }

      const index = nextIndex;

      locked[index] = true;

      setLetters((previous) =>
        previous.map((letter, letterIndex) =>
          letterIndex === index
            ? targetLetters[letterIndex]
            : letter,
        ),
      );

      setDecodedIndices((previous) =>
        previous.map((decoded, letterIndex) =>
          letterIndex === index ? true : decoded,
        ),
      );

      nextIndex += 1;

      const progress = index + 1;

      const nextDelay =
        INITIAL_DECODE_DELAY_MS +
        DECELERATION_MS *
          Math.pow(progress, DECELERATION_POWER);

      decodeTimeout = window.setTimeout(
        decodeNextLetter,
        nextDelay,
      );
    };

    decodeTimeout = window.setTimeout(
      decodeNextLetter,
      INITIAL_DECODE_DELAY_MS,
    );

    return () => {
      window.clearInterval(scrambleInterval);

      if (decodeTimeout !== undefined) {
        window.clearTimeout(decodeTimeout);
      }
    };
  }, [showSplash]);

  /*
   * Scroll state
   */
  useEffect(() => {
    if (showSplash) return;

    const updateScrollState = () => {
      frameRef.current = null;

      const currentScrollY = window.scrollY;
      const scrollDelta =
        currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 40) {
        setShowFullHeader(true);
      } else if (scrollDelta > 8) {
        setShowFullHeader(false);
      } else if (scrollDelta < -8) {
        setShowFullHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current =
          window.requestAnimationFrame(
            updateScrollState,
          );
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [showSplash]);

  if (showSplash) {
    return null;
  }

  return (
    <>
      <NavbarFloatingAvatar
        isScrolled={isScrolled}
        showFullHeader={showFullHeader}
      />

      <NavbarHeader
        letters={letters}
        decodedIndices={decodedIndices}
        showFullHeader={showFullHeader}
        openHireMe={openHireMe}
      />

      <MobileNav />
    </>
  );
}