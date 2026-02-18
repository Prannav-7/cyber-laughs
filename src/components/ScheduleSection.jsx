import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Real venue/stage Unsplash image
const VENUE_IMG = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop';

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.schedule-left',
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: '.schedule-left', start: 'top 82%' },
                }
            );
            gsap.fromTo('.schedule-row',
                { opacity: 0, x: 30 },
                {
                    opacity: 1, x: 0,
                    duration: 0.6,
                    stagger: 0.07,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.schedule-rows', start: 'top 82%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="schedule" className="py-28 overflow-hidden">
            {/* Full-width venue image strip */}
            <div className="relative h-56 mb-24 overflow-hidden">
                <img
                    src={VENUE_IMG}
                    alt="Comedy venue"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.22) saturate(0.3)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="section-label justify-center mb-3">Every Week</div>
                        <h2 className="font-display text-accent" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1 }}>
                            WEEKLY SHOWS
                        </h2>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left */}
                    <div className="schedule-left lg:w-80 flex-shrink-0">
                        <div className="section-label mb-5">Venue</div>
                        <h3 className="font-display text-3xl text-t1 mb-1">The Neon Bunker</h3>
                        <p className="text-t3 font-mono text-xs mb-6">42 Underground Ave, Cyber District</p>

                        <div className="divider mb-6" />

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-t3 font-mono text-xs uppercase tracking-widest">Doors open</span>
                                <span className="text-t2 font-mono text-xs">1 hr before show</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-t3 font-mono text-xs uppercase tracking-widest">Age</span>
                                <span className="text-t2 font-mono text-xs">18+ after 9 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-t3 font-mono text-xs uppercase tracking-widest">Parking</span>
                                <span className="text-t2 font-mono text-xs">Street + Garage</span>
                            </div>
                        </div>

                        <div className="divider my-6" />

                        <button className="btn-accent w-full justify-center">Reserve a Table</button>
                    </div>

                    {/* Right: Schedule rows */}
                    <div className="schedule-rows flex-1">
                        {shows.map((s, i) => (
                            <div key={s.day} className="schedule-row group">
                                <div className="schedule-day font-display text-2xl w-16 text-t3 transition-colors duration-200 flex-shrink-0">
                                    {s.day}
                                </div>
                                <div className="flex-1 px-6">
                                    <div className="text-t1 font-medium text-sm">{s.label}</div>
                                    <div className="text-t3 font-mono text-xs mt-0.5">{s.time}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-display text-xl text-accent">{s.price}</span>
                                    <button
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 btn-ghost py-1.5 px-3"
                                        style={{ fontSize: '0.65rem', padding: '6px 12px' }}
                                    >
                                        Book
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
