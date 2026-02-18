import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MicrophoneScene from './MicrophoneScene';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const taglineRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial entrance animation
            gsap.fromTo(
                '.hero-badge',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
            );

            // Kinetic title — each word scales up on scroll
            const titleWords = titleRef.current?.querySelectorAll('.kinetic-word');
            if (titleWords) {
                gsap.fromTo(
                    titleWords,
                    { opacity: 0, y: 80, rotateX: -45 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: 'power4.out',
                        delay: 0.5,
                    }
                );

                // Kinetic expansion on scroll
                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        titleWords.forEach((word, i) => {
                            const scale = 1 + progress * (0.3 + i * 0.1);
                            const opacity = 1 - progress * 0.6;
                            gsap.set(word, { scale, opacity, transformOrigin: 'center center' });
                        });
                    },
                });
            }

            // Subtitle fade
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 }
            );

            // CTA buttons
            gsap.fromTo(
                ctaRef.current?.children,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.7)',
                    delay: 1.3,
                }
            );

            // Tagline
            gsap.fromTo(
                taglineRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5, delay: 1.8 }
            );

            // Scroll indicator bounce
            gsap.to(scrollIndicatorRef.current, {
                y: 10,
                duration: 1.2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
                delay: 2.5,
            });

            // Hero parallax
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    gsap.set(heroRef.current, {
                        backgroundPositionY: `${self.progress * 50}%`,
                    });
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Magnetic button effect
    const handleMagneticMove = (e, el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.3, ease: 'power2.out' });
    };

    const handleMagneticLeave = (el) => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
            style={{ perspective: '1000px' }}
        >
            {/* Radial gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(247,37,133,0.12) 0%, rgba(131,56,236,0.08) 40%, transparent 70%)',
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 40%, rgba(3,3,6,0.8) 100%)',
                }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 pt-24">
                {/* Left: Text content */}
                <div className="flex-1 text-center lg:text-left">
                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-2 mb-6 px-4 py-2 show-badge">
                        <span className="w-2 h-2 rounded-full bg-magenta-400 animate-pulse" style={{ boxShadow: '0 0 8px #f72585' }} />
                        <span className="text-magenta-400 font-mono text-xs tracking-widest">LIVE EVERY FRIDAY & SATURDAY</span>
                    </div>

                    {/* Kinetic title */}
                    <h1
                        ref={titleRef}
                        className="font-display leading-none mb-6"
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', perspective: '800px' }}
                    >
                        <div className="overflow-hidden">
                            <span className="kinetic-word inline-block gradient-text-chrome">CYBER</span>
                        </div>
                        <div className="overflow-hidden">
                            <span
                                className="kinetic-word inline-block"
                                style={{
                                    background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    textShadow: 'none',
                                    filter: 'drop-shadow(0 0 30px rgba(247,37,133,0.5))',
                                }}
                            >
                                LAUGHS
                            </span>
                        </div>
                    </h1>

                    {/* Glitch subtitle */}
                    <div className="relative mb-4 overflow-hidden">
                        <p
                            ref={subtitleRef}
                            className="font-mono text-sm lg:text-base tracking-[0.3em] text-chrome-mid uppercase"
                        >
                            Underground Comedy Club — Est. 2024
                        </p>
                    </div>

                    {/* Description */}
                    <p
                        ref={taglineRef}
                        className="text-chrome-mid/70 text-base lg:text-lg max-w-lg mb-10 leading-relaxed font-light"
                    >
                        Where neon meets punchlines. The most electrifying comedy experience in the city — live shows, legendary lineups, and kinetic chaos every night.
                    </p>

                    {/* CTA Buttons */}
                    <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <button
                            id="hero-cta-tickets"
                            className="ticket-btn magnetic-btn relative z-10 px-8 py-4 font-display text-xl text-white tracking-widest cursor-none"
                            onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)}
                            onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}
                        >
                            <span className="relative z-10">GET TICKETS</span>
                        </button>

                        <button
                            id="hero-cta-lineup"
                            className="magnetic-btn relative px-8 py-4 font-display text-xl tracking-widest border border-magenta-400/40 text-chrome-light hover:border-magenta-400 transition-all duration-300 cursor-none"
                            style={{ background: 'rgba(247,37,133,0.05)' }}
                            onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)}
                            onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}
                            onClick={() => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            VIEW LINEUP
                        </button>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                        {[
                            { value: '200+', label: 'Shows' },
                            { value: '50K+', label: 'Laughs' },
                            { value: '4.9★', label: 'Rating' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div
                                    className="font-display text-3xl"
                                    style={{
                                        background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-chrome-mid/60 text-xs font-mono tracking-widest uppercase mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: 3D Microphone */}
                <div className="flex-1 flex items-center justify-center">
                    <div
                        className="relative"
                        style={{ width: 'clamp(300px, 40vw, 520px)', height: 'clamp(300px, 40vw, 520px)' }}
                    >
                        {/* Glow ring behind mic */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background:
                                    'radial-gradient(ellipse at center, rgba(247,37,133,0.2) 0%, rgba(131,56,236,0.1) 40%, transparent 70%)',
                                animation: 'pulseGlow 3s ease-in-out infinite',
                            }}
                        />
                        <div
                            className="absolute inset-8 rounded-full border border-magenta-400/20"
                            style={{ animation: 'float 4s ease-in-out infinite' }}
                        />
                        <div
                            className="absolute inset-16 rounded-full border border-neon-purple/20"
                            style={{ animation: 'float 6s ease-in-out infinite reverse' }}
                        />
                        <MicrophoneScene />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
            >
                <span className="font-mono text-xs tracking-widest text-chrome-mid">SCROLL</span>
                <div className="w-px h-12 bg-gradient-to-b from-magenta-400 to-transparent" />
            </div>
        </section>
    );
};

export default HeroSection;
