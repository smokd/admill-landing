// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Import the Script component
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
  title: 'Admill Systems | Electronic Engineering',
  description: 'Admill Systems provides world-class CCTV, smart access control, alarm and intrusion,IT security solutions that blend design and technology for a safer, smarter future.',
  keywords: "Security Systems, CCTV, Access Control, Alarm Systems,ESP32, Automation, biometric, facial recognition, python, IT Infrastructure, Global Surveillance, Networking, Wireless, Mikrotik, Ubiquiti",
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
      {/* Google Analytics & Google Ads gtag.js scripts using next/script */}
      {/* Replace G-XXXXXXXXXX with your actual GA4 Measurement ID */}
      {/* Replace AW-YYYYYYYYY with your Google Ads Conversion ID */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZMM69FEM9Z`} // Use your actual GA4 ID here
        strategy="afterInteractive"
      />
      {/* Corrected: Place the script content directly as a child of Script */}
      <Script
        id="gtag-init" // Add an ID for better debugging/identification
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZMM69FEM9Z'); // Use your actual GA4 ID here
          // Only add the Google Ads config if you are using Google Ads tracking
          gtag('config', 'AW-YYYYYYYYY'); // Use your actual Google Ads ID here
        `}
      </Script>

      {/* Matomo Analytics */}
<Script id="matomo-tracking" strategy="afterInteractive">
  {`
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://admill.co.zw/analytics/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', 'Fg7DkXUJ']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  `}
</Script>


      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white font-sans tracking-wide`}>
        {children}
      </body>
    </html>
  );
}