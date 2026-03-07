import FadeIn from "./FadeIn";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

export default function ProcessStep({
  number,
  title,
  description,
  delay = 0,
}: ProcessStepProps) {
  return (
    <FadeIn delay={delay}>
      <div className="flex gap-4 md:gap-6">
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-warm-gold rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
          {number}
        </div>
        <div className="pt-1">
          <h4 className="font-bold text-text-dark text-lg">{title}</h4>
          <p className="mt-1 text-text-dark/70 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
