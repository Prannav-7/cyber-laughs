import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Crowd/audience Unsplash image
const CROWD_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80&auto=format&fit=crop';

const testimonials = [
    {
        quote: "I laughed so hard I forgot I had a mortgage. Best two hours of my year.",
        author: "Sarah K.",
        role: "Accountant",
        rating: 5,
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop&crop=face',
    },
    {
        quote: "The neon lights, the energy, the jokes — it's like someone plugged comedy into a power grid.",
        author: "Marcus T.",
        role: "Software Engineer",
        rating: 5,
        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80&auto=format&fit=crop&crop=face',
    },
    {
        quote: "Maya Glitch's set about AI replacing her therapist had me crying. Tears of laughter, mostly.",
        author: "Priya M.",
        role: "UX Designer",
        rating: 5,
        img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80&auto=format&fit=crop&crop=face',
    },
];

const TestimonialsSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.testimonials-heading',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: '.testimonials-heading', start: 'top 85%' },
                }
            );
            gsap.fromTo('.testimonial-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="testimonials" className="py-28 overflow-hidden">
            {/* Crowd image */}
            <div className="relative h-72 mb-24 overflow-hidden">
                <img
                    src={CROWD_IMG}
                    alt="Comedy audience"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.2) saturate(0.3)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 25%, transparent 75%, var(--bg) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6">
                        <div className="section-label justify-center mb-4">Crowd Reactions</div>
                        <h2 className="font-display text-t1" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1 }}>
                            THEY <span className="text-accent">LAUGHED</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="testimonials-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <p className="text-t2 text-sm max-w-sm leading-relaxed">
                        Don't take our word for it. Here's what real audience members said after a night at Cyber Laughs.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-accent font-display text-2xl">4.9</span>
                        <div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#e8c547"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <div className="text-t3 font-mono text-xs">from 1,200+ reviews</div>
                        </div>
                    </div>
                </div>

                <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-5">
                                {[...Array(t.rating)].map((_, si) => (
                                    <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#e8c547"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>

                            <p className="text-t2 text-sm leading-relaxed mb-6">"{t.quote}"</p>

                            <div className="flex items-center gap-3">
                                <img
                                    src={t.img}
                                    alt={t.author}
                                    className="w-9 h-9 rounded-full object-cover"
                                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                    loading="lazy"
                                />
                                <div>
                                    <div className="text-t1 text-sm font-medium">{t.author}</div>
                                    <div className="text-t3 font-mono text-xs">{t.role}</div>
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
