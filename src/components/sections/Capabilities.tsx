import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES } from "../../data/constants";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Capabilities() {
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
    <section id="capabilities" className="py-32 px-6 relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[#FF823C] opacity-[0.04] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8B5CF6] opacity-[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <Reveal>
          <SectionHeader label="Capabilities" title="What I build with." />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start" style={{ perspective: "1000px" }}>
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.id} delay={i * 0.08}>
                <motion.div
                  layoutId={`card-${cap.id}`}
                  onClick={() => setExpanded(cap.id)}
                  className="group rounded-[20px] p-6 cursor-pointer relative flex flex-col h-full backdrop-blur-xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                  whileHover={{
                    borderColor: `${cap.color}40`,
                    background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                    y: -8,
                    scale: 1.02,
                    boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${cap.color}15, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                  transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                >
                  <motion.div layoutId={`header-${cap.id}`} className="flex items-start justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 relative"
                      style={{
                        background: `linear-gradient(135deg, ${cap.color}15, transparent)`,
                        border: `1px solid ${cap.color}30`,
                        boxShadow: `inset 0 1px 0 ${cap.color}40`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" style={{ background: cap.color }} />
                      <Icon size={22} style={{ color: cap.color }} className="relative z-10" />
                    </div>
                    <motion.div
                      layoutId={`metric-${cap.id}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors duration-300"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: cap.color, boxShadow: `0 0 8px ${cap.color}` }} />
                      <span
                        className="text-[11px] font-medium text-[#A0A0A0]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {cap.metric}
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    layoutId={`title-${cap.id}`}
                    className="text-white text-xl font-bold mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#A0A0A0] transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cap.label}
                  </motion.h3>

                  <motion.p
                    layoutId={`desc-${cap.id}`}
                    className="text-[#888] text-sm leading-relaxed mb-8 font-light"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cap.desc}
                  </motion.p>

                  <motion.div layoutId={`tech-${cap.id}`} className="flex flex-wrap gap-2 mt-auto pt-4">
                    {cap.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] text-[#666] px-3 py-1.5 rounded-lg border border-white/[0.03] bg-white/[0.02] transition-colors duration-300 hover:text-white hover:border-white/[0.1] hover:bg-white/[0.05]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {s}
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
              const cap = CAPABILITIES.find((c) => c.id === expanded);
              if (!cap) return null;
              const Icon = cap.icon;
              return (
                <motion.div
                  layoutId={`card-${cap.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 relative flex flex-col my-auto overflow-y-auto max-h-[85vh]"
                  style={{
                    boxShadow: `0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px ${cap.color}30`,
                    willChange: "transform, opacity",
                  }}
                  transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                >
                  {/* Modal Background Glow */}
                  <div className="absolute top-0 left-0 w-full h-[200px] opacity-10 pointer-events-none" style={{ background: `radial-gradient(ellipse at top, ${cap.color}, transparent 70%)` }} />

                  <button
                    onClick={() => setExpanded(null)}
                    className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 z-50 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 1L13 13M1 13L13 1" />
                    </svg>
                  </button>

                  <motion.div layoutId={`header-${cap.id}`} className="flex items-start justify-between mb-8 pr-12 relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${cap.color}15, transparent)`,
                        border: `1px solid ${cap.color}30`,
                        boxShadow: `inset 0 1px 0 ${cap.color}40`,
                      }}
                    >
                      <Icon size={28} style={{ color: cap.color }} />
                    </div>
                    <motion.div
                      layoutId={`metric-${cap.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${cap.color}40`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: cap.color, boxShadow: `0 0 12px ${cap.color}` }} />
                      <span
                        className="text-[13px] font-medium text-white tracking-wide"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {cap.metric}
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    layoutId={`title-${cap.id}`}
                    className="text-white text-3xl font-bold mb-3 tracking-tight relative z-10"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cap.label}
                  </motion.h3>

                  <motion.p
                    layoutId={`desc-${cap.id}`}
                    className="text-[#A0A0A0] text-base leading-relaxed mb-8 font-light max-w-2xl relative z-10"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cap.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="mb-12 space-y-5 relative z-10"
                  >
                    {cap.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div 
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300"
                          style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}30` }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={cap.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                    
                    {cap.certUrl && (
                      <div className="flex items-start gap-4 pt-4 mt-2 border-t border-white/5">
                        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${cap.color}20` }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={cap.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </div>
                        <a
                          href={cap.certUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View official certification for ${cap.label}`}
                          className="text-base leading-relaxed font-semibold hover:underline flex items-center gap-1.5 transition-opacity hover:opacity-80"
                          style={{ color: cap.color, fontFamily: "'Inter', sans-serif" }}
                        >
                          View Official Certification <ArrowUpRight size={18} />
                        </a>
                      </div>
                    )}
                  </motion.div>

                  <motion.div layoutId={`tech-${cap.id}`} className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                    {cap.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[12px] text-[#8892b0] px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.08)] bg-white/[0.02]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {s}
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
