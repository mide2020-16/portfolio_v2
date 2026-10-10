"use client";

import { useState } from "react";
import { SectionLabel } from "./ui/SectionLabel";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { personalInfo, contactConfig } from "@/lib/data/portfolio";

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg
      xmlns="http://w3.org"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0077B5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns="http://w3.org"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0077B5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: (
    <svg
      xmlns="http://w3.org"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0077B5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
};

type FormState = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactConfig.formspreeId === "YOUR_FORMSPREE_ID") {
      alert(
        "⚠️ Contact form not yet configured.\n\nGo to https://formspree.io, create a free form, then paste your form ID into contactConfig.formspreeId in lib/data/portfolio.ts",
      );
      return;
    }
    setFormState("loading");
    try {
      const res = await fetch(
        `https://formspree.io/f/${contactConfig.formspreeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        },
      );
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <SectionLabel number="05" title="Contact" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Left: Real contact form ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring" as const,
              stiffness: 100,
              damping: 20,
            }}
            className="bg-card border-2 border-border p-8 shadow-[8px_8px_0px_0px_var(--primary-accent)]"
          >
            <h3 className="font-heading font-black text-2xl mb-1">
              Send a Message
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Drop me a message and I&apos;ll get back to you ASAP.
            </p>

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-48 gap-4 text-center"
                >
                  <div className="w-14 h-14 bg-green-400 border-2 border-border flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-lg">Message sent! 🎉</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      I&apos;ll reply to {form.email || "you"} soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-xs font-black uppercase tracking-widest text-primary-accent hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground font-medium text-sm focus:outline-none focus:border-primary-accent transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground font-medium text-sm focus:outline-none focus:border-primary-accent transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hey Ayomide, I'd love to collaborate on..."
                      className="w-full px-4 py-3 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground font-medium text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Error */}
                  {formState === "error" && (
                    <div className="flex items-center gap-2 text-secondary-accent text-xs font-bold">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again or email me
                      directly.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-7 py-4 bg-primary-accent text-white font-black uppercase text-sm tracking-widest border-2 border-primary-accent hover:bg-background hover:text-primary-accent transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Direct email fallback */}
                  <p className="text-center text-xs text-muted-foreground">
                    Or email me directly at{" "}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-primary-accent font-bold hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: CTA + Social Links ───────────────── */}
          <div className="flex flex-col gap-6">
            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                delay: 0.1,
              }}
              className="bg-primary-accent border-2 border-border p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_var(--foreground)]"
            >
              <div>
                <h3 className="font-heading font-black text-3xl text-white leading-tight mb-3">
                  Let&apos;s build something great.
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  I&apos;m currently available for new opportunities. Drop me a
                  line!
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                <span className="w-2 h-2 bg-highlight animate-pulse" />
                Status: Available for opportunities
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                delay: 0.2,
              }}
              className="bg-card border-2 border-border shadow-[8px_8px_0px_0px_var(--secondary-accent)] flex flex-col"
            >
              <h4 className="font-heading font-black text-lg px-6 pt-5 pb-2 uppercase tracking-widest">
                Connect
              </h4>
              <div className="divide-y-2 divide-border border-t-2 border-border">
                {personalInfo.socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 transition-colors group ${social.hoverClass}`}
                  >
                    {socialIcons[social.id]}
                    <div>
                      <div className="font-black text-sm uppercase tracking-widest">
                        {social.label}
                      </div>
                      <div className="text-xs text-muted-foreground group-hover:text-inherit/80">
                        {social.username}
                      </div>
                    </div>
                    <Mail className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
