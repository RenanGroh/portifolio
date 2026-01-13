"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * Letter by letter text reveal animation
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.05,
  as: Component = "span",
}: TextRevealProps) {
  const letters = text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={cn("inline-flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={letter === " " ? "mr-2" : ""}
        >
          <Component className={className}>{letter === " " ? "\u00A0" : letter}</Component>
        </motion.span>
      ))}
    </motion.div>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

/**
 * Word by word reveal animation
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.1,
}: WordRevealProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap gap-x-2", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

/**
 * Glitch text effect on hover
 */
export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      whileHover="glitch"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-accent-primary/50"
        variants={{
          glitch: {
            x: [0, -2, 2, -2, 0],
            transition: { duration: 0.3, repeat: Infinity },
          },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-accent-secondary/50"
        variants={{
          glitch: {
            x: [0, 2, -2, 2, 0],
            transition: { duration: 0.3, repeat: Infinity, delay: 0.05 },
          },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

/**
 * Typewriter text effect
 */
export function Typewriter({
  text,
  className,
  speed = 0.05,
  delay = 0,
  cursor = true,
}: TypewriterProps) {
  const letters = text.split("");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * speed, duration: 0 }}
        >
          {letter}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          className="ml-1 inline-block w-[2px] h-[1em] bg-text-primary"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
}
