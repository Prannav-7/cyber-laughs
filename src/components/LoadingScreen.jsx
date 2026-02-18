import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
    const ref = useRef(null);
    const barRef = useRef(null);
    const [pct, setPct] = useState(0);

    useEffect(() => {
        // Animate progress bar with GSAP for smooth motion
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
            style={{ background: '#0a0a0a' }}
        >
            <div className="font-display text-5xl lg:text-7xl tracking-widest text-accent mb-3" style={{ letterSpacing: '0.12em' }}>
                CYBER LAUGHS
            </div>
            <div className="font-mono text-xs text-t3 tracking-[0.4em] uppercase mb-10">
                Loading Experience
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-surface overflow-hidden">
                <div
                    ref={barRef}
                    className="loader-progress h-full"
                    style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                />
            </div>
            <div className="font-mono text-xs text-t3 mt-3">{pct}%</div>
        </div>
    );
};

export default LoadingScreen;
