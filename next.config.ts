import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
      "https://www.surforma.com/",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
