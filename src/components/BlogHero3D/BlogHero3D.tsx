import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Minimal Mouse Position Hook
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

// Minimal Abstract Form
const AbstractForm: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Very slow, meditative rotation
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;

            // Subtle reaction to mouse
            meshRef.current.rotation.x += (mousePosition.y * 0.05 - meshRef.current.rotation.x) * 0.02;
            meshRef.current.rotation.y += (mousePosition.x * 0.05 - meshRef.current.rotation.y) * 0.02;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Octahedron ref={meshRef} args={[1.5, 0]}>
                <MeshDistortMaterial
                    color="#a855f7"
                    attach="material"
                    distort={0.6} // High distortion for organic feel
                    speed={0.5}   // Slow speed for calmness
                    roughness={0.2}
                    metalness={0.1}
                    bumpScale={0.005}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    radius={1}
                    transparent
                    opacity={0.5}
                />
            </Octahedron>
        </Float>
    );
};

const MinimalScene: React.FC = () => {
    const mousePosition = useMousePosition();
    return <AbstractForm mousePosition={mousePosition} />;
};

const BlogHero3D: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#d8b4fe" />
                <pointLight position={[-5, -5, -5]} intensity={0.2} color="#ffffff" />

                <MinimalScene />

                {/* Minimal distant stars for depth, very subtle */}
                <Stars radius={100} depth={50} count={400} factor={2} saturation={0} fade speed={0.2} />
            </Canvas>
        </div>
    );
};

export default BlogHero3D;
