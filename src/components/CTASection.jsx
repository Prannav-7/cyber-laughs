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
            gsap.fromTo(
                '.cta-content',
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.cta-content',
                        start: 'top 80%',
                    },
                }
            );

            // Pulsing border animation
            gsap.to('.cta-border', {
                boxShadow: '0 0 60px rgba(247,37,133,0.4), 0 0 120px rgba(247,37,133,0.2)',
                duration: 2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            gsap.fromTo(
                '.success-msg',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
    };

    return (
        <section
            ref={sectionRef}
            id="newsletter"
            className="relative py-32 px-6 lg:px-12 overflow-hidden"
        >
            <div className="max-w-4xl mx-auto">
                <div
                    className="cta-content cta-border glass-card p-12 lg:p-20 text-center relative overflow-hidden"
                    style={{
                        border: '1px solid rgba(247,37,133,0.3)',
                        boxShadow: '0 0 40px rgba(247,37,133,0.15)',
                    }}
                >
                    {/* Background glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(ellipse at center, rgba(247,37,133,0.08) 0%, rgba(131,56,236,0.05) 50%, transparent 70%)',
                        }}
                    />

                    {/* Corner decorations */}
                    {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                        <div
                            key={i}
                            className={`absolute ${pos} w-8 h-8`}
                            style={{
                                borderTop: i < 2 ? '2px solid #f72585' : 'none',
                                borderBottom: i >= 2 ? '2px solid #f72585' : 'none',
                                borderLeft: i % 2 === 0 ? '2px solid #f72585' : 'none',
                                borderRight: i % 2 === 1 ? '2px solid #f72585' : 'none',
                                boxShadow: '0 0 10px rgba(247,37,133,0.5)',
                            }}
                        />
                    ))}

                    <div className="relative z-10">
                        <div className="show-badge inline-flex items-center gap-2 px-3 py-1 mb-6">
                            <span className="text-magenta-400 font-mono text-xs tracking-widest">JOIN THE UNDERGROUND</span>
                        </div>

                        <h2
                            className="font-display leading-none mb-4"
                            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
                        >
                            <span className="gradient-text-chrome">NEVER MISS</span>
                            <br />
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 20px rgba(247,37,133,0.5))',
                                }}
                            >
                                A PUNCHLINE
                            </span>
                        </h2>

                        <p className="text-chrome-mid/60 text-base max-w-md mx-auto mb-10 leading-relaxed">
                            Get early access to tickets, exclusive comedian announcements, and secret shows straight to your inbox.
                        </p>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="flex-1 px-5 py-4 font-mono text-sm bg-obsidian-800 border border-magenta-400/30 text-chrome-light placeholder-chrome-mid/30 focus:outline-none focus:border-magenta-400 transition-colors duration-300 cursor-none"
                                    style={{ borderRadius: '4px' }}
                                />
                                <button
                                    id="newsletter-submit"
                                    type="submit"
                                    className="ticket-btn px-8 py-4 font-display text-lg text-white tracking-widest cursor-none whitespace-nowrap"
                                >
                                    <span className="relative z-10">SUBSCRIBE</span>
                                </button>
                            </form>
                        ) : (
                            <div className="success-msg text-center">
                                <div
                                    className="font-display text-3xl mb-2"
                                    style={{
                                        background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    YOU'RE IN! 🎤
                                </div>
                                <p className="text-chrome-mid/60 font-mono text-sm">
                                    Welcome to the underground. Check your inbox.
                                </p>
                            </div>
                        )}

                        <p className="text-chrome-mid/30 text-xs font-mono mt-4">
                            No spam. Unsubscribe anytime. Pure comedy gold only.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
