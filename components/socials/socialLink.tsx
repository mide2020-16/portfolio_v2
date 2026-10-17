"use client";

import { motion } from "framer-motion";
import { socialLinks } from "./social.data";
import { socialIcons } from "./socialLinkSvg";

interface SocialLinkProps {
  social: (typeof socialLinks)[number];
  reduceMotion: boolean;
  floating?: boolean;
}

const email = "efuwapeayomide51@gmail.com";

const subject = "Let's Connect — Portfolio Inquiry";

const body = `Hello Ayomide,

I came across your portfolio and would love to connect with you.

I'd like to discuss an opportunity with you.

Looking forward to hearing from you.

Best regards,`;

export const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  email,
)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export function SocialLink({
  social,
  reduceMotion,
  floating = false,
}: SocialLinkProps) {
  const icon = socialIcons[social.key];
  const isMail = social.key === "mail";

  const href = isMail ? gmailLink : social.href;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        isMail ? "Compose an email in Gmail" : `Visit my ${social.label} profile`
      }
      title={isMail ? "Email me with Gmail" : social.label}
      whileHover={
        reduceMotion ? undefined : floating ? { x: 3 } : { y: -2 }
      }
      whileTap={
        reduceMotion ? undefined : floating ? { x: 1 } : { y: 0 }
      }
      className={[
        "group/social relative flex size-10 items-center justify-center",
        "border-2 border-zinc-900",
        "bg-white text-zinc-900",
        floating
          ? "shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]"
          : "shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]",
        "transition-all duration-200",
        "hover:bg-amber-800 hover:text-white",
        "dark:border-zinc-100 dark:bg-zinc-900",
        "dark:text-zinc-100",
        floating
          ? "dark:shadow-[4px_4px_0px_0px_rgba(244,244,245,1)]"
          : "dark:shadow-[3px_3px_0px_0px_rgba(244,244,245,1)]",
        "dark:hover:bg-amber-700",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-amber-700",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",
        !floating && "sm:size-11",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className="flex items-center justify-center text-lg transition-transform duration-200 group-hover/social:scale-110"
      >
        {icon}
      </span>

      <span
        className={[
          "pointer-events-none absolute whitespace-nowrap",
          "border border-zinc-900 bg-zinc-900",
          "px-2 py-1 text-[9px] font-black uppercase tracking-wider text-white",
          "opacity-0 transition-opacity duration-150",
          "group-hover/social:opacity-100",
          "dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900",
          floating
            ? "left-full ml-2"
            : "-top-8 left-1/2 -translate-x-1/2",
        ].join(" ")}
      >
        {isMail ? "Email" : social.label}
      </span>
    </motion.a>
  );
}
