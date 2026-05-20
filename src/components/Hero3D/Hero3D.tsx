import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Trail, Stars } from '@react-three/drei';
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

// Energy Core - The center glowing sphere
const EnergyCore: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const coreRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const innerGlowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (coreRef.current) {
            // Subtle rotation
            coreRef.current.rotation.x = state.clock.elapsedTime * 0.1;
            coreRef.current.rotation.y = state.clock.elapsedTime * 0.15;

            // Mouse follow
            coreRef.current.rotation.x += mousePosition.y * 0.1;
            coreRef.current.rotation.y += mousePosition.x * 0.1;
        }

        // Pulsing glow effect
        if (glowRef.current) {
            const scale = 1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            glowRef.current.scale.setScalar(scale);
        }

        if (innerGlowRef.current) {
            const scale = 0.9 + Math.sin(state.clock.elapsedTime * 3 + Math.PI) * 0.03;
            innerGlowRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group>
            {/* Main distorted core sphere */}
            <Sphere args={[1, 128, 128]} ref={coreRef}>
                <MeshDistortMaterial
                    color="#7c3aed"
                    attach="material"
                    distort={0.35}
                    speed={3}
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#4c1d95"
                    emissiveIntensity={0.4}
                />
            </Sphere>

            {/* Inner energy glow */}
            <Sphere args={[0.75, 64, 64]} ref={innerGlowRef}>
                <meshBasicMaterial
                    color="#c084fc"
                    transparent
                    opacity={0.5}
                />
            </Sphere>

            {/* Outer glow */}
            <Sphere args={[1.2, 32, 32]} ref={glowRef}>
                <meshBasicMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Energy field */}
            <Sphere args={[1.5, 32, 32]}>
                <meshBasicMaterial
                    color="#7c3aed"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </Sphere>
        </group>
    );
};

// Orbiting Ring with glow
const OrbitRing: React.FC<{
    radius: number;
    thickness: number;
    rotation: [number, number, number];
    color: string;
    speed: number;
    opacity?: number;
}> = ({ radius, thickness, rotation, color, speed, opacity = 0.5 }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * speed;
        }
    });

    return (
        <Torus
            args={[radius, thickness, 16, 100]}
            rotation={rotation}
            ref={meshRef}
        >
            <meshBasicMaterial color={color} transparent opacity={opacity} />
        </Torus>
    );
};

// Orbiting Tech Element
const OrbitingElement: React.FC<{
    orbitRadius: number;
    speed: number;
    offset: number;
    size: number;
    color: string;
}> = ({ orbitRadius, speed, offset, size, color }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime * speed + offset;
            meshRef.current.position.x = Math.cos(time) * orbitRadius;
            meshRef.current.position.z = Math.sin(time) * orbitRadius;
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
            meshRef.current.rotation.y = time;
            meshRef.current.rotation.x = time * 0.5;
        }
    });

    return (
        <Trail
            width={0.3}
            length={8}
            color={color}
            attenuation={(t) => t * t}
        >
            <mesh ref={meshRef}>
                <octahedronGeometry args={[size, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Trail>
    );
};

// Holographic Grid Lines
const HolographicGrid: React.FC = () => {
    const linesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    const gridLines = useMemo(() => {
        const lines = [];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            lines.push({
                position: [Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5] as [number, number, number],
                rotation: [0, angle, 0] as [number, number, number],
            });
        }
        return lines;
    }, []);

    return (
        <group ref={linesRef}>
            {gridLines.map((line, i) => (
                <group key={i} position={line.position} rotation={line.rotation}>
                    <mesh>
                        <boxGeometry args={[0.01, 4, 0.01]} />
                        <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// Enhanced Floating Particles with glow
const FloatingParticles: React.FC<{ count: number }> = ({ count }) => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const colorArray = useRef<Float32Array>(new Float32Array(count * 3));

    const particles = useMemo(() => {
        const temp = [];
        const colors: THREE.Color[] = [
            new THREE.Color('#a855f7'),
            new THREE.Color('#c084fc'),
            new THREE.Color('#818cf8'),
            new THREE.Color('#3b82f6'),
            new THREE.Color('#f472b6'),
        ];

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 2.5 + Math.random() * 2;

            const color = colors[Math.floor(Math.random() * colors.length)];
            colorArray.current[i * 3] = color.r;
            colorArray.current[i * 3 + 1] = color.g;
            colorArray.current[i * 3 + 2] = color.b;

            temp.push({
                position: new THREE.Vector3(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi)
                ),
                scale: 0.02 + Math.random() * 0.04,
                speed: 0.15 + Math.random() * 0.25,
                offset: Math.random() * Math.PI * 2,
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.elapsedTime;

        particles.forEach((particle, i) => {
            const matrix = new THREE.Matrix4();
            const pos = particle.position.clone();

            // Orbital motion with multiple frequencies
            pos.x += Math.sin(time * particle.speed + particle.offset) * 0.4;
            pos.y += Math.cos(time * particle.speed * 0.8 + particle.offset) * 0.4;
            pos.z += Math.sin(time * particle.speed * 0.6 + particle.offset) * 0.3;

            // Pulsing scale
            const scale = particle.scale * (1 + Math.sin(time * 2 + particle.offset) * 0.3);

            matrix.setPosition(pos);
            matrix.scale(new THREE.Vector3(scale, scale, scale));
            mesh.current!.setMatrixAt(i, matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
        </instancedMesh>
    );
};

// Data Stream Lines - flowing around the core
const DataStreams: React.FC = () => {
    const streamsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (streamsRef.current) {
            streamsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            streamsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    const streams = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 5; i++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, -2, 0),
                new THREE.Vector3(1.5, -1, 1),
                new THREE.Vector3(2, 0, 0),
                new THREE.Vector3(1.5, 1, -1),
                new THREE.Vector3(0, 2, 0),
            ]);
            temp.push({
                geometry: new THREE.TubeGeometry(curve, 64, 0.01 + Math.random() * 0.01, 8, false),
                rotation: (i / 5) * Math.PI * 2,
                color: ['#a855f7', '#c084fc', '#818cf8', '#3b82f6', '#f472b6'][i],
            });
        }
        return temp;
    }, []);

    return (
        <group ref={streamsRef}>
            {streams.map((stream, i) => (
                <mesh
                    key={i}
                    geometry={stream.geometry}
                    rotation={[0, stream.rotation, 0]}
                >
                    <meshBasicMaterial color={stream.color} transparent opacity={0.5} />
                </mesh>
            ))}
        </group>
    );
};

// Icosahedron Wireframe Shell
const GeometricShell: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
        }
    });

    return (
        <group>
            <Icosahedron args={[2.2, 1]} ref={meshRef}>
                <meshBasicMaterial
                    color="#a855f7"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </Icosahedron>

            {/* Secondary shell */}
            <Icosahedron args={[2.8, 0]}>
                <meshBasicMaterial
                    color="#818cf8"
                    wireframe
                    transparent
                    opacity={0.06}
                />
            </Icosahedron>
        </group>
    );
};

