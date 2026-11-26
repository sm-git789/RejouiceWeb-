"use client";

import gsap from "gsap";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const Page2: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const mousePosition = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isReelMounted, setIsReelMounted] = useState(false);

  // -----------------------------------
  // CURSOR VISIBILITY
  // -----------------------------------

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

  // -----------------------------------
  // GLOBAL MOUSE MOVEMENT
  // -----------------------------------

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };

      isHovering.current = true;

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      updateCursorVisibility();
    };

    const handleMouseLeaveWindow = () => {
      isHovering.current = false;

      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [isReelMounted]);

  // -----------------------------------
  // INITIAL CURSOR SETUP
  // -----------------------------------

  useLayoutEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, {
      scale: 0,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center",
    });
  }, []);

  // -----------------------------------
  // SCROLL AND RESIZE
  // -----------------------------------

  useEffect(() => {
    const handleUpdate = () => updateCursorVisibility();

    window.addEventListener("scroll", handleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isReelMounted]);

  // -----------------------------------
  // OPEN REEL
  // -----------------------------------

  const openReel = () => {
    if (isReelMounted) return;

    setIsReelMounted(true);
    setIsReelOpen(true);
  };

  // -----------------------------------
  // CLOSE REEL
  // -----------------------------------

  const closeReel = () => {
    if (!isReelMounted || !isReelOpen) return;

    setIsReelOpen(false);
  };

  // -----------------------------------
  // OPEN AND CLOSE GSAP ANIMATION
  // -----------------------------------

  useLayoutEffect(() => {
    if (!isReelMounted) return;

    const frame = frameRef.current;
    const video = modalVideoRef.current;

    if (!frame) return;

    // Kill only the previous animation
    animationRef.current?.kill();

    const isMobile = window.innerWidth < 768;

    const initialWidth = isMobile ? "88vw" : "70vw";
    const initialHeight = "65vh";

    // -----------------------------------
    // OPEN ANIMATION
    // -----------------------------------

    if (isReelOpen) {
      gsap.set(frame, {
        width: initialWidth,
        height: initialHeight,
        rotation: -8,
        scale: 0.85,
        borderRadius: "10px",
        x: 0,
        y: 0,
      });

      const tl = gsap.timeline();

      animationRef.current = tl;

      tl.to(frame, {
        width: "100vw",
        height: "100vh",
        rotation: 0,
        scale: 1,
        borderRadius: "0px",
        duration: 1.5,
        ease: "power4.inOut",
      });

      // Play video
      if (video) {
        video.play().catch(() => {});
      }
    }

    // -----------------------------------
    // CLOSE ANIMATION
    // -----------------------------------
    else {
      const tl = gsap.timeline({
        onComplete: () => {
          // Stop video after closing animation

          if (video) {
            video.pause();
            video.currentTime = 0;
          }

          // Remove modal only after animation completes

          setIsReelMounted(false);
        },
      });

      animationRef.current = tl;

      tl.to(frame, {
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

    // Cleanup this particular timeline only

    return () => {
      tlCleanup();
    };

    function tlCleanup() {
      animationRef.current?.kill();
    }
  }, [isReelOpen, isReelMounted]);

  // -----------------------------------
  // BODY SCROLL LOCK AND ESCAPE KEY
  // -----------------------------------

  useEffect(() => {
    if (!isReelMounted) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.classList.add("reel-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsReelOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.body.classList.remove("reel-open");

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReelMounted]);

  // -----------------------------------
  // RENDER
  // -----------------------------------

  return (
    <>
      {/* VIDEO SECTION */}

      <div className="page2 relative h-[59vw] w-full bg-black">
        <div
          ref={sectionRef}
          className="page2-content relative h-full w-full cursor-pointer lg:cursor-none"
          onClick={openReel}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/assets/reel-short.mp4"
            className="h-full w-full object-cover"
          />

          {/* MOBILE PLAY REEL */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openReel();
            }}
            className="
              absolute bottom-5 left-5 z-30
              flex items-center gap-2
              border-none bg-transparent
              text-sm font-light tracking-wide
              text-white font-[Satoshi]
              md:hidden
            "
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
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            overflow-hidden bg-transparent
            lg:cursor-none
          "
        >
          {/* ANIMATED FRAME */}

          <div
            ref={frameRef}
            className="
              relative flex items-center
              justify-center overflow-hidden
              bg-black
            "
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

      {/* CUSTOM DESKTOP CURSOR */}

      <button
        ref={cursorRef}
        type="button"
        onClick={isReelMounted ? closeReel : openReel}
        style={{
          color: "#ffffff",
          background: "transparent",
          border: "none",
          WebkitAppearance: "none",
          outline: "none",
        }}
        className={`
          fixed left-0 top-0 z-[200]
          hidden lg:flex
          items-center justify-center
          gap-1.5 whitespace-nowrap
          appearance-none bg-transparent
          p-0 font-[Satoshi] text-white
          shadow-none focus:outline-none
          focus:ring-0
          ${
            isReelMounted
              ? "pointer-events-auto cursor-pointer"
              : "pointer-events-none"
          }
        `}
        aria-label={isReelMounted ? "Close reel" : "Play reel"}
      >
        {isReelMounted ? (
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
          className="
            fixed right-5 top-5 z-[300]
            flex items-center justify-center
            border-none bg-transparent
            text-4xl font-light text-white
            cursor-pointer lg:hidden
          "
          aria-label="Close reel"
        >
          ×
        </button>
      )}
    </>
  );
};

export default Page2;
