import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import DealSubmissionForm from "@/components/DealSubmissionForm";

export const metadata: Metadata = {
  title: "Submit a Deal",
  description:
    "Submit a commercial real estate deal to Rising Tide Property Group Partners. We review every submission and respond within 3-5 business days.",
  keywords: [
    "submit CRE deal",
    "commercial real estate acquisition",
    "sell commercial property",
    "CRE deal submission",
    "Rising Tide investment criteria",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/submit-deal",
  },
  openGraph: {
    title: "Submit a Deal — Rising Tide Property Group Partners",
    description:
      "Submit a commercial real estate deal to Rising Tide Property Group Partners. We review every submission and respond within 3-5 business days.",
    url: "https://risingtidepg.com/submit-deal",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Submit a Deal to Rising Tide Property Group Partners",
      },
    ],
  },
};

const criteria = [
  {
    label: "Markets",
    detail:
      "Space Coast, FL | Palm Beach County, FL | Select Florida Markets | North Carolina | South Carolina | Tennessee",
  },
  { label: "Deal Size", detail: "$1M – $25M acquisition value" },
  {
    label: "Asset Classes",
    detail:
      "Retail | Medical Office | Mixed-Use | Industrial | Small-Bay Warehouse | R&D / Flex | Select Multifamily",
  },
  {
    label: "Debt Structure",
    detail: "60–65% LTC | Non-recourse preferred",
  },
  {
    label: "Hold Period",
    detail:
      "5–7 years target (ability to hold longer when warranted by market conditions)",
  },
  {
    label: "Cash Flow Profile",
    detail: "In-place cash flow with identifiable value-add opportunity",
  },
];

const returnProfiles = [
  {
    tier: "Core",
    irr: "7–9% IRR",
    description:
      "Stabilized, income-producing assets with modest upside. Lower risk.",
    color: "bg-sage/20 border-sage/30",
  },
  {
    tier: "Core+",
    irr: "15–18% IRR",
    description:
      "In-place yield with clear value-add path. Active management drives returns.",
    color: "bg-warm-gold/10 border-warm-gold/30",
  },
  {
    tier: "Opportunistic",
    irr: "20%+ IRR",
    description:
      "Significant repositioning, lease-up, or redevelopment. Higher risk/reward.",
    color: "bg-slate-dark/5 border-slate-dark/20",
  },
];

export default function SubmitDealPage() {
  return (
    <>
      <Hero
        title="Submit a Deal"
        subtitle="We review every submission and respond within 3-5 business days."
      />

      {/* Investment Criteria */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Investment Criteria
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {criteria.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-lg p-5 border border-sage/10"
                >
                  <p className="text-xs font-semibold text-text-dark/40 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-text-dark/80 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Return Profile */}
      <SectionDivider fromColor="bg-cream" toColor="bg-white" />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Return Profile
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {returnProfiles.map((profile) => (
                <div
                  key={profile.tier}
                  className={`rounded-lg p-6 md:p-8 border ${profile.color}`}
                >
                  <h3 className="text-lg font-bold text-text-dark">
                    {profile.tier}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-slate-dark">
                    {profile.irr}
                  </p>
                  <p className="mt-3 text-sm text-text-dark/60 leading-relaxed">
                    {profile.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Deal Submission Form */}
      <SectionDivider fromColor="bg-white" toColor="bg-sage/20" flip />
      <section className="bg-sage/20 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Submit Your Deal
            </h2>
            <p className="mt-4 text-text-dark/60">
              Tell us about the opportunity. We review every submission and will
              be in touch if it fits our current focus.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10">
              <DealSubmissionForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
