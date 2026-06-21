# Plan — Navin Adithya B Portfolio

## Context
The user provided a master prompt for a bold editorial + glassmorphism single-page portfolio for Navin Adithya B, a CS/Cybersecurity student. The brief is very specific: near-black background, giant condensed display headlines, frosted-glass cards, hot amber/orange accent (#ff7a1a), cursor-follow glow, marquee skill strip, scroll-reveal animations, and all real content provided.

## Aesthetic Decisions
- **Stance**: Kinetic editorial — full commitment to dark-field + oversized type + motion
- **Display font**: `Anton` (tall, condensed grotesk — distinct from overused Bebas Neue)
- **Body font**: `Inter` (clean, readable)
- **Accent script**: `Dancing Script` — one single word in the hero only
- **Accent color**: `#ff7a1a` (hot amber/orange)
- **Background**: `#0c0c0c` with subtle radial gradient noise texture via CSS
- **Glass panels**: `rgba(255,255,255,0.05)` fill, `blur(20px)`, `1px rgba(255,255,255,0.12)` border

## Files to Change
1. `src/styles/fonts.css` — Add Google Fonts imports (Anton, Inter, Dancing Script)
2. `src/styles/theme.css` — Update tokens for dark editorial theme (preserve @theme inline contract)
3. `src/app/App.tsx` — Full implementation (replace placeholder)

## Implementation Plan

### theme.css changes
Update `:root` tokens:
- `--background`: `#0c0c0c`
- `--foreground`: `#f4f4f2`
- `--card`: `rgba(255,255,255,0.05)`
- `--card-foreground`: `#f4f4f2`
- `--primary`: `#ff7a1a`
- `--primary-foreground`: `#0c0c0c`
- `--secondary`: `rgba(255,255,255,0.08)`
- `--muted`: `rgba(255,255,255,0.06)`
- `--muted-foreground`: `rgba(244,244,242,0.5)`
- `--accent`: `#ff7a1a`
- `--accent-foreground`: `#0c0c0c`
- `--border`: `rgba(255,255,255,0.12)`
- `--ring`: `#ff7a1a`
- `--radius`: `0.75rem`

### App.tsx sections

#### 1. Nav
- Fixed top, glass background on scroll (`backdrop-blur` + semi-transparent bg once `scrollY > 50`)
- Left: "NA" monogram in Anton
- Center: Work / Stack / Credentials / Log / Contact links (smooth-scroll `href="#section"`)
- Right: Green pulsing "Available for work" status badge + "Hire Me" amber CTA button
- Mobile: hamburger menu

#### 2. Hero
- Full-viewport-height section
- **Cursor-follow glow blob**: radial gradient div tracking `mousemove`, absolute positioned
- Giant display headline: "PORTFOLIO" in Anton at `clamp(4rem, 12vw, 14rem)`, tight letter-spacing, `text-[#f4f4f2]`
- One accent word "Creative" in Dancing Script italic in amber
- Name + role subtitle in Inter
- One-line pitch: "Building products at the intersection of software and security."
- Two CTAs: "View Work ↓" (amber filled) + "Download CV" (ghost border)
- Small badge: "B.E. CSE — Cyber Security · SRM Easwari · Chennai"
- Entry animation: staggered clip-path reveal using `motion/react` (variants with stagger)

#### 3. Marquee Strip
- Auto-scrolling horizontal strip of tech stack words (CSS `@keyframes marquee`, two duplicated lists for infinite loop)
- Amber separator dots between words
- Subtle `prefers-reduced-motion` pause

#### 4. Work / Projects (`id="work"`)
- Section header: "WORK" giant left-aligned Anton label
- 3 glass cards in a responsive grid (3-col desktop, 1-col mobile)
- Each card: project name in Anton, 1-2 line description, status badge ("Live ✓" in green), "View live ↗" link in amber
- Cards lift + glow on hover (`box-shadow` with amber tint)
- Projects: SK Bloom HR Solutions, ReqWise, SK Enterprises (all with real URLs)
- Scroll-triggered fade-up reveal via `motion/react` `whileInView`

#### 5. Stack (`id="stack"`)
- 5 glass panels arranged in an asymmetric grid: Frontend / Backend & Data / AI & Automation / Mobile & Tooling / Security
- Each panel has a category label in small Inter caps and glass pill tags for each tech
- Subtle amber glow on panel hover

#### 6. Credentials (`id="credentials"`)
- Section header: "CREDENTIALS" in Anton
- 4 glass cards (Google Cert, Tata Simulation, TryHackMe CTF, Hackathons)
- Each with icon (Lucide `Award`, `Shield`, `Terminal`, `Zap`), title, issuer, brief note

#### 7. Research / Log (`id="log"`)
- Terminal-style glass panel with blinking cursor
- Heading `> research_log.md` in monospace style
- Content: Research Intern, SRM Easwari, web dev domain, faculty-guided
- Amber `$` prompt prefix lines

#### 8. Contact (`id="contact"`)
- Large centered glass CTA panel
- Giant "LET'S TALK" headline
- Email link in amber
- Row of icon buttons: GitHub, LinkedIn, TryHackMe (using Lucide `Github`, `Linkedin`, `Globe` icons)
- Phone number subtle below

#### 9. Footer
- Minimal single-line: © 2024 Navin Adithya B + nav links repeated

### Animations
- Hero text: `motion/react` variants with `clipPath: "inset(0 100% 0 0)"` → `inset(0 0% 0 0)` stagger
- Sections: `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 40 }`
- Marquee: CSS `@keyframes marquee` (paused on `prefers-reduced-motion`)
- Cursor glow: `useEffect` + `mousemove` → `transform: translate(x, y)` on a fixed `radial-gradient` div
- Nav glass: `useState(scrolled)` → `useEffect` scroll listener

### Responsive
- Hero type: `clamp(3rem, 10vw, 13rem)` for display headline
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Nav: collapses to hamburger on mobile

## Verification
1. App renders without TS errors in the sandbox
2. All 8 sections are visible and styled
3. Links point to correct real URLs
4. Hover states on glass cards work
5. Marquee scrolls continuously
6. Cursor glow tracks mouse in hero section
