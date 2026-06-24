export function SectionHeader({
  label,
  title,
  labelColor = "#667085",
}: {
  label: string;
  title: string;
  labelColor?: string;
}) {
  return (
    <div className="mb-16">
      <p
        className="text-xs tracking-[0.2em] uppercase mb-4"
        style={{ color: labelColor, fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </p>
      <h2
        className="text-white leading-[1.1] tracking-tight"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontStyle: "italic",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
