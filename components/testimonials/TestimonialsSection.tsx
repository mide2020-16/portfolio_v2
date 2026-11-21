import { MessageCircleHeart } from "lucide-react";
import { testimonials } from "@/data/testimonials.data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="relative overflow-hidden border-y-2 border-border bg-work-bg py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full border border-foreground/10 sm:-right-24 sm:size-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-8 size-40 rounded-full border border-foreground/[0.07] sm:right-24"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-full">
            <SectionLabel title="Kind words" />
          </div>
        </div>

        <div className="grid gap-5 grid-rows-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}_${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
