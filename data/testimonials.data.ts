
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
    name: "Project collaborator",
    role: "Product team",
    initials: "PC",
    accent: "lime",
  },
  {
    quote:
      "Working with Ayomide feels collaborative from start to finish. The implementation is thoughtful, responsive, and always grounded in what the product needs.",
    name: "Engineering teammate",
    role: "Software team",
    initials: "ET",
    accent: "coral",
  },
  {
    quote:
      "He has a strong eye for the details that make an interface feel effortless. Clear communication and dependable delivery made the work a genuine pleasure.",
    name: "Creative partner",
    role: "Digital product",
    initials: "CP",
    accent: "ink",
  },
  {
    quote:
      "Ayomide brings a rare mix of care and momentum to a project. He asks the right questions early, then turns the answers into a polished experience.",
    name: "Project collaborator",
    role: "Product team",
    initials: "PC",
    accent: "lime",
  },
  {
    quote:
      "Working with Ayomide feels collaborative from start to finish. The implementation is thoughtful, responsive, and always grounded in what the product needs.",
    name: "Engineering teammate",
    role: "Software team",
    initials: "ET",
    accent: "coral",
  },
  {
    quote:
      "He has a strong eye for the details that make an interface feel effortless. Clear communication and dependable delivery made the work a genuine pleasure.",
    name: "Creative partner",
    role: "Digital product",
    initials: "CP",
    accent: "ink",
  },
  {
    quote:
      "Ayomide brings a rare mix of care and momentum to a project. He asks the right questions early, then turns the answers into a polished experience.",
    name: "Project collaborator",
    role: "Product team",
    initials: "PC",
    accent: "lime",
  },
  {
    quote:
      "Working with Ayomide feels collaborative from start to finish. The implementation is thoughtful, responsive, and always grounded in what the product needs.",
    name: "Engineering teammate",
    role: "Software team",
    initials: "ET",
    accent: "coral",
  },
  {
    quote:
      "He has a strong eye for the details that make an interface feel effortless. Clear communication and dependable delivery made the work a genuine pleasure.",
    name: "Creative partner",
    role: "Digital product",
    initials: "CP",
    accent: "ink",
  },
];
