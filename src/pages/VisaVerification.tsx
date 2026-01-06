import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VisaSearchForm } from "@/components/VisaSearchForm";
import { FileCheck, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VisaVerification = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-2xl mx-auto">
              <VisaSearchForm />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <h2 className="text-2xl font-semibold text-center text-foreground mb-10">
              {t("features.title")}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t("features.step1.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("features.step1.desc")}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t("features.step2.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("features.step2.desc")}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t("features.step3.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("features.step3.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {t("info.title")}
              </h2>

              <div className="space-y-4">
                <div className="gov-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("info.required")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("info.requiredDesc")}
                  </p>
                </div>

                <div className="gov-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("info.official")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("info.officialDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VisaVerification;