// Dynamic Lighting Rig
const Lights: React.FC = () => {
    const light1Ref = useRef<THREE.PointLight>(null);
    const light2Ref = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (light1Ref.current) {
            light1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5;
            light1Ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 5;
        }
        if (light2Ref.current) {
            light2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 5;
            light2Ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 5;
        }
    });

    return (
        <>
            <ambientLight intensity={0.15} />
            <pointLight
                ref={light1Ref}
                position={[5, 3, 5]}
                intensity={2.5}
                color="#a855f7"
                distance={15}
            />
            <pointLight
                ref={light2Ref}
                position={[-5, -3, -5]}
                intensity={1.5}
                color="#3b82f6"
                distance={15}
            />
            <pointLight
                position={[0, 5, 0]}
                intensity={1}
                color="#c084fc"
                distance={10}
            />
            <spotLight
                position={[0, 8, 0]}
                angle={0.4}
                penumbra={1}
                intensity={2}
                color="#7c3aed"
                castShadow
            />
        </>
    );
};

// Main Scene Component with all 3D elements
const Scene: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const mousePosition = useMousePosition();

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle breathing animation
            const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
            groupRef.current.scale.setScalar(breathe);

            // Subtle mouse follow for entire scene
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                mousePosition.x * 0.15,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                mousePosition.y * 0.1,
                0.05
            );
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Energy Core */}
                <EnergyCore mousePosition={mousePosition} />

                {/* Orbit Rings */}
                <OrbitRing radius={1.6} thickness={0.02} rotation={[Math.PI / 2, 0, 0]} color="#c084fc" speed={0.1} opacity={0.4} />
                <OrbitRing radius={1.8} thickness={0.015} rotation={[Math.PI / 3, Math.PI / 6, 0]} color="#818cf8" speed={-0.15} opacity={0.3} />
                <OrbitRing radius={2} thickness={0.01} rotation={[Math.PI / 4, Math.PI / 3, 0]} color="#a855f7" speed={0.08} opacity={0.25} />

                {/* Geometric Shell */}
                <GeometricShell />

                {/* Holographic Grid */}
                <HolographicGrid />

                {/* Data Streams */}
                <DataStreams />
            </Float>

            {/* Orbiting Elements with trails */}
            <OrbitingElement orbitRadius={2.5} speed={0.8} offset={0} size={0.08} color="#a855f7" />
            <OrbitingElement orbitRadius={2.8} speed={0.6} offset={Math.PI * 0.66} size={0.06} color="#3b82f6" />
            <OrbitingElement orbitRadius={3.1} speed={0.5} offset={Math.PI * 1.33} size={0.05} color="#f472b6" />

            {/* Floating Particles */}
            <FloatingParticles count={80} />
        </group>
    );
};

// Main Hero3D Component
const Hero3D: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0">
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
                <Lights />
                <Scene />

                {/* Distant stars for depth */}
                <Stars
                    radius={100}
                    depth={50}
                    count={1500}
                    factor={3}
                    saturation={0.5}
                    fade
                    speed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default Hero3D;
