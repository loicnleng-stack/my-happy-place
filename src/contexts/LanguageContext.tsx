import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "FR" | "EN" | "LU";

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
    
    // Header dropdowns
    "dropdown.toutesActualites": "Toutes les actualités",
    "dropdown.conseilsGouvernement": "Conseils de gouvernement",
    "dropdown.agenda": "Agenda",
    "dropdown.conferencesVideo": "Conférences de presse en vidéo",
    "dropdown.anciensMembres": "Anciens membres du gouvernement",
    "dropdown.chefEtat": "Chef de l'État",
    "dropdown.gouvernement": "Gouvernement",
    "dropdown.systemeElectoral": "Système électoral",
    "dropdown.chambreDeputes": "Chambre des députés",
    "dropdown.conseilEtat": "Conseil d'État",
    "dropdown.courComptes": "Cour des comptes",
    "dropdown.conseilEcoSocial": "Conseil économique et social",
    "dropdown.chambresPro": "Chambres professionnelles",
    "dropdown.coursTribunaux": "Cours et tribunaux",
    "dropdown.partisPolitiques": "Partis politiques",
    "dropdown.unionEuropeenne": "Union européenne et organisations internationales",
    "dropdown.conseilDevDurable": "Conseil supérieur pour un développement durable",
    "dropdown.verifPermis": "Vérification de mon permis de conduire",
    "dropdown.verifCarteSejour": "Vérification de ma carte de séjour",
    "dropdown.verifVisa": "Vérification de visa",
    
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
    
    // Système politique page
    "politique.title": "Système politique",
    "politique.lastModified": "Dernière modification le",
    "politique.intro1": "Le Grand-Duché de Luxembourg est un <strong>État souverain et indépendant</strong> depuis le traité de Londres du 19 avril 1839. Le Luxembourg est une démocratie parlementaire sous la forme d'une <strong>monarchie constitutionnelle</strong>. La couronne du Grand-Duché est héréditaire dans la famille de Nassau-Weilbourg. Le Luxembourg possède par ailleurs une particularité: c'est l'unique Grand-Duché au monde.",
    "politique.intro2": "En 1919, la révision de la Constitution et l'introduction du suffrage universel marquent un tournant dans la vie politique du Grand-Duché. Avant cette date, le droit de vote était soumis au cens, c'est-à-dire un certain montant d'impôt payé, et restreint à la population masculine âgée d'au moins 25 ans. À partir de la révision de 1919, chaque citoyenne et chaque citoyen ayant atteint l'âge de 21 ans s'est vu reconnaître le droit de vote. En 1972, l'âge électoral a été abaissé à 18 ans.",
    "politique.intro3": "Le Luxembourg est un État démocratique. En vertu de la Constitution, la Nation est la source de la puissance souveraine et c'est devant les représentants de la Nation souveraine que le Grand-Duc, lors de son accession au trône, prête le serment constitutionnel.",
    "politique.intro4": "La Nation exerce sa souveraineté indirectement par l'intermédiaire de ses représentants, à savoir ses mandataires élus à la Chambre des députés, le Parlement luxembourgeois.",
    "politique.paysageTitle": "Paysage institutionnel",
    "politique.paysageDesc": "Les institutions du Luxembourg sont organisées selon le <strong>principe de la séparation des pouvoirs</strong>. Dans le contexte institutionnel luxembourgeois, cette séparation est souple puisqu'il existe de nombreuses relations notamment entre le pouvoir exécutif et le pouvoir législatif.",
    "politique.legislatifTitle": "Le pouvoir législatif",
    "politique.legislatifDesc": "Le pouvoir législatif est exercé par la Chambre des députés. La Chambre des députés vote les lois selon les formes procédurales prévues par la Constitution et précisées par son règlement interne. Elle partage le droit d'initiative en matière législative avec le gouvernement.",
    "politique.executifTitle": "Le pouvoir exécutif",
    "politique.executifDesc1": "Le Grand-Duc est le Chef de l'État. Aux termes de la Constitution, le Grand-Duc exerce le pouvoir exécutif conjointement avec le gouvernement. À ce titre, il assure l'exécution des lois en prenant les règlements nécessaires.",
    "politique.executifDesc2": "Dans la pratique toutefois, cette tâche est exercée par le gouvernement qui prend les décisions et initiatives nécessaires.",
    "politique.executifDesc3": "En outre, le Grand-Duc représente le Grand-Duché sur le plan international.",
    "politique.judiciaireTitle": "Le pouvoir judiciaire",
    "politique.judiciaireDesc": "La Constitution prévoit que l'exercice du pouvoir judiciaire appartient aux cours et tribunaux. Ils sont indépendants dans l'exercice de leurs fonctions. Il existe au Luxembourg deux ordres de juridiction:",
    "politique.judiciaireOrdre1": "un <strong>ordre judiciaire</strong> connaissant des litiges civils, de nature pénale et les contestations relatives aux droits politiques;",
    "politique.judiciaireOrdre2": "un <strong>ordre administratif</strong> tranchant les litiges avec l'administration.",
    "politique.judiciaireConst": "Une <strong>Cour constitutionnelle</strong> statue sur la conformité des lois à la Constitution.",
    "politique.constitutionTitle": "Constitution et lois",
    "politique.constitutionDesc1": "La première Constitution luxembourgeoise a été rédigée en 1841, deux ans après l'indépendance du Luxembourg en 1839. La Constitution actuelle date du 17 octobre 1868, mais a depuis connu plusieurs révisions.",
    "politique.constitutionDesc2": "La Constitution est la norme suprême de l'État. Elle proclame les droits fondamentaux et énonce les grands principes du fonctionnement de l'État.",
    "politique.constitutionDesc3": "La loi est une règle de droit qui est adoptée par le pouvoir législatif et qui s'impose à tous les citoyens après promulgation par le Grand-Duc et publication au Journal officiel du Grand-Duché de Luxembourg.",
    "politique.constitutionDesc4": "Alors que la Constitution est plus rigide et sa procédure de révision plus laborieuse, les lois font plus souvent l'objet de modifications. Une loi ne peut être modifiée que par une autre loi. Le Conseil d'État peut, de son côté, attirer l'attention du gouvernement sur l'opportunité de nouvelles lois ou de nouveaux règlements ou de modifications à introduire dans les lois et règlements existants.",
    "politique.constitutionDesc5": "L'initiative d'une loi peut émaner soit de la Chambre des députés, soit du gouvernement, soit des électeurs. Dans le premier cas, on parle d'une initiative parlementaire et de proposition de lois; dans le deuxième cas, il s'agit d'une initiative gouvernementale, appelée projet de loi; dans le troisième cas, il s'agit de \"propositions motivées aux fins de légiférer\" présentées par cent-vingt et soutenues par douze mille cinq cents électeurs au moins.",
    
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
    
    // Header dropdowns
    "dropdown.toutesActualites": "All news",
    "dropdown.conseilsGouvernement": "Government councils",
    "dropdown.agenda": "Agenda",
    "dropdown.conferencesVideo": "Press conferences on video",
    "dropdown.anciensMembres": "Former government members",
    "dropdown.chefEtat": "Head of State",
    "dropdown.gouvernement": "Government",
    "dropdown.systemeElectoral": "Electoral system",
    "dropdown.chambreDeputes": "Chamber of Deputies",
    "dropdown.conseilEtat": "Council of State",
    "dropdown.courComptes": "Court of Auditors",
    "dropdown.conseilEcoSocial": "Economic and Social Council",
    "dropdown.chambresPro": "Professional chambers",
    "dropdown.coursTribunaux": "Courts and tribunals",
    "dropdown.partisPolitiques": "Political parties",
    "dropdown.unionEuropeenne": "European Union and international organisations",
    "dropdown.conseilDevDurable": "High Council for Sustainable Development",
    "dropdown.verifPermis": "Verify my driving licence",
    "dropdown.verifCarteSejour": "Verify my residence permit",
    "dropdown.verifVisa": "Verify visa",
    
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
    
    // Système politique page
    "politique.title": "Political system",
    "politique.lastModified": "Last modified on",
    "politique.intro1": "The Grand Duchy of Luxembourg has been a <strong>sovereign and independent State</strong> since the Treaty of London of 19 April 1839. Luxembourg is a parliamentary democracy in the form of a <strong>constitutional monarchy</strong>. The crown of the Grand Duchy is hereditary in the Nassau-Weilbourg family. Luxembourg also has a particularity: it is the only Grand Duchy in the world.",
    "politique.intro2": "In 1919, the revision of the Constitution and the introduction of universal suffrage marked a turning point in the political life of the Grand Duchy. Before that date, the right to vote was subject to a census, i.e. a certain amount of tax paid, and restricted to the male population aged at least 25. From the 1919 revision, every citizen who had reached the age of 21 was granted the right to vote. In 1972, the voting age was lowered to 18.",
    "politique.intro3": "Luxembourg is a democratic State. Under the Constitution, the Nation is the source of sovereign power and it is before the representatives of the sovereign Nation that the Grand Duke, upon his accession to the throne, takes the constitutional oath.",
    "politique.intro4": "The Nation exercises its sovereignty indirectly through its representatives, namely its elected members of the Chamber of Deputies, the Luxembourg Parliament.",
    "politique.paysageTitle": "Institutional landscape",
    "politique.paysageDesc": "Luxembourg's institutions are organised according to the <strong>principle of separation of powers</strong>. In the Luxembourg institutional context, this separation is flexible since there are many relationships, particularly between the executive and legislative powers.",
    "politique.legislatifTitle": "The legislative power",
    "politique.legislatifDesc": "Legislative power is exercised by the Chamber of Deputies. The Chamber of Deputies votes on laws according to the procedural forms provided for in the Constitution and specified in its internal rules. It shares the right of initiative in legislative matters with the government.",
    "politique.executifTitle": "The executive power",
    "politique.executifDesc1": "The Grand Duke is the Head of State. Under the Constitution, the Grand Duke exercises executive power jointly with the government. As such, he ensures the execution of laws by taking the necessary regulations.",
    "politique.executifDesc2": "In practice, however, this task is carried out by the government which takes the necessary decisions and initiatives.",
    "politique.executifDesc3": "In addition, the Grand Duke represents the Grand Duchy internationally.",
    "politique.judiciaireTitle": "The judicial power",
    "politique.judiciaireDesc": "The Constitution provides that the exercise of judicial power belongs to the courts and tribunals. They are independent in the exercise of their functions. There are two orders of jurisdiction in Luxembourg:",
    "politique.judiciaireOrdre1": "a <strong>judicial order</strong> dealing with civil and criminal disputes and disputes relating to political rights;",
    "politique.judiciaireOrdre2": "an <strong>administrative order</strong> settling disputes with the administration.",
    "politique.judiciaireConst": "A <strong>Constitutional Court</strong> rules on the conformity of laws with the Constitution.",
    "politique.constitutionTitle": "Constitution and laws",
    "politique.constitutionDesc1": "The first Luxembourg Constitution was drafted in 1841, two years after Luxembourg's independence in 1839. The current Constitution dates from 17 October 1868, but has since undergone several revisions.",
    "politique.constitutionDesc2": "The Constitution is the supreme norm of the State. It proclaims fundamental rights and sets out the main principles of the functioning of the State.",
    "politique.constitutionDesc3": "The law is a rule of law which is adopted by the legislative power and which is binding on all citizens after promulgation by the Grand Duke and publication in the Official Journal of the Grand Duchy of Luxembourg.",
    "politique.constitutionDesc4": "While the Constitution is more rigid and its revision procedure more laborious, laws are more frequently subject to amendments. A law can only be amended by another law. The Council of State can, for its part, draw the government's attention to the advisability of new laws or regulations or of amendments to be introduced in existing laws and regulations.",
    "politique.constitutionDesc5": "The initiative for a law may come either from the Chamber of Deputies, or from the government, or from the voters. In the first case, we speak of a parliamentary initiative and a bill; in the second case, it is a government initiative, called a draft law; in the third case, it is \"reasoned proposals for legislation\" presented by one hundred and twenty and supported by at least twelve thousand five hundred voters.",
    
    // Common
    "common.lastModified": "Last modified on",
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
    
    // Header dropdowns
    "dropdown.toutesActualites": "All Noriichten",
    "dropdown.conseilsGouvernement": "Regierungsréit",
    "dropdown.agenda": "Agenda",
    "dropdown.conferencesVideo": "Pressekonferenzen op Video",
    "dropdown.anciensMembres": "Fréier Regierungsmemberen",
    "dropdown.chefEtat": "Staatschef",
    "dropdown.gouvernement": "Regierung",
    "dropdown.systemeElectoral": "Wahlsystem",
    "dropdown.chambreDeputes": "Chamber vun den Deputéierten",
    "dropdown.conseilEtat": "Staatsrot",
    "dropdown.courComptes": "Rechnungshaff",
    "dropdown.conseilEcoSocial": "Wirtschafts- a Sozialrot",
    "dropdown.chambresPro": "Beruffskummeren",
    "dropdown.coursTribunaux": "Geriichter an Tribunaler",
    "dropdown.partisPolitiques": "Politesch Parteien",
    "dropdown.unionEuropeenne": "Europäesch Unioun an international Organisatiounen",
    "dropdown.conseilDevDurable": "Héichrot fir nohalteg Entwécklung",
    "dropdown.verifPermis": "Mäi Führerschäin iwwerpréiwen",
    "dropdown.verifCarteSejour": "Meng Openthaltskaart iwwerpréiwen",
    "dropdown.verifVisa": "Visa iwwerpréiwen",
    
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
    
    // Système politique page
    "politique.title": "Politesche System",
    "politique.lastModified": "Lescht Ännerung de",
    "politique.intro1": "D'Groussherzogtum Lëtzebuerg ass e <strong>souveränen an onofhängege Staat</strong> zënter dem Londoner Traité vum 19. Abrëll 1839. Lëtzebuerg ass eng parlamentaresch Demokratie a Form vun enger <strong>konstitutioneller Monarchie</strong>. D'Kroun vum Groussherzogtum ass ierflech an der Famill Nassau-Weilburg. Lëtzebuerg huet och eng Besonderheet: et ass dat eenzegt Groussherzogtum op der Welt.",
    "politique.intro2": "1919 markéieren d'Revisioun vun der Verfassung an d'Aféierung vum allgemengen Wahlrecht e Wendepunkt am politesche Liewen vum Groussherzogtum. Virun dësem Datum war d'Wahlrecht ofhängeg vun engem Zensus, dat heescht vun engem bestëmmten Steierbeträg, a war op männlech Populatioun mat engem Mindestalter vu 25 Joer beschränkt. Vun der Revisioun vun 1919 un huet all Biergerin an all Bierger mat 21 Joer d'Wahlrecht kritt. 1972 gouf d'Walalter op 18 Joer erofgesat.",
    "politique.intro3": "Lëtzebuerg ass en demokratesche Staat. Laut der Verfassung ass d'Natioun d'Quell vun der souveräner Muecht an et ass virun de Vertrieder vun der souveräner Natioun, datt de Grand-Duc, bei senger Throunbestiignung, de konstitutionellen Eed leet.",
    "politique.intro4": "D'Natioun übt hir Souveränitéit indirekt iwwer hir Vertrieder aus, nämlech hir gewielt Vertrieder an der Chamber vun den Deputéierten, dem Lëtzebuerger Parlament.",
    "politique.paysageTitle": "Institutionellt Landschaft",
    "politique.paysageDesc": "D'Institutiounen vu Lëtzebuerg sinn no dem <strong>Prinzip vun der Trennung vun de Gewalten</strong> organiséiert. Am lëtzebuerger institutionellen Kontext ass dës Trennung flexibel well et vill Bezéiungen gëtt, besonnesch tëscht der exekutiver an der legislativer Gewalt.",
    "politique.legislatifTitle": "D'legislativ Gewalt",
    "politique.legislatifDesc": "D'legislativ Gewalt gëtt vun der Chamber vun den Deputéierten ausgeübt. D'Chamber vun den Deputéierten stëmmt iwwer Gesetzer no de prozeduralen Formen déi an der Verfassung virgesinn sinn a sech no hirem internen Reglement riichten. Si deelt d'Initiativrecht a legislativen Affären mat der Regierung.",
    "politique.executifTitle": "D'exekutiv Gewalt",
    "politique.executifDesc1": "De Grand-Duc ass de Staatschef. Laut der Verfassung übt de Grand-Duc d'exekutiv Gewalt zesumme mat der Regierung aus. Als solchen assuréiert hien d'Exekutioun vun de Gesetzer andeems hien déi néideg Reglementer hëlt.",
    "politique.executifDesc2": "An der Praxis awer gëtt dës Aufgab vun der Regierung ausgefouert déi déi néideg Decisiounen an Initiativen hëlt.",
    "politique.executifDesc3": "Zousätzlech representéiert de Grand-Duc d'Groussherzogtum op internationalem Plang.",
    "politique.judiciaireTitle": "D'judiciär Gewalt",
    "politique.judiciaireDesc": "D'Verfassung gesäit vir datt d'Ausübung vun der judiciairer Gewalt de Geriichter an Tribunaler gehéiert. Si sinn onofhängeg an der Ausübung vun hire Funktiounen. Et ginn zu Lëtzebuerg zwou Uerdnunge vun der Jurisdiktioun:",
    "politique.judiciaireOrdre1": "eng <strong>judiciär Uerdnung</strong> déi sech mat zivilen, strafrechtlechen Streitsaachen a Streitsaachen iwwer politesch Rechter beschäftegt;",
    "politique.judiciaireOrdre2": "eng <strong>administrativ Uerdnung</strong> déi Streitsaachen mat der Verwaltung regelt.",
    "politique.judiciaireConst": "E <strong>Verfassungsgeriicht</strong> entscheet iwwer d'Konformitéit vun de Gesetzer mat der Verfassung.",
    "politique.constitutionTitle": "Verfassung a Gesetzer",
    "politique.constitutionDesc1": "Déi éischt lëtzebuerger Verfassung gouf 1841 opgestallt, zwee Joer no der Onofhängegkeet vu Lëtzebuerg 1839. Déi aktuell Verfassung datéiert vum 17. Oktober 1868, awer huet säit deem verschidden Revisiounen duerchgemaach.",
    "politique.constitutionDesc2": "D'Verfassung ass déi héchst Norm vum Staat. Si proklaméiert d'Grondrechter an erkleet d'Haaptprinzipie vum Funktionnement vum Staat.",
    "politique.constitutionDesc3": "D'Gesetz ass eng Rechtsregel déi vun der legislativer Gewalt ugeholl gëtt an déi all Bierger verbindlech ass nodeems se vum Grand-Duc promulguéiert an am Mémorial vum Groussherzogtum Lëtzebuerg publizéiert gouf.",
    "politique.constitutionDesc4": "Wärend d'Verfassung méi starr ass an hir Revisiounsprozedur méi opwendeg, gi Gesetzer méi oft geännert. E Gesetz kann nëmme vun engem anere Gesetz geännert ginn. De Staatsrot kann, säinerseits, d'Opmierksamkeet vun der Regierung op d'Opportunitéit vun neie Gesetzer oder Reglementer oder vun Ännerungen an existéierende Gesetzer a Reglementer zéien.",
    "politique.constitutionDesc5": "D'Initiativ fir e Gesetz kann entweder vun der Chamber vun den Deputéierten, oder vun der Regierung, oder vun de Wieler kommen. Am éischte Fall schwätze mer vun enger parlamentarescher Initiativ an engem Gesetzesprojet; am zweete Fall ass et eng Regierungsinitiativ, genannt Gesetzesentworf; am drëtte Fall sinn et \"motivéiert Propositioune fir ze legiferéieren\" déi vun honnert an zwanzeg präsentéiert a vun op d'mannst zwielef dausend fënnefhonnert Wieler ënnerstëtzt ginn.",
    
    // Common
    "common.lastModified": "Lescht Ännerung de",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("selectedLanguage");
    // If user had DE selected before, fallback to FR
    if (saved === "DE" || !["FR", "EN", "LU"].includes(saved || "")) {
      return "FR";
    }
    return saved as Language;
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
