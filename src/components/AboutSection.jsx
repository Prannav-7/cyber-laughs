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
                yPercent: 20,
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

            // Right stats reveal
            gsap.fromTo('.stat-card',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
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
        <section ref={sectionRef} id="about" className="overflow-hidden">
            {/* Parallax Image Banner */}
            <div
                className="relative h-[40vh] md:h-[65vh] overflow-hidden"
            >
                <img
                    ref={imgRef}
                    src={ABOUT_IMG}
                    alt="Comedy Stage"
                    className="absolute top-0 left-0 w-full h-[140%] object-cover"
                    style={{ filter: 'brightness(0.4) saturate(0.7)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg opacity-90" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="section-label mb-5 opacity-70">About Us</div>
                    <h2 className="font-display leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--t1)' }}>
                        LIVE COMEDY<br />
                        <span style={{ color: 'var(--accent)' }}>ENTERTAINMENT</span>
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 md:py-32">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left: Text */}
                    <div className="about-text flex-1 text-center lg:text-left">
                        <div className="about-label section-label mb-8 justify-center lg:justify-start items-center gap-4">
                            <span className="w-10 h-px bg-accent opacity-40 hidden md:block" />
                            OUR STORY
                        </div>
                        <h3
                            className="about-heading font-display mb-10"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', color: 'var(--t1)', lineHeight: 1.02 }}
                        >
                            BESIDES THE STAGE,<br className="hidden md:block" /> WE'VE DONE IT ALL
                        </h3>
                        <div className="space-y-8 about-body text-t2 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light opacity-80">
                            <p>
                                Television, movies, YouTube, corporate shows, private gatherings, sangeets, bachelor parties and much more. We have performed for every occasion except a funeral — and we're looking forward to that as well.
                            </p>
                            <p>
                                Founded in 2024, Cyber Laughs has grown from a 50-seat underground venue to the city's most talked-about comedy destination. Every show is handcrafted, every performer vetted, every punchline earned.
                            </p>
                        </div>
                        <button className="about-cta btn-primary mt-12 px-12 py-5 text-sm tracking-widest uppercase">
                            Explore More
                        </button>
                    </div>

                    {/* Right: Stats Grid */}
                    <div className="w-full lg:w-[480px] flex flex-col gap-8 stats-grid">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                                { n: 200, suffix: '+', l: 'Shows Performed' },
                                { n: 50, suffix: 'K+', l: 'Tickets Sold' },
                                { n: 12, suffix: '+', l: 'Cities Covered' },
                                { n: 98, suffix: '%', l: 'Fan Rating' },
                            ].map(s => (
                                <div key={s.l} className="stat-card bg-surface/30 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-sm hover:border-accent/20 transition-all duration-500">
                                    <div
                                        className="counter-num font-display text-5xl md:text-6xl mb-3"
                                        style={{ color: 'var(--accent)' }}
                                        data-target={s.n}
                                        data-suffix={s.suffix}
                                    >
                                        0{s.suffix}
                                    </div>
                                    <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40">{s.l}</div>
                                </div>
                            ))}
                        </div>

                        {/* Sub-image */}
                        <div className="relative rounded-sm overflow-hidden h-56 md:h-72 group shadow-2xl">
                            <img
                                src={PERFORM_IMG}
                                alt="Performer"
                                className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent opacity-90" />
                            <div className="absolute bottom-8 left-8">
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase py-2 px-4 border border-accent/20 text-accent bg-accent/5 backdrop-blur-sm">
                                    Live Atmosphere
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
