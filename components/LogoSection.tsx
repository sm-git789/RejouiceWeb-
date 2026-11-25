"use client";

import React from "react";

const logos = [
  { name: "RIVIAN", image: "/assets/rivianBlack.svg" },
  { name: "ŌURA", image: "/assets/OuraBlack.svg" },
  { name: "MOXION", image: "/assets/MoxionBlack.svg" },
  { name: "8VC", image: "/assets/8VCBlack.svg" },
  { name: "Rappi", image: "/assets/RappiBlack.svg" },
  { name: "HYPERFRAME", image: "/assets/HYPERFRAMEBlack.svg" },
  { name: "OV Loop", image: "/assets/OVLoopBlack.svg" },
  { name: "Proof", image: "/assets/ProofBlack.svg" },
];

const LogoScroll: React.FC = () => {
  return (
    <section className="flex min-h-[150px] w-full items-center bg-white py-8 md:min-h-[400px]">
      {/* MOBILE LOGO SCROLL */}

      <div className="w-full overflow-hidden md:hidden">
        <div className="flex w-max animate-logo-scroll">
          {/* FIRST SET */}

          <div className="flex shrink-0 items-center gap-12 pr-12">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex h-[55px] w-[110px] shrink-0 items-center justify-center"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-[35px] w-[95px] object-contain"
                />
              </div>
            ))}
          </div>

          {/* DUPLICATE SET FOR INFINITE SCROLL */}

          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-12 pr-12"
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex h-[55px] w-[110px] shrink-0 items-center justify-center"
              >
                <img
                  src={logo.image}
                  alt=""
                  className="h-[35px] w-[95px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLET AND DESKTOP GRID */}

      <div className="hidden w-full px-5 md:block md:px-10">
        <div className="grid grid-cols-4 items-center justify-items-center gap-x-10 gap-y-10 lg:grid-cols-8 lg:gap-x-16">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex h-[55px] w-full items-center justify-center"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="h-[35px] w-[95px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATION */}

      <style jsx global>{`
        @keyframes logo-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .animate-logo-scroll {
          animation: logo-scroll 25s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default LogoScroll;
