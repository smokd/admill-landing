// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.admill.co.zw";
const siteName = "Admill Systems";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Admill Systems | Electrical, Automation & Building Systems Engineering",
    template: "%s | Admill Systems",
  },
  description:
    "Admill Systems engineers, integrates and commissions electrical, energy, building automation, BMS, industrial control and electronic security systems for commercial, industrial and institutional facilities in Zimbabwe.",
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Admill Systems | Electrical, Automation & Building Systems Engineering",
    description:
      "Electrical engineering, energy systems, BMS, building automation, industrial control and electronic security integration in Zimbabwe.",
    images: [{ url: "/hero-security.jpg", width: 1200, height: 630, alt: "Admill Systems engineering and systems integration" }],
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admill Systems | Engineering & Systems Integration",
    description:
      "Electrical, automation, BMS, energy and electronic security systems engineering in Zimbabwe.",
    images: ["/hero-security.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
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
    <html lang="en-ZW">
      <Script id="schema-organization" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          logo: `${siteUrl}/logo-02.png`,
          description:
            "Electrical, electronic and building systems engineering and integration for commercial, industrial and institutional facilities.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hogerty Hill",
            addressLocality: "Harare",
            addressCountry: "ZW",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+263-715-017-744",
            contactType: "customer service",
            email: "info@admill.co.zw",
            availableLanguage: ["English"],
          },
          sameAs: [
            "https://www.linkedin.com/company/admill-systems",
            "https://www.facebook.com/admillsystems",
          ],
        })}
      </Script>

      <Script id="schema-local-business" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "ProfessionalService"],
          name: siteName,
          image: `${siteUrl}/hero-security.jpg`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hogerty Hill",
            addressLocality: "Harare",
            addressCountry: "ZW",
          },
          url: siteUrl,
          telephone: "+263-715-017-744",
          email: "info@admill.co.zw",
          areaServed: { "@type": "Country", name: "Zimbabwe" },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        })}
      </Script>

      <Script id="schema-services" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Electrical, Automation and Building Systems Engineering",
          provider: { "@type": "Organization", name: siteName, url: siteUrl },
          areaServed: { "@type": "Country", name: "Zimbabwe" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Engineering and Systems Integration Services",
            itemListElement: [
              "Electrical Engineering",
              "Power and Energy Systems",
              "Building Automation and BMS",
              "Industrial Automation and Control",
              "Electronic Security",
              "Fire and Life Safety",
              "Systems Integration",
            ].map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name },
            })),
          },
        })}
      </Script>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZMM69FEM9Z" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZMM69FEM9Z');
        `}
      </Script>

      <Script id="matomo-tag-manager" strategy="afterInteractive">
        {`
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true;
            g.src='https://admill.co.zw/matomo/js/container_Fg7DkXUJ.js';
            s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>

      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-neutral-900 font-sans`}>
        {children}
      </body>
    </html>
  );
}
