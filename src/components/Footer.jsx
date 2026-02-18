const Footer = () => (
    <footer className="py-16 px-6 lg:px-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                {/* Brand */}
                <div>
                    <div className="font-display text-2xl text-accent tracking-widest mb-1">CYBER LAUGHS</div>
                    <div className="text-t3 font-mono text-xs tracking-widest">Underground Comedy Club — Est. 2024</div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(s => (
                        <a key={s} href="#" className="nav-link">{s}</a>
                    ))}
                </div>

                {/* Address */}
                <div className="text-t3 font-mono text-xs leading-relaxed">
                    <div>42 Underground Ave, Cyber District</div>
                    <div className="text-accent mt-1">info@cyberlaughs.com</div>
                </div>
            </div>

            <div className="divider my-8" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-t3 font-mono text-xs">
                <span>© 2025 Cyber Laughs. All rights reserved.</span>
                <span>Built with care and dark humor.</span>
            </div>
        </div>
    </footer>
);

export default Footer;
