import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { toast } from "sonner";

const searchSchema = z.object({
  passportNumber: z
    .string()
    .trim()
    .min(1, "Le numéro de passeport est requis")
    .max(50, "Le numéro de passeport est trop long"),
  referenceNumber: z
    .string()
    .trim()
    .min(1, "Le numéro de référence est requis")
    .max(50, "Le numéro de référence est trop long"),
});

export function VisaSearchForm() {
  const [passportNumber, setPassportNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = searchSchema.safeParse({ passportNumber, referenceNumber });
    
    if (!validation.success) {
      const errors = validation.error.errors;
      toast.error(errors[0].message);
      return;
    }

    setIsLoading(true);
    
    // Navigate to result page with search params
    const params = new URLSearchParams({
      passport: passportNumber.trim(),
      reference: referenceNumber.trim(),
    });
    
    navigate(`/result?${params.toString()}`);
    setIsLoading(false);
  };

  return (
    <div className="gov-card max-w-xl mx-auto">
      <div className="bg-primary/5 border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Vérification de visa
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Entrez vos informations pour vérifier le statut de votre visa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="passport" className="flex items-center gap-2 text-sm font-medium">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            Numéro de passeport
          </Label>
          <Input
            id="passport"
            type="text"
            placeholder="Ex: AB1234567"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            className="h-11"
            maxLength={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference" className="flex items-center gap-2 text-sm font-medium">
            <FileText className="w-4 h-4 text-muted-foreground" />
            Numéro de référence du visa
          </Label>
          <Input
            id="reference"
            type="text"
            placeholder="Ex: VISA-2024-001234"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            className="h-11"
            maxLength={50}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Recherche en cours...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Vérifier le visa
            </>
          )}
        </Button>
      </form>

      <div className="bg-muted/50 px-6 py-4 text-xs text-muted-foreground border-t border-border">
        <p>
          <strong>Note :</strong> Les deux champs doivent correspondre exactement aux informations 
          enregistrées dans notre système pour afficher les détails du visa.
        </p>
      </div>
    </div>
  );
}