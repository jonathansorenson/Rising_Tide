import { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import GatedForm from "@/components/GatedForm";

export const metadata: Metadata = {
  title: "Deal Flow Criteria",
  description:
    "What Rising Tide Property Group is actively buying — target asset classes, markets, deal sizes, and how to submit a deal.",
  keywords: [
    "CRE deal criteria",
    "commercial real estate acquisition targets",
    "Rising Tide buying criteria",
    "NNN lease deals wanted",
    "Florida industrial acquisition",
    "value-add CRE opportunities",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/resources/deal-criteria",
  },
  openGraph: {
    title: "Deal Flow Criteria — Rising Tide Property Group",
    description:
      "What Rising Tide Property Group is actively buying — target asset classes, markets, deal sizes, and how to submit a deal.",
    url: "https://risingtidepg.com/resources/deal-criteria",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Rising Tide Property Group Deal Criteria",
      },
    ],
  },
};

const formFields = [
  { name: "name", label: "Full Name", type: "text" as const, required: true },
  { name: "email", label: "Work Email", type: "email" as const, required: true },
  {
    name: "company",
    label: "Brokerage / Firm",
    type: "text" as const,
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select" as const,
    required: true,
    options: [
      { value: "broker", label: "Broker / Agent" },
      { value: "investor", label: "Principal / Investor" },
      { value: "service_provider", label: "Advisor / Consultant" },
      { value: "other", label: "Other" },
    ],
  },
];

export default function DealCriteriaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-dark text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-10"
          style={{
            background: "linear-gradient(135deg, #D4A574 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <FadeIn>
            <span className="text-xs uppercase tracking-wider text-warm-gold font-semibold">
              For Brokers
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
              What We&apos;re Buying
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
              Our current acquisition criteria, target asset classes, preferred
              markets, and the fastest way to get a deal in front of our team.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Criteria overview */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl font-bold text-text-dark">
                  Acquisition Focus
                </h2>
                <p className="mt-3 text-text-dark/70 leading-relaxed">
                  Rising Tide targets value-add and stabilized commercial
                  properties with strong fundamentals. Here&apos;s a preview of
                  what&apos;s in the full criteria sheet.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Asset Classes",
                      value:
                        "Industrial, Small-Bay Warehouse, Office, Medical Office, Multifamily",
                    },
                    {
                      label: "Markets",
                      value:
                        "Space Coast (Brevard County), Treasure Coast, South Florida, Select U.S.",
                    },
                    {
                      label: "Deal Size",
                      value: "Individual assets and portfolios",
                    },
                    {
                      label: "Lease Structure",
                      value: "NNN preferred; gross-to-NNN conversion value-add",
                    },
                    {
                      label: "Holding Period",
                      value: "Flexible — value-add through long-term hold",
                    },
                    {
                      label: "Turnaround",
                      value: "LOI within 5 business days of qualified submission",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white rounded-lg p-5 shadow-sm"
                    >
                      <span className="text-xs uppercase tracking-wider text-warm-gold font-semibold">
                        {item.label}
                      </span>
                      <p className="mt-2 text-sm text-text-dark font-medium">
                        {item.value}
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
                    Get the Full Criteria Sheet
                  </h3>
                  <GatedForm
                    fields={formFields}
                    leadSource="gated_deal_criteria"
                    ctaText="Download Criteria Sheet"
                    successMessage="Your criteria sheet is ready."
                    pdfUrl="/resources/rising-tide-deal-criteria.pdf"
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
