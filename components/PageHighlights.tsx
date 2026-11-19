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
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  // SCROLL ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
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
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.15,
        },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.set(previewRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.85,
        opacity: 0,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // MOUSE ENTER
  const handleMouseEnter = () => {
    setIsHovered(true);

    gsap.to(previewRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    // START VIDEO
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play().catch((error) => {
        console.log("Video playback error:", error);
      });
    }
  };

  // MOUSE MOVE - VIDEO AND TEXT FOLLOW CURSOR
  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    const preview = previewRef.current;

    if (!card || !preview) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(preview, {
      x: x,
      y: y,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // MOUSE LEAVE
  const handleMouseLeave = () => {
    setIsHovered(false);

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.out",
    });

    // STOP VIDEO
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // PLAY VIDEO WHEN IT IS READY
  const handleVideoReady = () => {
    if (isHovered) {
      videoRef.current?.play().catch(() => {});
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={handleMouseEnter}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden bg-zinc-900 ${className}`}
    >
      {/* BACKGROUND IMAGE */}
      <img
        ref={imageRef}
        src={image}
        alt={title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* PROJECT LOGO - VISIBLE WHEN CURSOR LEAVES */}
      {/* PROJECT LOGO - BOTTOM OF IMAGE */}
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

      {/* MOUSE FOLLOWING VIDEO + TEXT */}
      <div
        ref={previewRef}
        className="absolute top-0 left-0 z-20 pointer-events-none flex flex-col font-[Satoshi] items-center w-[190px] md:w-[220px]"
      >
        {/* TEXT ABOVE VIDEO */}
        <p className="text-white text-xs md:text-sm font-light mb-0 whitespace-nowrap">
          Case study {title}
        </p>

        {/* VIDEO */}
        <div className="w-full aspect-[4/5] overflow-hidden shadow-2xl bg-black">
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={handleVideoReady}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};



const PageHighlights: React.FC = () => {
  return (
    <section className="w-full bg-black text-white px-4 md:px-10 py-20">

      {/* SECTION HEADER */}
      <div className="flex justify-between items-center mb-8 font-[Satoshi]">
        <h2 className="text-xl md:text-2xl font-light">
          Highlights
        </h2>

        <a
          href="#work"
          className="text-sm md:text-lg font-light hover:opacity-50 transition-opacity"
        >
          See the work ↗
        </a>
      </div>

      {/* FIRST LARGE IMAGE */}
      <ProjectCard
        title="Rivian"
        image="/assets/rivian.avif"
        video="/assets/RivianVideo.mp4"
        logo="/assets/rivian-white.svg"
        className="h-[100vh] md:h-[120vh]"
      />

      {/* TWO SIDE-BY-SIDE IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-5">

        <ProjectCard
          title="Oura Ring"
          image="/assets/Oura.avif"
          video="/assets/Oura-Ring.mp4"
          logo="/assets/oura-logo-white.svg"
          className="h-[90vh] md:h-[110vh]"
        />

        <ProjectCard
          title="Moxion Power"
          image="/assets/Maxion.avif"
          video="/assets/Maxion.mp4"
          logo="/assets/mixion-logo-white.svg"
          className="h-[90vh] md:h-[110vh]"
        />

      </div>
    </section>
  );
};

export default PageHighlights;

