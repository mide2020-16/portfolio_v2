"use client";

import Link from "next/link";

import AvatarMark from "./AvatarMark";

interface NavbarFloatingAvatarProps {
  isScrolled: boolean;
  showFullHeader: boolean;
}

export function NavbarFloatingAvatar({
  isScrolled,
  showFullHeader,
}: NavbarFloatingAvatarProps) {
  const isVisible = isScrolled && !showFullHeader;

  return (
    <div
      className={`pointer-events-auto fixed left-6 top-4 z-50 transition-all duration-500 ease-out md:left-12 ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-4 scale-90 opacity-0"
      }`}
    >
      <Link
        href="#top"
        aria-label="Ayomide - back to top"
      >
        <AvatarMark size={40} />
      </Link>
    </div>
  );
}