import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Stars, Torus, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Mouse Position Hook
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return mousePosition;
};

// Advanced Tech Core
const TechNexus: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const groupRef = useRef<THREE.Group>(null);
    const outerRingRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Complex rotation based on time and mouse
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

            // Mouse influence
            groupRef.current.rotation.y += mousePosition.x * 0.05;
            groupRef.current.rotation.x -= mousePosition.y * 0.05;
        }

        if (outerRingRef.current) {
            outerRingRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            outerRingRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }

        if (innerRingRef.current) {
            innerRingRef.current.rotation.x = -state.clock.elapsedTime * 0.3;
            innerRingRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Distorted Core */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron args={[1.5, 4]}>
                    <MeshDistortMaterial
                        color="#3b82f6"
                        attach="material"
                        distort={0.4}
                        speed={2.5}
                        roughness={0}
                        metalness={1}
                        emissive="#1d4ed8"
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.5}
                    />
                </Icosahedron>
            </Float>

            {/* Wireframe Shell */}
            <Icosahedron args={[2.2, 2]}>
                <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.1} />
            </Icosahedron>

            {/* Rotating Tech Rings */}
            <group ref={outerRingRef}>
                <Torus args={[3, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} toneMapped={false} />
                </Torus>
            </group>

            <group ref={innerRingRef}>
                <Torus args={[2.5, 0.03, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
                    <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} toneMapped={false} />
                </Torus>
            </group>
        </group>
    );
};

// Floating Data Particles
const Particles: React.FC = () => {
    return (
        <group>
            <Sparkles
                count={100}
                scale={10}
                size={4}
                speed={0.4}
                opacity={0.5}
                color="#a855f7"
            />
            <Sparkles
                count={50}
                scale={8}
                size={6}
                speed={0.2}
                opacity={0.4}
                color="#3b82f6"
            />
        </group>
    )
}

// Scene Setup
const Scene: React.FC = () => {
    const mousePosition = useMousePosition();

    return (
        <group>
            <TechNexus mousePosition={mousePosition} />
            <Particles />
        </group>
    );
};

// Main Component
const ProjectsHero3D: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 9], fov: 40 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />

                <Scene />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default ProjectsHero3D;
