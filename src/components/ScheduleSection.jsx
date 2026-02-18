import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VENUE_IMG = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&q=85&auto=format&fit=crop';

const shows = [
    { day: 'MON', label: 'Open Mic Night', time: '7:00 PM', price: 'Free' },
    { day: 'TUE', label: 'Roast Battle', time: '8:30 PM', price: '$15' },
    { day: 'WED', label: 'Improv Chaos', time: '8:00 PM', price: '$20' },
    { day: 'THU', label: 'Stand-Up Showcase', time: '8:00 PM', price: '$25' },
    { day: 'FRI', label: 'Headliner Night', time: '8:00 PM', price: '$35' },
    { day: 'SAT', label: 'Late Night Special', time: '10:30 PM', price: '$40' },
];

const ScheduleSection = () => {
    const sectionRef = useRef(null);
    const bannerRef = useRef(null);
    const bannerImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax on banner
            gsap.to(bannerImgRef.current, {
                yPercent: 22,
                ease: 'none',
                scrollTrigger: {
                    trigger: bannerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Left panel
            gsap.fromTo('.sched-left > *',
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.sched-left', start: 'top 80%' },
                }
            );

            // Rows
            gsap.fromTo('.schedule-row',
                { opacity: 0, x: 24 },
                {
                    opacity: 1, x: 0,
                    duration: 0.6,
                    stagger: 0.07,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.sched-rows', start: 'top 80%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="schedule">
            {/* Parallax banner */}
            <div ref={bannerRef} className="relative h-52 overflow-hidden">
                <img
                    ref={bannerImgRef}
                    src={VENUE_IMG}
                    alt="Comedy venue"
                    className="parallax-img"
                    style={{ filter: 'brightness(0.2) saturate(0.4)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,8,1) 0%, transparent 25%, transparent 75%, rgba(13,11,8,1) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="section-label justify-center mb-3">Every Week</div>
                        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--accent)', lineHeight: 1 }}>
                            WEEKLY SHOWS
                        </h2>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-16 py-16 md:py-28">
                <div className="flex flex-col items-center gap-12 md:gap-24">

                    {/* Venue Info - Centered */}
                    <div className="sched-left text-center max-w-2xl px-4">
                        <div className="section-label mb-6 justify-center">Venue Details</div>
                        <h3 className="font-display text-4xl md:text-6xl mb-3" style={{ color: 'var(--t1)' }}>The Neon Bunker</h3>
                        <p className="font-mono text-[10px] md:text-sm mb-10 tracking-[0.3em] opacity-40" style={{ color: 'var(--t3)' }}>
                            42 UNDERGROUND AVE, CYBER DISTRICT
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                            {[
                                ['Doors', '1 hr before'],
                                ['Age', '18+ Policy'],
                                ['Parking', 'On-Site'],
                                ['Dress', 'Casual'],
                            ].map(([k, v]) => (
                                <div key={k} className="flex flex-col items-center p-4 md:p-6 border border-white/5 bg-white/[0.02]">
                                    <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] mb-1 opacity-40">{k}</span>
                                    <span className="font-mono text-[10px] md:text-xs" style={{ color: 'var(--accent)' }}>{v}</span>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary px-12 py-4 text-xs uppercase tracking-[0.2em]">Reserve a Table</button>
                    </div>

                    <div className="w-16 h-px bg-white/10" />

                    {/* Right: Rows */}
                    <div className="sched-rows w-full max-w-4xl px-4">
                        {shows.map((s) => (
                            <div key={s.day} className="schedule-row group border-b border-white/5 py-6 md:py-8 flex items-center gap-4">
                                <div className="s-day font-display text-2xl md:text-5xl w-14 md:w-24 flex-shrink-0 opacity-40 transition-colors duration-300 group-hover:opacity-100 group-hover:text-accent">
                                    {s.day}
                                </div>
                                <div className="flex-1 px-2 md:px-10">
                                    <div className="font-medium text-sm md:text-xl mb-1" style={{ color: 'var(--t1)' }}>{s.label}</div>
                                    <div className="font-mono text-[9px] md:text-xs opacity-50 uppercase tracking-widest" style={{ color: 'var(--t3)' }}>{s.time}</div>
                                </div>
                                <div className="flex items-center gap-4 md:gap-8">
                                    <span className="font-display text-xl md:text-3xl" style={{ color: 'var(--accent)' }}>{s.price}</span>
                                    <button
                                        className="btn-outline opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block px-6 py-2 text-[10px] uppercase tracking-widest"
                                    >
                                        Book
                                    </button>
                                    <button
                                        className="btn-primary md:hidden px-4 py-2 text-[9px] uppercase"
                                    >
                                        Tix
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleSection;
