import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const sectionRef = useRef(null);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content > *',
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.cta-content', start: 'top 82%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    return (
        <section ref={sectionRef} id="newsletter" className="py-28 px-6 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="divider mb-24" />

                <div className="cta-content flex flex-col items-center text-center">
                    {/* Content */}
                    <div className="max-w-3xl mb-16">
                        <div className="section-label mb-8 justify-center">Join The Underground</div>
                        <h2 className="font-display leading-none mb-8" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: 'var(--t1)' }}>
                            NEVER MISS<br />
                            <span style={{ color: 'var(--accent)' }}>A PUNCHLINE</span>
                        </h2>
                        <p className="text-base md:text-xl leading-relaxed opacity-70 italic max-w-2xl mx-auto">
                            "Early access to tickets, exclusive announcements, and secret shows. No spam — just comedy gold delivered straight to your inbox."
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full max-w-lg">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 p-2 bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="input-field bg-transparent border-none px-6 py-4 flex-1 focus:ring-0"
                                />
                                <button id="newsletter-submit" type="submit" className="btn-primary px-10 py-4 text-xs uppercase tracking-widest">
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center gap-4 p-10 rounded-sm bg-accent/5 border border-accent/20">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <div className="text-xl font-display uppercase tracking-widest" style={{ color: 'var(--t1)' }}>Welcome To The Club</div>
                                <div className="font-mono text-xs opacity-50">Check your inbox for your first secret show invite.</div>
                            </div>
                        )}
                        <p className="font-mono text-[10px] md:text-xs mt-6 opacity-30 tracking-[0.2em] uppercase">
                            * Unsubscribe anytime • No spam ever *
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
