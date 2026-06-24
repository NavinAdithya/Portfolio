import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";

export function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
