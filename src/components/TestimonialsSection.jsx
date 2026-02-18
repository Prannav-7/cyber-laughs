import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "I laughed so hard I forgot I had a mortgage. 10/10 would recommend existential relief.",
        author: "Sarah K.",
        role: "Accountant by day, chaos enjoyer by night",
        color: '#f72585',
    },
    {
        quote: "The neon lights, the energy, the jokes — it's like someone plugged comedy into a power grid.",
        author: "Marcus T.",
        role: "Software Engineer & Comedy Addict",
        color: '#8338ec',
    },
    {
        quote: "Maya Glitch's set about AI replacing her therapist had me crying. Tears of laughter, mostly.",
        author: "Priya M.",
        role: "UX Designer & Frequent Flyer",
        color: '#00f5ff',
    },
];

const TestimonialsSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.testimonials-heading',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.testimonials-heading',
                        start: 'top 85%',
                    },
                }
            );

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, rotateY: -15 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 0.9,
                        delay: i * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-32 px-6 lg:px-12 overflow-hidden"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(247,37,133,0.04) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="testimonials-heading text-center mb-16">
                    <div className="show-badge inline-flex items-center gap-2 px-3 py-1 mb-4">
                        <span className="text-magenta-400 font-mono text-xs tracking-widest">CROWD REACTIONS</span>
                    </div>
                    <h2
                        className="font-display leading-none"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                    >
                        <span className="gradient-text-chrome">THEY </span>
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            LAUGHED
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="glass-card p-8 relative overflow-hidden cursor-none"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Quote mark */}
                            <div
                                className="font-display text-8xl leading-none absolute -top-2 -left-2 opacity-10"
                                style={{ color: t.color }}
                            >
                                "
                            </div>

                            <div
                                className="absolute bottom-0 left-0 right-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${t.color}60, transparent)` }}
                            />

                            <p className="text-chrome-light/80 text-base leading-relaxed mb-6 relative z-10 italic">
                                "{t.quote}"
                            </p>

                            <div className="relative z-10">
                                <div className="font-semibold text-chrome-light">{t.author}</div>
                                <div className="text-chrome-mid/50 text-xs font-mono mt-1">{t.role}</div>
                            </div>

                            {/* Star rating */}
                            <div className="flex gap-1 mt-4 relative z-10">
                                {[...Array(5)].map((_, si) => (
                                    <span key={si} style={{ color: t.color, textShadow: `0 0 8px ${t.color}` }}>★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
