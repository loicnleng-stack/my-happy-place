import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";

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
import conferencePresse from "@/assets/conference-presse.png";
import publicationHistoire from "@/assets/publication-histoire.png";
import publicationLangues from "@/assets/publication-langues.png";
import portailMarches from "@/assets/portail-marches-publics.png";
import portailGovjobs from "@/assets/portail-govjobs.png";
import portailGuichet from "@/assets/portail-guichet.png";
import lucFriedenFacebook from "@/assets/luc-frieden-facebook.png";
import govLogoSmall from "@/assets/gov-logo-small.png";
import etatNation2025 from "@/assets/etat-nation-2025.png";
import dossierAccessibilite from "@/assets/dossier-accessibilite.png";

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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* À la Une Section */}
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light text-foreground animate-slide-down">{t("index.alaune")}</h2>
            <button className="p-2 hover:bg-muted rounded-full transition-colors btn-press hover-scale">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main News */}
            <div className="lg:col-span-2 animate-fade-in-left">
              <div className="group block cursor-default card-animated">
                <div className="aspect-video overflow-hidden rounded-sm img-zoom">
                  <img 
                    src={conferencePresse} 
                    alt="Conférence de presse" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mt-4 link-underline inline-block">
                  {t("index.newsMain.title")}
                </h3>
                <p className="text-sm text-primary mt-2">{t("index.newsMain.date")}</p>
                <p className="text-muted-foreground mt-2">{t("index.newsMain.desc")}</p>
              </div>
            </div>

            {/* Side News */}
            <div className="space-y-6 animate-fade-in-right delay-200 stagger-children">
              <div className="block cursor-default hover-lift p-4 rounded-sm transition-all">
                <h3 className="text-lg font-semibold text-primary link-underline inline-block">
                  {t("index.newsSide1.title")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{t("index.newsSide1.date")}</p>
                <p className="text-sm text-foreground mt-2">
                  {t("index.newsSide1.desc")}
                </p>
              </div>

              <div className="block cursor-default hover-lift p-4 rounded-sm transition-all">
                <h3 className="text-lg font-semibold text-primary link-underline inline-block">
                  {t("index.newsSide2.title")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{t("index.newsSide2.date")}</p>
                <p className="text-sm text-foreground mt-2">
                  {t("index.newsSide2.desc")}
                </p>
              </div>
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
              {t("index.actualitesUne")}
            </button>
            <button
              onClick={() => setActiveTab("toutes")}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wide transition-colors border ${
                activeTab === "toutes"
                  ? "bg-background border-border text-foreground"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("index.toutesActualites")}
            </button>
          </div>
        </section>

        {/* État de la Nation + Facebook Section */}
        <section className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* État de la Nation */}
            <ScrollAnimation animation="fade-in-left" className="lg:col-span-2">
              <div className="bg-gray-100 p-8 rounded-sm">
                <h3 className="text-2xl font-light text-primary mb-4">{t("index.etatNation")}</h3>
                <p className="text-foreground mb-6">
                  {t("index.etatNation.desc")}
                </p>
                {/* Visual Card - Using actual image */}
                <div className="rounded-sm overflow-hidden">
                  <img 
                    src={etatNation2025} 
                    alt="État de la Nation 2025 - Stabilité" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </ScrollAnimation>

            {/* Facebook */}
            <ScrollAnimation animation="fade-in-right" delay={0.2}>
              <h3 className="text-2xl font-light text-foreground mb-6">Facebook</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded overflow-hidden">
                  <img src={govLogoSmall} alt="Gouvernement luxembourgeois" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Gouvernement luxembourgeois</p>
                  <p className="text-xs text-muted-foreground">{t("index.facebook.posted")}</p>
                </div>
              </div>
              <div className="aspect-square bg-muted mb-6 overflow-hidden">
                <img src={lucFriedenFacebook} alt="Luc Frieden" className="w-full h-full object-cover object-top" />
              </div>
              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 border-t border-border"></div>
                <span
                  className="relative block text-center py-3 px-6 bg-background border border-border text-sm font-medium uppercase tracking-wide cursor-default mx-auto w-fit"
                >
                  {t("index.gouvernementFacebook")}
                </span>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Agenda + Interviews Section */}
        <section className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agenda */}
            <ScrollAnimation animation="slide-up" className="lg:col-span-2">
              <div className="bg-muted/50 p-8 rounded-sm">
                <h3 className="text-2xl font-light text-primary mb-6">{t("index.agenda")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agendaItems.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <p className="text-sm font-semibold text-primary">■ {item.date}</p>
                      <p className="text-sm text-foreground mt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <span
                    className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide cursor-default"
                  >
                    {t("index.toutAgenda")}
                  </span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Interviews */}
            <ScrollAnimation animation="fade-in-right" delay={0.2}>
              <h3 className="text-2xl font-light text-foreground mb-6">{t("index.interviews")}</h3>
              <div className="space-y-6">
                {interviews.map((interview, index) => (
                  <div key={index} className="block cursor-default">
                    <h4 className="text-lg font-semibold text-primary">
                      {interview.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{interview.source}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <span
                  className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide cursor-default"
                >
                  {t("index.toutesInterviews")}
                </span>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Dossiers Section */}
        <ScrollAnimation animation="slide-up" className="container py-8">
          <h2 className="text-3xl font-light text-foreground mb-8">{t("index.dossiers")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First dossier - Photo style */}
            <div className="block cursor-default hover-lift">
              <div className="aspect-video overflow-hidden rounded-sm img-zoom">
                <img
                  src={dossierGouvernement}
                  alt="La formation du gouvernement 2023"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mt-4">
                {t("index.dossier1.title")}
              </h3>
            </div>

            {/* Second dossier - Card with description */}
            <div className="block cursor-default hover-lift">
              <div className="relative">
                {/* Blue tech background with actual image */}
                <div className="aspect-video overflow-hidden img-zoom">
                  <img 
                    src={dossierAccessibilite} 
                    alt="Accessibilité numérique" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Description box */}
                <div className="bg-sky-50 p-4">
                  <h3 className="text-lg font-semibold text-primary">
                    {t("index.dossier2.title")}
                  </h3>
                  <p className="text-sm text-foreground mt-2">
                    {t("index.dossier2.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 relative">
            <div className="absolute inset-x-0 top-1/2 border-t border-border"></div>
            <span
              className="relative inline-block px-8 py-3 bg-background border border-border text-sm font-medium uppercase tracking-wide cursor-default"
            >
              {t("index.tousDossiers")}
            </span>
          </div>
        </ScrollAnimation>

        {/* Conseil de gouvernement Section */}
        <ScrollAnimation animation="fade-in-scale" className="container py-8">
          <div className="bg-muted/50 p-8 rounded-sm">
            <h3 className="text-2xl font-light text-primary mb-4">{t("index.conseilGouvernement")}</h3>
            <p className="text-foreground mb-4">
              {t("index.conseil.desc")}
            </p>
            <p className="text-foreground mb-6">{t("index.conseil.note")}</p>
            <div className="text-center">
              <span
                className="inline-block px-8 py-3 border border-border rounded-sm text-sm font-medium uppercase tracking-wide cursor-default"
              >
                {t("index.tousCommuniques")}
              </span>
            </div>
          </div>
        </ScrollAnimation>

        {/* Présentation du gouvernement Section */}
        <ScrollAnimation animation="slide-up" className="container py-8">
          <h2 className="text-3xl font-light text-foreground mb-8">
            {t("index.membres")}
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
                  className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-primary/90 flex flex-col justify-start p-4 transition-all duration-300 ${
                    hoveredMember === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
        </ScrollAnimation>

        {/* Publications Section */}
        <ScrollAnimation animation="fade-in" className="container py-8">
          <h2 className="text-3xl font-light text-foreground mb-8">{t("index.publications")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Publication 1 - Histoire du Luxembourg */}
            <div className="bg-card border border-border p-6 flex gap-6 hover-lift">
              <div className="w-40 flex-shrink-0">
                <img 
                  src={publicationHistoire} 
                  alt="À propos de l'histoire du Luxembourg" 
                  className="w-full h-auto shadow-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">à propos... de l&apos;histoire du Luxembourg</h3>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  Cette brochure présente succinctement l&apos;évolution du Luxembourg du Xe siècle à nos jours. Une timeline présente au fil des pages les dates-clés de l&apos;histoire du Luxembourg. Un code QR qui figure en fin de brochure renvoie vers un site avec des liens utiles, permettant ainsi au lecteur intéressé d&apos;approfondir l&apos;un ou l&apos;autre aspect des sujets abordés dans cette publication.
                </p>
                <p className="text-sm mt-4">
                  <span className="font-semibold text-primary">LANGUE(S):</span>{" "}
                  <span className="text-primary">Français, Anglais, Allemand</span>
                </p>
              </div>
            </div>

            {/* Publication 2 - Langues au Luxembourg */}
            <div className="bg-card border border-border p-6 flex gap-6 hover-lift">
              <div className="w-40 flex-shrink-0">
                <img 
                  src={publicationLangues} 
                  alt="À propos des langues au Luxembourg" 
                  className="w-full h-auto shadow-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">À propos... des langues au Luxembourg</h3>
                <p className="text-sm text-foreground mt-3 leading-relaxed">
                  L&apos;usage linguistique dans le Grand-Duché de Luxembourg - 2025
                </p>
                <p className="text-sm mt-4">
                  <span className="font-semibold text-primary">LANGUE(S):</span>{" "}
                  <span className="text-primary">Français, Anglais, Allemand, Luxembourgeois</span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 relative">
            <div className="absolute inset-x-0 top-1/2 border-t border-border"></div>
            <span
              className="relative inline-block px-8 py-3 bg-background border border-border text-sm font-medium uppercase tracking-wide cursor-default"
            >
              {t("index.toutesPublications")}
            </span>
          </div>
        </ScrollAnimation>

        {/* Portails Section */}
        <ScrollAnimation animation="slide-up" className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portail des marchés publics */}
            <div className="bg-muted p-6 transition-all duration-300 hover-lift">
              <h3 className="text-xl font-semibold text-primary">Portail des marchés publics</h3>
              <p className="text-sm text-foreground mt-2">Trouvez tous les marchés publics sur le portail luxembourgeois des marchés publics:</p>
              <div className="mt-4 overflow-hidden border border-border">
                <img src={portailMarches} alt="Portail des marchés publics" className="w-full h-auto" />
              </div>
            </div>

            {/* Portail GovJobs */}
            <div className="bg-muted p-6 transition-all duration-300 hover-lift">
              <h3 className="text-xl font-semibold text-primary">Portail GovJobs</h3>
              <p className="text-sm text-foreground mt-2">L&apos;État luxembourgeois recrute! Découvrez les postes vacants pour fonctionnaires, employés et salariés de l&apos;État:</p>
              <div className="mt-4 overflow-hidden border border-border">
                <img src={portailGovjobs} alt="Portail GovJobs" className="w-full h-auto" />
              </div>
            </div>

            {/* Portail Guichet.lu */}
            <div className="bg-muted p-6 transition-all duration-300 hover-lift">
              <h3 className="text-xl font-semibold text-primary">Portail Guichet.lu</h3>
              <p className="text-sm text-foreground mt-2">Trouvez l&apos;ensemble des informations, démarches et services proposés par les organismes publics luxembourgeois sur Guichet.lu:</p>
              <div className="mt-4 overflow-hidden border border-border">
                <img src={portailGuichet} alt="Portail Guichet.lu" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
