export default function MatrixLogo({
  letters,
  decodedIndices,
}: {
  letters: string[];
  decodedIndices: boolean[];
}) {
  const isComplete =
    letters.length > 0 && letters.every((_, index) => decodedIndices[index]);

  return (
    <span className="inline-flex items-baseline gap-1 select-none whitespace-nowrap overflow-hidden">
      {letters.map((letter, index) => {
        const isDecoded = decodedIndices[index];

        return (
          <span
            key={index}
            className={`inline-block w-auto text-center ${
              isDecoded
                ? "text-foreground dark:text-white font-black"
                : "text-primary-accent opacity-90"
            }`}
            style={{
              transition:
                "color 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease, text-shadow 650ms ease",
              willChange: "color, text-shadow",
            }}
          >
            {letter}
          </span>
        );
      })}

      <span
        aria-hidden="true"
        className="inline-block w-2 h-2 shrink-0 rounded-full bg-primary-accent border border-primary-accent self-end mb-1"
        style={{
          opacity: isComplete ? 1 : 0,
          transform: isComplete
            ? "translate3d(0, 0, 0) scale(1)"
            : "translate3d(-5px, -3px, 0) scale(0.5)",
          transition:
            "opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: isComplete ? "180ms" : "0ms",
          willChange: "transform, opacity",
          pointerEvents: "none",
        }}
      />
    </span>
  );
}
