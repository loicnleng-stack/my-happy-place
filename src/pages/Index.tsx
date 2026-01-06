import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Share2, Facebook, ExternalLink, FileText, ChevronRight } from "lucide-react";

// Import minister images
import lucFrieden from "@/assets/ministers/luc-frieden.png";
import xavierBettel from "@/assets/ministers/xavier-bettel.png";
import marcSpautz from "@/assets/ministers/marc-spautz.png";
import martineHansen from "@/assets/ministers/martine-hansen.png";
import claudeMeisch from "@/assets/ministers/claude-meisch.png";
import lexDelles from "@/assets/ministers/lex-delles.png";
import yurikoBaackes from "@/assets/ministers/yuriko-backes.png";
import maxHahn from "@/assets/ministers/max-hahn.png";
import gillesRoth from "@/assets/ministers/gilles-roth.png";
import martineDeprez from "@/assets/ministers/martine-deprez.png";
import leonGloden from "@/assets/ministers/leon-gloden.png";
import stephanieObertin from "@/assets/ministers/stephanie-obertin.png";
import sergeWilmes from "@/assets/ministers/serge-wilmes.png";
import elisabethMargue from "@/assets/ministers/elisabeth-margue.png";
import ericThill from "@/assets/ministers/eric-thill.png";
import dossierGouvernement from "@/assets/dossier-gouvernement-2023.png";

const governmentMembers = [
  { name: "FRIEDEN Luc", role: "Premier ministre, ministre d'État", image: lucFrieden },
  { name: "BETTEL Xavier", role: "Vice-Premier ministre, Ministre des Affaires étrangères", image: xavierBettel },
  { name: "SPAUTZ Marc", role: "Ministre du Travail", image: marcSpautz },
  { name: "HANSEN Martine", role: "Vice-Première ministre, Ministre de l'Agriculture", image: martineHansen },
  { name: "MEISCH Claude", role: "Ministre de l'Éducation nationale", image: claudeMeisch },
  { name: "DELLES Lex", role: "Ministre des Classes moyennes", image: lexDelles },
  { name: "BACKES Yuriko", role: "Ministre de la Mobilité", image: yurikoBaackes },
  { name: "HAHN Max", role: "Ministre des Sports", image: maxHahn },
  { name: "ROTH Gilles", role: "Ministre des Finances", image: gillesRoth },
  { name: "DEPREZ Martine", role: "Ministre de la Santé", image: martineDeprez },
  { name: "GLODEN Léon", role: "Ministre de l'Intérieur", image: leonGloden },
  { name: "OBERTIN Stéphanie", role: "Ministre de la Digitalisation", image: stephanieObertin },
  { name: "WILMES Serge", role: "Ministre de l'Environnement", image: sergeWilmes },
  { name: "MARGUE Elisabeth", role: "Ministre de la Justice", image: elisabethMargue },
  { name: "THILL Eric", role: "Ministre de la Culture", image: ericThill },
];

const agendaItems = [
  { date: "Le 06.01.2026", text: "Grippe aviaire sous contrôle: levée des mesures de confinement et réouverture des expositions avicoles" },
  { date: "Le 06.01.2026", text: "Visite de travail à Luxembourg du ministre des Affaires extérieures de l'Inde, Dr Subrahmanyam Jaishankar" },
  { date: "Le 06.01.2026", text: "Dépistage du déficit immunitaire combiné sévère (SCID): le Luxembourg renforce son programme de dépistage néonatal" },
  { date: "Le 06.12.2026 à 10:30", text: "Présentation d'un paquet de mesures \"Mateneen. Fir all Famill. Fir all Kand.\": classe d'impôt unique, chèque-service accueil, allocation familiale" },
];

const interviews = [
  { title: "\"Das Sportmuseum wird nicht meine erste Priorität sein\"", source: "Interview mam Martine Hansen im Luxemburger Wort" },
  { title: "Yuriko Backes:\"Je comprends la frustration de ceux qui trouvent que les trajets prennent trop de temps\"", source: "Interview de Yuriko Backes avec virgule.lu" },
  { title: "Marc Spautz, sind Sie nun eine Konkurrenz für Luc Frieden?", source: "Interview mit Marc Spautz im Luxemburger Wort" },
];

const dossiers = [
  { title: "La formation du gouvernement 2023", description: "" },
  { title: "L'engagement du gouvernement pour l'accessibilité numérique", description: "L'égalité est un des principes fondamentaux de notre démocratie. Tous les sites Internet et les applications mobiles des organismes publics sont soumis à une exigence de non-discrimination des usagers, en particulier sur la question du handicap." },
];

