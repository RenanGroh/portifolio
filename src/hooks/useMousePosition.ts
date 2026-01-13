"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

/**
 * Hook to track mouse position with normalized coordinates
 * Useful for 3D interactions and parallax effects
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    setPosition({
      x: clientX,
      y: clientY,
      normalizedX: (clientX / innerWidth) * 2 - 1,
      normalizedY: -(clientY / innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}

/**
 * Hook to track mouse position relative to a specific element
 */
export function useElementMousePosition(
  elementRef: React.RefObject<HTMLElement | null>
): MousePosition & { isHovering: boolean } {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isHovering: false,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setState({
        x,
        y,
        normalizedX: (x / rect.width) * 2 - 1,
        normalizedY: -(y / rect.height) * 2 + 1,
        isHovering: true,
      });
    };

    const handleMouseLeave = () => {
      setState((prev) => ({ ...prev, isHovering: false }));
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return state;
}

/**
 * Hook for smooth mouse following with lerp
 */
export function useSmoothMouse(smoothing: number = 0.1): MousePosition {
  const position = useMousePosition();
  const smoothedRef = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const [smoothed, setSmoothed] = useState(smoothedRef.current);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      const current = smoothedRef.current;
      
      current.x += (position.x - current.x) * smoothing;
      current.y += (position.y - current.y) * smoothing;
      current.normalizedX += (position.normalizedX - current.normalizedX) * smoothing;
      current.normalizedY += (position.normalizedY - current.normalizedY) * smoothing;
      
      setSmoothed({ ...current });
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [position, smoothing]);

  return smoothed;
}
