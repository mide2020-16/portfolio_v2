"use client";

import { useEffect, useRef, useState } from "react";
import { CircleHelp } from "lucide-react";

type ContactIntent = "client" | "recruiter" | null;

type MessageFieldProps = {
  value: string;
  onChange: (value: string) => void;
  intent: ContactIntent;
};

export function MessageField({
  value,
  onChange,
  intent,
}: MessageFieldProps) {
  const [hintOpen, setHintOpen] = useState(false);

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const placeholder =
    intent === "recruiter"
      ? "Hi Ayomide, I'd like to discuss a career opportunity with you.\n\n"
      : intent === "client"
        ? "Hi Ayomide, I'd like to discuss a project with you.\n\n"
        : "Hey Ayomide, I'd love to collaborate with you on...\n\n";

  const applyPlaceholder = () => {
    const suggestion = placeholder.trim();

    if (value.includes(suggestion)) return;

    onChange(
      value.trim()
        ? `${value.trimEnd()}\n\n${suggestion}\n`
        : placeholder,
    );
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLTextAreaElement>,
  ) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      return;
    }

    longPressTimer.current = setTimeout(() => {
      applyPlaceholder();
      longPressTimer.current = null;
    }, 600);
  };

  const clearLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  useEffect(() => {
    return () => clearLongPress();
  }, []);

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <label
          htmlFor="contact-message"
          className="block text-xs font-black uppercase tracking-widest"
        >
          Message
        </label>

        <div className="group relative flex items-center">
          <button
            type="button"
            aria-label="How to use the suggested message"
            aria-expanded={hintOpen}
            onClick={() => setHintOpen((previous) => !previous)}
            onBlur={() => setHintOpen(false)}
            className="flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent"
          >
            <CircleHelp size={15} strokeWidth={2.5} />
          </button>

          <div
            role="tooltip"
            className={`absolute left-6 top-1/2 z-30 w-64 -translate-y-1/2 border-2 border-border bg-card p-3 text-[10px] font-bold leading-relaxed text-foreground shadow-[4px_4px_0px_0px_var(--foreground)] transition-opacity duration-200 ${
              hintOpen
                ? "visible opacity-100"
                : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            }`}
          >
            Double-click or press and hold the message box to continue with
            the suggested text. You can edit it and add anything else
            you&apos;d like!
          </div>
        </div>
      </div>

      <textarea
        id="contact-message"
        name="message"
        required
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onDoubleClick={applyPlaceholder}
        onPointerDown={handlePointerDown}
        onPointerUp={clearLongPress}
        onPointerLeave={clearLongPress}
        onPointerCancel={clearLongPress}
        placeholder={placeholder}
        className="w-full resize-none border-2 border-border bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary-accent focus:outline-none"
      />
    </div>
  );
}