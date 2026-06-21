# Master Prompt — Navin Adithya B Portfolio (Bold Editorial + Glassmorphism)

Use this as a single, complete brief to generate the portfolio from scratch (e.g. paste into Claude, Figma Make, or any AI builder).

---

## 1. Creative Direction

Build a **bold, oversized-typography, single-page portfolio** that feels like a cross between a Canva "Black & Orange Bold Creative Portfolio" template and a glassmorphic SaaS product page. Two visual languages, used in different sections:

- **Hero & section dividers → Editorial/Giant Type.** Huge, edge-to-edge display headlines (think "PORTFOLIO" spanning the full viewport width) with a portrait/photo or abstract visual punching through or layered behind the letters. High contrast: near-black background, off-white type, one loud accent color used sparingly (not desaturated indigo — something with personality, e.g. a hot amber/orange or electric lime).
- **Cards & interactive panels → Glassmorphism.** Frosted-glass panels (`backdrop-filter: blur()`, semi-transparent white/black fills, soft 1px light borders, subtle drop shadow) for skill tags, project cards, and credential cards — floating over a dark, slightly textured or gradient-mesh background, similar to the "Working Prototype / Glassmorphism / Fully Auto Layout" reference panel.

Avoid: generic SaaS-indigo-gradient look, generic Bootstrap card grids, stock-photo corporate vibes, anything that looks like a template with the name swapped in.

## 2. Typography

- Display/headline face: a tall, bold, condensed grotesk (e.g. Archivo Black, Anton, or Bebas Neue) for giant hero type.
- Body/UI face: a clean grotesk (e.g. Inter, General Sans, or Satoshi).
- Optional accent script/italic face for one or two flourish words (e.g. "Creative" in the Canva reference) — use sparingly, only for a single accent word in the hero, not throughout.
- Type scale should be dramatic: hero headline at 9–14vw on desktop, tight letter-spacing, full-bleed.

## 3. Color System

- Background: near-black (#0a0a0a–#111) with a faint gradient-mesh or grain texture, not flat.
- Primary text: off-white (#f4f4f2).
- Accent: pick ONE loud, energetic color and use it for CTAs, glow effects, link hovers, and one hero word — e.g. amber/orange (#ff7a1a) or electric lime (#c6ff3d). Do not mix in a second saturated accent.
- Glass panels: rgba(255,255,255,0.04–0.08) fill, 1px rgba(255,255,255,0.12) border, blur(16–24px).

## 4. Signature Interactions / Animation

- Giant hero text animates in with a staggered reveal (clip-path or mask wipe) on load.
- A subtle marquee or auto-scrolling strip of skill/stack words behind or beneath the hero.
- Glass project/credential cards lift and intensify their blur/glow on hover; image or icon inside parallaxes slightly on mouse move.
- Smooth scroll with scroll-triggered fade/slide reveals per section (GSAP + ScrollTrigger or CSS scroll-timeline).
- A toggle or pill (top-right, like the orange switch in reference image 1) is a nice optional UI flourish — could be repurposed as a dark/light or "available for work" status toggle.
- Subtle cursor-follow glow blob in the hero (radial gradient div tracking mouse position) to echo the glassmorphism reference's hand/glow imagery, without using a real photo.

## 5. Site Structure / Sections

1. **Nav** — name/monogram left, Work / Stack / Credentials / Log / Contact center or right, status pill or CTA button, glass background on scroll.
2. **Hero** — giant "PORTFOLIO" or "BUILDER" style display word(s) as the visual anchor, name + role line, one-line pitch, two CTAs (View Work / Download CV), small live-status badge.
3. **Work / Projects** — glass cards in a grid (not a strict pipeline/timeline), each with project name, 1–2 line description, status badge, "View live ↗" link. Use the three real shipped projects (SK Bloom HR Solutions, ReqWise, SK Enterprises).
4. **Stack** — glass pill/tag cloud or categorized glass panels: Frontend, Backend & Data, AI & Automation, Mobile & Tooling, Security.
5. **Credentials** — glass cards: Google Cybersecurity Professional Certificate, Tata Cybersecurity Security Analyst Job Simulation, TryHackMe CTF profile, in-college hackathons.
6. **Research / Log** — current research internship at SRM Easwari Engineering College (web development domain), framed as a short glass panel or terminal-style log, not a generic "About" wall of text.
7. **Contact** — large glass CTA panel, email button, GitHub/LinkedIn/TryHackMe icons.
8. **Footer** — minimal, repeats key links.

## 6. Real Content to Use (do not invent additional facts)

- **Name:** Navin Adithya B
- **Role:** B.E. Computer Science & Engineering — Cyber Security, 3rd year
- **College:** SRM Easwari Engineering College, Ramapuram, Chennai · Expected Graduation 2028 · CGPA 7.93/10
- **Location:** Chennai, Tamil Nadu, India
- **Email:** navinadithya394@gmail.com
- **Phone:** +91 70945 43971
- **GitHub:** https://github.com/NavinAdithya
- **LinkedIn:** https://www.linkedin.com/in/navin-adithya-540448348
- **TryHackMe:** https://tryhackme.com/p/NavinAdithya
- **Research:** Research Intern, SRM Easwari Engineering College — web development domain, faculty-guided
- **Projects (real, live):**
  - SK Bloom HR Solutions — https://sk-bloom-hr-solutions.netlify.app/ — enterprise HR platform, compliance risk prevention, audits, onboarding, policy management
  - ReqWise — https://navinadithya.github.io/ReqWise/#/login — software requirements QA platform, admin review flows, client decision tracking, requirement versioning
  - SK Enterprises — https://www.skenterprisesurapakkam.in/ — ESB-grade electrical contractor site, live grid console UI, transformer/VCB project showcase
- **Stack:** Java, Python, JavaScript, TypeScript, React, Node.js, Express, FastAPI, Tailwind CSS, MongoDB, Claude API, Gemini API, n8n, Flowise, Git, Netlify, Vite, Android
- **Security skills:** Linux, Wireshark, TCP/IP & networking fundamentals, SIEM simulation, vulnerability awareness
- **Credentials:** Google Cybersecurity Professional Certificate; Tata Cybersecurity Security Analyst Job Simulation; CTF practice on TryHackMe (cryptography, reconnaissance); in-college hackathons at SRM Easwari Engineering College

## 7. Technical Requirements

- Single-file HTML/CSS/JS (no build step), GSAP + ScrollTrigger via CDN for animation.
- Fully responsive — giant hero type must scale down gracefully on mobile (switch to a smaller display size, not literal viewport-width clipping).
- Respect `prefers-reduced-motion`.
- Accessible: visible focus states, semantic headings, sufficient contrast for body text even on dark glass panels.
- "Download CV" button links to `Navin_Adithya_Resume.pdf` (relative path, same folder as the page).
- No tracking, no fake testimonials, no placeholder content — every section must map to a real fact listed above.

---

**Output:** one complete `index.html` implementing all of the above.