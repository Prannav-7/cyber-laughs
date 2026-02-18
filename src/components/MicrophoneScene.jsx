import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const MicrophoneModel = () => {
    const meshRef = useRef();

    // Optimized material: Polished Chrome
    const chromeMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 1,
        roughness: 0.1,
    });

    const darkMat = new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.8,
        roughness: 0.4,
    });

    const goldMat = new THREE.MeshStandardMaterial({
        color: '#e8b84b',
        metalness: 1,
        roughness: 0.2,
    });

    return (
        <group ref={meshRef} scale={1.2}>
            {/* Top Grill */}
            <mesh position={[0, 1.2, 0]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <primitive object={chromeMat} attach="material" />
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.71, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#222" wireframe transparent opacity={0.3} />
                </mesh>
            </mesh>

            {/* Body Part 1 */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.45, 0.5, 0.8, 32]} />
                <primitive object={darkMat} attach="material" />
            </mesh>

            {/* Gold Ring */}
            <mesh position={[0, 0.85, 0]}>
                <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
                <primitive object={goldMat} attach="material" />
            </mesh>

            {/* Handle */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.3, 0.25, 1.5, 32]} />
                <primitive object={darkMat} attach="material" />
            </mesh>

            {/* Base Stand */}
            <mesh position={[0, -1.4, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.4, 32]} />
                <primitive object={darkMat} attach="material" />
            </mesh>

            {/* Circular Base */}
            <mesh position={[0, -1.6, 0]}>
                <cylinderGeometry args={[0.8, 0.9, 0.1, 32]} />
                <primitive object={darkMat} attach="material" />
            </mesh>
            <mesh position={[0, -1.52, 0]}>
                <cylinderGeometry args={[0.78, 0.78, 0.05, 32]} />
                <primitive object={goldMat} attach="material" />
            </mesh>
        </group>
    );
};

const MicrophoneScene = () => {
    return (
        <div className="three-canvas-wrapper" style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} alpha={true}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, -0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <MicrophoneModel />
                    </Float>
                </PresentationControls>

                <Environment preset="studio" />
                <ContactShadows
                    position={[0, -1.8, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2.5}
                    far={4}
                />
            </Canvas>
        </div>
    );
};

export default MicrophoneScene;
