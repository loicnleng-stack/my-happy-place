import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "FR" | "EN" | "DE" | "LU";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  FR: {
    // Navigation
    "nav.home": "Accueil",
    "nav.verify": "Vérifier un visa",
    "nav.info": "Informations",
    "nav.services": "Services aux citoyens",
    "nav.contact": "Contact",
    "nav.admin": "Administration",
    "nav.actualites": "Actualités",
    "nav.gouvernement": "Le gouvernement",
    "nav.ministeres": "Ministères",
    "nav.administrations": "Administrations",
    "nav.dossiers": "Dossiers",
    "nav.verificationDocuments": "Vérification de documents",
    "nav.systemePolitique": "Système politique",
    
    // Header
    "header.government": "Le gouvernement",
    "header.subtitle": "luxembourgeois",
    "header.ministry": "Service de Vérification des Visas",
    "header.topLeft": "gouvernement.lu",
    "header.topLeftSub": "Ministères",
    "header.topRight": "LE GOUVERNEMENT",
    "header.topRightSub": "DU GRAND-DUCHÉ DE LUXEMBOURG",
    
    // Hero/Features
    "hero.title": "Vérification de Visa",
    "hero.description": "Vérifiez l'authenticité et la validité d'un visa délivré par le Luxembourg",
    "features.title": "Comment ça marche",
    "features.step1.title": "Entrez les informations",
    "features.step1.desc": "Saisissez le numéro de référence du visa et le numéro de passeport",
    "features.step2.title": "Vérification instantanée",
    "features.step2.desc": "Notre système vérifie les informations en temps réel",
    "features.step3.title": "Résultat sécurisé",
    "features.step3.desc": "Obtenez une confirmation officielle du statut du visa",
    
    // Info
    "info.title": "Informations importantes",
    "info.required": "Éléments requis",
    "info.requiredDesc": "Pour vérifier un visa, vous aurez besoin du numéro de référence du visa (format: LU-XXXX-XXXX) et du numéro de passeport du titulaire.",
    "info.official": "Service officiel",
    "info.officialDesc": "Ce service est fourni par le gouvernement du Grand-Duché de Luxembourg. Pour toute question, veuillez contacter les autorités compétentes.",
    
    // Footer
    "footer.rights": "Tous droits réservés",
    "footer.legal": "Mentions légales",
    "footer.privacy": "Vie privée",
    "footer.accessibility": "Accessibilité",
    "footer.rubriques": "Rubriques",
    "footer.support": "Support",
    "footer.stayConnected": "Restez connecté",
    "footer.contact": "Contact",
    "footer.sitemap": "Plan du site",
    "footer.about": "À propos du site",
    "footer.legalAspects": "Aspects légaux",
    "footer.accessibilityStatement": "Déclaration d'accessibilité",
    "footer.cookies": "Gestion des cookies",
    "footer.newsletter": "Abonnez-vous à notre newsletter",
    "footer.publications": "Publications",
    "footer.conferences": "Conférences de presse en vidéo",
    "footer.agenda": "Agenda",
    
    // Index page
    "index.alaune": "À la Une",
    "index.actualitesUne": "Actualités à la une",
    "index.toutesActualites": "Toutes les actualités",
    "index.agenda": "Agenda du gouvernement",
    "index.toutAgenda": "Tout l'agenda",
    "index.interviews": "Interviews",
    "index.toutesInterviews": "Toutes les interviews",
    "index.dossiers": "Dossiers",
    "index.tousDossiers": "Tous les dossiers",
    "index.conseilGouvernement": "Conseil de gouvernement",
    "index.gouvernementFacebook": "Le gouvernement sur Facebook",
    "index.etatNation": "État de la Nation 2025",
    "index.publications": "Publications",
    "index.toutesPublications": "Toutes les publications",
    "index.portails": "Portails",
    "index.membres": "Présentation du gouvernement",
    "index.tousCommuniques": "Tous les communiqués du conseil de gouvernement",
    
    // Breadcrumb
    "breadcrumb.systemePolitique": "Système politique",
    
    // Gouvernement page
    "gouv.title": "Le gouvernement",
    "gouv.lastModified": "Dernière modification le",
    "gouv.premierMinistre": "Premier ministre",
    "gouv.formerMembers": "Anciens membres du gouvernement",
    
    // Ministeres page
    "ministeres.title": "Ministères",
    "ministeres.filter": "Filtrer par ministères",
    "ministeres.placeholder": "Par exemple: Ministère de la Justice",
    "ministeres.count": "Nombre de ministères affichés",
    "ministeres.of": "sur",
    
    // Administrations page
    "admin.title": "Administrations",
    "admin.externalSite": "site externe",
    
    // Common
    "common.lastModified": "Dernière modification le",
  },
  EN: {
    // Navigation
    "nav.home": "Home",
    "nav.verify": "Verify a visa",
    "nav.info": "Information",
    "nav.services": "Citizen services",
    "nav.contact": "Contact",
    "nav.admin": "Administration",
    "nav.actualites": "News",
    "nav.gouvernement": "The government",
    "nav.ministeres": "Ministries",
    "nav.administrations": "Administrations",
    "nav.dossiers": "Topics",
    "nav.verificationDocuments": "Document Verification",
    "nav.systemePolitique": "Political system",
    
    // Header
    "header.government": "The government",
    "header.subtitle": "of Luxembourg",
    "header.ministry": "Visa Verification Service",
    "header.topLeft": "gouvernement.lu",
    "header.topLeftSub": "Ministries",
    "header.topRight": "THE GOVERNMENT",
    "header.topRightSub": "OF THE GRAND DUCHY OF LUXEMBOURG",
    
    // Hero/Features
    "hero.title": "Visa Verification",
    "hero.description": "Verify the authenticity and validity of a visa issued by Luxembourg",
    "features.title": "How it works",
    "features.step1.title": "Enter the information",
    "features.step1.desc": "Enter the visa reference number and passport number",
    "features.step2.title": "Instant verification",
    "features.step2.desc": "Our system verifies the information in real time",
    "features.step3.title": "Secure result",
    "features.step3.desc": "Get official confirmation of visa status",
    
    // Info
    "info.title": "Important information",
    "info.required": "Required elements",
    "info.requiredDesc": "To verify a visa, you will need the visa reference number (format: LU-XXXX-XXXX) and the holder's passport number.",
    "info.official": "Official service",
    "info.officialDesc": "This service is provided by the Government of the Grand Duchy of Luxembourg. For any questions, please contact the competent authorities.",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.legal": "Legal notice",
    "footer.privacy": "Privacy",
    "footer.accessibility": "Accessibility",
    "footer.rubriques": "Sections",
    "footer.support": "Support",
    "footer.stayConnected": "Stay connected",
    "footer.contact": "Contact",
    "footer.sitemap": "Site map",
    "footer.about": "About this site",
    "footer.legalAspects": "Legal aspects",
    "footer.accessibilityStatement": "Accessibility statement",
    "footer.cookies": "Cookie management",
    "footer.newsletter": "Subscribe to our newsletter",
    "footer.publications": "Publications",
    "footer.conferences": "Press conferences on video",
    "footer.agenda": "Agenda",
    
    // Index page
    "index.alaune": "Headlines",
    "index.actualitesUne": "Featured news",
    "index.toutesActualites": "All news",
    "index.agenda": "Government agenda",
    "index.toutAgenda": "Full agenda",
    "index.interviews": "Interviews",
    "index.toutesInterviews": "All interviews",
    "index.dossiers": "Topics",
    "index.tousDossiers": "All topics",
    "index.conseilGouvernement": "Government council",
    "index.gouvernementFacebook": "Government on Facebook",
    "index.etatNation": "State of the Nation 2025",
    "index.publications": "Publications",
    "index.toutesPublications": "All publications",
    "index.portails": "Portals",
    "index.membres": "Government members",
    "index.tousCommuniques": "All government council press releases",
    
    // Breadcrumb
    "breadcrumb.systemePolitique": "Political system",
    
    // Gouvernement page
    "gouv.title": "The Government",
    "gouv.lastModified": "Last modified on",
    "gouv.premierMinistre": "Prime Minister",
    "gouv.formerMembers": "Former government members",
    
    // Ministeres page
    "ministeres.title": "Ministries",
    "ministeres.filter": "Filter by ministry",
    "ministeres.placeholder": "For example: Ministry of Justice",
    "ministeres.count": "Number of ministries displayed",
    "ministeres.of": "of",
    
    // Administrations page
    "admin.title": "Administrations",
    "admin.externalSite": "external site",
    
    // Common
    "common.lastModified": "Last modified on",
  },
  DE: {
    // Navigation
    "nav.home": "Startseite",
    "nav.verify": "Visum überprüfen",
    "nav.info": "Informationen",
    "nav.services": "Bürgerdienste",
    "nav.contact": "Kontakt",
    "nav.admin": "Verwaltung",
    "nav.actualites": "Nachrichten",
    "nav.gouvernement": "Die Regierung",
    "nav.ministeres": "Ministerien",
    "nav.administrations": "Verwaltungen",
    "nav.dossiers": "Themen",
    "nav.verificationDocuments": "Dokumentenprüfung",
    "nav.systemePolitique": "Politisches System",
    
    // Header
    "header.government": "Die Regierung",
    "header.subtitle": "von Luxemburg",
    "header.ministry": "Visum-Überprüfungsdienst",
    "header.topLeft": "gouvernement.lu",
    "header.topLeftSub": "Ministerien",
    "header.topRight": "DIE REGIERUNG",
    "header.topRightSub": "DES GROSSHERZOGTUMS LUXEMBURG",
    
    // Hero/Features
    "hero.title": "Visum-Überprüfung",
    "hero.description": "Überprüfen Sie die Echtheit und Gültigkeit eines von Luxemburg ausgestellten Visums",
    "features.title": "So funktioniert es",
    "features.step1.title": "Informationen eingeben",
    "features.step1.desc": "Geben Sie die Visum-Referenznummer und Passnummer ein",
    "features.step2.title": "Sofortige Überprüfung",
    "features.step2.desc": "Unser System überprüft die Informationen in Echtzeit",
    "features.step3.title": "Sicheres Ergebnis",
    "features.step3.desc": "Erhalten Sie eine offizielle Bestätigung des Visumstatus",
    
    // Info
    "info.title": "Wichtige Informationen",
    "info.required": "Erforderliche Elemente",
    "info.requiredDesc": "Um ein Visum zu überprüfen, benötigen Sie die Visum-Referenznummer (Format: LU-XXXX-XXXX) und die Passnummer des Inhabers.",
    "info.official": "Offizieller Dienst",
    "info.officialDesc": "Dieser Dienst wird von der Regierung des Großherzogtums Luxemburg bereitgestellt. Bei Fragen wenden Sie sich bitte an die zuständigen Behörden.",
    
    // Footer
    "footer.rights": "Alle Rechte vorbehalten",
    "footer.legal": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.accessibility": "Barrierefreiheit",
    "footer.rubriques": "Rubriken",
    "footer.support": "Support",
    "footer.stayConnected": "Bleiben Sie verbunden",
    "footer.contact": "Kontakt",
    "footer.sitemap": "Sitemap",
    "footer.about": "Über diese Seite",
    "footer.legalAspects": "Rechtliche Aspekte",
    "footer.accessibilityStatement": "Barrierefreiheitserklärung",
    "footer.cookies": "Cookie-Verwaltung",
    "footer.newsletter": "Newsletter abonnieren",
    "footer.publications": "Publikationen",
    "footer.conferences": "Pressekonferenzen auf Video",
    "footer.agenda": "Agenda",
    
    // Index page
    "index.alaune": "Schlagzeilen",
    "index.actualitesUne": "Top-Nachrichten",
    "index.toutesActualites": "Alle Nachrichten",
    "index.agenda": "Regierungsagenda",
    "index.toutAgenda": "Vollständige Agenda",
    "index.interviews": "Interviews",
    "index.toutesInterviews": "Alle Interviews",
    "index.dossiers": "Themen",
    "index.tousDossiers": "Alle Themen",
    "index.conseilGouvernement": "Regierungsrat",
    "index.gouvernementFacebook": "Regierung auf Facebook",
    "index.etatNation": "Lage der Nation 2025",
    "index.publications": "Publikationen",
    "index.toutesPublications": "Alle Publikationen",
    "index.portails": "Portale",
    "index.membres": "Regierungsmitglieder",
    "index.tousCommuniques": "Alle Mitteilungen des Regierungsrates",
    
    // Breadcrumb
    "breadcrumb.systemePolitique": "Politisches System",
    
    // Gouvernement page
    "gouv.title": "Die Regierung",
    "gouv.lastModified": "Letzte Änderung am",
    "gouv.premierMinistre": "Premierminister",
    "gouv.formerMembers": "Ehemalige Regierungsmitglieder",
    
    // Ministeres page
    "ministeres.title": "Ministerien",
    "ministeres.filter": "Nach Ministerium filtern",
    "ministeres.placeholder": "Zum Beispiel: Justizministerium",
    "ministeres.count": "Anzahl der angezeigten Ministerien",
    "ministeres.of": "von",
    
    // Administrations page
    "admin.title": "Verwaltungen",
    "admin.externalSite": "externe Seite",
    
    // Common
    "common.lastModified": "Letzte Änderung am",
  },
  LU: {
    // Navigation
    "nav.home": "Heem",
    "nav.verify": "Visa iwwerpréiwen",
    "nav.info": "Informatiounen",
    "nav.services": "Biergerservicer",
    "nav.contact": "Kontakt",
    "nav.admin": "Administratioun",
    "nav.actualites": "Aktualitéiten",
    "nav.gouvernement": "D'Regierung",
    "nav.ministeres": "Ministèren",
    "nav.administrations": "Administratiounen",
    "nav.dossiers": "Dossieren",
    "nav.verificationDocuments": "Dokumenter Iwwerpréiwen",
    "nav.systemePolitique": "Politesche System",
    
    // Header
    "header.government": "D'Regierung",
    "header.subtitle": "vu Lëtzebuerg",
    "header.ministry": "Visa Iwwerpréiwungsservice",
    "header.topLeft": "gouvernement.lu",
    "header.topLeftSub": "Ministèren",
    "header.topRight": "D'REGIERUNG",
    "header.topRightSub": "VUM GROUSSHERZOGTUM LËTZEBUERG",
    
    // Hero/Features
    "hero.title": "Visa Iwwerpréiwung",
    "hero.description": "Iwwerpréift d'Echtheid an d'Validitéit vun engem Visa vum Lëtzebuerg",
    "features.title": "Wéi et fonctionéiert",
    "features.step1.title": "Informatiounen aginn",
    "features.step1.desc": "Gitt d'Visa Referenznummer an d'Passnummer an",
    "features.step2.title": "Direkt Iwwerpréiwung",
    "features.step2.desc": "Eise System iwwerpréift d'Informatiounen a Realzäit",
    "features.step3.title": "Séchert Resultat",
    "features.step3.desc": "Kritt eng offiziell Bestätegung vum Visa Status",
    
    // Info
    "info.title": "Wichteg Informatiounen",
    "info.required": "Erfuerderlech Elementer",
    "info.requiredDesc": "Fir e Visa ze iwwerpréiwen, braucht Dir d'Visa Referenznummer (Format: LU-XXXX-XXXX) an d'Passnummer vum Inhaber.",
    "info.official": "Offiziellen Service",
    "info.officialDesc": "Dëse Service gëtt vun der Regierung vum Groussherzogtum Lëtzebuerg ugebueden. Fir all Froen, kontaktéiert w.e.g. déi kompetent Autoritéiten.",
    
    // Footer
    "footer.rights": "All Rechter reservéiert",
    "footer.legal": "Rechtlech Hiweiser",
    "footer.privacy": "Dateschutz",
    "footer.accessibility": "Accessibilitéit",
    "footer.rubriques": "Rubricken",
    "footer.support": "Support",
    "footer.stayConnected": "Bleift verbonnen",
    "footer.contact": "Kontakt",
    "footer.sitemap": "Plang vum Site",
    "footer.about": "Iwwer de Site",
    "footer.legalAspects": "Rechtlech Aspekter",
    "footer.accessibilityStatement": "Accessibilitéitserklärung",
    "footer.cookies": "Cookie-Gestioun",
    "footer.newsletter": "Newsletter abonnéieren",
    "footer.publications": "Publikatiounen",
    "footer.conferences": "Pressekonferenzen op Video",
    "footer.agenda": "Agenda",
    
    // Index page
    "index.alaune": "Aktualitéiten",
    "index.actualitesUne": "Top Noriichten",
    "index.toutesActualites": "All Noriichten",
    "index.agenda": "Regierungsagenda",
    "index.toutAgenda": "Ganz Agenda",
    "index.interviews": "Interviews",
    "index.toutesInterviews": "All Interviews",
    "index.dossiers": "Dossieren",
    "index.tousDossiers": "All Dossieren",
    "index.conseilGouvernement": "Regierungsrot",
    "index.gouvernementFacebook": "Regierung op Facebook",
    "index.etatNation": "Lag vun der Natioun 2025",
    "index.publications": "Publikatiounen",
    "index.toutesPublications": "All Publikatiounen",
    "index.portails": "Portaler",
    "index.membres": "Regierungsmemberen",
    "index.tousCommuniques": "All Communiquéë vum Regierungsrot",
    
    // Breadcrumb
    "breadcrumb.systemePolitique": "Politesche System",
    
    // Gouvernement page
    "gouv.title": "D'Regierung",
    "gouv.lastModified": "Lescht Ännerung de",
    "gouv.premierMinistre": "Premierminister",
    "gouv.formerMembers": "Fréier Regierungsmemberen",
    
    // Ministeres page
    "ministeres.title": "Ministèren",
    "ministeres.filter": "Filtert no Ministère",
    "ministeres.placeholder": "Zum Beispill: Justizministère",
    "ministeres.count": "Zuel vun de gewisene Ministèren",
    "ministeres.of": "vun",
    
    // Administrations page
    "admin.title": "Administratiounen",
    "admin.externalSite": "extern Site",
    
    // Common
    "common.lastModified": "Lescht Ännerung de",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("selectedLanguage");
    return (saved as Language) || "FR";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
