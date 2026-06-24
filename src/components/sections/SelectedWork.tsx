import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/constants";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function SelectedWork() {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expanded]);

  return (
    <section id="work" className="py-32 px-6 relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[#3B82F6] opacity-[0.04] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8B5CF6] opacity-[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <Reveal>
          <SectionHeader label="Selected Work" title="Shipped products." />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start" style={{ perspective: "1000px" }}>
          {PROJECTS.map((p, i) => {
            return (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.div
                  layoutId={`project-card-${p.name}`}
                  onClick={() => setExpanded(p.name)}
                  className="group rounded-[20px] p-6 cursor-pointer relative flex flex-col h-full backdrop-blur-xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                  whileHover={{
                    borderColor: `${p.accent}40`,
                    background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                    y: -8,
                    scale: 1.02,
                    boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${p.accent}15, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                  transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                >
                  <motion.div layoutId={`project-header-${p.name}`} className="flex items-center justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent}15, transparent)`,
                        border: `1px solid ${p.accent}30`,
                        boxShadow: `inset 0 1px 0 ${p.accent}40`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" style={{ background: p.accent }} />
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors duration-300"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}` }} />
                      <span
                        className="text-[11px] font-medium text-[#A0A0A0]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Shipped
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    layoutId={`project-title-${p.name}`}
                    className="text-white text-xl font-bold mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#A0A0A0] transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.name}
                  </motion.h3>

                  <motion.p
                    layoutId={`project-desc-${p.name}`}
                    className="text-[#888] text-sm leading-relaxed mb-8 font-light"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.tagline}
                  </motion.p>

                  <motion.div layoutId={`project-tech-${p.name}`} className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] pt-6">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-[#666] px-3 py-1.5 rounded-lg border border-white/[0.03] bg-white/[0.02] transition-colors duration-300 hover:text-white hover:border-white/[0.1] hover:bg-white/[0.05]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {t}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040816]/80 backdrop-blur-xl overflow-y-auto"
          >
            {(() => {
              const p = PROJECTS.find((project) => project.name === expanded);
              if (!p) return null;
              return (
                <motion.div
                  layoutId={`project-card-${p.name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 relative flex flex-col my-auto overflow-y-auto max-h-[85vh]"
                  style={{
                    boxShadow: `0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px ${p.accent}30`,
                    willChange: "transform, opacity",
                  }}
                  transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                >
                  {/* Modal Background Glow */}
                  <div className="absolute top-0 left-0 w-full h-[200px] opacity-10 pointer-events-none" style={{ background: `radial-gradient(ellipse at top, ${p.accent}, transparent 70%)` }} />

                  <button
                    onClick={() => setExpanded(null)}
                    className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 z-50 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 1L13 13M1 13L13 1" />
                    </svg>
                  </button>

                  <motion.div layoutId={`project-header-${p.name}`} className="flex items-start justify-between mb-8 pr-12 relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent}15, transparent)`,
                        border: `1px solid ${p.accent}30`,
                        boxShadow: `inset 0 1px 0 ${p.accent}40`,
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${p.accent}40`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
                      <span
                        className="text-[13px] font-medium text-white tracking-wide"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Shipped Product
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    layoutId={`project-title-${p.name}`}
                    className="text-white text-3xl font-bold mb-3 tracking-tight relative z-10"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.name}
                  </motion.h3>

                  <motion.p
                    layoutId={`project-desc-${p.name}`}
                    className="text-[#A0A0A0] text-base leading-relaxed mb-8 font-light max-w-2xl relative z-10"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.tagline}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="mb-12 space-y-5 relative z-10"
                  >
                    {p.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300"
                          style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30` }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <p
                          className="text-[#E0E0E0] text-base leading-relaxed group-hover:text-white transition-colors duration-300"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {detail}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10 mb-8"
                  >
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 hover:opacity-80 text-white text-base font-semibold rounded-xl transition-all duration-300 border w-fit"
                      style={{ fontFamily: "'Inter', sans-serif", background: `${p.accent}15`, borderColor: `${p.accent}30`, color: p.accent }}
                    >
                      View Live Project <ArrowUpRight size={18} />
                    </a>
                  </motion.div>

                  <motion.div layoutId={`project-tech-${p.name}`} className="flex flex-wrap gap-3 mt-auto pt-6 border-t border-[rgba(255,255,255,0.06)] relative z-10">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[13px] text-[#888] px-4 py-2 rounded-lg border border-white/[0.04] bg-white/[0.02] font-medium"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {t}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
