"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

/**
 * Fade in animation on scroll
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
}: FadeInProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = opposite direction
  offset?: [string, string]; // start and end offset
}

/**
 * Parallax scrolling effect
 */
export function Parallax({
  children,
  className,
  speed = 0.5,
  offset = ["start end", "end start"],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  width?: "fit-content" | "100%";
}

/**
 * Text reveal animation with sliding mask
 */
export function Reveal({ children, className, width = "fit-content" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  });

  const slideProgress = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ width }}>
      <motion.div
        style={{ opacity: scrollYProgress }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-bg-primary"
        style={{ left: slideProgress }}
      />
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Container for staggered children animations
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item to use inside StaggerContainer
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Scale element based on scroll position
 */
export function ScaleOnScroll({ children, className }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity }}>{children}</motion.div>
    </div>
  );
}
