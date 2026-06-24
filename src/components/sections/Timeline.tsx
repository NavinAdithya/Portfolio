import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TIMELINE } from "../../data/constants";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionHeader label="Timeline" title="The journey so far." />
        </Reveal>

        <div className="relative" ref={containerRef}>
          {/* Vertical line background */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(255,255,255,0.06)]" />
          {/* Animated fill line */}
          <motion.div 
            className="absolute left-[7px] top-2 w-px bg-[#FF823C]" 
            style={{ height: lineHeight }} 
          />

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative flex items-start gap-6 py-6 group">
                  {/* Dot */}
                  <div className="relative z-10 mt-1.5 flex-shrink-0">
                    <div
                      className="w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: item.color,
                        background: item.status === "active" ? `${item.color}20` : "#040816",
                      }}
                    >
                      {item.status === "active" && (
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: item.color }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 -mt-0.5">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-[11px] font-medium tracking-widest"
                        style={{
                          color: item.color,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {item.period}
                      </span>
                      {item.status === "active" && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-sm tracking-wider uppercase"
                          style={{
                            color: item.color,
                            background: `${item.color}10`,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-white text-sm font-semibold mb-0.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#667085] text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.org}
                    </p>
                    <p
                      className="text-[#667085]/60 text-xs mt-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
