import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ["**/data/**", "**/.git/**", "**/node_modules/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
