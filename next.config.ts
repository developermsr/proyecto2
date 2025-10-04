import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure to allow external hosts
  async rewrites() {
    return [];
  },
  };

export default nextConfig;
