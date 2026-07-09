import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../data/constants";
import { useScrollTo } from "../../hooks/useScrollTo";
import { MagneticButton } from "../ui/MagneticButton";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.03)"
          : "transparent",
        backdropFilter: scrolled ? "blur(40px) saturate(1.8)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(40px) saturate(1.8)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "none",
      }}
    >
      {/* Top edge highlight — subtle refraction line */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 95%)",
          }}
        />
      )}

      <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-6">
        {/* Left — Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-baseline cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className={`text-[15px] font-bold tracking-tight transition-all duration-300 group-hover:text-[#FF823C] ${scrolled ? "text-white" : "text-[#1A1A1A]"}`}>
            Navin
          </span>
          <span className="text-[#FF823C] text-[15px] font-bold ml-[1px]">.</span>
        </button>

        {/* Center — Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <motion.button
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo(l.href)}
                className={`px-4 py-2 text-[12px] font-medium transition-all duration-300 tracking-wide cursor-pointer rounded-full ${
                  scrolled
                    ? "text-[#B0B7C3] hover:text-white hover:bg-white/[0.07] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                    : "text-[#666666] hover:text-black hover:bg-black/5"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Right — Status + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Available badge */}
          <motion.div
            className={`relative flex items-center gap-2.5 px-4 py-1.5 rounded-full border cursor-default overflow-hidden transition-all duration-500 ${
              scrolled
                ? "border-[rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(255,130,60,0.06),inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "bg-black/[0.02] border-black/10"
            }`}
            style={{
              background: scrolled
                ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
                : undefined,
              backdropFilter: scrolled ? "blur(12px)" : "none",
            }}
            whileHover="hover"
            initial="initial"
          >
            {/* Shimmer Sweep Effect */}
            <motion.div
              className={`absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent ${scrolled ? "via-white/10" : "via-black/5"} to-transparent skew-x-[-25deg]`}
              variants={{
                initial: { x: "-100%" },
                hover: { x: "100%" }
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Pulsing green dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>

            <div className="relative z-10 flex items-center gap-2">
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold ${scrolled ? "text-[#E0E0E0]" : "text-[#444444]"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Available
              </span>
            </div>
          </motion.div>

          <MagneticButton
            onClick={() => scrollTo("#contact")}
            className="relative px-5 py-2 rounded-full bg-[#FF823C] text-white text-xs font-bold tracking-wide cursor-pointer overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(255,130,60,0.45), 0 0 0 1px rgba(255,130,60,0.3) inset" } as React.CSSProperties}
          >
            <span className="relative z-10">Hire Me</span>
            {/* Inner shine */}
            <span className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
          </MagneticButton>
        </div>

        {/* Mobile menu */}
        <button className={`md:hidden ${scrolled ? "text-white" : "text-black"}`} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 overflow-hidden"
            style={{
              background: scrolled
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(40px) saturate(1.8)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => { scrollTo(l.href); setMenuOpen(false); }}
                className={`text-left text-sm transition-colors ${scrolled ? "text-[#B0B7C3] hover:text-white" : "text-[#666666] hover:text-black"}`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
