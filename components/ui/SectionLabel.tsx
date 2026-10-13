interface SectionLabelProps {
  number: string;
  title: string;
}

export function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-0.5 bg-border ml-4 hidden sm:block" />
    </div>
  );
}
