import Link from "next/link";

export function FooterBrand() {
  return (
    <div className="min-w-0">
      <Link
        href="#top"
        aria-label="Ayomide — back to top"
        className={[
          "group inline-flex min-h-11 items-center",
          "rounded-sm font-heading text-3xl font-black tracking-tight",
          "transition-colors focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary-accent",
          "focus-visible:ring-offset-4 focus-visible:ring-offset-card",
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
  );
}