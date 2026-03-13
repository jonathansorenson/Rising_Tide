import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import ProcessStep from "@/components/ProcessStep";
import SectionDivider from "@/components/SectionDivider";
import LatestInsights from "@/components/LatestInsights";

export const metadata: Metadata = {
  title: "Our Approach — CRE Investment Strategy",
  description:
    "Defensive yield with growth upside. Learn how Rising Tide Property Group underwrites, acquires, and operates commercial real estate.",
  keywords: [
    "CRE investment strategy",
    "commercial real estate underwriting",
    "NNN lease investment",
    "value-add real estate",
    "industrial real estate acquisition",
    "defensive yield investing",
    "boutique CRE firm",
    "small middle market real estate",
  ],
};

const criteria = [
  {
    title: "Strong Going-In Cash Flow",
    desc: "In-place cash flow with positive leverage and a clear path to upside through leasing, capital improvements, or operational improvements.",
  },
  {
    title: "NNN Lease Structures",
    desc: "Triple-net or convertible lease structures that protect against operating expense risk.",
  },
  {
    title: "Newer Construction / Value-Add",
    desc: "Modern assets or repositioning opportunities with clear paths to value creation.",
  },
  {
    title: "Strong Market Tailwinds",
    desc: "Markets with robust demographic and employment growth driving demand.",
  },
  {
    title: "Low-Vacancy Asset Classes",
    desc: "Industrial, medical, and other sectors with historically tight supply.",
  },
  {
    title: "Near-Term Lease Rollovers",
    desc: "Opportunities to capture rent growth through upcoming lease expirations at fair market value.",
  },
];

const steps = [
  {
    title: "Source",
    desc: "Proprietary deal sourcing and established broker relationships across target markets.",
  },
  {
    title: "Underwrite",
    desc: "Conservative underwriting with detailed financial modeling and sensitivity analysis.",
  },
  {
    title: "Acquire",
    desc: "Negotiate and close with institutional-grade due diligence and capital structuring.",
  },
  {
    title: "Operate",
    desc: "Hands-on asset and property management to drive NOI and protect investor capital.",
  },
  {
    title: "Realize",
    desc: "Strategic dispositions timed to market conditions to maximize total returns.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Rising Tide's investment strategy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rising Tide targets strong in-place yields with identifiable value-add opportunities and a clear path to rent growth through the execution of a strategic business plan, combining rigorous underwriting with hands-on, day-to-day management.",
      },
    },
    {
      "@type": "Question",
      name: "What asset classes does Rising Tide invest in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rising Tide focuses on industrial, medical, and other low-vacancy asset classes with strong market tailwinds. We target newer construction or value-add repositioning opportunities with clear paths to value creation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the investment process at Rising Tide Property Group?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our five-step process includes: (1) Source — proprietary deal sourcing and broker relationships, (2) Underwrite — conservative financial modeling with sensitivity analysis, (3) Acquire — institutional-grade due diligence, (4) Operate — hands-on asset management to drive NOI, and (5) Realize — strategic dispositions timed to market conditions.",
      },
    },
  ],
};

export default function ApproachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero
        title="Our Approach"
        subtitle="Disciplined investing rooted in real operations experience — from the ground up."
      />

      {/* Who We Are */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                Who We Are
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-text-dark/70 leading-relaxed">
                Rising Tide operates in the space between mom-and-pop ownership
                and institutional capital &mdash; bringing professional-grade
                operations, underwriting discipline, and active asset management
                to transactions that larger platforms overlook. We are
                experienced operators, not passive managers, and we provide
                direct access to smaller and mid-size investors who want
                institutional quality without institutional minimums.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="mt-10 text-xl md:text-2xl font-bold text-text-dark tracking-tight">
                How We Operate
              </h3>
              <p className="mt-4 text-text-dark/70 leading-relaxed">
                Our foundation is disciplined management: rigorous deal
                analysis, conservative underwriting, and proactive oversight at
                the property level. Layered on top is an entrepreneurial
                value-add orientation &mdash; we identify operational
                inefficiencies, lease-up opportunities, and capital improvements
                that unlock embedded upside. The result is a repeatable process
                that generates strong risk-adjusted returns across market
                cycles.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="mt-10 text-xl md:text-2xl font-bold text-text-dark tracking-tight">
                Why It Matters
              </h3>
              <p className="mt-4 text-text-dark/70 leading-relaxed">
                We don&apos;t compete with institutions &mdash; we operate where
                they can&apos;t or won&apos;t. The small and middle market
                offers compelling risk-adjusted entry points, less competition
                for acquisitions, and greater potential for value creation
                through active management. Our investors get access to these
                opportunities backed by sophisticated analysis and a team that
                treats every asset like it&apos;s the only one in the portfolio.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <blockquote className="mt-10 border-l-4 border-warm-gold pl-6 py-4 bg-white rounded-r-lg">
                <p className="text-lg font-semibold text-text-dark italic">
                  &ldquo;Bigger and more professional than mom-and-pop. Nimble
                  and focused where institutions aren&apos;t.&rdquo;
                </p>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Defensive Yield + Growth */}
      <section className="bg-cream pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                Defensive Yield + Growth
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-text-dark/70 leading-relaxed">
                We target strong in-place yields with identifiable value-add
                opportunities and a clear path to rent growth through the
                execution of a strategic business plan. Our approach combines
                rigorous underwriting with hands-on, day-to-day management
                &mdash; delivering institutional-quality analysis at the
                boutique level.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <SectionDivider fromColor="bg-cream" toColor="bg-white" />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              What We Look For
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {criteria.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="bg-cream rounded-lg p-6 h-full border border-sage/20">
                  <h3 className="font-bold text-text-dark">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-dark/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <SectionDivider fromColor="bg-white" toColor="bg-sage/20" flip />
      <section className="bg-sage/20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Our Process
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 space-y-8 max-w-2xl">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.title}
                number={i + 1}
                title={step.title}
                description={step.desc}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Blog Links */}
      <LatestInsights
        filterTag="Industrial"
        title="Related Insights"
        count={3}
      />
    </>
  );
}
