const Footer = () => {
    return (
        <footer
            className="relative py-16 px-6 lg:px-12 overflow-hidden"
            style={{ borderTop: '1px solid rgba(247,37,133,0.1)' }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(247,37,133,0.03) 0%, transparent 100%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <div>
                        <div
                            className="font-display text-3xl tracking-widest mb-2"
                            style={{
                                background: 'linear-gradient(135deg, #f72585, #8338ec)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            CYBER LAUGHS
                        </div>
                        <div className="text-chrome-mid/40 font-mono text-xs tracking-widest">
                            UNDERGROUND COMEDY CLUB — EST. 2024
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8">
                        {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-chrome-mid/40 hover:text-magenta-400 font-mono text-xs tracking-widest uppercase transition-colors duration-300 cursor-none"
                            >
                                {social}
                            </a>
                        ))}
                    </div>

                    {/* Address */}
                    <div className="text-right text-chrome-mid/40 font-mono text-xs">
                        <div>42 Underground Ave</div>
                        <div>Cyber District, CD 00001</div>
                        <div className="text-magenta-400 mt-1">info@cyberlaughs.com</div>
                    </div>
                </div>

                <div className="neon-hr my-8" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-chrome-mid/30 font-mono text-xs">
                    <span>© 2025 CYBER LAUGHS. ALL RIGHTS RESERVED.</span>
                    <span>BUILT WITH ⚡ AND DARK HUMOR</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
