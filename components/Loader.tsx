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
      // Website starts above the viewport.
      gsap.set(page, {
        y: "-100%",
        force3D: true,
      });

      // Loader starts visible.
      gsap.set(loader, {
        y: "0%",
        autoAlpha: 1,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          callbackRef.current?.();
        },
      });

      // 1. Animate loading text.
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

      // 2. Small pause.
      tl.to(
        {},
        {
          duration: 0.7,
        },
      );

      // 3. Website drops down from the top.
      tl.to(page, {
        y: "0%",
        duration: 1.5,
        ease: "power4.inOut",
      });

      // 4. Remove loader after the website covers it.
      tl.set(loader, {
        autoAlpha: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  const words = ["Tomorrow's", "Brands,", "Today."];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* LOADING SCREEN */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-white"
      >
        <div className="flex items-baseline justify-center gap-2 whitespace-nowrap px-4 font-[Satoshi] text-[clamp(17px,2vw,30px)] font-light tracking-[-0.035em] text-black">
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

      {/* WEBSITE DROPS DOWN */}
      <div
        ref={pageRef}
        className="fixed inset-0 z-[10001] h-screen overflow-y-auto bg-black text-white"
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
