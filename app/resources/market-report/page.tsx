import { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import GatedForm from "@/components/GatedForm";

export const metadata: Metadata = {
  title: "Space Coast CRE Market Report",
  description:
    "Download the quarterly Space Coast industrial and office market snapshot — vacancy trends, absorption data, and aerospace expansion analysis.",
};

const formFields = [
  { name: "name", label: "Full Name", type: "text" as const, required: true },
  { name: "email", label: "Work Email", type: "email" as const, required: true },
  { name: "company", label: "Company", type: "text" as const, required: true },
  {
    name: "role",
    label: "I am a...",
    type: "select" as const,
    required: true,
    options: [
      { value: "broker", label: "Broker / Agent" },
      { value: "investor", label: "Investor" },
      { value: "service_provider", label: "Service Provider" },
      { value: "tenant", label: "Tenant Representative" },
      { value: "other", label: "Other" },
    ],
  },
];

export default function MarketReportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-dark text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-10"
          style={{
            background: "linear-gradient(135deg, #A8C5B8 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <FadeIn>
            <span className="text-xs uppercase tracking-wider text-sage font-semibold">
              Free Resource
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
              Space Coast CRE Market Report
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
              Quarterly industrial and office market data for Brevard County —
              vacancy trends, absorption, lease rates, and the aerospace
              expansion shaping Florida&apos;s fastest-growing commercial market.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Value proposition */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl font-bold text-text-dark">
                  What&apos;s Inside
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: "Industrial Vacancy & Absorption",
                      desc: "Submarket-level vacancy rates and net absorption trends across Brevard County's industrial corridors.",
                    },
                    {
                      title: "Lease Rate Analysis",
                      desc: "Asking and effective lease rates for industrial, office, and flex space — with year-over-year comparisons.",
                    },
                    {
                      title: "Aerospace & Defense Expansion",
                      desc: "Tracking the economic footprint of SpaceX, Blue Origin, L3Harris, and the broader defense supply chain.",
                    },
                    {
                      title: "Development Pipeline",
                      desc: "New construction, spec builds, and proposed projects shaping future supply.",
                    },
                    {
                      title: "Investment Outlook",
                      desc: "Cap rate trends, transaction velocity, and Rising Tide's forward-looking thesis on Space Coast CRE.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white rounded-lg p-5 shadow-sm"
                    >
                      <h3 className="font-semibold text-text-dark">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-dark/70">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Gated form */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.15}>
                <div className="sticky top-24">
                  <h3 className="text-lg font-bold text-text-dark mb-4">
                    Download the Report
                  </h3>
                  <GatedForm
                    fields={formFields}
                    leadSource="gated_market_report"
                    ctaText="Download Report"
                    successMessage="Your market report is ready. Click below to download."
                    pdfUrl="/resources/space-coast-market-report-q1-2026.pdf"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
