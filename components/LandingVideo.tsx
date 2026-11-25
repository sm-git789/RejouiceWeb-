"use client";

import gsap from "gsap";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const Page2: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLButtonElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const mousePosition = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isReelMounted, setIsReelMounted] = useState(false);

  // Cursor visibility
  const updateCursorVisibility = () => {
    const cursor = cursorRef.current;
    const target = isReelMounted ? modalRef.current : sectionRef.current;

    if (!cursor || !target) return;

    const rect = target.getBoundingClientRect();
    const { x, y } = mousePosition.current;

    const isInside =
      isHovering.current &&
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom;

    gsap.to(cursor, {
      scale: isInside ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };

    isHovering.current = true;

    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    updateCursorVisibility();
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
    updateCursorVisibility();
  };

  const handleMouseLeave = () => {
    isHovering.current = false;

    gsap.to(cursorRef.current, {
      scale: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // Initial cursor setup
  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    });
  }, []);

  // Scroll and resize
  useEffect(() => {
    const handleScroll = () => updateCursorVisibility();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isReelMounted]);

  // Open reel
  const openReel = () => {
    if (isReelMounted) return;

    setIsReelMounted(true);
    setIsReelOpen(true);
  };

  // Close reel
  const closeReel = () => {
    if (!isReelOpen) return;

    setIsReelOpen(false);
    isHovering.current = false;
  };

  // GSAP opening and closing animation

  // // OPEN ANIMATION
  // useLayoutEffect(() => {
  //   if (!isReelMounted || !isReelOpen) return;

  //   const frame = frameRef.current;
  //   const video = modalVideoRef.current;

  //   if (!frame) return;

  //   const isMobile = window.innerWidth < 768;

  //   const initialWidth = isMobile ? "90vw" : "78vw";
  //   const initialHeight = isMobile ? "75vh" : "78vh";

  //   gsap.set(frame, {
  //     width: initialWidth,
  //     height: initialHeight,
  //     rotation: -8,
  //     scale: 0.85,
  //     borderRadius: "12px",
  //   });

  //   const tl = gsap.timeline();

  //   tl.to(frame, {
  //     width: "100vw",
  //     height: "100vh",
  //     rotation: 0,
  //     scale: 1,
  //     borderRadius: "0px",
  //     duration: 1.4,
  //     ease: "power4.inOut",
  //   });

  //   if (video) {
  //     video.play().catch(() => {});
  //   }
  // }, [isReelMounted]);

  // // CLOSE ANIMATION
  // useLayoutEffect(() => {
  //   if (!isReelMounted || isReelOpen) return;

  //   const frame = frameRef.current;
  //   const video = modalVideoRef.current;
  //   const section = sectionRef.current;

  //   if (!frame || !section) return;

  //   // Get original video section position
  //   const rect = section.getBoundingClientRect();

  //   // Calculate position relative to screen center
  //   const x = rect.left + rect.width / 2 - window.innerWidth / 2;
  //   const y = rect.top + rect.height / 2 - window.innerHeight / 2;

  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       if (video) {
  //         video.pause();
  //         video.currentTime = 0;
  //       }

  //       setIsReelMounted(false);
  //     },
  //   });

  //   tl.to(frame, {
  //     width: rect.width,
  //     height: rect.height,
  //     x: x,
  //     y: y,
  //     rotation: -8,
  //     scale: 0.95,
  //     borderRadius: "8px",
  //     duration: 1.2,
  //     ease: "power4.inOut",
  //   });
  // }, [isReelOpen, isReelMounted]);

  // OPEN AND CLOSE REEL ANIMATION
  useLayoutEffect(() => {
    if (!isReelMounted) return;

    const frame = frameRef.current;
    const video = modalVideoRef.current;

    if (!frame) return;

    // Stop any previous animation
    animationRef.current?.kill();

    const isMobile = window.innerWidth < 768;

    // Initial tilted rectangle dimensions
    const initialWidth = isMobile ? "88vw" : "70vw";
    const initialHeight = isMobile ? "65vh" : "65vh";

    if (isReelOpen) {
      // OPEN: Small tilted rectangle -> Fullscreen

      gsap.set(frame, {
        width: initialWidth,
        height: initialHeight,
        rotation: -8,
        scale: 0.85,
        borderRadius: "10px",
        x: 0,
        y: 0,
      });

      animationRef.current = gsap.timeline();

      animationRef.current.to(frame, {
        width: "100vw",
        height: "100vh",
        rotation: 0,
        scale: 1,
        borderRadius: "0px",
        duration: 1.5,
        ease: "power4.inOut",
      });

      if (video) {
        video.play().catch(() => {});
      }
    } else {
      // CLOSE: Fullscreen -> Small tilted rectangle

      animationRef.current = gsap.timeline({
        onComplete: () => {
          if (video) {
            video.pause();
            video.currentTime = 0;
          }

          setIsReelMounted(false);
        },
      });

      animationRef.current.to(frame, {
        width: initialWidth,
        height: initialHeight,
        rotation: -8,
        scale: 0.85,
        borderRadius: "10px",
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power4.inOut",
      });
    }

    return () => {
      animationRef.current?.kill();
    };
  }, [isReelOpen, isReelMounted]);

  // Lock body scroll, hide navbar and handle Escape key

  useEffect(() => {
    if (!isReelMounted) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.classList.add("reel-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeReel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("reel-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReelMounted]);

  return (
    <>
      {/* VIDEO SECTION */}
      <div className="page2 relative h-[59vw] w-full bg-black">
        <div
          ref={sectionRef}
          className="page2-content relative h-full w-full cursor-pointer lg:cursor-none"
          onClick={openReel}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={fullVideoRef}
            autoPlay
            loop
            muted
            playsInline
            src="/assets/reel-short.mp4"
            className="h-full w-full object-cover"
          />

          {/* MOBILE PLAY REEL TEXT */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openReel();
            }}
            className="absolute bottom-5 left-5 z-30
             flex items-center gap-2
             bg-transparent border-none
             text-white text-sm font-light
             tracking-wide font-[Satoshi]
             md:hidden"
          >
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <path d="M3 1.5L10 6L3 10.5V1.5Z" fill="white" />
            </svg>
            Play reel
          </button>
        </div>
      </div>

      {/* FULLSCREEN REEL */}
      {isReelMounted && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-transparent lg:cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* ANIMATED REEL RECTANGLE */}
          <div
            ref={frameRef}
            className="relative flex items-center justify-center overflow-hidden bg-black"
            style={{
              width: "78vw",
              height: "78vh",
              transformOrigin: "center center",
              willChange: "transform, width, height, border-radius",
            }}
          >
            <video
              ref={modalVideoRef}
              src="/assets/reel-full.mp4"
              autoPlay
              controls
              playsInline
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* CUSTOM CURSOR */}
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
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 1.5L10 6L3 10.5V1.5Z" fill="#FFFFFF" />
            </svg>

            <span className="text-[15px] font-normal tracking-wide text-white">
              Play reel
            </span>
          </>
        )}
      </button>

      {/* MOBILE CLOSE BUTTON */}

      {isReelMounted && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            closeReel();
          }}
          className="fixed right-5 top-5 z-[300]
           flex items-center justify-center
           bg-transparent border-none
           text-4xl font-light text-white
           lg:hidden cursor-pointer"
        >
          ×
        </button>
      )}
    </>
  );
};

export default Page2;
