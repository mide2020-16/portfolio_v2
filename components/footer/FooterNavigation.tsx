import Link from "next/link";
import { footerLinks } from "./footer.data";

export function FooterNavigation() {
  return (
    <nav aria-label="Footer navigation" className="min-w-0">
      <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Explore
      </h2>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1 sm:gap-y-2">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={[
                "group inline-flex min-h-11 items-center gap-2",
                "rounded-sm pr-2 text-sm font-semibold",
                "text-foreground/75 transition-colors",
                "hover:text-primary-accent",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-primary-accent",
              ].join(" ")}
            >
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
