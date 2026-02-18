import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const shows = [
    { day: 'MON', label: 'Open Mic Night', time: '7:00 PM', price: 'FREE', color: '#00f5ff' },
    { day: 'TUE', label: 'Roast Battle', time: '8:30 PM', price: '$15', color: '#ffbe0b' },
    { day: 'WED', label: 'Improv Chaos', time: '8:00 PM', price: '$20', color: '#8338ec' },
    { day: 'THU', label: 'Stand-Up Showcase', time: '8:00 PM', price: '$25', color: '#f72585' },
    { day: 'FRI', label: 'Headliner Night', time: '8:00 PM', price: '$35', color: '#ff006e' },
    { day: 'SAT', label: 'Late Night Special', time: '10:30 PM', price: '$40', color: '#f72585' },
];

const ScheduleSection = () => {
    const sectionRef = useRef(null);
    const rowsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading
            gsap.fromTo(
                '.schedule-heading',
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.schedule-heading',
                        start: 'top 85%',
                    },
                }
            );

            // Rows slide in from alternating sides
            rowsRef.current.forEach((row, i) => {
                if (!row) return;
                gsap.fromTo(
                    row,
                    { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="schedule"
            className="relative py-32 px-6 lg:px-12 overflow-hidden"
        >
            {/* Decorative line */}
            <div className="neon-hr mb-16 max-w-7xl mx-auto" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left heading */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32">
                        <div className="schedule-heading">
                            <div className="show-badge inline-flex items-center gap-2 px-3 py-1 mb-4">
                                <span className="text-neon-cyan font-mono text-xs tracking-widest">WEEKLY SCHEDULE</span>
                            </div>
                            <h2
                                className="font-display leading-none mb-6"
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                            >
                                <span className="gradient-text-chrome">EVERY</span>
                                <br />
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #00f5ff, #8338ec)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    NIGHT
                                </span>
                                <br />
                                <span className="gradient-text-chrome">ELECTRIC</span>
                            </h2>
                            <p className="text-chrome-mid/60 text-sm leading-relaxed max-w-xs">
                                Six nights a week of pure comedic energy. From free open mics to sold-out headliners.
                            </p>

                            {/* Venue info */}
                            <div className="mt-8 p-4 glass-card">
                                <div className="text-xs font-mono text-chrome-mid/40 tracking-widest mb-2">VENUE</div>
                                <div className="text-chrome-light font-semibold">The Neon Bunker</div>
                                <div className="text-chrome-mid/60 text-sm mt-1">42 Underground Ave, Cyber District</div>
                                <div className="text-magenta-400 text-sm font-mono mt-2">Doors open 1hr before show</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Schedule rows */}
                    <div className="lg:w-2/3 space-y-3">
                        {shows.map((show, i) => (
                            <div
                                key={show.day}
                                ref={(el) => (rowsRef.current[i] = el)}
                                className="group relative flex items-center justify-between p-5 glass-card transition-all duration-300 cursor-none overflow-hidden"
                                style={{ borderColor: 'rgba(247,37,133,0.1)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = `${show.color}50`;
                                    e.currentTarget.style.boxShadow = `0 0 30px ${show.color}15`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(247,37,133,0.1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Hover fill */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: `linear-gradient(90deg, ${show.color}08, transparent)` }}
                                />

                                <div className="relative z-10 flex items-center gap-6 flex-1">
                                    {/* Day */}
                                    <div
                                        className="font-display text-2xl w-16 text-center"
                                        style={{ color: show.color, textShadow: `0 0 15px ${show.color}60` }}
                                    >
                                        {show.day}
                                    </div>

                                    {/* Divider */}
                                    <div className="w-px h-10" style={{ background: `${show.color}30` }} />

                                    {/* Show info */}
                                    <div>
                                        <div className="text-chrome-light font-semibold text-base">{show.label}</div>
                                        <div className="text-chrome-mid/50 text-xs font-mono mt-0.5">{show.time}</div>
                                    </div>
                                </div>

                                {/* Price + button */}
                                <div className="relative z-10 flex items-center gap-4">
                                    <div
                                        className="font-display text-xl"
                                        style={{ color: show.color }}
                                    >
                                        {show.price}
                                    </div>
                                    <button
                                        className="px-4 py-2 text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-none"
                                        style={{
                                            background: `${show.color}20`,
                                            border: `1px solid ${show.color}50`,
                                            color: show.color,
                                            borderRadius: '4px',
                                        }}
                                    >
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="neon-hr mt-16 max-w-7xl mx-auto" />
        </section>
    );
};

export default ScheduleSection;
