import FadeIn from "./FadeIn";

interface HeroProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export default function Hero({ title, subtitle, dark = true }: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${
        dark ? "bg-slate-dark text-white" : "bg-cream text-text-dark"
      }`}
    >
      {/* Diagonal accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-10"
        style={{
          background: dark
            ? "linear-gradient(135deg, #8FB5B2 0%, transparent 60%)"
            : "linear-gradient(135deg, #3B4F5C 0%, transparent 60%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.15}>
            <p
              className={`mt-6 text-lg md:text-xl max-w-2xl leading-relaxed ${
                dark ? "text-white/80" : "text-text-dark/70"
              }`}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
