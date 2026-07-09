import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import IdentityCard from "../../components/IdentityCard";
import { useScrollTo } from "../../hooks/useScrollTo";
import { MagneticButton } from "../ui/MagneticButton";
import { AnimatedCounter } from "../ui/AnimatedCounter";

export function Hero() {
  const scrollTo = useScrollTo();
  const { scrollY } = useScroll();
  const yRange = 800; // Distance to scroll for full split
  const splitProgress = useTransform(scrollY, [0, yRange], [0, 100]);
  
  // Horizontal slice: top half goes UP, bottom half goes DOWN
  const topY = useTransform(splitProgress, (v) => `-${v}%`);
  const bottomY = useTransform(splitProgress, (v) => `${v}%`);
  
  // 3D transition effects
  const scale = useTransform(splitProgress, [0, 100], [1, 0.85]);
  const rotateXTop = useTransform(splitProgress, [0, 100], [0, 15]);
  const rotateXBottom = useTransform(splitProgress, [0, 100], [0, -15]);
  
  // Motion blur and glassmorphism fade
  const blurValue = useTransform(splitProgress, [0, 50, 100], [0, 6, 12]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const opacity = useTransform(splitProgress, [0, 80, 100], [1, 0.5, 0]);

  const display = useTransform(scrollY, (v) => v > yRange + 100 ? "none" : "block");
  const pointerEvents = useTransform(scrollY, (v) => v > 50 ? "none" : "auto") as any;

  const HeroContent = () => (
    <div className="relative min-h-[95vh] flex items-center px-6 pt-20 pb-24 bg-white text-[#1A1A1A] overflow-hidden rounded-b-[40px] lg:rounded-b-[80px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-20">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="relative z-10 pt-10 lg:pt-0">
          <h1 className="sr-only">Navin Adithya - Web Developer and Cyber Security Engineer</h1>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold leading-[1.05] tracking-tight mb-6 text-[#111111]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              letterSpacing: "-0.03em"
            }}
          >
            Build{" "}
            <span 
              className="italic font-serif pr-1 bg-clip-text text-transparent bg-gradient-to-r from-[#FF823C] to-[#FF5722]"
              style={{ fontWeight: 500 }}
            >
              secure
            </span>{" "}
            products.
            <br />
            Ship real systems.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#555555] text-lg md:text-[21px] leading-[1.6] max-w-xl mb-10 font-light tracking-[-0.01em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            I'm <strong className="font-semibold text-[#111111]">Navin</strong>, a Cybersecurity student focused on web engineering, automation, and production deployment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <MagneticButton
              onClick={() => scrollTo("#work")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF823C] text-white text-sm font-semibold rounded-lg hover:bg-[#ff9559] hover:shadow-[0_4px_15px_rgba(255,130,60,0.4)] transition-all duration-200 cursor-pointer"
            >
              View Work <ArrowUpRight size={15} />
            </MagneticButton>
            <a
              href={`${import.meta.env.BASE_URL}Navin_Adithya_Resume.pdf`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#E5E5E5] text-[#1A1A1A] text-sm font-medium rounded-lg hover:border-[#CCCCCC] hover:bg-zinc-50 transition-all duration-200 cursor-pointer"
            >
              Resume
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="text-sm text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200 cursor-pointer flex items-center gap-1 group"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-flex flex-wrap items-center gap-8 lg:gap-10 px-8 py-6 rounded-2xl bg-white/30 backdrop-blur-xl border border-black/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
          >
            {[
              { value: 3, suffix: "+", label: "Projects" },
              { value: 10, suffix: "+", label: "Certificates" },
              { value: 2, suffix: "+", label: "Internships" },
              { value: 8.1, suffix: "+", label: "CGPA" },
            ].map(({ value, suffix, label }) => (
              <div key={label}>
                <div
                  className="text-xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Inter', sans-serif", fontVariantNumeric: "tabular-nums" }}
                >
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div className="text-[11px] text-[#667085] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Identity Card */}
        <div className="flex items-center justify-center pt-8 lg:pt-0" style={{ perspective: "1000px" }}>
          <IdentityCard />
        </div>
      </div>
    </div>
  );

  return (
    <section id="hero" className="relative">
      <div style={{ height: "800px" }} /> {/* Spacer to allow scrolling past the fixed hero */}
      <motion.div style={{ display, pointerEvents, perspective: "1500px" }} className="fixed top-0 left-0 right-0 z-40">
        
        {/* Top Curtain */}
        <motion.div 
          style={{ y: topY, scale, rotateX: rotateXTop, filter, opacity, clipPath: "inset(0 0 50% 0)", transformOrigin: "bottom center" }} 
          className="absolute top-0 left-0 right-0"
        >
          <HeroContent />
          {/* Glass edge */}
          <div className="absolute top-[calc(50%-1px)] left-0 right-0 h-[1px] bg-white/30 shadow-[0_0_30px_rgba(255,255,255,0.8)] backdrop-blur-md" />
        </motion.div>

        {/* Bottom Curtain */}
        <motion.div 
          style={{ y: bottomY, scale, rotateX: rotateXBottom, filter, opacity, clipPath: "inset(50% 0 0 0)", transformOrigin: "top center" }} 
          className="absolute top-0 left-0 right-0"
        >
          <HeroContent />
          {/* Glass edge */}
          <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-white/30 shadow-[0_0_30px_rgba(255,255,255,0.8)] backdrop-blur-md" />
        </motion.div>

      </motion.div>
    </section>
  );
}
