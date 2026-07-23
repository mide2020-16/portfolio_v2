// ============================================================
//  🎯  PORTFOLIO DATA  — Edit everything here!
//  All sections of the site pull from this single file.
// ============================================================

// ─── Personal Info ───────────────────────────────────────────
export const personalInfo = {
  name: "Efuwape Ayomide Oreoluwa",
  shortName: "Ayomide",
  title: "Software Engineer",
  subtitle: "Frontend Engineer & Developer",
  bio: "I am a results-driven Software Engineer focused on building scalable, high-performance web applications using clean architecture and modern frameworks. I am also a mathematician with a strong understanding of algorithms and data structures.",
  email: "efuwapeayomide51@gmail.com",
  location: "Nigeria",
  available: true,

  /** Numbers shown in the Hero stats row */
  stats: [
    { value: "4+", label: "Years Coding", accent: false },
    { value: "10+", label: "Projects Built", accent: false },
    { value: "Top 12", label: "Codefest 2025", accent: true },
  ],

  /** Social links shown in Contact section */
  socials: [
    {
      id: "github",
      label: "GitHub",
      username: "mide2020-16",
      url: "https://github.com/mide2020-16",
      hoverClass: "hover:bg-primary-accent hover:text-white",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      username: "efuwapeayomide",
      url: "https://linkedin.com/in/efuwapeayomide",
      hoverClass: "hover:bg-secondary-accent hover:text-white",
    },
    {
      id: "twitter",
      label: "X / Twitter",
      username: "@westfiree",
      url: "https://x.com/westfiree",
      hoverClass: "hover:bg-highlight hover:text-foreground",
    },
  ],
};

// ─── SEO ─────────────────────────────────────────────────────
export const seo = {
  /** Used in <title> and og:title */
  title: "Efuwape Ayomide Oreoluwa | Software Engineer & Frontend Developer",
  /** Used in meta description and og:description */
  description:
    "Portfolio of Efuwape Ayomide Oreoluwa — a Software Engineer specialising in React, Next.js, and TypeScript. Top 12 Finalist at Codefest Nigeria 2025. B.Sc. Mathematics (2nd Class Upper), Federal University of Agriculture, Abeokuta.",
  /** Keywords for search engine visibility */
  keywords: [
    "Efuwape Ayomide",
    "Ayomide Oreoluwa",
    "Efuwape Ayomide Oreoluwa",
    "Software Engineer Nigeria",
    "Frontend Engineer Nigeria",
    "React Developer Nigeria",
    "Next.js Developer",
    "TypeScript Developer",
    "Codefest Nigeria 2025",
    "GANI Voice Assistant",
    "FUNAAB developer",
    "JustJobNG",
    "Hausa AI voice assistant",
  ],
  /** Your live domain — update when deployed */
  siteUrl: "https://eaoreoluwa.netlify.app",
  /** 1200×630 image for social sharing — place at public/og-image.png */
  ogImage: "/og-image.png",
};

// ─── Contact Form ─────────────────────────────────────────────
export const contactConfig = {
  formspreeId: "xlgqwdqq",
};

// ─── Hero IDE Code Panel ──────────────────────────────────────
/**
 * The code shown inside the IDE widget on the Hero section.
 * Each line is an array of { text, color } tokens for syntax highlighting.
 */
