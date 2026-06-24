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
    name: "Eye Ease - Website",
    tagline: "Hackathon project for Dr. Agarwal's Eye Hospital enhancing eye care accessibility.",
    details: [
      "Designed intuitive layouts and workflows for hospital patients.",
      "Implemented responsive components for desktop & mobile.",
      "Added interactive elements for a smooth user experience.",
    ],
    tech: ["React", "Vite", "Tailwind CSS"],
    url: "https://navinadithya.github.io/Eye_Ease_Frontend_Website/",
    accent: "#3B82F6",
  },
  {
    name: "Eye Ease - Android UI/UX",
    tagline: "Android frontend interface for the Eye Ease hackathon project.",
    details: [
      "Designed an intuitive mobile app interface for patients.",
      "Focused on clean design principles and usability.",
      "Ensured accessibility and a seamless digital journey.",
    ],
    tech: ["UI/UX", "Frontend"],
    url: "https://navinadithya.github.io/Eye_Ease_UIUX_For_Android/",
    accent: "#10B981",
  },
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
    metric: "5 shipped",
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
    metric: "5 live",
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
    skills: ["Wireshark", "Linux", "TCP/IP", "SIEM", "Cryptography"],
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
    period: "2026",
    title: "SK Bloom HR Solutions",
    org: "Shipped",
    detail: "Enterprise HR platform · Live on Netlify",
    status: "done" as const,
    color: "#FF823C",
  },
  {
    period: "2026",
    title: "ReqWise + SK Enterprises",
    org: "Shipped",
    detail: "Requirements QA · Electrical contractor site",
    status: "done" as const,
    color: "#FF823C",
  },
  {
    period: "2026",
    title: "Eye Ease (Web & App)",
    org: "Shipped",
    detail: "Hackathon project for Dr. Agarwal's Eye Hospital",
    status: "done" as const,
    color: "#3B82F6",
  },
  {
    period: "2025",
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
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

// ─── Selected Work ───────────────────────────────────────────────────────────

function SelectedWork() {
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
                  className="w-full max-w-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 relative flex flex-col my-auto overflow-hidden"
                  style={{
                    boxShadow: `0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px ${p.accent}30`,
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

// ─── Capabilities ────────────────────────────────────────────────────────────

function Capabilities() {
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
                  className="w-full max-w-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 relative flex flex-col my-auto overflow-hidden"
                  style={{
                    boxShadow: `0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px ${cap.color}30`,
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

// ─── StackingCardTransition ───────────────────────────────────────────────────
function StackingCardTransition({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001,
  });

  // Base card subtly shrinks, dims, and blurs into the background as the next card covers it
  const scale = useTransform(smooth, [0.5, 1.0], [1, 0.92]);
  const opacity = useTransform(smooth, [0.6, 1.0], [1, 0.4]);
  const blur = useTransform(smooth, [0.5, 1.0], ["blur(0px)", "blur(12px)"]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 
        Base Card: Sticky to the top. 
        It locks into the viewport exactly like a background.
      */}
      <div className="sticky bottom-0 z-0 w-full overflow-hidden">
        <motion.div
          className="w-full flex flex-col justify-center"
          style={{
            scale,
            opacity,
            filter: blur,
            transformOrigin: "bottom center",
            willChange: "transform, opacity, filter",
          }}
        >
          {children[0]}
        </motion.div>
      </div>

      {/* 
        Rising Card: Natively scrolls up over the sticky base card. 
        Like a car window closing.
      */}
      <div
        className="relative z-10 w-full bg-[#040816]"
        style={{
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          boxShadow: "0px -30px 80px rgba(0,0,0,0.8)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {children[1]}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  useLenis();
  const { scrollY } = useScroll();
  const yRange = 800;
  const mainY = useTransform(scrollY, [0, yRange], [-yRange, 0]);
  const opacity = useTransform(scrollY, [0, 400, yRange], [0, 0.2, 1]);
  const scale = useTransform(scrollY, [0, yRange], [0.85, 1]);

  return (
    <div className="min-h-screen bg-[#040816] text-white overflow-x-hidden relative">
      <NoiseOverlay />
      <Nav />
      <Hero />
      <motion.main 
        style={{ y: mainY, opacity, scale }}
        className="relative z-10 bg-[#040816] origin-center"
      >
        <StackingCardTransition>
          <SelectedWork />
          <Capabilities />
        </StackingCardTransition>
        <Timeline />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  );
}
