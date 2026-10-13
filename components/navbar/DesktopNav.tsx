import Link from "next/link";
import { NAV_LINKS } from "./navbar.data";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-foreground/70 hover:text-foreground dark:text-foreground/70 dark:hover:text-foreground transition-colors py-1 relative"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
