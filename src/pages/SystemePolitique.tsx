import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SystemePolitique() {
  const { t } = useLanguage();

  const institutions = [
    { labelKey: "dropdown.chefEtat", href: "#" },
    { labelKey: "dropdown.gouvernement", href: "/gouvernement" },
    { labelKey: "dropdown.systemeElectoral", href: "#" },
    { labelKey: "dropdown.chambreDeputes", href: "#" },
    { labelKey: "dropdown.conseilEtat", href: "#" },
    { labelKey: "dropdown.courComptes", href: "#" },
    { labelKey: "dropdown.conseilEcoSocial", href: "#" },
    { labelKey: "dropdown.chambresPro", href: "#" },
    { labelKey: "dropdown.coursTribunaux", href: "#" },
    { labelKey: "dropdown.partisPolitiques", href: "#" },
    { labelKey: "dropdown.unionEuropeenne", href: "#", highlight: true },
    { labelKey: "dropdown.conseilDevDurable", href: "#" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8 max-w-5xl">
          {/* Title section */}
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-6">
            {t("politique.title")}
          </h1>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-right text-sm text-gray-500 mb-8">
              {t("politique.lastModified")} 20.08.2024
            </p>
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none text-foreground mb-10">
              <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t("politique.intro1") }} />
              <p className="leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: t("politique.intro2") }} />
              <p className="leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: t("politique.intro3") }} />
              <p className="leading-relaxed mt-4">{t("politique.intro4")}</p>
            </div>
            
            {/* Paysage institutionnel */}
            <section className="mb-10">
              <h2 className="text-2xl font-light text-primary mb-4">
                {t("politique.paysageTitle")}
              </h2>
              <p className="leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: t("politique.paysageDesc") }} />
            </section>
            
            {/* Le pouvoir législatif */}
            <section className="mb-10">
              <h3 className="text-xl font-normal text-foreground mb-3">
                {t("politique.legislatifTitle")}
              </h3>
              <p className="leading-relaxed text-foreground">
                {t("politique.legislatifDesc")}
              </p>
            </section>
            
            {/* Le pouvoir exécutif */}
            <section className="mb-10">
              <h3 className="text-xl font-normal text-foreground mb-3">
                {t("politique.executifTitle")}
              </h3>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.executifDesc1")}
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.executifDesc2")}
              </p>
              <p className="leading-relaxed text-foreground">
                {t("politique.executifDesc3")}
              </p>
            </section>
            
            {/* Le pouvoir judiciaire */}
            <section className="mb-10">
              <h3 className="text-xl font-normal text-foreground mb-3">
                {t("politique.judiciaireTitle")}
              </h3>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.judiciaireDesc")}
              </p>
              <ul className="list-none space-y-2 text-foreground mb-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span dangerouslySetInnerHTML={{ __html: t("politique.judiciaireOrdre1") }} />
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span dangerouslySetInnerHTML={{ __html: t("politique.judiciaireOrdre2") }} />
                </li>
              </ul>
              <p className="leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: t("politique.judiciaireConst") }} />
            </section>
            
            {/* Constitution et lois */}
            <section className="mb-12">
              <h2 className="text-2xl font-light text-primary mb-4">
                {t("politique.constitutionTitle")}
              </h2>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.constitutionDesc1")}
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.constitutionDesc2")}
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.constitutionDesc3")}
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                {t("politique.constitutionDesc4")}
              </p>
              <p className="leading-relaxed text-foreground">
                {t("politique.constitutionDesc5")}
              </p>
            </section>
            
            {/* Institution cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {institutions.map((inst, index) => (
                <Link
                  key={index}
                  to={inst.href}
                  className={`flex items-center justify-center text-center px-6 py-10 transition-colors font-medium text-sm tracking-wide uppercase ${
                    inst.highlight 
                      ? "bg-[hsl(210,55%,30%)] text-white hover:bg-[hsl(210,55%,35%)]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(inst.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}