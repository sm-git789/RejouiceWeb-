"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ---------------- CLIENT LOGOS ----------------

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

// ---------------- ROTATING LOGOS ----------------

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
        className="h-8 w-28 object-contain"
        style={{ animation: "logoFade 0.5s ease" }}
      />
    </div>
  );
}

// ---------------- LIVE CLOCK ----------------

function LiveClock() {
  const [now, setNow] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const handleMouseEnter = () => {
    setNow(new Date());
    setIsRunning(true);
  };

  const handleMouseLeave = () => {
    setIsRunning(false);
  };

  const getTime = (timezone: string) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex h-full w-full flex-col justify-between bg-[#f5f5f3] p-7 font-[Rejouice] text-black"
    >
      <div className="flex justify-between text-[12px] leading-[1.5]">
        <div>
          <p className="mb-1">2 Offices</p>
          <p className="text-black/50">San Diego, USA</p>
          <p className="text-black/50">Paris, France</p>
        </div>

        <div className="text-right tabular-nums">
          <p>{getTime("America/Los_Angeles")}</p>
          <p>{getTime("Europe/Paris")}</p>
        </div>
      </div>

      <div className="flex items-center justify-center pb-2">
        <div className="relative h-[190px] w-[190px] rounded-full">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 origin-bottom ${
                i % 5 === 0
                  ? "h-3 w-[1.5px] bg-black/60"
                  : "h-1.5 w-px bg-black/25"
              }`}
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 6}deg) translateY(-88px)`,
              }}
            />
          ))}

          <div
            className="absolute left-1/2 top-1/2 h-[48px] w-[3px] origin-bottom rounded-full bg-black"
            style={{
              transform: `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)`,
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[65px] w-[2px] origin-bottom rounded-full bg-black"
            style={{
              transform: `translate(-50%, -100%) rotate(${minutes * 6 + seconds * 0.1}deg)`,
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[75px] w-px origin-bottom bg-black"
            style={{
              transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)`,
            }}
          />

          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

// ---------------- 150% CARD ----------------

function PercentageCard() {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const valueRef = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const handleMouseEnter = () => {
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
      onComplete: () => {
        setPercentage(150);
      },
    });
  };

  const handleMouseLeave = () => {
    tweenRef.current?.kill();

    valueRef.current.value = 0;
    setPercentage(0);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => tweenRef.current?.kill();
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex h-full w-full flex-col justify-between bg-[#f5f5f3] p-7 font-[Rejouice] text-black"
    >
      <div>
        <h3 className="text-[14px] font-normal">Driving 150%</h3>

        <p className="text-[13px] text-black/50">LTV:CAC in average</p>
      </div>

      <div className="flex justify-end">
        {isVisible && (
          <span className="text-[32px] font-normal tabular-nums">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------- OURA INDUSTRIES ----------------

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

function OuraCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % industries.length);
    }, 1400);

    return () => window.clearInterval(interval);
  }, []);

  // Display only three industries at a time.
  // Move forward one industry on every interval.
  const visibleIndustries = Array.from(
    { length: 3 },
    (_, i) => industries[(active + i) % industries.length],
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-black font-[Rejouice]">
      <img
        src="/assets/Oura-ring-img.avif"
        alt="Oura smart ring"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute left-6 top-6 z-10 w-[85%]">
        <div className="flex flex-col gap-2">
          {visibleIndustries.map((industry, index) => (
            <div
              key={`${industry}-${active}`}
              className="text-[13px] font-light tracking-wide text-white"
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

// ---------------- MAIN SECTION ----------------

const GlanceSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let tween: gsap.core.Tween;

    const createAnimation = () => {
      tween?.kill();

      gsap.set(track, { x: 0 });

      const firstSet = track.children[0] as HTMLElement;
      const distance = firstSet.offsetWidth;

      if (!distance) return;

      tween = gsap.to(track, {
        x: -distance,
        duration: 45,
        ease: "none",
        repeat: -1,
      });

      tweenRef.current = tween;
    };

    createAnimation();

    const observer = new ResizeObserver(() => {
      const wasPaused = tween?.paused() ?? false;

      createAnimation();

      if (wasPaused) tween?.pause();
    });

    observer.observe(track);

    return () => {
      observer.disconnect();
      tween?.kill();
      tweenRef.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  // ---------------- ALL CARDS ----------------

  const cards = (
    <>
      {/* 1. E-COMMERCE */}

      <div className="h-[450px] w-[455px] shrink-0 overflow-hidden rounded-[3px]">
        <div className="relative h-full w-full">
          <img
            src="/assets/Ecommerce.avif"
            alt="E-commerce"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-6 top-6 font-[Rejouice] text-white">
            <h3 className="text-[15px] font-normal tracking-tight">
              E-commerce
            </h3>

            <p className="text-[13px] font-light text-white/75">
              10+ years of expertise
            </p>
          </div>
        </div>
      </div>

      {/* 2. ENGAGEMENT */}

      <div className="flex h-[300] w-[400] shrink-0 flex-col justify-between rounded-[3px] bg-black p-7 font-[Rejouice] text-white">
        <div>
          <h3 className="text-[15px] font-normal">2 Engagement</h3>

          <p className="text-[14px] font-light">Models</p>

          <p className="text-[13px] text-white/55">Classic / Venture</p>
        </div>

        <a href="#contact" className="text-[13px]">
          Learn more ↗
        </a>
      </div>

      {/* 3. PERCENTAGE */}

      <div className="h-[300] w-[400] shrink-0 overflow-hidden rounded-[3px]">
        <PercentageCard />
      </div>

      {/* 4. RIVIAN VIDEO */}

      <div className="relative h-[430] w-[435] shrink-0 overflow-hidden rounded-[3px]">
        <video
          src="/assets/rivian-campingVd.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute left-6 top-6 z-10 max-w-[220px] font-[Rejouice] text-white">
          <h3 className="text-[14px] font-normal">Catalyzed ~71,000</h3>

          <p className="text-[13px] font-light">
            pre-orders after brand reveal
          </p>

          <p className="text-[12px]">(approximately $5.68 billion).</p>
        </div>

        <img
          src="/assets/rivian-white.svg"
          alt="Rivian"
          className="absolute bottom-5 right-5 h-7 w-24 object-contain"
        />
      </div>

      {/* 5. NOOVO */}

      <div className="flex h-[300] w-[400] shrink-0 flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-7 font-[Rejouice]">
        <div>
          <h3 className="text-[15px] font-normal">$5M+ in new</h3>

          <p className="text-[14px]">business</p>

          <p className="text-[13px] text-black/50">
            generated within 90 days of launch
          </p>
        </div>

        <div className="flex items-center justify-between">
          <a href="#contact" className="text-[13px]">
            Case Study ↗
          </a>

          <img
            src="/assets/noovo-logoBlack.svg"
            alt="Noovo"
            className="h-8 w-24 object-contain"
          />
        </div>
      </div>

      {/* 6. CLOCK */}

      <div className="h-[450] w-[455] shrink-0 overflow-hidden rounded-[3px]">
        <LiveClock />
      </div>

      {/* 7. 60 BRANDS */}

      <div className="flex h-[300] w-[400] shrink-0 flex-col justify-between rounded-[3px] bg-black p-7 font-[Rejouice] text-white">
        <div>
          <h3 className="text-[15px] font-normal">60 brands</h3>

          <p className="text-[13px] font-light text-white/60">
            successfully launched since 2013.
          </p>
        </div>

        <RotatingLogos logos={brandLogos} />
      </div>

      {/* 8. OURA */}

      <div className="h-[450] w-[455] shrink-0 overflow-hidden rounded-[3px]">
        <OuraCard />
      </div>

      {/* 9. AWARDS */}

      <div className="flex h-[300] w-[400] shrink-0 flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-7 font-[Rejouice]">
        <div>
          <h3 className="text-[15px] font-normal">70+ industry-recognized</h3>

          <p className="text-[13px] text-black/50">awards.</p>
        </div>

        <RotatingLogos logos={awardLogos} />
      </div>
    </>
  );

  

return (
  <section className="relative min-h-screen w-full overflow-hidden bg-white font-[Rejouice] text-black">

    {/* TOP HEADER */}

    <header className="flex h-[75px] w-full items-center justify-between border-b border-black/15 bg-white px-6 md:px-8">

      <h2 className="text-[16px] font-light tracking-tight">
        Rejouice at a Glance.
      </h2>

      <a
        href="mailto:hello@rejouice.com"
        className="text-[13px] font-normal"
      >
        hello@rejouice.com
      </a>

    </header>

    {/* HORIZONTAL CARD ROW */}

    <div
      className="w-full overflow-hidden pt-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="flex w-max min-w-max shrink-0 flex-nowrap items-start"
      >

        {/* FIRST SET */}

        <div className="flex w-max shrink-0 flex-nowrap items-start gap-[20px] pr-[20px]">
          {cards}
        </div>

        {/* DUPLICATE SET FOR INFINITE SCROLL */}

        <div
          aria-hidden="true"
          className="flex w-max shrink-0 flex-nowrap items-start gap-[20px] pr-[20px]"
        >
          {cards}
        </div>

      </div>
    </div>

    {/* ANIMATION STYLES */}

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
          transform: translateY(0);
        }
      }
    `}</style>

  </section>
);


};

export default GlanceSection;
