import { useEffect, useState } from "react";
import Link from "next/link";
import { MOBILE_NAV_ITEMS } from "./navbar.data";

export function MobileNav() {
  const [activeHref, setActiveHref] = useState("#top");

  useEffect(() => {
    const sectionIds = ["top", "experience", "projects", "contact"];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pointer-events-none">
      <nav
        aria-label="Mobile navigation"
        className="pointer-events-auto mx-auto flex max-w-md items-center gap-1 rounded-2xl border border-border/70 bg-background/90 dark:bg-background/90 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        {MOBILE_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = activeHref === href;

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? "location" : undefined}
              onClick={() => setActiveHref(href)}
              className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-all duration-300 active:scale-90 ${
                isActive
                  ? "text-primary-accent"
                  : "text-muted-foreground hover:text-foreground dark:hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-primary-accent/10 opacity-100"
                    : "bg-transparent opacity-0 group-hover:bg-muted/60 dark:group-hover:bg-muted/40 group-hover:opacity-100"
                }`}
              />

              <Icon
                className={`relative h-5 w-5 transition-transform duration-300 ${
                  isActive
                    ? "-translate-y-0.5 scale-110"
                    : "group-hover:-translate-y-0.5"
                }`}
                strokeWidth={isActive ? 2.4 : 1.8}
              />

              <span className="relative text-[9px] font-bold uppercase tracking-wider">
                {label}
              </span>

              <span
                aria-hidden="true"
                className={`absolute bottom-1 h-0.5 rounded-full bg-primary-accent transition-all duration-300 ${
                  isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </Link>
          );
        })}

        {/* Prominent Hire Me action */}
        <Link
          href="#contact"
          onClick={() => setActiveHref("#contact")}
          className="group relative ml-1 flex flex-[1.65] min-w-0 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-foreground text-background dark:bg-foreground dark:text-background px-2 py-3 shadow-md transition-all duration-300 focus:bg-primary-accent focus:text-white dark:hover:bg-primary-accent dark:hover:text-white active:scale-95"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-white/10 dark:bg-white/10 transition-transform duration-500 group-hover:translate-x-0"
          />

          <span className="relative whitespace-nowrap text-[10px] font-black uppercase tracking-wider">
            Hire Me
          </span>

          <span className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                d="M5 15 15 5M6 5h9v9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </nav>
    </div>
  );
}
