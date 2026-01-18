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
    
    // Index page content
    "index.newsMain.title": "Présentation d'un paquet de mesures \"Mateneen. Fir all Famill. Fir all Kand.\": classe d'impôt unique, chèque-service accueil, allocation familiale",
    "index.newsMain.date": "06.01.2026",
    "index.newsMain.desc": "Le livestreaming débute vers 10h30.",
    "index.newsSide1.title": "Nouveautés 2026",
    "index.newsSide1.date": "29.12.2025",
    "index.newsSide1.desc": "De nouvelles dispositions légales et réglementaires concernant directement le citoyen vont entrer en vigueur en 2026. Voici un aperçu des principaux changements qui ont un impact direct sur les citoyens. Cette liste n'est pas exhaustive.",
    "index.newsSide2.title": "Communiqué du gouvernement luxembourgeois sur la situation au Venezuela",
    "index.newsSide2.date": "04.01.2026",
    "index.newsSide2.desc": "Le gouvernement suit de près les événements au Venezuela, suite à l'opération militaire américaine lors de laquelle Nicolas Maduro et son épouse ont été capturés et transférés en dehors du pays.",
    "index.etatNation.desc": "Trouvez ici la déclaration de politique générale sur l'état de la nation 2025 par Luc Frieden ainsi que les illustrations correspondantes.",
    "index.facebook.posted": "il y a 6 jours",
    "index.conseil.desc": "Le Conseil de gouvernement se réunit hebdomadairement au ministère d'État afin de délibérer de toutes les affaires inscrites à l'ordre du jour qui est arrêté par le Premier ministre, président du Conseil de gouvernement.",
    "index.conseil.note": "Les communiqués du Conseil de gouvernement sont en français.",
    "index.dossier1.title": "La formation du gouvernement 2023",
    "index.dossier2.title": "L'engagement du gouvernement pour l'accessibilité numérique",
    "index.dossier2.desc": "L'égalité est un des principes fondamentaux de notre démocratie. Tous les sites Internet et les applications mobiles des organismes publics sont soumis à une exigence de non-discrimination des usagers, en particulier sur la question du handicap.",
    "index.pub1.title": "à propos... de l'histoire du Luxembourg",
    "index.pub1.desc": "Cette brochure présente succinctement l'évolution du Luxembourg du Xe siècle à nos jours. Une timeline présente au fil des pages les dates-clés de l'histoire du Luxembourg. Un code QR qui figure en fin de brochure renvoie vers un site avec des liens utiles, permettant ainsi au lecteur intéressé d'approfondir l'un ou l'autre aspect des sujets abordés dans cette publication.",
    "index.pub1.lang": "Français, Anglais, Allemand",
    "index.pub2.title": "À propos... des langues au Luxembourg",
    "index.pub2.desc": "L'usage linguistique dans le Grand-Duché de Luxembourg - 2025",
    "index.pub2.lang": "Français, Anglais, Allemand, Luxembourgeois",
    "index.langLabel": "LANGUE(S):",
    "index.portail1.title": "Portail des marchés publics",
    "index.portail1.desc": "Trouvez tous les marchés publics sur le portail luxembourgeois des marchés publics:",
    "index.portail2.title": "Portail GovJobs",
    "index.portail2.desc": "L'État luxembourgeois recrute! Découvrez les postes vacants pour fonctionnaires, employés et salariés de l'État:",
    "index.portail3.title": "Portail Guichet.lu",
    "index.portail3.desc": "Trouvez l'ensemble des informations, démarches et services proposés par les organismes publics luxembourgeois sur Guichet.lu:",
    
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
    
    // Index page content
    "index.newsMain.title": "Presentation of a package of measures \"Mateneen. Fir all Famill. Fir all Kand.\": single tax class, childcare voucher, family allowance",
    "index.newsMain.date": "06.01.2026",
    "index.newsMain.desc": "Livestreaming starts around 10:30 am.",
    "index.newsSide1.title": "What's new in 2026",
    "index.newsSide1.date": "29.12.2025",
    "index.newsSide1.desc": "New legal and regulatory provisions directly affecting citizens will come into force in 2026. Here is an overview of the main changes that have a direct impact on citizens. This list is not exhaustive.",
    "index.newsSide2.title": "Statement from the Luxembourg government on the situation in Venezuela",
    "index.newsSide2.date": "04.01.2026",
    "index.newsSide2.desc": "The government is closely monitoring events in Venezuela following the US military operation during which Nicolas Maduro and his wife were captured and transferred out of the country.",
    "index.etatNation.desc": "Find here the general policy statement on the state of the nation 2025 by Luc Frieden as well as the corresponding illustrations.",
    "index.facebook.posted": "6 days ago",
    "index.conseil.desc": "The Government Council meets weekly at the Ministry of State to deliberate on all matters on the agenda set by the Prime Minister, President of the Government Council.",
    "index.conseil.note": "Government Council press releases are in French.",
    "index.dossier1.title": "The formation of the government 2023",
    "index.dossier2.title": "The government's commitment to digital accessibility",
    "index.dossier2.desc": "Equality is one of the fundamental principles of our democracy. All websites and mobile applications of public bodies are subject to a requirement of non-discrimination of users, particularly on the issue of disability.",
    "index.pub1.title": "about... the history of Luxembourg",
    "index.pub1.desc": "This brochure briefly presents the evolution of Luxembourg from the 10th century to the present day. A timeline presents the key dates in Luxembourg's history throughout the pages.",
    "index.pub1.lang": "French, English, German",
    "index.pub2.title": "About... languages in Luxembourg",
    "index.pub2.desc": "Language use in the Grand Duchy of Luxembourg - 2025",
    "index.pub2.lang": "French, English, German, Luxembourgish",
    "index.langLabel": "LANGUAGE(S):",
    "index.portail1.title": "Public procurement portal",
    "index.portail1.desc": "Find all public contracts on the Luxembourg public procurement portal:",
    "index.portail2.title": "GovJobs Portal",
    "index.portail2.desc": "The Luxembourg State is recruiting! Discover vacancies for civil servants, employees and state workers:",
    "index.portail3.title": "Guichet.lu Portal",
    "index.portail3.desc": "Find all information, procedures and services offered by Luxembourg public bodies on Guichet.lu:",
    
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
    
    // Index page content
    "index.newsMain.title": "Vorstellung eines Maßnahmenpakets \"Mateneen. Fir all Famill. Fir all Kand.\": einheitliche Steuerklasse, Betreuungsgutschein, Familienbeihilfe",
    "index.newsMain.date": "06.01.2026",
    "index.newsMain.desc": "Der Livestream beginnt gegen 10:30 Uhr.",
    "index.newsSide1.title": "Neuerungen 2026",
    "index.newsSide1.date": "29.12.2025",
    "index.newsSide1.desc": "Neue gesetzliche und regulatorische Bestimmungen, die die Bürger direkt betreffen, treten 2026 in Kraft. Hier ist ein Überblick über die wichtigsten Änderungen.",
    "index.newsSide2.title": "Erklärung der luxemburgischen Regierung zur Lage in Venezuela",
    "index.newsSide2.date": "04.01.2026",
    "index.newsSide2.desc": "Die Regierung verfolgt die Ereignisse in Venezuela aufmerksam, nach der US-Militäroperation, bei der Nicolas Maduro und seine Frau gefangen genommen wurden.",
    "index.etatNation.desc": "Finden Sie hier die allgemeine politische Erklärung zur Lage der Nation 2025 von Luc Frieden sowie die entsprechenden Illustrationen.",
    "index.facebook.posted": "vor 6 Tagen",
    "index.conseil.desc": "Der Regierungsrat tagt wöchentlich im Staatsministerium, um alle Angelegenheiten auf der vom Premierminister festgelegten Tagesordnung zu beraten.",
    "index.conseil.note": "Die Pressemitteilungen des Regierungsrates sind auf Französisch.",
    "index.dossier1.title": "Die Regierungsbildung 2023",
    "index.dossier2.title": "Das Engagement der Regierung für digitale Barrierefreiheit",
    "index.dossier2.desc": "Gleichheit ist eines der Grundprinzipien unserer Demokratie. Alle Websites und mobilen Anwendungen öffentlicher Stellen unterliegen einer Nichtdiskriminierungsanforderung.",
    "index.pub1.title": "über... die Geschichte Luxemburgs",
    "index.pub1.desc": "Diese Broschüre präsentiert kurz die Entwicklung Luxemburgs vom 10. Jahrhundert bis heute.",
    "index.pub1.lang": "Französisch, Englisch, Deutsch",
    "index.pub2.title": "Über... Sprachen in Luxemburg",
    "index.pub2.desc": "Der Sprachgebrauch im Großherzogtum Luxemburg - 2025",
    "index.pub2.lang": "Französisch, Englisch, Deutsch, Luxemburgisch",
    "index.langLabel": "SPRACHE(N):",
    "index.portail1.title": "Portal für öffentliche Aufträge",
    "index.portail1.desc": "Finden Sie alle öffentlichen Aufträge auf dem luxemburgischen Portal für öffentliche Aufträge:",
    "index.portail2.title": "GovJobs Portal",
    "index.portail2.desc": "Der luxemburgische Staat stellt ein! Entdecken Sie freie Stellen:",
    "index.portail3.title": "Guichet.lu Portal",
    "index.portail3.desc": "Finden Sie alle Informationen und Dienstleistungen luxemburgischer öffentlicher Stellen auf Guichet.lu:",
    
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
    
    // Index page content
    "index.newsMain.title": "Presentatioun vun engem Moossnamenpaket \"Mateneen. Fir all Famill. Fir all Kand.\": eenzeg Steierklasse, Betreiungsgutschäin, Familljenzoulag",
    "index.newsMain.date": "06.01.2026",
    "index.newsMain.desc": "De Livestream fänkt géint 10:30 Auer un.",
    "index.newsSide1.title": "Neiegkeeten 2026",
    "index.newsSide1.date": "29.12.2025",
    "index.newsSide1.desc": "Nei legal a reglementaresch Bestëmmungen, déi d'Bierger direkt betreffen, trieden 2026 a Kraaft. Hei ass en Iwwerbléck iwwer déi wichtegst Ännerungen.",
    "index.newsSide2.title": "Communiqué vun der lëtzebuergescher Regierung iwwer d'Situatioun a Venezuela",
    "index.newsSide2.date": "04.01.2026",
    "index.newsSide2.desc": "D'Regierung suivéiert d'Evenementer a Venezuela no der US-Militäroperatioun, bei där de Nicolas Maduro a seng Fra festgeholl goufen.",
    "index.etatNation.desc": "Fannt hei d'allgemeng politesch Erklärung iwwer d'Lag vun der Natioun 2025 vum Luc Frieden mat den entspriechenden Illustratiounen.",
    "index.facebook.posted": "virun 6 Deeg",
    "index.conseil.desc": "De Regierungsrot trëfft sech all Woch am Staatsministère fir all Saachen op der Dagesuerdnung ze berueden.",
    "index.conseil.note": "D'Pressemëtteilunge vum Regierungsrot sinn op Franséisch.",
    "index.dossier1.title": "D'Regierungsbildung 2023",
    "index.dossier2.title": "Den Engagement vun der Regierung fir digital Accessibilitéit",
    "index.dossier2.desc": "Gläichheet ass ee vun de Grondprinzipien vun eiser Demokratie. All Websäiten an mobil Applikatioune vun ëffentleche Stellen ënnerlei enger Nichtdiskriminéierungsufuerderung.",
    "index.pub1.title": "iwwer... d'Geschicht vu Lëtzebuerg",
    "index.pub1.desc": "Dës Broschür presentéiert kuerz d'Entwécklung vu Lëtzebuerg vum 10. Joerhonnert bis haut.",
    "index.pub1.lang": "Franséisch, Englesch, Däitsch",
    "index.pub2.title": "Iwwer... Sproochen zu Lëtzebuerg",
    "index.pub2.desc": "De Sproochgebrauch am Groussherzogtum Lëtzebuerg - 2025",
    "index.pub2.lang": "Franséisch, Englesch, Däitsch, Lëtzebuergesch",
    "index.langLabel": "SPROOCH(EN):",
    "index.portail1.title": "Portal fir ëffentlech Ausschreiwungen",
    "index.portail1.desc": "Fannt all ëffentlech Ausschreiwungen um lëtzebuergeschen Portal:",
    "index.portail2.title": "GovJobs Portal",
    "index.portail2.desc": "De lëtzebuergesche Staat stellt an! Entdeckt fräi Plazen:",
    "index.portail3.title": "Guichet.lu Portal",
    "index.portail3.desc": "Fannt all Informatiounen a Servicer vun de lëtzebuerger ëffentleche Stellen op Guichet.lu:",
    
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
