import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Rss } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* RUBRIQUES */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                {t("footer.rubriques")}
              </h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <span className="cursor-default">
                    {t("nav.actualites")}
                  </span>
                </li>
                <li>
                  <Link to="/gouvernement" className="hover:text-primary-foreground transition-colors font-semibold text-primary-foreground">
                    {t("nav.gouvernement")}
                  </Link>
                </li>
                <li>
                  <span className="cursor-default">
                    {t("nav.ministeres")}
                  </span>
                </li>
                <li>
                  <Link to="/administrations" className="hover:text-primary-foreground transition-colors">
                    {t("nav.administrations")}
                  </Link>
                </li>
                <li>
                  <span className="cursor-default">
                    {t("nav.dossiers")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="pt-9">
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <Link to="/systeme-politique" className="hover:text-primary-foreground transition-colors">
                    {t("nav.systemePolitique")}
                  </Link>
                </li>
                <li>
                  <span className="cursor-default">
                    {t("footer.publications")}
                  </span>
                </li>
                <li>
                  <span className="cursor-default">
                    {t("footer.conferences")}
                  </span>
                </li>
                <li>
                  <span className="cursor-default">
                    {t("footer.agenda")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.support")}
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <span className="cursor-default">
                  {t("footer.contact")}
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  {t("footer.sitemap")}
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  {t("footer.about")}
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  {t("footer.legalAspects")}
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  {t("footer.accessibilityStatement")}
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  {t("footer.cookies")}
                </span>
              </li>
            </ul>
          </div>

          {/* RESTEZ CONNECTÉ */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.stayConnected")}
            </h3>
            <div className="flex items-center gap-3 mb-6">
              <span 
                className="w-9 h-9 bg-primary-foreground rounded-full flex items-center justify-center cursor-default"
                title="Twitter"
              >
                <span className="text-primary font-bold text-lg">𝕏</span>
              </span>
              <span 
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center cursor-default"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </span>
              <span 
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center cursor-default"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </span>
              <span 
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center cursor-default"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </span>
              <span 
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center cursor-default"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </span>
              <span 
                className="w-9 h-9 bg-primary-foreground/20 rounded-full flex items-center justify-center cursor-default"
                title="RSS"
              >
                <Rss className="w-4 h-4" />
              </span>
            </div>
            <span 
              className="inline-flex items-center gap-2 text-sm text-primary-foreground cursor-default"
            >
              <Instagram className="w-4 h-4" />
              <span className="uppercase font-semibold tracking-wide">{t("footer.newsletter")}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
