"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLSpanElement>(null);
  const knowRef = useRef<HTMLSpanElement>(null);

  const aboutLineRef = useRef<HTMLSpanElement>(null);
  const knowLineRef = useRef<HTMLSpanElement>(null);

  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(aboutRef.current, { yPercent: 0 });
    gsap.set(knowRef.current, { yPercent: 110 });

    gsap.set(aboutLineRef.current, {
      scaleX: 1,
      transformOrigin: "center center",
    });

    gsap.set(knowLineRef.current, {
      scaleX: 0,
      transformOrigin: "center center",
    });
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

    // Text animation
    tl.to(
      aboutRef.current,
      {
        yPercent: -110,
      },
      0,
    );

    tl.to(
      knowRef.current,
      {
        yPercent: 0,
      },
      0,
    );

    // Underline animation
    tl.to(
      aboutLineRef.current,
      {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      knowLineRef.current,
      {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0.15,
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

    // Text animation
    tl.to(
      knowRef.current,
      {
        yPercent: 110,
      },
      0,
    );

    tl.to(
      aboutRef.current,
      {
        yPercent: 0,
      },
      0,
    );

    // Underline animation
    tl.to(
      knowLineRef.current,
      {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      aboutLineRef.current,
      {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0.15,
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
        className="inline-block cursor-pointer font-[Satoshi] text-[42px] font-light tracking-[-0.045em] text-black md:text-[64px]"
      >
        <span className="grid w-max overflow-hidden leading-[1.15]">
          <span
            ref={aboutRef}
            aria-hidden="true"
            className="col-start-1 row-start-1 inline-block w-fit justify-self-center whitespace-nowrap text-center"
          >
            About Us
            <span
              ref={aboutLineRef}
              className="mt-[2px] block h-[1.5px] w-full origin-center bg-black"
            />
          </span>

          {/* GET TO KNOW US */}
          <span
            ref={knowRef}
            aria-hidden="true"
            className="col-start-1 row-start-1 inline-block w-fit justify-self-center whitespace-nowrap text-center"
          >
            Get to know us
            <span
              ref={knowLineRef}
              className="mt-[2px] block h-[1.5px] w-full origin-center bg-black"
            />
          </span>
        </span>
      </a>
    </section>
  );
};

export default About;
