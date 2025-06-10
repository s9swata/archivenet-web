import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pino': 'pino/browser', // force the browser-compatible version
    };
    return config;
  },
};

export default nextConfig;