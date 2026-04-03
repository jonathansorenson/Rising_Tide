import { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "About Us — Meet the Rising Tide Property Group Partners Team",
  description:
    "Meet Nicholas White, Nicholas West, and Jonathan Sorenson — the team behind Rising Tide Property Group Partners. Over 15 years of hands-on commercial real estate experience in acquisitions, asset management, and operations across Florida.",
  keywords: [
    "Rising Tide Property Group Partners",
    "Nicholas White commercial real estate",
    "Nicholas West real estate",
    "Jonathan Sorenson operations",
    "commercial real estate team Florida",
    "CRE investment firm South Florida",
    "Space Coast real estate investor",
    "hands-on property management",
    "value-add real estate",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/about",
  },
  openGraph: {
    title: "About Us — Meet the Rising Tide Property Group Partners Team",
    description:
      "Meet the team behind Rising Tide Property Group Partners. Over 15 years of hands-on commercial real estate experience in acquisitions, asset management, and operations across Florida.",
    url: "https://risingtidepg.com/about",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "About Rising Tide Property Group Partners Team",
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
      <section className="bg-cream py-16 md:py-24" aria-label="Nicholas White — Founder & Principal">
        <article className="max-w-6xl mx-auto px-6" itemScope itemType="https://schema.org/Person">
          <meta itemProp="jobTitle" content="Founder & Principal" />
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* Founder Photo */}
            <div className="md:col-span-2 md:order-2">
              <FadeIn delay={0.15}>
                <div className="relative">
                  <Image
                    src="/images/nicholas-white.jpg"
                    alt="Nicholas White, Founder & Principal of Rising Tide Property Group Partners"
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

            {/* Bio text */}
            <div className="md:col-span-3 md:order-1">
              <FadeIn>
                <p className="text-sm font-semibold text-warm-gold uppercase tracking-wider">
                  Founder & Principal
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-text-dark tracking-tight" itemProp="name">
                  Nicholas White
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-text-dark/70 leading-relaxed" itemProp="description">
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
          </div>
        </article>
      </section>

      {/* Nicholas West Bio */}
      <SectionDivider fromColor="bg-cream" toColor="bg-white" flip />
      <section className="bg-white py-16 md:py-24" aria-label="Nicholas West — Vice President">
        <article className="max-w-6xl mx-auto px-6" itemScope itemType="https://schema.org/Person">
          <meta itemProp="jobTitle" content="Vice President" />
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* Photo placeholder */}
            <div className="md:col-span-2">
              <FadeIn delay={0.15}>
                <div className="relative">
                  <div className="rounded-lg aspect-[3/4] bg-slate-dark flex items-center justify-center">
                    <span className="text-5xl font-bold text-warm-gold/60">
                      NW
                    </span>
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-full h-full bg-warm-gold/10 rounded-lg -z-10" />
                </div>
              </FadeIn>
            </div>

            {/* Bio text */}
            <div className="md:col-span-3">
              <FadeIn>
                <p className="text-sm font-semibold text-warm-gold uppercase tracking-wider">
                  Vice President
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-text-dark tracking-tight" itemProp="name">
                  Nicholas West
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-text-dark/70 leading-relaxed" itemProp="description">
                  Nicholas West is the Vice President of Rising Tide Commercial
                  Real Estate, a vertically integrated real estate firm
                  operating in South Florida. With oversight spanning
                  acquisitions, asset management, development, and property
                  operations, Nicholas leads every phase of the investment
                  lifecycle — from sourcing and underwriting opportunities to
                  executing value-add strategies and managing stabilized assets.
                  His integrated approach ensures alignment across capital
                  deployment, construction, leasing, and long-term portfolio
                  performance.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  Before joining Rising Tide, Nicholas served as an Asset
                  Manager at Lost Tree Village Corporation, a family-owned real
                  estate investment and management company in the Palm Beach
                  area. In that role, he oversaw the acquisition and management
                  of the firm&apos;s real estate portfolios, identified new
                  capital structures to maximize returns, and managed the
                  construction and renovation of single-family residential
                  properties in Martin County.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  Nicholas also serves as Managing Partner of Vestri Capital, a
                  private investment firm he established in 2021. His career is
                  built on a strong foundation in institutional finance,
                  including a tenure as an Investment Banking Associate at Piper
                  Sandler &amp; Co., where he directed quantitative analysis for
                  the underwriting desk, managed rating agency processes, built
                  complex debt and investment models, and contributed to
                  municipal bond sales across the Western United States.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  A graduate of the Fox School of Business at Temple University,
                  Nicholas brings a rare combination of institutional capital
                  markets discipline, hands-on property operations experience,
                  and entrepreneurial drive to the commercial real estate
                  sector. His ability to operate across every layer of the real
                  estate stack — from deal origination and financial structuring
                  to construction oversight and tenant management — defines the
                  vertically integrated vision behind Rising Tide.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-6 pt-6 border-t border-text-dark/10">
                  <p className="text-sm text-text-dark/50">
                    <span className="font-semibold text-text-dark/70">
                      Education:
                    </span>{" "}
                    B.S. Business Administration, Fox School of Business, Temple
                    University
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </article>
      </section>

      {/* Jonathan Sorenson Bio */}
      <SectionDivider fromColor="bg-white" toColor="bg-cream" />
      <section className="bg-cream py-16 md:py-24" aria-label="Jonathan Sorenson — Director of Operations">
        <article className="max-w-6xl mx-auto px-6" itemScope itemType="https://schema.org/Person">
          <meta itemProp="jobTitle" content="Director of Operations" />
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* Photo placeholder */}
            <div className="md:col-span-2 md:order-2">
              <FadeIn delay={0.15}>
                <div className="relative">
                  <div className="rounded-lg aspect-[3/4] bg-slate-dark flex items-center justify-center">
                    <span className="text-5xl font-bold text-warm-gold/60">
                      JS
                    </span>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-warm-gold/10 rounded-lg -z-10" />
                </div>
              </FadeIn>
            </div>

            {/* Bio text */}
            <div className="md:col-span-3 md:order-1">
              <FadeIn>
                <p className="text-sm font-semibold text-warm-gold uppercase tracking-wider">
                  Director of Operations
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-text-dark tracking-tight" itemProp="name">
                  Jonathan Sorenson
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-text-dark/70 leading-relaxed" itemProp="description">
                  Jonathan brings a disciplined, mission-driven approach to
                  commercial real estate operations, forged through years of
                  leadership in the United States Army. A former Tank Platoon
                  Leader who directed forward operations during Operation
                  Spartan Shield in Kuwait, Jonathan built his leadership
                  foundation on precision planning, decisive action, and an
                  unwavering commitment to the people under his command.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  His military career also included serving as a Real Property
                  Manager for the Idaho Military Division, where he managed
                  diverse real estate holdings, led cross-agency coordination
                  with the BLM, U.S. Forest Service, and Department of Defense,
                  and spearheaded a 30,000-acre land acquisition supporting
                  heavy maneuver operations at the Orchard Combat Training
                  Center — a project that required navigating complex federal
                  stakeholder relationships and securing a land moratorium
                  waiver at the senior leadership level.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  Transitioning that operational rigor and leadership instinct
                  into the private sector, Jonathan now oversees day-to-day
                  operations across Rising Tide&apos;s commercial portfolio.
                  Prior to joining Rising Tide, he managed over 500,000 square
                  feet of Class A commercial property and annual operating
                  budgets exceeding $1 million per asset, where he was
                  recognized for building high-performing teams, implementing
                  process improvements that elevated both efficiency and
                  accountability, and maintaining premium facility standards
                  that drove tenant satisfaction.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="mt-4 text-text-dark/70 leading-relaxed">
                  His ability to lead from the front — whether coordinating
                  multi-agency logistics in a combat theater or streamlining
                  operations across a commercial portfolio — defines his
                  approach to every challenge.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-6 pt-6 border-t border-text-dark/10">
                  <p className="text-sm text-text-dark/50">
                    <span className="font-semibold text-text-dark/70">
                      Education:
                    </span>{" "}
                    B.S. Health Science (Business Certificate), Boise State
                    University &middot; M.S. Athletic Leadership, Boise State
                    University
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </article>
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
