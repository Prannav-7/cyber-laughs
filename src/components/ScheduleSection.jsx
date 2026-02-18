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

            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left - Venue Info */}
                    <div className="sched-left lg:w-72 flex-shrink-0 text-center lg:text-left">
                        <div className="section-label mb-5 justify-center lg:justify-start">Venue</div>
                        <h3 className="font-display text-4xl mb-2" style={{ color: 'var(--t1)' }}>The Neon Bunker</h3>
                        <p className="font-mono text-xs mb-8" style={{ color: 'var(--t3)' }}>
                            42 Underground Ave, Cyber District
                        </p>

                        <div className="divider mb-8" />

                        <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
                            {[
                                ['Doors open', '1 hr before show'],
                                ['Age policy', '18+ after 9 PM'],
                                ['Parking', 'Street + Garage'],
                                ['Dress code', 'Smart casual'],
                            ].map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center text-xs">
                                    <span className="font-mono uppercase tracking-widest" style={{ color: 'var(--t3)' }}>{k}</span>
                                    <span className="font-mono" style={{ color: 'var(--t2)' }}>{v}</span>
                                </div>
                            ))}
                        </div>

                        <div className="divider my-8" />
                        <button className="btn-primary w-full justify-center">Reserve a Table</button>
                    </div>

                    {/* Right: Rows */}
                    <div className="sched-rows flex-1 w-full">
                        {shows.map((s) => (
                            <div key={s.day} className="schedule-row group border-b border-white/5 py-6">
                                <div className="s-day font-display text-3xl w-16 flex-shrink-0 transition-colors duration-200" style={{ color: 'var(--t3)' }}>
                                    {s.day}
                                </div>
                                <div className="flex-1 px-4 md:px-6">
                                    <div className="font-medium text-sm md:text-base" style={{ color: 'var(--t1)' }}>{s.label}</div>
                                    <div className="font-mono text-[10px] md:text-xs mt-0.8" style={{ color: 'var(--t3)' }}>{s.time}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-display text-xl md:text-2xl" style={{ color: 'var(--accent)' }}>{s.price}</span>
                                    <button
                                        className="btn-outline opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
                                        style={{ padding: '6px 14px', fontSize: '0.62rem' }}
                                    >
                                        Book
                                    </button>
                                    <button
                                        className="btn-primary md:hidden"
                                        style={{ padding: '6px 12px', fontSize: '0.6rem' }}
                                    >
                                        Ticket
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
