"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ProjectGallery({
  images,
  projectTitle,
  isOpen,
  onClose,
  initialIndex = 0,
}: ProjectGalleryProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
            className="relative w-full max-w-4xl mx-4 bg-[#0d0d0d] border-2 border-border shadow-[8px_8px_0px_0px_var(--primary-accent)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border bg-foreground text-background">
              <div className="flex items-center gap-3">
                <Images className="w-4 h-4" />
                <span className="font-black text-sm uppercase tracking-widest">{projectTitle}</span>
                <span className="text-xs opacity-50 font-bold">
                  {current + 1} / {images.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-background/20 transition-colors rounded"
                aria-label="Close gallery"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image area */}
            <div className="relative h-[60vh] overflow-hidden bg-[#050505] flex items-center justify-center">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring" as const, stiffness: 280, damping: 28 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <Image
                    src={images[current]}
                    alt={`${projectTitle} screenshot ${current + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 900px) 100vw, 900px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border-2 border-border flex items-center justify-center hover:bg-primary-accent hover:text-white transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border-2 border-border flex items-center justify-center hover:bg-primary-accent hover:text-white transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 py-4 border-t-2 border-border bg-[#111]">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`w-2 h-2 border transition-all ${
                      i === current
                        ? "bg-primary-accent border-primary-accent w-6"
                        : "bg-transparent border-[#444] hover:border-[#888]"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
