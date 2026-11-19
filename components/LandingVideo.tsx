
"use client";

import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";

const Page2: React.FC = () => {
  const cursorRef = useRef<HTMLButtonElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  const [isReelOpen, setIsReelOpen] = useState(false);

  // ---------------- CURSOR MOVEMENT ----------------

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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

  // ---------------- INITIAL CURSOR ----------------

  useEffect(() => {
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        scale: 0,
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, []);

  // ---------------- CHANGE CURSOR ON REEL OPEN ----------------

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isReelOpen]);

  // ---------------- OPEN REEL ----------------

  const openReel = () => {
    setIsReelOpen(true);
  };

  // ---------------- CLOSE REEL ----------------

  const closeReel = () => {
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
      fullVideoRef.current.currentTime = 0;
    }

    setIsReelOpen(false);
  };

  // ---------------- ESCAPE KEY ----------------

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
      {/* ---------------- PAGE 2 ---------------- */}

      <div className="page2 relative h-[59vw] w-full bg-black">

        {/* BACKGROUND VIDEO */}

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

      {/* ---------------- FULLSCREEN REEL ---------------- */}

      {isReelOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black lg:cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          {/* FULLSCREEN VIDEO */}

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


{/* ---------------- CUSTOM PLAY / CLOSE CURSOR ---------------- */}


{/* CUSTOM PLAY / CLOSE CURSOR */}

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
      <span className="text-[16px] font-light leading-none">
        ×
      </span>

      <span className="text-[11px] font-light tracking-wide text-white">
        Close reel
      </span>
    </>
  ) : (
    <>
      {/* White SVG Play Icon */}

      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 1.5L10 6L3 10.5V1.5Z"
          fill="#FFFFFF"
        />
      </svg>

      <span className="text-[11px] font-light tracking-wide text-white">
        Play reel
      </span>
    </>
  )}
</button>




      {/* MOBILE CLOSE BUTTON */}

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
