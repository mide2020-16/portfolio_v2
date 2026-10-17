"use client";

import { AnimatePresence, motion } from "framer-motion";
import { socialLinks } from "../socials/social.data";
import { SocialLink } from "../socials/socialLink";

interface HeroSocialLinksProps {
  heroInView: boolean;
  reduceMotion: boolean;
}

export function HeroSocialLinks({
  heroInView,
  reduceMotion,
}: HeroSocialLinksProps) {
  return (
    <AnimatePresence initial={false}>
      {heroInView ? (
        <motion.div
          key="hero-socials"
          layout
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: "easeOut",
          }}
          className="flex items-center gap-2"
          aria-label="Social profiles"
        >
          {socialLinks.map((social) => (
            <SocialLink
              key={social.key}
              social={social}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="floating-socials"
          layout
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -16,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  x: -16,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: "easeOut",
          }}
          className="fixed left-2 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 sm:flex"
          aria-label="Social profiles"
        >
          {socialLinks.map((social) => (
            <SocialLink
              key={social.key}
              social={social}
              reduceMotion={reduceMotion}
              floating
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
