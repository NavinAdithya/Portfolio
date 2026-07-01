import { useCallback } from "react";

export function useScrollTo() {
  return useCallback((href: string) => {
    const element = document.querySelector(href);
    if (!element) return;
    
    let targetY = 0;

    if (href === "#work") {
      targetY = 800; // Hardcode exactly to Hero spacer height to guarantee perfect alignment
    } else {
      targetY = element.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY < 800 && href !== "#hero") {
        targetY += (800 - window.scrollY);
      }
    }

    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(targetY, { duration: 1.5 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);
}
