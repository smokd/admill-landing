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
  title: "Admill Systems | Holistic Electronic Engineering Solutions",
  description:
    "Zimbabwe's leading provider of integrated security, BMS, and systems engineering. CCTV, access control, building automation, and complete IT infrastructure solutions.",
  keywords:
    "Security Systems, CCTV, Access Control, Building Management Systems, BMS, Systems Integration, Electronic Engineering, Alarm Systems, Automation, Biometric, IT Infrastructure, HVAC Control, Surveillance, Networking, Wireless, Mikrotik, Ubiquiti, Hikvision, Honeywell",
  authors: [{ name: "Admill Systems" }],
  robots: "index, follow", // This is correctly set to allow indexing
  openGraph: {
    title: "Admill Systems | Holistic Electronic Engineering",
    description:
      "Complete electronic engineering solutions: Security, BMS, and systems integration for intelligent buildings and enterprises.",
    // IMPORTANT: Use the full, absolute URL for social media crawlers
    images: "https://www.admill.co.zw/hero-security.jpg", // <--- CORRECTED HERE
    type: "website",
    url: "https://www.admill.co.zw", // <--- Ensure this matches your actual domain
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Structured Data - Organization Schema */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Admill Systems",
            "url": "https://www.admill.co.zw",
            "logo": "https://www.admill.co.zw/logo-02.png",
            "description": "Holistic electronic engineering solutions: Security systems, BMS, and systems integration for intelligent buildings",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Hogerty Hill",
              "addressLocality": "Harare",
              "addressCountry": "ZW"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+263-715-017-744",
              "contactType": "Customer Service",
              "email": "info@admill.co.zw",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/admill-systems",
              "https://www.facebook.com/admillsystems"
            ]
          }
        `}
      </Script>

      {/* Structured Data - LocalBusiness Schema */}
      <Script
        id="schema-local-business"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Admill Systems",
            "image": "https://www.admill.co.zw/hero-security.jpg",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Hogerty Hill",
              "addressLocality": "Harare",
              "addressCountry": "ZW"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -17.8252,
              "longitude": 31.0335
            },
            "url": "https://www.admill.co.zw",
            "telephone": "+263-715-017-744",
            "email": "info@admill.co.zw",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          }
        `}
      </Script>

      {/* Structured Data - Service Schema */}
      <Script
        id="schema-services"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Security Systems Installation",
            "provider": {
              "@type": "Organization",
              "name": "Admill Systems"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Zimbabwe"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Security and IT Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "CCTV Surveillance Systems"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Access Control Systems"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Building Management Systems (BMS)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Systems Integration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Alarm & Intrusion Detection"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Network Infrastructure"
                  }
                }
              ]
            }
          }
        `}
      </Script>

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

      {/* Matomo Tag Manager */}
      <Script>
        {`
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://admill.co.zw/matomo/js/container_Fg7DkXUJ.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>

      {/* Tawk.to Live Chat Widget */}
      <Script id="tawk-to-widget" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/YOUR_TAWK_PROPERTY_ID/YOUR_WIDGET_ID';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>

      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white font-sans tracking-wide`}
      >
        {children}
      </body>
    </html>
  );
}
