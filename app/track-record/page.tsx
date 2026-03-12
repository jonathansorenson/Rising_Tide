import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Track Record — $90M+ in CRE Transactions",
  description:
    "Over $90M in transaction value across industrial, office, and multifamily asset classes. View Rising Tide Property Group's commercial real estate track record.",
  keywords: [
    "commercial real estate track record",
    "CRE transaction history",
    "industrial real estate portfolio",
    "value-add real estate deals",
    "Florida commercial property",
    "real estate investment returns",
  ],
};

const projects = [
  {
    name: "Detroit Industrial",
    size: "147,000 SF",
    value: "$19M",
    role: "Underwriting, Acquisition, Financing, Asset Management",
  },
  {
    name: "Seacoast Banking Centre",
    size: "66,000 SF",
    value: "$30M",
    role: "Source, Acquisition, Asset Management, Lease Negotiations",
  },
  {
    name: "Merritt Crossing",
    size: "89,727 SF",
    value: "$9.135M",
    role: "Underwriting, Acquisition, Value-Add, Leasing, Capital Markets",
  },
  {
    name: "Rialto Place",
    size: "155,000 SF",
    value: "$32M",
    role: "Underwriting, Acquisition, Asset Management & Value-Add",
  },
];

const aggregateStats = [
  { value: "$90M+", label: "Transaction Value" },
  { value: "450,000+", label: "SF Managed" },
  { value: "Multiple", label: "Asset Classes" },
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

      {/* Project Cards */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
              Select Projects
            </h2>
          </FadeIn>
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                size={project.size}
                value={project.value}
                role={project.role}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
