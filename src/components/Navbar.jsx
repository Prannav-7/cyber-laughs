const Navbar = () => {
    const navLinks = [
        { label: 'Lineup', href: '#lineup' },
        { label: 'Schedule', href: '#schedule' },
        { label: 'About', href: '#testimonials' },
        { label: 'Contact', href: '#newsletter' },
    ];

    const scrollTo = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4"
            style={{
                background: 'rgba(3,3,6,0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(247,37,133,0.1)',
            }}
        >
            {/* Logo */}
            <div
                className="font-display text-2xl tracking-widest cursor-none"
                style={{
                    background: 'linear-gradient(135deg, #f72585, #8338ec)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 10px rgba(247,37,133,0.4))',
                }}
            >
                CYBER LAUGHS
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => scrollTo(link.href)}
                        className="font-mono text-xs tracking-widest uppercase text-chrome-mid/60 hover:text-magenta-400 transition-colors duration-300 cursor-none relative group"
                    >
                        {link.label}
                        <span
                            className="absolute -bottom-1 left-0 w-0 h-px bg-magenta-400 group-hover:w-full transition-all duration-300"
                            style={{ boxShadow: '0 0 6px #f72585' }}
                        />
                    </button>
                ))}
            </div>

            {/* CTA */}
            <button
                id="nav-tickets-btn"
                className="ticket-btn px-5 py-2.5 font-display text-sm text-white tracking-widest cursor-none"
                onClick={() => scrollTo('#newsletter')}
            >
                <span className="relative z-10">GET TICKETS</span>
            </button>
        </nav>
    );
};

export default Navbar;
