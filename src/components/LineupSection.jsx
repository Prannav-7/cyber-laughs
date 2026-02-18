import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comedians = [
    {
        id: 1,
        name: 'ALEX VOLT',
        specialty: 'Observational Chaos',
        date: 'FRI MAR 07',
        time: '8:00 PM',
        emoji: '⚡',
        color: '#f72585',
        bio: 'The human lightning bolt of comedy. Alex turns everyday absurdity into electric punchlines.',
        shows: 47,
        rating: 4.9,
    },
    {
        id: 2,
        name: 'MAYA GLITCH',
        specialty: 'Tech Satire',
        date: 'SAT MAR 08',
        time: '9:30 PM',
        emoji: '💻',
        color: '#8338ec',
        bio: 'Former software engineer turned comedian. Her bits about AI and Silicon Valley are dangerously accurate.',
        shows: 63,
        rating: 5.0,
    },
    {
        id: 3,
        name: 'RICO NEON',
        specialty: 'Street Philosophy',
        date: 'FRI MAR 14',
        time: '8:00 PM',
        emoji: '🌆',
        color: '#00f5ff',
        bio: 'Rico sees the city as one giant punchline. His urban observations will make you laugh and think.',
        shows: 89,
        rating: 4.8,
    },
    {
        id: 4,
        name: 'ZOE STATIC',
        specialty: 'Dark Absurdism',
        date: 'SAT MAR 15',
        time: '10:00 PM',
        emoji: '🌀',
        color: '#ffbe0b',
        bio: 'Zoe exists in a dimension where logic is optional. Her sets are fever dreams you\'ll quote for weeks.',
        shows: 34,
        rating: 4.7,
    },
    {
        id: 5,
        name: 'DANTE FLUX',
        specialty: 'Political Surrealism',
        date: 'FRI MAR 21',
        time: '8:30 PM',
        emoji: '🔥',
        color: '#ff006e',
        bio: 'Dante weaponizes absurdity against the powerful. Politically charged, hilariously unhinged.',
        shows: 112,
        rating: 4.9,
    },
    {
        id: 6,
        name: 'LUNA BYTE',
        specialty: 'Cosmic Weirdness',
        date: 'SAT MAR 22',
        time: '9:00 PM',
        emoji: '🌙',
        color: '#8338ec',
        bio: 'Luna\'s comedy spans galaxies. From quantum physics to relationship drama — all equally absurd.',
        shows: 28,
        rating: 4.8,
    },
];

const ComedianCard = ({ comedian, index }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        // Magnetic hover pull
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                gsap.to(card, {
                    x: dx * force * 0.2,
                    y: dy * force * 0.2,
                    rotateX: (-dy / rect.height) * 8,
                    rotateY: (dx / rect.width) * 8,
                    duration: 0.3,
                    ease: 'power2.out',
                });

                // Move glow
                const glowX = ((e.clientX - rect.left) / rect.width) * 100;
                const glowY = ((e.clientY - rect.top) / rect.height) * 100;
                if (glowRef.current) {
                    glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, ${comedian.color}20 0%, transparent 60%)`;
                }
            }
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
            });
            if (glowRef.current) {
                glowRef.current.style.background = 'transparent';
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [comedian.color]);

    return (
        <div
            ref={cardRef}
            className="comedian-card glass-card p-6 cursor-none"
            style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            {/* Glow overlay */}
            <div
                ref={glowRef}
                className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                style={{ zIndex: 0 }}
            />

            {/* Card content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{
                            background: `linear-gradient(135deg, ${comedian.color}30, ${comedian.color}10)`,
                            border: `1px solid ${comedian.color}40`,
                            boxShadow: `0 0 20px ${comedian.color}20`,
                        }}
                    >
                        {comedian.emoji}
                    </div>
                    <div className="text-right">
                        <div
                            className="show-badge px-2 py-1 text-xs mb-1"
                            style={{ color: comedian.color, borderColor: `${comedian.color}40` }}
                        >
                            {comedian.date}
                        </div>
                        <div className="text-chrome-mid/60 text-xs font-mono">{comedian.time}</div>
                    </div>
                </div>

                {/* Name */}
                <h3
                    className="font-display text-2xl mb-1 tracking-wider"
                    style={{ color: comedian.color, textShadow: `0 0 20px ${comedian.color}60` }}
                >
                    {comedian.name}
                </h3>

                {/* Specialty */}
                <p className="text-chrome-mid/60 text-xs font-mono tracking-widest uppercase mb-3">
                    {comedian.specialty}
                </p>

                {/* Divider */}
                <div
                    className="h-px mb-4"
                    style={{
                        background: `linear-gradient(90deg, ${comedian.color}60, transparent)`,
                    }}
                />

                {/* Bio */}
                <p className="text-chrome-mid/70 text-sm leading-relaxed mb-4">{comedian.bio}</p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <div>
                            <div className="text-chrome-mid/40 text-xs font-mono">SHOWS</div>
                            <div className="font-display text-lg" style={{ color: comedian.color }}>
                                {comedian.shows}
                            </div>
                        </div>
                        <div>
                            <div className="text-chrome-mid/40 text-xs font-mono">RATING</div>
                            <div className="font-display text-lg" style={{ color: comedian.color }}>
                                {comedian.rating}★
                            </div>
                        </div>
                    </div>

                    <button
                        className="px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-none"
                        style={{
                            background: `${comedian.color}15`,
                            border: `1px solid ${comedian.color}40`,
                            color: comedian.color,
                            borderRadius: '6px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${comedian.color}30`;
                            e.currentTarget.style.boxShadow = `0 0 20px ${comedian.color}30`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${comedian.color}15`;
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const LineupSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Cards stagger reveal
            const cards = gridRef.current?.querySelectorAll('.comedian-card');
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 80, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: {
                            amount: 0.8,
                            from: 'start',
                        },
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="lineup"
            className="relative py-32 px-6 lg:px-12 overflow-hidden"
        >
            {/* Background accent */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(131,56,236,0.06) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 show-badge">
                        <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" style={{ boxShadow: '0 0 8px #8338ec' }} />
                        <span className="text-neon-purple font-mono text-xs tracking-widest">MARCH 2025 LINEUP</span>
                    </div>

                    <h2
                        className="font-display leading-none mb-4"
                        style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
                    >
                        <span className="gradient-text-chrome">THE </span>
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 20px rgba(247,37,133,0.4))',
                            }}
                        >
                            LEGENDS
                        </span>
                    </h2>

                    <p className="text-chrome-mid/60 max-w-xl mx-auto text-base leading-relaxed">
                        Six nights of pure comedic electricity. Each performer handpicked to deliver maximum voltage.
                    </p>
                </div>

                {/* Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {comedians.map((comedian, index) => (
                        <ComedianCard key={comedian.id} comedian={comedian} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-chrome-mid/50 font-mono text-sm mb-6 tracking-widest">
                        MORE SHOWS ANNOUNCED WEEKLY
                    </p>
                    <button
                        id="lineup-notify-btn"
                        className="ticket-btn px-10 py-4 font-display text-xl text-white tracking-widest cursor-none"
                    >
                        <span className="relative z-10">GET NOTIFIED</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LineupSection;
