"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load 3D components to improve initial page load
const FloatingSkillsOrbs = dynamic(
  () => import("./FloatingSkillsOrbs").then((mod) => mod.FloatingSkillsOrbs),
  { ssr: false }
);

const GeometricGrid = dynamic(
  () => import("./GeometricGrid").then((mod) => mod.GeometricGrid),
  { ssr: false }
);

const AuroraBackground = dynamic(
  () => import("./AuroraBackground").then((mod) => mod.AuroraBackground),
  { ssr: false }
);

export function AboutScene() {
  return (
    <Suspense fallback={null}>
      <FloatingSkillsOrbs />
    </Suspense>
  );
}

export function ProjectsScene() {
  return (
    <Suspense fallback={null}>
      <GeometricGrid />
    </Suspense>
  );
}

export function ContactScene() {
  return (
    <Suspense fallback={null}>
      <AuroraBackground />
    </Suspense>
  );
}
