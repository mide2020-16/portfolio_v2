"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { personalInfo } from "@/data/portfolio";
import { socialIcons } from "../socials/socialLinkSvg";

export function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      }}
      className="flex flex-col border-2 border-border bg-card shadow-[8px_8px_0px_0px_var(--secondary-accent)]"
    >
      <h4 className="px-6 pb-2 pt-5 font-heading text-3xl font-black uppercase tracking-widest">
        Connect
      </h4>

      <div className="divide-y-2 divide-border border-t-2 border-border">
        {personalInfo.socials.map((social) => (
          <Link
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 p-4 transition-colors ${social.hoverClass}`}
          >
            {socialIcons[social.id]}

            <div>
              <div className="text-sm font-black uppercase tracking-widest">
                {social.label}
              </div>

              <div className="text-xs text-muted-foreground group-hover:text-inherit/80">
                {social.username}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}