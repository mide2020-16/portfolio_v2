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
        <SplashScreen onFinish={() => setShowSplash(false)} durationMs={2800} />
      )}

      <div
        className={`flex min-h-full flex-col transition-opacity duration-700 ${
          showSplash ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Pass showSplash status to Navbar */}
        <Navbar showSplash={showSplash} />
        <main className="flex-1 md:pt-20 pb-20 md:pb-0">{children}</main>
        <Footer />
      </div>
    </>
  );
}
