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
  title: 'Admill Systems | Global Electronic Security Solutions',
  description: 'Admill Systems provides world-class CCTV, smart access, alarm, and IT security solutions that blend design and technology for a safer, smarter future.',
  keywords: "Security Systems, CCTV, Access Control, Alarm Systems, IT Infrastructure, Global Surveillance",
  authors: [{ name: "Admill Systems" }],
  robots: "index, follow",
  openGraph: {
    title: "Admill Systems | Secure by Design",
    description: "We deliver premium, design-led electronic security and IT services for forward-thinking businesses and institutions.",
    images: "/hero-security.jpg",
    type: "website",
    url: "https://www.admill.co.zw",
}};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The Head component from pages router is replaced by 'metadata' export here */}
      <body className="bg-black text-white font-sans tracking-wide">
        {children} {/* This is where your app/page.js content will be rendered */}
      </body>
    </html>
  );
}
