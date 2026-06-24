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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b"
      style={{
        background: scrolled ? "rgba(10,10,10,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
        borderColor: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
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
        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <motion.button
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo(l.href)}
                className={`px-4 py-2 text-[12px] transition-colors duration-300 tracking-wide cursor-pointer rounded-full ${scrolled ? "text-[#B0B7C3] hover:text-white hover:bg-[rgba(255,255,255,0.05)]" : "text-[#666666] hover:text-black hover:bg-black/5"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Right — Status + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <motion.div 
            className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full border cursor-default overflow-hidden transition-colors duration-500 ${scrolled ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] shadow-[0_0_15px_rgba(255,255,255,0.02)]" : "bg-black/[0.02] border-black/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"}`}
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
            
            <div className="relative z-10 flex items-center gap-2.5">
              <span className={`text-[10px] uppercase tracking-widest font-semibold ${scrolled ? "text-[#E0E0E0]" : "text-[#444444]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                Available
              </span>
            </div>
          </motion.div>

          <MagneticButton
            onClick={() => scrollTo("#contact")}
            className="px-5 py-2 rounded-full bg-[#FF823C] text-white text-xs font-bold tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_4px_15px_rgba(255,130,60,0.3)]"
          >
            Hire Me
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
            style={{ background: scrolled ? "rgba(10,10,10,0.98)" : "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
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
