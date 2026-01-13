/* Global TypeScript type definitions */

/**
 * Generic children prop type
 */
export interface ChildrenProps {
  children: React.ReactNode;
}

/**
 * Generic className prop type
 */
export interface ClassNameProps {
  className?: string;
}

/**
 * Combined common props
 */
export interface BaseComponentProps extends ChildrenProps, ClassNameProps {}

/**
 * Dimension type for responsive values
 */
export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Position type for coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 3D Position type
 */
export interface Position3D extends Position {
  z: number;
}

/**
 * Navigation link type
 */
export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Social link type
 */
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
