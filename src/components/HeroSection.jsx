import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// High-quality comedy/stage Unsplash images for slideshow
const SLIDES = [
    {
        img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=85&auto=format&fit=crop',
        label: 'Live Stand-Up',
    },
    {
        img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85&auto=format&fit=crop',
        label: 'Sold-Out Crowds',
    },
    {
        img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920&q=85&auto=format&fit=crop',
        label: 'Electric Atmosphere',
    },
    {
        img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1920&q=85&auto=format&fit=crop',
        label: 'Every Night Live',
    },
];

const INTERVAL = 3000; // Strictly matching Comedy Factory 3s rotation

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const slidesRef = useRef([]);
    const timerRef = useRef(null);
    const progressRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const [progKey, setProgKey] = useState(0);

    // Crossfade to next slide
    const goTo = useCallback((idx) => {
        const prev = slidesRef.current[current];
        const next = slidesRef.current[idx];
        if (!prev || !next) return;

        gsap.to(prev, { opacity: 0, duration: 0.8, ease: 'power2.inOut' });
        gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
        setCurrent(idx);
        setProgKey(k => k + 1);
    }, [current]);

    // Auto-advance
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrent(c => {
                const next = (c + 1) % SLIDES.length;
                const prev = slidesRef.current[c];
                const nxt = slidesRef.current[next];
                if (prev) gsap.to(prev, { opacity: 0, duration: 0.8, ease: 'power2.inOut' });
                if (nxt) gsap.fromTo(nxt, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
                setProgKey(k => k + 1);
                return next;
            });
        }, INTERVAL);
        return () => clearInterval(timerRef.current);
    }, []);

    // Entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Animate the badge box (first child of the center content div)
            tl.fromTo('[data-hero-badge]',
                { opacity: 0, y: -16 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            )
                // Buttons
                .fromTo('.hero-btns > *',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                    '-=0.3'
                )
                // Title (whole h1)
                .fromTo('[data-hero-title]',
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
                    '-=0.3'
                )
                // Tagline
                .fromTo('.hero-tagline',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.5'
                )
                // Stats
                .fromTo('.hero-stats > *',
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
                    '-=0.4'
                );

            // Kinetic scroll: title fades + scales as you scroll away
            if (titleRef.current) {
                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    onUpdate(self) {
                        const p = self.progress;
                        titleRef.current.style.transform = `translateY(${p * -40}px) scale(${1 + p * 0.08})`;
                        titleRef.current.style.opacity = String(Math.max(0, 1 - p * 0.9));
                    },
                });
            }

            // Scroll indicator bounce
            gsap.to('.scroll-ind', { y: 8, duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToLineup = () => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">

            {/* ── Slideshow ── */}
            <div className="absolute inset-0 z-0">
                {SLIDES.map((s, i) => (
                    <div
                        key={i}
                        ref={el => (slidesRef.current[i] = el)}
                        className="hero-slide"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                        <img src={s.img} alt={s.label} />
                    </div>
                ))}
                {/* Warm amber tint overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(13,11,8,0.15) 0%, rgba(13,11,8,0.1) 40%, rgba(13,11,8,0.75) 75%, rgba(13,11,8,1) 100%)' }}
                />
                {/* Left vignette for text readability */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(13,11,8,0.85) 0%, rgba(13,11,8,0.4) 55%, transparent 100%)' }}
                />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-16 pt-20 pb-12 flex flex-col items-center justify-center min-h-[85vh]">

                {/* Center Content */}
                <div className="w-full flex flex-col items-center text-center z-20">

                    {/* Specialized Badge - More Compact */}
                    <div data-hero-badge className="mb-10 p-6 md:p-10 bg-[#1a1712]/85 backdrop-blur-md border border-white/5 rounded-sm max-w-lg">
                        <div className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 mb-2">At Cyber Laughs</div>
                        <h2 className="font-display text-xl md:text-3xl leading-tight" style={{ color: 'var(--accent)' }}>
                            We specialize in <span className="text-white">Insanity!</span>
                        </h2>
                    </div>

                    <div className="hero-btns flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                        <button id="hero-domestic" className="btn-primary px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold" onClick={scrollToLineup}>
                            Domestic Shows
                        </button>
                        <button id="hero-intl" className="btn-primary px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold bg-[#e8b84b] hover:bg-[#d4a33a]" onClick={scrollToLineup}>
                            International Shows
                        </button>
                    </div>

                    {/* Bold Title - Reference Style */}
                    <h1
                        ref={titleRef}
                        data-hero-title
                        className="font-display leading-none mb-6"
                        style={{ color: 'var(--t1)', fontSize: 'clamp(2.5rem, 8vw, 6.2rem)', textTransform: 'uppercase' }}
                    >
                        UNFILTERED COMEDY NIGHTS
                    </h1>

                    <p className="hero-tagline text-t2 text-[10px] md:text-base max-w-4xl leading-relaxed font-bold tracking-widest uppercase opacity-70 mb-12">
                        "THE RAW ENERGY OF THE UNDERGROUND. NO SCRIPTS, NO LIMITS—JUST PURE, CHAOTIC HILARITY."
                    </p>

                    {/* Stats */}
                    <div className="hero-stats flex flex-wrap justify-center gap-x-20 gap-y-8 border-t border-white/5 pt-12">
                        {[
                            { n: '250+', l: 'Shows A Year' },
                            { n: '120K+', l: 'Happy Guests' },
                            { n: '4.9★', l: 'Global Rating' },
                        ].map(s => (
                            <div key={s.l} className="flex flex-col items-center group">
                                <div className="font-display text-4xl md:text-5xl transition-all duration-500 group-hover:text-white" style={{ color: 'var(--accent)' }}>{s.n}</div>
                                <div className="font-mono text-[9px] md:text-xs tracking-[0.3em] uppercase mt-2 opacity-30 group-hover:opacity-60 transition-opacity">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Slide controls ── */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
                {/* Progress bar */}
                <div className="w-48 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div key={progKey} className="slide-progress-bar" />
                </div>
                {/* Dots */}
                <div className="flex gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`slide-dot${i === current ? ' active' : ''}`}
                            onClick={() => { clearInterval(timerRef.current); goTo(i); }}
                        />
                    ))}
                </div>
                {/* Slide label */}
                <div className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                    {SLIDES[current].label}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-ind absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40 hidden lg:flex">
                <div className="w-px h-12 bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
                <span className="font-mono text-xs tracking-[0.3em] rotate-90 origin-center mt-2" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>Scroll</span>
            </div>
        </section>
    );
};

export default HeroSection;
