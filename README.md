# Portfolio — Mohamed Kchaou

Next.js 15 · React 19 · TypeScript 5 · Tailwind CSS 4 · Lenis (seule dépendance d'animation).
Tout le contenu vient du CV et se trouve dans `src/lib/data.ts`.

## Lancer
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Sections
| # | Section | Fichier | Animation |
|---|---------|---------|-----------|
| – | Hero | `hero/Hero.tsx` | vidéo en boucle, son au 1er geste, pause hors écran |
| 01 | À propos | `sections/About.tsx` | carte ID sur lanière : pendule amorti + flip 3D |
| 02 | Compétences | `sections/Skills.tsx` | tableau périodique, vague diagonale |
| 03 | Projets | `sections/Work.tsx` | accordéon extensible (2 projets du CV) |
| 04 | Certifications | `sections/Certifications.tsx` | rangée qui se remplit d'encre |
| 05 | Parcours | `sections/Experience.tsx` | ligne qui se trace au scroll |
| 06 | Distinctions | `sections/Achievements.tsx` | galerie horizontale épinglée + compteurs |
| 07 | Contact | `sections/Contact.tsx` | lettres qui rebondissent, badge rotatif |

Le CV n'a pas d'expérience professionnelle : « Expérience » devient « Parcours ».

## Reconstruire la vidéo du hero
```
python3 scripts/build-hero-assets.py chemin/vers/intro.mp4 [x y w h]
```
Nécessite `ffmpeg` et `numpy`. Recadrage par défaut 576×720 en x=337 (source 1280×720).
Produit `public/hero/hero.mp4`, `hero.webm`, `public/portrait-bust.webp`, `public/og.jpg`.

## Crédits
Logos : devicon (MIT, `public/logos/LICENSE-devicon.txt`). Les marques appartiennent à leurs propriétaires.
Polices auto-hébergées : Inter Tight, JetBrains Mono, Instrument Serif (SIL OFL, via Fontsource).
