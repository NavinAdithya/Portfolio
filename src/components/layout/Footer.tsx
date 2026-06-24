import { NAV_LINKS } from "../../data/constants";
import { useScrollTo } from "../../hooks/useScrollTo";

export function Footer() {
  const scrollTo = useScrollTo();
  return (
    <footer className="border-t border-[rgba(255,255,255,0.04)] px-6 py-8">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[#667085]" style={{ fontFamily: "'Inter', sans-serif" }}>
          © 2026 Navin Adithya
        </span>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[11px] text-[#667085] hover:text-[#FF823C] transition-colors tracking-wider uppercase cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
