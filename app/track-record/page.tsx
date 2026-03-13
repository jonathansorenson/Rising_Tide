import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Track Record — $300M+ in CRE Transactions",
  description:
    "Over $300M in transaction value across 2.5M+ SF and five asset classes. View Rising Tide Property Group's commercial real estate track record.",
  keywords: [
    "commercial real estate track record",
    "CRE transaction history",
    "industrial real estate portfolio",
    "value-add real estate deals",
    "Florida commercial property",
    "real estate investment returns",
  ],
};

const aggregateStats = [
  { value: "$300M+", label: "Transaction Value" },
  { value: "2.5M+ SF", label: "Managed & Overseen" },
  {
    value: "5 Asset Classes",
    label: "Retail | Industrial | Flex R&D | Office & Medical | Multifamily",
  },
];

const deals = [
  {
    type: "STNL Industrial",
    location: "Detroit, MI",
    size: "150,000 SF",
    value: "$19M",
    notable: "",
    role: "Underwriting, Acquisition, Financing, Asset Management",
  },
  {
    type: "Office",
    location: "Palm Beach Gardens, FL",
    size: "67,000 SF",
    value: "$30M",
    notable: "",
    role: "Sourcing, Acquisition, Asset Management, Lease Negotiation",
  },
  {
    type: "Retail Neighborhood Center",
    location: "Merritt Island, FL",
    size: "90,000 SF",
    value: "$9M",
    notable: "",
    role: "Underwriting, Acquisition, Value-Add Implementation, Asset Management, Financing",
  },
  {
    type: "Value-Add Office",
    location: "Melbourne, FL",
    size: "155,000 SF",
    value: "$32M",
    notable: "",
    role: "Underwriting, Acquisition, Value-Add, Leasing, Capital Markets",
  },
  {
    type: "Retail Neighborhood Center",
    location: "Merritt Island, FL",
    size: "110,000 SF",
    value: "$16M",
    notable: "",
    role: "Underwriting, Acquisition, Value-Add Implementation, Lease Negotiation",
  },
  {
    type: "Office",
    location: "New Hampshire",
    size: "7,000 SF",
    value: "$1M",
    notable: "18% IRR / 3-yr exit",
    role: "Sourcing, Underwriting, Acquisition, Lease Negotiation, Asset Management",
  },
  {
    type: "Office — Refinance",
    location: "Palm Beach Gardens, FL",
    size: "—",
    value: "$43M",
    notable: "",
    role: "Refinancing Management",
  },
];

export default function TrackRecordPage() {
  return (
    <>
      <Hero
        title="Track Record"
        subtitle="Demonstrated experience across asset classes, deal sizes, and markets."
      />

      {/* Aggregate Stats */}
      <section className="bg-warm-gold/10 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
            {aggregateStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-slate-dark">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-text-dark/60">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Table */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Select Transactions
            </h2>
          </FadeIn>

          {/* Desktop Table */}
          <FadeIn delay={0.1}>
            <div className="mt-10 md:mt-14 hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-sage/30 text-left">
                    <th className="pb-3 font-semibold text-text-dark/50 uppercase tracking-wider text-xs">
                      #
                    </th>
                    <th className="pb-3 font-semibold text-text-dark/50 uppercase tracking-wider text-xs">
                      Asset Type / Market
                    </th>
                    <th className="pb-3 font-semibold text-text-dark/50 uppercase tracking-wider text-xs">
                      Size
                    </th>
                    <th className="pb-3 font-semibold text-text-dark/50 uppercase tracking-wider text-xs">
                      Value
                    </th>
                    <th className="pb-3 font-semibold text-text-dark/50 uppercase tracking-wider text-xs">
                      Notable
                    </th>
                    <th className="pb-3 font-semibold text-text-dark/50 uppercase tracking-wider text-xs">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal, i) => (
                    <tr
                      key={i}
                      className="border-b border-sage/10 hover:bg-white/60 transition-colors"
                    >
                      <td className="py-4 text-text-dark/40 font-medium">
                        {i + 1}
                      </td>
                      <td className="py-4">
                        <span className="font-semibold text-text-dark">
                          {deal.type}
                        </span>
                        <br />
                        <span className="text-text-dark/50 text-xs">
                          {deal.location}
                        </span>
                      </td>
                      <td className="py-4 text-text-dark/70">{deal.size}</td>
                      <td className="py-4 font-semibold text-text-dark">
                        {deal.value}
                      </td>
                      <td className="py-4 text-text-dark/70">
                        {deal.notable && (
                          <span className="bg-warm-gold/10 text-warm-gold text-xs font-semibold px-2 py-1 rounded">
                            {deal.notable}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-text-dark/60 text-xs leading-relaxed max-w-xs">
                        {deal.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Mobile Cards */}
          <div className="mt-10 md:hidden space-y-4">
            {deals.map((deal, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-text-dark">{deal.type}</h3>
                      <p className="text-xs text-text-dark/50">
                        {deal.location}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-slate-dark">
                      {deal.value}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-4 text-xs text-text-dark/60">
                    <span>{deal.size}</span>
                    {deal.notable && (
                      <span className="bg-warm-gold/10 text-warm-gold font-semibold px-2 py-0.5 rounded">
                        {deal.notable}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-text-dark/50">{deal.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
