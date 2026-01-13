"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollState {
  y: number;
  progress: number; // 0 to 1 (percentage of page scrolled)
  direction: "up" | "down" | null;
  velocity: number;
}

/**
 * Hook to track scroll position and progress
 */
export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    progress: 0,
    direction: null,
    velocity: 0,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = Date.now();
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentY / maxScroll : 0;
      
      const direction = currentY > lastY ? "down" : currentY < lastY ? "up" : state.direction;
      const velocity = deltaTime > 0 ? Math.abs(currentY - lastY) / deltaTime : 0;

      setState({
        y: currentY,
        progress: Math.min(Math.max(progress, 0), 1),
        direction,
        velocity,
      });

      lastY = currentY;
      lastTime = currentTime;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.direction]);

  return state;
}

/**
 * Hook to track scroll progress within a specific element/section
 */
export function useSectionProgress(
  elementRef: React.RefObject<HTMLElement | null>,
  offset: { start?: number; end?: number } = {}
): number {
  const [progress, setProgress] = useState(0);
  const { start = 0, end = 0 } = offset;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let ticking = false;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element enters viewport when its top is at window bottom
      // Element leaves viewport when its bottom is at window top
      const startPoint = windowHeight - start;
      const endPoint = -rect.height + end;
      
      const totalDistance = startPoint - endPoint;
      const currentDistance = startPoint - rect.top;
      
      const calculatedProgress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
      setProgress(calculatedProgress);
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef, start, end]);

  return progress;
}

/**
 * Hook to detect if user has scrolled past a threshold
 */
export function useScrolled(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
