"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { getLenis, scrollToTarget } from "@/lib/scroll";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLUListElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0, on: false });

  useEffect(() => {
    let raf = 0;
    const on = () => { if (raf) return; raf = requestAnimationFrame(() => {
      raf = 0; const max = document.documentElement.scrollHeight - innerHeight;
      setScrolled(scrollY > 40);
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    }); };
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    const hero = document.getElementById("top"); if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const a = pill.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    setInd(a ? { x: a.offsetLeft, w: a.offsetWidth, on: true } : (s) => ({ ...s, on: false }));
  }, [active, scrolled]);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis(); lenis?.stop(); document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => { lenis?.start(); document.body.style.overflow = ""; removeEventListener("keydown", k); };
  }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToTarget(id), open ? 60 : 0); };

  return (
    <>
      <div className="progress" aria-hidden="true"><div ref={bar} /></div>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label={`${PROFILE.name}, retour en haut`}>
          <span className="mark">{PROFILE.initials}</span><span className="brand-name">{PROFILE.name}</span>
        </a>
        <nav aria-label="Navigation principale" className="pillnav">
          <ul ref={pill}>
            <li className="ind" aria-hidden="true" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.on ? 1 : 0 }} />
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} data-id={n.id} className={active === n.id ? "on" : ""}
                  aria-current={active === n.id ? "true" : undefined} onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="overlay" onClick={() => setOpen((o) => !o)}>{open ? "Fermer" : "Menu"}</button>
      </header>
      <div id="overlay" className={`overlay ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ["--i" as string]: i }}>
              <a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }}><small>{String(i + 1).padStart(2, "0")}</small>{n.label}</a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