const publications = [
  { title: "à propos... de l'histoire du Luxembourg", description: "Cette brochure présente succinctement l'évolution du Luxembourg du Xe siècle à nos jours. Une timeline présente au fil des pages les dates-clés de l'histoire du Luxembourg.", languages: "Français, Anglais, Allemand" },
  { title: "À propos... des langues au Luxembourg", description: "L'usage linguistique dans le Grand-Duché de Luxembourg - 2025", languages: "Français, Anglais, Allemand, Luxembourgeois" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"une" | "toutes">("une");
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* À la Une Section */}
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light text-foreground">À la Une</h2>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main News */}
            <div className="lg:col-span-2 animate-fade-in">
              <Link to="/actualites" className="group block">
                <div className="aspect-video bg-primary relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40 flex items-center justify-center">
                    <div className="text-center text-primary-foreground p-8">
                      <div className="w-16 h-16 mx-auto mb-4 opacity-80">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
                        </svg>
                      </div>
                      <p className="text-sm uppercase tracking-widest">Le Gouvernement</p>
                      <p className="text-sm uppercase tracking-widest">du Grand-Duché de Luxembourg</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mt-4 group-hover:underline transition-colors">
                  Présentation d'un paquet de mesures "Mateneen. Fir all Famill. Fir all Kand.": classe d'impôt unique, chèque-service accueil, allocation familiale
                </h3>
                <p className="text-sm text-primary mt-2">06.01.2026</p>
                <p className="text-muted-foreground mt-2">Le livestreaming débute vers 10h30.</p>
              </Link>
            </div>

            {/* Side News */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Link to="/actualites" className="group block">
                <h3 className="text-lg font-semibold text-primary group-hover:underline">
                  Nouveautés 2026
                </h3>
                <p className="text-sm text-muted-foreground mt-1">29.12.2025</p>
                <p className="text-sm text-foreground mt-2">
                  De nouvelles dispositions légales et réglementaires concernant directement le citoyen vont entrer en vigueur en 2026. Voici un aperçu des principaux changements qui ont un impact direct sur les citoyens. Cette liste n'est pas exhaustive.
                </p>
              </Link>

              <Link to="/actualites" className="group block">
                <h3 className="text-lg font-semibold text-primary group-hover:underline">
                  Communiqué du gouvernement luxembourgeois sur la situation au Venezuela
                </h3>
                <p className="text-sm text-muted-foreground mt-1">04.01.2026</p>
                <p className="text-sm text-foreground mt-2">
                  Le gouvernement suit de près les événements au Venezuela, suite à l'opération militaire américaine lors de laquelle Nicolas Maduro et son épouse ont été capturés et transférés en dehors du pays.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="container py-4">
          <div className="flex justify-center border-t border-b border-border py-4">
            <button
              onClick={() => setActiveTab("une")}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wide transition-colors border ${
                activeTab === "une"
                  ? "bg-background border-border text-foreground"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Actualités à la une
            </button>
            <button
              onClick={() => setActiveTab("toutes")}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wide transition-colors border ${
                activeTab === "toutes"
                  ? "bg-background border-border text-foreground"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Toutes les actualités
            </button>
          </div>
        </section>

        {/* État de la Nation + Facebook Section */}
        <section className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* État de la Nation */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-muted/50 p-8 rounded-sm">
                <h3 className="text-2xl font-light text-primary mb-4">État de la Nation 2025</h3>
                <p className="text-foreground mb-6">
                  Trouvez ici la{" "}
                  <Link to="#" className="text-primary hover:underline">
                    déclaration de politique générale sur l'état de la nation 2025 par Luc Frieden
                  </Link>{" "}
                  ainsi que les illustrations correspondantes.
                </p>
                <div className="bg-amber-500 rounded-sm p-8 aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-white">
                    <p className="text-lg italic mb-2">Progrès par la</p>
                    <h4 className="text-5xl font-bold mb-4">Stabilité</h4>
                    <p className="text-lg italic">par le progrès</p>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm">
                    <p>État de la</p>
                    <p className="font-bold">Nation 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Facebook */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-2xl font-light text-foreground mb-4 flex items-center gap-2">
                <Facebook className="w-6 h-6" />
                Facebook
              </h3>
              <div className="border border-border rounded-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">🦁</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Gouvernement luxembourgeois</p>
                    <p className="text-xs text-muted-foreground">il y a 6 jours</p>
                  </div>
                </div>
                <div className="aspect-square bg-muted rounded-sm mb-4 overflow-hidden">
                  <img src={lucFrieden} alt="Luc Frieden" className="w-full h-full object-cover" />
                </div>
                <Link
                  to="#"
                  className="block text-center py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide hover:bg-muted transition-colors"
                >
                  Le gouvernement sur Facebook
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Agenda + Interviews Section */}
        <section className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agenda */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-muted/50 p-8 rounded-sm">
                <h3 className="text-2xl font-light text-primary mb-6">Agenda du gouvernement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agendaItems.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <p className="text-sm font-semibold text-primary">■ {item.date}</p>
                      <p className="text-sm text-foreground mt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    to="/agenda"
                    className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide hover:bg-muted transition-colors"
                  >
                    Tout l'agenda
                  </Link>
                </div>
              </div>
            </div>

            {/* Interviews */}
            <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-2xl font-light text-foreground mb-6">Interviews</h3>
              <div className="space-y-6">
                {interviews.map((interview, index) => (
                  <Link key={index} to="#" className="group block">
                    <h4 className="text-lg font-semibold text-primary group-hover:underline">
                      {interview.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{interview.source}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="#"
                  className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide hover:bg-muted transition-colors"
                >
                  Toutes les interviews
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dossiers Section */}
        <section className="container py-8">
          <h2 className="text-3xl font-light text-foreground mb-8">Dossiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First dossier - Photo style */}
            <Link
              to="#"
              className="group block animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="aspect-video overflow-hidden rounded-sm">
                <img
                  src={dossierGouvernement}
                  alt="La formation du gouvernement 2023"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mt-4 group-hover:underline">
                La formation du gouvernement 2023
              </h3>
            </Link>

            {/* Second dossier - Card with description */}
            <Link
              to="#"
              className="group block animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="relative">
                {/* Blue tech background */}
                <div className="aspect-video bg-primary relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-4 opacity-30">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-primary-foreground/20 rounded-full" />
                      ))}
                    </div>
                    <div className="absolute right-4 top-4 text-primary-foreground/40 text-6xl font-light">@</div>
                  </div>
                </div>
                {/* Description box */}
                <div className="bg-sky-50 p-4">
                  <h3 className="text-lg font-semibold text-primary group-hover:underline">
                    L'engagement du gouvernement pour l'accessibilité numérique
                  </h3>
                  <p className="text-sm text-foreground mt-2">
                    L'égalité est un des principes fondamentaux de notre démocratie. Tous les sites Internet et les applications mobiles des organismes publics sont soumis à une exigence de non-discrimination des usagers, en particulier sur la question du handicap.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/dossiers"
              className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide hover:bg-muted transition-colors"
            >
              Tous les dossiers
            </Link>
          </div>
        </section>

        {/* Conseil de gouvernement Section */}
        <section className="container py-8">
          <div className="bg-muted/50 p-8 rounded-sm animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h3 className="text-2xl font-light text-primary mb-4">Conseil de gouvernement</h3>
            <p className="text-foreground mb-4">
              Le Conseil de gouvernement se réunit hebdomadairement au ministère d'État afin de délibérer de toutes les affaires inscrites à l'ordre du jour qui est arrêté par le Premier ministre, président du Conseil de gouvernement.
            </p>
            <p className="text-foreground mb-6">Les communiqués du Conseil de gouvernement sont en français.</p>
            <div className="text-center">
              <Link
                to="#"
                className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide hover:bg-muted transition-colors"
              >
                Tous les communiqués du conseil de gouvernement
              </Link>
            </div>
          </div>
        </section>

        {/* Présentation du gouvernement Section */}
        <section className="container py-8">
          <h2 className="text-3xl font-light text-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.9s" }}>
            Présentation du gouvernement
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {governmentMembers.map((member, index) => (
              <Link
                key={index}
                to="/gouvernement"
                className="group relative aspect-[3/4] overflow-hidden"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-primary/90 flex flex-col justify-start p-4 transition-opacity duration-300 ${
                    hoveredMember === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h4 className="text-primary-foreground font-bold text-sm uppercase">
                    {member.name}
                  </h4>
                  <p className="text-primary-foreground/90 text-xs mt-2 leading-relaxed">
                    {member.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section className="container py-8">
          <h2 className="text-3xl font-light text-foreground mb-8">Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-muted/50 p-6 rounded-sm flex gap-6 animate-fade-in"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="w-32 flex-shrink-0">
                  <div className="aspect-[3/4] bg-background border border-border rounded-sm flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Grand-Duché de Luxembourg</p>
                      <h4 className="text-primary font-bold text-lg mt-2">À PROPOS</h4>
                      <p className="text-xs text-muted-foreground mt-1">...</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary">{pub.title}</h3>
                  <p className="text-sm text-foreground mt-2">{pub.description}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    <span className="font-semibold text-foreground">LANGUE(S):</span> {pub.languages}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/publications"
              className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide hover:bg-muted transition-colors"
            >
              Toutes les publications
            </Link>
          </div>
        </section>

        {/* Portails Section */}
        <section className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Portail des marchés publics", description: "Trouvez tous les marchés publics sur le portail luxembourgeois des marchés publics:", url: "#" },
              { title: "Portail GovJobs", description: "L'État luxembourgeois recrute! Découvrez les postes vacants pour fonctionnaires, employés et salariés de l'État:", url: "#" },
              { title: "Portail Guichet.lu", description: "Trouvez l'ensemble des informations, démarches et services proposés par les organismes publics luxembourgeois sur Guichet.lu:", url: "#" },
            ].map((portal, index) => (
              <a
                key={index}
                href={portal.url}
                className="group bg-muted/50 p-6 rounded-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-primary group-hover:underline">{portal.title}</h3>
                <p className="text-sm text-foreground mt-2">{portal.description}</p>
                <div className="mt-4 aspect-video bg-background border border-border rounded-sm flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-muted-foreground" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
