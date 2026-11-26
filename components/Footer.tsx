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

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const content = footer.querySelector(".footer-content");
      const letters = footer.querySelectorAll(".footer-letter");

      if (!content || !letters.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Footer content animation
      tl.fromTo(
        content,
        { y: -180 },
        {
          y: 0,
          duration: 1,
          ease: "none",
        },
        0,
      );

      // Each REJOUICE letter falls down
      tl.fromTo(
        letters,
        {
          y: (index) => -120 - index * 15,
        },
        {
          y: 0,
          duration: 1,
          stagger: 0.06,
          ease: "none",
        },
        0.5,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-x-clip overflow-y-visible bg-black text-white"
      style={{
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      <div className="flex flex-col px-5 pt-5 pb-0 md:px-[2.6vw] md:pt-6">
        {/* LEFT AND RIGHT CONTENT */}

        <div className="footer-content grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-0">
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

        {/* FOOTER WORDMARK */}

        {/* FOOTER WORDMARK */}

        {/* FOOTER WORDMARK */}

        <div className="mt-[clamp(90px,16vh,150px)] -mx-2 w-full md:-mx-[1vw]">
          <div className="w-full overflow-hidden">
            <h1
              className="
        footer-wordmark
        block w-full
        px-0
        text-center
        font-[Satoshi]
        text-[19vw]
        sm:text-[20vw]
        md:text-[20.5vw]
        font-black
        leading-[1.15]
        tracking-[-0.075em]
        whitespace-nowrap
        select-none
        text-white
        will-change-transform
      "
              aria-label="REJOUICE"
            >
              {"REJOUICE".split("").map((letter, index) => (
                <span key={index} className="inline-block" aria-hidden="true">
                  {letter}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
