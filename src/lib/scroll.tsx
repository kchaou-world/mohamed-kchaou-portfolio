"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export function scrollToTarget(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: id === "top" ? 0 : -8, duration: 1.2 });
  else window.scrollTo({
    top: id === "top" ? 0 : el.getBoundingClientRect().top + scrollY,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || matchMedia("(max-width: 760px), (pointer: coarse)").matches) return;
    lenis = new Lenis({ lerp: 0.1 });
    let raf = 0;
    const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}
