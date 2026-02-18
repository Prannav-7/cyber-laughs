import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CROWD_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85&auto=format&fit=crop';

const testimonials = [
    {
        quote: "I laughed so hard I forgot I had a mortgage. Best two hours of my year, hands down.",
        author: "Sarah K.",
        role: "Accountant",
        rating: 5,
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop&crop=face',
    },
    {
        quote: "The atmosphere, the energy, the jokes — it's like someone plugged comedy into a power grid.",
        author: "Marcus T.",
        role: "Software Engineer",
        rating: 5,
        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80&auto=format&fit=crop&crop=face',
    },
    {
        quote: "Maya Glitch's set about AI replacing her therapist had me in tears. Absolute genius.",
        author: "Priya M.",
        role: "UX Designer",
        rating: 5,
        img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80&auto=format&fit=crop&crop=face',
    },
];

const TestimonialsSection = () => {
    const sectionRef = useRef(null);
    const bannerRef = useRef(null);
    const bannerImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax
            gsap.to(bannerImgRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: bannerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Cards
            gsap.fromTo('.testimonial-card',
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0,
                    duration: 0.75,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="testimonials">
            {/* Parallax banner */}
            <div ref={bannerRef} className="relative h-60 overflow-hidden">
                <img
                    ref={bannerImgRef}
                    src={CROWD_IMG}
                    alt="Comedy audience"
                    className="parallax-img"
                    style={{ filter: 'brightness(0.2) saturate(0.4)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,8,1) 0%, transparent 25%, transparent 75%, rgba(13,11,8,1) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6">
                        <div className="section-label justify-center mb-4">Crowd Reactions</div>
                        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--t1)', lineHeight: 1 }}>
                            THEY <span style={{ color: 'var(--accent)' }}>LAUGHED</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
                {/* Rating summary */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="font-display text-6xl" style={{ color: 'var(--accent)' }}>4.9</div>
                        <div>
                            <div className="flex gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e8b84b">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="font-mono text-xs" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>from 1,200+ reviews</div>
                        </div>
                    </div>
                    <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--t2)' }}>
                        Real words from real audience members. No filters, no PR spin — just honest reactions.
                    </p>
                </div>

                <div className="divider mb-12" />

                <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, si) => (
                                    <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#e8b84b">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--t2)' }}>"{t.quote}"</p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={t.img}
                                    alt={t.author}
                                    className="w-9 h-9 rounded-full object-cover"
                                    style={{ border: '1px solid rgba(232,184,75,0.2)' }}
                                    loading="lazy"
                                />
                                <div>
                                    <div className="text-sm font-medium" style={{ color: 'var(--t1)' }}>{t.author}</div>
                                    <div className="font-mono text-xs" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
