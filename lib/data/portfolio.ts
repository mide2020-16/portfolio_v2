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
    role: "Frontend Developer",
    company: "Maekandex Communications",
    date: "2025 — Present",
    type: "Product delivery",
    description:
      "Building responsive web and mobile interfaces across live products including LetsMeet, 9jaBuzz, Pluser Games, LITeGre Prediction and JustJobNG. I ship reusable React/Next.js components, REST API integrations and accessible UI improvements with product teams.",
    accent: "bg-primary-accent",
  },
  {
    role: "Voluntary Intern Software Engineer",
    company: "ICTREC",
    date: "Feb 2025 — Sep 2025",
    type: "University systems",
    description:
      "Maintained campus web portals serving 10,000+ students and staff, diagnosed software and database connectivity issues, supported deployment updates, testing and system stability work.",
    accent: "bg-primary-accent",
  },
  {
    role: "Junior Developer → Frontend Developer",
    company: "Maekandex Communications",
    date: "2024 — 2025",
    type: "Growth path",
    description:
      "Developed frontend features under senior guidance, connected interfaces to APIs, and strengthened delivery habits through debugging, testing, code reviews and Agile collaboration.",
    accent: "bg-secondary-accent",
  },
];

// ─── Projects ────────────────────────────────────────────────
export interface Project {
  title: string;
  slug: string; // used for image folder: public/projects/<slug>/
  description: string;
  caseStudy: string;
  role: string;
  year: string;
  visual: "events" | "voice" | "weather" | "hostel" | "jobs" | "schedule";
  highlights: string[];
  gallery: string[];
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
    title: "Vestry",
    slug: "vestry",
    description:
      "A multi-tenant event and ticketing ecosystem built to make registration, merch and meal selections feel effortless.",
    caseStudy: "Vestry is designed around the moving parts of an event day: discovering an event, selecting a ticket, choosing extras and receiving a clear confirmation. The architecture supports dynamic organiser rules and secure access without losing the calm, mobile-friendly experience attendees need.",
    role: "Product engineer",
    year: "2026",
    visual: "events",
    highlights: ["Multi-organiser architecture", "Secure token flows", "Mobile-first checkout"],
    gallery: ["Event discovery", "Ticket selection", "Attendee confirmation"],
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AWS"],
    demoUrl: "https://vestry-beta.vercel.app/",
    sourceUrl: "#",
    featured: true,
    images: [],
  },
  {
    title: "GANI Hausa Voice Assistant",
    slug: "gani",
    description:
      "A localised voice assistant that brings natural Hausa conversation to an AI experience - a Top 12 Codefest Nigeria 2025 finalist.",
    caseStudy: "GANI turns a high-friction interface into a familiar conversation. I helped shape the path from spoken Hausa input to an LLM response and real-time audio output, with a focus on accessibility and a distinctly local use case.",
    role: "AI interface builder",
    year: "2025",
    visual: "voice",
    highlights: ["Top 12 / Codefest 2025", "Real-time TTS pipeline", "Dialect-aware interaction"],
    gallery: ["Voice prompt", "Conversation state", "Audio response"],
    stack: ["Next.js", "Python", "Flask", "LLM", "Railway"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
    images: [],
  },
  {
    title: "SkyView",
    slug: "sky-view",
    description:
      "A weather and environmental monitor that translates live atmospheric data into a more useful daily outlook.",
    caseStudy: "SkyView began with a simple question: can weather data feel human? The interface pairs a calm visual system with location search, live API data and information that remains readable at a glance across device sizes.",
    role: "Frontend engineer",
    year: "2025",
    visual: "weather",
    highlights: ["Live atmospheric data", "Location-aware forecasts", "Dynamic visual states"],
    gallery: ["Today at a glance", "Location search", "Hourly conditions"],
    stack: ["React", "REST APIs", "Web APIs", "CSS3"],
    demoUrl: "https://my-weather-rho-coral.vercel.app/",
    sourceUrl: "#",
    images: [],
  },
  {
    title: "HostelHub",
    slug: "hostelhub",
    description:
      "A full-stack student accommodation experience that makes searching, filtering and reserving hostel spaces simpler on mobile.",
    caseStudy: "HostelHub focuses on a practical, high-stakes workflow: finding a room without confusing availability or stale information. The mobile-first product brings availability, filters and booking status into one clear flow.",
    role: "Mobile product developer",
    year: "2026",
    visual: "hostel",
    highlights: ["Real-time room status", "Search and filter UX", "Cross-platform mobile flow"],
    gallery: ["Hostel search", "Room details", "Booking status"],
    stack: ["React Native", "Expo", "Django", "Python"],
    demoUrl: "#",
    sourceUrl: "#",
    images: [],
  },
  {
    title: "JustJobNG",
    slug: "justjobng",
    description: "A clearer employment search experience for Nigerian job seekers, from keyword discovery to application tracking.",
    caseStudy: "JustJobNG puts the important work first: helping people locate relevant opportunities and act on them quickly. I focused on a navigable, responsive frontend system that keeps search, categories and the next step in view.",
    role: "Frontend developer",
    year: "2025",
    visual: "jobs",
    highlights: ["Keyword and category search", "Responsive dashboard", "Application tracking"],
    gallery: ["Opportunity feed", "Smart search", "Application timeline"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "REST APIs"],
    demoUrl: "https://www.justjobng.online",
    sourceUrl: "#",
    images: [],
  },
  {
    title: "Kyros",
    slug: "kyros",
    description: "An automated course scheduling system designed to eliminate lecturer, room and timetable conflicts.",
    caseStudy: "Kyros applies algorithmic graph theory to a human scheduling headache. The system models constraints so administrators can generate conflict-free combinations, while the product surface keeps the result understandable for everyday users.",
    role: "Software developer",
    year: "2025",
    visual: "schedule",
    highlights: ["Constraint-satisfaction logic", "Conflict-free schedules", "Admin-friendly workflows"],
    gallery: ["Schedule overview", "Conflict resolution", "Course allocation"],
    stack: ["Next.js", "Node.js", "MongoDB", "Graph Theory"],
    demoUrl: "#",
    sourceUrl: "#",
    images: [],
  },
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
      "React Native",
      "Vite",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend & Data",
    accent: "bg-secondary-accent text-white border-secondary-accent",
    skills: ["REST APIs", "Node.js", "Python", "MongoDB", "PostgreSQL", "Django"],
  },
  {
    title: "Tools",
    accent: "bg-highlight text-foreground border-highlight",
    skills: [
      "Git & GitHub",
      "Expo",
      "Agile / Scrum",
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
  {
    degree: "B.Sc. Software Engineering",
    institution: "Africa Learning University, Nigeria",
    dateRange: "2023 — 2024",
    classification: "Software Engineering Programme",
    classificationAccent: "bg-secondary-accent border-border text-white",
  },
];
