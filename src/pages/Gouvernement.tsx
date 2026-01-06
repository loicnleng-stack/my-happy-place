import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

// Import minister photos
import lucFrieden from "@/assets/ministers/luc-frieden.jpg";
import xavierBettel from "@/assets/ministers/xavier-bettel.jpg";
import marcSpautz from "@/assets/ministers/marc-spautz.jpg";
import martineHansen from "@/assets/ministers/martine-hansen.jpg";
import claudeMeisch from "@/assets/ministers/claude-meisch.jpg";
import lexDelles from "@/assets/ministers/lex-delles.jpg";
import yurikoBackes from "@/assets/ministers/yuriko-backes.jpg";
import maxHahn from "@/assets/ministers/max-hahn.jpg";
import gillesRoth from "@/assets/ministers/gilles-roth.jpg";
import martineDeprez from "@/assets/ministers/martine-deprez.jpg";
import leonGloden from "@/assets/ministers/leon-gloden.jpg";
import stephanieObertin from "@/assets/ministers/stephanie-obertin.jpg";
import sergeWilmes from "@/assets/ministers/serge-wilmes.jpg";
import elisabethMargue from "@/assets/ministers/elisabeth-margue.jpg";
import ericThill from "@/assets/ministers/eric-thill.jpg";

const governmentMembers = [
  {
    name: "FRIEDEN Luc",
    position: "Premier ministre",
    roles: ["Ministre d'État"],
    photo: lucFrieden,
    isPremier: true,
  },
  {
    name: "BETTEL Xavier",
    position: "Vice-Premier ministre",
    roles: [
      "Ministre des Affaires étrangères et du Commerce extérieur",
      "Ministre de la Coopération et de l'Action humanitaire",
    ],
    photo: xavierBettel,
  },
  {
    name: "SPAUTZ Marc",
    position: "Ministre du Travail",
    roles: [],
    photo: marcSpautz,
  },
  {
    name: "HANSEN Martine",
    position: "Ministre de l'Agriculture, de l'Alimentation et de la Viticulture",
    roles: [
      "Ministre de la Protection des consommateurs",
      "Ministre des Sports",
    ],
    photo: martineHansen,
  },
  {
    name: "MEISCH Claude",
    position: "Ministre de l'Éducation nationale, de l'Enfance et de la Jeunesse",
    roles: ["Ministre du Logement et de l'Aménagement du territoire"],
    photo: claudeMeisch,
  },
  {
    name: "DELLES Lex",
    position: "Ministre de l'Économie, des PME, de l'Énergie et du Tourisme",
    roles: [],
    photo: lexDelles,
  },
  {
    name: "BACKES Yuriko",
    position: "Ministre de la Défense",
    roles: [
      "Ministre de la Mobilité et des Travaux publics",
      "Ministre de l'Égalité des genres et de la Diversité",
    ],
    photo: yurikoBackes,
  },
  {
    name: "HAHN Max",
    position: "Ministre de la Famille, des Solidarités, du Vivre ensemble et de l'Accueil",
    roles: [],
    photo: maxHahn,
  },
  {
    name: "ROTH Gilles",
    position: "Ministre des Finances",
    roles: [],
    photo: gillesRoth,
  },
  {
    name: "DEPREZ Martine",
    position: "Ministre de la Santé et de la Sécurité sociale",
    roles: [],
    photo: martineDeprez,
  },
  {
    name: "GLODEN Léon",
    position: "Ministre de l'Intérieur",
    roles: ["Ministre de la Justice"],
    photo: leonGloden,
  },
  {
    name: "OBERTIN Stéphanie",
    position: "Ministre de la Digitalisation",
    roles: [
      "Ministre de la Recherche et de l'Enseignement supérieur",
      "Ministre de la Culture",
    ],
    photo: stephanieObertin,
  },
  {
    name: "WILMES Serge",
    position: "Ministre de l'Environnement, du Climat et de la Biodiversité",
    roles: [],
    photo: sergeWilmes,
  },
  {
    name: "MARGUE Elisabeth",
    position: "Ministre de la Fonction publique",
    roles: ["Ministre des Relations avec le Parlement"],
    photo: elisabethMargue,
  },
  {
    name: "THILL Eric",
    position: "Secrétaire d'État aux Relations avec le Parlement",
    roles: [],
    photo: ericThill,
  },
];

const Gouvernement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="container py-8 md:py-12 animate-fade-in">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-6">
            Le gouvernement
          </h1>

          {/* Horizontal lines */}
          <hr className="border-border mb-2" />
          <hr className="border-border mb-6" />

          {/* Last modified date */}
          <div className="text-right text-sm text-muted-foreground mb-12">
            Dernière modification le 17.12.2025
          </div>

          {/* Premier ministre - Featured */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Link 
              to="#" 
              className="group block max-w-md"
            >
              <h2 className="text-2xl font-light text-primary group-hover:underline mb-4">
                {governmentMembers[0].name}
              </h2>
              <div className="aspect-[3/4] w-full max-w-[280px] mb-4 overflow-hidden">
                <img 
                  src={governmentMembers[0].photo} 
                  alt={governmentMembers[0].name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <p className="text-foreground font-medium">
                {governmentMembers[0].position}
              </p>
              {governmentMembers[0].roles.map((role, idx) => (
                <p key={idx} className="text-foreground text-sm mt-1">
                  {role}
                </p>
              ))}
            </Link>
          </div>

          {/* Other ministers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {governmentMembers.slice(1).map((member, index) => (
              <Link 
                key={index}
                to="#"
                className="group animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <h3 className="text-xl font-light text-primary group-hover:underline mb-4 text-center">
                  {member.name}
                </h3>
                <div className="aspect-[3/4] w-full mb-4 overflow-hidden">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="text-foreground text-sm">
                  {member.position}
                </p>
                {member.roles.map((role, idx) => (
                  <p key={idx} className="text-foreground text-sm mt-1">
                    {role}
                  </p>
                ))}
              </Link>
            ))}
          </div>

          {/* Link to former members */}
          <div className="mt-16 pt-8 border-t border-border animate-fade-in">
            <Link 
              to="#" 
              className="text-primary hover:underline text-lg"
            >
              Anciens membres du gouvernement →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Gouvernement;
