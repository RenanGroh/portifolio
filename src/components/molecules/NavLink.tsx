"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  external?: boolean;
}

export function NavLink({
  href,
  children,
  className,
  activeClassName = "text-text-primary",
  onClick,
  external = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  const isHashLink = href.startsWith("#");

  const baseStyles =
    "relative text-text-secondary hover:text-text-primary transition-colors duration-200";

  // For hash links (same-page navigation)
  if (isHashLink) {
    return (
      <a
        href={href}
        className={cn(baseStyles, className)}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // For external links
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, className)}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // For internal Next.js links
  return (
    <Link
      href={href}
      className={cn(baseStyles, isActive && activeClassName, className)}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 right-0 h-px bg-text-primary"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}

/**
 * Animated underline link for hover effects
 */
export interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function AnimatedLink({
  href,
  children,
  className,
  external = false,
}: AnimatedLinkProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const Component = external ? "a" : Link;

  return (
    <Component
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-1 text-text-primary",
        className
      )}
      {...linkProps}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </Component>
  );
}
