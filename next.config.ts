import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js for proper SSR compatibility
  transpilePackages: ["three"],

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Turbopack configuration (Next.js 16+ default bundler)
  turbopack: {
    rules: {
      // Handle GLSL shader files
      "*.glsl": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.vert": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.frag": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
