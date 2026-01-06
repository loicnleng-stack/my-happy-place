import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Home, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LuxembourgCoatOfArms = () => (
  <svg viewBox="0 0 32 40" className="w-8 h-10" aria-hidden="true">
    {/* Simplified Luxembourg Red Lion */}
    <g>
      {/* Lion body */}
      <path 
        d="M8 35 Q6 30 8 25 Q7 20 10 15 Q12 10 16 8 Q20 10 22 15 Q25 20 24 25 Q26 30 24 35 Q20 38 16 38 Q12 38 8 35Z" 
        fill="hsl(0 75% 45%)" 
      />
      {/* Crown */}
      <path 
        d="M12 8 L14 4 L16 7 L18 4 L20 8 Q16 10 12 8Z" 
        fill="hsl(45 80% 50%)" 
      />
      {/* Lion details */}
      <circle cx="13" cy="14" r="1.5" fill="hsl(210 25% 8%)" />
      <path d="M10 18 Q13 20 16 18" stroke="hsl(210 25% 8%)" strokeWidth="1" fill="none" />
      {/* Tail */}
      <path 
        d="M24 30 Q28 25 26 20 Q28 18 27 15" 
        stroke="hsl(0 75% 45%)" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      {/* Claws */}
      <path d="M9 33 L6 36 M10 34 L8 38 M11 35 L10 39" stroke="hsl(0 75% 45%)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 33 L26 36 M22 34 L24 38 M21 35 L22 39" stroke="hsl(0 75% 45%)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const languages = [
    { code: "FR" as const, label: "Français" },
    { code: "EN" as const, label: "English" },
    { code: "DE" as const, label: "Deutsch" },
    { code: "LU" as const, label: "Lëtzebuergesch" },
  ];

  const navItems = [
    { id: "actualites", label: "Actualités", hasDropdown: true },
    { id: "gouvernement", label: "Le gouvernement", hasDropdown: true },
    { id: "ministeres", label: "Ministères", hasDropdown: false, href: "#" },
    { id: "administrations", label: "Administrations", hasDropdown: false, href: "#" },
    { id: "dossiers", label: "Dossiers", hasDropdown: false, href: "#" },
    { id: "verification", label: "Vérification visas", hasDropdown: true, href: "/", isActive: true },
  ];

  return (
    <header className="w-full">
      {/* Top bar - white background */}
      <div className="bg-white border-b border-gray-200">
        <div className="container flex items-center justify-end py-2 gap-6">
          {/* Coat of arms + government name */}
          <div className="flex items-center gap-3">
            <LuxembourgCoatOfArms />
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider leading-tight">
                LE GOUVERNEMENT
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider leading-tight">
                DU GRAND-DUCHÉ DE LUXEMBOURG
              </p>
            </div>
          </div>

          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
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

          {/* Search icon */}
          <button className="p-1 text-gray-600 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Middle bar - dark blue gradient with site name */}
      <div className="bg-[hsl(210,50%,25%)] py-4">
        <div className="container">
          <div className="flex items-center">
            {/* Government label with red separator */}
            <div className="flex items-center">
              <div className="pr-4">
                <p className="text-[13px] text-white/80 leading-tight">Le gouvernement</p>
                <p className="text-[13px] text-white/80 leading-tight">luxembourgeois</p>
              </div>
              <div className="w-[2px] h-10 bg-[hsl(0,75%,45%)] mr-4"></div>
            </div>
            
            {/* Site name */}
            <h1 className="text-[28px] md:text-[32px] font-light text-white tracking-tight">
              gouvernement.lu
            </h1>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className="bg-[hsl(210,55%,20%)] hidden md:block">
        <div className="container">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-5 py-3 text-[15px] transition-colors ${
                      item.isActive 
                        ? "bg-[hsl(200,45%,45%)] text-white" 
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3 ml-1" />}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center gap-1 px-5 py-3 text-[15px] transition-colors ${
                      activeNav === item.id
                        ? "bg-[hsl(200,45%,45%)] text-white"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveNav(activeNav === item.id ? null : item.id)}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3 ml-1" />}
                  </button>
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
            <span className="text-primary font-medium">Vérification des visas</span>
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
