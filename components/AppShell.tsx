"use client";

import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} durationMs={2000} />
      )}
      <div
        className={`flex min-h-full flex-col transition-opacity duration-700 ${
          showSplash ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Pass showSplash status to Navbar */}
        <Navbar showSplash={showSplash} />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
