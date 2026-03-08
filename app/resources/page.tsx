import { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free market reports, deal criteria, and broker partnership resources for CRE professionals on Florida's Space Coast.",
};

const resources = [
  {
    title: "Space Coast Market Report",
    description:
      "Quarterly industrial and office market snapshot covering vacancy trends, absorption data, and the aerospace expansion driving Brevard County's commercial real estate growth.",
    href: "/resources/market-report",
    cta: "Download Report",
    tag: "Market Intelligence",
  },
  {
    title: "Deal Flow Criteria",
    description:
      "What Rising Tide is actively buying — target asset classes, price ranges, lease structures, preferred geographies, and how to submit a deal.",
    href: "/resources/deal-criteria",
    cta: "Get Criteria Sheet",
    tag: "For Brokers",
  },
  {
    title: "Broker Partnership Program",
    description:
      "Co-investment and partnership opportunities for commercial brokers. Partnership tiers, economics, and how the program works.",
    href: "/resources/broker-program",
    cta: "Learn More",
    tag: "Partnership",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Hero
        title="Resources"
        subtitle="Market intelligence and partnership resources for CRE professionals."
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {resources.map((resource, i) => (
              <FadeIn key={resource.title} delay={i * 0.1}>
                <div className="bg-white rounded-lg p-6 md:p-8 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xs uppercase tracking-wider text-warm-gold font-semibold">
                    {resource.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-text-dark">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/70 leading-relaxed flex-1">
                    {resource.description}
                  </p>
                  <Link
                    href={resource.href}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-warm-gold hover:text-warm-gold/80 transition-colors"
                  >
                    {resource.cta}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
