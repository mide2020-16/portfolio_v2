
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: "lime" | "coral" | "ink";
  image?: string;
}

/**
 * Keep feedback here so approved names, titles, and copy can be updated
 * without touching the presentation layer.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Ayomide brings a rare mix of care and momentum to a project. He asks the right questions early, then turns the answers into a polished experience.",
    name: "Odule Ayanfeoluwa",
    role: "Backend Developer",
    initials: "OA",
    accent: "lime",
  },
  {
    quote:
      "Working with Ayomide feels collaborative from start to finish. The implementation is thoughtful, responsive, and always grounded in what the product needs.",
    name: "Grace",
    role: "Product Manager",
    initials: "G",
    accent: "coral",
  },
  {
    quote:
      "He has a strong eye for the details that make an interface feel effortless. Clear communication and dependable delivery made the work a genuine pleasure.",
    name: "Victoria",
    role: "Founder, SMEs services",
    initials: "V",
    accent: "ink",
  },
  {
    quote:
      "Ayomide brings a rare mix of care and momentum to a project. He asks the right questions early, then turns the answers into a polished experience.",
    name: "Mr. Ifeanyi Onovo",
    role: "CEO, Maekandex Comunications",
    initials: "IO",
    accent: "lime",
  },
  {
    quote:
      "Working with Ayomide feels collaborative from start to finish. The implementation is thoughtful, responsive, and always grounded in what the product needs.",
    name: "Tolulope",
    role: "Product Manager / HR",
    initials: "T",
    accent: "coral",
  },
  {
    quote:
      "He has a strong eye for the details that make an interface feel effortless. Clear communication and dependable delivery made the work a genuine pleasure.",
    name: "Olajide",
    role: "Frontend Dev.",
    initials: "O",
    accent: "ink",
  },
]
