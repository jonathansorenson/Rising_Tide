import FadeIn from "./FadeIn";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="bg-white rounded-lg p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
        <p className="text-2xl md:text-3xl font-bold text-slate-dark">
          {value}
        </p>
        <p className="mt-2 text-sm text-text-dark/60">{label}</p>
      </div>
    </FadeIn>
  );
}
