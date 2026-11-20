/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ProjectPlatform } from "../../types/experience.types";
import { IPhone17Mockup } from "./IPhone17Mockup";
import { MacBookMockup } from "./MacBookMockup";

interface ProjectDeviceStageProps {
  platform: ProjectPlatform;
  desktopScreenshot?: string;
  mobileScreenshot?: string;
  title: string;
  isOpen?: boolean;
}

export function ProjectDeviceStage({
  platform,
  desktopScreenshot,
  mobileScreenshot,
  title,
  isOpen = true,
}: ProjectDeviceStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.35, once: false });

  const [laptopOpen, setLaptopOpen] = useState(isOpen);
  const [phoneUpright, setPhoneUpright] = useState(isOpen);

  useEffect(() => {
    setLaptopOpen(isOpen);
    setPhoneUpright(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setLaptopOpen(false);
      setPhoneUpright(false);
      return;
    }
    setLaptopOpen(inView);
    setPhoneUpright(inView);
  }, [inView, isOpen]);

  return (
    <div
      ref={stageRef}
      className="relative isolate flex min-h-[270px] items-end justify-center overflow-hidden px-3 pt-8 pb-7 sm:min-h-[360px] sm:px-6 sm:pt-10 sm:pb-9 lg:min-h-[405px]">

      {platform === "desktop" && (
        <div className="relative z-10 w-full">
          <MacBookMockup
            screenshot={desktopScreenshot}
            title={title}
            isOpen={laptopOpen}
            onToggle={() => setLaptopOpen((prev) => !prev)}
          />
        </div>
      )}

      {platform === "mobile" && (
        <div className="relative z-10 flex w-[38%] min-w-[105px] max-w-[195px] items-end justify-center sm:w-[28%]">
          <IPhone17Mockup
            screenshot={mobileScreenshot}
            title={title}
            isUpright={phoneUpright}
            onToggle={() => setPhoneUpright((prev) => !prev)}
          />
        </div>
      )}

      {platform === "web" && (
        <div className="relative z-10 flex w-full items-end justify-center">
          <div className="w-[87%] translate-x-[-3%] sm:w-[88%] sm:translate-x-[-4%]">
            <MacBookMockup
              screenshot={desktopScreenshot}
              title={title}
              isOpen={laptopOpen}
              onToggle={() => setLaptopOpen((prev) => !prev)}
            />
          </div>
          <div className="absolute bottom-0 right-[2%] z-20 w-[31%] rotate-[2deg] transition-transform duration-500 sm:right-[4%] sm:w-[25%] sm:hover:rotate-0">
            <IPhone17Mockup
              screenshot={mobileScreenshot}
              title={title}
              isUpright={phoneUpright}
              onToggle={() => setPhoneUpright((prev) => !prev)}
            />
          </div>
        </div>
      )}
    </div>
  );
}