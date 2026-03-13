import { Metadata } from "next";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Rising Tide Property Group",
  description:
    "Get in touch with Rising Tide Property Group. Whether you're a prospective investor, broker, or partner, we'd welcome the conversation.",
  keywords: [
    "contact Rising Tide Property Group",
    "CRE investment inquiry",
    "broker partnership Florida",
    "commercial real estate contact",
    "Space Coast real estate firm",
  ],
  alternates: {
    canonical: "https://risingtidepg.com/contact",
  },
  openGraph: {
    title: "Contact Us — Rising Tide Property Group",
    description:
      "Get in touch with Rising Tide Property Group. Prospective investors, brokers, and partners welcome.",
    url: "https://risingtidepg.com/contact",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Contact Rising Tide Property Group",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get In Touch"
        subtitle="Whether you're a prospective investor, broker, or partner, we'd welcome the conversation."
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Form */}
            <FadeIn>
              <ContactForm />
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.15}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-text-dark">
                    Rising Tide Property Group
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/60 leading-relaxed">
                    Florida&apos;s Space Coast (Brevard County)
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-dark/50 uppercase tracking-wider">
                    Email
                  </h4>
                  <p className="mt-1 text-text-dark">
                    nick@risingtidepg.com
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-sage/20">
                  <p className="text-sm text-text-dark/70 leading-relaxed">
                    Whether you&apos;re a prospective investor exploring
                    partnership opportunities, a broker with a deal to share, or
                    a tenant looking for space — we respond to every inquiry
                    personally and promptly.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="w-1 bg-warm-gold rounded-full" />
                  <p className="text-sm text-text-dark/50 italic">
                    &ldquo;Real Assets. Real Partners.&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
