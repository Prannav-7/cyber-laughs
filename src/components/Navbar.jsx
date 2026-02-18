import { useState, useEffect } from 'react';

const links = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Shows', id: 'lineup' },
    { label: 'Schedule', id: 'schedule' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'newsletter' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState('hero');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);

            // Track active section
            for (const l of [...links].reverse()) {
                const el = document.getElementById(l.id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveId(l.id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
            style={{
                background: scrolled ? 'rgba(13,11,8,0.94)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-display text-xl tracking-widest cursor-none"
                    style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}
                >
                    CYBER LAUGHS
                </button>

                {/* Links */}
                <div className="hidden md:flex items-center gap-7">
                    {links.map(l => (
                        <button
                            key={l.label}
                            onClick={() => scrollTo(l.id)}
                            className={`nav-link${activeId === l.id ? ' active' : ''}`}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <button
                    id="nav-tickets"
                    className="btn-primary"
                    style={{ padding: '9px 20px', fontSize: '0.7rem' }}
                    onClick={() => scrollTo('newsletter')}
                >
                    Get Tickets
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
