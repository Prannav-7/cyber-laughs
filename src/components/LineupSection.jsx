import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ALEX_IMG from '../assets/images/Alex Volt.jpg';
import MAYA_IMG from '../assets/images/Maya Glitch.png';
import ZOE_IMG from '../assets/images/Zoe Static.jpg';
import DANTE_IMG from '../assets/images/Dante Flux.jpg';
import LUNA_IMG from '../assets/images/Luna Byte.jpg';

gsap.registerPlugin(ScrollTrigger);

const comedians = [
    {
        id: 1,
        name: 'Alex Volt',
        specialty: 'Observational',
        date: 'Fri, Mar 7',
        time: '8:00 PM',
        price: '$35',
        img: ALEX_IMG,
        bio: 'Turns everyday absurdity into electric punchlines. 12 consecutive sold-out shows.',
    },
    {
        id: 2,
        name: 'Maya Glitch',
        specialty: 'Tech Satire',
        date: 'Sat, Mar 8',
        time: '9:30 PM',
        price: '$40',
        img: MAYA_IMG,
        bio: 'Former software engineer. Her bits about AI are dangerously accurate.',
    },
    {
        id: 3,
        name: 'Zoe Static',
        specialty: 'Dark Absurdism',
        date: 'Sat, Mar 15',
        time: '10:00 PM',
        price: '$40',
        img: ZOE_IMG,
        bio: 'Exists in a dimension where logic is optional. Sets you\'ll quote for weeks.',
    },
    {
        id: 4,
        name: 'Dante Flux',
        specialty: 'Political Surrealism',
        date: 'Fri, Mar 21',
        time: '8:30 PM',
        price: '$45',
        img: DANTE_IMG,
        bio: 'Weaponizes absurdity against the powerful. Politically charged, hilariously unhinged.',
    },
    {
        id: 5,
        name: 'Luna Byte',
        specialty: 'Cosmic Weirdness',
        date: 'Sat, Mar 22',
        time: '9:00 PM',
        price: '$40',
        img: LUNA_IMG,
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

            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 md:py-24">
                {/* Header */}
                <div className="lineup-header flex flex-col items-center text-center gap-6 mb-16 md:mb-28 px-4">
                    <div className="section-label mb-2">Our Entertainers</div>
                    <h2 className="font-display leading-tight" style={{ fontSize: 'clamp(2.5rem, 9vw, 6.8rem)', color: 'var(--t1)' }}>
                        THE LINEUP
                    </h2>
                    <p className="text-sm md:text-lg max-w-xl leading-relaxed opacity-60 italic mb-4">
                        "Six nights of handpicked comedy. Each performer vetted for maximum impact and unfiltered energy."
                    </p>
                    <div className="w-12 h-px bg-accent/40" />
                </div>

                {/* Grid */}
                <div className="lineup-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {comedians.map((c, i) => (
                        <div key={c.id} className="flex justify-center w-full">
                            <div className="w-full max-w-[360px] group transition-transform duration-500 hover:-translate-y-2">
                                <ComedianCard comedian={c} index={i} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 md:mt-24 flex flex-col items-center text-center gap-8 border-t border-white/5 pt-12">
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-40">
                        * MORE SHOWS ANNOUNCED WEEKLY *
                    </p>
                    <button id="lineup-notify" className="btn-outline px-12 py-4 text-xs uppercase tracking-widest">
                        Stay Updated
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LineupSection;
