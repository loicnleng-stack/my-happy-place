import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VisaSearchForm } from "@/components/VisaSearchForm";
import { Shield, FileCheck, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vérification de Visa
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Service officiel de vérification de l'authenticité et de la validité 
                des visas délivrés par les autorités compétentes.
              </p>
            </div>

            <VisaSearchForm />
          </div>
        </section>

        {/* Features section */}
        <section className="py-12 md:py-16 bg-card">
          <div className="container">
            <h2 className="text-2xl font-semibold text-center text-foreground mb-10">
              Comment ça fonctionne
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Entrez vos informations
                </h3>
                <p className="text-muted-foreground text-sm">
                  Saisissez votre numéro de passeport et le numéro de référence 
                  de votre visa dans le formulaire ci-dessus.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Vérification instantanée
                </h3>
                <p className="text-muted-foreground text-sm">
                  Notre système vérifie automatiquement vos informations 
                  dans la base de données sécurisée.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Résultats sécurisés
                </h3>
                <p className="text-muted-foreground text-sm">
                  Consultez le statut de votre visa et ses détails 
                  en toute confidentialité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Info section */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <div className="gov-card p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Informations importantes
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  Ce service vous permet de vérifier l'authenticité d'un visa. 
                  Pour effectuer une recherche, vous devez disposer de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Votre numéro de passeport exact</li>
                  <li>Le numéro de référence figurant sur votre visa</li>
                </ul>
                <p>
                  Les informations affichées sont à titre indicatif. Pour toute 
                  question officielle concernant votre visa, veuillez contacter 
                  les services consulaires compétents.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;