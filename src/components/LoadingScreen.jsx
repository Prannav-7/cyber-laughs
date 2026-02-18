import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => {
                gsap.to(loaderRef.current, {
                    opacity: 0,
                    scale: 1.05,
                    duration: 0.8,
                    ease: 'power3.in',
                    onComplete,
                });
            }, 400);
        }
    }, [progress, onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: '#030306' }}
        >
            {/* Scanlines */}
            <div className="absolute inset-0 scanlines pointer-events-none" />

            {/* Logo */}
            <div
                className="font-display text-6xl lg:text-8xl tracking-widest mb-8"
                style={{
                    background: 'linear-gradient(135deg, #f72585, #8338ec, #00f5ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(247,37,133,0.6))',
                    animation: 'flicker 3s linear infinite',
                }}
            >
                CYBER LAUGHS
            </div>

            <div className="font-mono text-xs tracking-[0.5em] text-chrome-mid/40 mb-12 uppercase">
                Initializing Comedy Protocol...
            </div>

            {/* Progress bar */}
            <div className="w-64 h-px bg-obsidian-700 relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full transition-all duration-150"
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        background: 'linear-gradient(90deg, #f72585, #8338ec)',
                        boxShadow: '0 0 10px #f72585',
                    }}
                />
            </div>

            <div className="font-mono text-xs text-magenta-400 mt-3 tracking-widest">
                {Math.min(Math.round(progress), 100)}%
            </div>

            {/* Decorative mic icon */}
            <div
                className="absolute bottom-12 font-mono text-xs text-chrome-mid/20 tracking-widest"
            >
                🎤 LOADING PUNCHLINES...
            </div>
        </div>
    );
};

export default LoadingScreen;
