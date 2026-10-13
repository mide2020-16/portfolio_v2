"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AvatarMark from "./AvatarMark";
import MatrixLogo from "./MatrixLogo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import {
  BRAND_NAME,
  DECELERATION_MS,
  DECELERATION_POWER,
  INITIAL_DECODE_DELAY_MS,
  MATRIX_CHARS,
  SCRAMBLE_INTERVAL_MS,
} from "./navbar.data";

interface NavbarProps {
  showSplash: boolean;
}

export function Navbar({ showSplash }: NavbarProps) {
  const [letters, setLetters] = useState<string[]>(() => BRAND_NAME.split(""));
  const [decodedIndices, setDecodedIndices] = useState<boolean[]>(() =>
    new Array(BRAND_NAME.length).fill(false),
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);

  const lastScrollY = useRef(0);
  const frameRef = useRef<number | null>(null);

  // --- MATRIX DECODING ANIMATION ---
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

          return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }),
      );
    }, SCRAMBLE_INTERVAL_MS);

    const decodeNextLetter = () => {
      if (nextIndex >= targetLetters.length) {
        window.clearInterval(scrambleInterval);

        setLetters(targetLetters);
        setDecodedIndices(new Array(targetLetters.length).fill(true));

        return;
      }

      const index = nextIndex;
      locked[index] = true;

      setLetters((previous) =>
        previous.map((letter, letterIndex) =>
          letterIndex === index ? targetLetters[letterIndex] : letter,
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
        DECELERATION_MS * Math.pow(progress, DECELERATION_POWER);

      decodeTimeout = window.setTimeout(decodeNextLetter, nextDelay);
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

  // --- FRAME-BUDGETED SCROLL LISTENER ---
  useEffect(() => {
    if (showSplash) return;

    const updateScrollState = () => {
      frameRef.current = null;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

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
        frameRef.current = window.requestAnimationFrame(updateScrollState);
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
      {/* STANDALONE FLOATING AVATAR */}
      <div
        className={`fixed top-4 left-6 md:left-12 z-50 transition-all duration-500 ease-out pointer-events-auto ${
          isScrolled && !showFullHeader
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Link href="#top" aria-label="Ayomide - back to top">
          <AvatarMark size={40} />
        </Link>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-40 p-3 md:p-4 transition-all duration-500 ease-in-out ${
          showFullHeader
            ? "translate-y-0 opacity-100 bg-background/80 dark:bg-background/80 backdrop-blur-2xl border-b border-border/60 shadow-lg shadow-black/5 dark:shadow-black/20 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex items-center justify-between py-1">
          {/* Added a fixed/min width container to prevent layout reflow during matrix character scrambling */}
          <Link
            href="/"
            className="flex items-center gap-3 font-heading font-black text-xl md:text-2xl tracking-wider pointer-events-auto group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-lg p-1 shrink-0 w-32 md:w-37"
            aria-label="Ayomide - back to top"
          >
            <MatrixLogo letters={letters} decodedIndices={decodedIndices} />
          </Link>

          <DesktopNav />

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="#contact"
              className="group relative hidden sm:inline-flex items-center justify-center border-2 border-foreground bg-primary-accent px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[5px_5px_0px_0px_var(--color-foreground)] dark:shadow-[5px_5px_0px_0px_var(--color-foreground)] transition-all duration-150 ease-out hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-[2px_2px_0px_0px_var(--color-foreground)] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-accent"
            >
              <span className="relative z-10 flex items-center gap-2">
                Hire Me
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE STICKY NAVIGATION */}
      <MobileNav />
    </>
  );
}
