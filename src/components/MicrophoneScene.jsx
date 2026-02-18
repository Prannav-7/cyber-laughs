import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MicrophoneScene = () => {
    const mountRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mount.appendChild(renderer.domElement);

        // Chrome material
        const chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0d8,
            metalness: 1.0,
            roughness: 0.05,
            envMapIntensity: 1.5,
        });

        const neonMagentaMaterial = new THREE.MeshStandardMaterial({
            color: 0xf72585,
            metalness: 0.3,
            roughness: 0.2,
            emissive: 0xf72585,
            emissiveIntensity: 0.8,
        });

        const neonCyanMaterial = new THREE.MeshStandardMaterial({
            color: 0x00f5ff,
            metalness: 0.3,
            roughness: 0.2,
            emissive: 0x00f5ff,
            emissiveIntensity: 0.6,
        });

        // Microphone group
        const micGroup = new THREE.Group();

        // Mic head (sphere)
        const headGeo = new THREE.SphereGeometry(0.7, 32, 32);
        const micHead = new THREE.Mesh(headGeo, chromeMaterial);
        micHead.position.y = 1.2;
        micHead.castShadow = true;
        micGroup.add(micHead);

        // Mic head grill lines
        for (let i = 0; i < 8; i++) {
            const ringGeo = new THREE.TorusGeometry(0.7, 0.015, 8, 64);
            const ring = new THREE.Mesh(ringGeo, neonMagentaMaterial);
            ring.position.y = 1.2;
            ring.rotation.x = Math.PI / 2;
            ring.position.y = 1.2 + (i - 3.5) * 0.18;
            ring.scale.setScalar(Math.cos(((i - 3.5) / 4) * Math.PI * 0.5) + 0.01);
            micGroup.add(ring);
        }

        // Mic body (cylinder)
        const bodyGeo = new THREE.CylinderGeometry(0.22, 0.28, 1.6, 32);
        const micBody = new THREE.Mesh(bodyGeo, chromeMaterial);
        micBody.position.y = 0;
        micBody.castShadow = true;
        micGroup.add(micBody);

        // Mic connector ring
        const connectorGeo = new THREE.TorusGeometry(0.28, 0.06, 16, 64);
        const connector = new THREE.Mesh(connectorGeo, neonMagentaMaterial);
        connector.position.y = 0.5;
        connector.rotation.x = Math.PI / 2;
        micGroup.add(connector);

        // Mic base ring
        const baseRingGeo = new THREE.TorusGeometry(0.32, 0.05, 16, 64);
        const baseRing = new THREE.Mesh(baseRingGeo, neonCyanMaterial);
        baseRing.position.y = -0.8;
        baseRing.rotation.x = Math.PI / 2;
        micGroup.add(baseRing);

        // Stand
        const standGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16);
        const stand = new THREE.Mesh(standGeo, chromeMaterial);
        stand.position.y = -1.2;
        micGroup.add(stand);

        // Stand base
        const standBaseGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.08, 32);
        const standBase = new THREE.Mesh(standBaseGeo, chromeMaterial);
        standBase.position.y = -1.65;
        micGroup.add(standBase);

        // Neon ring around base
        const baseNeonGeo = new THREE.TorusGeometry(0.55, 0.03, 16, 64);
        const baseNeon = new THREE.Mesh(baseNeonGeo, neonMagentaMaterial);
        baseNeon.position.y = -1.65;
        baseNeon.rotation.x = Math.PI / 2;
        micGroup.add(baseNeon);

        scene.add(micGroup);

        // Floating orbs around mic
        const orbColors = [0xf72585, 0x8338ec, 0x00f5ff, 0xffbe0b];
        const orbs = [];
        orbColors.forEach((color, i) => {
            const orbGeo = new THREE.SphereGeometry(0.08, 16, 16);
            const orbMat = new THREE.MeshStandardMaterial({
                color,
                emissive: color,
                emissiveIntensity: 1.5,
                metalness: 0.5,
                roughness: 0.1,
            });
            const orb = new THREE.Mesh(orbGeo, orbMat);
            const angle = (i / orbColors.length) * Math.PI * 2;
            orb.position.set(Math.cos(angle) * 1.5, Math.sin(angle * 0.5) * 0.5, Math.sin(angle) * 1.5);
            scene.add(orb);
            orbs.push({ mesh: orb, angle, speed: 0.3 + i * 0.1, radius: 1.5 + i * 0.1 });
        });

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x1a0a2e, 1);
        scene.add(ambientLight);

        const magentaLight = new THREE.PointLight(0xf72585, 8, 10);
        magentaLight.position.set(3, 3, 3);
        scene.add(magentaLight);

        const cyanLight = new THREE.PointLight(0x00f5ff, 6, 10);
        cyanLight.position.set(-3, -2, 2);
        scene.add(cyanLight);

        const purpleLight = new THREE.PointLight(0x8338ec, 5, 10);
        purpleLight.position.set(0, 4, -3);
        scene.add(purpleLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 2);
        rimLight.position.set(-2, 5, -5);
        scene.add(rimLight);

        // Mouse tracking
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let time = 0;
        const targetRotX = { value: 0 };
        const targetRotY = { value: 0 };
        const currentRotX = { value: 0 };
        const currentRotY = { value: 0 };

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            time += 0.01;

            // Smooth cursor-based rotation
            targetRotX.value = mouseRef.current.y * 0.4;
            targetRotY.value = mouseRef.current.x * 0.6;
            currentRotX.value += (targetRotX.value - currentRotX.value) * 0.05;
            currentRotY.value += (targetRotY.value - currentRotY.value) * 0.05;

            micGroup.rotation.x = currentRotX.value;
            micGroup.rotation.y = currentRotY.value + time * 0.2;

            // Float animation
            micGroup.position.y = Math.sin(time * 0.8) * 0.15;

            // Animate orbs
            orbs.forEach((orb, i) => {
                orb.angle += orb.speed * 0.01;
                orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
                orb.mesh.position.y = Math.sin(orb.angle * 0.7 + i) * 0.8;
                orb.mesh.position.z = Math.sin(orb.angle) * orb.radius;
            });

            // Pulse neon lights
            magentaLight.intensity = 6 + Math.sin(time * 2) * 2;
            cyanLight.intensity = 5 + Math.cos(time * 1.5) * 1.5;

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameRef.current);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="three-canvas-wrapper"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default MicrophoneScene;
