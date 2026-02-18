import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
    const ref = useRef(null);
    const barRef = useRef(null);
    const [pct, setPct] = useState(0);

    useEffect(() => {
        gsap.to(barRef.current, {
            scaleX: 1,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate() {
                setPct(Math.round(this.progress() * 100));
            },
            onComplete() {
                setTimeout(() => {
                    gsap.to(ref.current, {
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.in',
                        onComplete,
                    });
                }, 300);
            },
        });
    }, [onComplete]);

    return (
        <div
            ref={ref}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: 'var(--bg)' }}
        >
            <div
                className="font-display mb-3"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: 'var(--accent)', letterSpacing: '0.1em' }}
            >
                CYBER LAUGHS
            </div>
            <div className="font-mono text-xs tracking-[0.4em] uppercase mb-10" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>
                Loading Experience
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px overflow-hidden" style={{ background: 'var(--surface)' }}>
                <div
                    ref={barRef}
                    className="loader-progress h-full"
                    style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                />
            </div>
            <div className="font-mono text-xs mt-3" style={{ color: 'var(--t3)', fontFamily: 'DM Mono, monospace' }}>{pct}%</div>
        </div>
    );
};

export default LoadingScreen;
