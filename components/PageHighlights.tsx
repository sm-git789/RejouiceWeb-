"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  image: string;
  video: string;
  logo: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  video,
  logo,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // =====================================
  // SCROLL ANIMATION
  // =====================================

  useEffect(() => {
    const card = cardRef.current;
    const img = imageRef.current;
    const preview = previewRef.current;
    const previewContent = previewContentRef.current;

    if (!card || !img || !preview || !previewContent) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          clipPath: "inset(15% 0% 0% 0%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        img,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Initial preview position
      gsap.set(preview, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
      });

      // Initial preview size and visibility
      gsap.set(previewContent, {
        scale: 0.65,
        autoAlpha: 0,
        transformOrigin: "center center",
      });
    }, card);

    return () => {
      hoveredRef.current = false;
      videoRef.current?.pause();
      ctx.revert();
    };
  }, []);

  // =====================================
  // MOVE PREVIEW WITH MOUSE
  // =====================================

  const movePreview = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const preview = previewRef.current;

    if (!card || !preview) return;

    const rect = card.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const previewWidth = preview.offsetWidth;
    const previewHeight = preview.offsetHeight;

    const padding = 20;

    const x = gsap.utils.clamp(
      previewWidth / 2 + padding,
      card.clientWidth - previewWidth / 2 - padding,
      mouseX,
    );

    const y = gsap.utils.clamp(
      previewHeight / 2 + padding,
      card.clientHeight - previewHeight / 2 - padding,
      mouseY,
    );

    gsap.to(preview, {
      x,
      y,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };
  // =====================================
  // MOUSE ENTER
  // =====================================

  const handleMouseEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;

    hoveredRef.current = true;
    setIsHovered(true);

    movePreview(e);

    // Show and expand preview
    gsap.to(previewContentRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.currentTime = 0;

      videoElement.play().catch((error) => {
        console.log("Video playback error:", error);
      });
    }
  };

  // =====================================
  // MOUSE MOVE
  // =====================================

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (!hoveredRef.current) return;

    movePreview(e);
  };

  // =====================================
  // MOUSE LEAVE
  // =====================================

  const handleMouseLeave = () => {
    hoveredRef.current = false;
    setIsHovered(false);

    // Hide preview
    gsap.to(previewContentRef.current, {
      scale: 0.65,
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Stop video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // =====================================
  // VIDEO READY
  // =====================================

  const handleVideoReady = () => {
    if (hoveredRef.current) {
      videoRef.current?.play().catch(() => {});
    }
  };

  // =====================================
  // JSX
  // =====================================

  return (
    <div
      ref={cardRef}
      onPointerEnter={handleMouseEnter}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden bg-zinc-900 ${className}`}
    >
      {/* Background Image */}

      <img
        ref={imageRef}
        src={image}
        alt={title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Project Logo */}

      <div
        className={`absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center items-center z-10 pointer-events-none transition-all duration-500 ${
          isHovered ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"
        }`}
      >
        <img
          src={logo}
          alt={`${title} logo`}
          className="w-auto h-auto max-w-[130px] md:max-w-[180px] max-h-[55px] md:max-h-[75px] object-contain"
        />
      </div>

      {/* Floating Preview: Title + Video */}

      <div
        ref={previewRef}
        className="absolute top-0 left-0 z-20 pointer-events-none
             w-[220px] md:w-[405px]
             max-w-[calc(100%-40px)]"
      >
        <div
          ref={previewContentRef}
          className="flex flex-col items-center font-[Satoshi] w-full"
        >
          {/* Moving Title */}

          <p className="w-full text-left text-white text-sm md:text-lg font-light mb-2 whitespace-nowrap">
            Case study {title}
          </p>

          {/* Moving Video */}

          <div className="relative w-full aspect-[405/520] overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              src={video}
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={handleVideoReady}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================
// MAIN PAGE HIGHLIGHTS SECTION
// =====================================

const PageHighlights: React.FC = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-10 py-20">
      {/* Heading */}

      <div className="flex justify-between items-center mb-8 font-[Satoshi]">
        <h2 className="text-xl md:text-2xl font-light">Highlights</h2>

        <a
          href="#work"
          className="text-sm md:text-lg font-light hover:opacity-50 transition-opacity"
        >
          See the work ↗
        </a>
      </div>

      {/* PROJECT CARDS */}

      <div
        className="
          flex flex-nowrap gap-3
          overflow-x-auto
          overflow-y-hidden
          snap-x snap-mandatory
          scrollbar-hide
          md:grid md:grid-cols-2
          md:gap-5
          md:overflow-visible
        "
      >
        {/* RIVIAN */}

        <ProjectCard
          title="Rivian"
          image="/assets/rivian.avif"
          video="/assets/RivianVideo.mp4"
          logo="/assets/rivian-white.svg"
          className="h-[40vh] min-w-[85vw] w-[85vw] shrink-0 snap-start md:col-span-2 md:h-[120vh] md:w-full md:min-w-0"
        />

        {/* OURA */}

        <ProjectCard
          title="Oura Ring"
          image="/assets/Oura.avif"
          video="/assets/Oura-Ring.mp4"
          logo="/assets/oura-logo-white.svg"
          className="
            h-[40vh] min-w-[85vw] w-[85vw] shrink-0 snap-start md:h-[110vh] md:w-full md:min-w-0
          "
        />

        {/* MOXION */}

        <ProjectCard
          title="Moxion Power"
          image="/assets/Maxion.avif"
          video="/assets/Maxion.mp4"
          logo="/assets/mixion-logo-white.svg"
          className="
            h-[40vh] min-w-[85vw] w-[85vw] shrink-0 snap-start md:h-[110vh] md:w-full md:min-w-0
          "
        />
      </div>
    </section>
  );
};

export default PageHighlights;
