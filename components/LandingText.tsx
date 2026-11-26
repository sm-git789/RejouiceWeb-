// "use client";

// import React from "react";

// const Page1: React.FC = () => {
//   return (
//     <section
//       id="home"
//       data-navbar-theme="dark"
//       className="relative min-h-[600px] h-[93svh] w-full overflow-hidden bg-black text-white"
//     >
//       {/* Main heading */}
//       <div
//         className="
//           absolute left-0 top-0
//           flex w-full justify-center
//           overflow-hidden
//           pt-[9vh] sm:pt-[8vh] md:pt-[7vh]
//         "
//       >
//         <h1
//           data-hero-heading
//           className="
//             w-full
//             px-1 sm:px-[2vw]
//             text-center
//             font-[Satoshi]
//             text-[19vw]
//             sm:text-[20vw]
//             md:text-[20.5vw]
//             font-black
//             leading-[0.85]
//             sm:leading-[0.78]
//             tracking-[-0.075em]
//             whitespace-nowrap
//             select-none
//             will-change-transform
//           "
//         >
//           REJO<u className="no-underline">U</u>ICE
//         </h1>
//       </div>

//       {/* Bottom content */}
//       <div
//         className="
//           absolute bottom-0 left-0
//           flex w-full items-end justify-between
//           gap-3
//           px-4 pb-[16vh]
//           sm:px-6 sm:pb-[8vh]
//           md:px-[2.6vw] md:pb-[8vh]
//         "
//       >
//         <div
//           className="
//             flex gap-5
//             font-[Satoshi]
//             text-[11px]
//             sm:gap-8 sm:text-[13px]
//             md:gap-[4.5vw] md:text-[clamp(12px,1vw,16px)]
//             font-light leading-[1.3]
//             tracking-[-0.02em] text-white/90
//           "
//         >
//           <p>
//             Strategy, Design,
//             <br />
//             Performance.
//           </p>

//           <p>
//             Global Creative
//             <br />
//             &amp; Technology Agency.
//           </p>
//         </div>

//         <div className="shrink-0 animate-bounce font-[Satoshi] text-[18px] font-light text-white/90 sm:text-[20px]">
//           ↓
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Page1;

"use client";

import React, { useRef } from "react";

const Page1: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const headingLetters = ["R", "E", "J", "O", "U", "I", "C", "E"];

  return (
    <section
      ref={sectionRef}
      id="home"
      data-navbar-theme="dark"
      className="
        relative
        min-h-[600px]
        h-[93svh]
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* REJOUICE HEADING */}
      <div
        className="
          absolute left-0 top-0
          flex w-full justify-center
          overflow-hidden
          pt-[9vh] sm:pt-[8vh] md:pt-[7vh]
        "
      >
        <h1
          data-hero-heading
          className="
            w-full
            px-1 sm:px-[2vw]
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
          "
        >
          {headingLetters.map((letter, index) => (
            <span
              key={index}
              data-hero-letter
              className="inline-block will-change-transform"
            >
              {letter === "U" ? <u className="no-underline">U</u> : letter}
            </span>
          ))}
        </h1>
      </div>

      {/* BOTTOM CONTENT */}
      <div
        className="
          absolute bottom-0 left-0
          flex w-full items-end justify-between
          gap-3
          px-4 pb-[16vh]
          sm:px-6 sm:pb-[8vh]
          md:px-[2.6vw] md:pb-[8vh]
        "
      >
        <div
          className="
            flex gap-5
            font-[Satoshi]
            text-[11px]
            sm:gap-8 sm:text-[13px]
            md:gap-[4.5vw]
            md:text-[clamp(12px,1vw,16px)]
            font-light leading-[1.3]
            tracking-[-0.02em]
            text-white/90
          "
        >
          <p>
            Strategy, Design,
            <br />
            Performance.
          </p>

          <p>
            Global Creative
            <br />
            &amp; Technology Agency.
          </p>
        </div>

        <div
          className="
            shrink-0
            animate-bounce
            font-[Satoshi]
            text-[18px]
            font-light
            text-white/90
            sm:text-[20px]
          "
        >
          ↓
        </div>
      </div>
    </section>
  );
};

export default Page1;
