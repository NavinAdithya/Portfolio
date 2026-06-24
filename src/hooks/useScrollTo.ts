import { useCallback } from "react";

export function useScrollTo() {
  return useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);
}
