import FadeIn from "./FadeIn";

interface ProjectCardProps {
  name: string;
  size: string;
  value: string;
  role: string;
  delay?: number;
}

export default function ProjectCard({
  name,
  size,
  value,
  role,
  delay = 0,
}: ProjectCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="bg-slate-dark rounded-lg p-6 md:p-8 text-cream hover:shadow-xl transition-shadow">
        <h3 className="text-lg md:text-xl font-bold text-white">{name}</h3>
        <div className="mt-4 flex gap-6">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Size
            </p>
            <p className="text-sm font-semibold mt-1">{size}</p>
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Value
            </p>
            <p className="text-sm font-semibold mt-1">{value}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Role
          </p>
          <p className="text-sm mt-1 text-white/80 leading-relaxed">{role}</p>
        </div>
      </div>
    </FadeIn>
  );
}
