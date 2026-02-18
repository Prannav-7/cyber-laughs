import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MicrophoneScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        const W = mount.clientWidth;
        const H = mount.clientHeight;

        /* ── Renderer ── */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        /* ── Scene / Camera ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
        camera.position.set(0, 0, 5.5);

        /* ── Materials ── */
        const chrome = new THREE.MeshStandardMaterial({
            color: 0xd0d0d8,
            metalness: 0.95,
            roughness: 0.08,
        });
        const darkChrome = new THREE.MeshStandardMaterial({
            color: 0x282830,
            metalness: 0.9,
            roughness: 0.2,
        });
        const goldRing = new THREE.MeshStandardMaterial({
            color: 0xe8c547,
            metalness: 0.8,
            roughness: 0.15,
            emissive: 0xe8c547,
            emissiveIntensity: 0.15,
        });

        /* ── Microphone group ── */
        const mic = new THREE.Group();

        // Head sphere
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.72, 48, 48), chrome);
        head.position.y = 1.2;
        mic.add(head);

        // Grill rings on head
        for (let i = 0; i < 7; i++) {
            const t = (i - 3) / 3;
            const radius = Math.cos(t * Math.PI * 0.5) * 0.72 + 0.001;
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(radius, 0.012, 8, 64),
                darkChrome
            );
            ring.position.y = 1.2 + t * 0.68;
            ring.rotation.x = Math.PI / 2;
            mic.add(ring);
        }

        // Body
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 1.7, 32), chrome);
        body.position.y = 0;
        mic.add(body);

        // Gold accent ring
        const accent = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.055, 16, 64), goldRing);
        accent.position.y = 0.52;
        accent.rotation.x = Math.PI / 2;
        mic.add(accent);

        // Bottom ring
        const botRing = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.03, 16, 64), darkChrome);
        botRing.position.y = -0.85;
        botRing.rotation.x = Math.PI / 2;
        mic.add(botRing);

        // Stand rod
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16), darkChrome);
        rod.position.y = -1.3;
        mic.add(rod);

        // Base
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.07, 48), chrome);
        base.position.y = -1.78;
        mic.add(base);

        // Base gold ring
        const baseGold = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.025, 16, 64), goldRing);
        baseGold.position.y = -1.78;
        baseGold.rotation.x = Math.PI / 2;
        mic.add(baseGold);

        scene.add(mic);

        /* ── Lights ── */
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        const key = new THREE.DirectionalLight(0xffffff, 3);
        key.position.set(4, 6, 4);
        scene.add(key);

        const fill = new THREE.DirectionalLight(0xc8d8ff, 1.2);
        fill.position.set(-4, 2, 2);
        scene.add(fill);

        const rim = new THREE.DirectionalLight(0xe8c547, 1.5);
        rim.position.set(0, -4, -4);
        scene.add(rim);

        const top = new THREE.PointLight(0xffffff, 2, 12);
        top.position.set(0, 6, 2);
        scene.add(top);

        /* ── Mouse tracking ── */
        const mouse = { x: 0, y: 0 };
        const current = { rx: 0, ry: 0 };
        const onMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('mousemove', onMove);

        /* ── Animate ── */
        let t = 0, raf;
        const animate = () => {
            raf = requestAnimationFrame(animate);
            t += 0.008;

            // Smooth cursor rotation
            current.rx += (-mouse.y * 0.3 - current.rx) * 0.04;
            current.ry += (mouse.x * 0.5 - current.ry) * 0.04;

            mic.rotation.x = current.rx;
            mic.rotation.y = current.ry + t * 0.15;
            mic.position.y = Math.sin(t * 0.7) * 0.12;

            renderer.render(scene, camera);
        };
        animate();

        /* ── Resize ── */
        const onResize = () => {
            const w = mount.clientWidth, h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(raf);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="three-canvas-wrapper" />;
};

export default MicrophoneScene;
