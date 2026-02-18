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

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = () => {
    setLoaded(true);
    // Refresh ScrollTrigger after load
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Particle system (fixed background) */}
      <ParticleSystem />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main content */}
      <div
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: loaded ? 'auto' : 'none',
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
