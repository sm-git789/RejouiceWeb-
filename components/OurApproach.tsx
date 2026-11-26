"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurApproach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".approach-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        ".approach-rule",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=0.5",
      );

      tl.from(
        ".approach-copy",
        {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-[#333333]"
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 300,
      }}
    >
      <div className="px-4 pt-2 pb-2 md:px-12 md:pt-[70px] md:pb-20">
        {/* Heading */}
        <h2 className="approach-heading mb-6 text-[28px] font-[Rejoice] font-light leading-[1.05] tracking-[-0.055em] text-[#222222] md:mb-[135px] md:text-[76px]">
          Our approach.
        </h2>

        {/* First horizontal line */}
        <div className="approach-rule h-px w-full origin-left bg-[#d2d2d2]" />

        {/* First row */}
        <div className="grid grid-cols-[1fr_1fr] gap-4 py-3 md:py-[27px] md:grid-cols-2 md:gap-0 md:py-[27px]">
          <div className="approach-copy">
            <p className="max-w-[430px] text-[14px] font-[Rejoice] font-light leading-[1.08] tracking-[-0.035em] md:text-[23px] md:leading-[1.28]">
              A simple philosophy:
              <br />
              quality over quantity.
            </p>
          </div>

          <div className="approach-copy">
            <p className="max-w-[430px] text-[14px] font-[Rejoice] font-light leading-[1.08] tracking-[-0.035em] md:text-[23px] md:leading-[1.28]">
              We partner with five clients a year to deliver unmatched focus,
              and impact. Every detail is carefully crafted, every decision
              strategic, and every outcome transformative.
            </p>
          </div>
        </div>

        {/* Second horizontal line */}
        <div className="approach-rule h-px w-full origin-left bg-[#d2d2d2]" />

        {/* Second row */}
        <div className="grid grid-cols-[1fr_1fr] gap-4 py-3 md:py-[27px] md:grid-cols-2 md:gap-0 md:py-[27px]">
          <div className="approach-copy">
            <p className="max-w-[430px] text-[14px] font-[Rejoice] font-light leading-[1.08] tracking-[-0.035em] md:text-[23px] md:leading-[1.28]">
              Performance &amp; emotion.
              <br />
              You need both.
            </p>
          </div>

          <div className="approach-copy">
            <p className="max-w-[430px] text-[14px] font-[Rejoice] font-light leading-[1.08] tracking-[-0.035em] md:text-[23px] md:leading-[1.28]">
              We craft brands that become category leaders. These brands aren’t
              built on products alone. Emotional connection and sustainable
              growth are the two essentials to get there. This is how you drive
              retention and advocacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
