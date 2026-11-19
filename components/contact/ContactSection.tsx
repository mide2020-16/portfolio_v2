"use client";

import { SectionLabel } from "../ui/SectionLabel";
import { ContactCTA } from "./ContactCTA";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "./SocialLinks";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <SectionLabel title="Contact" />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="border-2 border-border bg-card p-8 shadow-[8px_8px_0px_0px_var(--primary-accent)]"
          >
            <ContactForm />
          </motion.div>

          {/* CTA and social links */}
          <div className="flex flex-col gap-6">
            <ContactCTA />
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