export const codePanelSnippet = {
  filename: "developer.ts",
  /** Language label in the IDE status bar */
  language: "TypeScript",
  /** Decorative second tab (greyed out) */
  secondTab: "projects.ts",
  lines: [
    [
      { text: "interface", color: "#ff2d78" },
      { text: " Developer ", color: "#5c6dff" },
      { text: "{", color: "#f5f5f5" },
    ],
    [
      { text: "  name:", color: "#f5f5f5" },
      { text: " string", color: "#ff2d78" },
      { text: ";", color: "#f5f5f5" },
    ],
    [
      { text: "  stack:", color: "#f5f5f5" },
      { text: " string", color: "#ff2d78" },
      { text: "[];", color: "#f5f5f5" },
    ],
    [
      { text: "  available:", color: "#f5f5f5" },
      { text: " boolean", color: "#ff2d78" },
      { text: ";", color: "#f5f5f5" },
    ],
    [{ text: "}", color: "#f5f5f5" }],
    [],
    [
      { text: "const", color: "#ff2d78" },
      { text: " me", color: "#5c6dff" },
      { text: ":", color: "#f5f5f5" },
      { text: " Developer", color: "#5c6dff" },
      { text: " = {", color: "#f5f5f5" },
    ],
    [
      { text: "  name:", color: "#f5f5f5" },
      { text: ' "Ayomide"', color: "#ffe600" },
      { text: ",", color: "#f5f5f5" },
    ],
    [
      { text: "  stack:", color: "#f5f5f5" },
      { text: " [", color: "#f5f5f5" },
    ],
    [
      { text: '    "React"', color: "#ffe600" },
      { text: ",", color: "#f5f5f5" },
      { text: ' "Next.js"', color: "#ffe600" },
      { text: ",", color: "#f5f5f5" },
    ],
    [
      { text: '    "TypeScript"', color: "#ffe600" },
      { text: ",", color: "#f5f5f5" },
    ],
    [
      { text: "  ]", color: "#f5f5f5" },
      { text: ",", color: "#f5f5f5" },
    ],
    [
      { text: "  available:", color: "#f5f5f5" },
      { text: " true", color: "#4ade80" },
      { text: ",", color: "#f5f5f5" },
    ],
    [{ text: "};", color: "#f5f5f5" }],
  ],
};

// ─── Achievements ─────────────────────────────────────────────
export interface Achievement {
  title: string;
  subtitle: string;
  badge: string;
  /**
   * Path to a certificate image (relative to /public).
   * e.g. "/certificates/codefest-2025.png"
   * Leave as "" if you don't have the image yet.
   */
  certificateImage: string;
}

export const achievements: Achievement[] = [
  {
    title: "Codefest Nigeria 2025",
    subtitle: "Top 12 Finalist — GANI Hausa Dialect Voice Assistant",
    badge: "🏆 Achievement Unlocked",
    certificateImage: "/certificates/cf_cert.jpg",
  },
  {
    title: "Professional Development Skills",
    subtitle: "Participated in the Professional Development Skills from ALX Africa",
    badge: "🏆 Achievement Unlocked",
    certificateImage: "/certificates/pf_cert.jpg",
  },
    {
    title: "Software Engineering",
    subtitle: "Participated in a 12 months Software Engineering Programme form ALX Africa",
    badge: "🏆 Achievement Unlocked",
    certificateImage: "",
  },
];

// ─── Experience ───────────────────────────────────────────────
export interface Experience {
  role: string;
  company: string;
  date: string;
  type: string;
  description: string;
  accent: string;
}

export const experiences: Experience[] = [
  {
    role: "Front-end Developer Intern",
    company: "Maekandex Communications",
    date: "Jun 2026 — Present",
    type: "Contract",
    description:
      "Developing robust data tracking architectures and managing external team resources. Collaborating on system design for improved data analysis.",
    accent: "bg-primary-accent",
  },
  {
    role: "Mathematics and Computer Science Intern",
    company: "ICTREC",
    date: "Feb 2025 — Aug 2025",
    type: "Contract",
    description:
      "Developing robust data tracking architectures and managing external team resources. Collaborating on system design for improved data analysis.",
    accent: "bg-primary-accent",
  },
  {
    role: "Member of Google Develloper Student Club (GDSC) Funaab",
    company: "Federal University of Agriculture, Abeokuta",
    date: "Aug 2024 — June 2026",
    type: "Part-time",
    description:
      "Collaborated on student portal optimisations and interface refinements to improve user engagement and accessibility.",
    accent: "bg-secondary-accent",
  },
];

