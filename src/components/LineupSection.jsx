import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comedians = [
    {
        id: 1,
        name: 'Alex Volt',
        specialty: 'Observational',
        date: 'Fri, Mar 7',
        time: '8:00 PM',
        price: '$35',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Turns everyday absurdity into electric punchlines. Sold out 12 consecutive shows.',
    },
    {
        id: 2,
        name: 'Maya Glitch',
        specialty: 'Tech Satire',
        date: 'Sat, Mar 8',
        time: '9:30 PM',
        price: '$40',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Former software engineer. Her bits about AI are dangerously accurate and hilarious.',
    },
    {
        id: 3,
        name: 'Rico Neon',
        specialty: 'Street Philosophy',
        date: 'Fri, Mar 14',
        time: '8:00 PM',
        price: '$35',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Sees the city as one giant punchline. Urban observations that make you laugh and think.',
    },
    {
        id: 4,
        name: 'Zoe Static',
        specialty: 'Dark Absurdism',
        date: 'Sat, Mar 15',
        time: '10:00 PM',
        price: '$40',
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Exists in a dimension where logic is optional. Her sets are fever dreams you\'ll quote for weeks.',
    },
    {
        id: 5,
        name: 'Dante Flux',
        specialty: 'Political Surrealism',
        date: 'Fri, Mar 21',
        time: '8:30 PM',
        price: '$45',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Weaponizes absurdity against the powerful. Politically charged, hilariously unhinged.',
    },
    {
        id: 6,
        name: 'Luna Byte',
        specialty: 'Cosmic Weirdness',
        date: 'Sat, Mar 22',
        time: '9:00 PM',
        price: '$40',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Comedy that spans galaxies. From quantum physics to relationship drama — all equally absurd.',
    },
];

const ComedianCard = ({ comedian }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Magnetic pull — only on desktop
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            if (dist < 180) {
                const f = (180 - dist) / 180;
                gsap.to(card, { x: dx * f * 0.12, y: dy * f * 0.12, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
            }
        };
        const onLeave = () => {
            gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
        };

        window.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        return () => {
            window.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className="comedian-card" style={{ willChange: 'transform' }}>
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <img
                    src={comedian.img}
                    alt={comedian.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="comedian-card-overlay" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="tag mb-2">{comedian.specialty}</div>
                    <h3 className="font-display text-2xl text-t1 tracking-wide leading-none mb-1">{comedian.name}</h3>
                    <p className="text-t2 text-xs leading-relaxed mb-3 line-clamp-2">{comedian.bio}</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-accent font-mono text-xs">{comedian.date}</div>
                            <div className="text-t3 font-mono text-xs">{comedian.time}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-display text-xl text-accent">{comedian.price}</span>
                            <button
                                className="btn-accent py-2 px-4 text-xs"
                                style={{ fontSize: '0.65rem', padding: '8px 14px' }}
                            >
                                Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LineupSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.lineup-header',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: '.lineup-header', start: 'top 85%' },
                }
            );

            // Cards — simple fade+translateY, staggered
            gsap.fromTo('.comedian-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: { amount: 0.6, from: 'start' },
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.lineup-grid',
                        start: 'top 82%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="lineup" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="lineup-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
                <div>
                    <div className="section-label mb-4">March 2025</div>
                    <h2 className="font-display leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#f5f5f5' }}>
                        THE LINEUP
                    </h2>
                </div>
                <p className="text-t2 text-sm max-w-xs leading-relaxed">
                    Six nights of handpicked comedy. Each performer vetted for maximum impact.
                </p>
            </div>

            <div className="divider mb-14" />

            {/* Grid */}
            <div className="lineup-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {comedians.map(c => <ComedianCard key={c.id} comedian={c} />)}
            </div>

            {/* Footer */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-t3 font-mono text-xs tracking-widest uppercase">More shows announced weekly</p>
                <button id="lineup-notify" className="btn-ghost">Get Notified</button>
            </div>
        </section>
    );
};

export default LineupSection;
