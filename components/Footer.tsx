"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Footer content movement
      tl.fromTo(
        ".footer-content",
        { y: -180 },
        {
          y: 0,
          ease: "none",
        },
        0,
      );

      tl.fromTo(
        ".footer-wordmark",
        {
          yPercent: -110,
        },
        {
          yPercent: 0,
          ease: "none",
        },
        0,
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      style={{
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      <div className="flex min-h-screen flex-col px-6 pt-8 md:px-[2.6vw] md:pt-10">
        {/* LEFT AND RIGHT CONTENT */}

        <div className="footer-content grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-0">
          {/* LEFT CONTENT */}

          <div className="md:col-span-7">
            <h2 className="text-[26px] font-light tracking-[-0.045em] md:text-[32px]">
              Do it once. Do it right.
            </h2>

            <div className="mt-10 text-[12px] font-light leading-[1.3]">
              <p>New Business:</p>

              <a
                href="mailto:hello@rejouice.com"
                className="transition-opacity hover:opacity-50"
              >
                hello@rejouice.com
              </a>
            </div>

            <div className="mt-8 max-w-[290px]">
              <p className="mb-4 text-[12px] font-light">
                Sign up for our newsletter (No spam)
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full items-center border-b border-white/40 pb-2"
              >
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email address"
                  className="w-full bg-transparent text-[12px] font-light text-white outline-none placeholder:text-white/40"
                />

                <button
                  type="submit"
                  aria-label="Submit email"
                  className="text-[17px] font-light text-white transition-opacity hover:opacity-50"
                >
                  →
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT CONTENT */}

          <div className="grid grid-cols-2 gap-2 text-[12px] font-light leading-[1.5] md:col-span-5 md:translate-x-48">
            <div className="flex flex-col items-start gap-[2px]">
              <a href="#home" className="hover:opacity-50">
                Home
              </a>
              <a href="#work" className="hover:opacity-50">
                Work
              </a>
              <a href="#about" className="hover:opacity-50">
                About
              </a>
              <a href="#services" className="hover:opacity-50">
                Services
              </a>
              <a href="#contact" className="hover:opacity-50">
                Contact
              </a>

              <div className="mt-16 leading-[1.2]">
                <p>San Diego—USA</p>
                <p>Paris—France</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-[2px]">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-50"
              >
                Instagram ↗
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-50"
              >
                LinkedIn ↗
              </a>

              <div className="mt-16 leading-[1.2]">
                <a href="#terms" className="hover:opacity-50">
                  Terms of use
                </a>
                <p>©13—26</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto w-full overflow-hidden pt-16">
          <h1
            className="
      footer-wordmark
      w-full
      px-2 sm:px-[2vw]
      text-center
      font-[Satoshi]
      text-[19vw]
      sm:text-[20vw]
      md:text-[20.5vw]
      font-black
      leading-[0.85]
      sm:leading-[0.78]
      tracking-[-0.075em]
      whitespace-nowrap
      select-none
      text-white
      will-change-transform
    "
            aria-label="REJOUICE"
          >
            REJOUICE
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
