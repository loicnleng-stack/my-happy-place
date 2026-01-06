import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ministeres = [
  { name: "Ministère d'État", code: "ME", url: "#" },
  { name: "Ministère des Affaires étrangères et européennes, de la Défense, de la Coopération et du Commerce extérieur", code: "MAE", url: "#" },
  { name: "Ministère des Affaires intérieures", code: "MAINT", url: "#" },
  { name: "Ministère de l'Agriculture, de l'Alimentation et de la Viticulture", code: "MA", url: "#" },
  { name: "Ministère de la Culture", code: "MCULT", url: "#" },
  { name: "Ministère de la Digitalisation", code: "MinDigital", url: "#" },
  { name: "Ministère de l'Économie", code: "MECO", url: "#" },
  { name: "Ministère de l'Éducation nationale, de l'Enfance et de la Jeunesse", code: "MENEJ", url: "#" },
  { name: "Ministère de l'Égalité des genres et de la Diversité", code: "MEGA", url: "#" },
  { name: "Ministère de l'Environnement, du Climat et de la Biodiversité", code: "MECB", url: "#" },
  { name: "Ministère de la Famille, des Solidarités, du Vivre ensemble et de l'Accueil", code: "MFSVA", url: "#" },
  { name: "Ministère des Finances", code: "MFIN", url: "#" },
  { name: "Ministère de la Fonction publique", code: "MFP", url: "#" },
  { name: "Ministère de la Justice", code: "MJUST", url: "#" },
  { name: "Ministère du Logement et de l'Aménagement du territoire", code: "MLOGAT", url: "#" },
  { name: "Ministère de la Mobilité et des Travaux publics", code: "MMTP", url: "#" },
  { name: "Ministère de la Recherche et de l'Enseignement supérieur", code: "MESR", url: "#" },
  { name: "Ministère de la Santé et de la Sécurité sociale", code: "M3S", url: "#" },
  { name: "Ministère des Sports", code: "MSP", url: "#" },
  { name: "Ministère du Travail", code: "MT", url: "#" },
];

export default function Ministeres() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredMinisteres = ministeres.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container py-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-[hsl(200,60%,35%)] mb-8">
          Ministères
        </h1>

        <hr className="border-gray-200 mb-6" />

        {/* Last modified */}
        <div className="text-right text-sm text-gray-500 mb-6">
          Dernière modification le 14.08.2024
        </div>

        {/* Search filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <label className="font-medium text-gray-700 whitespace-nowrap">
            Filtrer par ministères
          </label>
          <div className="relative flex-1 max-w-2xl">
            <Input
              type="text"
              placeholder="Par exemple: Ministère de la Justice"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-gray-300 focus:border-[hsl(200,60%,35%)] focus:ring-[hsl(200,60%,35%)]"
            />
          </div>
        </div>

        {/* Count */}
        <p className="text-gray-700 mb-4">
          Nombre de ministères affichés : {filteredMinisteres.length} sur {ministeres.length}
        </p>

        {/* List */}
        <div className="space-y-0">
          {filteredMinisteres.map((ministere, index) => (
            <a
              key={index}
              href={ministere.url}
              className={`flex items-center gap-3 py-3 px-4 border-b border-gray-100 transition-all duration-200 group ${
                hoveredIndex === index
                  ? "bg-[hsl(200,40%,95%)]"
                  : "hover:bg-[hsl(200,40%,95%)]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ChevronRight 
                className={`w-4 h-4 transition-colors ${
                  hoveredIndex === index ? "text-[hsl(200,60%,35%)]" : "text-gray-400"
                }`} 
              />
              <span className="flex-1 text-gray-800 group-hover:text-[hsl(200,60%,35%)] transition-colors">
                {ministere.name} <span className="font-medium">{ministere.code}</span>
              </span>
              <ExternalLink 
                className={`w-4 h-4 transition-colors ${
                  hoveredIndex === index ? "text-[hsl(200,60%,35%)]" : "text-gray-400"
                }`} 
              />
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
