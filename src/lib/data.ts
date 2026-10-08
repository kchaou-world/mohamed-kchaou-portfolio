// Source unique de vérité : tout vient du CV (cv.pdf). Rien d'inventé.
export const PROFILE = {
  name: "Mohamed Kchaou", first: "Mohamed", initials: "MK",
  role: "Étudiant en Licence Informatique",
  seeking: "Recherche d'un stage PFE · février – juin 2027",
  focus: "Développement logiciel / Génie logiciel / Systèmes d'information",
  email: "kchaoumohammed11@gmail.com", phone: "+216 99 790 025", phoneHref: "tel:+21699790025",
  location: "Sfax, Tunisie",
  github: "https://github.com/kchaou-world",
  linkedin: "https://www.linkedin.com/in/-kchaou-mohamed",
  resume: "/resume.pdf",
  validTill: "2027",
  summary:
    "Étudiant en 3ème année de Licence en Sciences Informatiques à la Faculté des Sciences de Sfax, majeur de promotion. Passionné par la programmation compétitive, les réseaux et le développement logiciel, avec des compétences acquises en formations (CCNA Introduction to Networks, Docker, AR) et en projets académiques (application Java/SQL, réseau VLAN/OSPF).",
  extra: "Curieux de nature, ouvert aux nouvelles idées et toujours prêt à découvrir autrement.",
  languages: "Anglais (professionnel) · Français (B2) · Arabe (natif)",
  interests: "Programmation compétitive, développement logiciel, réseaux, basketball",
};

export const NAV = [
  { id: "about", label: "À propos" }, { id: "skills", label: "Compétences" }, { id: "work", label: "Projets" },
  { id: "experience", label: "Parcours" }, { id: "achievements", label: "Distinctions" }, { id: "contact", label: "Contact" },
];

export const FAMILIES = ["Langages", "Réseaux", "Outils", "Développement"] as const;
export type Family = (typeof FAMILIES)[number];
export type Skill = { name: string; family: Family; logo?: string };
export const SKILLS: Skill[] = [
  { name: "C", family: "Langages", logo: "c" }, { name: "C++", family: "Langages", logo: "cplusplus" },
  { name: "Java", family: "Langages", logo: "java" }, { name: "Python", family: "Langages", logo: "python" },
  { name: "PHP", family: "Langages", logo: "php" }, { name: "JavaScript", family: "Langages", logo: "javascript" },
  { name: "HTML/CSS", family: "Langages", logo: "html5" },
  { name: "TCP/IP", family: "Réseaux" }, { name: "IPv4/IPv6", family: "Réseaux" }, { name: "VLAN", family: "Réseaux" },
  { name: "STP", family: "Réseaux" }, { name: "OSPF", family: "Réseaux" }, { name: "RIP", family: "Réseaux" },
  { name: "Cisco Packet Tracer", family: "Réseaux" },
  { name: "Docker", family: "Outils", logo: "docker" }, { name: "Git/GitHub", family: "Outils", logo: "git" },
  { name: "Linux", family: "Outils", logo: "linux" }, { name: "Unity", family: "Outils", logo: "unity" },
  { name: "VS Code", family: "Outils", logo: "vscode" }, { name: "IntelliJ IDEA", family: "Outils", logo: "intellij" },
  { name: "Eclipse", family: "Outils", logo: "eclipse" },
  { name: "Réalité Augmentée", family: "Développement" }, { name: "POO", family: "Développement" },
  { name: "UML", family: "Développement" }, { name: "MySQL", family: "Développement", logo: "mysql" },
  { name: "PL/SQL", family: "Développement", logo: "oracle" }, { name: "Web", family: "Développement" },
];

export const PROJECTS = [
  { id: "java", index: "01", title: "Application de gestion", kicker: "Java & SQL · 2025",
    description: "Développement d'une application Java (JavaFX) avec BDD relationnelle SQL : opérations CRUD et gestion des transactions.",
    features: ["Interface JavaFX", "Opérations CRUD", "Gestion des transactions", "BDD relationnelle SQL"],
    tech: ["Java", "MySQL", "PL/SQL"], skills: ["Java", "MySQL", "PL/SQL", "POO"] },
  { id: "net", index: "02", title: "Simulation réseau", kicker: "VLAN & OSPF · Cisco Packet Tracer · 2025",
    description: "Conception d'un réseau multi-VLAN d'entreprise avec routage inter-VLAN, STP et protocole OSPF.",
    features: ["Réseau multi-VLAN", "Routage inter-VLAN", "STP", "Protocole OSPF"],
    tech: ["Cisco Packet Tracer", "VLAN", "OSPF", "STP"], skills: ["VLAN", "STP", "OSPF", "Cisco Packet Tracer"] },
];

export const CERTIFICATIONS = [
  { title: "CCNA : Introduction to Networks", issuer: "Cisco Networking Academy", year: "2026" },
  { title: "Introduction to Docker", issuer: "Orange Digital Center, Faculté des Sciences de Sfax", year: "2026" },
  { title: "Développement AR – Vuforia & AR Foundation", issuer: "Orange Digital Center, FSS", year: "2026" },
];

export const JOURNEY = [
  { when: "Janv. 2019", title: "3ème place – Compétition Nationale d'Entrepreneuriat Social", place: "ENAU", detail: "Présentation d'un projet social innovant devant jury national : idéation, étude de besoins, pitch final." },
  { when: "Juin 2024", title: "Baccalauréat en Mathématiques – Mention Bien", place: "Lycée 9 Avril, Sfax, Tunisie", detail: "15,71 / 20" },
  { when: "Sept. 2024 – En cours", title: "Licence en Sciences Informatiques – Majeur de promotion", place: "Faculté des Sciences de Sfax, Tunisie", detail: "Algorithmique & structures de données, POO (C++, Java, Python), systèmes d'exploitation, BDD relationnelles, réseaux, génie logiciel, UML, développement web." },
  { when: "2026", title: "CCNA, Docker, Développement AR", place: "Cisco Networking Academy · Orange Digital Center", detail: "Trois formations certifiantes suivies en 2026." },
];

export const ACHIEVEMENTS = [
  { label: "Majeur de promotion", caption: "Licence en Sciences Informatiques", detail: "Faculté des Sciences de Sfax", value: 1, decimals: 0, pre: "N°", post: "" },
  { label: "Baccalauréat – Mention Bien", caption: "Mathématiques · Juin 2024", detail: "Lycée 9 Avril, Sfax", value: 15.71, decimals: 2, pre: "", post: "/20" },
  { label: "3ème place nationale", caption: "Compétition Nationale d'Entrepreneuriat Social", detail: "ENAU · Janv. 2019", value: 3, decimals: 0, pre: "", post: "ème" },
];
