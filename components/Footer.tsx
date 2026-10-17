"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { socialLinks } from "./socials/social.data";
import { SocialLink } from "./socials/socialLink";

const footerLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <footer
      id="site-footer"
      className="relative isolate overflow-hidden border-t-2 border-border bg-card text-foreground"
    >
      {/* Decorative detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-border sm:-right-16 sm:-top-32 sm:size-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-8 -z-10 size-40 rounded-full border border-border/60 sm:right-8 sm:top-12"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-10 md:grid-cols-[1.4fr_0.7fr_1fr] md:gap-8 lg:gap-14">
          {/* Brand */}
          <div className="min-w-0">
            <Link
              href="#top"
              aria-label="Ayomide — back to top"
              className={[
                "group inline-flex min-h-11 items-center",
                "font-heading text-3xl font-black tracking-tight",
                "rounded-sm focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-primary-accent",
                "focus-visible:ring-offset-4 focus-visible:ring-offset-card",
                "transition-colors",
              ].join(" ")}
            >
              Ayomide
              <span className="text-primary-accent transition-colors">.</span>
            </Link>

            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Creative Developer
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
              Building thoughtful digital experiences through code, creativity,
              and problem-solving.
            </p>
          </div>

          {/* Navigation */}
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
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className={[
                        "shrink-0 transition-transform duration-200",
                        "motion-reduce:transition-none",
                        "sm:opacity-0 sm:group-hover:translate-x-0.5",
                        "sm:group-hover:-translate-y-0.5 sm:group-hover:opacity-100",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="min-w-0">
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h2>

            <p className="mb-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Have a project or opportunity in mind? Let&apos;s connect.
            </p>

            <ul className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.key}>
                  <SocialLink
                    social={social}
                    reduceMotion={shouldReduceMotion}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-9 flex flex-col gap-3 border-t border-border pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <p className="text-[10px] font-semibold leading-5 tracking-wide text-muted-foreground">
            © {year} Efuwape Ayomide. All rights reserved.
          </p>

          <Link
            href="#top"
            className={[
              "group inline-flex min-h-11 w-fit items-center gap-2",
              "rounded-sm text-xs font-bold uppercase tracking-wider",
              "text-foreground/75 transition-colors hover:text-primary-accent",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-primary-accent",
            ].join(" ")}
          >
            <span>Back to top</span>
            <ArrowUp
              size={15}
              aria-hidden="true"
              className={[
                "transition-transform duration-200",
                shouldReduceMotion ? "" : "group-hover:-translate-y-1",
              ].join(" ")}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
