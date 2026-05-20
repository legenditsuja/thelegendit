import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Ring, Points, PointMaterial } from '@react-three/drei';
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

// Global Signal - Connected Globe concept
const GlobalSignal: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const groupRef = useRef<THREE.Group>(null);
    const ringsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;

            // Mouse parallax
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mousePosition.y * 0.1, 0.1);
        }

        if (ringsRef.current) {
            ringsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
            ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Globe */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Sphere args={[1.5, 64, 64]}>
                    <MeshDistortMaterial
                        color="#3b82f6"
                        attach="material"
                        distort={0.3}
                        speed={1}
                        roughness={0.4}
                        metalness={0.8}
                        emissive="#10b981"
                        emissiveIntensity={0.4}
                        wireframe
                        transparent
                        opacity={0.6}
                    />
                </Sphere>
                {/* Inner Core */}
                <Sphere args={[1.2, 32, 32]}>
                    <meshBasicMaterial color="#000000" />
                </Sphere>
            </Float>

            {/* Signal Rings */}
            <group ref={ringsRef}>
                <Ring args={[2.5, 2.55, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
                    <meshBasicMaterial color="#10b981" transparent opacity={0.6} side={THREE.DoubleSide} />
                </Ring>
                <Ring args={[3.5, 3.52, 64]} rotation={[-Math.PI / 3, 0, 0]}>
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} side={THREE.DoubleSide} />
                </Ring>
            </group>

        </group>
    );
};

// Utility to generate random points in sphere
const generateSpherePoints = (count: number, radius: number) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * radius;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
};

const ConnectionPoints = (props: any) => {
    const ref = useRef<any>(null)
    // Generate points manually to avoid external dependency issues
    const [sphere] = useState(() => generateSpherePoints(400, 2.2))

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#10b981" size={0.03} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

// Scene Wrapper
const Scene: React.FC = () => {
    const mousePosition = useMousePosition();

    return (
        <group>
            <GlobalSignal mousePosition={mousePosition} />
            <ConnectionPoints />
        </group>
    );
};

// Main Component
const ContactHero3D: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />

                <Scene />

                <Stars radius={100} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default ContactHero3D;
