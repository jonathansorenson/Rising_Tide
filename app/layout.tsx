import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Rising Tide Property Group — Real Assets. Real Partners.",
    template: "%s | Rising Tide Property Group",
  },
  description:
    "Rising Tide Property Group acquires and operates commercial real estate across Florida's Space Coast and select U.S. markets — delivering institutional-quality returns with a hands-on, partner-first approach.",
  openGraph: {
    title: "Rising Tide Property Group",
    description:
      "Commercial real estate investment on Florida's Space Coast. Real Assets. Real Partners.",
    type: "website",
    locale: "en_US",
    siteName: "Rising Tide Property Group",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
