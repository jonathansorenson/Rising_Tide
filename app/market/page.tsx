import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import LatestInsights from "@/components/LatestInsights";

export const metadata: Metadata = {
  title: "Our Markets — Florida, Southeast & Sun Belt CRE",
  description:
    "Rising Tide targets commercial real estate across Florida and select Southeast and Sun Belt markets with favorable demographics, job growth, and expanding economic infrastructure.",
  keywords: [
    "Space Coast commercial real estate",
    "Florida CRE investment",
    "Southeast real estate markets",
    "Sun Belt commercial property",
    "Palm Beach County CRE",
    "South Carolina real estate",
    "Nashville suburb investment",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/market",
  },
  openGraph: {
    title: "Our Markets — Florida, Southeast & Sun Belt CRE",
    description:
      "Rising Tide targets commercial real estate across Florida and select Sun Belt markets with favorable demographics and job growth.",
    url: "https://risingtidepg.com/market",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Rising Tide Property Group Target Markets",
      },
    ],
  },
};

const targetMarkets = [
  {
    market: "Space Coast",
    tag: "PRIMARY",
    state: "FL",
    rationale:
      "Deep market expertise. Kennedy Space Center tech economy, population growth, undersupplied retail & industrial.",
  },
  {
    market: "Palm Beach County",
    tag: null,
    state: "FL",
    rationale:
      "Established relationship base. Affluent demographics, institutional-quality deal flow in the small/middle market.",
  },
  {
    market: "Treasure Coast",
    tag: null,
    state: "FL",
    rationale:
      "Rapidly growing corridor between Palm Beach and Space Coast. Rising rents, low vacancy, limited supply.",
  },
  {
    market: "Southwest Florida",
    tag: null,
    state: "FL",
    rationale:
      "Strong in-migration and population growth post-Ian. Retail and industrial fundamentals improving.",
  },
  {
    market: "Wilmington / Brunswick County",
    tag: null,
    state: "NC",
    rationale:
      "Coastal growth market. Port expansion, defense sector, retiree and remote-worker in-migration. Low supply.",
  },
  {
    market: "Greenville / Spartanburg",
    tag: null,
    state: "SC",
    rationale:
      "Manufacturing and logistics hub (BMW, Michelin, Amazon). Strong industrial & flex demand.",
  },
  {
    market: "Myrtle Beach / Grand Strand",
    tag: null,
    state: "SC",
    rationale:
      "One of the fastest-growing MSAs in the US. Retail and light industrial driven by tourism and population growth.",
  },
  {
    market: "Charleston Suburbs",
    tag: null,
    state: "SC",
    rationale:
      "Explosive residential and commercial growth. Boeing, Mercedes-Benz Vans, and Port of Charleston driving demand.",
  },
  {
    market: "Franklin / Brentwood",
    tag: null,
    state: "TN",
    rationale:
      "Nashville suburb with exceptional income demographics. Retail, office, and medical demand driven by corporate relocations.",
  },
];

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is Florida's Space Coast a good market for commercial real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Space Coast (Brevard County) is one of America's fastest-growing metros, driven by aerospace and defense employers like SpaceX, Blue Origin, and L3Harris. Industrial vacancy is below 4%, population growth outpaces the national average, and the Milken Institute ranks it among the top metros for job growth.",
      },
    },
    {
      "@type": "Question",
      name: "What companies are driving demand in Brevard County?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Major employers include SpaceX, Blue Origin, L3Harris, Lockheed Martin, Northrop Grumman, Boeing, and Raytheon. Patrick Space Force Base, Kennedy Space Center, and Cape Canaveral Space Force Station anchor the defense and aerospace ecosystem.",
      },
    },
    {
      "@type": "Question",
      name: "What is the industrial vacancy rate on the Space Coast?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The industrial vacancy rate on Florida's Space Coast is currently sub-4%, reflecting strong demand from aerospace, defense, and high-tech manufacturing tenants.",
      },
    },
  ],
};

export default function MarketPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero
        title="Our Markets"
        subtitle="Rising Tide targets commercial real estate across Florida and select Southeast and Sun Belt markets characterized by favorable demographics, positive job and population growth, stable regulatory environments, and expanding economic infrastructure."
      />

      {/* Target Markets Grid */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Target Markets
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {targetMarkets.map((m, i) => (
              <FadeIn key={m.market} delay={i * 0.06}>
                <div className="bg-white rounded-lg p-6 h-full shadow-sm border border-sage/10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-text-dark">{m.market}</h3>
                    {m.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-warm-gold/15 text-warm-gold px-2 py-0.5 rounded-full">
                        {m.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-text-dark/40 uppercase tracking-wider">
                    {m.state}
                  </p>
                  <p className="mt-3 text-sm text-text-dark/60 leading-relaxed">
                    {m.rationale}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Space Coast — Primary Market */}
      <SectionDivider fromColor="bg-cream" toColor="bg-sage/20" flip />

      {/* Key Stats */}
      <section className="bg-sage/20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight text-center">
              Primary Market — Space Coast, Florida
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

      {/* Dynamic Blog Links */}
      <SectionDivider fromColor="bg-white" toColor="bg-slate-dark" />
      <LatestInsights
        filterTag="Space Coast"
        title="Market Insights"
        count={3}
      />
    </>
  );
}
