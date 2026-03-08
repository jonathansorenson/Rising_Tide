import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-warm-gold">404</p>
        <h1 className="mt-4 text-2xl font-bold text-text-dark tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-text-dark/60 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-text-dark/20 text-text-dark font-semibold rounded hover:border-text-dark/40 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
