import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: [],
    formats: ['image/webp'],
  },
};

export default nextConfig;
