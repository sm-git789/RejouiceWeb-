
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
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      tl.from(
        ".approach-rule",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

      tl.from(
        ".approach-copy",
        {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[#333333]"
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 300,
      }}
    >
      <div className="px-6 pt-16 pb-20 md:px-12 md:pt-[70px]">

        {/* HEADING */}

        <h2 className="approach-heading mb-[100px] text-[52px] font-[Rejoice] font-light leading-[1.05] tracking-[-0.055em] text-[#222222] md:mb-[135px] md:text-[76px]">
          Our approach.
        </h2>

        {/* TOP DIVIDER */}

        <div className="approach-rule h-px w-full origin-left bg-[#d2d2d2]" />

        {/* FIRST ROW */}

        <div className="grid grid-cols-1 gap-8 py-7 md:grid-cols-2 md:gap-0 md:py-[27px]">

          <div className="approach-copy">
            <p className="max-w-[430px] text-[20px] font-[Rejoice] font-light leading-[1.28] tracking-[-0.035em] md:text-[23px]">
              A simple philosophy:
              <br />
              quality over quantity.
            </p>
          </div>

          <div className="approach-copy">
            <p className="max-w-[430px] font-[Rejoice] text-[20px] font-light leading-[1.28] tracking-[-0.035em] md:text-[23px]">
              We partner with five clients a year to
              deliver unmatched focus, and impact.
              Every detail is carefully crafted, every
              decision strategic, and every outcome
              transformative.
            </p>
          </div>

        </div>

        {/* MIDDLE DIVIDER */}

        <div className="approach-rule h-px w-full origin-left bg-[#d2d2d2]" />

        {/* SECOND ROW */}

        <div className="grid grid-cols-1 gap-8 py-7 md:grid-cols-2 md:gap-0 md:py-[27px]">

          <div className="approach-copy">
            <p className="max-w-[430px] text-[20px] font-light font-[Rejoice] leading-[1.28] tracking-[-0.035em] md:text-[23px]">
              Performance &amp; emotion.
              <br />
              You need both.
            </p>
          </div>

          <div className="approach-copy">
            <p className="max-w-[430px] text-[20px] font-[Rejoice] font-light leading-[1.28] tracking-[-0.035em] md:text-[23px]">
              We craft brands that become category
              leaders. These brands aren’t built on
              products alone. Emotional connection
              and sustainable growth are the two
              essentials to get there. This is how you
              drive retention and advocacy.
            </p>
          </div>

        </div>

        

      </div>
    </section>
  );
};

export default OurApproach;
