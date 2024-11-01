import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["img.clerk.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
