
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";



interface NavItemsProps {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  isLight?: boolean;
}

const NavItem: React.FC<NavItemsProps> = ({
  children,
  href,
  onClick,
  isLight = false,
}) => {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    const underline = underlineRef.current;

    if (!item || !underline) return;

    const handleMouseEnter = () => {
      gsap.to(underline, {
        width: "100%",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(underline, {
        width: "0%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mouseenter", handleMouseEnter);
      item.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(underline);
    };
  }, []);

  return (
    <a
      ref={itemRef}
      href={href}
      onClick={onClick}
      className={`relative inline-block overflow-hidden py-2 text-[12px] font-light tracking-[-0.02em] transition-colors duration-300 md:text-[13px] ${
        isLight ? "text-black" : "text-white"
      }`}
    >
      {children}

      <span
        ref={underlineRef}
        className={`absolute bottom-1 left-0 h-[1px] w-0 transition-colors duration-300 ${
          isLight ? "bg-black" : "bg-white"
        }`}
      />
    </a>
  );
};



const Navbar: React.FC = () => {
  const [isLight, setIsLight] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { title: "Home", href: "#home" },
    { title: "Work", href: "#work" },
    { title: "About", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Contact", href: "#contact" },
  ];


  useEffect(() => {
    const updateNavbarColor = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-navbar-theme]"
      );

      const navbarY = 32;

      let currentTheme = "dark";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= navbarY && rect.bottom > navbarY) {
          currentTheme = section.dataset.navbarTheme || "dark";
        }
      });

      setIsLight(currentTheme === "light");
    };

    updateNavbarColor();

    window.addEventListener("scroll", updateNavbarColor, {
      passive: true,
    });

    window.addEventListener("resize", updateNavbarColor);

    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
      window.removeEventListener("resize", updateNavbarColor);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 z-[9999] w-full bg-transparent font-[Satoshi]"
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
   

      <div className="relative z-[60] grid h-[65px] w-full grid-cols-3 items-center px-5 md:px-8">

    

        <div className="justify-self-start">
          <a
            href="#home"
            className={`text-[24px] font-light tracking-[-0.07em] transition-colors duration-300 md:text-[27px] ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            rejo<u className="no-underline">u</u>ice
          </a>
        </div>

       

        <div className="hidden items-center justify-center gap-5 md:flex lg:gap-7">
          {navigation.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              isLight={isLight}
            >
              {item.title}
            </NavItem>
          ))}
        </div>

        

        <div className="hidden justify-self-end md:block">
          <a
            href="#contact"
            className={`text-[12px] font-light tracking-[-0.02em] transition-colors duration-300 hover:opacity-60 md:text-[13px] ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            Let&apos;s talk ↗
          </a>
        </div>

       

        <button
          type="button"
          className={`col-start-3 justify-self-end text-[23px] font-light transition-colors duration-300 focus:outline-none md:hidden ${
            isLight ? "text-black" : "text-white"
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      

      <div
        className="fixed left-0 top-0 z-50 w-full overflow-hidden bg-black transition-[height] duration-500 ease-in-out md:hidden"
        style={{
          height: isMenuOpen ? "100dvh" : "0px",
        }}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="flex h-full flex-col items-center justify-center gap-7">
          {navigation.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              onClick={closeMenu}
              isLight={false}
            >
              <span className="text-[30px] font-light tracking-[-0.04em]">
                {item.title}
              </span>
            </NavItem>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-5 text-[15px] font-light text-white"
          >
            Let&apos;s talk ↗
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
