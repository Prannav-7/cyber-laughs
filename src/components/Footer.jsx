const Footer = () => (
    <footer className="py-16 px-6 lg:px-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                {/* Brand */}
                <div>
                    <div className="font-display text-2xl tracking-widest mb-1" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        CYBER LAUGHS
                    </div>
                    <div className="font-mono text-xs tracking-widest" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                        Underground Comedy Club — Est. 2024
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(s => (
                        <a key={s} href="#" className="nav-link">{s}</a>
                    ))}
                </div>

                {/* Address */}
                <div className="font-mono text-xs leading-relaxed" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                    <div>42 Underground Ave, Cyber District</div>
                    <div className="mt-1" style={{ color: 'var(--accent)' }}>info@cyberlaughs.com</div>
                </div>
            </div>

            <div className="divider my-8" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                <span>© 2025 Cyber Laughs. All rights reserved.</span>
                <span>Built with care and dark humor.</span>
            </div>
        </div>
    </footer>
);

export default Footer;
