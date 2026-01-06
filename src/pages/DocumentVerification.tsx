import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { FileCheck, CreditCard, FileText } from "lucide-react";

const DocumentVerification = () => {
  const verificationOptions = [
    {
      title: "Vérification de mon permis de conduire",
      description: "Vérifiez l'authenticité et la validité de votre permis de conduire délivré par le Luxembourg.",
      icon: CreditCard,
      href: "/verification/permis-conduire",
      available: false,
    },
    {
      title: "Vérification de ma carte de séjour",
      description: "Vérifiez l'authenticité et la validité de votre carte de séjour luxembourgeoise.",
      icon: FileCheck,
      href: "/verification/carte-sejour",
      available: false,
    },
    {
      title: "Vérification de visa",
      description: "Vérifiez l'authenticité et la validité d'un visa délivré par le Luxembourg.",
      icon: FileText,
      href: "/verification/visa",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vérification de documents
              </h1>
              <p className="text-lg text-muted-foreground">
                Service officiel de vérification des documents délivrés par le Grand-Duché de Luxembourg
              </p>
            </div>
          </div>
        </section>

        {/* Verification Options */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {verificationOptions.map((option, index) => (
                <div 
                  key={index}
                  className={`gov-card p-6 transition-all ${
                    option.available 
                      ? "hover:shadow-lg cursor-pointer" 
                      : "opacity-60"
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <option.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  {option.available ? (
                    <Link 
                      to={option.href}
                      className="inline-flex items-center text-primary hover:underline font-medium text-sm"
                    >
                      Accéder au service →
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      Service bientôt disponible
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Informations importantes
              </h2>

              <div className="space-y-4">
                <div className="gov-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Service officiel
                  </h3>
                  <p className="text-muted-foreground">
                    Ce service est fourni par le gouvernement du Grand-Duché de Luxembourg. 
                    Toutes les vérifications sont effectuées en temps réel avec les bases de données officielles.
                  </p>
                </div>

                <div className="gov-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Protection des données
                  </h3>
                  <p className="text-muted-foreground">
                    Vos données personnelles sont traitées conformément au RGPD et aux lois luxembourgeoises 
                    sur la protection des données. Aucune information n'est conservée après la vérification.
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

export default DocumentVerification;
