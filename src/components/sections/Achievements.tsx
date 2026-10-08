"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion, useInView, useScrollProgress } from "@/lib/hooks";

const ease = (t: number) => 1 - Math.pow(1 - t, 4);
const fmt = (v: number, d: number) => v.toFixed(d).replace(".", ",");

function Card({ a, i, near }: { a: (typeof ACHIEVEMENTS)[number]; i: number; near: boolean }) {
  const [ref, seen] = useInView<HTMLElement>(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) { setV(a.value); return; }
    let raf = 0; const t0 = performance.now();
    const f = (t: number) => { const k = Math.min(1, (t - t0) / 1400); setV(a.value * ease(k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, [seen, a.value]);
  return (
    <article ref={ref} className={`acard ${near ? "near" : ""}`}>
      <div className="atop">
        <span className="alogo" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 20h8M10 17h4v3h-4z" /></svg></span>
        <span className="mini">{String(i + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}</span>
      </div>
      <div className="abot">
        <div><h3>{a.label}</h3><p>{a.caption}</p><small>{a.detail}</small></div>
        <span className="anum" aria-label={`${a.pre}${fmt(a.value, a.decimals)}${a.post}`}><span aria-hidden="true">{a.pre}{fmt(v, a.decimals)}<sup>{a.post}</sup></span></span>
      </div>
    </article>
  );
}

export default function Achievements() {
  const [ref, p] = useScrollProgress<HTMLElement>("pinned");
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [near, setNear] = useState(0);

  useEffect(() => {
    const m = () => { const t = track.current; if (t) setTravel(Math.max(0, t.scrollWidth - innerWidth)); };
    m(); addEventListener("resize", m); return () => removeEventListener("resize", m);
  }, []);
  useEffect(() => {
    const t = track.current; if (!t) return; let best = 0, bd = 1e9;
    Array.from(t.querySelectorAll(".acard")).forEach((c, i) => {
      const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - innerWidth / 2);
      if (d < bd) { bd = d; best = i; }
    }); setNear(best);
  }, [p]);

  return (
    <section id="achievements" ref={ref} className="ach" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="ach-pin">
        <div className="wrap ach-head">
          <p className="tag">06 — Distinctions</p>
          <h2 className="hd">Les <i className="em">preuves.</i></h2>
          <div className="ach-bar" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>
        </div>
        <div className="ach-track" ref={track} style={{ transform: `translate3d(${-p * travel}px,0,0)` }}>
          {ACHIEVEMENTS.map((a, i) => <Card key={a.label} a={a} i={i} near={near === i} />)}
          <div className="aend">et ce n&apos;est qu&apos;un début →</div>
        </div>
      </div>
    </section>
  );
}
