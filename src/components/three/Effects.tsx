"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export interface PostProcessingProps {
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomRadius?: number;
  vignetteIntensity?: number;
  chromaticAberration?: boolean;
}

/**
 * Post-processing effects without chromatic aberration
 */
function PostProcessingBasic({
  bloomIntensity,
  bloomThreshold,
  bloomRadius,
  vignetteIntensity,
}: Omit<PostProcessingProps, "chromaticAberration">) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={bloomRadius}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={vignetteIntensity}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

/**
 * Post-processing effects with chromatic aberration
 */
function PostProcessingFull({
  bloomIntensity,
  bloomThreshold,
  bloomRadius,
  vignetteIntensity,
}: Omit<PostProcessingProps, "chromaticAberration">) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={bloomRadius}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={vignetteIntensity}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.002, 0.002)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0.5}
      />
    </EffectComposer>
  );
}

/**
 * Post-processing effects for the 3D scene
 * Adds bloom, vignette, and optional chromatic aberration
 */
export function PostProcessing({
  bloomIntensity = 1.5,
  bloomThreshold = 0.2,
  bloomRadius = 0.8,
  vignetteIntensity = 0.4,
  chromaticAberration = false,
}: PostProcessingProps) {
  if (chromaticAberration) {
    return (
      <PostProcessingFull
        bloomIntensity={bloomIntensity}
        bloomThreshold={bloomThreshold}
        bloomRadius={bloomRadius}
        vignetteIntensity={vignetteIntensity}
      />
    );
  }

  return (
    <PostProcessingBasic
      bloomIntensity={bloomIntensity}
      bloomThreshold={bloomThreshold}
      bloomRadius={bloomRadius}
      vignetteIntensity={vignetteIntensity}
    />
  );
}

/**
 * Ambient lighting setup for the scene
 */
export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a0a0a0" />
    </>
  );
}

/**
 * Animated background gradient mesh
 */
export function GradientBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Subtle movement
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -15]} scale={[40, 40, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial color="#09090b" transparent opacity={0.5} />
    </mesh>
  );
}
