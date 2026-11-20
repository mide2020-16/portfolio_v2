// ─── Personal Info ───────────────────────────────────────────
export const personalInfo = {
  name: "Efuwape Ayomide Oreoluwa",
  shortName: "Ayomide.",
  title: "Software Engineer",
  subtitle: "Frontend Developer",
  bio: "Full-stack software engineer specializing in scalable web systems, clean architecture, and modern web frameworks.",
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
  title: "Efuwape Ayomide Oreoluwa | Software Engineer",

  description:
    "Portfolio of Efuwape Ayomide Oreoluwa, a Nigerian software engineer building scalable web applications, modern frontend experiences, and full-stack digital products.",

  keywords: [
    "Efuwape Ayomide Oreoluwa",
    "Ayomide Efuwape",
    "Ayomide Oreoluwa",
    "Software Engineer Nigeria",
    "Frontend Developer Nigeria",
    "Full Stack Developer Nigeria",
    "React Developer Nigeria",
    "Next.js Developer Nigeria",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer Nigeria",
    "JustJobNG",
    "Codefest 2025",
  ],

  siteUrl: "https://eaoreoluwa.netlify.app",

  ogImage: "/og-image.png",
};

// ─── Achievements ─────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  certificateImage: string;
  summary: string;
}

export const achievements: Achievement[] = [
  {
    id: "codefest-nigeria-2025",
    title: "Codefest Nigeria 2025",
    subtitle: "Top 12 Finalist — GANI Hausa Dialect Voice Assistant",
    certificateImage: "/certificates/cf_cert.jpg",
    summary: "Recognized as a Top 12 finalist for GANI, a Hausa dialect voice assistant. The related project record documents the voice-oriented AI work and custom text-to-speech infrastructure.",
  },
  {
    id: "professional-development-skills",
    title: "Professional Development Skills",
    subtitle: "Participated in the Professional Development Skills from ALX Africa",
    certificateImage: "/certificates/pf_cert.jpg",
    summary: "Participation record for ALX Africa's Professional Development Skills programme.",
  },
  {
    id: "software-engineering-programme",
    title: "Software Engineering",
    subtitle: "Participated in a 12 months Software Engineering Programme from ALX Africa",
    certificateImage: "",
    summary: "Participation record for a 12-month Software Engineering Programme from ALX Africa.",
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
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Mobile",
    accent: "bg-primary-accent text-white border-primary-accent",
    skills: [
      "Expo",
      "TypeScript",
      "React Native",
    ],
  },
  {
    title: "Backend",
    accent: "bg-secondary-accent text-white border-secondary-accent",
    skills: ["Node.js", "Python", "MongoDB", "Django"],
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
