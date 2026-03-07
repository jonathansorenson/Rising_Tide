import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Why the Space Coast",
  description:
    "Brevard County, Florida is one of the fastest-growing metros in America. Learn why Florida's Space Coast is a compelling market for commercial real estate.",
};

const marketStats = [
  { value: "#1", label: "Jump in Ranking — Milken Institute Best Performing Cities" },
  { value: "#3", label: "Best Place to Live in Florida — U.S. News 2023" },
  { value: "#7", label: "Best Job Growth in U.S. — Milken Institute" },
  { value: "Top 20", label: "Fastest Growing Metro — Moody's Analytics" },
  { value: "Top 10", label: "Best Cities for STEM Jobs" },
  { value: "Sub-4%", label: "Industrial Vacancy Rate" },
];

const employers = [
  "SpaceX",
  "Blue Origin",
  "L3Harris",
  "Lockheed Martin",
  "Northrop Grumman",
  "Boeing",
  "Raytheon",
];

export default function MarketPage() {
  return (
    <>
      <Hero
        title="Why Florida's Space Coast"
        subtitle="One of America's fastest-growing metros — fueled by aerospace, defense, and high-tech manufacturing."
      />

      {/* Key Stats */}
      <section className="bg-sage/20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight text-center">
              Market Rankings
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {marketStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <p className="text-2xl md:text-3xl font-bold text-slate-dark">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-text-dark/60">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Drivers */}
      <SectionDivider fromColor="bg-sage/20" toColor="bg-cream" />
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                  Aerospace, Defense &<br />
                  High-Tech Manufacturing
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-text-dark/70 leading-relaxed">
                  Brevard County benefits from significant investment by both
                  public and private aerospace, defense, and high-tech
                  manufacturing companies. The region is home to some of the
                  most consequential organizations driving the future of space
                  exploration, national defense, and advanced technology.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  Patrick Space Force Base, Kennedy Space Center, and Cape
                  Canaveral Space Force Station anchor a defense and aerospace
                  ecosystem that continues to attract billions in investment
                  and thousands of high-paying jobs.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h3 className="text-sm font-semibold text-text-dark/50 uppercase tracking-wider mb-4">
                  Major Employers
                </h3>
                <div className="space-y-3">
                  {employers.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 py-2 border-b border-text-dark/5 last:border-0"
                    >
                      <div className="w-2 h-2 bg-warm-gold rounded-full flex-shrink-0" />
                      <span className="text-text-dark font-medium text-sm">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Demographics */}
      <SectionDivider fromColor="bg-cream" toColor="bg-white" flip />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Demographic Tailwinds
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                {[
                  {
                    title: "Population Growth",
                    desc: "Brevard County is outpacing the U.S. average in population growth, driven by strong domestic migration from higher-cost metros.",
                  },
                  {
                    title: "Low Unemployment",
                    desc: "Unemployment consistently below the national average, supported by a diversified economic base anchored in aerospace and defense.",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <h3 className="font-bold text-text-dark">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-dark/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {[
                  {
                    title: "Competitive Wages",
                    desc: "Attractive cost of living and wage competitiveness compared to national metros, drawing employers and skilled workers alike.",
                  },
                  {
                    title: "Educated Workforce",
                    desc: "A skilled, educated workforce supported by institutions including Eastern Florida State College and Florida Institute of Technology.",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <h3 className="font-bold text-text-dark">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-dark/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
