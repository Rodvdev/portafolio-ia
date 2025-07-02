import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // During builds, don't fail on TypeScript errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // During builds, don't fail on linting errors  
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Ensure trailing slashes are handled consistently
  trailingSlash: false,
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp'],
  },
};

export default nextConfig;
