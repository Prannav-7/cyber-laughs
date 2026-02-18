import { useEffect, useRef, useCallback } from 'react';

const ParticleSystem = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const ripplesRef = useRef([]);
    const animFrameRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const createParticle = useCallback((x, y, isClick = false) => {
        const colors = ['#f72585', '#8338ec', '#00f5ff', '#ffbe0b', '#ff006e'];
        return {
            x: x ?? Math.random() * window.innerWidth,
            y: y ?? Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * (isClick ? 4 : 0.4),
            vy: (Math.random() - 0.5) * (isClick ? 4 : 0.4) - (isClick ? 2 : 0),
            size: isClick ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: isClick ? 1 : Math.random() * 0.6 + 0.1,
            decay: isClick ? 0.015 : 0.002,
            life: 1,
            isClick,
        };
    }, []);

    const createRipple = useCallback((x, y) => {
        return {
            x,
            y,
            radius: 0,
            maxRadius: 200 + Math.random() * 100,
            alpha: 1,
            color: Math.random() > 0.5 ? '#f72585' : '#8338ec',
            speed: 4 + Math.random() * 3,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize ambient particles
        for (let i = 0; i < 120; i++) {
            particlesRef.current.push(createParticle());
        }

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Laughter ripple
            for (let i = 0; i < 3; i++) {
                ripplesRef.current.push(createRipple(x, y));
            }

            // Burst particles
            for (let i = 0; i < 20; i++) {
                particlesRef.current.push(createParticle(x, y, true));
            }
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connection lines between nearby particles
            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(247, 37, 133, ${0.05 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter(p => p.life > 0);
            particlesRef.current.forEach(p => {
                // Mouse repulsion for ambient particles
                if (!p.isClick) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const force = (120 - dist) / 120;
                        p.vx += (dx / dist) * force * 0.3;
                        p.vy += (dy / dist) * force * 0.3;
                    }
                    // Dampen velocity
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                // Wrap ambient particles
                if (!p.isClick) {
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                    p.life = Math.max(p.life, 0.05); // Keep ambient alive
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha * p.life;
                ctx.fill();

                // Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            });

            // Update and draw ripples
            ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0);
            ripplesRef.current.forEach(r => {
                r.radius += r.speed;
                r.alpha = Math.max(0, 1 - r.radius / r.maxRadius);

                // Draw multiple rings for "laughter" effect
                for (let ring = 0; ring < 3; ring++) {
                    const ringRadius = r.radius - ring * 20;
                    if (ringRadius > 0) {
                        ctx.beginPath();
                        ctx.arc(r.x, r.y, ringRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = r.color;
                        ctx.globalAlpha = r.alpha * (1 - ring * 0.3);
                        ctx.lineWidth = 2 - ring * 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [createParticle, createRipple]);

    return (
        <canvas
            ref={canvasRef}
            id="particle-canvas"
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
        />
    );
};

export default ParticleSystem;
