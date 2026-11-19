export const ctaPhrases = [
  "Let's build something great.",
  "Have an idea? Let's bring it to life.",
  "Big ideas deserve bold execution.",
  "Your next big thing starts here.",
  "Let's turn imagination into impact.",
  "Good things happen when we collaborate.",
  "Ready to create something meaningful?",
  "From concept to reality. Let's go.",
  "Let's make something people remember.",
  "Got a challenge? I'm ready to build.",
];

export const phraseAnimations = [
  {
    initial: { opacity: 0, y: 25, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  },
  {
    initial: { opacity: 0, x: -40, rotate: -4 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    exit: { opacity: 0, x: 40, rotate: 4 },
  },
  {
    initial: { opacity: 0, scale: 0.65, rotate: 5 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1.2, rotate: -5 },
  },
  {
    initial: { opacity: 0, y: 35, skewY: 5 },
    animate: { opacity: 1, y: 0, skewY: 0 },
    exit: { opacity: 0, y: -30, skewY: -5 },
  },
  {
    initial: { opacity: 0, scale: 1.3, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
  },
  {
    initial: { opacity: 0, x: 35, rotate: 3 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    exit: { opacity: 0, x: -35, rotate: -3 },
  },
  {
    initial: { opacity: 0, y: 20, scale: 0.8, rotateX: 25 },
    animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    exit: { opacity: 0, y: -20, scale: 0.8, rotateX: -25 },
  },
  {
    initial: { opacity: 0, x: -25, scale: 1.15 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 25, scale: 0.9 },
  },
  {
    initial: { opacity: 0, y: -25, rotate: -3 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: 25, rotate: 3 },
  },
  {
    initial: { opacity: 0, scale: 0.7, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.15, y: -15 },
  },
];