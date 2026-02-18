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
    const [menuOpen, setMenuOpen] = useState(false);

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

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-[120] transition-all duration-400"
                style={{
                    background: scrolled ? 'rgba(13,11,8,0.98)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-16 md:h-20 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="font-display text-base md:text-xl tracking-widest cursor-none z-[130] flex-shrink-0"
                        style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}
                    >
                        CYBER LAUGHS
                    </button>

                    {/* Desktop Links */}
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

                    <div className="flex items-center gap-2 sm:gap-4 flex-nowrap">
                        {/* CTA */}
                        <button
                            id="nav-tickets"
                            className="btn-primary"
                            style={{ padding: '7px 14px', fontSize: '0.62rem' }}
                            onClick={() => scrollTo('newsletter')}
                        >
                            Get Tickets
                        </button>

                        {/* Hamburger Toggle */}
                        <button
                            className={`menu-toggle md:hidden ${menuOpen ? 'open' : ''} flex-shrink-0`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            style={{ width: '24px' }}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className="flex flex-col items-center gap-8">
                    {links.map(l => (
                        <button
                            key={l.label}
                            onClick={() => scrollTo(l.id)}
                            className="font-display text-4xl tracking-[0.1em] text-white hover:text-accent transition-colors"
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        className="btn-primary mt-6 px-10 py-4 text-sm"
                        onClick={() => scrollTo('newsletter')}
                    >
                        Get Tickets
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
