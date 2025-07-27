// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // CRITICAL for static site generation
  images: {
    unoptimized: true, // Recommended for static export if using Next.js Image component
    // CORRECT PLACEMENT: remotePatterns is a property of the images object
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