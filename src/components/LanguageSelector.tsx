import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import govLogo from "@/assets/gov-logo.png";

export function LanguageSelector() {
  const { setLanguage, setHasSelectedLanguage } = useLanguage();

  const languages = [
    { code: "FR" as const, label: "Français", flag: "🇫🇷" },
    { code: "EN" as const, label: "English", flag: "🇬🇧" },
    { code: "DE" as const, label: "Deutsch", flag: "🇩🇪" },
    { code: "LU" as const, label: "Lëtzebuergesch", flag: "🇱🇺" },
  ];

  const handleSelectLanguage = (code: "FR" | "EN" | "DE" | "LU") => {
    setLanguage(code);
    setHasSelectedLanguage(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(210,50%,25%)] to-[hsl(210,55%,20%)]">
      <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-lg w-full mx-4">
        <div className="flex justify-center mb-8">
          <img 
            src={govLogo} 
            alt="Le Gouvernement du Grand-Duché de Luxembourg" 
            className="h-16 object-contain"
          />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-light text-center text-[hsl(210,50%,30%)] mb-2">
          Bienvenue / Welcome
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Choisissez votre langue / Choose your language
        </p>

        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-[hsl(200,40%,95%)] hover:border-[hsl(200,60%,35%)] transition-all"
              onClick={() => handleSelectLanguage(lang.code)}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
