/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

// Logos de marque officiels (devicon, licence MIT) : fichier + teinte du halo.
export const BRAND: Record<string, { file: string; tint: string }> = {
  C: { file: "c", tint: "#5c6bc0" }, "C++": { file: "cplusplus", tint: "#0288d1" }, Java: { file: "java", tint: "#e76f00" },
  Python: { file: "python", tint: "#3776ab" }, PHP: { file: "php", tint: "#777bb3" }, JavaScript: { file: "javascript", tint: "#f0db4f" },
  "HTML/CSS": { file: "html5", tint: "#e34f26" }, Docker: { file: "docker", tint: "#2496ed" }, "Git/GitHub": { file: "git", tint: "#f05032" },
  Linux: { file: "linux", tint: "#fcc624" }, Unity: { file: "unity", tint: "#888" }, "VS Code": { file: "vscode", tint: "#007acc" },
  "IntelliJ IDEA": { file: "intellij", tint: "#fe315d" }, Eclipse: { file: "eclipse", tint: "#2c2255" },
  MySQL: { file: "mysql", tint: "#00758f" }, "PL/SQL": { file: "oracle", tint: "#f80000" }, GitHub: { file: "github", tint: "#000" },
};
export const isBrand = (n: string) => n in BRAND;

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const node = (cx: number, cy: number) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="2.4" {...P} />;
// Icônes « concept » : traits fins, même style.
export const CONCEPT: Record<string, ReactNode> = {
  "TCP/IP": <>{[[12, 5], [5, 18], [19, 18]].map(([x, y]) => node(x, y))}<path d="M12 7.4 6 16M12 7.4l6 8.6M7.4 18h9.2" {...P} /></>,
  "IPv4/IPv6": <><rect x="3" y="6" width="18" height="12" rx="2" {...P} /><path d="M7 10v4M11 10v4M15 10v4M19 10v4" {...P} /></>,
  VLAN: <><rect x="3" y="3" width="8" height="8" rx="1.5" {...P} /><rect x="13" y="3" width="8" height="8" rx="1.5" {...P} /><rect x="8" y="13" width="8" height="8" rx="1.5" {...P} /></>,
  STP: <><circle cx="12" cy="5" r="2.4" {...P} /><path d="M12 7.4V12M5 12h14M5 12v4M19 12v4" {...P} />{node(5, 18)}{node(19, 18)}</>,
  OSPF: <><circle cx="6" cy="6" r="2.4" {...P} /><circle cx="18" cy="8" r="2.4" {...P} /><circle cx="9" cy="18" r="2.4" {...P} /><path d="M8.2 7l7.5.8M7 8.2l1.5 7.5M11.3 17l5.6-7" {...P} /></>,
  RIP: <><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" {...P} /><path d="M18 3v4h-4M6 21v-4h4" {...P} /></>,
  "Cisco Packet Tracer": <><rect x="3" y="13" width="18" height="6" rx="1.5" {...P} /><path d="M7 16h.01M11 16h.01M8 13V8M12 13V5M16 13V8" {...P} /></>,
  "Réalité Augmentée": <><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9" {...P} /></>,
  POO: <><rect x="3" y="3" width="18" height="6" rx="1.5" {...P} /><rect x="3" y="15" width="7" height="6" rx="1.5" {...P} /><rect x="14" y="15" width="7" height="6" rx="1.5" {...P} /><path d="M12 9v3M6.5 15v-3h11v3" {...P} /></>,
  UML: <><rect x="3" y="4" width="18" height="16" rx="1.5" {...P} /><path d="M3 9h18M3 14h18" {...P} /></>,
  Web: <><circle cx="12" cy="12" r="9" {...P} /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" {...P} /></>,
};

export default function TechLogo({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const b = BRAND[name];
  if (b) return <img src={`/logos/${b.file}.svg`} alt="" width={size} height={size} className={className} loading="lazy" />;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      {CONCEPT[name] ?? <circle cx="12" cy="12" r="6" {...P} />}
    </svg>
  );
}
