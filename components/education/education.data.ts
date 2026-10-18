export type Education = {
  degree: string;
  institution: string;
  dateRange: string;
  classification: string;
  classificationAccent: string;
  certificateUrl?: string;
  highlights: string[];
};


export const education: Education[] = [
  {
    degree: "B.Sc. Mathematics",
    institution: "Federal University of Agriculture, Abeokuta",
    dateRange: "2023 — 2026",
    classification: "Second Class Upper | 4.21",
    classificationAccent:
      "bg-highlight/80 border-border text-foreground",

    highlights: [
      "Developed analytical and quantitative reasoning skills through mathematical problem-solving.",
      "Strengthened logical thinking, precision, and the ability to break complex problems into manageable steps.",
      "Built a foundation in mathematical modelling, statistics, and interpreting quantitative information.",
      "Developed independent learning, research, and structured problem-solving skills.",
      "Applied mathematical thinking to understand patterns, evaluate information, and approach technical challenges.",
    ],
  },
  {
    degree: "B.Sc. Software Engineering",
    institution: "Africa Learning University, Nigeria",
    dateRange: "2023 — 2024",
    classification: "Software Engineering Programme",
    classificationAccent:
      "bg-secondary-accent/80 border-border text-white",

    highlights: [
      "Built a foundation in software development concepts and software engineering principles.",
      "Developed an understanding of programming logic, algorithms, and structured problem-solving.",
      "Explored how software applications are designed, developed, tested, and maintained.",
      "Strengthened computational thinking and the ability to approach technical problems systematically.",
      "Developed an interest in building practical digital solutions that address real-world needs.",
    ],
  },
];
