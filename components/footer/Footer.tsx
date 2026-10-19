"use client";

import { FooterBrand } from "./FooterBrand";
import { FooterNavigation } from "./FooterNavigation";
import { FooterConnect } from "./FooterConnect";
import { FooterBottomBar } from "./FooterBottomBar";
import { FooterDecorations } from "./FooterDecorations";

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative isolate overflow-hidden border-t-2 border-border bg-card text-foreground"
    >
      <FooterDecorations />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-10 md:grid-cols-[1.4fr_0.7fr_1fr] md:gap-8 lg:gap-14">
          <FooterBrand />
          <FooterNavigation />
          <FooterConnect />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}