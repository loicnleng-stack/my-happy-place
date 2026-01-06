import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const institutionCards = [
  { title: "CHEF DE L'ÉTAT", href: "#" },
  { title: "GOUVERNEMENT", href: "#" },
  { title: "SYSTÈME ÉLECTORAL", href: "#" },
  { title: "CHAMBRE DES DÉPUTÉS", href: "#" },
  { title: "CONSEIL D'ÉTAT", href: "#" },
  { title: "COUR DES COMPTES", href: "#" },
  { title: "CONSEIL ÉCONOMIQUE ET SOCIAL", href: "#" },
  { title: "CHAMBRES PROFESSIONNELLES", href: "#" },
  { title: "COURS ET TRIBUNAUX", href: "#" },
  { title: "PARTIS POLITIQUES", href: "#" },
  { title: "UNION EUROPÉENNE ET ORGANISATIONS INTERNATIONALES", href: "#" },
  { title: "CONSEIL SUPÉRIEUR POUR UN DÉVELOPPEMENT DURABLE", href: "#" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Main Content */}
        <article className="container py-8 md:py-12 animate-fade-in">
          {/* Last modified date */}
          <div className="text-right text-sm text-muted-foreground mb-6">
            Dernière modification le 20.08.2024
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-8">
            Système politique
          </h1>

          {/* Horizontal line */}
          <hr className="border-border mb-8" />

          {/* Content sections with staggered animations */}
          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Le Grand-Duché de Luxembourg est un <strong>État souverain et indépendant</strong> depuis le traité de Londres du 19 avril 1839. Le Luxembourg est une démocratie parlementaire sous la forme d'une <strong>monarchie constitutionnelle</strong>. La couronne du Grand-Duché est héréditaire dans la famille de Nassau-Weilbourg. Le Luxembourg possède par ailleurs une particularité: c'est l'unique Grand-Duché au monde.
            </p>

            <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              En 1919, la révision de la Constitution et l'introduction du suffrage universel marquent un tournant dans la vie politique du Grand-Duché. Avant cette date, le droit de vote était soumis au cens, c'est-à-dire un certain montant d'impôt payé, et restreint à la population masculine âgée d'au moins 25 ans. À partir de la révision de 1919, chaque citoyenne et chaque citoyen ayant atteint l'âge de 21 ans s'est vu reconnaître le droit de vote. En 1972, l'âge électoral a été abaissé à 18 ans.
            </p>

            <p className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Le Luxembourg est un État démocratique. En vertu de la Constitution, la Nation est la source de la puissance souveraine et c'est devant les représentants de la Nation souveraine que le <Link to="#" className="text-primary hover:underline">Grand-Duc</Link>, lors de son accession au trône, prête le serment constitutionnel.
            </p>

            <p className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              La Nation exerce sa souveraineté indirectement par l'intermédiaire de ses représentants, à savoir ses mandataires élus à la Chambre des députés, le Parlement luxembourgeois.
            </p>
          </div>

          {/* Paysage institutionnel */}
          <section className="mt-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Paysage institutionnel
            </h2>

            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                Les institutions du Luxembourg sont organisées selon le <strong>principe de la séparation des pouvoirs</strong>. Dans le contexte institutionnel luxembourgeois, cette séparation est souple puisqu'il existe de nombreuses relations notamment entre le pouvoir exécutif et le pouvoir législatif.
              </p>
            </div>
          </section>

          {/* Le pouvoir législatif */}
          <section className="mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h3 className="text-xl md:text-2xl font-light text-foreground mb-4">
              Le pouvoir législatif
            </h3>

            <div className="prose prose-lg max-w-none text-foreground">
              <p>
                Le pouvoir législatif est exercé par la <Link to="#" className="text-primary hover:underline">Chambre des députés</Link>. La Chambre des députés vote les lois selon les formes procédurales prévues par la Constitution et précisées par son règlement interne. Elle partage le droit d'initiative en matière législative avec le gouvernement.
              </p>
            </div>
          </section>

          {/* Le pouvoir exécutif */}
          <section className="mt-10 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h3 className="text-xl md:text-2xl font-light text-foreground mb-4">
              Le pouvoir exécutif
            </h3>

            <div className="prose prose-lg max-w-none text-foreground space-y-4">
              <p>
                Le Grand-Duc est le <Link to="#" className="text-primary hover:underline">Chef de l'État</Link>. Aux termes de la Constitution, le Grand-Duc exerce le pouvoir exécutif conjointement avec le gouvernement. À ce titre, il assure l'exécution des lois en prenant les règlements nécessaires.
              </p>
              <p>
                Dans la pratique toutefois, cette tâche est exercée par le gouvernement qui prend les décisions et initiatives nécessaires.
              </p>
              <p>
                En outre, le Grand-Duc représente le Grand-Duché sur le plan international.
              </p>
            </div>
          </section>

          {/* Le pouvoir judiciaire */}
          <section className="mt-10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h3 className="text-xl md:text-2xl font-light text-foreground mb-4">
              Le pouvoir judiciaire
            </h3>

            <div className="prose prose-lg max-w-none text-foreground space-y-4">
              <p>
                La Constitution prévoit que l'exercice du pouvoir judiciaire appartient aux <Link to="#" className="text-primary hover:underline">cours et tribunaux</Link>. Ils sont indépendants dans l'exercice de leurs fonctions. Il existe au Luxembourg deux ordres de juridiction:
              </p>
              <ul className="list-none space-y-2 ml-0">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">■</span>
                  <span>un <strong>ordre judiciaire</strong> connaissant des litiges civils, de nature pénale et les contestations relatives aux droits politiques;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">■</span>
                  <span>un <strong>ordre administratif</strong> tranchant les litiges avec l'administration.</span>
                </li>
              </ul>
              <p>
                Une <strong>Cour constitutionnelle</strong> statue sur la conformité des lois à la Constitution.
              </p>
            </div>
          </section>

          {/* Constitution et lois */}
          <section className="mt-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Constitution et lois
            </h2>

            <div className="prose prose-lg max-w-none text-foreground space-y-4">
              <p>
                La première Constitution luxembourgeoise a été rédigée en 1841, deux ans après l'indépendance du Luxembourg en 1839. La Constitution actuelle date du 17 octobre 1868, mais a depuis connu plusieurs révisions.
              </p>
              <p>
                La Constitution est la norme suprême de l'État. Elle proclame les droits fondamentaux et énonce les grands principes du fonctionnement de l'État.
              </p>
              <p>
                La loi est une règle de droit qui est adoptée par le pouvoir législatif et qui s'impose à tous les citoyens après promulgation par le Grand-Duc et publication au Journal officiel du Grand-Duché de Luxembourg.
              </p>
            </div>
          </section>

          {/* Institution Cards Grid */}
          <section className="mt-16 animate-fade-in" style={{ animationDelay: "1s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {institutionCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.href}
                  className="group bg-gray-50 hover:bg-primary border border-gray-200 hover:border-primary rounded-sm p-8 text-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <span className="text-sm md:text-base font-semibold text-primary group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
                    {card.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Pour en savoir plus */}
          <section className="mt-16 bg-gray-100 rounded-sm p-8 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            <h2 className="text-2xl font-light text-foreground mb-6">
              Pour en savoir plus
            </h2>

            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  Journal officiel du Grand-Duché de Luxembourg
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  Constitution luxembourgeoise
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  Site officiel des élections au Grand-Duché de Luxembourg
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  Historique des élections au Luxembourg sur le site de la Chambre des députés
                </a>
              </li>
            </ul>

            <h3 className="text-xl font-light text-foreground mt-8 mb-4">
              Publications
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  à propos... des symboles de l'État et de la Nation (Pdf, 1,03 Mo)
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  à propos... des institutions politiques au Luxembourg (Pdf, 1,25 Mo)
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline transition-colors">
                  Tout savoir sur le Grand-Duché de Luxembourg (Pdf, 592 Ko)
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
