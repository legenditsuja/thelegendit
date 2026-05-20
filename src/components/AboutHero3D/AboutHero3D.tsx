import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Sparkles, Icosahedron, Torus } from '@react-three/drei';
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

// Geometric Constellation - Represents team, connection, and creativity
const Constellation: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Elegant slow rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;

            // Mouse influence
            groupRef.current.rotation.y += mousePosition.x * 0.05;
            groupRef.current.rotation.x -= mousePosition.y * 0.05;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core Idea - Golden/Pink Nucleus */}
            <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere args={[1.4, 64, 64]}>
                    <MeshDistortMaterial
                        color="#e879f9" // Pink/Purple
                        attach="material"
                        distort={0.3}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        emissive="#d946ef"
                        emissiveIntensity={0.6}
                        transparent
                        opacity={0.6}
                    />
                </Sphere>
            </Float>

            {/* Neural Lattice / Connection Network */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Icosahedron args={[2.2, 2]}>
                    <meshStandardMaterial color="#fbbf24" wireframe transparent opacity={0.15} emissive="#fbbf24" emissiveIntensity={0.5} />
                </Icosahedron>
            </Float>

            {/* Orbital Rings - Represents different departments/skills */}
            <group rotation={[Math.PI / 3, 0, 0]}>
                <Torus args={[3.2, 0.015, 16, 100]} >
                    <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1} transparent opacity={0.6} />
                </Torus>
            </group>

            <group rotation={[-Math.PI / 4, 0, 0]}>
                <Torus args={[3.8, 0.01, 16, 100]} >
                    <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} transparent opacity={0.4} />
                </Torus>
            </group>

            {/* Surrounding Sparkles - "Ideas" */}
            <group ref={particlesRef}>
                <Sparkles
                    count={120}
                    scale={8}
                    size={3}
                    speed={0.4}
                    opacity={0.6}
                    color="#f472b6"
                />
                <Sparkles
                    count={80}
                    scale={10}
                    size={2}
                    speed={0.2}
                    opacity={0.4}
                    color="#fbbf24"
                />
            </group>
        </group>
    );
};

// Scene Wrapper
const Scene: React.FC = () => {
    const mousePosition = useMousePosition();

    return (
        <group>
            <Constellation mousePosition={mousePosition} />
        </group>
    );
};

// Main Component
const AboutHero3D: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 9], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#e879f9" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#fbbf24" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />

                <Scene />

                <Stars radius={100} depth={50} count={1500} factor={3} saturation={0.5} fade speed={0.5} />
            </Canvas>
        </div>
    );
};

export default AboutHero3D;
