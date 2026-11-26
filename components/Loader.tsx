"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  children?: React.ReactNode;
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ children, onLoadingComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const callbackRef = useRef(onLoadingComplete);

  React.useEffect(() => {
    callbackRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const page = pageRef.current;

    if (!loader || !page) return;

    const ctx = gsap.context(() => {
      // Place the complete website above the viewport
      gsap.set(page, {
        y: () => -window.innerHeight,
        force3D: true,
      });

      // Keep loader visible
      gsap.set(loader, {
        autoAlpha: 1,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          callbackRef.current?.();
        },
      });

      // 1. Loader text animation
      tl.fromTo(
        wordRefs.current,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.22,
          ease: "power3.out",
        },
      );

      // 2. Pause
      tl.to({}, { duration: 0.7 });

      // 3. Hide loader
      tl.to(loader, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // 4. Drop the COMPLETE website into view
      tl.to(page, {
        y: 0,
        duration: 1.8,
        ease: "power4.inOut",
        force3D: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const words = ["Tomorrow's", "Brands,", "Today."];

  return (
    // IMPORTANT: Outer wrapper is WHITE, not black
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* WHITE LOADER */}
      <div
        ref={loaderRef}
        className="
          fixed inset-0
          z-[10002]
          flex items-center justify-center
          bg-white
        "
      >
        <div
          className="
            flex items-baseline justify-center
            gap-2 whitespace-nowrap px-4
            font-[Satoshi]
            text-[clamp(17px,2vw,30px)]
            font-light tracking-[-0.035em]
            text-black
          "
        >
          {words.map((word, index) => (
            <span key={word} className="inline-block overflow-hidden">
              <span
                ref={(el) => {
                  if (el) wordRefs.current[index] = el;
                }}
                className="inline-block"
              >
                {word}
              </span>
            </span>
          ))}

          <sup className="self-start text-[9px] font-normal">TM</sup>
        </div>
      </div>

      {/* ENTIRE WEBSITE MOVES AS ONE UNIT */}
      <div
        ref={pageRef}
        className="
          fixed inset-0
          z-[10001]
          h-screen
          overflow-y-auto
          bg-black
          text-white
        "
        style={{
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Loader;
