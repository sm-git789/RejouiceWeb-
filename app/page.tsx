"use client";

import React, { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Page1 from "../components/LandingText";
import Page2 from "../components/LandingVideo";
import PageAbout from "../components/Backto";
import PageHighlights from "../components/PageHighlights";
import LogoScroll from "../components/LogoSection";
import ProjectShowcase from "../components/ProjectShowcase";
import OurApproach from "../components/OurApproach";
import PORTFOLIO from "../components/PORTFOLIO";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Refresh ScrollTrigger after loader finishes
  useEffect(() => {
    if (!isLoading) {
      const refreshId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => cancelAnimationFrame(refreshId);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen overflow-hidden bg-black">
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}

      <div className={`${isLoading ? "hidden" : "block"} min-h-screen`}>
        <Navbar />

        <Page1 />
        <Page2 />
        <PageAbout />
        <PageHighlights />

        <LogoScroll />
        <ProjectShowcase />
        <OurApproach />

        <PORTFOLIO src="/assets/PORTFOLIO.mp4" />

        <About />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
