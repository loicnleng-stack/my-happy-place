import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight, ExternalLink } from "lucide-react";

const administrations = [
  { name: "Administration d'évaluation et de contrôle de l'assurance dépendance", external: false },
  { name: "Administration de la gestion d'eau", external: false },
  { name: "Administration de la nature et des forêts", external: false },
  { name: "Administration de la navigation aérienne", external: false },
  { name: "Administration de l'enregistrement, des domaines et de la TVA", external: false },
  { name: "Administration de l'environnement", external: false },
  { name: "Administration des bâtiments publics", external: false },
  { name: "Administration des chemins de fer", external: false },
  { name: "Administration des contributions directes", external: false },
  { name: "Administration des douanes et accises", external: false },
  { name: "Administration des enquêtes techniques", external: false },
  { name: "Administration des ponts et chaussées", external: false },
  { name: "Administration des services techniques de l'agriculture (ASTA)", external: false },
  { name: "Administration du cadastre et de la topographie (ACT)", external: false },
  { name: "Administration des transports publics", external: false },
  { name: "Administration luxembourgeoise vétérinaire et alimentaire (ALVA)", external: false },
  { name: "Administration pénitentiaire", external: false },
  { name: "Agence pour le développement de l'emploi (ADEM)", external: false },
  { name: "Archives nationales de Luxembourg", external: false },
  { name: "Armée luxembourgeoise", external: false },
  { name: "Association d'assurance accidents (AAA)", external: true },
  { name: "Autorité luxembourgeoise indépendante de l'audiovisuel (ALIA)", external: true },
  { name: "Bureau de gestion des avoirs", external: false },
  { name: "Bibliothèque nationale de Luxembourg (BNL)", external: false },
  { name: "Cellule d'expertise médicale", external: false },
  { name: "Cellule de facilitation urbanisme et environnement", external: false },
  { name: "Centre de gestion informatique de l'éducation (CGIE)", external: true },
  { name: "Centre de gestion du personnel et de l'organisation de l'État (CGPO)", external: false },
  { name: "Centre psychosocial et d'accompagnement scolaires (CePas)", external: true },
  { name: "Centre de rétention", external: false },
  { name: "Centre des technologies de l'information de l'État (CTIE)", external: false },
  { name: "Centre socio-éducatif de l'État", external: false },
  { name: "Centres, foyers et services pour personnes âgées (SERVIOR)", external: true },
  { name: "Comité de conjoncture", external: false },
  { name: "Comité directeur du souvenir de la Résistance", external: false },
  { name: "Comité du travail féminin (CTF)", external: false },
  { name: "Comité National d'Ethique de Recherche (CNER)", external: false },
  { name: "Comité pour la mémoire de la Deuxième Guerre mondiale", external: false },
  { name: "Commissariat aux affaires maritimes (CAM)", external: false },
  { name: "Commissariat aux assurances", external: true },
  { name: "Commission d'accès aux documents", external: false },
  { name: "Commission de surveillance du secteur financier (CSSF)", external: true },
  { name: "Commissariat du gouvernement chargé de l'instruction disciplinaire", external: false },
  { name: "Commission nationale pour la protection des données (CNPD)", external: false },
  { name: "Conseil scientifique du domaine de la santé", external: true },
  { name: "Contrôle médical de la Sécurité sociale", external: false },
  { name: "Corps grand-ducal d'incendie et de secours", external: true },
  { name: "Direction de la coopération au développement et action humanitaire", external: false },
  { name: "Direction de la défense", external: false },
  { name: "Direction de la protection des consommateurs", external: false },
  { name: "Direction de la santé", external: false },
  { name: "Direction de l'aviation civile (DAC)", external: false },
  { name: "École supérieure du travail (EST)", external: true },
  { name: "Fonds Belval", external: true },
  { name: "Fonds culturel national (Focuna)", external: true },
  { name: "Fonds d'urbanisation et d'aménagement du plateau de Kirchberg (Fonds Kirchberg)", external: true },
  { name: "Fonds national de la recherche (FNR)", external: true },
  { name: "Fonds national de solidarité (FNS)", external: true },
  { name: "Fonds national de soutien à la production audiovisuelle (Fonspa)", external: false },
  { name: "Fonds du logement", external: true },
  { name: "Fonds souverain intergénérationnel du Luxembourg (FSIL)", external: false },
  { name: "Haut-Commissariat à la protection nationale (HCPN)", external: false },
  { name: "Institut étatique d'aide à l'enfance et à la jeunesse (aitia)", external: true },
  { name: "Institut de formation de l'Éducation nationale (IFEN)", external: true },
  { name: "Inspection du travail et des mines (ITM)", external: false },
  { name: "Inspection générale de la police (IGP)", external: false },
  { name: "Inspection générale de la sécurité sociale (IGSS)", external: false },
  { name: "Inspection générale des finances (IGF)", external: false },
  { name: "Institut grand-ducal", external: false },
  { name: "Institut luxembourgeois de la normalisation, de l'accréditation, de la sécurité et qualité des produits et services (ILNAS)", external: false },
  { name: "Institut luxembourgeois de régulation (ILR)", external: true },
  { name: "Institut national d'administration publique (INAP)", external: false },
  { name: "Institut national de la statistique et des études économiques (STATEC)", external: false },
  { name: "Office du Ducroire", external: true },
  { name: "Office national de l'accueil (ONA)", external: false },
  { name: "Office national de l'enfance (ONE)", external: false },
  { name: "Observatoire national de l'enfance, de la jeunesse et de la qualité scolaire (OEJQS)", external: true },
  { name: "Office national d'inclusion sociale (ONIS)", external: false },
  { name: "Office national de remembrement (ONR)", external: false },
  { name: "Point de contact national luxembourgeois pour la conduite responsable des affaires de l'OCDE (LuxPCN)", external: false },
  { name: "Police Lëtzebuerg", external: false },
  { name: "Restopolis", external: true },
  { name: "Service central de législation (SCL)", external: false },
  { name: "Service de coordination de la recherche et de l'innovation pédagogiques et technologiques (Script)", external: false },
  { name: "Service de l'intégration et de l'accueil scolaires (SIA)", external: true },
  { name: "Service de renseignement de l'État", external: false },
  { name: "Service de santé au travail multisectoriel (STM)", external: true },
  { name: "Service d'économie rurale (SER)", external: false },
  { name: "Service de médiation scolaire (SMS)", external: true },
  { name: "Service des médias, de la connectivité et de la politique numérique (SMC)", external: false },
  { name: "Service information et presse (SIP)", external: false },
  { name: "Service national de l'éducation inclusive (SNEI)", external: true },
  { name: "Service national de la jeunesse (SNJ)", external: false },
];

export default function Administrations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container py-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-[hsl(200,60%,35%)] mb-8">
          Administrations
        </h1>

        <hr className="border-gray-200 mb-6" />

        {/* Last modified */}
        <div className="text-right text-sm text-gray-500 mb-6">
          Dernière modification le 22.05.2025
        </div>

        {/* Section title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Administrations
        </h2>

        {/* List */}
        <div className="space-y-0">
          {administrations.map((admin, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 py-3 px-4 border-b border-gray-100 transition-all duration-200 group ${
                hoveredIndex === index
                  ? "bg-[hsl(200,40%,95%)]"
                  : "hover:bg-[hsl(200,40%,95%)]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ChevronRight 
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  hoveredIndex === index ? "text-[hsl(200,60%,35%)]" : "text-gray-400"
                }`} 
              />
              <span className="flex-1 text-[hsl(200,60%,40%)] hover:underline transition-colors">
                {admin.name}
                {admin.external && (
                  <span className="text-[hsl(200,60%,40%)] ml-1">- site externe</span>
                )}
              </span>
              <ExternalLink 
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
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
