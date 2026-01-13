"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  animate?: boolean;
}

export function GlowText({
  children,
  className,
  glowColor = "rgba(255, 255, 255, 0.6)",
  as: Component = "span",
  animate = true,
}: GlowTextProps) {
  if (animate) {
    return (
      <motion.span
        className={cn("relative inline-block", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glow layer */}
        <span
          className="absolute inset-0 blur-lg opacity-50"
          style={{ color: glowColor }}
          aria-hidden="true"
        >
          {children}
        </span>
        {/* Main text */}
        <Component className="relative">{children}</Component>
      </motion.span>
    );
  }

  return (
    <span className={cn("relative inline-block", className)}>
      <span
        className="absolute inset-0 blur-lg opacity-50"
        style={{ color: glowColor }}
        aria-hidden="true"
      >
        {children}
      </span>
      <Component className="relative">{children}</Component>
    </span>
  );
}

/**
 * Gradient text with optional animation
 */
export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  from = "#fafafa",
  via,
  to = "#71717a",
  animate = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: via
      ? `linear-gradient(135deg, ${from}, ${via}, ${to})`
      : `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  if (animate) {
    return (
      <motion.span
        className={cn("inline-block", className)}
        style={gradientStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={cn("inline-block", className)} style={gradientStyle}>
      {children}
    </span>
  );
}
