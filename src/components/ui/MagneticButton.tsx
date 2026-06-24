import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticButton({
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
