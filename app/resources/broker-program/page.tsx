import { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import GatedForm from "@/components/GatedForm";

export const metadata: Metadata = {
  title: "Broker Partnership Program",
  description:
    "Join Rising Tide's broker partnership network for CRE referrals, co-investment equity, priority deal review, and transparent economics across Florida acquisitions.",
  keywords: [
    "CRE broker partnership",
    "commercial real estate broker program",
    "co-investment opportunities",
    "broker referral network Florida",
    "Space Coast broker program",
    "CRE deal sourcing partnership",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/resources/broker-program",
  },
  openGraph: {
    title: "Broker Partnership Program — Rising Tide Property Group Partners",
    description:
      "Join Rising Tide's broker partnership network for CRE referrals, co-investment equity, priority deal review, and transparent economics across Florida acquisitions.",
    url: "https://risingtidepg.com/resources/broker-program",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Rising Tide Property Group Partners Broker Partnership",
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
    name: "phone",
    label: "Phone",
    type: "tel" as const,
    required: false,
    placeholder: "Optional",
  },
  {
    name: "role",
    label: "Preferred Structure",
    type: "select" as const,
    required: true,
    options: [
      { value: "broker", label: "Commission / Referral Fee" },
      { value: "investor", label: "Co-Investment / Equity Stake" },
      { value: "service_provider", label: "Advisory / Consulting" },
      { value: "other", label: "Open to Discussion" },
    ],
  },
];

export default function BrokerProgramPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-dark text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-10"
          style={{
            background: "linear-gradient(135deg, #8FB5B2 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <FadeIn>
            <span className="text-xs uppercase tracking-wider text-sage font-semibold">
              Partnership
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
              Broker Partnership Network
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
              We believe the best deals come from long-term relationships. Our
              broker network offers co-investment opportunities, priority deal
              review, and a transparent partnership model.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Program details */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl font-bold text-text-dark">
                  How It Works
                </h2>
                <p className="mt-3 text-text-dark/70 leading-relaxed">
                  Our broker partnership program is built on a simple premise:
                  when brokers bring great deals, everyone should benefit. We
                  offer flexible structures that go beyond the traditional
                  commission model.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Submit a Deal",
                      desc: "Send us the offering memorandum or deal summary. We review every submission within 48 hours and respond with a clear yes/no and reasoning.",
                    },
                    {
                      step: "02",
                      title: "Fast-Track Due Diligence",
                      desc: "If the deal fits our criteria, we move to LOI within 5 business days. Our team handles underwriting, financing, and legal — you stay informed throughout.",
                    },
                    {
                      step: "03",
                      title: "Choose Your Structure",
                      desc: "Standard commission, co-investment equity stake, ongoing advisory role, or a combination. We tailor the partnership to what works best for you.",
                    },
                    {
                      step: "04",
                      title: "Ongoing Relationship",
                      desc: "Partners get priority access to our deal criteria updates, market intelligence, and co-investment opportunities on future acquisitions.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="bg-white rounded-lg p-5 shadow-sm flex gap-4"
                    >
                      <span className="text-2xl font-bold text-warm-gold/30 shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-semibold text-text-dark">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-text-dark/70">
                          {item.desc}
                        </p>
                      </div>
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
                    Request Program Details
                  </h3>
                  <GatedForm
                    fields={formFields}
                    leadSource="gated_broker_program"
                    ctaText="Get Program Overview"
                    successMessage="Your partnership program overview is ready."
                    pdfUrl="/resources/rising-tide-broker-program.pdf"
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
