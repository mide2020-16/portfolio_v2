/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { personalInfo } from "@/lib/data/portfolio";
import { ContactSuccess } from "./ContactSuccess";
import { MessageField } from "./MessageField";

type FormState = "idle" | "loading" | "success" | "error";

type ContactIntent = "client" | "recruiter" | null;

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [contactIntent, setContactIntent] =
    useState<ContactIntent>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get("intent");

    if (intent !== "client" && intent !== "recruiter") return;

    setContactIntent(intent);

    setForm((current) => ({
      ...current,
      message:
        current.message ||
        (intent === "recruiter"
          ? "Hi Ayomide, I'd like to discuss a career opportunity with you.\n\n"
          : "Hi Ayomide, I'd like to discuss a project with you.\n\n"),
    }));

    const timer = window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormState("loading");

    try {
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREEID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        setFormState("error");
        return;
      }

      setSubmittedEmail(form.email);
      setForm(initialForm);
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const handleSendAnother = () => {
    setFormState("idle");
    setSubmittedEmail("");
  };

  return (
    <>
      <h3 className="mb-1 font-heading text-2xl font-black">
        Send a Message
      </h3>

      <p className="mb-6 text-sm text-muted-foreground">
        Drop me a message and I&apos;ll get back to you ASAP.
      </p>

      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <ContactSuccess
            key="success"
            email={submittedEmail}
            onSendAnother={handleSendAnother}
          />
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
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-xs font-black uppercase tracking-widest"
              >
                Name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary-accent focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs font-black uppercase tracking-widest"
              >
                Email
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary-accent focus:outline-none"
              />
            </div>

            {/* Message */}
            <MessageField
              value={form.message}
              onChange={(message) =>
                setForm((current) => ({ ...current, message }))
              }
              intent={contactIntent}
            />

            {/* Error */}
            {formState === "error" && (
              <div className="flex items-center gap-2 text-xs font-bold text-secondary-accent">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "loading"}
              className="flex w-full items-center justify-center gap-2 border-2 border-primary-accent bg-primary-accent px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-background hover:text-primary-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {formState === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {/* Direct email */}
            <p className="text-center text-xs text-muted-foreground">
              Or email me directly at{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-bold text-primary-accent hover:underline"
              >
                {personalInfo.email}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}