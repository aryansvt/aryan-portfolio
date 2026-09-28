import type { NextConfig } from "next";

// static export, vercel serves out/
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
