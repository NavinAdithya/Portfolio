import { useCallback } from "react";

export function useScrollTo() {
  return useCallback((href: string) => {
    const element = document.querySelector(href);
    if (!element) return;
    
    let targetY = element.getBoundingClientRect().top + window.scrollY;
    
    // If we're at the top (Hero section is active), elements in <main> are shifted up by up to 800px.
    if (window.scrollY < 800 && href !== "#hero") {
      targetY += (800 - window.scrollY);
    }

    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);
}
