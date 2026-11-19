"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const logos = [
  { name: "RIVIAN", image: "/assets/rivianBlack.svg" },
  { name: "ŌURA", image: "/assets/OuraBlack.svg" },
  { name: "MOXION", image: "/assets/MoxionBlack.svg" },
  { name: "8VC", image: "/assets/8VCBlack.svg" },
  { name: "Rappi", image: "/assets/RappiBlack.svg" },
  { name: "HYPERFRAME", image: "/assets/HYPERFRAMEBlack.svg" },
  { name: "OV Loop", image: "/assets/OVLoopBlack.svg" },
  { name: "Proof", image: "/assets/ProofBlack.svg" },
];

const LogoScroll: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-20">
      <div className="w-full overflow-hidden">
        <div ref={trackRef} className="flex w-max flex-nowrap items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 flex-nowrap items-center gap-24 pr-24"
            >
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="flex h-[70px] w-[150px] shrink-0 items-center justify-center"
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="block h-[50px] w-[130px] object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoScroll;
