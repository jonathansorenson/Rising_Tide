import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://risingtidepg.com"),
  title: {
    default: "Rising Tide Property Group Partners — Real Assets. Real Partners.",
    template: "%s | Rising Tide Property Group Partners",
  },
  description:
    "Rising Tide Property Group Partners acquires and operates commercial real estate across Florida's Space Coast and select U.S. markets — delivering institutional-quality returns with a hands-on, partner-first approach.",
  keywords: [
    "Rising Tide Property Group Partners",
    "commercial real estate investment",
    "Space Coast CRE",
    "Florida real estate investment",
    "industrial real estate",
    "NNN lease investing",
    "value-add CRE",
    "Brevard County commercial real estate",
    "CRE acquisition firm",
    "commercial property investment Florida",
    "Space Coast industrial property",
    "real estate private equity Florida",
  ],
  openGraph: {
    title: "Rising Tide Property Group Partners",
    description:
      "Commercial real estate investment on Florida's Space Coast. Real Assets. Real Partners.",
    type: "website",
    locale: "en_US",
    siteName: "Rising Tide Property Group Partners",
    url: "https://risingtidepg.com",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Rising Tide Property Group Partners — Commercial Real Estate on Florida's Space Coast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rising Tide Property Group Partners",
    description:
      "Commercial real estate investment on Florida's Space Coast. Real Assets. Real Partners.",
    images: ["https://risingtidepg.com/images/og-card.png"],
  },
  alternates: {
    canonical: "https://risingtidepg.com",
  },
};

// LocalBusiness JSON-LD schema for local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Rising Tide Property Group Partners",
  url: "https://risingtidepg.com",
  email: "nick@risingtidepg.com",
  description:
    "Commercial real estate investment and operations firm focused on Florida's Space Coast.",
  areaServed: [
    { "@type": "City", name: "Melbourne, FL" },
    { "@type": "City", name: "Cocoa, FL" },
    { "@type": "City", name: "Titusville, FL" },
    { "@type": "AdministrativeArea", name: "Brevard County, FL" },
  ],
  founder: {
    "@type": "Person",
    name: "Nicholas White",
    jobTitle: "Founder & Principal",
    image: "https://risingtidepg.com/images/nicholas-white.jpg",
  },
  image: "https://risingtidepg.com/images/nicholas-white.jpg",
  sameAs: [
    "https://www.linkedin.com/company/rising-tide-property-group-partners/",
  ],
};

// Organization JSON-LD schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rising Tide Property Group Partners",
  url: "https://risingtidepg.com",
  description:
    "Rising Tide Property Group Partners acquires and operates commercial real estate across Florida's Space Coast and Treasure Coast — delivering institutional-quality returns with a hands-on, partner-first approach.",
  email: "nick@risingtidepg.com",
  areaServed: [
    {
      "@type": "Place",
      name: "Space Coast, Florida",
    },
    {
      "@type": "Place",
      name: "Treasure Coast, Florida",
    },
    {
      "@type": "Place",
      name: "South Florida",
    },
  ],
  knowsAbout: [
    "Commercial Real Estate",
    "Industrial Real Estate",
    "Multifamily Investment",
    "NNN Lease Properties",
    "Value-Add Real Estate",
  ],
  founder: {
    "@type": "Person",
    name: "Nicholas White",
    jobTitle: "Founder & Principal",
  },
  employee: [
    {
      "@type": "Person",
      name: "Nicholas West",
      jobTitle: "Vice President",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Temple University",
      },
      sameAs: "https://www.linkedin.com/in/nicholasmwest/",
    },
    {
      "@type": "Person",
      name: "Jonathan Sorenson",
      jobTitle: "Director of Operations",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Boise State University",
      },
      sameAs: "https://www.linkedin.com/in/jonathan-sorenson",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/rising-tide-property-group-partners/",
  ],
  owns: {
    "@type": "WebApplication",
    "name": "CRElytic",
    "url": "https://www.crelytic.ai",
    "description": "AI-powered commercial real estate analytics platform — deal underwriting, property dashboards, portfolio fund reporting, and ESG energy tracking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js.hs-scripts.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics 4 — deferred to avoid blocking LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W6YKH5E0E9"
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6YKH5E0E9');
          `}
        </Script>
        {/* HubSpot Tracking Code — deferred to avoid blocking LCP */}
        <Script
          type="text/javascript"
          id="hs-tracking"
          src="//js.hs-scripts.com/245464685.js"
          strategy="lazyOnload"
        />
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
