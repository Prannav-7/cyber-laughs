import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMG = 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1400&q=85&auto=format&fit=crop';
const PERFORM_IMG = 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=900&q=85&auto=format&fit=crop';

const AboutSection = () => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax on the background image
            gsap.to(imgRef.current, {
                yPercent: 25,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Text reveals
            gsap.fromTo('.about-label, .about-heading, .about-body, .about-cta',
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
                }
            );

            // Right image reveal
            gsap.fromTo('.about-right-img',
                { opacity: 0, x: 40, scale: 0.96 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-right-img', start: 'top 82%' },
                }
            );

            // Counter numbers
            const counters = document.querySelectorAll('.counter-num');
            counters.forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                    onEnter() {
                        gsap.fromTo({ val: 0 }, {
                            val: target, duration: 1.5, ease: 'power2.out',
                            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + (el.dataset.suffix || ''); }
                        });
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="parallax-section overflow-hidden">
            {/* Full-width parallax image strip */}
            <div className="relative h-[55vh] overflow-hidden">
                <img
                    ref={imgRef}
                    src={ABOUT_IMG}
                    alt="Live comedy performance"
                    className="parallax-img"
                    style={{ filter: 'brightness(0.25) saturate(0.5)' }}
                    loading="lazy"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,8,1) 0%, transparent 20%, transparent 80%, rgba(13,11,8,1) 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,11,8,0.6) 0%, transparent 60%)' }} />

                {/* Centered text on image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6">
                        <div className="section-label justify-center mb-4">About Us</div>
                        <h2
                            className="font-display"
                            style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', color: 'var(--t1)', lineHeight: 0.9 }}
                        >
                            LIVE COMEDY<br />
                            <span style={{ color: 'var(--accent)' }}>ENTERTAINMENT</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Content below image */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left: Text */}
                    <div className="about-text flex-1">
                        <div className="about-label section-label mb-5">Our Story</div>
                        <h3
                            className="about-heading font-display mb-6"
                            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--t1)', lineHeight: 1.05 }}
                        >
                            BESIDES THE STAGE, WE'VE DONE IT ALL
                        </h3>
                        <p className="about-body leading-relaxed mb-4" style={{ color: 'var(--t2)', fontSize: '0.95rem' }}>
                            Television, movies, YouTube, corporate shows, private gatherings, sangeets, bachelor parties and much more. We have performed for every occasion except a funeral — and we're looking forward to that as well.
                        </p>
                        <p className="about-body leading-relaxed mb-8" style={{ color: 'var(--t2)', fontSize: '0.95rem' }}>
                            Founded in 2024, Cyber Laughs has grown from a 50-seat underground venue to the city's most talked-about comedy destination. Every show is handcrafted, every performer vetted, every punchline earned.
                        </p>
                        <button className="about-cta btn-primary">
                            Learn More
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    {/* Right: Stats + image */}
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { n: 200, suffix: '+', l: 'Shows Performed' },
                                { n: 50, suffix: 'K+', l: 'Tickets Sold' },
                                { n: 12, suffix: '+', l: 'Cities Covered' },
                                { n: 98, suffix: '%', l: 'Audience Satisfaction' },
                            ].map(s => (
                                <div key={s.l} className="surface-card p-5">
                                    <div
                                        className="counter-num font-display text-4xl mb-1"
                                        style={{ color: 'var(--accent)' }}
                                        data-target={s.n}
                                        data-suffix={s.suffix}
                                    >
                                        0{s.suffix}
                                    </div>
                                    <div className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>{s.l}</div>
                                </div>
                            ))}
                        </div>

                        {/* Performer image */}
                        <div className="about-right-img relative rounded overflow-hidden" style={{ height: '260px' }}>
                            <img
                                src={PERFORM_IMG}
                                alt="Performer on stage"
                                className="w-full h-full object-cover"
                                style={{ filter: 'brightness(0.7) saturate(0.6)' }}
                                loading="lazy"
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,11,8,0.8) 0%, transparent 60%)' }} />
                            <div className="absolute bottom-4 left-4">
                                <div className="tag">Featured Performer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
