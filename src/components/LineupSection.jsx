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
        bio: 'Turns everyday absurdity into electric punchlines. 12 consecutive sold-out shows.',
    },
    {
        id: 2,
        name: 'Maya Glitch',
        specialty: 'Tech Satire',
        date: 'Sat, Mar 8',
        time: '9:30 PM',
        price: '$40',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Former software engineer. Her bits about AI are dangerously accurate.',
    },
    {
        id: 3,
        name: 'Rico Neon',
        specialty: 'Street Philosophy',
        date: 'Fri, Mar 14',
        time: '8:00 PM',
        price: '$35',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Sees the city as one giant punchline. Urban observations that make you think.',
    },
    {
        id: 4,
        name: 'Zoe Static',
        specialty: 'Dark Absurdism',
        date: 'Sat, Mar 15',
        time: '10:00 PM',
        price: '$40',
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop&crop=face',
        bio: 'Exists in a dimension where logic is optional. Sets you\'ll quote for weeks.',
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
        bio: 'Comedy spanning galaxies. From quantum physics to relationship drama.',
    },
];

// Parallax image banner between sections
const BANNER_IMG = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=85&auto=format&fit=crop';

const ComedianCard = ({ comedian, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Magnetic pull
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            if (dist < 200) {
                const f = (200 - dist) / 200;
                gsap.to(card, { x: dx * f * 0.1, y: dy * f * 0.1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
            }
        };
        const onLeave = () => gsap.to(card, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });

        window.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        return () => { window.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
    }, []);

    return (
        <div ref={cardRef} className="comedian-card" style={{ aspectRatio: '3/4' }}>
            <img src={comedian.img} alt={comedian.name} loading="lazy" />
            <div className="comedian-card-overlay" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                <div className="tag mb-2">{comedian.specialty}</div>
                <h3 className="font-display text-2xl tracking-wide leading-none mb-1" style={{ color: 'var(--t1)' }}>
                    {comedian.name}
                </h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--t2)' }}>
                    {comedian.bio}
                </p>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-mono text-xs" style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>{comedian.date}</div>
                        <div className="font-mono text-xs" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>{comedian.time}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-display text-xl" style={{ color: 'var(--accent)' }}>{comedian.price}</span>
                        <button className="btn-primary" style={{ padding: '7px 14px', fontSize: '0.62rem' }}>Book</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LineupSection = () => {
    const sectionRef = useRef(null);
    const bannerRef = useRef(null);
    const bannerImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header
            gsap.fromTo('.lineup-header > *',
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.lineup-header', start: 'top 82%' },
                }
            );

            // Cards stagger
            gsap.fromTo('.comedian-card',
                { opacity: 0, y: 48 },
                {
                    opacity: 1, y: 0,
                    duration: 0.75,
                    stagger: { amount: 0.7, from: 'start' },
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.lineup-grid', start: 'top 80%' },
                }
            );

            // Banner parallax
            if (bannerImgRef.current) {
                gsap.to(bannerImgRef.current, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: bannerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="lineup">
            {/* Parallax banner */}
            <div ref={bannerRef} className="relative h-48 overflow-hidden">
                <img
                    ref={bannerImgRef}
                    src={BANNER_IMG}
                    alt="Comedy stage"
                    className="parallax-img"
                    style={{ filter: 'brightness(0.2) saturate(0.4)' }}
                    loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,8,1) 0%, transparent 30%, transparent 70%, rgba(13,11,8,1) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="section-label">March 2025 Lineup</div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
                {/* Header */}
                <div className="lineup-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                    <h2 className="font-display leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'var(--t1)' }}>
                        THE LINEUP
                    </h2>
                    <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--t2)' }}>
                        Six nights of handpicked comedy. Each performer vetted for maximum impact.
                    </p>
                </div>

                <div className="divider mb-12" style={{ background: 'var(--border)' }} />

                {/* Grid */}
                <div className="lineup-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comedians.map((c, i) => <ComedianCard key={c.id} comedian={c} index={i} />)}
                </div>

                {/* Footer */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                        More shows announced weekly
                    </p>
                    <button id="lineup-notify" className="btn-outline">Get Notified</button>
                </div>
            </div>
        </section>
    );
};

export default LineupSection;
