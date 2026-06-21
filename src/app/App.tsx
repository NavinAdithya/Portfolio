import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import {
  Github, Linkedin, Globe, ArrowUpRight, Mail, Phone,
  Menu, X, Layers, Cpu, Shield, Zap, ExternalLink,
} from "lucide-react";
import Lenis from "lenis";
import IdentityCard from "../components/IdentityCard";

// ─── Lenis Smooth Scroll ─────────────────────────────────────────────────────

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    name: "SK Enterprises",
    tagline: "Electrical contractor site with grid console UI, transformer gallery, and SEO-optimised deploy.",
    details: [
      "Built custom grid console UI for electrical component management.",
      "Transformer gallery with high-performance image optimization.",
      "SEO-optimised architecture deployed for 100% uptime.",
    ],
    tech: ["JavaScript", "Tailwind"],
    url: "https://www.skenterprisesurapakkam.in/",
    accent: "#8B5CF6",
  },
  {
    name: "SK Bloom HR Solutions",
    tagline: "Enterprise HR platform with compliance intelligence, multi-tenant RBAC, and audit trails.",
    details: [
      "Engineered multi-tenant RBAC system for secure role isolation.",
      "Implemented compliance intelligence and automated audit trails.",
      "Scalable backend architecture using Node.js and MongoDB.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    url: "https://sk-bloom-hr-solutions.netlify.app/",
    accent: "#FF823C",
  },
  {
    name: "ReqWise",
    tagline: "Requirements QA platform with versioned objects, role-split views, and decision audit logs.",
    details: [
      "Created versioned objects for strict requirement traceability.",
      "Designed role-split views for QA analysts and developers.",
      "Built comprehensive decision audit logs using TypeScript.",
    ],
    tech: ["React", "TypeScript", "Vite", "GitHub Pages"],
    url: "https://navinadithya.github.io/ReqWise/#/login",
    accent: "#FF823C",
  },
];

const CAPABILITIES = [
  {
    id: "web",
    label: "Web Engineering",
    icon: Layers,
    color: "#FF823C",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Responsive Systems"],
    metric: "3 shipped",
    desc: "Production UIs — from HR dashboards to QA platforms.",
    details: [
      "Architecting responsive, high-converting React applications tailored for enterprise scale.",
      "Implementing pixel-perfect, accessible UI/UX with modern Tailwind CSS and Framer Motion.",
      "Optimizing Web Vitals and Lighthouse scores for maximum SEO visibility and user retention.",
    ]
  },
  {
    id: "frontend",
    label: "Frontend Systems",
    icon: Cpu,
    color: "#FF823C",
    skills: ["Component Architecture", "State Management", "CI/CD", "Performance"],
    metric: "3 live",
    desc: "Scalable frontend architecture with real deployment pipelines.",
    details: [
      "Engineering robust component libraries and scalable architectures for long-term maintainability.",
      "Integrating seamless state management for complex, data-heavy web applications.",
      "Establishing fully automated CI/CD deployment pipelines ensuring zero-downtime releases.",
    ]
  },
  {
    id: "security",
    label: "Cyber Security",
    icon: Shield,
    color: "#8B5CF6",
    skills: ["Wireshark", "Linux", "TCP/IP", "SIEM", "Cryptography", "Certificate"],
    metric: "Completed",
    certUrl: "https://coursera.org/share/2091bfac871198fb0687d73c2f3232b8",
    desc: "Google Cybersecurity cert · Tata simulation · Active CTF practice.",
    details: [
      "Conducting comprehensive vulnerability assessments and active threat modeling.",
      "Securing web architectures against top OWASP vulnerabilities and data breaches.",
      "Implementing robust authentication systems, RBAC, and strict compliance protocols.",
    ]
  },
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    color: "#FF823C",
    skills: ["Claude API", "Gemini API", "n8n", "Flowise", "LangChain"],
    metric: "2 systems",
    desc: "Agentic workflows, LLM integrations, automation pipelines.",
    details: [
      "Developing intelligent multi-agent AI workflows utilizing LangChain and Flowise.",
      "Automating complex business processes with custom n8n pipelines to eliminate manual labor.",
      "Integrating state-of-the-art LLMs (Claude, Gemini) into existing platforms for next-gen features.",
    ]
  },
];

