"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface SkillOrb {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
}

function Orb({ name, position, color, size }: SkillOrb) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
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
        <mesh ref={glowRef} scale={size * 1.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        
        {/* Main orb */}
        <mesh ref={meshRef} scale={size}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Text label */}
        <Text
          position={[0, -size - 0.3, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-medium.woff"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

function OrbField() {
  const skills: SkillOrb[] = useMemo(() => [
    { name: "Java", position: [-3, 1.5, 0], color: "#f89820", size: 0.7 },
    { name: "Spring", position: [-1.5, -1, 1], color: "#6db33f", size: 0.6 },
    { name: "Node.js", position: [0, 2, -1], color: "#68a063", size: 0.65 },
    { name: "React", position: [2, 0.5, 0.5], color: "#61dafb", size: 0.6 },
    { name: "TypeScript", position: [3.5, -0.5, -0.5], color: "#3178c6", size: 0.55 },
    { name: "Docker", position: [-2.5, -2, -1], color: "#2496ed", size: 0.5 },
    { name: "PostgreSQL", position: [1, -1.8, 1], color: "#336791", size: 0.55 },
    { name: "C#", position: [3, 2, 0], color: "#9b4993", size: 0.6 },
  ], []);

  return (
    <group>
      {skills.map((skill) => (
        <Orb key={skill.name} {...skill} />
      ))}
      
      {/* Ambient particles */}
      <Particles />
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function FloatingSkillsOrbs() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4f46e5" />
        
        <OrbField />
      </Canvas>
    </div>
  );
}
