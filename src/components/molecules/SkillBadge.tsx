"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type SkillCategory } from "@/config/skills";

const categoryColors: Record<SkillCategory, string> = {
  backend: "border-zinc-400",
  frontend: "border-zinc-500",
  database: "border-zinc-600",
  devops: "border-zinc-500",
  gamedev: "border-zinc-400",
  tools: "border-zinc-600",
};

export interface SkillBadgeProps {
  name: string;
  category?: SkillCategory;
  level?: "expert" | "advanced" | "intermediate";
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function SkillBadge({
  name,
  category = "tools",
  level,
  className,
  animate = false,
  delay = 0,
}: SkillBadgeProps) {
  const badgeContent = (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
        "bg-bg-secondary border",
        "transition-all duration-200",
        "hover:bg-bg-tertiary hover:scale-105",
        categoryColors[category],
        className
      )}
    >
      <span className="text-text-primary">{name}</span>
      {level === "expert" && (
        <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
      )}
      {level === "advanced" && (
        <span className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
      )}
    </span>
  );

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
      >
        {badgeContent}
      </motion.span>
    );
  }

  return badgeContent;
}

/**
 * Grid of skill badges with staggered animation
 */
export interface SkillBadgeGroupProps {
  skills: Array<{
    name: string;
    category?: SkillCategory;
    level?: "expert" | "advanced" | "intermediate";
  }>;
  className?: string;
  animate?: boolean;
}

export function SkillBadgeGroup({
  skills,
  className,
  animate = true,
}: SkillBadgeGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {skills.map((skill, index) => (
        <SkillBadge
          key={skill.name}
          {...skill}
          animate={animate}
          delay={index * 0.05}
        />
      ))}
    </div>
  );
}
