
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  poster?: string;
}

const PORTFOLIO: React.FC<ScrollVideoProps> = ({
  src,
  poster,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        video,
        {
          scale: 0.75,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 20%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="mx-auto w-full px-6 md:px-12">
        <div
          ref={videoRef}
          className="relative mx-auto aspect-[16/9] w-full overflow-hidden will-change-transform"
        >
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PORTFOLIO;