const TIMELINE = [
  {
    period: "NOW",
    title: "Research Internship",
    org: "SRM Easwari Engineering College",
    detail: "Web Development domain · Faculty-guided",
    status: "active" as const,
    color: "#FF823C",
  },
  {
    period: "2024",
    title: "SK Bloom HR Solutions",
    org: "Shipped",
    detail: "Enterprise HR platform · Live on Netlify",
    status: "done" as const,
    color: "#FF823C",
  },
  {
    period: "2024",
    title: "ReqWise + SK Enterprises",
    org: "Shipped",
    detail: "Requirements QA · Electrical contractor site",
    status: "done" as const,
    color: "#FF823C",
  },
  {
    period: "2024",
    title: "Google Cybersecurity Certificate",
    org: "Coursera",
    detail: "Professional certificate + Tata simulation",
    status: "done" as const,
    color: "#8B5CF6",
  },
  {
    period: "2024–28",
    title: "B.E. Computer Science & Engineering",
    org: "Cyber Security Specialisation",
    detail: "CGPA 8.1+ · Expected 2028",
    status: "active" as const,
    color: "#FF823C",
  },
];

// ─── Utilities ───────────────────────────────────────────────────────────────

function useScrollTo() {
  return useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
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

function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const props = { ref, onMouseMove: handleMove, onMouseLeave: handleLeave, className, onClick };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        style={{ x: springX, y: springY }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button style={{ x: springX, y: springY }} {...props}>
      {children}
    </motion.button>
  );
}

// ─── Noise Background ────────────────────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Nav() {
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-default transition-colors duration-500 ${scrolled ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.05)]" : "bg-[#f5f5f5] border-black/5"}`}
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${scrolled ? "text-[#B0B7C3]" : "text-[#666666]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
              Available
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.6)] animate-pulse"
            />
          </motion.div>

          <MagneticButton
            onClick={() => scrollTo("#contact")}
            className="px-5 py-2 rounded-full bg-[#FF823C] text-white text-xs font-bold tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_4px_15px_rgba(255,130,60,0.3)]"
          >
            Start Project
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 50;
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center px-6 pt-20 pb-24 bg-white text-[#1A1A1A] overflow-hidden rounded-b-[40px] lg:rounded-b-[80px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-20">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="relative z-10 pt-10 lg:pt-0">
          {/* Pill Removed */}

          <motion.h1
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
          </motion.h1>

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
              href="/Navin_Adithya_Resume (1).docx"
              download="Navin_Adithya_Resume.docx"
              target="_blank"
              rel="noreferrer"
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
    </section>
  );
}

// ─── Selected Work ───────────────────────────────────────────────────────────

function SelectedWork() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionHeader label="Selected Work" title="Shipped products." />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PROJECTS.map((p, i) => {
            const isExpanded = expanded === p.name;
            return (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.div
                  layout
                  onClick={() => setExpanded(isExpanded ? null : p.name)}
                  className="group rounded-xl p-6 flex flex-col transition-all duration-300 cursor-pointer overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: `${p.accent}30`,
                    boxShadow: `0 8px 40px ${p.accent}08`,
                  }}
                  transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                >
                  {/* Status */}
                  <motion.div layout className="flex items-center justify-between mb-6">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: p.accent }}
                    />
                    <ExternalLink
                      size={14}
                      className="text-[#667085] group-hover:text-white transition-colors duration-300"
                    />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    layout
                    className="text-white text-lg font-semibold mb-3 leading-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.name}
                  </motion.h3>

                  {/* Detailed Description Expansion */}
                  <AnimatePresence initial={false} mode="sync">
                    {isExpanded ? (
                      <motion.div
                        key="expanded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 space-y-2 pt-2">
                          {p.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-[#FF823C] text-xs mt-1">▹</span>
                              <p
                                className="text-[#B0B7C3] text-sm leading-relaxed"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {detail}
                              </p>
                            </div>
                          ))}
                        </div>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white text-xs font-medium rounded-md transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          View Live Project <ArrowUpRight size={14} />
                        </a>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#667085] text-sm leading-relaxed mb-6 line-clamp-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {p.tagline}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Tech */}
                  <motion.div layout className="flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-[#667085]"
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
    </section>
  );
}

// ─── Capabilities ────────────────────────────────────────────────────────────

