import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const siteUrl = "https://mohamed-kchaou-portfolio.vercel.app";
const siteDescription =
  "Étudiant en licence informatique à la Faculté des Sciences de Sfax (Tunisie), passionné par le génie logiciel et l’algorithmique. Intéressé par Java, C++, Linux, Docker et le DevOps ; recherche un stage informatique.";

const sans = localFont({ src: "../fonts/InterTight.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const serif = localFont({
  src: [{ path: "../fonts/InstrumentSerif.woff2", style: "normal" }, { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic" }],
  variable: "--f-serif", weight: "400", display: "swap",
});
const mono = localFont({ src: "../fonts/JetBrainsMono.woff2", variable: "--f-mono", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kchaou Mohamed | Portfolio Informatique",
  description: siteDescription,
  alternates: { canonical: "/" },
  authors: [{ name: "Kchaou Mohamed", url: siteUrl }],
  creator: "Kchaou Mohamed",
  publisher: "Kchaou Mohamed",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Kchaou Mohamed | Portfolio Informatique",
    description: siteDescription,
    url: siteUrl,
    siteName: "Kchaou Mohamed | Portfolio Informatique",
    locale: "fr_TN",
    images: [{ url: "/og.jpg", alt: "Portfolio de Kchaou Mohamed" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kchaou Mohamed | Portfolio Informatique",
    description: siteDescription,
    images: ["/og.jpg"],
  },
};
export const viewport: Viewport = { themeColor: "#f4f2ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Kchaou Mohamed",
        alternateName: "Mohamed Kchaou",
        url: siteUrl,
        description: siteDescription,
        sameAs: [PROFILE.github, PROFILE.linkedin],
        knowsAbout: ["Informatique", "Génie logiciel", "Algorithmique", "Java", "C++", "Linux", "Docker", "DevOps"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Kchaou Mohamed | Portfolio Informatique",
        url: siteUrl,
        inLanguage: "fr-TN",
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
