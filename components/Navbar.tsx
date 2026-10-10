"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Briefcase, Code, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MATRIX_CHARS = "AYOMIDE".split("");
const BRAND_NAME = "Ayomide";
const TICK_INTERVAL_MS = 100;

function AvatarMark() {
  return (
     <div className="relative group inline-flex items-center justify-center">
      {/* Subtle background glow effect on hover */}
      <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary-accent/40 to-foreground/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300" />

      {/* Sleek container wrapper for seamless blending */}
      <div className="relative flex items-center justify-center p-1 rounded-full bg-background/60 backdrop-blur-md shadow-md group-hover:border-primary-accent/60 transition-all duration-300">
        <Image
          src="/brand.png"
          alt="Ayomide"
          width={60}
          height={60}
          className="object-contain rounded-full mix-blend-multiply dark:mix-blend-screen dark:brightness-110 dark:contrast-125 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

export function Navbar() {
  const [letters, setLetters] = useState<string[]>(BRAND_NAME.split(""));
  const [decodedIndices, setDecodedIndices] = useState<boolean[]>(
    new Array(BRAND_NAME.length).fill(false),
  );

  // Dynamic Header Visibility States
  const [isScrolled, setIsScrolled] = useState(false); // True if window.scrollY > 20
  const [showFullHeader, setShowFullHeader] = useState(true); // Toggles on scroll direction

  const lastScrollY = useRef(0);
  const frameRef = useRef<number | null>(null);

  // 1. Matrix decoding animation effect
  useEffect(() => {
    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;

      const newDecoded = BRAND_NAME.split("").map(
        (_, index) => tick > 8 + index * 6,
      );
      setDecodedIndices(newDecoded);

      setLetters(
        BRAND_NAME.split("").map((letter, index) =>
          newDecoded[index]
            ? letter
            : MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        ),
      );

      if (tick > 8 + BRAND_NAME.length * 6) {
        window.clearInterval(interval);
        setLetters(BRAND_NAME.split(""));
        setDecodedIndices(new Array(BRAND_NAME.length).fill(true));
      }
    }, TICK_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  // 2. Scroll direction & threshold listener
  useEffect(() => {
    const updateScrollState = () => {
      frameRef.current = null;
      const currentScrollY = window.scrollY;

      // Scrolled state past top threshold
      setIsScrolled(currentScrollY > 40);

      // Detect direction: Scrolling UP vs DOWN at any position
      if (currentScrollY <= 40) {
        setShowFullHeader(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling Down -> Hide Full Header, Show Only Avatar
        setShowFullHeader(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling Up -> Show Full Header
        setShowFullHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null)
        window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      {/* 
        Standalone Fixed Avatar: 
        Only visible when scrolled down AND full header is hidden.
      */}
      <div
        className={`fixed top-4 left-6 md:left-12 z-50 transition-all duration-500 ease-out pointer-events-auto ${
          isScrolled && !showFullHeader
            ? "translate-x-0 opacity-100 scale-100"
            : "-translate-x-4 opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Link href="#top" aria-label="Ayomide - back to top">
          <AvatarMark />
        </Link>
      </div>

      {/* Main Header Container */}
      <header
        className={`fixed top-0 inset-x-0 z-40 p-3 transition-all duration-500 ease-in-out ${
          showFullHeader
            ? "translate-y-0 opacity-100 bg-background/90 backdrop-blur-md border-b-2 border-border shadow-sm pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex items-center justify-between py-2">
          {/* Brand & Matrix Animation */}
          <Link
            href="#top"
            className="flex items-center gap-3 font-heading font-black text-xl md:text-2xl tracking-wider pointer-events-auto"
            aria-label="Ayomide - back to top"
          >
            <span className="inline-flex items-center font-mono select-none">
              {letters.map((letter, index) => {
                const isDecoded = decodedIndices[index];
                return (
                  <span
                    key={index}
                    className={`inline-block w-[1ch] text-center transition-colors duration-300 ease-in-out ${
                      isDecoded
                        ? "text-foreground font-bold"
                        : "text-primary-accent opacity-80"
                    }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <Link
              href="#experience"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions & Theme Switcher */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-foreground text-background font-bold text-sm uppercase tracking-wider hover:bg-primary-accent hover:text-white transition-colors border-2 border-foreground"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-t-2 border-border pb-safe">
        <nav className="flex items-center justify-around px-2 py-3">
          <Link
            href="#top"
            className="flex flex-col items-center p-1 text-muted-foreground hover:text-primary-accent transition-colors"
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Home
            </span>
          </Link>
          <Link
            href="#experience"
            className="flex flex-col items-center p-1 text-muted-foreground hover:text-primary-accent transition-colors"
          >
            <Briefcase className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Exp
            </span>
          </Link>
          <Link
            href="#projects"
            className="flex flex-col items-center p-1 text-muted-foreground hover:text-primary-accent transition-colors"
          >
            <Code className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Work
            </span>
          </Link>
          <Link
            href="#contact"
            className="flex flex-col items-center p-1 text-muted-foreground hover:text-primary-accent transition-colors"
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Contact
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
}
