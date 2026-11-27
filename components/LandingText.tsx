"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Page1: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  // Load the SVG as inline markup so GSAP can access individual paths
  useEffect(() => {
    const controller = new AbortController();

    const loadLogo = async () => {
      try {
        const response = await fetch("/assets/rejouice-logo.svg", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load Rejouice SVG");
        }

        const svg = await response.text();
        setSvgMarkup(svg);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("SVG loading error:", error);
        }
      }
    };

    loadLogo();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleLoaderComplete = () => {
      setIsLoaderComplete(true);
    };

    window.addEventListener("loader-complete", handleLoaderComplete);

    return () => {
      window.removeEventListener("loader-complete", handleLoaderComplete);
    };
  }, []);

  useLayoutEffect(() => {
    if (!svgMarkup || !sectionRef.current) return;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const letters = Array.from(
        section.querySelectorAll<SVGGraphicsElement>(
          "[data-hero-heading] .letter",
        ),
      );

      if (!letters.length) return;

      // Sort letters from left to right
      const sortedLetters = letters.sort(
        (a, b) =>
          a.getBoundingClientRect().left - b.getBoundingClientRect().left,
      );

      // Keep letters hidden above the heading initially
      gsap.set(sortedLetters, {
        y: -150,
        opacity: 0,
      });

      // Animate letters when the website starts falling
      if (isLoaderComplete) {
        gsap.to(sortedLetters, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: {
            each: 0.09,
            from: "start",
          },
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }
    }, section);

    return () => ctx.revert();
  }, [svgMarkup, isLoaderComplete]);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-navbar-theme="dark"
      className="
        relative
        min-h-[600px]
        h-[93svh]
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* REJOUICE SVG LOGO */}
      <div
        className="
          absolute inset-x-0 top-0
          flex w-full justify-center
          overflow-hidden
          pt-[13vh] sm:pt-[11vh] md:pt-[9vh]
        "
      >
        <div
          data-hero-heading
          className="
            w-[96%]
            [&>svg]:block
            [&>svg]:w-full
            [&>svg]:h-auto
            [&>svg]:overflow-visible
          "
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>

      {/* BOTTOM CONTENT */}
      <div
        className="
          absolute bottom-0 left-0
          flex w-full items-end justify-between
          gap-3
          px-4 pb-[16vh]
          sm:px-6 sm:pb-[8vh]
          md:px-[2.6vw] md:pb-[8vh]
        "
      >
        <div
          className="
            flex gap-5
            [font-family:'Rejouice_Headline']
            text-[11px]
            sm:gap-8 sm:text-[13px]
            md:gap-[4.5vw]
            md:text-[clamp(12px,1vw,16px)]
            font-light leading-[1.3]
            tracking-[-0.02em]
            text-white/90
          "
        >
          <p>
            Strategy, Design,
            <br />
            Performance.
          </p>

          <p>
            Global Creative
            <br />
            &amp; Technology Agency.
          </p>
        </div>

        <div
          className="
            shrink-0
            animate-bounce
            [font-family:'Rejouice_Headline']
            text-[18px]
            font-light
            text-white/90
            sm:text-[20px]
          "
        >
          ↓
        </div>
      </div>
    </section>
  );
};

export default Page1;
