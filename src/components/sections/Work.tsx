"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";

function UiJava() {
  return (
    <div className="mock"><div className="mock-bar"><i /><i /><i /></div>
      <div className="mock-tools"><b>+ Ajouter</b><b>Modifier</b><b>Supprimer</b></div>
      {[0, 1, 2, 3, 4].map((r) => <div className="mock-row" key={r}><u /><u /><u /></div>)}
      <div className="mock-foot"><b>Valider la transaction</b></div>
    </div>
  );
}
function UiNet() {
  const sw = [[70, 150], [190, 150], [310, 150]];
  return (
    <svg className="mock" viewBox="0 0 380 260" role="img" aria-label="Schéma simplifié d'un réseau multi-VLAN">
      <g fill="none" stroke="#0d0d0d" strokeOpacity=".55" strokeWidth="1.5">
        <circle cx="190" cy="48" r="26" /><path d="M190 74v30M70 104h240M70 104v28M190 104v28M310 104v28" />
        {sw.map(([x, y]) => <g key={x}><rect x={x - 34} y={y - 18} width="68" height="36" rx="8" /><path d={`M${x} ${y + 18}v28`} /><circle cx={x} cy={y + 58} r="12" fill="#e9e6e0" /></g>)}
      </g>
      <g fontFamily="var(--f-mono)" fontSize="11" fill="#0d0d0d" textAnchor="middle">
        <text x="190" y="52">OSPF</text>{["VLAN A", "VLAN B", "VLAN C"].map((t, i) => <text key={t} x={sw[i][0]} y={154}>{t}</text>)}
      </g>
    </svg>
  );
}

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SectionHead n="03" label="Projets académiques" em="construit.">Ce que j&apos;ai</SectionHead>
        <div className="acc rv">
          {PROJECTS.map((p, i) => {
            const on = open === i;
            return (
              <article key={p.id} className={`panel ${on ? "open" : ""}`} onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}>
                <button className="spine" onClick={() => setOpen(i)} onFocus={() => setOpen(i)} aria-expanded={on} aria-controls={`pn-${p.id}`}>
                  <small>{p.index}</small><span>{p.title}</span><b aria-hidden="true">+</b>
                </button>
                <div className="pbody" id={`pn-${p.id}`}>
                  <div className="pl">
                    <p className="tag">{p.index} — {p.kicker}</p>
                    <h3>{p.title}</h3>
                    <p className="pdesc">{p.description}</p>
                    <ul className="feat">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                    <div className="tech">{p.tech.map((t) => <span key={t}><TechLogo name={t} size={16} />{t}</span>)}</div>
                  </div>
                  <figure className="pr">
                    {p.id === "java" ? <UiJava /> : <UiNet />}
                    <figcaption>Interface illustrative</figcaption>
                  </figure>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
