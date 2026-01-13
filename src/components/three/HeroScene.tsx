"use client";

import { Scene } from "./Scene";
import { ParticleField, FloatingGeometry } from "./ParticleField";
import { PostProcessing, SceneLighting } from "./Effects";
import { useIsMobile, useReducedMotion } from "@/hooks";

export interface HeroSceneProps {
  className?: string;
}

/**
 * Complete Hero Section 3D Scene
 * Combines particles, geometry, and post-processing
 */
export function HeroScene({ className }: HeroSceneProps) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  // Reduce particle count on mobile for performance
  const particleCount = isMobile ? 1000 : 3000;
  const particleSize = isMobile ? 0.02 : 0.015;

  // Disable heavy effects if user prefers reduced motion
  if (reducedMotion) {
    return (
      <div className={className}>
        {/* Static fallback for reduced motion preference */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/20 to-bg-primary" />
      </div>
    );
  }

  return (
    <Scene className={className}>
      {/* Lighting */}
      <SceneLighting />

      {/* Main particle system */}
      <ParticleField
        count={particleCount}
        size={particleSize}
        color="#e4e4e7"
        spread={8}
        speed={0.15}
        mouseInfluence={0.3}
        opacity={0.6}
      />

      {/* Secondary particle layer (subtle depth) */}
      <ParticleField
        count={Math.floor(particleCount / 3)}
        size={particleSize * 0.6}
        color="#71717a"
        spread={12}
        speed={0.08}
        mouseInfluence={0.1}
        opacity={0.3}
      />

      {/* Floating wireframe shapes */}
      <FloatingGeometry />

      {/* Post-processing effects */}
      <PostProcessing
        bloomIntensity={isMobile ? 0.8 : 1.2}
        bloomThreshold={0.3}
        bloomRadius={0.6}
        vignetteIntensity={0.5}
        chromaticAberration={!isMobile}
      />
    </Scene>
  );
}
