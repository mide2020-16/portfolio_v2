import { cn } from "@/lib/utils";

interface TechTagProps {
  name: string;
}

export function TechTag({ name }: TechTagProps) {
  return (
    <span className={cn(
      "inline-block px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-border",
      "bg-muted text-foreground"
    )}>
      {name}
    </span>
  );
}
