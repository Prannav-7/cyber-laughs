import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-display text-xl tracking-widest text-accent cursor-none"
                    style={{ letterSpacing: '0.12em' }}
                >
                    CYBER LAUGHS
                </button>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { label: 'Lineup', id: 'lineup' },
                        { label: 'Schedule', id: 'schedule' },
                        { label: 'Reviews', id: 'testimonials' },
                        { label: 'Contact', id: 'newsletter' },
                    ].map(l => (
                        <button key={l.label} onClick={() => scrollTo(l.id)} className="nav-link">
                            {l.label}
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <button
                    id="nav-tickets"
                    className="btn-accent"
                    style={{ padding: '10px 20px', fontSize: '0.72rem' }}
                    onClick={() => scrollTo('newsletter')}
                >
                    Get Tickets
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
