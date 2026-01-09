import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Import minister photos
import lucFrieden from "@/assets/ministers/luc-frieden.png";
import xavierBettel from "@/assets/ministers/xavier-bettel.png";
import marcSpautz from "@/assets/ministers/marc-spautz.png";
import martineHansen from "@/assets/ministers/martine-hansen.png";
import claudeMeisch from "@/assets/ministers/claude-meisch.png";
import lexDelles from "@/assets/ministers/lex-delles.png";
import yurikoBackes from "@/assets/ministers/yuriko-backes.png";
import maxHahn from "@/assets/ministers/max-hahn.png";
import gillesRoth from "@/assets/ministers/gilles-roth.png";
import martineDeprez from "@/assets/ministers/martine-deprez.png";
import leonGloden from "@/assets/ministers/leon-gloden.png";
import stephanieObertin from "@/assets/ministers/stephanie-obertin.png";
import sergeWilmes from "@/assets/ministers/serge-wilmes.png";
import elisabethMargue from "@/assets/ministers/elisabeth-margue.png";
import ericThill from "@/assets/ministers/eric-thill.png";

const governmentMembers = [
  {
    name: "FRIEDEN Luc",
    position: "Premier ministre",
    roles: [],
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
    position: "Ministre des Affaires intérieures",
    roles: [],
    photo: leonGloden,
  },
  {
    name: "OBERTIN Stéphanie",
    position: "Ministre de la Digitalisation",
    roles: [
      "Ministre de la Recherche et de l'Enseignement supérieur",
    ],
    photo: stephanieObertin,
  },
  {
    name: "WILMES Serge",
    position: "Ministre de l'Environnement, du Climat et de la Biodiversité",
    roles: ["Ministre de la Fonction publique"],
    photo: sergeWilmes,
  },
  {
    name: "MARGUE Elisabeth",
    position: "Ministre de la Justice",
    roles: [
      "Ministre déléguée auprès du Premier ministre, chargée des Médias et de la Connectivité",
      "Ministre déléguée auprès du Premier ministre, chargée des Relations avec le Parlement",
    ],
    photo: elisabethMargue,
  },
  {
    name: "THILL Eric",
    position: "Ministre de la Culture",
    roles: ["Ministre délégué au Tourisme"],
    photo: ericThill,
  },
];

const Gouvernement = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <article className="container py-8 md:py-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light text-[hsl(200,60%,35%)] mb-6">
            {t("gouv.title")}
          </h1>

          {/* Horizontal line */}
          <hr className="border-gray-200 mb-6" />

          {/* Last modified date */}
          <div className="text-right text-sm text-gray-500 mb-8">
            {t("common.lastModified")} 17.12.2025
          </div>

          {/* Premier ministre - Featured with gray background */}
          <div 
            className="mb-12 p-6 bg-gray-100 transition-colors duration-200"
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link 
              to="#" 
              className="group block"
            >
              <h2 className="text-2xl font-light text-[hsl(200,60%,35%)] group-hover:underline mb-4">
                {governmentMembers[0].name}
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full max-w-[280px] overflow-hidden">
                  <img 
                    src={governmentMembers[0].photo} 
                    alt={governmentMembers[0].name}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center">
                  <p className="text-gray-800">
                    {t("gouv.premierMinistre")}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Other ministers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentMembers.slice(1).map((member, index) => (
              <Link 
                key={index}
                to="#"
                className={`group block p-4 transition-colors duration-200 ${
                  hoveredIndex === index + 1 ? "bg-[hsl(200,40%,95%)]" : "hover:bg-[hsl(200,40%,95%)]"
                }`}
                onMouseEnter={() => setHoveredIndex(index + 1)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 className="text-xl font-light text-[hsl(200,60%,35%)] group-hover:underline mb-4 text-center">
                  {member.name}
                </h3>
                <div className="w-full mb-4 overflow-hidden">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
                <p className="text-gray-800 text-sm">
                  {member.position}
                </p>
                {member.roles.map((role, idx) => (
                  <p key={idx} className="text-gray-700 text-sm mt-1">
                    {role}
                  </p>
                ))}
              </Link>
            ))}
          </div>

          {/* Link to former members */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link 
              to="#" 
              className="text-[hsl(200,60%,35%)] hover:underline text-lg"
            >
              {t("gouv.formerMembers")} →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Gouvernement;
