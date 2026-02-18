import { useEffect, useRef } from 'react';

const ParticleSystem = () => {
    const canvasRef = useRef(null);
    const stateRef = useRef({ particles: [], ripples: [], mouse: { x: -999, y: -999 }, raf: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const state = stateRef.current;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Spawn ambient particles
        const spawn = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.2 + 0.3,
            alpha: Math.random() * 0.35 + 0.05,
            life: 1,
        });

        for (let i = 0; i < 80; i++) state.particles.push(spawn());

        const onClick = (e) => {
            // Laughter ripple
            for (let i = 0; i < 2; i++) {
                state.ripples.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 160 + i * 60, alpha: 0.5 });
            }
            // Burst
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const speed = 1.5 + Math.random() * 2;
                state.particles.push({
                    x: e.clientX, y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    r: Math.random() * 2 + 1,
                    alpha: 0.7,
                    life: 1,
                    burst: true,
                });
            }
        };

        const onMove = (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; };

        window.addEventListener('click', onClick);
        window.addEventListener('mousemove', onMove);

        const ACCENT = '232,197,71';

        const tick = () => {
            state.raf = requestAnimationFrame(tick);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Particles
            state.particles = state.particles.filter(p => p.life > 0.01);
            for (const p of state.particles) {
                if (p.burst) {
                    p.vx *= 0.94; p.vy *= 0.94;
                    p.life -= 0.025;
                } else {
                    // Gentle mouse repulsion
                    const dx = p.x - state.mouse.x;
                    const dy = p.y - state.mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 8000) {
                        const d = Math.sqrt(d2);
                        const f = (90 - d) / 90 * 0.15;
                        p.vx += (dx / d) * f;
                        p.vy += (dy / d) * f;
                    }
                    p.vx *= 0.99; p.vy *= 0.99;
                    // Wrap
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                }
                p.x += p.vx; p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${ACCENT},${p.alpha * p.life})`;
                ctx.fill();
            }

            // Ripples
            state.ripples = state.ripples.filter(r => r.alpha > 0.01);
            for (const r of state.ripples) {
                r.r += 3.5;
                r.alpha *= 0.93;
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${ACCENT},${r.alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };
        tick();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('click', onClick);
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(state.raf);
        };
    }, []);

    return <canvas ref={canvasRef} id="particle-canvas" />;
};

export default ParticleSystem;
