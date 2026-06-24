import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function StackingCardTransition({ children }: { children: React.ReactNode[] }) {
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