function Capabilities() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="capabilities" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionHeader label="Capabilities" title="What I build with." />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            const isExpanded = expanded === cap.id;
            return (
              <Reveal key={cap.id} delay={i * 0.08}>
                <motion.div
                  layout
                  onClick={() => setExpanded(isExpanded ? null : cap.id)}
                  className="group rounded-xl p-6 cursor-pointer overflow-hidden relative flex flex-col"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  whileHover={{
                    borderColor: `${cap.color}25`,
                    background: `${cap.color}04`,
                    y: -2,
                  }}
                  transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                >
                  <motion.div layout className="flex items-start justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${cap.color}10`,
                        border: `1px solid ${cap.color}20`,
                      }}
                    >
                      <Icon size={17} style={{ color: cap.color }} />
                    </div>
                    <motion.span
                      layout
                      className="text-[11px] font-medium"
                      style={{
                        color: cap.color,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {cap.metric}
                    </motion.span>
                  </motion.div>

                  <motion.h3
                    layout
                    className="text-white text-base font-semibold mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cap.label}
                  </motion.h3>

                  <AnimatePresence initial={false} mode="sync">
                    {isExpanded ? (
                      <motion.div
                        key="expanded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 space-y-2 pt-2">
                          {cap.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-[10px] mt-1.5" style={{ color: cap.color }}>▹</span>
                              <p
                                className="text-[#B0B7C3] text-sm leading-relaxed"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#667085] text-sm leading-relaxed mb-5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {cap.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.div layout className="flex flex-wrap gap-2 mt-auto pt-2">
                    {cap.skills.map((s) => {
                      if (s === "Certificate" && cap.certUrl) {
                        return (
                          <a
                            key={s}
                            href={cap.certUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#FF823C] hover:text-[#FF5722] px-2 py-0.5 rounded border border-[#FF823C]/30 hover:border-[#FF823C]/60 transition-colors duration-300 flex items-center gap-1"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {s} <ArrowUpRight size={10} />
                          </a>
                        );
                      }
                      return (
                        <span
                          key={s}
                          className="text-[11px] text-[#667085] group-hover:text-[#B0B7C3] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.05)] transition-colors duration-300"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {s}
                        </span>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

function Timeline() {
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

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "fb6ef65b-486a-47f2-8445-440972692760",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: Mail, label: "Email", value: "navinadithya394@gmail.com", url: "mailto:navinadithya394@gmail.com" },
    { icon: Github, label: "GitHub", value: "NavinAdithya", url: "https://github.com/NavinAdithya" },
    { icon: Linkedin, label: "LinkedIn", value: "navin-adithya", url: "https://www.linkedin.com/in/navin-adithya-540448348" },
    { icon: Phone, label: "WhatsApp", value: "+91 70945 43971", url: "https://wa.me/917094543971" },
    { icon: Globe, label: "TryHackMe", value: "NavinAdithya", url: "https://tryhackme.com/p/NavinAdithya" },
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionHeader label="Contact" title="Let's build something." />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
          {/* Form */}
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center border border-[rgba(255,255,255,0.06)] rounded-xl bg-[rgba(255,255,255,0.02)] h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,130,60,0.1)] border border-[rgba(255,130,60,0.2)] flex items-center justify-center mb-4">
                    <Mail size={18} className="text-[#FF823C]" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Message sent successfully!
                  </h3>
                  <p className="text-sm text-[#667085]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Thank you for reaching out. I'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label
                        className="block text-[11px] text-[#667085] mb-2 tracking-[0.1em] uppercase"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder-[#667085]/50 focus:outline-none focus:border-[rgba(255,130,60,0.3)] transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-[11px] text-[#667085] mb-2 tracking-[0.1em] uppercase"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      placeholder="What are you building?"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder-[#667085]/50 focus:outline-none focus:border-[rgba(255,130,60,0.3)] transition-colors resize-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#FF823C] text-[#040816] text-sm font-semibold hover:bg-[#ff8533] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.2} className="flex flex-col justify-center">
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, value, url }) => (
                <a
                  key={label}
                  href={url}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center group-hover:border-[rgba(255,255,255,0.12)] transition-colors">
                    <Icon size={14} className="text-[#667085] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#667085] tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {label}
                    </p>
                    <p className="text-sm text-[#B0B7C3] group-hover:text-white transition-colors truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-[#667085] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
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
              className="text-[11px] text-[#667085] hover:text-white transition-colors tracking-wider uppercase cursor-pointer"
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

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-[#161616] text-white">
      <NoiseOverlay />
      <Nav />
      <main className="relative z-10 bg-[#161616]">
        <Hero />
        <SelectedWork />
        <Capabilities />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
