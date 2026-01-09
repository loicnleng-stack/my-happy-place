import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronUp, Home, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import govLogo from "@/assets/gov-logo.png";

// Dropdown data for each menu
const dropdownData: Record<string, { label: string; href: string }[]> = {
  actualites: [
    { label: "Toutes les actualités", href: "#" },
    { label: "Conseils de gouvernement", href: "#" },
    { label: "Agenda", href: "#" },
    { label: "Conférences de presse en vidéo", href: "#" },
  ],
  gouvernement: [
    { label: "Luc FRIEDEN", href: "/gouvernement" },
    { label: "Xavier BETTEL", href: "/gouvernement" },
    { label: "Marc SPAUTZ", href: "/gouvernement" },
    { label: "Martine HANSEN", href: "/gouvernement" },
    { label: "Claude MEISCH", href: "/gouvernement" },
    { label: "Lex DELLES", href: "/gouvernement" },
    { label: "Yuriko BACKES", href: "/gouvernement" },
    { label: "Max HAHN", href: "/gouvernement" },
    { label: "Gilles ROTH", href: "/gouvernement" },
    { label: "Martine DEPREZ", href: "/gouvernement" },
    { label: "Léon GLODEN", href: "/gouvernement" },
    { label: "Stéphanie OBERTIN", href: "/gouvernement" },
    { label: "Serge WILMES", href: "/gouvernement" },
    { label: "Elisabeth MARGUE", href: "/gouvernement" },
    { label: "Eric THILL", href: "/gouvernement" },
    { label: "Anciens membres du gouvernement", href: "/gouvernement" },
  ],
  systemePolitique: [
    { label: "Chef de l'État", href: "/systeme-politique" },
    { label: "Gouvernement", href: "/gouvernement" },
    { label: "Système électoral", href: "/systeme-politique" },
    { label: "Chambre des députés", href: "/systeme-politique" },
    { label: "Conseil d'État", href: "/systeme-politique" },
    { label: "Cour des comptes", href: "/systeme-politique" },
    { label: "Conseil économique et social", href: "/systeme-politique" },
    { label: "Chambres professionnelles", href: "/systeme-politique" },
    { label: "Cours et tribunaux", href: "/systeme-politique" },
    { label: "Partis politiques", href: "/systeme-politique" },
    { label: "Union européenne et organisations internationales", href: "/systeme-politique" },
    { label: "Conseil supérieur pour un développement durable", href: "/systeme-politique" },
  ],
  verification: [
    { label: "Vérification de mon permis de conduire", href: "/verification/permis-conduire" },
    { label: "Vérification de ma carte de séjour", href: "/verification/carte-sejour" },
    { label: "Vérification de visa", href: "/verification/visa" },
  ],
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const languages = [
    { code: "FR" as const, label: "Français" },
    { code: "EN" as const, label: "English" },
    { code: "DE" as const, label: "Deutsch" },
    { code: "LU" as const, label: "Lëtzebuergesch" },
  ];

  const navItems = [
    { id: "actualites", label: t("nav.actualites"), hasDropdown: true, href: "/" },
    { id: "gouvernement", label: t("nav.gouvernement"), hasDropdown: true, href: "/gouvernement" },
    { id: "ministeres", label: t("nav.ministeres"), hasDropdown: false, href: "/ministeres" },
    { id: "administrations", label: t("nav.administrations"), hasDropdown: false, href: "/administrations" },
    { id: "verification", label: t("nav.verificationDocuments"), hasDropdown: true, href: "/verification" },
    { id: "systemePolitique", label: t("nav.systemePolitique"), hasDropdown: true, href: "/systeme-politique", isActive: location.pathname.startsWith("/systeme-politique") },
  ];

  return (
    <header className="w-full">
      {/* Top bar - white background with logo at top right corner */}
      <div className="bg-white">
        <div className="flex justify-end py-2 px-4">
          <img 
            src={govLogo} 
            alt="Le Gouvernement du Grand-Duché de Luxembourg" 
            className="h-8 object-contain"
          />
        </div>
      </div>

      {/* Middle bar - dark blue gradient with site name */}
      <div className="bg-[hsl(210,50%,25%)] py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="pr-4">
              <p className="text-[13px] text-white/80 leading-tight">{t("header.government")}</p>
                <p className="text-[13px] text-white/80 leading-tight">{t("header.subtitle")}</p>
              </div>
              <div className="w-[2px] h-10 bg-[hsl(0,75%,45%)] mr-4"></div>
            </div>
            
            <h1 className="text-[28px] md:text-[32px] font-light text-white tracking-tight">
              gouvernement.lu
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors">
                  {language}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200 z-50 min-w-[140px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? "bg-gray-100" : ""}`}
                  >
                    <span className="font-medium mr-2">{lang.code}</span>
                    <span className="text-gray-500">{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="p-1 text-white/80 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className="bg-[hsl(210,55%,20%)] hidden md:block relative">
        <div className="container">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li 
                key={item.id} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {item.hasDropdown ? (
                  <>
                    <Link
                      to={item.href || "#"}
                      className={`flex items-center gap-1 px-5 py-3 text-[15px] transition-colors ${
                        item.isActive || hoveredNav === item.id
                          ? "bg-[hsl(200,45%,45%)] text-white"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                      {hoveredNav === item.id 
                        ? <ChevronUp className="w-3 h-3 ml-1" />
                        : <ChevronDown className="w-3 h-3 ml-1" />
                      }
                    </Link>
                    
                    {/* Dropdown menu */}
                    {hoveredNav === item.id && dropdownData[item.id] && (
                      <div 
                        className="absolute top-full left-0 bg-[hsl(210,50%,30%)] min-w-[280px] py-2 z-50 shadow-lg"
                      >
                        {dropdownData[item.id].map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.href}
                            className="block px-5 py-2 text-[14px] text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href || "#"}
                    className={`flex items-center gap-1 px-5 py-3 text-[15px] transition-colors ${
                      location.pathname === item.href
                        ? "bg-[hsl(200,45%,45%)] text-white" 
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Breadcrumb bar */}
      <div className="bg-gray-100 border-b border-gray-200 hidden md:block">
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <span className="text-primary font-medium">{t("breadcrumb.systemePolitique")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[hsl(210,55%,20%)] border-t border-white/10 animate-fade-in">
          <ul className="container py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-[15px] ${
                      item.isActive 
                        ? "bg-[hsl(200,45%,45%)] text-white" 
                        : "text-white/90"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-3 text-[15px] text-white/90 w-full text-left"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
