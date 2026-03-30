import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Browse our investment approach, market insights, track record, or blog.",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { href: "/approach", label: "Our Approach", desc: "How we identify and execute CRE investments" },
  { href: "/market", label: "Market Insights", desc: "Florida Space Coast & Treasure Coast analysis" },
  { href: "/track-record", label: "Track Record", desc: "Our portfolio and investment performance" },
  { href: "/blog", label: "Blog", desc: "CRE insights, guides, and market commentary" },
  { href: "/submit-deal", label: "Submit a Deal", desc: "Have an opportunity? Let us take a look" },
  { href: "/contact", label: "Contact Us", desc: "Get in touch with our team" },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center">
          <p className="text-7xl font-bold text-warm-gold">404</p>
          <h1 className="mt-4 text-3xl font-bold text-text-dark tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-text-dark/60 leading-relaxed max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Here are some helpful links to get you back on track.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block p-4 rounded-lg border border-text-dark/10 hover:border-warm-gold/40 hover:bg-warm-gold/5 transition-all"
            >
              <p className="font-semibold text-text-dark group-hover:text-warm-gold transition-colors">
                {link.label}
              </p>
              <p className="mt-1 text-sm text-text-dark/50">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
