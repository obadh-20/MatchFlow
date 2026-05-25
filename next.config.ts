import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Optimize images from external domains (RapidAPI, TheSportsDB, picsum.photos)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Tree-shake heavy packages to reduce bundle size
  experimental: {
    optimizePackageImports: [
      "recharts",
      "lucide-react",
      "@tanstack/react-table",
    ],
  },
};

// Bundle analyzer — only runs when ANALYZE=true
let config = nextConfig;
if (process.env.ANALYZE === "true") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

export default config;