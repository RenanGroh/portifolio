"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { socialLinks } from "@/config/site";

export interface SocialLinkProps {
  name: string;
  href: string;
  icon: IconName;
  className?: string;
}

export function SocialLink({ name, href, icon, className }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full",
        "bg-bg-secondary border border-border",
        "text-text-secondary hover:text-text-primary",
        "hover:border-accent hover:scale-110",
        "transition-all duration-200",
        className
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={name}
    >
      <Icon name={icon} size={18} />
    </motion.a>
  );
}

export interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  direction?: "row" | "column";
}

export function SocialLinks({
  className,
  direction = "row",
  showLabels = false,
}: SocialLinksProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        direction === "column" && "flex-col",
        className
      )}
    >
      {socialLinks.map((link) => (
        showLabels ? (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            )}
            whileHover={{ x: 4 }}
          >
            <Icon name={link.icon as IconName} size={18} />
            <span className="text-sm">{link.name}</span>
          </motion.a>
        ) : (
          <SocialLink
            key={link.name}
            name={link.name}
            href={link.href}
            icon={link.icon as IconName}
          />
        )
      ))}
    </div>
  );
}
