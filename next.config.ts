import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    viewTransition: true,
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;
