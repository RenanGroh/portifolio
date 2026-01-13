"use client";

import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Code2,
  Database,
  Server,
  Gamepad2,
  Terminal,
  Layers,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for dynamic usage
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  "external-link": ExternalLink,
  menu: Menu,
  x: X,
  "chevron-down": ChevronDown,
  "arrow-right": ArrowRight,
  code: Code2,
  database: Database,
  server: Server,
  gamepad: Gamepad2,
  terminal: Terminal,
  layers: Layers,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 2,
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
    />
  );
}

// Re-export individual icons for direct usage
export {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Code2,
  Database,
  Server,
  Gamepad2,
  Terminal,
  Layers,
  type LucideIcon,
};
