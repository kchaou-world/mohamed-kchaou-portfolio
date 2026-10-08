"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

function Lanyard() {
  const wrap = useRef<HTMLDivElement>(null);
  const swing = useRef<HTMLDivElement>(null);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const w = wrap.current, s = swing.current; if (!w || !s) return;
    const calm = prefersReducedMotion();
    let ang = 0, vel = 0, last = 0, lastX: number | null = null, raf = 0, on = false, t0 = performance.now();
    const move = (e: PointerEvent) => {
      if (lastX !== null) vel += Math.max(-40, Math.min(40, e.clientX - lastX)) * 0.012; // vitesse du pointeur → angle
      lastX = e.clientX;
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      const idle = calm ? 0 : Math.sin((now - t0) / 1400) * 0.6; // léger balancement au repos
      vel += (-8 * (ang - idle) - 1.6 * vel) * dt; // ressort amorti
      ang += vel * dt * 6;
      ang = Math.max(-28, Math.min(28, ang));
      s.style.transform = `rotate(${ang.toFixed(3)}deg)`;
      raf = on ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting; if (on && !raf) { last = 0; raf = requestAnimationFrame(tick); }
    });
    io.observe(w);
    if (!calm) addEventListener("pointermove", move, { passive: true });
    return () => { io.disconnect(); removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="lanyard" ref={wrap}>
      <div className="swing" ref={swing}>
        <div className="strap" aria-hidden="true">
          <div className="strap-run">{Array.from({ length: 8 }).map((_, i) => <span key={i}>{PROFILE.name.toUpperCase()} · ÉTUDIANT INFORMATIQUE ·</span>)}</div>
        </div>
        <div className="metal" aria-hidden="true" />
        <button type="button" className={`idcard ${flip ? "is-flip" : ""}`} onClick={() => setFlip((f) => !f)}
          aria-pressed={flip} aria-label="Carte d'identité développeur. Activer pour retourner la carte.">
          <span className="idinner">
            <span className="face front">
              <span className="band">DEVELOPER ID</span>
              <span className="photo"><span className="ring"><Image src="/portrait-bust.webm" alt={`Portrait de ${PROFILE.name}`} width={128} height={156} priority /></span></span>
              <span className="who"><b>{PROFILE.name}</b><em>{PROFILE.role}</em></span>
              <span className="rows">
                <span><i>Dept.</i>Sciences Informatiques</span><span><i>Établ.</i>FSS · Sfax</span><span><i>Valid till</i>{PROFILE.validTill}</span>
              </span>
              <span className="foot"><span className="barcode" aria-hidden="true" /><span className="holo" aria-hidden="true" /></span>
            </span>
            <span className="face back">
              <span className="band">What I am</span>
              <span className="lines">
                <span>Étudiant en Licence 3 Informatique, majeur de promotion</span>
                <span>Bac Mathématiques · Mention Bien · 15,71 / 20</span>
                <span>Projets : application Java/SQL, réseau VLAN/OSPF</span>
                <span>3ème place nationale · Entrepreneuriat Social, 2019</span>
              </span>
              <span className="sign">{PROFILE.first}</span>
              <span className="found">If found, say hello · {PROFILE.email}</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function About() {
  const facts = [["Lieu", PROFILE.location], ["Formation", "Licence 3 Informatique · FSS"], ["Statut", PROFILE.seeking], ["Email", PROFILE.email]];
  return (
    <section id="about" className="sec about">
      <div className="wrap">
        <SectionHead n="01" label="À propos" em="moi.">Un peu plus sur</SectionHead>
        <div className="about-grid">
          <div className="about-l">
            <p className="hi rv">Salut, je suis <b>{PROFILE.first}</b>.</p>
            <p className="rv" style={{ ["--i" as string]: 1 }}>{PROFILE.summary}</p>
            <p className="rv" style={{ ["--i" as string]: 2 }}>{PROFILE.extra}</p>
            <div className="cta rv" style={{ ["--i" as string]: 3 }}>
              <a className="btn btn-p" href={PROFILE.resume} download>Résumé ↓</a>
              <a className="btn btn-s" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="btn btn-s" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <Lanyard />
          <aside className="about-r rv" aria-label="Faits rapides">
            <h3 className="mini">Quick facts</h3>
            <dl>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <blockquote>« Curieux de nature, ouvert aux nouvelles idées et toujours prêt à découvrir autrement. »</blockquote>
          </aside>
        </div>
      </div>
    </section>
  );
}
