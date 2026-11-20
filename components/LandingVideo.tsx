"use client";

import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";

const Page2: React.FC = () => {
  const cursorRef = useRef<HTMLButtonElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  const [isReelOpen, setIsReelOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      scale: 0,
      duration: 0.3,
    });
  };

  useEffect(() => {
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        scale: 0,
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isReelOpen]);

  const openReel = () => {
    setIsReelOpen(true);
  };

  const closeReel = () => {
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
      fullVideoRef.current.currentTime = 0;
    }

    setIsReelOpen(false);
  };

  useEffect(() => {
    if (!isReelOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeReel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReelOpen]);

  return (
    <>
      <div className="page2 relative h-[59vw] w-full bg-black">
        <div
          className="page2-content relative h-full w-full cursor-pointer lg:cursor-none"
          onClick={openReel}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/assets/reel-short.mp4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {isReelOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black lg:cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={fullVideoRef}
            src="/assets/reel-full.mp4"
            autoPlay
            controls
            playsInline
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <button
        ref={cursorRef}
        type="button"
        onClick={isReelOpen ? closeReel : openReel}
        style={{
          color: "#ffffff",
          background: "transparent",
          border: "none",
          WebkitAppearance: "none",
          outline: "none",
        }}
        className={`fixed left-0 top-0 z-[200] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 whitespace-nowrap appearance-none bg-transparent p-0 font-[Satoshi] text-white shadow-none focus:outline-none focus:ring-0 lg:flex ${
          isReelOpen
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`}
        aria-label={isReelOpen ? "Close reel" : "Play reel"}
      >
        {isReelOpen ? (
          <>
            <span className="text-[16px] font-light leading-none">×</span>

            <span className="text-[11px] font-light tracking-wide text-white">
              Close reel
            </span>
          </>
        ) : (
          <>
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 1.5L10 6L3 10.5V1.5Z" fill="#FFFFFF" />
            </svg>

            <span className="text-[11px] font-light tracking-wide text-white">
              Play reel
            </span>
          </>
        )}
      </button>

      {isReelOpen && (
        <button
          type="button"
          onClick={closeReel}
          className="fixed right-6 top-6 z-[210] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl font-light text-white lg:hidden"
          aria-label="Close reel"
        >
          ×
        </button>
      )}
    </>
  );
};

export default Page2;
