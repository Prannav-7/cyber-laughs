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
                className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
            >
                <img
                    ref={imgRef}
                    src={ABOUT_IMG}
                    alt="Comedy Stage"
                    className="absolute top-0 left-0 w-full h-[140%] object-cover"
                    style={{ filter: 'brightness(0.3) saturate(0.5)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg opacity-90" />

                {/* Reference Layout: Title followed immediately by centered paragraph */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
                    <div className="section-label mb-8 opacity-60">Company Overview</div>
                    <h2
                        className="font-display leading-tight mb-8"
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)', color: 'var(--t1)', textTransform: 'uppercase', fontWeight: '900' }}
                    >
                        LIVE COMEDY ENTERTAINMENT
                    </h2>

                    <p className="text-white text-xs md:text-lg max-w-4xl leading-relaxed font-bold tracking-widest uppercase opacity-90 mb-12">
                        BESIDES STAGE WE HAVE DONE TELEVISION, MOVIES, YOUTUBE, CORPORATE SHOWS, PRIVATE GATHERINGS, SANGEETS, BACHELOR PARTIES & MUCH MORE. WE HAVE PERFORMED FOR EVERY OCCASION EXCEPT FOR A FUNERAL. LOOKING FORWARD TO THAT AS WELL.
                    </p>

                    <div className="flex gap-6">
                        <button className="btn-primary px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Block - Now separate and clean */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 md:py-32">
                <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {[
                        { label: 'Performances', target: 2500, suffix: '+' },
                        { label: 'Happy Guests', target: 120, suffix: 'K' },
                        { label: 'City Tours', target: 45, suffix: '' },
                        { label: 'Awards Won', target: 12, suffix: '' },
                    ].map((s, i) => (
                        <div key={i} className="stat-card p-10 flex flex-col items-center text-center justify-center border border-white/5 bg-white/[0.01]">
                            <div className="font-display text-4xl md:text-6xl mb-3 text-accent transition-transform duration-500 hover:scale-110">
                                <span className="counter-num" data-target={s.target} data-suffix={s.suffix}>0</span>
                            </div>
                            <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-30">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
