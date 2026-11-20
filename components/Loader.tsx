
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const callbackRef = useRef(onLoadingComplete);

  
  React.useEffect(() => {
    callbackRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          callbackRef.current();
        },
      });

   
      gsap.set(loader, {
        yPercent: 0,
      });

      tl.fromTo(
        wordRefs.current,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.22,
          ease: "power3.out",
        }
      );

  
      tl.to({}, {
        duration: 0.8,
      });

      tl.to(loader, {
        yPercent: 100,
        duration: 1.4,
        ease: "power4.inOut",
      });

    }, loader);

    return () => ctx.revert();
  }, []);

  const words = ["Tomorrow's", "Brands,", "Today."];

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-white"
    >
    

      <div className="flex items-baseline justify-center gap-2 whitespace-nowrap px-4 font-[Satoshi] text-[clamp(17px,2vw,30px)] font-light tracking-[-0.035em] text-black">

        {words.map((word, index) => (
          <span
            key={word}
            className="inline-block overflow-hidden"
          >
            <span
              ref={(el) => {
                if (el) wordRefs.current[index] = el;
              }}
              className="inline-block"
            >
              {word}
            </span>
          </span>
        ))}

        <sup className="self-start text-[9px] font-normal">
          TM
        </sup>

      </div>
    </div>
  );
};

export default Loader;
