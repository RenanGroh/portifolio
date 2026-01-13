import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-5xl md:text-7xl font-bold tracking-tight",
      h2: "text-3xl md:text-4xl font-bold tracking-tight",
      h3: "text-2xl md:text-3xl font-semibold",
      h4: "text-xl md:text-2xl font-semibold",
      body: "text-base leading-relaxed",
      lead: "text-lg md:text-xl leading-relaxed text-text-secondary",
      small: "text-sm leading-normal",
      muted: "text-sm text-text-muted",
      code: "font-mono text-sm bg-bg-secondary px-1.5 py-0.5 rounded",
    },
    color: {
      default: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      accent: "text-accent",
      gradient: "text-gradient",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
  },
});

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "code";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
}

const elementMap: Record<NonNullable<TypographyProps["variant"]>, TypographyElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  lead: "p",
  small: "p",
  muted: "span",
  code: "code",
};

export function Typography({
  variant,
  color,
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as || elementMap[variant || "body"];

  return (
    <Component
      className={cn(typographyVariants({ variant, color, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
