import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextGenerateEffect from './TextGenerateEffect';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMG = 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1400&q=85&auto=format&fit=crop';

const AboutSection = () => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Fade-out transition from Hero ──
            // The section starts fully covered by a dark overlay that fades away as you scroll in
            gsap.fromTo(overlayRef.current,
                { opacity: 1 },
                {
                    opacity: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1.5,
                    },
                }
            );

            // ── Parallax on background image ──
            gsap.to(imgRef.current, {
                yPercent: 18,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // ── Section label slides in from left ──
            gsap.fromTo('.about-label',
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-label', start: 'top 85%' },
                }
            );

            // ── Heading: each word drops in ──
            gsap.fromTo('.about-word',
                { opacity: 0, y: 80, skewY: 4 },
                {
                    opacity: 1, y: 0, skewY: 0,
                    duration: 1, stagger: 0.08, ease: 'power4.out',
                    scrollTrigger: { trigger: '.about-heading', start: 'top 82%' },
                }
            );

            // ── Body text fades up ──
            gsap.fromTo('.about-body',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-body', start: 'top 88%' },
                }
            );

            // ── CTA button ──
            gsap.fromTo('.about-cta',
                { opacity: 0, y: 20, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: '.about-cta', start: 'top 90%' },
                }
            );

            // ── Stat cards stagger in ──
            gsap.fromTo('.stat-card',
                { opacity: 0, y: 40, scale: 0.92 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.75, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
                }
            );

            // ── Counter numbers ──
            document.querySelectorAll('.counter-num').forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                const proxy = { val: 0 };
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                    onEnter() {
                        gsap.to(proxy, {
                            val: target,
                            duration: 1.8,
                            ease: 'power2.out',
                            onUpdate() {
                                el.textContent = Math.round(proxy.val) + suffix;
                            },
                        });
                    },
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const words = ['LIVE', 'COMEDY', 'ENTERTAINMENT'];

    return (
        <section ref={sectionRef} id="about" className="relative overflow-hidden">

            {/* ── Dark overlay that fades away as section enters ── */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-30 pointer-events-none"
                style={{ background: 'rgba(13,11,8,1)' }}
            />

            {/* ── Parallax Image Banner ── */}
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <img
                    ref={imgRef}
                    src={ABOUT_IMG}
                    alt="Comedy Stage"
                    className="absolute top-0 left-0 w-full h-[130%] object-cover"
                    style={{ filter: 'brightness(0.25) saturate(0.4)' }}
                    loading="lazy"
                />
                {/* Gradient top & bottom to blend with bg */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(13,11,8,1) 0%, rgba(13,11,8,0.1) 20%, rgba(13,11,8,0.1) 80%, rgba(13,11,8,1) 100%)'
                    }}
                />

                {/* ── Content ── */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center py-32">

                    <div className="about-label section-label mb-10 opacity-0">Company Overview</div>

                    <h2 className="about-heading font-display leading-none mb-10 overflow-hidden"
                        style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', color: 'var(--t1)', textTransform: 'uppercase', fontWeight: '900' }}
                    >
                        {words.map((word, i) => (
                            <span
                                key={i}
                                className="about-word inline-block opacity-0"
                                style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}
                            >
                                {word}
                            </span>
                        ))}
                    </h2>

                    <p className="about-body text-white/80 text-sm md:text-lg max-w-3xl leading-relaxed tracking-wide mb-12">
                        <TextGenerateEffect
                            words="Besides stage we have done Television, Movies, YouTube, Corporate Shows, Private Gatherings, Sangeets, Bachelor Parties and much more. We have performed for every occasion except for a funeral — and we're looking forward to that as well."
                            duration={0.85}
                            filter={true}
                            stagger={0.13}
                            triggerStart="top 85%"
                            wordClass="text-white/80"
                        />
                    </p>

                    <button className="about-cta btn-primary px-12 py-5 text-[10px] uppercase tracking-[0.35em] font-bold opacity-0">
                        Our Story
                    </button>
                </div>
            </div>

            {/* ── Stats Block ── */}
            <div className="relative z-10 bg-[#0d0b08] py-24 md:py-32">
                <div className="max-w-6xl mx-auto px-6 lg:px-16">
                    <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
                        {[
                            { label: 'Performances', target: 2500, suffix: '+' },
                            { label: 'Happy Guests', target: 120, suffix: 'K' },
                            { label: 'City Tours', target: 45, suffix: '' },
                            { label: 'Awards Won', target: 12, suffix: '' },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="stat-card flex flex-col items-center justify-center text-center p-10 md:p-14 bg-[#0d0b08] opacity-0 group hover:bg-white/[0.02] transition-colors duration-500"
                            >
                                <div className="font-display text-5xl md:text-7xl mb-4 group-hover:scale-110 transition-transform duration-500" style={{ color: 'var(--accent)' }}>
                                    <span className="counter-num" data-target={s.target} data-suffix={s.suffix}>0</span>
                                </div>
                                <div className="font-mono text-[9px] md:text-xs tracking-[0.35em] uppercase opacity-30 group-hover:opacity-60 transition-opacity">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutSection;
