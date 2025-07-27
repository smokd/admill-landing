// app/layout.js
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Admill Systems | Electronic  Engineering',
  description: 'Admill Systems provides world-class CCTV, smart access, alarm, and IT security solutions that blend design and technology for a safer, smarter future.',
  keywords: "Security Systems, CCTV, Access Control, Alarm Systems, IT Infrastructure, Global Surveillance",
  authors: [{ name: "Admill Systems" }],
  robots: "index, follow", // This is correctly set to allow indexing
  openGraph: {
    title: "Admill Systems | Secure by Design",
    description: "We deliver premium, design-led electronic security and IT services for forward-thinking businesses and institutions.",
    // IMPORTANT: Use the full, absolute URL for social media crawlers
    images: "https://www.admill.co.zw/hero-security.jpg", // <--- CORRECTED HERE
    type: "website",
    url: "https://www.admill.co.zw", // <--- Ensure this matches your actual domain
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white font-sans tracking-wide`}>
        {children}
      </body>
    </html>
  );
}