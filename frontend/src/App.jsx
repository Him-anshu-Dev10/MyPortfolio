import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import GalaxyBackground from "./components/GalaxyBackground";
import ScrollWidgets from "./components/ScrollWidgets";
import SpaceArcade from "./components/SpaceArcade";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.6, smoothWheel: true }}>
      <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-pink-500/30">
        {/* Scroll Progress & Back-to-Top */}
        <ScrollWidgets />

        {/* Space Shooter Retro Mini-Game */}
        <SpaceArcade />

        {/* Background Galaxy & Graphic Effects */}
        <GalaxyBackground />
        <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <Navbar />
          <main className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
