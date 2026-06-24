import { Layers, Cpu, Shield, Zap } from "lucide-react";
import type { IProject, ICapability, ITimelineEvent, INavLink } from "../types";

export const NAV_LINKS: INavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export const PROJECTS: IProject[] = [
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

export const CAPABILITIES: ICapability[] = [
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

export const TIMELINE: ITimelineEvent[] = [
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
