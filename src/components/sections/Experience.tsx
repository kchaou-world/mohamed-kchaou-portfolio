"use client";
import { JOURNEY } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

export default function Experience() {
  const [ref, p] = useScrollProgress<HTMLDivElement>("cross");
  const n = JOURNEY.length;
  return (
    <section id="experience" className="sec">
      <div className="wrap">
        <SectionHead n="05" label="Parcours" em="chemin.">Mon</SectionHead>
        <div className="tl" ref={ref}>
          <div className="spine-line" aria-hidden="true"><i style={{ transform: `scaleY(${p})` }} /></div>
          <ol>
            {JOURNEY.map((j, i) => (
              <li key={j.title} className={p > (i + 0.35) / (n + 1) ? "lit" : ""}>
                <span className="dot" aria-hidden="true" />
                <p className="mini">{j.when}</p><h3>{j.title}</h3><p className="place">{j.place}</p><p className="det">{j.detail}</p>
              </li>
            ))}
            <li className={`next ${p > 0.92 ? "lit" : ""}`}><span className="dot" aria-hidden="true" />
              <div className="nextcard"><p className="mini">Next</p><h3>Votre équipe ?</h3><p className="det">Stage PFE · février – juin 2027</p></div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
