import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MicrophoneScene from './MicrophoneScene';

gsap.registerPlugin(ScrollTrigger);

// Real Unsplash images — comedy club / stage atmosphere
const BG_IMAGE = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1800&q=80&auto=format&fit=crop';

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance — stagger children, use transform only (GPU)
            const tl = gsap.timeline({ delay: 0.2 });

            tl.fromTo('.hero-label',
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            )
                .fromTo('.hero-word',
                    { opacity: 0, y: 48, skewY: 4 },
                    { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
                    '-=0.3'
                )
                .fromTo('.hero-sub',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.4'
                )
                .fromTo('.hero-cta',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
                    '-=0.3'
                )
                .fromTo('.hero-stats > div',
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo('.hero-mic',
                    { opacity: 0, scale: 0.92 },
                    { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
                    0.4
                );

            // Kinetic title scale on scroll — transform only, no layout
            const words = titleRef.current?.querySelectorAll('.hero-word');
            if (words) {
                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                    onUpdate: (self) => {
                        const p = self.progress;
                        words.forEach((w, i) => {
                            const s = 1 + p * (0.15 + i * 0.05);
                            w.style.transform = `translateY(${p * -20}px) scale(${s})`;
                            w.style.opacity = String(1 - p * 0.7);
                        });
                    },
                });
            }

            // Scroll indicator fade
            gsap.to('.scroll-indicator', {
                y: 8, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToLineup = () => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={BG_IMAGE}
                    alt="Comedy club stage"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.18) saturate(0.4)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.98) 40%, rgba(10,10,10,0.5) 100%)' }} />
                <div className="absolute inset-0 hero-dots opacity-60" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16">

                {/* ── Left: Text ── */}
                <div className="flex-1 min-w-0">
                    <div className="hero-label section-label mb-6">Live Comedy — Est. 2024</div>

                    <h1
                        ref={titleRef}
                        className="font-display leading-[0.9] mb-6 overflow-hidden"
                        style={{ fontSize: 'clamp(4rem, 9vw, 8.5rem)' }}
                    >
                        <div className="overflow-hidden">
                            <span className="hero-word inline-block" style={{ color: '#f5f5f5' }}>CYBER</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-word inline-block text-accent">LAUGHS</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-word inline-block" style={{ color: '#555', fontSize: '0.55em', letterSpacing: '0.15em' }}>UNDERGROUND</span>
                        </div>
                    </h1>

                    <p className="hero-sub text-t2 text-base lg:text-lg max-w-md mb-10 leading-relaxed font-light">
                        The city's most intimate comedy venue. Handpicked headliners, electric atmosphere, and punchlines that land every time.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-14">
                        <button id="hero-tickets" className="hero-cta btn-accent" onClick={scrollToLineup}>
                            Book Tickets
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                        <button id="hero-lineup" className="hero-cta btn-ghost" onClick={scrollToLineup}>
                            View Lineup
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats flex gap-10">
                        {[
                            { n: '200+', l: 'Shows' },
                            { n: '50K+', l: 'Tickets Sold' },
                            { n: '4.9', l: 'Avg Rating' },
                        ].map(s => (
                            <div key={s.l}>
                                <div className="font-display text-3xl text-accent">{s.n}</div>
                                <div className="text-t3 text-xs font-mono mt-0.5 tracking-widest uppercase">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: 3D Mic ── */}
                <div
                    className="hero-mic flex-shrink-0 relative"
                    style={{ width: 'clamp(280px, 38vw, 480px)', height: 'clamp(280px, 38vw, 480px)' }}
                >
                    {/* Subtle glow disc */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(ellipse at center, rgba(232,197,71,0.08) 0%, transparent 70%)' }}
                    />
                    <MicrophoneScene />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
                <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-t3 uppercase">Scroll</span>
            </div>
        </section>
    );
};

export default HeroSection;
