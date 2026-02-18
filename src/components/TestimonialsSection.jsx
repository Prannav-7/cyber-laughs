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

            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 md:py-24 text-center">
                {/* Rating summary */}
                <div className="flex flex-col items-center gap-8 mb-16 md:mb-24">
                    <div className="section-label mb-2">Honest Reactions</div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="font-display text-8xl md:text-9xl leading-none" style={{ color: 'var(--accent)' }}>4.9</div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-2 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#e8b84b">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase opacity-40">1,200+ Verified Audience Reviews</div>
                        </div>
                    </div>
                    <p className="text-base md:text-xl max-w-2xl leading-relaxed opacity-70 italic">
                        "Real words from real audience members. No filters, no PR spin — just honest reactions from the front lines of underground comedy."
                    </p>
                </div>

                <div className="w-16 h-px bg-white/10 mx-auto my-16 md:my-24" />

                <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card p-8 border border-white/5 bg-white/[0.01] flex flex-col items-center text-center">
                            <div className="flex gap-1.5 mb-6">
                                {[...Array(t.rating)].map((_, si) => (
                                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#e8b84b">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-base md:text-lg leading-relaxed mb-10 opacity-80 italic italic">"{t.quote}"</p>
                            <div className="flex flex-col items-center gap-4 mt-auto">
                                <img
                                    src={t.img}
                                    alt={t.author}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-accent/20 grayscale hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                />
                                <div>
                                    <div className="text-sm md:text-base font-medium tracking-wide" style={{ color: 'var(--t1)' }}>{t.author}</div>
                                    <div className="font-mono text-[10px] md:text-xs tracking-widest opacity-40 uppercase mt-1">{t.role}</div>
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
