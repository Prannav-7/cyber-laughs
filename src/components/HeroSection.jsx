import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MicrophoneScene from './MicrophoneScene';

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

const INTERVAL = 4000;

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

        gsap.to(prev, { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
        gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.inOut' });
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
                if (prev) gsap.to(prev, { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
                if (nxt) gsap.fromTo(nxt, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.inOut' });
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
            tl.fromTo('.hero-badge',
                { opacity: 0, y: -12 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            )
                .fromTo('.hero-title-word',
                    { opacity: 0, y: 60, skewY: 3 },
                    { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.1, ease: 'power4.out' },
                    '-=0.2'
                )
                .fromTo('.hero-tagline',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.5'
                )
                .fromTo('.hero-btns > *',
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                    '-=0.4'
                )
                .fromTo('.hero-stats > *',
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
                    '-=0.3'
                )
                .fromTo('.hero-mic-wrap',
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
                    0.5
                );

            // Kinetic scroll: title words expand + fade
            const words = titleRef.current?.querySelectorAll('.hero-title-word');
            if (words?.length) {
                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    onUpdate(self) {
                        const p = self.progress;
                        words.forEach((w, i) => {
                            w.style.transform = `translateY(${p * -30}px) scale(${1 + p * (0.12 + i * 0.04)})`;
                            w.style.opacity = String(Math.max(0, 1 - p * 0.8));
                        });
                    },
                });
            }

            // Scroll indicator
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-12">

                {/* Left */}
                <div className="flex-1 min-w-0">
                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm"
                        style={{ background: 'rgba(232,184,75,0.12)', border: '1px solid rgba(232,184,75,0.3)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ background: 'var(--accent)' }} />
                        <span className="font-mono text-accent text-xs tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>
                            Live Every Fri & Sat
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="font-display leading-[0.88] mb-5"
                        style={{ fontSize: 'clamp(3.8rem, 9.5vw, 9rem)', perspective: '600px' }}
                    >
                        <div className="overflow-hidden">
                            <span className="hero-title-word inline-block" style={{ color: 'var(--t1)' }}>LAUGHTER</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-title-word inline-block" style={{ color: 'var(--accent)' }}>IS OUR</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-title-word inline-block" style={{ color: 'var(--t1)' }}>BUSINESS</span>
                        </div>
                    </h1>

                    <p className="hero-tagline text-t2 text-base max-w-md mb-8 leading-relaxed font-light" style={{ color: 'var(--t2)' }}>
                        And we take it seriously. The city's most electric comedy club — live shows, legendary lineups, every single week.
                    </p>

                    <div className="hero-btns flex flex-wrap gap-3 mb-12">
                        <button id="hero-domestic" className="btn-primary" onClick={scrollToLineup}>
                            Domestic Shows
                        </button>
                        <button id="hero-intl" className="btn-outline" onClick={scrollToLineup}>
                            International Shows
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats flex gap-10">
                        {[
                            { n: '200+', l: 'Shows' },
                            { n: '50K+', l: 'Tickets Sold' },
                            { n: '4.9★', l: 'Avg Rating' },
                        ].map(s => (
                            <div key={s.l}>
                                <div className="font-display text-3xl" style={{ color: 'var(--accent)' }}>{s.n}</div>
                                <div className="font-mono text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: 3D Mic */}
                <div
                    className="hero-mic-wrap flex-shrink-0 relative"
                    style={{ width: 'clamp(260px, 36vw, 460px)', height: 'clamp(260px, 36vw, 460px)' }}
                >
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'radial-gradient(ellipse at center, rgba(232,184,75,0.07) 0%, transparent 70%)' }}
                    />
                    <MicrophoneScene />
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
