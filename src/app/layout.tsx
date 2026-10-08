import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const sans = localFont({ src: "../fonts/InterTight.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const serif = localFont({
  src: [{ path: "../fonts/InstrumentSerif.woff2", style: "normal" }, { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic" }],
  variable: "--f-serif", weight: "400", display: "swap",
});
const mono = localFont({ src: "../fonts/JetBrainsMono.woff2", variable: "--f-mono", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.seeking,
  openGraph: { title: PROFILE.name, description: PROFILE.seeking, images: ["/og.jpg"], type: "website" },
};
export const viewport: Viewport = { themeColor: "#f4f2ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
