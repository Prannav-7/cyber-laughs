import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ParticleSystem from './components/ParticleSystem';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LineupSection from './components/LineupSection';
import ScheduleSection from './components/ScheduleSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults for smooth, professional motion
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

// ScrollTrigger — use native scroll for best performance
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = () => {
    setLoaded(true);
    // Let DOM paint before refreshing triggers
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  };

  return (
    <>
      {/* Subtle film grain */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Ambient particles (fixed, behind everything) */}
      <ParticleSystem />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main site */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: loaded ? 'auto' : 'none',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <LineupSection />
          <ScheduleSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
