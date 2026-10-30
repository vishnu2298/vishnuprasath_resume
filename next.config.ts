import type { NextConfig } from "next";

/**
 * Static export so the site can be hosted on GitHub Pages (or any static host).
 * NEXT_PUBLIC_BASE_PATH is set by the Pages workflow to "/<repo-name>"; leave it empty for a root domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake icon + animation + 3D helper packages so only what's used ships.
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
};

export default nextConfig;
