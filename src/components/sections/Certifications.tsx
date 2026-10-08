import { CERTIFICATIONS } from "@/lib/data";
import SectionHead from "../ui/SectionHead";

export default function Certifications() {
  return (
    <section id="certifications" className="sec band-w">
      <div className="wrap certs">
        <div className="certs-l">
          <SectionHead n="04" label="Certifications" em="apprendre.">Toujours en train d&apos;</SectionHead>
          <p className="mini rv">{String(CERTIFICATIONS.length).padStart(2, "0")} formations · 2026</p>
        </div>
        <ol className="certs-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="rv" style={{ ["--i" as string]: i }}>
              <div className="crow" tabIndex={0}>
                <span className="cn">{String(i + 1).padStart(2, "0")}</span>
                <span className="ct"><b>{c.title}</b><small>{c.issuer}</small></span>
                <span className="cy">{c.year}</span><span className="ca" aria-hidden="true">↗</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
