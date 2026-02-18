import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ParticleSystem from './components/ParticleSystem';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LineupSection from './components/LineupSection';
import ScheduleSection from './components/ScheduleSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out', duration: 0.8 });
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = () => {
    setLoaded(true);
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
  };

  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <ParticleSystem />

      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: loaded ? 'auto' : 'none',
        position: 'relative',
        zIndex: 10,
      }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
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
