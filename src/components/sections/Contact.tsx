"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

const letters = (s: string) => s.split("").map((c, i) => c === " " ? " " : <span className="ltr" key={i}>{c}</span>);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  return (
    <section id="contact" className="sec contact">
      <div className="wrap">
        <p className="tag rv">07 — Contact</p>
        <h2 className="big" aria-label="Construisons quelque chose ensemble.">
          <span aria-hidden="true">{letters("Construisons")}<br />{letters("quelque chose")} <i className="em">{letters("ensemble.")}</i></span>
        </h2>
        <div className="c-row">
          <div>
            <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <button className="copy" onClick={copy}>{copied ? "Copié ✓" : "Copier"}</button>
            <span className="sr" aria-live="polite">{copied ? "Adresse e-mail copiée" : ""}</span>
            <ul className="c-links">
              <li><a href={PROFILE.phoneHref}>{PROFILE.phone}</a></li>
              <li><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
              <li><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
            </ul>
          </div>
          <svg className="badge" viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
            <defs><path id="circ" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs>
            <text fontFamily="var(--f-mono)" fontSize="9.5" letterSpacing="3" fill="currentColor"><textPath href="#circ">DIRE BONJOUR · SAY HELLO · DIRE BONJOUR · SAY HELLO ·</textPath></text>
            <circle cx="60" cy="60" r="4" fill="currentColor" />
          </svg>
        </div>
        <footer className="foot-bar">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget("top"); }}>Retour en haut ↑</a>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
