"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

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

function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

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
    <div className="flex h-full w-full flex-col justify-between bg-[#f5f5f3] p-4 text-black sm:p-7">
      <div className="flex justify-between gap-2 text-[10px] leading-[1.5] sm:text-[12px]">
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

      <div className="flex items-center justify-center pb-1 sm:pb-2">
        <div className="relative h-[155px] w-[155px] rounded-full sm:h-[190px] sm:w-[190px]">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 origin-bottom ${
                i % 5 === 0
                  ? "h-2.5 w-[1.5px] bg-black/60 sm:h-3"
                  : "h-1.5 w-px bg-black/25"
              }`}
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 6}deg) translateY(-${
                  i % 5 === 0 ? 70 : 70
                }px)`,
              }}
            />
          ))}

          <div
            className="absolute left-1/2 top-1/2 h-[40px] w-[3px] origin-bottom rounded-full bg-black sm:h-[48px]"
            style={{
              transform: `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)`,
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[53px] w-[2px] origin-bottom rounded-full bg-black sm:h-[65px]"
            style={{
              transform: `translate(-50%, -100%) rotate(${minutes * 6 + seconds * 0.1}deg)`,
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[62px] w-px origin-bottom bg-black sm:h-[75px]"
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
    return () => tweenRef.current?.kill();
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

  const visibleIndustries = Array.from(
    { length: 3 },
    (_, i) => industries[(active + i) % industries.length]
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

const ProjectShowcase: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let tween: gsap.core.Tween | undefined;

    const createAnimation = () => {
      tween?.kill();
      gsap.set(track, { x: 0 });

      const firstSet = track.children[0] as HTMLElement | undefined;
      if (!firstSet) return;

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

  const pauseAnimation = () => tweenRef.current?.pause();
  const resumeAnimation = () => tweenRef.current?.resume();

  const tallCard =
    "h-[320px] w-[82vw] max-w-[455px] sm:h-[380px] sm:w-[400px] md:h-[450px] md:w-[455px]";
  const shortCard =
    "h-[250px] w-[82vw] max-w-[400px] sm:h-[280px] sm:w-[350px] md:h-[300px] md:w-[400px]";

  const cards = (
    <>
   
      <div className={`${tallCard} shrink-0 overflow-hidden rounded-[3px]`}>
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

  
      <div
        className={`${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-black p-4 text-white sm:p-6 md:p-7`}
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

   
      <div className={`${shortCard} shrink-0 overflow-hidden rounded-[3px]`}>
        <PercentageCard />
      </div>

   
      <div
        className={`${tallCard} relative shrink-0 overflow-hidden rounded-[3px]`}
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


      <div
        className={`${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-4 sm:p-6 md:p-7`}
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

      <div className={`${tallCard} shrink-0 overflow-hidden rounded-[3px]`}>
        <LiveClock />
      </div>

     
      <div
        className={`${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-black p-4 text-white sm:p-6 md:p-7`}
      >
        <div>
          <h3 className="text-[14px] font-normal sm:text-[15px]">60 brands</h3>
          <p className="text-[12px] font-light text-white/60 sm:text-[13px]">
            successfully launched since 2013.
          </p>
        </div>
        <RotatingLogos logos={brandLogos} />
      </div>

      <div className={`${tallCard} shrink-0 overflow-hidden rounded-[3px]`}>
        <OuraCard />
      </div>

      
      <div
        className={`${shortCard} flex shrink-0 flex-col justify-between rounded-[3px] bg-[#f5f5f3] p-4 sm:p-6 md:p-7`}
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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white text-black">
      <header className="flex min-h-[68px] w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-black/15 bg-white px-4 py-3 sm:h-[75px] sm:flex-nowrap sm:px-6 md:px-8">
        <h2 className="text-[14px] font-light tracking-tight sm:text-[16px]">
          Rejouice at a Glance.
        </h2>

        <a
          href="mailto:hello@rejouice.com"
          className="text-[11px] font-normal sm:text-[13px]"
        >
          hello@rejouice.com
        </a>
      </header>

      <div
        className="w-full overflow-hidden pt-5 sm:pt-8"
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
        onTouchStart={pauseAnimation}
        onTouchEnd={resumeAnimation}
      >
        <div
          ref={trackRef}
          className="flex w-max min-w-max shrink-0 flex-nowrap items-start"
        >
          <div className="flex w-max shrink-0 flex-nowrap items-start gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5">
            {cards}
          </div>

          <div
            aria-hidden="true"
            className="flex w-max shrink-0 flex-nowrap items-start gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5"
          >
            {cards}
          </div>
        </div>
      </div>

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

