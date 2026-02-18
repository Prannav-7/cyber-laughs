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
        bio: "Exists in a dimension where logic is optional. Sets you'll quote for weeks.",
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

// ── Single comedian row ──
const ComedianRow = ({ comedian, index }) => {
    const rowRef = useRef(null);
    const imgWrapRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const row = rowRef.current;
        const imgWrap = imgWrapRef.current;
        const content = contentRef.current;
        if (!row || !imgWrap || !content) return;

        // Image slides in from left, content from right
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: 'top 78%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.fromTo(imgWrap,
            { opacity: 0, x: -80, scale: 0.94 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
        ).fromTo(content.querySelectorAll('.reveal-item'),
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
            '-=0.6'
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === row) st.kill();
            });
        };
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={rowRef}
            className="comedian-row grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[85vh] border-b border-white/5"
        >
            {/* ── Image side ── */}
            <div
                ref={imgWrapRef}
                className={`relative overflow-hidden opacity-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                style={{ minHeight: '60vmin' }}
            >
                <img
                    src={comedian.img}
                    alt={comedian.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: 'brightness(0.75) saturate(0.9)' }}
                    loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: isEven
                            ? 'linear-gradient(to right, transparent 60%, rgba(13,11,8,1) 100%)'
                            : 'linear-gradient(to left, transparent 60%, rgba(13,11,8,1) 100%)'
                    }}
                />
                {/* Index number watermark */}
                <div
                    className="absolute bottom-6 left-6 font-display opacity-10 select-none"
                    style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', color: 'var(--accent)', lineHeight: 1 }}
                >
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>

            {/* ── Content side ── */}
            <div
                ref={contentRef}
                className={`flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 bg-[#0d0b08] ${isEven ? 'md:order-2' : 'md:order-1'}`}
            >
                <div className="reveal-item section-label mb-6">{comedian.specialty}</div>

                <h3
                    className="reveal-item font-display leading-none mb-6"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--t1)', textTransform: 'uppercase' }}
                >
                    {comedian.name}
                </h3>

                <p className="reveal-item text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                    {comedian.bio}
                </p>

                {/* Date / Time / Price row */}
                <div className="reveal-item flex flex-wrap items-center gap-8 mb-10 border-t border-white/10 pt-8">
                    <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Date</div>
                        <div className="font-mono text-sm" style={{ color: 'var(--accent)' }}>{comedian.date}</div>
                    </div>
                    <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Time</div>
                        <div className="font-mono text-sm text-white/70">{comedian.time}</div>
                    </div>
                    <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">From</div>
                        <div className="font-display text-2xl" style={{ color: 'var(--accent)' }}>{comedian.price}</div>
                    </div>
                </div>

                <div className="reveal-item">
                    <button
                        className="btn-primary px-12 py-5 text-[10px] uppercase tracking-[0.35em] font-bold"
                    >
                        Book Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Section ──
const LineupSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.fromTo(headerRef.current.querySelectorAll('.header-item'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="lineup" className="bg-[#0d0b08]">

            {/* ── Section Header ── */}
            <div
                ref={headerRef}
                className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 flex flex-col items-center text-center"
            >
                <div className="header-item section-label mb-6 opacity-0">Our Entertainers</div>
                <h2
                    className="header-item font-display leading-none mb-6 opacity-0"
                    style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', color: 'var(--t1)', textTransform: 'uppercase' }}
                >
                    THE LINEUP
                </h2>
                <p className="header-item text-white/50 text-sm md:text-lg max-w-xl leading-relaxed italic mb-8 opacity-0">
                    "Six nights of handpicked comedy. Each performer vetted for maximum impact and unfiltered energy."
                </p>
                <div className="header-item w-16 h-px opacity-0" style={{ background: 'var(--accent)' }} />
            </div>

            {/* ── Comedian Rows ── */}
            <div className="border-t border-white/5">
                {comedians.map((c, i) => (
                    <ComedianRow key={c.id} comedian={c} index={i} />
                ))}
            </div>

            {/* ── Footer CTA ── */}
            <div className="py-24 flex flex-col items-center text-center gap-6 border-t border-white/5">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-30">
                    * More shows announced weekly *
                </p>
                <button id="lineup-notify" className="btn-outline px-14 py-5 text-xs uppercase tracking-widest">
                    Stay Updated
                </button>
            </div>

        </section>
    );
};

export default LineupSection;
