import { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "About Us — Nicholas White & Rising Tide",
  description:
    "Meet the team behind Rising Tide Property Group. Over 15 years of hands-on commercial real estate experience.",
  keywords: [
    "Rising Tide Property Group",
    "Nicholas White",
    "commercial real estate team",
    "CRE investment firm Florida",
    "Space Coast real estate investor",
    "hands-on property management",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/about",
  },
  openGraph: {
    title: "About Us — Nicholas White & Rising Tide",
    description:
      "Meet the team behind Rising Tide Property Group. Over 15 years of hands-on commercial real estate experience on Florida's Space Coast.",
    url: "https://risingtidepg.com/about",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "About Rising Tide Property Group",
      },
    ],
  },
};

const values = [
  {
    title: "Hands-On Ownership",
    description:
      "We manage what we own. Our operations-first approach starts from the ground level — ensuring every asset performs to its potential.",
  },
  {
    title: "Partnership-Driven",
    description:
      '"Real Partners" means aligned incentives, transparent communication, and long-term relationships built on trust and mutual success.',
  },
  {
    title: "Disciplined Underwriting",
    description:
      "Conservative assumptions, detailed modeling, and a relentless focus on downside protection. We stress-test every deal before we commit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Us"
        subtitle="Experienced operators. Disciplined investors. Committed partners."
      />

      {/* Founder Bio */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* Bio text */}
            <div className="md:col-span-3">
              <FadeIn>
                <p className="text-sm font-semibold text-warm-gold uppercase tracking-wider">
                  Founder & Principal
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
                  Nicholas White
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-text-dark/70 leading-relaxed">
                  Nicholas brings over 15 years of experience working directly
                  with family offices and private equity firms across nearly
                  every aspect of commercial real estate. His career began in
                  property maintenance and evolved through acquisitions,
                  underwriting, leasing, asset management, development,
                  financial analysis, risk management, capital markets, and
                  investor relations.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  He has developed and executed strategies across office,
                  multifamily, industrial, and medical asset classes — with
                  particular emphasis on value-add and opportunistic
                  investments. Known for an analytical mindset, entrepreneurial
                  spirit, and people-first leadership, Nicholas combines
                  strategic thinking with the grit and humility that comes from
                  building a career from the ground up.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-6 pt-6 border-t border-text-dark/10">
                  <p className="text-sm text-text-dark/50">
                    <span className="font-semibold text-text-dark/70">
                      Education:
                    </span>{" "}
                    B.A. Economics, University of New Hampshire &middot; MBA,
                    University of Florida
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Founder Photo */}
            <div className="md:col-span-2">
              <FadeIn delay={0.15}>
                <div className="relative">
                  <Image
                    src="/images/nicholas-white.jpg"
                    alt="Nicholas White, Founder & Principal of Rising Tide Property Group"
                    width={800}
                    height={800}
                    className="rounded-lg object-cover aspect-[3/4] object-top"
                    priority
                  />
                  {/* Decorative offset block */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-warm-gold/10 rounded-lg -z-10" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Firm Values */}
      <SectionDivider fromColor="bg-cream" toColor="bg-white" flip />
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Our Values
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="bg-cream rounded-lg p-6 md:p-8 h-full">
                  <div className="w-10 h-1 bg-warm-gold rounded-full mb-4" />
                  <h3 className="text-lg font-bold text-text-dark">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-dark/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
