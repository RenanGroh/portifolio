"use client";

import { Suspense, useRef } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { cn } from "@/lib/utils";

export interface SceneProps extends Omit<CanvasProps, "children"> {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Main 3D Scene wrapper component
 * Handles Canvas setup, Suspense, and common configurations
 */
export function Scene({
  children,
  className,
  fallback,
  ...canvasProps
}: SceneProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas
        dpr={[1, 2]} // Device pixel ratio for retina displays
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        {...canvasProps}
      >
        <Suspense fallback={fallback || null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Loading fallback for 3D scenes
 */
export function SceneLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "bg-bg-primary/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-text-muted border-t-text-primary rounded-full animate-spin" />
        <span className="text-sm text-text-muted">Loading 3D scene...</span>
      </div>
    </div>
  );
}
