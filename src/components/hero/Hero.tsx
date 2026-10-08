"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const sec = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [ended, setEnded] = useState(false);
  const visible = useRef(true);
  const wantSound = useRef(true);
  const userPaused = useRef(false);
  const autoStartReady = useRef(false);

  useEffect(() => {
    const v = vid.current; if (!v) return;
    const playVideo = () => {
      if (wantSound.current) {
        v.muted = false;
        v.play().then(() => { setSound(true); setBlocked(false); }).catch(() => {
          v.muted = true; setBlocked(true); setSound(false); v.play().catch(() => {});
        });
      } else {
        v.play().catch(() => {});
      }
    };
    const startTimer = window.setTimeout(() => {
      autoStartReady.current = true;
      if (visible.current && !userPaused.current) playVideo();
    }, 1000);
    const unlock = () => {
      if (!autoStartReady.current || !wantSound.current || !visible.current || userPaused.current || v.ended) return;
      playVideo();
    };
    const ev = ["pointerdown", "keydown", "touchend"] as const;
    ev.forEach((e) => addEventListener(e, unlock, { passive: true }));
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.intersectionRatio >= 0.35;
      if (visible.current && autoStartReady.current && !userPaused.current && !v.ended) playVideo(); else v.pause();
    }, { threshold: [0, 0.35, 0.6, 1] });
    if (sec.current) io.observe(sec.current);
    return () => { window.clearTimeout(startTimer); io.disconnect(); ev.forEach((e) => removeEventListener(e, unlock)); };
  }, []);

  const toggle = () => {
    const v = vid.current; if (!v) return;
    if (v.ended) {
      v.currentTime = 0;
      userPaused.current = false;
      v.play().catch(() => {});
      setEnded(false);
    } else if (v.muted) { v.muted = false; wantSound.current = true; userPaused.current = false; autoStartReady.current = true; v.play().catch(() => {}); setSound(true); setBlocked(false); }
    else { v.muted = true; wantSound.current = false; userPaused.current = true; v.pause(); setSound(false); }
  };

  return (
    <section id="top" ref={sec} className="hero" aria-label="Introduction">
      <span className="ghost" aria-hidden="true">{PROFILE.first.toUpperCase()}</span>
      <div className="hero-video">
        <video ref={vid} muted playsInline preload="auto" onEnded={() => setEnded(true)} aria-label={`${PROFILE.name} se présente en vidéo`}>
          <source src="/hero/hero1.webm" type="video/webm" />
        </video>
        <button className={`snd ${blocked ? "ping" : ""}`} onClick={toggle} aria-label={ended ? "Rejouer la vidéo" : sound ? "Couper le son" : "Activer le son"} aria-pressed={sound}>
          {sound && !ended ? <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
            : <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>}
        </button>
      </div>
      <div className="hero-copy">
        <p className="tag rv is-in">{PROFILE.seeking}</p>
        <h1 className="hero-h rv-mask is-in"><span>{PROFILE.role}<i className="em">.</i></span></h1>
        <p className="hero-sub rv is-in" style={{ ["--i" as string]: 2 }}>{PROFILE.focus}</p>
        <div className="cta rv is-in" style={{ ["--i" as string]: 3 }}>
          <a className="btn btn-p" href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget("work"); }}>Voir les projets</a>
          <a className="btn btn-s" href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget("contact"); }}>Parlons-en</a>
          <a className="btn btn-s" href={PROFILE.resume} download>Résumé ↓</a>
        </div>
      </div>
    </section>
  );
}
