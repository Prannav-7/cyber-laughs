import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = 0, my = 0, rx = 0, ry = 0, raf;

        const onMove = (e) => { mx = e.clientX; my = e.clientY; };
        window.addEventListener('mousemove', onMove, { passive: true });

        // Dot follows instantly via GSAP set (no transition lag)
        const onMoveGsap = (e) => {
            gsap.set(dot, { x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', onMoveGsap, { passive: true });

        // Ring lags behind
        const tick = () => {
            raf = requestAnimationFrame(tick);
            rx += (mx - rx) * 0.1;
            ry += (my - ry) * 0.1;
            gsap.set(ring, { x: rx, y: ry });
        };
        tick();

        // Hover expand
        const addHover = () => ring.classList.add('hovering');
        const remHover = () => ring.classList.remove('hovering');
        const targets = document.querySelectorAll('button, a, input, [data-hover]');
        targets.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', remHover); });

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousemove', onMoveGsap);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-50%, -50%)' }} />
            <div ref={ringRef} className="cursor-ring" style={{ transform: 'translate(-50%, -50%)' }} />
        </>
    );
};

export default CustomCursor;
