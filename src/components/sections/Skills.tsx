"use client";
import { useState } from "react";
import { FAMILIES, PROJECTS, SKILLS, type Family } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo, { BRAND } from "../ui/TechLogo";

const sym = (n: string) => {
  const w = n.replace(/[^A-Za-z0-9+ /]/g, "").split(/[ /]+/).filter(Boolean);
  if (n === "C++") return "C+";
  const s = w.length > 1 ? w[0][0] + w[1][0] : (w[0] ?? n).slice(0, 2);
  return s[0].toUpperCase() + (s[1] ?? "").toLowerCase();
};

export default function Skills() {
  const [filter, setFilter] = useState<Family | "all">("all");
  const [sel, setSel] = useState(0);
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  const s = SKILLS[sel];
  const used = PROJECTS.filter((p) => p.skills.includes(s.name));
  const tint = BRAND[s.name]?.tint;

  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <SectionHead n="02" label="Compétences" em="stack.">Le tableau périodique de mon</SectionHead>
        <div className="chips rv" role="group" aria-label="Filtrer par famille">
          {(["all", ...FAMILIES] as const).map((f) => (
            <button key={f} className={`chip ${filter === f ? "on" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f === "all" ? "Tous" : f}</button>
          ))}
        </div>
        <div className="pt-layout">
          <div className={`pt-grid ${seen ? "in" : ""}`} ref={ref}>
            {SKILLS.map((k, i) => (
              <button key={k.name} className={`tile ${filter !== "all" && k.family !== filter ? "dim" : ""} ${i === sel ? "sel" : ""}`}
                style={{ ["--d8" as string]: `${(Math.floor(i / 8) + (i % 8)) * 40}ms`, ["--d4" as string]: `${(Math.floor(i / 4) + (i % 4)) * 40}ms` }}
                onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={() => setSel(i)} aria-label={`${k.name}, ${k.family}`}>
                <small>{i + 1}</small><strong>{sym(k.name)}</strong><span>{k.name}</span><em>{k.family}</em>
              </button>
            ))}
          </div>
          <aside className="inspector" aria-live="polite">
            <div className="insp-logo" style={tint ? { ["--tint" as string]: tint } : undefined}>
              <TechLogo key={s.name} name={s.name} size={150} className="pop" />
            </div>
            <h3>{s.name}</h3>
            <p className="mini">{s.family}</p>
            <p className="insp-p">{used.length ? <>Utilisé dans : {used.map((p) => p.title).join(" · ")}</> : "Compétence listée dans le CV."}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
