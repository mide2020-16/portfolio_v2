import { ExternalLink } from "lucide-react";

interface CertificateLinkProps {
  degree: string;
  certificateUrl?: string;
}

export function CertificateLink({
  degree,
  certificateUrl,
}: CertificateLinkProps) {
  if (!certificateUrl?.trim()) return null;

  return (
    <div className="flex w-full shrink-0 md:w-auto">
      <a
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View certificate for ${degree} (opens in a new tab)`}
        className="group/cert inline-flex min-h-11 w-full items-center justify-center gap-2 border-2 border-border bg-background px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-foreground transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-foreground hover:text-background active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-accent focus-visible:ring-offset-2 md:w-auto"
      >
        <span>View Certificate</span>

        <ExternalLink
          size={14}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5"
        />
      </a>
    </div>
  );
}