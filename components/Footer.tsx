import Link from "next/link";
import Image from "next/image";
import FooterNewsletter from "@/components/FooterNewsletter";

const footerLinks = [
  { href: "/approach", label: "Approach" },
  { href: "/market", label: "Market" },
  { href: "/track-record", label: "Track Record" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/submit-deal", label: "Submit a Deal" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-dark text-white">
      {/* Newsletter Signup */}
      <FooterNewsletter />

      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            Ready to discuss a partnership?
          </h3>
          <Link
            href="/contact"
            className="px-8 py-3 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Rising Tide Property Group Partners"
                width={36}
                height={24}
              />
              <span className="font-bold text-sm tracking-tight leading-tight">
                Rising Tide
                <br />
                <span className="font-normal text-white/70 text-xs">
                  Property Group Partners
                </span>
              </span>
            </Link>
            <p className="text-white/50 text-sm italic">
              Real Assets. Real Partners.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.linkedin.com/company/rising-tide-property-group-partners/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:nick@risingtidepg.com"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                nick@risingtidepg.com
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Rising Tide Property Group Partners. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.crelytic.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors text-xs"
            >
              AI-Powered CRE Analytics by CRElytic
            </a>
            <span className="text-white/20 text-xs">&middot;</span>
            <span className="text-white/20 text-xs">
              Hero photo by Dillon Shook on Unsplash
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
