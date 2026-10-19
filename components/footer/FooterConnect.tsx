"use client";

import { useReducedMotion } from "framer-motion";
import { socialLinks } from "../socials/social.data";
import { SocialLink } from "../socials/socialLink";

export function FooterConnect() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
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
  );
}