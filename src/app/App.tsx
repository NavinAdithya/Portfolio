import { motion, useScroll, useTransform } from "motion/react";
import { useLenis } from "../hooks/useLenis";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { SelectedWork } from "../components/sections/SelectedWork";
import { Capabilities } from "../components/sections/Capabilities";
import { Timeline } from "../components/sections/Timeline";
import { Contact } from "../components/sections/Contact";
import { NoiseOverlay } from "../components/ui/NoiseOverlay";
import { StackingCardTransition } from "../components/ui/StackingCardTransition";
import "../styles/index.css";

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
