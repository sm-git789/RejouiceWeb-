"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

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
      // Initial loader visibility
      gsap.set(loader, {
        autoAlpha: 1,
      });

      // Keep the complete website above the viewport
      gsap.set(page, {
        y: -window.innerHeight,
        force3D: true,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(page, {
            clearProps: "transform",
          });

          callbackRef.current?.();
        },
      });

      // Loader text animation
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

      // Hold loader
      tl.to(
        {},
        {
          duration: 0.7,
        },
      );

      // Get individual REJOUICE letters
      const heroLetters =
        page.querySelectorAll<HTMLElement>("[data-hero-letter]");

      // COMPLETE WEBSITE FALLS DOWN
      tl.to(
        page,
        {
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          force3D: true,
        },
        "<",
      );

      // REJOUICE LETTERS FALL ONE BY ONE
      if (heroLetters.length) {
        tl.fromTo(
          heroLetters,
          {
            yPercent: -120,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "<0.1",
        );
      }

      // Fade out loader while website comes down
      tl.to(
        loader,
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      );
    });

    return () => ctx.revert();
  }, []);

  const words = ["Tomorrow's", "Brands,", "Today."];

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* WHITE LOADER */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[10002] flex items-center justify-center bg-white"
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

      <div ref={pageRef} className="relative min-h-screen w-full">
        {children}
      </div>
    </div>
  );
};

export default Loader;
