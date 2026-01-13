"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "@/lib/utils";

export interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  speed?: number;
  mouseInfluence?: number;
  opacity?: number;
}

/**
 * Interactive particle field with mouse influence
 * Creates the "Digital Nebula" effect for the Hero section
 */
export function ParticleField({
  count = 3000,
  size = 0.015,
  color = "#ffffff",
  spread = 10,
  speed = 0.2,
  mouseInfluence = 0.5,
  opacity = 0.8,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere-like pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = random(0.5, spread);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) - spread / 2;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Random velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions, velocities, originalPositions };
  }, [count, spread]);

  // Track mouse position
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Get original position
      const ox = particles.originalPositions[i3];
      const oy = particles.originalPositions[i3 + 1];
      const oz = particles.originalPositions[i3 + 2];

      // Add organic wave movement
      const waveX = Math.sin(time * speed + ox * 0.5) * 0.1;
      const waveY = Math.cos(time * speed + oy * 0.5) * 0.1;
      const waveZ = Math.sin(time * speed * 0.5 + oz * 0.3) * 0.05;

      // Calculate distance from mouse (in normalized coordinates)
      const dx = mouseRef.current.x * 5 - positions[i3];
      const dy = mouseRef.current.y * 5 - positions[i3 + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Mouse repulsion effect
      const repulsionRadius = 3;
      let repulsionX = 0;
      let repulsionY = 0;

      if (distance < repulsionRadius) {
        const force = (1 - distance / repulsionRadius) * mouseInfluence;
        repulsionX = -dx * force * 0.5;
        repulsionY = -dy * force * 0.5;
      }

      // Apply position updates
      positions[i3] = ox + waveX + repulsionX;
      positions[i3 + 1] = oy + waveY + repulsionY;
      positions[i3 + 2] = oz + waveZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <Points
      ref={pointsRef}
      positions={particles.positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Floating geometric shapes for visual interest
 */
export function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe icosahedron */}
      <mesh position={[3, 1, -2]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial
          color="#404040"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Wireframe octahedron */}
      <mesh position={[-3, -1, -1]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial
          color="#404040"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Small torus */}
      <mesh position={[2, -2, -3]}>
        <torusGeometry args={[0.4, 0.1, 8, 16]} />
        <meshBasicMaterial
          color="#303030"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}
