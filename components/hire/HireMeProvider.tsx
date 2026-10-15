"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { HireMeModal } from "@/components/hire/HireMeModal";

type HireMeContextType = {
  openHireMe: () => void;
};

const HireMeContext = createContext<HireMeContextType | null>(null);

export function HireMeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openHireMe = useCallback(() => {
    setOpen(true);
  }, []);

  const closeHireMe = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <HireMeContext.Provider value={{ openHireMe }}>
      {children}
      <HireMeModal open={open} onClose={closeHireMe} />
    </HireMeContext.Provider>
  );
}

export function useHireMe() {
  const context = useContext(HireMeContext);

  if (!context) {
    throw new Error("useHireMe must be used inside HireMeProvider");
  }

  return context;
}
