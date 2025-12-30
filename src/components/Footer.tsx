import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/10 rounded">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">visa.gouv.lu</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Service officiel de vérification des visas. 
              Vérifiez l'authenticité et la validité de votre visa en toute sécurité.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Liens rapides
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/" className="hover:text-primary-foreground transition-colors">
                  Vérifier un visa
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Informations légales
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Accessibilité
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Service de Vérification des Visas. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}