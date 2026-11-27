"use client";

import React, { useRef } from "react";

const Page1: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const headingLetters = ["R", "E", "J", "O", "U", "I", "C", "E"];

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
      <div
        className="
    absolute inset-x-0 top-0
    flex w-full justify-center
    overflow-hidden
    pt-[13vh] sm:pt-[11vh] md:pt-[9vh]
  "
      >
        <h1
          data-hero-heading
          className="
      w-full
      mx-auto
      box-border
      text-center
      [font-family:'Rejouice_Headline']
      text-[22vw]
      sm:text-[22vw]
      md:text-[22vw]
      font-normal
      leading-[0.85]
      tracking-[0.005em]
      whitespace-nowrap
      select-none
      origin-center
      scale-x-100
    "
        >
          {headingLetters.map((letter, index) => (
            <span
              key={index}
              data-hero-letter
              className="inline-block will-change-transform"
            >
              {letter}
            </span>
          ))}
        </h1>
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
