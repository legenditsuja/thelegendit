import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Sparkles, Icosahedron } from '@react-three/drei';
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

// Service Core - Representing modular services and stability
const ServiceCore: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const outerGroupRef = useRef<THREE.Group>(null);
    const modulesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }

        if (outerGroupRef.current) {
            // Mouse parallax
            outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(outerGroupRef.current.rotation.x, mousePosition.y * 0.2, 0.1);
            outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(outerGroupRef.current.rotation.y, mousePosition.x * 0.2, 0.1);
        }

        if (modulesRef.current) {
            modulesRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    const modules = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            temp.push({
                position: [Math.cos(angle) * 2, Math.sin(angle * 2) * 0.5, Math.sin(angle) * 2] as [number, number, number],
                rotation: [Math.random() * THREE.MathUtils.DEG2RAD * 180, Math.random() * THREE.MathUtils.DEG2RAD * 180, 0] as [number, number, number],
            });
        }
        return temp;
    }, []);

    return (
        <group ref={outerGroupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Service Core */}
                <Icosahedron args={[1.2, 2]} ref={meshRef}>
                    <MeshDistortMaterial
                        color="#06b6d4"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        metalness={0.9}
                        emissive="#22d3ee"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.6}
                    />
                </Icosahedron>
            </Float>

            {/* Orbiting Service Modules */}
            <group ref={modulesRef}>
                {modules.map((mod, i) => (
                    <group key={i} position={mod.position} rotation={mod.rotation}>
                        <Float speed={3} rotationIntensity={2}>
                            <mesh>
                                <boxGeometry args={[0.2, 0.2, 0.2]} />
                                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
                            </mesh>
                        </Float>
                    </group>
                ))}
            </group>

            {/* Geometric Artifacts */}
            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <Icosahedron args={[2.5, 1]} >
                    <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
                </Icosahedron>
            </Float>

            {/* High Speed Particles */}
            <Sparkles
                count={100}
                scale={5}
                size={4}
                speed={1}
                opacity={0.6}
                color="#a5f3fc"
            />
        </group>
    );
};

// Scene Wrapper
const Scene: React.FC = () => {
    const mousePosition = useMousePosition();

    return (
        <group>
            <ServiceCore mousePosition={mousePosition} />
        </group>
    );
};

// Main Component
const ServicesHero3D: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />

                <Scene />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default ServicesHero3D;
