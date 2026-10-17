"use client";

import Link from "next/link";
import { DesktopNav } from "./DesktopNav";
import MatrixLogo from "./MatrixLogo";
import { NavbarActions } from "./NavbarActions";

interface NavbarHeaderProps {
  letters: string[];
  decodedIndices: boolean[];
  showFullHeader: boolean;
  openHireMe: () => void;
}

export function NavbarHeader({
  letters,
  decodedIndices,
  showFullHeader,
  openHireMe,
}: NavbarHeaderProps) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 p-3 transition-all duration-500 ease-in-out md:p-4 ${
        showFullHeader
          ? "pointer-events-auto translate-y-0 border-b border-border/60 bg-background/80 opacity-100 shadow-lg shadow-black/5 backdrop-blur-2xl dark:shadow-black/20"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-1 md:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex w-32 shrink-0 items-center gap-3 rounded-lg p-1 font-heading text-xl font-black tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent md:w-37 md:text-2xl"
          aria-label="Ayomide - back to top"
        >
          <MatrixLogo
            letters={letters}
            decodedIndices={decodedIndices}
          />
        </Link>

        {/* Desktop navigation */}
        <DesktopNav />

        {/* Header actions */}
        <NavbarActions openHireMe={openHireMe} />
      </div>
    </header>
  );
}