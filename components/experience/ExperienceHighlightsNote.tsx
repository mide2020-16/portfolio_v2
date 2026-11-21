interface ExperienceHighlightsNoteProps {
  groupId: string;
  highlights: string[];
}

export function ExperienceHighlightsNote({
  groupId,
  highlights,
}: ExperienceHighlightsNoteProps) {
  if (highlights.length === 0) return null;

  return (
    <div className="relative mb-6 overflow-hidden border border-[#e5dcc8] bg-[#fffdf5] px-4 py-4 shadow-[2px_3px_0_rgba(120,100,70,0.06)] sm:px-5">
      {/* Notebook ruled lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(100,130,160,0.13)_28px,transparent_29px)]"
      />

      {/* Red notebook margin */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-red-400/40 sm:left-9"
      />

      <div className="relative pl-7 sm:pl-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-heading text-sm font-black text-[#39352e] sm:text-base">
            Responsibilities &amp; Impact
          </h4>

          <span className="-rotate-3 inline-flex origin-center items-center border border-[#d9c7a1] bg-[#f5e9cb] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#77613c] shadow-[1px_2px_0_rgba(120,100,70,0.10)] transition-transform duration-200 hover:rotate-0 sm:text-[11px]">
            Field notes
          </span>
        </div>

        <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {highlights.map((highlight, highlightIndex) => (
            <li
              key={`${groupId}-${highlightIndex}`}
              className="flex items-start gap-2.5 text-xs leading-7 text-[#625c50] sm:text-sm"
            >
              <span
                aria-hidden="true"
                className="mt-2.75 size-1.5 shrink-0 rounded-full bg-secondary-accent"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
