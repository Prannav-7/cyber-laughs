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

                <div className="cta-content flex flex-col lg:flex-row items-start lg:items-end justify-between gap-14">
                    {/* Left */}
                    <div className="flex-1">
                        <div className="section-label mb-5">Stay in the loop</div>
                        <h2 className="font-display leading-none mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'var(--t1)' }}>
                            NEVER MISS<br />
                            <span style={{ color: 'var(--accent)' }}>A PUNCHLINE</span>
                        </h2>
                        <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--t2)' }}>
                            Early access to tickets, exclusive announcements, and secret shows. No spam — just comedy gold.
                        </p>
                    </div>

                    {/* Right: Form */}
                    <div className="w-full lg:w-auto lg:min-w-[400px]">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="input-field"
                                />
                                <button id="newsletter-submit" type="submit" className="btn-primary flex-shrink-0">
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center gap-4 p-5 rounded"
                                style={{ background: 'rgba(232,184,75,0.08)', border: '1px solid rgba(232,184,75,0.2)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" strokeWidth="2.5">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                <div>
                                    <div className="text-sm font-medium" style={{ color: 'var(--t1)' }}>You're in!</div>
                                    <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>Check your inbox for confirmation.</div>
                                </div>
                            </div>
                        )}
                        <p className="font-mono text-xs mt-3" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                            Unsubscribe anytime. No spam, ever.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
