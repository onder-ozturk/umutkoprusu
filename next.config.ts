import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'export' to support API routes on Vercel
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
