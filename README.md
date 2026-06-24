# Navin Adithya - Premium Portfolio 🚀

A highly interactive, production-grade developer portfolio built with React, TypeScript, Tailwind CSS v4, and Framer Motion. Designed with a strict focus on modern web engineering, elegant visual choreography (mimicking Apple/Linear aesthetics), and enterprise-ready architectural patterns.

## ✨ Features

- **Premium Modern UI**: Built with strict attention to modern design trends, including glassmorphism, dynamic stacking card choreography, and smooth gradients.
- **Hardware-Accelerated Animations**: High-performance, butter-smooth layout transitions powered by `framer-motion` and `lenis` smooth scrolling. Animations are explicitly offloaded to the GPU for solid 60fps rendering.
- **Dynamic Cinematic Hero**: Features a complex scrolling horizontal split-screen transition that unveils the rest of the application.
- **Modular Architecture**: A strictly component-driven architecture with clean separation of concerns between data, state management, layouts, and reusable UI primitives.
- **Fully Responsive Structure**: Impeccable scaling and structural integrity across mobile, tablet, and ultra-wide desktop monitors, featuring heavily tested mobile modal overflow handling.

## 🛠️ Tech Stack

- **Framework**: React 18 / Vite
- **Language**: TypeScript (with strict interfaces for data integrity)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion & Lenis (Smooth Scroll)
- **Icons**: Lucide React
- **Forms**: Web3Forms (Serverless Contact API)

## 📁 Project Structure

The project was recently refactored from a monolith into a highly scalable directory structure:

```text
src/
├── app/                  # Main Application Composition (App.tsx)
├── components/           
│   ├── layout/           # Shared Page Layouts (Nav, Footer)
│   ├── sections/         # Main Page Blocks (Hero, SelectedWork, Capabilities, Timeline, Contact)
│   └── ui/               # Reusable Primitives (Reveal, MagneticButton, AnimatedCounter, StackingCardTransition)
├── data/                 # Static Typed Data Stores (constants.ts)
├── hooks/                # Custom React Hooks (useLenis, useScrollTo)
├── styles/               # Global Styles and Tailwind Config (index.css, theme.css)
├── types/                # Global TypeScript Definitions (index.d.ts)
└── main.tsx              # React DOM Entry Point
```

## 🚀 Getting Started

Follow these instructions to run the portfolio locally on your machine.

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NavinAdithya/Portfolio.git
   cd Portfolio
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View in Browser:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
To generate a highly optimized static bundle:
```bash
npm run build
```

## 🎨 Theme System

The portfolio uses a sophisticated unified theme anchored around a custom "Peach" accent color with sleek dark-mode glass surfaces.

- **Primary Accent**: `#FF823C`
- **Dark Canvas**: `#040816`
- **Surface Gradients**: Radial & Linear overlays with `backdrop-blur-xl`

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
