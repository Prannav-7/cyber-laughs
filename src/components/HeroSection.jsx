import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextGenerateEffect from './TextGenerateEffect';
import { TextRevealCard, TextRevealCardDescription } from './TextRevealCard';

gsap.registerPlugin(ScrollTrigger);

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

const STATS = [
    { n: '250+', l: 'Shows A Year' },
    { n: '120K+', l: 'Happy Guests' },
    { n: '4.9★', l: 'Global Rating' },
];

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const slidesRef = useRef([]);
    const timerRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const [progKey, setProgKey] = useState(0);

    // Crossfade
    const goTo = useCallback((idx) => {
        const prev = slidesRef.current[current];
        const next = slidesRef.current[idx];
        if (!prev || !next) return;
        gsap.to(prev, { opacity: 0, duration: 1, ease: 'power2.inOut' });
        gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.inOut' });
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
                if (prev) gsap.to(prev, { opacity: 0, duration: 1, ease: 'power2.inOut' });
                if (nxt) gsap.fromTo(nxt, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.inOut' });
                setProgKey(k => k + 1);
                return next;
            });
        }, INTERVAL);
        return () => clearInterval(timerRef.current);
    }, []);

    // Entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });

            // 1. Label line slides in from left
            tl.fromTo('.hero-label',
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
            )
                // 2. Title drops in
                .fromTo(titleRef.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' },
                    '-=0.2'
                )
                // 3. Divider line expands
                .fromTo('.hero-divider',
                    { scaleX: 0, transformOrigin: 'left' },
                    { scaleX: 1, duration: 0.6, ease: 'power2.out' },
                    '-=0.2'
                )
                // 4. Buttons pop in
                .fromTo('.hero-btns > *',
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' },
                    '-=0.2'
                )
                // 5. Stats stagger in
                .fromTo('.hero-stat',
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                    '-=0.3'
                );
            // NOTE: TextGenerateEffect owns the tagline animation — do not animate .hero-tagline here

            // Kinetic scroll: title drifts up as you scroll
            if (titleRef.current) {
                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    onUpdate(self) {
                        const p = self.progress;
                        titleRef.current.style.transform = `translateY(${p * -50}px)`;
                        titleRef.current.style.opacity = String(Math.max(0, 1 - p * 1.2));
                    },
                });
            }

            // Scroll indicator bounce
            gsap.to('.scroll-ind', { y: 8, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToLineup = () => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-end overflow-hidden">

            {/* ── Slideshow background ── */}
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

                {/* Bottom-heavy dark gradient so text is readable */}
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, rgba(13,11,8,0.2) 0%, rgba(13,11,8,0.3) 40%, rgba(13,11,8,0.85) 70%, rgba(13,11,8,1) 100%)'
                }} />
                {/* Left vignette */}
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to right, rgba(13,11,8,0.9) 0%, rgba(13,11,8,0.5) 50%, transparent 100%)'
                }} />
            </div>

            {/* ── Main content — left-aligned, bottom-anchored ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-28 pt-36">
                <div className="max-w-3xl">

                    {/* Label */}
                    <div className="hero-label flex items-center gap-4 mb-8">
                        <div className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
                            Cyber Laughs · Est. 2018
                        </span>
                    </div>

                    {/* Main title — TextRevealCard: hover to reveal in gold */}
                    <h1
                        ref={titleRef}
                        className="mb-8"
                        style={{ lineHeight: 0.92 }}
                    >
                        <TextRevealCard
                            text={`UNFILTERED
COMEDY
NIGHTS`}
                            revealText={`UNFILTERED
COMEDY
NIGHTS`}
                        >
                            <TextRevealCardDescription>
                                Hover to feel the energy
                            </TextRevealCardDescription>
                        </TextRevealCard>
                    </h1>

                    {/* Tagline with TextGenerateEffect */}
                    <p className="hero-tagline mb-10 max-w-xl">
                        <TextGenerateEffect
                            words="The raw energy of the underground. No scripts, no limits — just pure, chaotic hilarity."
                            duration={0.9}
                            filter={true}
                            stagger={0.15}
                            delay={1.2}
                            heroMode={true}
                            className="text-white/60 text-sm md:text-base leading-relaxed"
                        />
                    </p>

                    {/* Divider */}
                    <div className="hero-divider w-full h-px mb-10" style={{ background: 'rgba(255,255,255,0.08)' }} />

                    {/* CTA Buttons */}
                    <div className="hero-btns flex flex-wrap gap-4 mb-16">
                        <button
                            id="hero-domestic"
                            className="btn-primary px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold"
                            onClick={scrollToLineup}
                        >
                            Domestic Shows
                        </button>
                        <button
                            id="hero-intl"
                            className="btn-outline px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold"
                            onClick={scrollToLineup}
                        >
                            International Shows
                        </button>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-x-12 gap-y-6">
                        {STATS.map((s, i) => (
                            <div key={i} className="hero-stat flex flex-col" style={{ opacity: 0 }}>
                                <span
                                    className="font-display text-3xl md:text-4xl leading-none"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    {s.n}
                                </span>
                                <span className="font-mono text-[9px] tracking-[0.3em] uppercase mt-1 opacity-40">
                                    {s.l}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Slide controls — bottom right ── */}
            <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end gap-3">
                {/* Slide label */}
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">
                    {SLIDES[current].label}
                </div>
                {/* Progress bar */}
                <div className="w-32 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
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
            </div>

            {/* ── Scroll indicator — right side ── */}
            <div className="scroll-ind absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30 hidden lg:flex">
                <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
                <span
                    className="font-mono text-[9px] tracking-[0.35em] uppercase mt-2"
                    style={{ writingMode: 'vertical-rl', color: 'var(--t3)' }}
                >
                    Scroll
                </span>
            </div>

        </section>
    );
};

export default HeroSection;
