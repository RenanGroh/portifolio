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

  // Webpack configuration for Three.js and GLSL shaders
  webpack: (config) => {
    // Handle GLSL shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source",
    });

    return config;
  },
};

export default nextConfig;
