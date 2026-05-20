import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorGlowProps {
    containerRef: React.RefObject<HTMLElement | null>;
}

const CursorGlow: React.FC<CursorGlowProps> = ({ containerRef }) => {
    // Use motion values for performant updates (no React re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const opacity = useMotionValue(0);

    // Spring physics for smooth, natural movement
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);
    const smoothOpacity = useSpring(opacity, { damping: 30, stiffness: 300 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        const handleMouseEnter = () => {
            opacity.set(1);
        };

        const handleMouseLeave = () => {
            opacity.set(0);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [containerRef, mouseX, mouseY, opacity]);

    return (
        <motion.div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            style={{ opacity: smoothOpacity }}
        >
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 30%, rgba(168, 85, 247, 0.02) 60%, transparent 80%)',
                    filter: 'blur(40px)',
                }}
            />
        </motion.div>
    );
};

export default CursorGlow;
