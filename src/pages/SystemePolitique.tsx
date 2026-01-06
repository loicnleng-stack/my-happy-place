import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const institutions = [
  { label: "CHEF DE L'ÉTAT", href: "#" },
  { label: "GOUVERNEMENT", href: "/gouvernement" },
  { label: "SYSTÈME ÉLECTORAL", href: "#" },
  { label: "CHAMBRE DES DÉPUTÉS", href: "#" },
  { label: "CONSEIL D'ÉTAT", href: "#" },
  { label: "COUR DES COMPTES", href: "#" },
  { label: "CONSEIL ÉCONOMIQUE ET SOCIAL", href: "#" },
  { label: "CHAMBRES PROFESSIONNELLES", href: "#" },
  { label: "COURS ET TRIBUNAUX", href: "#" },
  { label: "PARTIS POLITIQUES", href: "#" },
  { label: "UNION EUROPÉENNE ET ORGANISATIONS INTERNATIONALES", href: "#", highlight: true },
  { label: "CONSEIL SUPÉRIEUR POUR UN DÉVELOPPEMENT DURABLE", href: "#" },
];

export default function SystemePolitique() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8 max-w-5xl">
          {/* Title section */}
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-6">
            Système politique
          </h1>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-right text-sm text-gray-500 mb-8">
              Dernière modification le 20.08.2024
            </p>
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none text-foreground mb-10">
              <p className="leading-relaxed">
                Le Grand-Duché de Luxembourg est un <strong>État souverain et indépendant</strong> depuis le traité de Londres du 19 avril 1839. Le Luxembourg est une démocratie parlementaire sous la forme d'une <strong>monarchie constitutionnelle</strong>. La couronne du Grand-Duché est héréditaire dans la famille de Nassau-Weilbourg. Le Luxembourg possède par ailleurs une particularité: c'est l'unique Grand-Duché au monde.
              </p>
              
              <p className="leading-relaxed mt-4">
                En 1919, la révision de la Constitution et l'introduction du suffrage universel marquent un tournant dans la vie politique du Grand-Duché. Avant cette date, le droit de vote était soumis au cens, c'est-à-dire un certain montant d'impôt payé, et restreint à la population masculine âgée d'au moins 25 ans. À partir de la révision de 1919, chaque citoyenne et chaque citoyen ayant atteint l'âge de 21 ans s'est vu reconnaître le droit de vote. En 1972, l'âge électoral a été abaissé à 18 ans.
              </p>
              
              <p className="leading-relaxed mt-4">
                Le Luxembourg est un État démocratique. En vertu de la Constitution, la Nation est la source de la puissance souveraine et c'est devant les représentants de la Nation souveraine que le <Link to="#" className="text-primary hover:underline">Grand-Duc</Link>, lors de son accession au trône, prête le serment constitutionnel.
              </p>
              
              <p className="leading-relaxed mt-4">
                La Nation exerce sa souveraineté indirectement par l'intermédiaire de ses représentants, à savoir ses mandataires élus à la Chambre des députés, le Parlement luxembourgeois.
              </p>
            </div>
            
            {/* Paysage institutionnel */}
            <section className="mb-10">
              <h2 className="text-2xl font-light text-primary mb-4">
                Paysage institutionnel
              </h2>
              <p className="leading-relaxed text-foreground">
                Les institutions du Luxembourg sont organisées selon le <strong>principe de la séparation des pouvoirs</strong>. Dans le contexte institutionnel luxembourgeois, cette séparation est souple puisqu'il existe de nombreuses relations notamment entre le pouvoir exécutif et le pouvoir législatif.
              </p>
            </section>
            
            {/* Le pouvoir législatif */}
            <section className="mb-10">
              <h3 className="text-xl font-normal text-foreground mb-3">
                Le pouvoir législatif
              </h3>
              <p className="leading-relaxed text-foreground">
                Le pouvoir législatif est exercé par la <Link to="#" className="text-primary hover:underline">Chambre des députés</Link>. La Chambre des députés vote les lois selon les formes procédurales prévues par la Constitution et précisées par son règlement interne. Elle partage le droit d'initiative en matière législative avec le gouvernement.
              </p>
            </section>
            
            {/* Le pouvoir exécutif */}
            <section className="mb-10">
              <h3 className="text-xl font-normal text-foreground mb-3">
                Le pouvoir exécutif
              </h3>
              <p className="leading-relaxed text-foreground mb-4">
                Le Grand-Duc est le <Link to="#" className="text-primary hover:underline">Chef de l'État</Link>. Aux termes de la Constitution, le Grand-Duc exerce le pouvoir exécutif conjointement avec le gouvernement. À ce titre, il assure l'exécution des lois en prenant les règlements nécessaires.
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                Dans la pratique toutefois, cette tâche est exercée par le gouvernement qui prend les décisions et initiatives nécessaires.
              </p>
              <p className="leading-relaxed text-foreground">
                En outre, le Grand-Duc représente le Grand-Duché sur le plan international.
              </p>
            </section>
            
            {/* Le pouvoir judiciaire */}
            <section className="mb-10">
              <h3 className="text-xl font-normal text-foreground mb-3">
                Le pouvoir judiciaire
              </h3>
              <p className="leading-relaxed text-foreground mb-4">
                La Constitution prévoit que l'exercice du pouvoir judiciaire appartient aux <Link to="#" className="text-primary hover:underline">cours et tribunaux</Link>. Ils sont indépendants dans l'exercice de leurs fonctions. Il existe au Luxembourg deux ordres de juridiction:
              </p>
              <ul className="list-none space-y-2 text-foreground mb-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span>un <strong>ordre judiciaire</strong> connaissant des litiges civils, de nature pénale et les contestations relatives aux droits politiques;</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span>un <strong>ordre administratif</strong> tranchant les litiges avec l'administration.</span>
                </li>
              </ul>
              <p className="leading-relaxed text-foreground">
                Une <strong>Cour constitutionnelle</strong> statue sur la conformité des lois à la Constitution.
              </p>
            </section>
            
            {/* Constitution et lois */}
            <section className="mb-12">
              <h2 className="text-2xl font-light text-primary mb-4">
                Constitution et lois
              </h2>
              <p className="leading-relaxed text-foreground mb-4">
                La première Constitution luxembourgeoise a été rédigée en 1841, deux ans après l'indépendance du Luxembourg en 1839. La Constitution actuelle date du 17 octobre 1868, mais a depuis connu plusieurs révisions.
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                La Constitution est la norme suprême de l'État. Elle proclame les droits fondamentaux et énonce les grands principes du fonctionnement de l'État.
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                La loi est une règle de droit qui est adoptée par le pouvoir législatif et qui s'impose à tous les citoyens après promulgation par le Grand-Duc et publication au Journal officiel du Grand-Duché de Luxembourg.
              </p>
              <p className="leading-relaxed text-foreground mb-4">
                Alors que la Constitution est plus rigide et sa procédure de révision plus laborieuse, les lois font plus souvent l'objet de modifications. Une loi ne peut être modifiée que par une autre loi. Le Conseil d'État peut, de son côté, attirer l'attention du gouvernement sur l'opportunité de nouvelles lois ou de nouveaux règlements ou de modifications à introduire dans les lois et règlements existants.
              </p>
              <p className="leading-relaxed text-foreground">
                L'initiative d'une loi peut émaner soit de la Chambre des députés, soit du gouvernement, soit des électeurs. Dans le premier cas, on parle d'une initiative parlementaire et de proposition de lois; dans le deuxième cas, il s'agit d'une initiative gouvernementale, appelée projet de loi; dans le troisième cas, il s'agit de "propositions motivées aux fins de légiférer" présentées par cent-vingt et soutenues par douze mille cinq cents électeurs au moins.
              </p>
            </section>
            
            {/* Institution cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {institutions.map((inst, index) => (
                <Link
                  key={index}
                  to={inst.href}
                  className={`flex items-center justify-center text-center px-6 py-10 transition-colors font-medium text-sm tracking-wide ${
                    inst.highlight 
                      ? "bg-[hsl(210,55%,30%)] text-white hover:bg-[hsl(210,55%,35%)]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {inst.label}
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
