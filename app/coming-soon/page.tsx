import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming Soon — Rising Tide Property Group Partners",
  description: "Rising Tide Property Group Partners — coming soon.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://risingtidepg.com",
  },
};

export default function ComingSoonPage() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-dark px-6 text-center text-white">
      <Image
        src="/logo.svg"
        alt="Rising Tide Property Group Partners"
        width={240}
        height={80}
        priority
        className="mb-10 h-auto w-48 md:w-60"
      />
      <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
        Coming Soon
      </h1>
      <p className="max-w-xl text-base text-white/70 md:text-lg">
        Rising Tide Property Group Partners — Real Assets. Real Partners.
      </p>
    </div>
  );
}
