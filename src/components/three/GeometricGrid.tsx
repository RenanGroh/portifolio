"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

function GridShape({ 
  position, 
  rotation,
  color,
  shape
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  shape: "box" | "octahedron" | "tetrahedron" | "torus";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.7]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[0.8]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [shape]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      {geometry}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function GridField() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const shapes = useMemo(() => {
    const items: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      color: string;
      shape: "box" | "octahedron" | "tetrahedron" | "torus";
    }> = [];
    
    const shapeTypes: Array<"box" | "octahedron" | "tetrahedron" | "torus"> = 
      ["box", "octahedron", "tetrahedron", "torus"];
    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc"];
    
    for (let i = 0; i < 20; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10 - 5
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      });
    }
    
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <GridShape key={i} {...shape} />
      ))}
      
      {/* Connecting lines */}
      <LineGrid />
    </group>
  );
}

function LineGrid() {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    
    // Create grid of lines
    for (let i = -5; i <= 5; i += 2) {
      // Horizontal lines
      positions.push(-10, i, -8, 10, i, -8);
      // Vertical lines
      positions.push(i * 2, -6, -8, i * 2, 6, -8);
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);
  
  useFrame((state) => {
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
    </lineSegments>
  );
}

export function GeometricGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, 5]} intensity={0.3} color="#8b5cf6" />
        
        <GridField />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#0a0a0a", 10, 30]} />
      </Canvas>
    </div>
  );
}
