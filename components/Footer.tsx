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
                alt="Rising Tide Property Group"
                width={36}
                height={24}
              />
              <span className="font-bold text-sm tracking-tight leading-tight">
                Rising Tide
                <br />
                <span className="font-normal text-white/70 text-xs">
                  Property Group
                </span>
              </span>
            </Link>
            <p className="text-white/50 text-sm italic">
              Real Assets. Real Partners.
            </p>
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

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Rising Tide Property Group. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
