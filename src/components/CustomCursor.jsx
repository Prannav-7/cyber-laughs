import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(dot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        // Smooth ring follow
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            gsap.set(ring, { x: ringX, y: ringY });
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover effects
        const handleMouseEnter = () => ring.classList.add('hovering');
        const handleMouseLeave = () => ring.classList.remove('hovering');

        const interactables = document.querySelectorAll('button, a, [class*="cursor-none"]');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
};

export default CustomCursor;
