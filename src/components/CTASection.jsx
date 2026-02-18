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
            gsap.fromTo('.cta-inner',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.cta-inner', start: 'top 82%' },
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
                <div className="divider mb-28" />

                <div className="cta-inner flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
                    {/* Left */}
                    <div className="flex-1">
                        <div className="section-label mb-5">Stay in the loop</div>
                        <h2 className="font-display leading-none mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: '#f5f5f5' }}>
                            NEVER MISS<br />
                            <span className="text-accent">A PUNCHLINE</span>
                        </h2>
                        <p className="text-t2 text-sm max-w-sm leading-relaxed">
                            Early access to tickets, exclusive announcements, and secret shows. No spam — just comedy gold.
                        </p>
                    </div>

                    {/* Right: Form */}
                    <div className="w-full lg:w-auto lg:min-w-[420px]">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="input-field flex-1"
                                />
                                <button id="newsletter-submit" type="submit" className="btn-accent flex-shrink-0">
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center gap-4 p-5 rounded-lg" style={{ background: 'rgba(232,197,71,0.08)', border: '1px solid rgba(232,197,71,0.2)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8c547" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                                <div>
                                    <div className="text-t1 font-medium text-sm">You're in!</div>
                                    <div className="text-t3 font-mono text-xs mt-0.5">Check your inbox for confirmation.</div>
                                </div>
                            </div>
                        )}
                        <p className="text-t3 font-mono text-xs mt-3">Unsubscribe anytime. No spam, ever.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
