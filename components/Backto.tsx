"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageAbout: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".heading-word-inner",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".main-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".bottom-left",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".right-content",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".learn-more",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const heading =
    "We turn founders’ visions into remarkable brands by combining strategy, design, and performance marketing, all under one roof. Explore our services.";

  return (
    <section
      ref={sectionRef}
      style={{
        fontFamily: "'Satoshi', sans-serif",
      }}
      className="about-section w-full min-h-screen bg-black text-white px-6 md:px-10 lg:px-[2.65vw] pt-10 md:pt-14 lg:pt-[1.5vw] pb-16"
    >
      <div className="main-heading w-full">
        <h1 className="font-medium text-[9vw] md:text-[6.5vw] lg:text-[4.4vw] leading-[1.06] tracking-[-0.045em]">
          {heading.split(" ").map((word, index) => (
            <span
              key={index}
              className={`inline-block align-top ${
                index === 0 ? "lg:ml-[15vw]" : ""
              }`}
            >
              <span className="heading-word-inner inline-block">
                {word}&nbsp;
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div className="w-full h-[1px] bg-[#393939] mt-16 md:mt-20 lg:mt-[4.2vw]" />

      <div className="bottom-content grid grid-cols-2 w-full pt-7 md:pt-8 lg:pt-[1.6vw] gap-4 sm:gap-5">
        {/* LEFT COLUMN */}
        <div className="bottom-left">
          <h2 className="font-light text-[15px] sm:text-[17px] md:text-[21px] lg:text-[1.35vw] tracking-[-0.04em] leading-[1.2]">
            Tomorrow’s brands, today.
          </h2>
        </div>

        {/* RIGHT COLUMN */}
        <div className="min-w-0 sm:pl-[2vw] lg:pl-[0.5vw] max-w-[430px]">
          <div className="right-content">
            <p className="font-light text-[13px] sm:text-[15px] md:text-[19px] lg:text-[1.3vw] leading-[1.2] tracking-[-0.04em]">
              Since 2013, we have been recognized globally for helping founders
              build market-defining brands.
            </p>
          </div>

          <div className="right-content mt-5 sm:mt-7 md:mt-8">
            <p className="font-light text-[13px] sm:text-[15px] md:text-[19px] lg:text-[1.3vw] leading-[1.2] tracking-[-0.04em]">
              We partner with five clients a year to give each one the focus and
              care they deserve.
            </p>
          </div>

          <div className="learn-more mt-5 sm:mt-7 md:mt-8">
            <a
              href="#about"
              className="inline-flex items-center gap-1 font-light text-[13px] sm:text-[15px] md:text-[19px] lg:text-[1.3vw] underline underline-offset-4 hover:opacity-50 transition-opacity duration-300"
            >
              Learn more↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageAbout;