// ─── Projects ────────────────────────────────────────────────
export interface Project {
  title: string;
  slug: string; // used for image folder: public/projects/<slug>/
  description: string;
  stack: string[];
  demoUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  /**
   * Array of image paths relative to /public.
   * Place screenshots at public/projects/<slug>/1.png, 2.png etc.
   * The gallery button only appears when images.length > 0.
   */
  images: string[];
}

export const projects: Project[] = [
  {
    title: "JustJobNG",
    slug: "justjobng",
    description:
      "A modern job platform connecting talents with opportunities. Features a robust navbar/profile menu system, unified design tokens, and smooth Lottie animated wordmarks for enhanced branding for Maekandex Communications.",
    stack: ["React", "Next.js", "Tailwind CSS", "Lottie"],
    demoUrl: "https://jobng-five.vercel.app/",
    sourceUrl: "#",
    featured: true,
    images: [
      // "/projects/justjobng/1.png",
      // "/projects/justjobng/2.png",
    ],
  },
  {
    title: "GANI Hausa Voice Assistant",
    slug: "gani",
    description:
      "An AI-powered voice assistant specifically tailored for the Hausa dialect. This project placed in the Top 12 Finalists at Codefest Nigeria 2025, demonstrating strong integration of AI with localised linguistic needs.",
    stack: ["Python", "AI", "NLP", "APIs"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
    images: [
      // "/projects/gani/1.png",
    ],
  },
  {
    title: "SkyView",
    slug: "sky-view",
    description:
      "A beautiful weather application featuring dynamic Lottie backgrounds, full theming system, and real-time data powered by the OpenWeatherMap API.",
    stack: ["Next.js 15", "TypeScript", "Tailwind v4", "OpenWeatherMap"],
    demoUrl: "https://my-weather-rho-coral.vercel.app/",
    sourceUrl: "#",
    images: [],
  },
  {
    title: "Vestry",
    slug: "vestry",
    description:
      "A modern ticketting website built for student fellowhips events. It is an applicaton where people can get ticket for events and also get merch while selecting meal wanted meal before the event. It make use of manual bank tranfer and also paystack medium",
    stack: ["Next.js 15", "TypeScript", "Tailwind v4", "OpenWeatherMap"],
    demoUrl: "https://vestry-beta.vercel.app/",
    sourceUrl: "#",
    images: [],
  },
  // {
  //   title: "Bible Reading Reminder App",
  //   slug: "bible-app",
  //   description:
  //     "A comprehensive 365-day reading plan app with automated notifications and alarm scheduling, helping users maintain their daily reading habits.",
  //   stack: ["Expo", "React Native", "TypeScript", "Local Notifications"],
  //   demoUrl: "https://vestry-beta.vercel.app/",
  //   sourceUrl: "#",
  //   images: [],
  // },
];

// ─── Skills ───────────────────────────────────────────────────
export interface SkillCategory {
  title: string;
  accent: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    accent: "bg-primary-accent text-white border-primary-accent",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend & Data",
    accent: "bg-secondary-accent text-white border-secondary-accent",
    skills: ["REST APIs", "Python", "Data Analysis", "SPSS", "Excel"],
  },
  {
    title: "Tools",
    accent: "bg-highlight text-foreground border-highlight",
    skills: [
      "Git & GitHub",
      "Expo (React Native)",
      "Lottie",
      "Vercel",
      "Figma",
      "Google Console",
    ],
  },
];

// ─── Education ───────────────────────────────────────────────
export interface Education {
  degree: string;
  institution: string;
  dateRange: string;
  classification: string;
  classificationAccent: string;
}

export const education: Education[] = [
  {
    degree: "B.Sc. Mathematics",
    institution: "Federal University of Agriculture, Abeokuta",
    dateRange: "2023 — 2026",
    classification: "Second Class Upper | 4.21",
    classificationAccent: "bg-highlight border-border text-foreground",
  },
];
