import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import StatCard from "@/components/StatCard";
import SectionDivider from "@/components/SectionDivider";

const stats = [
  { value: "$90M+", label: "in Transactions Advised" },
  { value: "15+", label: "Years of CRE Experience" },
  { value: "100%", label: "Occupancy — Current Portfolio" },
  { value: "8%+", label: "Going-In Cap Rates" },
];

const assetClasses = [
  {
    title: "Industrial / Small-Bay Warehouse",
    description:
      "High-demand, low-vacancy asset class with NNN lease structures providing operating expense protection.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Office & Medical Office",
    description:
      "Value-add strategies converting gross leases to NNN and driving operational efficiency.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    title: "Multifamily",
    description:
      "Targeting workforce housing in high-growth Florida markets with strong demographic tailwinds.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

const employers = [
  "SpaceX",
  "Blue Origin",
  "L3Harris",
  "Lockheed Martin",
  "Northrop Grumman",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-dark text-white overflow-hidden">
        {/* Diagonal geometric accent */}
        <div
          className="absolute top-0 right-0 w-2/5 h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,197,184,0.15) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1/3 h-1/2"
          style={{
            background:
              "linear-gradient(315deg, rgba(212,165,116,0.08) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36 lg:py-44 relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance max-w-3xl">
              Real Assets.
              <br />
              Real Partners.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
              Rising Tide Property Group acquires and operates commercial real
              estate across Florida&apos;s Space Coast and select U.S. markets
              &mdash; delivering institutional-quality returns with a hands-on,
              partner-first approach.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/approach"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg"
              >
                View Our Approach
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded hover:border-white/60 transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark text-center tracking-tight">
              By the Numbers
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investment Focus */}
      <SectionDivider fromColor="bg-cream" toColor="bg-white" />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Investment Focus
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {assetClasses.map((asset, i) => (
              <FadeIn key={asset.title} delay={i * 0.12}>
                <div className="bg-cream rounded-lg p-6 md:p-8 h-full">
                  <div className="text-slate-dark">{asset.icon}</div>
                  <h3 className="mt-4 text-lg font-bold text-text-dark">
                    {asset.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/70 leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why the Space Coast */}
      <SectionDivider fromColor="bg-white" toColor="bg-sage/20" flip />
      <section className="bg-sage/20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                Why the Space Coast
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 text-text-dark/70 leading-relaxed">
                Brevard County is one of the fastest-growing metros in the
                United States, fueled by unprecedented investment in aerospace,
                defense, and high-tech manufacturing. Strong population growth,
                low vacancy, and a pro-business environment create compelling
                tailwinds for commercial real estate.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/market"
                className="inline-flex items-center mt-6 text-sm font-semibold text-warm-gold hover:text-warm-gold/80 transition-colors"
              >
                Learn More
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
            </FadeIn>
          </div>

          {/* Employer logos as text */}
          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-wrap gap-6 items-center">
              <span className="text-xs text-text-dark/40 uppercase tracking-wider">
                Key Employers:
              </span>
              {employers.map((name) => (
                <span
                  key={name}
                  className="text-sm font-semibold text-text-dark/40"
                >
                  {name}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Technology — CRElytic Cross-Link */}
      <SectionDivider fromColor="bg-sage/20" toColor="bg-white" />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="text-xs uppercase tracking-wider text-warm-gold font-semibold">
                Our Technology
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                Powered by CRElytic
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 text-text-dark/70 leading-relaxed">
                Our proprietary AI-powered analytics platform drives smarter
                underwriting, real-time portfolio monitoring, and data-driven
                decision making across every asset we touch.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a
                href="https://www.crelytic.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 text-sm font-semibold text-warm-gold hover:text-warm-gold/80 transition-colors"
              >
                Learn About CRElytic
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Market Report CTA */}
      <SectionDivider fromColor="bg-white" toColor="bg-white" />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-dark rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <FadeIn>
                <span className="text-xs uppercase tracking-wider text-sage font-semibold">
                  Free Resource
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Space Coast CRE Market Report
                </h3>
                <p className="mt-3 text-white/70 leading-relaxed">
                  Industrial vacancy trends, absorption data, and the aerospace
                  expansion driving Florida&apos;s fastest-growing commercial
                  market. Updated quarterly.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <Link
                href="/resources/market-report"
                className="inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg whitespace-nowrap"
              >
                Download Report
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
