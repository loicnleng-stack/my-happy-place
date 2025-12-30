import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="gov-header">
      {/* Top bar with logo */}
      <div className="border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">
                Service de Vérification
              </p>
              <p className="text-lg font-semibold text-primary-foreground">
                visa.gouv.lu
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="hidden md:inline-flex text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Administration
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="gov-nav hidden md:block">
        <div className="container">
          <ul className="flex items-center gap-8 py-3 text-sm">
            <li>
              <Link
                to="/"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                Vérifier un visa
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                Informations
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-primary-foreground/10 animate-fade-in">
          <ul className="container py-4 space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vérifier un visa
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Administration
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}