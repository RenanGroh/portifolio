import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  className,
  orientation = "horizontal",
}: DividerProps) {
  return (
    <div
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
}

interface SpacerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const spacerSizes = {
  sm: "h-4",
  md: "h-8",
  lg: "h-16",
  xl: "h-24",
};

export function Spacer({ size = "md", className }: SpacerProps) {
  return <div className={cn(spacerSizes[size], className)} aria-hidden="true" />;
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const containerSizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  size = "lg",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto px-6", containerSizes[size], className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-24 md:py-32", className)}
    >
      {children}
    </section>
  );
}
