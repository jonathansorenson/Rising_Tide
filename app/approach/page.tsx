import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import ProcessStep from "@/components/ProcessStep";
import SectionDivider from "@/components/SectionDivider";
import LatestInsights from "@/components/LatestInsights";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Defensive yield with growth upside. Learn how Rising Tide Property Group underwrites, acquires, and operates commercial real estate.",
};

const criteria = [
  {
    title: "Strong Going-In Cash Flow",
    desc: "Targeting 8%+ cap rates with immediate income generation from day one.",
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

export default function ApproachPage() {
  return (
    <>
      <Hero
        title="Our Approach"
        subtitle="Disciplined investing rooted in real operations experience — from the ground up."
      />

      {/* Investment Philosophy */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                Defensive Yield + Growth
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-text-dark/70 leading-relaxed">
                We target assets with strong going-in yields — typically 8%+
                cap rates — supported by NNN lease structures that protect
                against operating expense risk. Combined with a clear path to
                rent growth through lease rollovers at fair market value, our
                approach delivers durable income with meaningful upside.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-text-dark/70 leading-relaxed">
                This isn&apos;t theoretical. Our operations-first approach is
                rooted in the founder&apos;s career starting from the ground up
                — from property maintenance through acquisitions, underwriting,
                leasing, and asset management. We manage what we own.
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
