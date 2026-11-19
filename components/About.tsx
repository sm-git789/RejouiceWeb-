
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLSpanElement>(null);
  const knowRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(aboutRef.current, { yPercent: 0 });
    gsap.set(knowRef.current, { yPercent: 110 });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  // HOVER ENTER

  const handleMouseEnter = () => {
    tweenRef.current?.kill();

    const tl = gsap.timeline({
      defaults: {
        duration: 0.55,
        ease: "power3.inOut",
      },
    });

    tl.to(
      aboutRef.current,
      {
        yPercent: -110,
      },
      0
    );

    tl.to(
      knowRef.current,
      {
        yPercent: 0,
      },
      0
    );

    tweenRef.current = tl;
  };

  // HOVER LEAVE

  const handleMouseLeave = () => {
    tweenRef.current?.kill();

    const tl = gsap.timeline({
      defaults: {
        duration: 0.55,
        ease: "power3.inOut",
      },
    });

    tl.to(
      knowRef.current,
      {
        yPercent: 110,
      },
      0
    );

    tl.to(
      aboutRef.current,
      {
        yPercent: 0,
      },
      0
    );

    tweenRef.current = tl;
  };

  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center bg-white">

      <a
        href="/about"
        aria-label="About Us"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group inline-block cursor-pointer font-[Satoshi] text-[42px] font-light tracking-[-0.045em] text-black md:text-[64px]"
      >

        {/* TEXT ANIMATION CONTAINER */}

        <span className="grid overflow-hidden leading-[1.15]">

          {/* DEFAULT TEXT */}

          <span
            ref={aboutRef}
            aria-hidden="true"
            className="col-start-1 row-start-1 whitespace-nowrap border-b-[2px] border-black pb-[2px]"
          >
            About Us
          </span>

          {/* HOVER TEXT */}

          <span
            ref={knowRef}
            aria-hidden="true"
            className="col-start-1 row-start-1 whitespace-nowrap border-b-[2px] border-black pb-[2px]"
          >
            Get to know us
          </span>

        </span>

      </a>

    </section>
  );
};

export default About;
