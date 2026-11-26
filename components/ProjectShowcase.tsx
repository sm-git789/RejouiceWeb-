"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brandLogos = [
  "/assets/oura-logo-white.svg",
  "/assets/rappi-white.svg",
  "/assets/tenzr.svg",
  "/assets/mixion-logo-white.svg",
  "/assets/rivian-white.svg",
  "/assets/hyperframe-white.svg",
];

const awardLogos = [
  "/assets/fwa-logo.svg",
  "/assets/Awwards.svg",
  "/assets/Behance.svg",
  "/assets/Webby-Awards.svg",
];

// =====================================
// ROTATING LOGOS
// =====================================

function RotatingLogos({ logos }: { logos: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % logos.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [logos]);

  return (
    <div className="flex h-10 w-full items-center justify-end">
      <img
        key={active}
        src={logos[active]}
        alt="Brand logo"
        className="h-7 w-24 object-contain sm:h-8 sm:w-28"
        style={{ animation: "logoFade 0.5s ease" }}
      />
    </div>
  );
}

// =====================================
// LIVE CLOCK
// =====================================

function LiveClock() {
  const [now, setNow] = useState<Date>(new Date());
  const [handTime, setHandTime] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      setHandTime(null);
      return;
    }

    let animationFrame: number;

    const updateHands = () => {
      setHandTime(new Date());
      animationFrame = requestAnimationFrame(updateHands);
    };

    updateHands();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isHovered]);

  const getTime = (timezone: string) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
      .format(now)
      .replace(/\s/g, "");

  const milliseconds = handTime ? handTime.getMilliseconds() : 0;

  const seconds = handTime ? handTime.getSeconds() + milliseconds / 1000 : 0;

  const minutes = handTime ? handTime.getMinutes() + seconds / 60 : 0;

  const hours = handTime ? (handTime.getHours() % 12) + minutes / 60 : 0;

  const secondRotation = seconds * 6;
  const minuteRotation = minutes * 6;
  const hourRotation = hours * 30;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex h-full w-full flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-4 text-black sm:p-7 md:p-10"
    >
      {/* OFFICE DETAILS */}

      <div className="flex justify-between gap-2 font-[Satoshi] text-[12px] leading-[1.5] sm:text-[14px] md:text-[16px]">
        <div>
          <p className="mb-1 text-black">2 Offices</p>
          <p className="text-black/45">San Diego, USA</p>
          <p className="text-black/45">Paris, France</p>
        </div>

        <div className="text-right tabular-nums whitespace-nowrap text-black/45">
          <p>{getTime("America/Los_Angeles")}</p>
          <p>{getTime("Europe/Paris")}</p>
        </div>
      </div>

      {/* ANALOG CLOCK */}

      <div className="flex flex-1 items-center justify-center">
        <div className="relative h-[190px] w-[190px] rounded-full sm:h-[230px] sm:w-[230px] md:h-[260px] md:w-[260px]">
          {/* 60 CLOCK MARKS */}

          {Array.from({ length: 60 }).map((_, i) => {
            const isMajor = i % 15 === 0;
            const isMedium = i % 5 === 0;

            return (
              <div
                key={i}
                className={`absolute left-1/2 top-1/2 origin-bottom ${
                  isMajor
                    ? "h-[24px] w-[1.5px] bg-black/55"
                    : isMedium
                      ? "h-[17px] w-px bg-black/35"
                      : "h-[12px] w-px bg-black/25"
                }`}
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 6}deg) translateY(-128px)`,
                }}
              />
            );
          })}

          {/* HOUR HAND */}

          <div
            className="absolute left-1/2 top-1/2 h-[45px] w-[2px] origin-bottom rounded-full bg-black/75"
            style={{
              transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
            }}
          />

          {/* MINUTE HAND */}

          <div
            className="absolute left-1/2 top-1/2 h-[72px] w-[1.5px] origin-bottom rounded-full bg-black/80"
            style={{
              transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
            }}
          />

          {/* SECOND HAND */}

          <div
            className="absolute left-1/2 top-1/2 h-[95px] w-[1px] origin-bottom bg-black/65"
            style={{
              transform: `translate(-50%, -100%) rotate(${secondRotation}deg)`,
            }}
          />

          {/* CENTER DOT */}

          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

// =====================================
// PERCENTAGE CARD
// =====================================

function PercentageCard() {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const valueRef = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const startCounter = () => {
    tweenRef.current?.kill();

    valueRef.current.value = 0;
    setPercentage(0);
    setIsVisible(true);

    tweenRef.current = gsap.to(valueRef.current, {
      value: 150,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setPercentage(Math.round(valueRef.current.value));
      },
      onComplete: () => setPercentage(150),
    });
  };

  const resetCounter = () => {
    tweenRef.current?.kill();
    valueRef.current.value = 0;
    setPercentage(0);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <div
      onMouseEnter={startCounter}
      onMouseLeave={resetCounter}
      onTouchStart={startCounter}
      className="flex h-full w-full flex-col justify-between bg-[#f5f5f3] p-4 text-black sm:p-7"
    >
      <div>
        <h3 className="text-[13px] font-normal sm:text-[14px]">Driving 150%</h3>

        <p className="text-[12px] text-black/50 sm:text-[13px]">
          LTV:CAC in average
        </p>
      </div>

      <div className="flex justify-end">
        {isVisible && (
          <span className="text-[28px] font-normal tabular-nums sm:text-[32px]">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}

// =====================================
// INDUSTRIES
// =====================================

const industries = [
  "Finance",
  "Ecommerce",
  "BioTech",
  "Automotive",
  "HealthCare",
  "Real Estate",
  "Fashion",
  "Energy",
  "Retail",
  "Manufacturing",
  "Software",
  "Consumer Goods",
  "Transportation",
  "Hospitality",
  "Defense",
  "Logistics",
  "Technology",
];

// =====================================
// OURA CARD
// =====================================

function OuraCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % industries.length);
    }, 1400);

    return () => window.clearInterval(interval);
  }, []);

  const visibleIndustries = Array.from(
    { length: 3 },
    (_, i) => industries[(active + i) % industries.length],
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src="/assets/Oura-ring-img.avif"
        alt="Oura smart ring"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute left-4 top-4 z-10 w-[85%] sm:left-6 sm:top-6">
        <div className="flex flex-col gap-2">
          {visibleIndustries.map((industry, index) => (
            <div
              key={`${industry}-${active}`}
              className="text-[12px] font-light tracking-wide text-white sm:text-[13px]"
              style={{
                animation: "industryFade 0.6s ease both",
                opacity: index === 0 ? 1 : 0.6,
              }}
            >
              {industry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================
// PROJECT SHOWCASE
// =====================================

const ProjectShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // =====================================
  // GSAP CARD ENTRANCE ANIMATION
  // =====================================

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate only the original cards
      const firstSet = trackRef.current?.children[0] as HTMLElement | undefined;

      if (!firstSet) return;

      const cards = firstSet.querySelectorAll(".showcase-card");

      // Set initial state
      gsap.set(cards, {
        y: 80,
        autoAlpha: 0,
      });

      // Animate when section enters viewport
      gsap.to(cards, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
          // markers: true, // Enable temporarily for debugging
        },
      });
    }, section);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let tween: gsap.core.Tween | null = null;
    let isHovering = false;

    const createAnimation = () => {
      const firstSet = track.children[0] as HTMLElement;

      if (!firstSet) return;

      const distance = firstSet.getBoundingClientRect().width;

      if (!distance) return;

      // Preserve current animation progress
      const progress = tween?.progress() ?? 0;

      // Remove previous animation
      tween?.kill();

      // Create one infinite animation
      tween = gsap.to(track, {
        x: -distance,
        duration: 45,
        ease: "none",
        repeat: -1,
      });

      tween.progress(progress);

      // Pause if mouse is already hovering
      if (isHovering) {
        tween.pause();
      }

      tweenRef.current = tween;
    };

    createAnimation();

    // Recalculate when card dimensions change
    const observer = new ResizeObserver(() => {
      createAnimation();
    });

    observer.observe(track);

    // Cleanup
    return () => {
      observer.disconnect();
      tween?.kill();
      tweenRef.current = null;
    };
  }, []);

  // =====================================
  // PAUSE AND RESUME
  // =====================================

  const pauseAnimation = () => tweenRef.current?.pause();

  const resumeAnimation = () => tweenRef.current?.resume();

  // =====================================
  // CARD SIZES
  // =====================================

  const tallCard =
    "h-[320px] w-[82vw] max-w-[455px] sm:h-[380px] sm:w-[400px] md:h-[450px] md:w-[455px]";

  const shortCard =
    "h-[250px] w-[82vw] max-w-[400px] sm:h-[280px] sm:w-[350px] md:h-[300px] md:w-[400px]";

  // =====================================
  // ALL 9 SHOWCASE CARDS
  // =====================================

  const cards = (
    <>
      {/* CARD 1 - E-COMMERCE */}

      <div
        className={`showcase-card ${tallCard} shrink-0 overflow-hidden rounded-[3px]`}
      >
        <div className="relative h-full w-full">
          <img
            src="/assets/Ecommerce.avif"
            alt="E-commerce"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-4 top-4 text-white sm:left-6 sm:top-6">
            <h3 className="text-[14px] font-normal tracking-tight sm:text-[15px]">
              E-commerce
            </h3>

            <p className="text-[12px] font-light text-white/75 sm:text-[13px]">
              10+ years of expertise
            </p>
          </div>
        </div>
      </div>

      {/* CARD 2 - ENGAGEMENT MODELS */}

      <div
        className={`showcase-card ${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-black p-4 text-white sm:p-6 md:p-7`}
      >
        <div>
          <h3 className="text-[14px] font-normal sm:text-[15px]">
            2 Engagement
          </h3>

          <p className="text-[13px] font-light sm:text-[14px]">Models</p>

          <p className="text-[12px] text-white/55 sm:text-[13px]">
            Classic / Venture
          </p>
        </div>

        <a href="#contact" className="text-[12px] sm:text-[13px]">
          Learn more ↗
        </a>
      </div>

      {/* CARD 3 - PERCENTAGE */}

      <div
        className={`showcase-card ${shortCard} shrink-0 overflow-hidden rounded-[3px]`}
      >
        <PercentageCard />
      </div>

      {/* CARD 4 - RIVIAN VIDEO */}

      <div
        className={`showcase-card ${tallCard} relative shrink-0 overflow-hidden rounded-[3px]`}
      >
        <video
          src="/assets/rivian-campingVd.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute left-4 top-4 z-10 max-w-[200px] text-white sm:left-6 sm:top-6 sm:max-w-[220px]">
          <h3 className="text-[13px] font-normal sm:text-[14px]">
            Catalyzed ~71,000
          </h3>

          <p className="text-[12px] font-light sm:text-[13px]">
            pre-orders after brand reveal
          </p>

          <p className="text-[11px] sm:text-[12px]">
            (approximately $5.68 billion).
          </p>
        </div>

        <img
          src="/assets/rivian-white.svg"
          alt="Rivian"
          className="absolute bottom-4 right-4 h-6 w-20 object-contain sm:bottom-5 sm:right-5 sm:h-7 sm:w-24"
        />
      </div>

      {/* CARD 5 - NOOVO */}

      <div
        className={`showcase-card ${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-4 sm:p-6 md:p-7`}
      >
        <div>
          <h3 className="text-[14px] font-normal sm:text-[15px]">
            $5M+ in new
          </h3>

          <p className="text-[13px] sm:text-[14px]">business</p>

          <p className="text-[12px] text-black/50 sm:text-[13px]">
            generated within 90 days of launch
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <a href="#contact" className="text-[12px] sm:text-[13px]">
            Case Study ↗
          </a>

          <img
            src="/assets/noovo-logoBlack.svg"
            alt="Noovo"
            className="h-7 w-20 object-contain sm:h-8 sm:w-24"
          />
        </div>
      </div>

      {/* CARD 6 - LIVE CLOCK */}

      <div
        className={`showcase-card ${tallCard} shrink-0 overflow-hidden rounded-[3px]`}
      >
        <LiveClock />
      </div>

      {/* CARD 7 - 60 BRANDS */}

      <div
        className={`showcase-card ${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-black p-4 text-white sm:p-6 md:p-7`}
      >
        <div>
          <h3 className="text-[14px] font-normal sm:text-[15px]">60 brands</h3>

          <p className="text-[12px] font-light text-white/60 sm:text-[13px]">
            successfully launched since 2013.
          </p>
        </div>

        <RotatingLogos logos={brandLogos} />
      </div>

      {/* CARD 8 - OURA */}

      <div
        className={`showcase-card ${tallCard} shrink-0 overflow-hidden rounded-[3px]`}
      >
        <OuraCard />
      </div>

      {/* CARD 9 - AWARDS */}

      <div
        className={`showcase-card ${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-4 sm:p-6 md:p-7`}
      >
        <div>
          <h3 className="text-[14px] font-normal sm:text-[15px]">
            70+ industry-recognized
          </h3>

          <p className="text-[12px] text-black/50 sm:text-[13px]">awards.</p>
        </div>

        <RotatingLogos logos={awardLogos} />
      </div>
    </>
  );

  // =====================================
  // MAIN JSX
  // =====================================

  return (
    <section
      ref={sectionRef}
      className="relative h-auto min-h-0 w-full overflow-hidden bg-white text-black font-[Satoshi] md:min-h-screen"
    >
      {/* HEADER */}

      <header className="mx-5 flex h-[70px] items-center justify-between border-t border-black/25 px-0 font-[Satoshi] sm:mx-6 md:mx-6">
        <h2 className="text-[16px] font-light tracking-tight sm:text-[18px]">
          Rejouice at a Glance.
        </h2>

        <a
          href="mailto:hello@rejouice.com"
          className="text-[14px] font-normal sm:text-[16px]"
        >
          hello@rejouice.com
        </a>
      </header>

      {/* HORIZONTAL SCROLL CONTAINER */}

      <div
        className="w-full overflow-hidden pt-3 pb-2 sm:pt-8 sm:pb-4"
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
        onTouchStart={pauseAnimation}
        onTouchEnd={resumeAnimation}
      >
        <div
          ref={trackRef}
          className="flex w-max min-w-max shrink-0 flex-nowrap items-start"
        >
          {/* FIRST SET OF CARDS */}

          <div className="flex w-max shrink-0 flex-nowrap items-start gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5">
            {cards}
          </div>

          {/* DUPLICATE SET FOR INFINITE SCROLL */}

          <div
            aria-hidden="true"
            className="flex w-max shrink-0 flex-nowrap items-start gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5"
          >
            {cards}
          </div>
        </div>
      </div>

      {/* CSS ANIMATIONS */}

      <style jsx global>{`
        @keyframes logoFade {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes industryFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
