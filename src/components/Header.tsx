import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
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
  <svg viewBox="0 0 40 48" className="w-10 h-12" aria-hidden="true">
    <rect x="0" y="0" width="40" height="48" fill="none"/>
    <g transform="translate(2, 2) scale(0.9)">
      {/* Shield */}
      <path d="M2 4 L38 4 L38 32 Q38 42 20 46 Q2 42 2 32 Z" fill="hsl(210 15% 95%)" stroke="hsl(210 25% 8%)" strokeWidth="1"/>
      {/* Stripes */}
      <path d="M4 6 L36 6 L36 11 L4 11 Z" fill="hsl(0 75% 45%)"/>
      <path d="M4 11 L36 11 L36 16 L4 16 Z" fill="hsl(0 0% 100%)"/>
      <path d="M4 16 L36 16 L36 21 L4 21 Z" fill="hsl(210 90% 45%)"/>
      <path d="M4 21 L36 21 L36 26 L4 26 Z" fill="hsl(0 0% 100%)"/>
      <path d="M4 26 L36 26 L36 31 L4 31 Z" fill="hsl(0 75% 45%)"/>
      {/* Lion simplified */}
      <path d="M18 33 Q20 38 22 33 Q23 35 20 40 Q17 35 18 33" fill="hsl(0 75% 45%)" opacity="0.8"/>
    </g>
  </svg>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const languages = [
    { code: "FR" as const, label: "Français" },
    { code: "EN" as const, label: "English" },
    { code: "DE" as const, label: "Deutsch" },
    { code: "LU" as const, label: "Lëtzebuergesch" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full">
      {/* Top bar - white background */}
      <div className="gov-header-top">
        <div className="container flex items-center justify-between py-2">
          {/* Left side - gouvernement.lu links */}
          <div className="flex items-center gap-4 text-sm">
            <a 
              href="https://gouvernement.lu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {t("header.topLeft")}
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href="#" 
              className="text-primary hover:underline"
            >
              {t("header.topLeftSub")}
            </a>
          </div>

          {/* Right side - coat of arms + government name + language */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <LuxembourgCoatOfArms />
              <div className="text-right">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  {t("header.topRight")}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("header.topRightSub")}
                </p>
              </div>
            </div>

            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="lang-selector flex items-center gap-1 rounded-sm">
                  {language}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? "bg-muted" : ""}`}
                  >
                    <span className="font-medium mr-2">{lang.code}</span>
                    <span className="text-muted-foreground">{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search icon */}
            <button className="p-2 hover:bg-muted rounded-sm transition-colors">
              <Search className="w-5 h-5 text-foreground" />
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
      </div>

      {/* Middle bar - gradient background with ministry name */}
      <div className="gov-header-middle py-6">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="border-r border-primary-foreground/30 pr-4">
              <p className="text-sm text-primary-foreground/80">{t("header.government")}</p>
              <p className="text-sm text-primary-foreground/80">{t("header.subtitle")}</p>
            </div>
            <h1 className="text-2xl md:text-3xl font-light text-primary-foreground">
              {t("header.ministry")}
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="gov-nav hidden md:block">
        <div className="container">
          <ul className="flex items-center">
            <li>
              <Link
                to="/"
                className={`gov-nav-item ${isActive("/") ? "active" : ""}`}
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="gov-nav-item"
              >
                {t("nav.verify")}
              </Link>
            </li>
            <li>
              <a href="#" className="gov-nav-item flex items-center gap-1">
                {t("nav.info")}
              </a>
            </li>
            <li>
              <a href="#" className="gov-nav-item flex items-center gap-1">
                {t("nav.services")}
                <ChevronDown className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="#" className="gov-nav-item">
                {t("nav.contact")}
              </a>
            </li>
            <li>
              <Link
                to="/admin"
                className={`gov-nav-item ${isActive("/admin") ? "active" : ""}`}
              >
                {t("nav.admin")}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-primary border-t border-primary-foreground/10 animate-fade-in">
          <ul className="container py-4 space-y-1">
            <li>
              <Link
                to="/"
                className={`gov-nav-item block ${isActive("/") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="gov-nav-item block"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.verify")}
              </Link>
            </li>
            <li>
              <a href="#" className="gov-nav-item block">
                {t("nav.info")}
              </a>
            </li>
            <li>
              <a href="#" className="gov-nav-item block">
                {t("nav.services")}
              </a>
            </li>
            <li>
              <a href="#" className="gov-nav-item block">
                {t("nav.contact")}
              </a>
            </li>
            <li>
              <Link
                to="/admin"
                className={`gov-nav-item block ${isActive("/admin") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.admin")}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
