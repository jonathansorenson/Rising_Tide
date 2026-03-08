"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/approach", label: "Approach" },
  { href: "/market", label: "Market" },
  { href: "/track-record", label: "Track Record" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-dark/95 backdrop-blur-md shadow-lg"
          : "bg-slate-dark"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Rising Tide Property Group"
            width={40}
            height={28}
            className="transition-transform group-hover:scale-105"
          />
          <span className="text-white font-bold text-sm md:text-base tracking-tight leading-tight">
            Rising Tide
            <br />
            <span className="font-normal text-white/70 text-xs">
              Property Group
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-warm-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`text-sm font-semibold px-5 py-2.5 rounded transition-all ${
              pathname === "/contact"
                ? "bg-warm-gold text-white"
                : "bg-warm-gold text-white hover:bg-warm-gold/90 hover:shadow-lg"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-dark border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-2 ${
                  pathname === link.href
                    ? "text-warm-gold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-sm font-semibold px-5 py-2.5 rounded bg-warm-gold text-white text-center mt-2"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
