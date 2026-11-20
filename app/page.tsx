'use client'

import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Page1 from "../components/LandingText";
import Page2  from "../components/LandingVideo";
import PageAbout  from "../components/Backto";
import PageHighlights  from "../components/PageHighlights";
import LogoScroll from "../components/LogoSection";
import ProjectShowcase from "../components/ProjectShowcase";
import OurApproach from "../components/OurApproach"
import PORTFOLIO from "../components/PORTFOLIO"
import About from '@/components/About';
import Footer from '@/components/Footer';


const Home: React.FC = () =>{
  const [isLoading,setIsLoading] = useState(true);

  const handleLoadingComplete =() =>{
    setIsLoading(false);
  }
  return (
   <div className=".min-h-screen overflow-hidden bg-[#000000]">
    {isLoading && <Loader onLoadingComplete={handleLoadingComplete}/>}
    <div className={`${isLoading ? 'hidden' : 'block'} min-h-screen`}>
      <Navbar/>
      <Page1/>
      <Page2/>
      <PageAbout/>
      <PageHighlights/>
      <LogoScroll/>
      <ProjectShowcase/>
      <OurApproach/>
       <PORTFOLIO/>
       <About/>
       <Footer/>
      
    </div>
    </div>

  )
}

export default Home;