// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Removed 'output: export' to enable API routes and server-side features
  images: {
    unoptimized: true, // Can be set to false if you want Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      // If you have other remote image sources, add them here too
    ],
  },
};

export default nextConfig;