"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface SkillOrb {
  position: [number, number, number];
  color: string;
  size: number;
}

function Orb({ position, color, size }: SkillOrb) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      position={position}
    >
      <group>
        {/* Glow effect */}
        <mesh scale={size * 1.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
        
        {/* Main orb - wireframe icosahedron */}
        <mesh ref={meshRef} scale={size}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
        
        {/* Inner core */}
        <mesh scale={size * 0.3}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbField() {
  const skills: SkillOrb[] = useMemo(() => [
    { position: [-3.5, 1.5, -1], color: "#f89820", size: 0.8 },      // Java orange
    { position: [-1.5, -1.2, 0.5], color: "#6db33f", size: 0.7 },    // Spring green
    { position: [0.5, 2.2, -0.5], color: "#68a063", size: 0.75 },    // Node green
    { position: [2.5, 0.3, 0.3], color: "#61dafb", size: 0.7 },      // React blue
    { position: [4, -0.8, -0.8], color: "#3178c6", size: 0.65 },     // TypeScript blue
    { position: [-2.8, -2.2, -0.5], color: "#2496ed", size: 0.6 },   // Docker blue
    { position: [1.2, -2, 0.8], color: "#336791", size: 0.65 },      // PostgreSQL blue
    { position: [3.5, 2.2, -0.3], color: "#9b4993", size: 0.7 },     // C# purple
  ], []);

  return (
    <group>
      {skills.map((skill, i) => (
        <Orb key={i} {...skill} />
      ))}
      <Particles />
      <ConnectingLines />
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 150;
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    
    // Create some subtle connecting lines
    const points = [
      [-3.5, 1.5, -1],
      [-1.5, -1.2, 0.5],
      [0.5, 2.2, -0.5],
      [2.5, 0.3, 0.3],
    ];
    
    for (let i = 0; i < points.length - 1; i++) {
      positions.push(...points[i], ...points[i + 1]);
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);
  
  useFrame((state) => {
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
    </lineSegments>
  );
}

export function FloatingSkillsOrbs() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
        
        <OrbField />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={["#0a0a0a", 8, 20]} />
      </Canvas>
    </div>
  );
}
