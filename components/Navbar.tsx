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
        className={`absolute bottom-1 left-0 h-[1px] w-0 ${
          isLight ? "bg-black" : "bg-white"
        }`}
      />
    </a>
  );
};

const Navbar: React.FC = () => {
  const [isLight, setIsLight] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect active section and update navbar theme
  useEffect(() => {
    const updateNavbarColor = () => {
      const navbarY = 32;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-theme]"),
      );

      const activeSection = sections
        .filter((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= navbarY && rect.bottom > navbarY;
        })
        .sort((a, b) => {
          return b.getBoundingClientRect().top - a.getBoundingClientRect().top;
        })[0];

      const currentTheme = activeSection?.dataset.navbarTheme || "dark";

      setIsLight(currentTheme === "light");
      setIsHome(activeSection?.id === "home");
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

  const navigation = [
    { title: "Home", href: "#home" },
    { title: "Work", href: "#work" },
    { title: "About", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Contact", href: "#contact" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Menu overlay is always black, so keep its controls white.
  const navbarTextColor = isMenuOpen || !isLight ? "text-white" : "text-black";

  return (
    <nav
      className="fixed left-0 top-0 z-[9999] w-full bg-transparent font-[Satoshi]"
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <div className="relative z-[60] flex h-[65px] w-full items-center justify-between px-5 md:grid md:grid-cols-3 md:px-8">
        {/* Logo */}
        {/* Logo */}
        <div className="shrink-0 justify-self-start">
          <a
            href="#home"
            className={`transition-colors duration-300 ${navbarTextColor}`}
          >
            {isHome ? (
              <span className="text-[13px] font-medium tracking-[-0.04em] md:text-[15px]">
                The Growth Accelerator
              </span>
            ) : (
              <span
                className="
          [font-family:'Rejouice_Headline']
          text-[24px]
          font-normal
          tracking-[-0.04em]
          md:text-[27px]
        "
              >
                rejo<u className="no-underline">u</u>ice
              </span>
            )}
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center gap-5 md:flex lg:gap-7">
          {navigation.map((item) => (
            <NavItem key={item.title} href={item.href} isLight={isLight}>
              {item.title}
            </NavItem>
          ))}
        </div>

        {/* Desktop Let's Talk */}
        <div className="hidden justify-self-end md:block">
          <a
            href="#contact"
            className={`text-[12px] font-light tracking-[-0.02em] transition-colors duration-300 hover:opacity-60 md:text-[13px] ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            Let's talk ↗
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`border border-current/20 px-4 py-2 font-[Satoshi] text-[13px] font-medium transition-colors duration-300 ${navbarTextColor}`}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
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
            Let's talk ↗
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
