interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

export default function SectionDivider({
  fromColor = "bg-cream",
  toColor = "bg-slate-dark",
  flip = false,
}: SectionDividerProps) {
  return (
    <div className={`relative h-20 ${fromColor}`}>
      <div
        className={`absolute inset-0 ${toColor}`}
        style={{
          clipPath: flip
            ? "polygon(0 0, 100% 60%, 100% 100%, 0 100%)"
            : "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}
