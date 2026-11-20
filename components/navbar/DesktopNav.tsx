"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, getNavHref } from "../../data/navbar.data";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
      {NAV_LINKS.map(({ slug, label }) => {
        const href = getNavHref(slug, pathname);

        return (
          <Link
            key={slug}
            href={href}
            className="text-foreground/70 hover:text-foreground dark:text-foreground/70 dark:hover:text-foreground transition-colors py-1 relative"
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}