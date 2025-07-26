import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // CRITICAL for static site generation
  images: {
    unoptimized: true, // Recommended for static export if using Next.js Image component
}};

export default nextConfig;
