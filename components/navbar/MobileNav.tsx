import { useEffect, useState } from "react";
import Link from "next/link";
import { MOBILE_NAV_ITEMS } from "./navbar.data";
import { ArrowUpRight } from "lucide-react";
import { useHireMe } from "../hire/HireMeProvider";

const iconStyles = [
  {
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    activeBg: "bg-blue-500/15",
  },
  {
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    activeBg: "bg-violet-500/15",
  },
  {
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    activeBg: "bg-orange-500/15",
  },
  {
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    activeBg: "bg-emerald-500/15",
  },
];

export function MobileNav() {
  const [activeHref, setActiveHref] = useState("#top");
  const { openHireMe } = useHireMe();

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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] md:hidden">
      <nav
        aria-label="Mobile navigation"
        className="
          pointer-events-auto
          mx-auto
          flex
          w-full
          max-w-md
          items-center
          gap-1.5
          border-2
          border-border
          bg-background/95
          p-1.5
          shadow-[6px_6px_0px_0px_var(--foreground)]
          backdrop-blur-xl
        "
      >
        {/* Navigation */}
        <div className="flex min-w-0 flex-1 items-center">
          {MOBILE_NAV_ITEMS.map(({ href, label, icon: Icon }, index) => {
            const isActive = activeHref === href;
            const iconStyle = iconStyles[index % iconStyles.length];

            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveHref(href)}
                className="
                  group
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  px-0.5
                  py-1.5
                  transition-transform
                  duration-150
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary-accent
                  focus-visible:ring-inset
                "
              >
                {/* Icon */}
                <span
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? iconStyle.activeBg
                        : "bg-transparent group-hover:bg-muted/50"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.4 : 2}
                    className={`
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? iconStyle.color
                          : "text-muted-foreground group-hover:text-foreground"
                      }
                    `}
                    aria-hidden="true"
                  />
                </span>

                {/* Label */}
                <span
                  className={`
                    max-w-full
                    truncate
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.08em]
                    leading-none
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Hire Me */}
        <button
          type="button"
          onClick={openHireMe}
          aria-label="Hire me"
          className="
            group
            flex
            h-10
            min-w-[92px]
            shrink-0
            items-center
            justify-center
            gap-2
            border-2
            border-foreground
            bg-primary-accent
            px-4
            text-white
            shadow-[3px_3px_0px_0px_var(--foreground)]
            transition-all
            duration-150
            active:translate-x-[2px]
            active:translate-y-[2px]
            active:shadow-none
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary-accent
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          <span className="text-[9px] font-black uppercase tracking-[0.1em]">
            Hire Me
          </span>

          <ArrowUpRight
            size={17}
            strokeWidth={2.5}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
            aria-hidden="true"
          />
        </button>
      </nav>
    </div>
  );
}