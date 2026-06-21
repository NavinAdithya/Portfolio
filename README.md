# Navin Adithya - Portfolio 🚀

A highly interactive, premium developer portfolio built with React, TypeScript, and Framer Motion. Designed to showcase modern web engineering, cybersecurity expertise, and production-ready deployments.


## ✨ Features

- **Premium Modern UI**: Built with strict attention to modern design trends, including glassmorphism, dynamic scrolling layouts, and soft drop shadows.
- **Interactive Terminal Graphic**: A fully animated, CSS-rendered terminal in the Hero section typing out personal details and tech stack using Framer Motion.
- **Smooth Animations**: High-performance, butter-smooth layout transitions and micro-interactions powered by `framer-motion` and `lenis` smooth scrolling.
- **Dynamic Glassmorphism Navbar**: A smart navigation bar that instantly adapts its text color and background blur depending on whether it is hovering over a light or dark section.
- **Fully Responsive Architecture**: Impeccable scaling and structural integrity across mobile, tablet, and ultra-wide desktop monitors.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with custom design system variables)
- **Animation**: Framer Motion & Lenis (Smooth Scroll)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Getting Started

Follow these instructions to run the portfolio locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NavinAdithya/portfolio.git
   cd portfolio
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
   Open [http://localhost:5173](http://localhost:5173) in your browser to see the portfolio.

## 📁 Project Structure

```text
src/
├── app/                  # Main Application Component (App.tsx)
├── components/           # Reusable UI Components (HeroOrb, IdentityCard, etc.)
├── styles/               # Global Styles and Theme Tokens (theme.css, index.css)
├── imports/              # Static Assets & Design Files
└── main.tsx              # React DOM Entry Point
```

## 🎨 Theme System

The portfolio uses a sophisticated unified theme anchored around a custom "Peach" accent color.

- **Primary Accent**: `#FF823C`
- **Dark Canvas**: `#161616`
- **Light Typography**: `#FFFFFF` / `#B0B7C3`
- **Dark Typography**: `#111111` / `#555555`

These are managed via centralized Tailwind configuration and raw CSS variables.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
