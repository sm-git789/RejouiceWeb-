"use client";

import React from "react";

const Page1: React.FC = () => {
  return (
    <section
      id="home"
      data-navbar-theme="dark"
      className="relative min-h-[600px] h-[93svh] w-full overflow-hidden bg-black text-white"
    >
      {/* Main heading */}
      <div className="absolute left-0 top-0 flex w-full justify-center pt-[9vh] sm:pt-[8vh] md:pt-[7vh]">
        <h1
          className="
            w-full
            px-1 sm:px-[2vw]
            text-center
            font-[Satoshi]
            text-[19vw]
            sm:text-[20vw]
            md:text-[20.5vw]
            font-black
            leading-[0.85]
            sm:leading-[0.78]
            tracking-[-0.075em]
            whitespace-nowrap
            select-none
          "
        >
          REJO<u className="no-underline">U</u>ICE
        </h1>
      </div>

      {/* Bottom content */}
      <div
        className="
          absolute bottom-0 left-0
          flex w-full items-end justify-between
          gap-3
          px-4 pb-[8vh]
sm:px-6 sm:pb-[8vh]
md:px-[2.6vw] md:pb-[8vh]
          
        "
      >
        {/* Description */}
        <div
          className="
            flex gap-5
            font-[Satoshi]
            text-[11px]
            sm:gap-8 sm:text-[13px]
            md:gap-[4.5vw] md:text-[clamp(12px,1vw,16px)]
            font-light
            leading-[1.3]
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

        {/* Scroll indicator */}
        <div className="shrink-0 animate-bounce font-[Satoshi] text-[18px] font-light text-white/90 sm:text-[20px]">
          ↓
        </div>
      </div>
    </section>
  );
};

export default Page1;
