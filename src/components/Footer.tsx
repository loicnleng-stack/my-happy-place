import { Link } from "react-router-dom";
import { ExternalLink, Facebook, Instagram, Linkedin, Youtube, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* RUBRIQUES */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                Rubriques
              </h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <Link to="/actualites" className="hover:text-primary-foreground transition-colors">
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link to="/gouvernement" className="hover:text-primary-foreground transition-colors font-semibold text-primary-foreground">
                    Le gouvernement
                  </Link>
                </li>
                <li>
                  <Link to="/ministeres" className="hover:text-primary-foreground transition-colors">
                    Ministères
                  </Link>
                </li>
                <li>
                  <Link to="/administrations" className="hover:text-primary-foreground transition-colors">
                    Administrations
                  </Link>
                </li>
                <li>
                  <Link to="/dossiers" className="hover:text-primary-foreground transition-colors">
                    Dossiers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pt-9">
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <Link to="/" className="hover:text-primary-foreground transition-colors">
                    Système politique
                  </Link>
                </li>
                <li>
                  <Link to="/publications" className="hover:text-primary-foreground transition-colors">
                    Publications
                  </Link>
                </li>
                <li>
                  <Link to="/conferences" className="hover:text-primary-foreground transition-colors">
                    Conférences de presse en vidéo
                  </Link>
                </li>
                <li>
                  <Link to="/agenda" className="hover:text-primary-foreground transition-colors">
                    Agenda
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Plan du site
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  À propos du site
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Aspects légaux
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Déclaration d'accessibilité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Gestion des cookies
                </a>
              </li>
            </ul>
          </div>

          {/* RESTEZ CONNECTÉ */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Restez connecté
            </h3>
            <div className="flex items-center gap-3 mb-6">
              <a 
                href="https://twitter.com/goulouxembourg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-primary-foreground rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                title="Twitter - Nouvelle fenêtre"
              >
                <span className="text-primary font-bold text-lg">𝕏</span>
              </a>
              <a 
                href="https://facebook.com/gouvernement.lu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                title="Facebook - Nouvelle fenêtre"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/gouvernement.lu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                title="Instagram - Nouvelle fenêtre"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/company/gouvernement-luxembourgeois" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                title="LinkedIn - Nouvelle fenêtre"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com/gouvernementlu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                title="YouTube - Nouvelle fenêtre"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                title="Flux RSS"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm text-primary-foreground hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span className="uppercase font-semibold tracking-wide">Abonnez-vous à notre newsletter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
