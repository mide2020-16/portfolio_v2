/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { testimonials } from "@/data/testimonials.data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const x = useMotionValue(0);

  const [step, setStep] = useState(0);
  const [virtualIndex, setVirtualIndex] = useState(testimonials.length);

  const total = testimonials.length;

  // Measure the distance between consecutive cards.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track || total < 2) return;

    const measure = () => {
      const firstCard = track.children[0] as HTMLElement | undefined;
      const secondCard = track.children[1] as HTMLElement | undefined;

      if (!firstCard || !secondCard) return;

      const distance =
        secondCard.getBoundingClientRect().left -
        firstCard.getBoundingClientRect().left;

      setStep(distance);
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [total]);

  // Start at the first card in the middle copy.
  useLayoutEffect(() => {
    if (!step || !total) return;

    x.set(-step * total);
    setVirtualIndex(total);
  }, [step, total, x]);

  // Move the entire track horizontally.
  const move = useCallback(
    async (direction: -1 | 1) => {
      if (!step || !total || isAnimating.current) return;

      isAnimating.current = true;

      const nextVirtualIndex = virtualIndex + direction;
      const targetX = -step * nextVirtualIndex;

      try {
        const controls = animate(x, targetX, {
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        });

        await controls.finished;

        let nextIndex = nextVirtualIndex;

        // Reset to an equivalent duplicated position
        // after reaching either end of the track.
        if (nextVirtualIndex >= total * 2) {
          nextIndex = total;
        } else if (nextVirtualIndex < total) {
          nextIndex = total * 2 - 1;
        }

        if (nextIndex !== nextVirtualIndex) {
          x.set(-step * nextIndex);
        }

        setVirtualIndex(nextIndex);
      } finally {
        isAnimating.current = false;
      }
    },
    [step, total, virtualIndex, x, reduceMotion],
  );

  const goToNext = () => move(1);
  const goToPrevious = () => move(-1);

  if (!total) return null;

  // Three copies allow the carousel to loop seamlessly.
  const trackTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="relative overflow-hidden bg-work-bg py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionLabel title="Kind words" />

        {/* Horizontal zigzag carousel */}
        <div
          ref={viewportRef}
          className="relative mt-8 overflow-hidden py-4 lg:mt-14 lg:pb-20"
        >
          <motion.div
            ref={trackRef}
            className="flex w-max items-start gap-6 px-1 lg:gap-12 lg:px-0"
            style={{ x }}
          >
            {trackTestimonials.map((testimonial, index) => {
              const position = index % total;
              const isMiddle = position % 2 === 1;

              return (
                <div
                  key={`${testimonial.name}-${index}`}
                  className={[
                    "w-[calc(100vw-3rem)] max-w-95 shrink-0",
                    "lg:w-[calc((min(100vw,1280px)-160px)/3)]",
                    "transition-transform duration-300",
                    isMiddle
                      ? "translate-y-10 rotate-2 lg:translate-y-16"
                      : "-rotate-2",
                  ].join(" ")}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    index={position}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-6 sm:mt-12">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={step === 0}
            aria-label="Check previous testimonials"
            className="group text-left outline-none disabled:cursor-wait"
          >
            <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs sm:tracking-[0.16em]">
              Check the previous
            </span>
          </button>

          <button
            type="button"
            onClick={goToNext}
            disabled={step === 0}
            aria-label="Go to the next testimonials"
            className="group text-right outline-none disabled:cursor-wait"
          >
            <span className="block text-right text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs sm:tracking-[0.16em]">
              Go to the next
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
